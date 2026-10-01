import {
  RoadmapStep,
  DailyTask,
  ProjectItem,
  DSAProblem,
  StudentProfile
} from '../types/career';
import {
  INITIAL_ROADMAP_STEPS,
  INITIAL_DAILY_TASKS,
  INITIAL_PROJECTS,
  INITIAL_DSA_PROBLEMS,
  INITIAL_PROFILE
} from '../data/initialData';

const STORAGE_KEYS = {
  ROADMAP: 'career_journey_roadmap_v2',
  ROADMAP_LEGACY: 'career_journey_roadmap_v1',
  TASKS: 'career_journey_tasks_v1',
  PROJECTS: 'career_journey_projects_v1',
  DSA: 'career_journey_dsa_v2',
  DSA_LEGACY: 'career_journey_dsa_v1',
  PROFILE: 'career_journey_profile_v2',
  PROFILE_LEGACY: 'career_journey_profile_v1',
};

export function sanitizeLoadedText(raw: string): string {
  return raw
    .replace(/elt\s+ettributes/gi, 'alt attributes')
    .replace(/Hash-Mep\s+epproach/gi, 'Hash Map approach')
    .replace(/Hash-Mep/gi, 'Hash Map')
    .replace(/epproach/gi, 'approach')
    .replace(/Tailwind-6SS/gi, 'Tailwind CSS')
    .replace(/Jain\s+Institute\s+of\s+Technology(?!\s+Davangere)/gi, 'Jain Institute of Technology Davangere')
    .replace(/jain\s+institute\s+of\s+technology/gi, 'Jain Institute of Technology Davangere')
    .replace(/National\s+Institute\s+of\s+Technology/gi, 'Jain Institute of Technology Davangere');
}

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const sanitized = sanitizeLoadedText(item);
    return JSON.parse(sanitized) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
  }
}

/**
 * Loads roadmap steps, seamlessly preserving existing user progress and sub-skills
 * while adopting the full 12-step curriculum.
 */
export function getInitialRoadmap(): RoadmapStep[] {
  const savedV2 = localStorage.getItem(STORAGE_KEYS.ROADMAP);
  const savedV1 = localStorage.getItem(STORAGE_KEYS.ROADMAP_LEGACY);
  const rawSaved = savedV2 || savedV1;

  if (!rawSaved) {
    return INITIAL_ROADMAP_STEPS;
  }

  try {
    const parsed = JSON.parse(sanitizeLoadedText(rawSaved)) as RoadmapStep[];
    if (!Array.isArray(parsed)) return INITIAL_ROADMAP_STEPS;

    // Build lookup by step id or step title keyword to preserve completed statuses
    const savedMap = new Map<number, RoadmapStep>();
    const savedByTitle = new Map<string, RoadmapStep>();
    parsed.forEach(step => {
      savedMap.set(step.id, step);
      savedByTitle.set(step.title.toLowerCase().trim(), step);
    });

    return INITIAL_ROADMAP_STEPS.map(defaultStep => {
      // Find matching saved step by title or ID
      const titleKey = defaultStep.title.toLowerCase().trim();
      const existing = savedByTitle.get(titleKey) || savedMap.get(defaultStep.id);

      if (!existing) return defaultStep;

      // Merge sub-skills completion status
      const existingSubSkills = new Map(existing.subSkills?.map(s => [s.name.toLowerCase().trim(), s.completed]) || []);
      const mergedSubSkills = defaultStep.subSkills.map(sub => {
        const subKey = sub.name.toLowerCase().trim();
        const wasCompleted = existingSubSkills.has(subKey) ? existingSubSkills.get(subKey)! : sub.completed;
        return { ...sub, completed: wasCompleted };
      });

      return {
        ...defaultStep,
        status: existing.status || defaultStep.status,
        studentNotes: existing.studentNotes || defaultStep.studentNotes,
        subSkills: mergedSubSkills
      };
    });
  } catch (e) {
    console.warn('Error migrating roadmap:', e);
    return INITIAL_ROADMAP_STEPS;
  }
}

