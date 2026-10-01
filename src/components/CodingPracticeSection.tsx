import React, { useState } from 'react';
import { 
  Code2, 
  Bookmark, 
  ExternalLink, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search,
  Check,
  RotateCcw
} from 'lucide-react';
import { DSAProblem, DSATopic, DSADifficulty } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface CodingPracticeSectionProps {
  problems: DSAProblem[];
  onToggleProblem: (problemId: string) => void;
  onToggleBookmark: (problemId: string) => void;
}

export const CodingPracticeSection: React.FC<CodingPracticeSectionProps> = ({
  problems,
  onToggleProblem,
  onToggleBookmark
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [filterSolved, setFilterSolved] = useState<'All' | 'Solved' | 'Unsolved' | 'Bookmarked'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedHintId, setExpandedHintId] = useState<string | null>(null);

  // Statistics
  const totalSolved = problems.filter(p => p.completed).length;
  const totalProblems = problems.length;
  const overallPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const easyTotal = problems.filter(p => p.difficulty === 'Easy').length;
  const easySolved = problems.filter(p => p.difficulty === 'Easy' && p.completed).length;

  const medTotal = problems.filter(p => p.difficulty === 'Medium').length;
  const medSolved = problems.filter(p => p.difficulty === 'Medium' && p.completed).length;

  const hardTotal = problems.filter(p => p.difficulty === 'Hard').length;
  const hardSolved = problems.filter(p => p.difficulty === 'Hard' && p.completed).length;

  const topics: ('All' | DSATopic)[] = [
    'All',
    'Arrays',
    'Strings',
    'Linked Lists',
    'Stack',
    'Queue',
    'Hash Map',
    'Trees',
    'Graphs',
    'Sorting',
    'Searching'
  ];

  const filteredProblems = problems.filter(prob => {
    if (selectedDifficulty !== 'All' && prob.difficulty !== selectedDifficulty) return false;
    if (selectedTopic !== 'All' && prob.topic !== selectedTopic) return false;
    if (filterSolved === 'Solved' && !prob.completed) return false;
    if (filterSolved === 'Unsolved' && prob.completed) return false;
    if (filterSolved === 'Bookmarked' && !prob.bookmarked) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return prob.title.toLowerCase().includes(q) || prob.topic.toLowerCase().includes(q);
    }
    return true;
  });

  const handleToggleSolve = (id: string) => {
    const prob = problems.find(p => p.id === id);
    if (prob && !prob.completed) {
      triggerCelebration();
    }
    onToggleProblem(id);
  };

  const clearFilters = () => {
    setSelectedDifficulty('All');
    setSelectedTopic('All');
    setFilterSolved('All');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header and DSA Progress Statistics */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
              <Code2 className="w-4 h-4" />
              <span>Technical Interview Foundation</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Data Structures & Algorithms Practice
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Solve curated problems across 10 essential categories: Arrays, Strings, Linked Lists, Stack, Queue, Hash Map, Trees, Graphs, Sorting, and Searching.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl shrink-0 self-start sm:self-auto">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Overall Solved
              </div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                {totalSolved} / {totalProblems} <span className="text-xs font-medium text-slate-500">({overallPercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Tier Difficulty Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Easy */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 mb-1.5">
              <span>Easy Level</span>
              <span className="tabular-nums">{easySolved}/{easyTotal} solved</span>
            </div>
            <div className="w-full bg-emerald-200/70 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Medium */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-800 mb-1.5">
              <span>Medium Level</span>
              <span className="tabular-nums">{medSolved}/{medTotal} solved</span>
            </div>
            <div className="w-full bg-amber-200/70 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${medTotal > 0 ? (medSolved / medTotal) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Hard */}
          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100">
            <div className="flex items-center justify-between text-xs font-semibold text-rose-800 mb-1.5">
              <span>Hard Level</span>
              <span className="tabular-nums">{hardSolved}/{hardTotal} solved</span>
            </div>
            <div className="w-full bg-rose-200/70 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-rose-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem title or pattern..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedDifficulty === diff 
                      ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Solved Status Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {(['All', 'Solved', 'Unsolved', 'Bookmarked'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterSolved(mode)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    filterSolved === mode 
                      ? 'bg-white text-indigo-700 shadow-xs font-semibold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Topic Categories Filter Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Topic Categories ({topics.length - 1}):
            </span>
            {(selectedTopic !== 'All' || selectedDifficulty !== 'All' || filterSolved !== 'All' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
            {topics.map((t) => {
              const count = t === 'All' 
                ? problems.length 
                : problems.filter(p => p.topic === t).length;
              const solvedCount = t === 'All'
                ? totalSolved
                : problems.filter(p => p.topic === t && p.completed).length;

              return (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedTopic === t
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium'
                  }`}
                >
                  <span>{t}</span>
                  <span className={`text-[10px] tabular-nums px-1.5 py-0.2 rounded-md ${
                    selectedTopic === t ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {solvedCount}/{count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-3">
        {filteredProblems.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <Code2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No problems match your current criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try switching topic, clearing your search query, or resetting filters.</p>
            <button
              onClick={clearFilters}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProblems.map((prob) => {
            const isHintOpen = expandedHintId === prob.id;

            return (
              <div
                key={prob.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  prob.completed 
                    ? 'bg-white border-slate-200/90' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Checkbox + Title + Complexity */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleSolve(prob.id)}
                      title={prob.completed ? 'Mark unsolved' : 'Mark solved'}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        prob.completed 
                          ? 'bg-emerald-500 text-white shadow-xs' 
                          : 'border border-slate-300 hover:border-emerald-500 bg-white'
                      }`}
                    >
                      {prob.completed && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className={`text-sm sm:text-base font-bold leading-snug break-words ${
                          prob.completed ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}>
                          {prob.title}
                        </h2>

                        {/* Difficulty Badge */}
                        <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${
                          prob.difficulty === 'Easy' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : prob.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>

                      {/* Topic & Complexity */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{prob.topic}</span>
                        <span aria-hidden="true">·</span>
                        <span>Time: <code className="font-mono text-slate-700">{prob.timeComplexity}</code></span>
                        <span aria-hidden="true">·</span>
                        <span>Space: <code className="font-mono text-slate-700">{prob.spaceComplexity}</code></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Bookmark & Practice Link */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onToggleBookmark(prob.id)}
                      title={prob.bookmarked ? 'Remove bookmark' : 'Bookmark for revision'}
                      className={`p-2 rounded-lg transition-colors ${
                        prob.bookmarked 
                          ? 'text-amber-500 hover:text-amber-600 bg-amber-50' 
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${prob.bookmarked ? 'fill-amber-500' : ''}`} />
                    </button>

                    <a
                      href={prob.practiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Intuition & Hint Accordion */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setExpandedHintId(isHintOpen ? null : prob.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{isHintOpen ? 'Hide Algorithm Intuition & Hint' : 'Show Algorithm Intuition & Hint'}</span>
                    {isHintOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isHintOpen && (
                    <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed animate-fadeIn">
                      <span className="font-bold text-slate-900 block mb-1">Key Algorithmic Idea:</span>
                      {prob.hint}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
