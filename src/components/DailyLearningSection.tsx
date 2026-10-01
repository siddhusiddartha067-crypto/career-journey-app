import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Clock, 
  Flame, 
  Filter, 
  Sparkles, 
  Calendar,
  Check,
  AlertCircle
} from 'lucide-react';
import { DailyTask } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface DailyLearningSectionProps {
  tasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (newTask: Omit<DailyTask, 'id' | 'completed' | 'dateAdded'>) => void;
  onDeleteTask: (taskId: string) => void;
  onResetTasks: () => void;
}

export const DailyLearningSection: React.FC<DailyLearningSectionProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
  onResetTasks
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DailyTask['category']>('DSA');
  const [priority, setPriority] = useState<DailyTask['priority']>('medium');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(30);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalMinutesRemaining = tasks
    .filter(t => !t.completed)
    .reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleToggle = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      triggerCelebration();
    }
    onToggleTask(taskId);
  };

  const handleSubmitCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      priority,
      estimatedMinutes: Number(estimatedMinutes) || 30
    });

    setTitle('');
    setIsAddingCustom(false);
  };

  const handleAddPreset = (presetTitle: string, presetCat: DailyTask['category'], minutes: number, prio: DailyTask['priority'] = 'medium') => {
    onAddTask({
      title: presetTitle,
      category: presetCat,
      priority: prio,
      estimatedMinutes: minutes
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header and Daily Summary */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Consistency Wins Offers</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Daily Learning Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Set clear daily study targets for coding, projects, and interview prep. Check them off as you go to maintain your coding streak.
            </p>
          </div>

          {/* Progress Circular & Linear Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-4 shrink-0 sm:min-w-[240px]">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-700 stroke-current"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-extrabold text-slate-900 tabular-nums">
                {progressPercent}%
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900 tabular-nums">
                {completedCount} of {totalCount} Done
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {totalMinutesRemaining > 0 ? `~${totalMinutesRemaining} mins remaining` : 'All tasks finished! 🎉'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Filter tabs & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tasks ({totalCount})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'pending' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === 'completed' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingCustom(!isAddingCustom)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingCustom ? 'Close Form' : 'Add New Task'}</span>
            </button>

            <button
              onClick={onResetTasks}
              title="Reset tasks for tomorrow"
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Quick Add Presets for Engineering Students */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
        <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider block mb-2">
          ⚡ Quick Presets (Click to add immediately)
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleAddPreset('Solve 1 LeetCode Array / String problem', 'DSA', 30, 'high')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition-colors shadow-xs"
          >
            + 1 LeetCode Problem (30m)
          </button>
          <button
            onClick={() => handleAddPreset('Build responsive UI component in React', 'Web Dev', 45, 'medium')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition-colors shadow-xs"
          >
            + React UI Component (45m)
          </button>
          <button
            onClick={() => handleAddPreset('Review DBMS ACID properties & Normalization', 'Core CS', 20, 'medium')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition-colors shadow-xs"
          >
            + Core CS Revision (20m)
          </button>
          <button
            onClick={() => handleAddPreset('Commit feature to GitHub project repository', 'Project', 25, 'high')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-lg border border-slate-200 transition-colors shadow-xs"
          >
            + GitHub Commit (25m)
          </button>
        </div>
      </div>

      {/* Custom Task Add Drawer / Form */}
      {isAddingCustom && (
        <form onSubmit={handleSubmitCustomTask} className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Add Custom Daily Task</h2>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Implement Binary Search Tree in Python"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DailyTask['category'])}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="DSA">DSA</option>
                <option value="Web Dev">Web Dev</option>
                <option value="Core CS">Core CS</option>
                <option value="Project">Project</option>
                <option value="Career">Career</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as DailyTask['priority'])}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Est. Minutes</label>
              <input
                type="number"
                min="5"
                max="240"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              Save Task
            </button>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No tasks in this view</p>
            <p className="text-xs text-slate-500 mt-0.5">Use the presets above or create a new task to keep your momentum going!</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                task.completed
                  ? 'bg-slate-50/90 border-slate-200/80 text-slate-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div 
                onClick={() => handleToggle(task.id)}
                className="flex items-start gap-3 cursor-pointer flex-1"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />

                <div className="space-y-1">
                  <p className={`text-xs sm:text-sm font-semibold leading-snug ${
                    task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}>
                    {task.title}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">{task.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {task.estimatedMinutes} min
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={`capitalize ${
                      task.priority === 'high' ? 'text-rose-600 font-semibold' : task.priority === 'medium' ? 'text-amber-600' : 'text-slate-500'
                    }`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDeleteTask(task.id)}
                title="Delete task"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
