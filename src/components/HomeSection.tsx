import React from 'react';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Map, 
  FolderGit2, 
  GraduationCap, 
  TrendingUp, 
  Sparkles, 
  Flame, 
  Clock, 
  ExternalLink, 
  ChevronRight 
} from 'lucide-react';
import { NavigationTab, RoadmapStep, DailyTask, ProjectItem, DSAProblem, StudentProfile } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface HomeSectionProps {
  profile: StudentProfile;
  roadmap: RoadmapStep[];
  tasks: DailyTask[];
  projects: ProjectItem[];
  dsaProblems: DSAProblem[];
  onNavigate: (tab: NavigationTab) => void;
  onToggleTask: (taskId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  profile,
  roadmap,
  tasks,
  projects,
  dsaProblems,
  onNavigate,
  onToggleTask
}) => {
  // Calculations
  const completedSteps = roadmap.filter(s => s.status === 'completed').length;
  const inProgressSteps = roadmap.filter(s => s.status === 'in_progress').length;
  const roadmapPercent = Math.round((completedSteps / roadmap.length) * 100);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const tasksPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const solvedDSA = dsaProblems.filter(p => p.completed).length;
  const totalDSA = dsaProblems.length;

  const completedProjects = projects.filter(p => p.status === 'Completed').length;

  // Next recommended milestone
  const nextMilestone = roadmap.find(s => s.status === 'in_progress') || roadmap.find(s => s.status === 'not_started') || roadmap[0];

  const handleStartJourney = () => {
    triggerCelebration(0.5, 0.5);
    onNavigate('roadmap');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Engineering Student Career Companion</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 text-balance">
            Welcome back, {profile.name}! 👋
          </h1>

          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            Every line of code you write and every problem you solve is bringing you closer to your dream software developer offer. Small, consistent steps build unstoppable momentum.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleStartJourney}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-900 font-bold text-sm shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <span>Start Your Career Journey 🚀</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('daily')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold border border-indigo-400/30 transition-colors"
            >
              <Clock className="w-4 h-4 text-indigo-300" />
              <span>Today's Learning ({completedTasks}/{totalTasks})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Motivational Quote Strip */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/80 border border-amber-200/70 text-slate-800">
        <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm">
          <span className="font-semibold text-amber-900">Daily Engineering Wisdom: </span>
          <span className="text-slate-700">"You don't have to be great to start, but you have to start to be great. Master one concept at a time."</span>
        </div>
      </div>

      {/* Snapshot Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Roadmap */}
        <div 
          onClick={() => onNavigate('roadmap')}
          className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Roadmap</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Map className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {roadmapPercent}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {completedSteps} of {roadmap.length} steps completed
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${roadmapPercent}%` }} 
            />
          </div>
        </div>

        {/* Metric 2: Daily Tasks */}
        <div 
          onClick={() => onNavigate('daily')}
          className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Tasks</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {completedTasks}/{totalTasks}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {tasksPercent}% daily target done
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${tasksPercent}%` }} 
            />
          </div>
        </div>

        {/* Metric 3: DSA Solved */}
        <div 
          onClick={() => onNavigate('coding')}
          className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">DSA Problems</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {solvedDSA}/{totalDSA}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {Math.round((solvedDSA / totalDSA) * 100)}% problems solved
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((solvedDSA / totalDSA) * 100)}%` }} 
            />
          </div>
        </div>

        {/* Metric 4: Projects */}
        <div 
          onClick={() => onNavigate('projects')}
          className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-sm cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
            {completedProjects}/{projects.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {projects.length - completedProjects} in development
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-purple-600 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${Math.round((completedProjects / projects.length) * 100)}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Current Milestone & Today's Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Milestone Spotlight */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your Current Milestone</h2>
            <button 
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View full 12-step roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {nextMilestone && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                    <span>Step {nextMilestone.id} of 12</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-indigo-600 font-semibold">{nextMilestone.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{nextMilestone.estimatedWeeks}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {nextMilestone.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {nextMilestone.description}
                  </p>
                </div>

                <span className={`self-start px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
                  nextMilestone.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : nextMilestone.status === 'in_progress'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {nextMilestone.status === 'completed' ? 'Completed' : nextMilestone.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                </span>
              </div>

              {/* Sub-skills preview */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Key Skills to Master in this Step
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {nextMilestone.subSkills.slice(0, 4).map(sub => (
                    <div key={sub.id} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        sub.completed ? 'bg-emerald-500 text-white' : 'border border-slate-300'
                      }`}>
                        {sub.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`truncate ${sub.completed ? 'line-through text-slate-400' : ''}`}>
                        {sub.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end">
                <button
                  onClick={() => onNavigate('roadmap')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Open {nextMilestone.title} Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Access Pathways */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('coding')}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Practice DSA</h4>
              <p className="text-xs text-slate-500 mt-0.5">Solve curated Easy, Medium & Hard problems</p>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Build Projects</h4>
              <p className="text-xs text-slate-500 mt-0.5">Showcase real full-stack portfolio work</p>
            </button>

            <button
              onClick={() => onNavigate('career')}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs text-left transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Career & Interview</h4>
              <p className="text-xs text-slate-500 mt-0.5">Resume ATS tips, internship emails & Q&A</p>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Quick Interactive Daily Checklist */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Today's Focus</h2>
            <button 
              onClick={() => onNavigate('daily')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Manage all
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>{completedTasks} completed</span>
              <span>{tasks.length - completedTasks} remaining</span>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer ${
                    task.completed 
                      ? 'bg-slate-50/80 border-slate-200/80 opacity-70' 
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                    className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium leading-snug ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span>{task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{task.estimatedMinutes} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('daily')}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 mt-2"
            >
              <span>+ Add or View All Tasks</span>
            </button>
          </div>

          {/* Student Profile Quick Badge */}
          <div 
            onClick={() => onNavigate('profile')}
            className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                {profile.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{profile.name}</p>
                <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">{profile.college}</p>
                <p className="text-[10px] text-indigo-300 font-medium">{profile.targetRole}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
