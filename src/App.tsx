import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  RoadmapStep, 
  DailyTask, 
  ProjectItem, 
  DSAProblem, 
  StudentProfile, 
  StepStatus 
} from './types/career';
import { 
  getInitialRoadmap, 
  getInitialTasks, 
  getInitialProjects, 
  getInitialDSA, 
  getInitialProfile, 
  saveStoredData, 
  STORAGE_KEYS 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { RoadmapSection } from './components/RoadmapSection';
import { DailyLearningSection } from './components/DailyLearningSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CodingPracticeSection } from './components/CodingPracticeSection';
import { CareerSection } from './components/CareerSection';
import { ProfileSection } from './components/ProfileSection';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');

  // Application Data States
  const [profile, setProfile] = useState<StudentProfile>(getInitialProfile);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(getInitialRoadmap);
  const [tasks, setTasks] = useState<DailyTask[]>(getInitialTasks);
  const [projects, setProjects] = useState<ProjectItem[]>(getInitialProjects);
  const [dsaProblems, setDsaProblems] = useState<DSAProblem[]>(getInitialDSA);

  // Sync to LocalStorage on changes
  useEffect(() => {
    saveStoredData(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.ROADMAP, roadmap);
  }, [roadmap]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    saveStoredData(STORAGE_KEYS.DSA, dsaProblems);
  }, [dsaProblems]);

  // Tab change handler
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Daily Tasks Handlers ---
  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (newTask: Omit<DailyTask, 'id' | 'completed' | 'dateAdded'>) => {
    const task: DailyTask = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false,
      dateAdded: 'Today'
    };
    setTasks(prev => [task, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleResetTasks = () => {
    setTasks(prev =>
      prev.map(t => ({
        ...t,
        completed: false
      }))
    );
  };

  // --- Roadmap Handlers ---
  const handleUpdateStepStatus = (stepId: number, status: StepStatus) => {
    setRoadmap(prev =>
      prev.map(step => {
        if (step.id !== stepId) return step;
        const updatedSubSkills = step.subSkills.map(sub => ({
          ...sub,
          completed: status === 'completed' ? true : status === 'not_started' ? false : sub.completed
        }));
        return {
          ...step,
          status,
          subSkills: updatedSubSkills
        };
      })
    );
  };

  const handleToggleSubSkill = (stepId: number, subSkillId: string) => {
    setRoadmap(prev =>
      prev.map(step => {
        if (step.id !== stepId) return step;
        const updatedSubSkills = step.subSkills.map(sub =>
          sub.id === subSkillId ? { ...sub, completed: !sub.completed } : sub
        );
        const allCompleted = updatedSubSkills.length > 0 && updatedSubSkills.every(s => s.completed);
        const someCompleted = updatedSubSkills.some(s => s.completed);
        const newStatus: StepStatus = allCompleted
          ? 'completed'
          : someCompleted
          ? 'in_progress'
          : 'not_started';

        return {
          ...step,
          subSkills: updatedSubSkills,
          status: newStatus
        };
      })
    );
  };

  const handleSaveStepNote = (stepId: number, note: string) => {
    setRoadmap(prev =>
      prev.map(s => (s.id === stepId ? { ...s, studentNotes: note } : s))
    );
  };

  // --- Projects Handlers ---
  const handleAddProject = (newProj: Omit<ProjectItem, 'id'>) => {
    const project: ProjectItem = {
      ...newProj,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [project, ...prev]);
  };

  const handleUpdateProjectStatus = (projectId: string, status: ProjectItem['status']) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, status } : p))
    );
  };

  const handleUpdateProject = (updatedProject: ProjectItem) => {
    setProjects(prev =>
      prev.map(p => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  // --- DSA Handlers ---
  const handleToggleDSAProblem = (problemId: string) => {
    setDsaProblems(prev =>
      prev.map(p =>
        p.id === problemId ? { ...p, completed: !p.completed } : p
      )
    );
  };

  const handleToggleDSABookmark = (problemId: string) => {
    setDsaProblems(prev =>
      prev.map(p =>
        p.id === problemId ? { ...p, bookmarked: !p.bookmarked } : p
      )
    );
  };

  // --- Profile Handler ---
  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header & Sticky Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        streakDays={profile.streakDays}
        studentName={profile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-12">
        {currentTab === 'home' && (
          <HomeSection
            profile={profile}
            roadmap={roadmap}
            tasks={tasks}
            projects={projects}
            dsaProblems={dsaProblems}
            onNavigate={handleSelectTab}
            onToggleTask={handleToggleTask}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapSection
            steps={roadmap}
            onUpdateStepStatus={handleUpdateStepStatus}
            onToggleSubSkill={handleToggleSubSkill}
            onSaveStepNote={handleSaveStepNote}
          />
        )}

        {currentTab === 'daily' && (
          <DailyLearningSection
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onResetTasks={handleResetTasks}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsSection
            projects={projects}
            onAddProject={handleAddProject}
            onUpdateProjectStatus={handleUpdateProjectStatus}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {currentTab === 'coding' && (
          <CodingPracticeSection
            problems={dsaProblems}
            onToggleProblem={handleToggleDSAProblem}
            onToggleBookmark={handleToggleDSABookmark}
          />
        )}

        {currentTab === 'career' && (
          <CareerSection />
        )}

        {currentTab === 'profile' && (
          <ProfileSection
            profile={profile}
            projects={projects}
            roadmap={roadmap}
            dsaProblems={dsaProblems}
            tasks={tasks}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 hidden md:block">
        <p>Career Journey — Built for ambitious engineering students becoming software developers.</p>
      </footer>
    </div>
  );
}
