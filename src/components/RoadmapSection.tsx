import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  BookOpen, 
  Clock, 
  Check, 
  Sparkles,
  Save,
  Compass
} from 'lucide-react';
import { RoadmapStep, StepStatus } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface RoadmapSectionProps {
  steps: RoadmapStep[];
  onUpdateStepStatus: (stepId: number, status: StepStatus) => void;
  onToggleSubSkill: (stepId: number, subSkillId: string) => void;
  onSaveStepNote: (stepId: number, note: string) => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  steps,
  onUpdateStepStatus,
  onToggleSubSkill,
  onSaveStepNote
}) => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [expandedStepId, setExpandedStepId] = useState<number | null>(3); // Default expand JS (in progress)
  const [notesState, setNotesState] = useState<{ [id: number]: string }>(() => {
    const initial: { [id: number]: string } = {};
    steps.forEach(s => {
      if (s.studentNotes) initial[s.id] = s.studentNotes;
    });
    return initial;
  });
  const [savedFeedback, setSavedFeedback] = useState<number | null>(null);

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const inProgressCount = steps.filter(s => s.status === 'in_progress').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const filteredSteps = steps.filter(step => {
    if (filter === 'all') return true;
    return step.status === filter;
  });

  const toggleExpand = (stepId: number) => {
    setExpandedStepId(expandedStepId === stepId ? null : stepId);
  };

  const handleStatusChange = (stepId: number, newStatus: StepStatus) => {
    onUpdateStepStatus(stepId, newStatus);
    if (newStatus === 'completed') {
      triggerCelebration();
    }
  };

  const handleSaveNote = (stepId: number) => {
    const note = notesState[stepId] || '';
    onSaveStepNote(stepId, note);
    setSavedFeedback(stepId);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header and Progress Card */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <Compass className="w-4 h-4" />
              <span>Step-by-Step Curriculum</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Software Developer Skills Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              12 progressive milestones designed for engineering students: from web fundamentals to data structures, full-stack projects, and placement interview prep.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:w-64 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-slate-600">Roadmap Progress</span>
              <span className="text-xs font-bold text-indigo-600 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-1.5">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{completedCount} of 12 completed</span>
              <span>{inProgressCount} in progress</span>
            </div>
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'all' 
                ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Steps (12)
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'in_progress' 
                ? 'bg-white text-indigo-700 shadow-xs font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'completed' 
                ? 'bg-white text-emerald-700 shadow-xs font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilter('not_started')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filter === 'not_started' 
                ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Up Next ({12 - completedCount - inProgressCount})
          </button>
        </div>
      </div>

      {/* 12-Step Roadmap Timeline Cards */}
      <div className="space-y-4">
        {filteredSteps.map((step, index) => {
          const isExpanded = expandedStepId === step.id;
          const completedSub = step.subSkills.filter(s => s.completed).length;
          const totalSub = step.subSkills.length;
          const subPercent = totalSub > 0 ? Math.round((completedSub / totalSub) * 100) : 0;

          return (
            <div 
              key={step.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                step.status === 'in_progress'
                  ? 'bg-white border-indigo-200 shadow-xs ring-1 ring-indigo-500/10'
                  : step.status === 'completed'
                  ? 'bg-white border-slate-200/90'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Header Bar */}
              <div 
                onClick={() => toggleExpand(step.id)}
                className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Step Number Circle */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    step.status === 'completed'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : step.status === 'in_progress'
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-200 animate-pulse'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.status === 'completed' ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                      <span>Step {step.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">{step.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{step.estimatedWeeks}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Status Indicator */}
                  <span className={`hidden sm:inline-flex px-2.5 py-1 text-xs font-semibold rounded-md ${
                    step.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : step.status === 'in_progress'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.status === 'completed' ? 'Completed' : step.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                  </span>

                  {/* Micro subskills progress */}
                  <span className="text-xs font-semibold text-slate-500 tabular-nums hidden md:inline">
                    {completedSub}/{totalSub} skills
                  </span>

                  <button 
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsed Brief Preview */}
              {!isExpanded && (
                <div className="px-5 pb-4 pt-0">
                  <p className="text-xs text-slate-600 line-clamp-1">
                    {step.description}
                  </p>
                </div>
              )}

              {/* Expanded Detailed Step Guide */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 sm:p-6 bg-slate-50/50 space-y-6">
                  {/* Description & Status Controller */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="max-w-xl">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Overview & Objectives
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-slate-500 uppercase">Set Status</label>
                      <select
                        value={step.status}
                        onChange={(e) => handleStatusChange(step.id, e.target.value as StepStatus)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="not_started">⚪ Not Started</option>
                        <option value="in_progress">🔵 In Progress</option>
                        <option value="completed">🟢 Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Sub-skills Checklist */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        Core Competencies ({completedSub}/{totalSub})
                      </span>
                      <span className="text-xs text-indigo-600 font-bold tabular-nums">
                        {subPercent}% mastered
                      </span>
                    </div>

                    <div className="space-y-2">
                      {step.subSkills.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => onToggleSubSkill(step.id, sub.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            sub.completed 
                              ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900' 
                              : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={sub.completed}
                            onChange={() => onToggleSubSkill(step.id, sub.id)}
                            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span className={`text-xs sm:text-sm font-medium ${sub.completed ? 'line-through text-slate-400' : ''}`}>
                            {sub.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Topics List */}
                  <div>
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider block mb-2">
                      Topics to Master
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.keyTopics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Learning Resources */}
                  <div>
                    <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider block mb-2">
                      Curated Free Resources & Documentation
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {step.recommendedResources.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-indigo-600 font-semibold mb-1">
                              <span>{res.type}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                            </div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {res.title}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-2 block">Official & Free Link ↗</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Student Personal Study Note */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        My Study Notes & Key Takeaways
                      </span>
                      {savedFeedback === step.id && (
                        <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Saved!
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <textarea
                        value={notesState[step.id] || ''}
                        onChange={(e) => setNotesState({ ...notesState, [step.id]: e.target.value })}
                        placeholder="Jot down formulas, code snippets, tricky interview traps, or revision notes for this topic..."
                        rows={2}
                        className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleSaveNote(step.id)}
                        className="mt-2 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
