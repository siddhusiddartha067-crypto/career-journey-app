import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Github, 
  ExternalLink, 
  Trash2, 
  Lightbulb, 
  Edit3,
  X,
  Code
} from 'lucide-react';
import { ProjectItem } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onAddProject: (newProject: Omit<ProjectItem, 'id'>) => void;
  onUpdateProjectStatus: (projectId: string, status: ProjectItem['status']) => void;
  onUpdateProject?: (project: ProjectItem) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  onUpdateProjectStatus,
  onUpdateProject,
  onDeleteProject
}) => {
  const [filter, setFilter] = useState<'All' | 'In Progress' | 'Completed' | 'Planned'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [status, setStatus] = useState<ProjectItem['status']>('In Progress');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  const completedCount = projects.filter(p => p.status === 'Completed').length;
  const inProgressCount = projects.filter(p => p.status === 'In Progress').length;
  const plannedCount = projects.filter(p => p.status === 'Planned').length;

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  const handleStatusChange = (projectId: string, newStatus: ProjectItem['status']) => {
    onUpdateProjectStatus(projectId, newStatus);
    if (newStatus === 'Completed') {
      triggerCelebration();
    }
  };

  const openAddModal = () => {
    setEditingProjectId(null);
    setTitle('');
    setDescription('');
    setTechInput('');
    setStatus('In Progress');
    setGithubUrl('');
    setLiveUrl('');
    setHighlightsInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setTechInput(proj.technologies.join(', '));
    setStatus(proj.status);
    setGithubUrl(proj.githubUrl || '');
    setLiveUrl(proj.liveUrl || '');
    setHighlightsInput((proj.highlights || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const techArray = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const highlightsArray = highlightsInput
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    if (editingProjectId && onUpdateProject) {
      onUpdateProject({
        id: editingProjectId,
        title: title.trim(),
        description: description.trim(),
        technologies: techArray.length > 0 ? techArray : ['JavaScript', 'React'],
        status,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        highlights: highlightsArray
      });
    } else {
      onAddProject({
        title: title.trim(),
        description: description.trim(),
        technologies: techArray.length > 0 ? techArray : ['JavaScript', 'React'],
        status,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
        highlights: highlightsArray
      });
      triggerCelebration();
    }

    setIsModalOpen(false);
  };

  const handleSelectSuggestedIdea = (ideaTitle: string, ideaDesc: string, ideaTechs: string[]) => {
    setEditingProjectId(null);
    setTitle(ideaTitle);
    setDescription(ideaDesc);
    setTechInput(ideaTechs.join(', '));
    setStatus('In Progress');
    setGithubUrl('');
    setLiveUrl('');
    setHighlightsInput('');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header and Projects Stats */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 mb-1">
              <FolderGit2 className="w-4 h-4" />
              <span>Resume-Building Portfolio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Software Engineering Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Showcase full-stack engineering ability. Include project name, clear description, technology stack, status, GitHub source repository, and live deployed demo.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit overflow-x-auto">
          {(['All', 'In Progress', 'Completed', 'Planned'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filter === tab 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab} ({tab === 'All' ? projects.length : tab === 'Completed' ? completedCount : tab === 'In Progress' ? inProgressCount : plannedCount})
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Engineering Project Ideas for College Students */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border border-purple-200/80">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-900 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Curated High-Impact Project Ideas for Engineering Students</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-purple-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Distributed Task Queue / Job Worker</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Background worker handling asynchronous image processing or email queues using Redis and Node.js.
              </p>
            </div>
            <button
              onClick={() => handleSelectSuggestedIdea(
                'Distributed Task Queue & Background Worker',
                'A distributed background job processing system built with Redis and Node.js workers that handles deferred tasks, retry exponential backoff, and webhook delivery.',
                ['Node.js', 'Redis', 'TypeScript', 'Docker', 'Express']
              )}
              className="mt-3 text-xs font-semibold text-purple-600 hover:text-purple-800 self-start"
            >
              + Use this Project Idea
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-purple-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Real-Time Markdown Collaborative Docs</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Google Docs clone with operational transforms / CRDTs, live cursor tracking, and version history.
              </p>
            </div>
            <button
              onClick={() => handleSelectSuggestedIdea(
                'Real-Time Collaborative Markdown Editor',
                'A collaborative document editor supporting live multi-user editing, cursor presence, conflict resolution via CRDTs, and export to PDF.',
                ['React', 'WebSockets', 'Node.js', 'Tailwind CSS', 'PostgreSQL']
              )}
              className="mt-3 text-xs font-semibold text-purple-600 hover:text-purple-800 self-start"
            >
              + Use this Project Idea
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-purple-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Placement Preparation & Mock Assessment Engine</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Platform for timed engineering assessments, automated code evaluation, and rank analytics.
              </p>
            </div>
            <button
              onClick={() => handleSelectSuggestedIdea(
                'Campus Placement Prep & Mock Assessment Engine',
                'A full-stack testing suite for engineering students featuring timed mock exams for core CS subjects, DSA code submissions, and percentile performance reports.',
                ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
              )}
              className="mt-3 text-xs font-semibold text-purple-600 hover:text-purple-800 self-start"
            >
              + Use this Project Idea
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header: Project Name and Status */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Project Name
                  </span>
                  <h2 className="text-base font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value as ProjectItem['status'])}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border focus:outline-none shrink-0 ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : project.status === 'In Progress'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    onClick={() => openEditModal(project)}
                    title="Edit project details"
                    className="text-slate-400 hover:text-indigo-600 p-1 rounded transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Description
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4 space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Key Achievements / Resume Bullets
                  </span>
                  {project.highlights.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Links and Delete */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Code</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ) : (
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>+ Add GitHub Link</span>
                  </button>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>+ Add Live Demo</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => onDeleteProject(project.id)}
                title="Delete project"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingProjectId ? 'Edit Project Details' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., CampusConnect - Peer Tutoring Platform"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What core problem does this solve? What architecture did you use?"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g., React, TypeScript, Node.js, PostgreSQL, Tailwind CSS"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectItem['status'])}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Link</label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Live Demo Link</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://my-project.vercel.app"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Achievements / Resume Bullets (one per line)
                </label>
                <textarea
                  rows={2}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Engineered JWT authentication with refresh token rotation&#10;Decreased query latency by 45% using PostgreSQL indexing"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
                >
                  {editingProjectId ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