export function getInitialTasks(): DailyTask[] {
  return loadStoredData<DailyTask[]>(STORAGE_KEYS.TASKS, INITIAL_DAILY_TASKS);
}

export function getInitialProjects(): ProjectItem[] {
  const loaded = loadStoredData<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  // Ensure default projects exist if array is empty
  if (!loaded || loaded.length === 0) {
    return INITIAL_PROJECTS;
  }
  return loaded;
}

/**
 * Loads DSA problems, ensuring all 10 categories are populated while preserving
 * any previously solved and bookmarked problems.
 */
export function getInitialDSA(): DSAProblem[] {
  const savedV2 = localStorage.getItem(STORAGE_KEYS.DSA);
  const savedV1 = localStorage.getItem(STORAGE_KEYS.DSA_LEGACY);
  const rawSaved = savedV2 || savedV1;

  if (!rawSaved) {
    return INITIAL_DSA_PROBLEMS;
  }

  try {
    const parsed = JSON.parse(sanitizeLoadedText(rawSaved)) as DSAProblem[];
    if (!Array.isArray(parsed)) return INITIAL_DSA_PROBLEMS;

    const solvedTitles = new Set<string>();
    const bookmarkedTitles = new Set<string>();

    parsed.forEach(p => {
      const key = p.title.toLowerCase().trim();
      if (p.completed) solvedTitles.add(key);
      if (p.bookmarked) bookmarkedTitles.add(key);
    });

    return INITIAL_DSA_PROBLEMS.map(defaultProb => {
      const key = defaultProb.title.toLowerCase().trim();
      const isCompleted = solvedTitles.has(key) || defaultProb.completed;
      const isBookmarked = bookmarkedTitles.has(key) || defaultProb.bookmarked;

      return {
        ...defaultProb,
        completed: isCompleted,
        bookmarked: isBookmarked
      };
    });
  } catch (e) {
    console.warn('Error migrating DSA problems:', e);
    return INITIAL_DSA_PROBLEMS;
  }
}

/**
 * Loads student profile, ensuring college and semester updates are reflected
 * while retaining user edits and learning streaks.
 */
export function getInitialProfile(): StudentProfile {
  const savedV2 = localStorage.getItem(STORAGE_KEYS.PROFILE);
  const savedV1 = localStorage.getItem(STORAGE_KEYS.PROFILE_LEGACY);
  const rawSaved = savedV2 || savedV1;

  let profile = INITIAL_PROFILE;

  if (rawSaved) {
    try {
      const parsed = JSON.parse(sanitizeLoadedText(rawSaved)) as Partial<StudentProfile>;
      profile = {
        ...INITIAL_PROFILE,
        ...parsed,
        name: parsed.name || INITIAL_PROFILE.name,
        college: 'Jain Institute of Technology Davangere',
        branch: parsed.branch || INITIAL_PROFILE.branch,
        yearOfStudy: '2nd Year (3rd Semester)',
        targetRole: parsed.targetRole || INITIAL_PROFILE.targetRole,
        streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : INITIAL_PROFILE.streakDays,
        skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : INITIAL_PROFILE.skills,
      };
    } catch (e) {
      console.warn('Error reading profile:', e);
      profile = INITIAL_PROFILE;
    }
  }

  // Check and increment streak
  const today = new Date().toISOString().split('T')[0];
  const lastActive = profile.lastActiveDate || today;

  if (lastActive !== today) {
    const lastDate = new Date(lastActive);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      profile.streakDays += 1;
      profile.lastActiveDate = today;
      saveStoredData(STORAGE_KEYS.PROFILE, profile);
    } else if (diffDays > 1) {
      // Streak paused or reset to 1
      profile.streakDays = Math.max(profile.streakDays, 1);
      profile.lastActiveDate = today;
      saveStoredData(STORAGE_KEYS.PROFILE, profile);
    }
  }

  return profile;
}

export { STORAGE_KEYS };
