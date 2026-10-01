export type NavigationTab = 
  | 'home' 
  | 'roadmap' 
  | 'daily' 
  | 'projects' 
  | 'coding' 
  | 'career' 
  | 'profile';

export type StepStatus = 'not_started' | 'in_progress' | 'completed';

export interface RoadmapSubSkill {
  id: string;
  name: string;
  completed: boolean;
}

export interface RoadmapStep {
  id: number;
  title: string;
  category: 'Foundation' | 'Programming' | 'Core CS' | 'Frontend' | 'Backend' | 'Practical' | 'Career Prep';
  description: string;
  estimatedWeeks: string;
  status: StepStatus;
  subSkills: RoadmapSubSkill[];
  keyTopics: string[];
  recommendedResources: {
    title: string;
    type: 'Guide' | 'Course' | 'Interactive' | 'Documentation';
    url: string;
  }[];
  studentNotes?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  category: 'DSA' | 'Web Dev' | 'Core CS' | 'Career' | 'Project';
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  completed: boolean;
  dateAdded: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'Planned' | 'In Progress' | 'Completed';
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
}

export type DSADifficulty = 'Easy' | 'Medium' | 'Hard';

export type DSATopic = 
  | 'Arrays'
  | 'Strings'
  | 'Linked Lists'
  | 'Stack'
  | 'Queue'
  | 'Hash Map'
  | 'Trees'
  | 'Graphs'
  | 'Sorting'
  | 'Searching';

export interface DSAProblem {
  id: string;
  title: string;
  topic: DSATopic;
  difficulty: DSADifficulty;
  completed: boolean;
  bookmarked: boolean;
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
  practiceUrl: string;
}

export interface InterviewQA {
  id: string;
  category: 'OOP' | 'DBMS' | 'OS' | 'Computer Networks' | 'Behavioral / HR';
  question: string;
  answer: string;
  keyPoints: string[];
}

export interface StudentSkill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface StudentProfile {
  name: string;
  college: string;
  branch: string;
  yearOfStudy: string;
  targetRole: string;
  bio: string;
  githubUsername: string;
  linkedinUsername: string;
  streakDays: number;
  lastActiveDate: string;
  skills: StudentSkill[];
}
