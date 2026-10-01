import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Building, 
  Code2, 
  FolderGit2, 
  CheckCircle2, 
  Flame, 
  Edit3, 
  Plus, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Github, 
  Linkedin,
  Sparkles,
  Map
} from 'lucide-react';
import { StudentProfile, StudentSkill, ProjectItem, RoadmapStep, DSAProblem, DailyTask } from '../types/career';
import { triggerCelebration } from '../utils/confetti';

interface ProfileSectionProps {
  profile: StudentProfile;
  projects: ProjectItem[];
  roadmap: RoadmapStep[];
  dsaProblems: DSAProblem[];
  tasks: DailyTask[];
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  projects,
  roadmap,
  dsaProblems,
  tasks,
  onUpdateProfile
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<StudentSkill['level']>('Intermediate');
  const [copiedReport, setCopiedReport] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState<StudentProfile>(profile);

  // Computations
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const completedRoadmapSteps = roadmap.filter(s => s.status === 'completed');
  const roadmapPercent = Math.round((completedRoadmapSteps.length / roadmap.length) * 100);
  const solvedDSA = dsaProblems.filter(p => p.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  const handleOpenEdit = () => {
    setEditForm(profile);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    let formattedCollege = editForm.college.trim();
    if (/jain\s+institute\s+of\s+technology(?!\s+davangere)/i.test(formattedCollege)) {
      formattedCollege = 'Jain Institute of Technology Davangere';
    }
    onUpdateProfile({
      ...editForm,
      college: formattedCollege
    });
    setIsEditModalOpen(false);
    triggerCelebration();
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updatedSkills: StudentSkill[] = [
      ...profile.skills,
      { name: newSkillName.trim(), level: newSkillLevel }
    ];

    onUpdateProfile({
      ...profile,
      skills: updatedSkills
    });

    setNewSkillName('');
    setIsAddSkillOpen(false);
  };

  const handleRemoveSkill = (skillName: string) => {
    const updatedSkills = profile.skills.filter(s => s.name !== skillName);
    onUpdateProfile({
      ...profile,
      skills: updatedSkills
    });
  };

  const generateReportText = () => {
    return `=== CAREER JOURNEY - ENGINEERING STUDENT PORTFOLIO REPORT ===
Name: ${profile.name}
College: ${profile.college}
Branch: ${profile.branch} | Year: ${profile.yearOfStudy}
Target Role: ${profile.targetRole}
GitHub: github.com/${profile.githubUsername} | LinkedIn: linkedin.com/${profile.linkedinUsername}

--- LEARNING PROGRESS ---
Roadmap Completion: ${roadmapPercent}% (${completedRoadmapSteps.length} of ${roadmap.length} steps)
DSA Problems Solved: ${solvedDSA} of ${dsaProblems.length}
Daily Tasks Finished: ${completedTasks}
Current Learning Streak: ${profile.streakDays} days

--- TECHNICAL SKILLS ---
${profile.skills.map(s => `- ${s.name} (${s.level})`).join('\n')}

--- COMPLETED PROJECTS ---
${completedProjects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Generated via Career Journey Student App.`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Student Profile Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Background accent banner */}
        <div className="h-20 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6" />

        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-5">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 border-4 border-white text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-md">
              {profile.name.charAt(0)}
            </div>

            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-200/60">
                  {profile.targetRole}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                {profile.branch}
              </p>
              <p className="text-xs text-slate-500">
                {profile.college} · {profile.yearOfStudy}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={handleOpenEdit}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleCopyReport}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'Report Copied!' : 'Export Summary'}</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 mb-4">
            {profile.bio}
          </p>
        )}

        {/* Social / Profiles */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          {profile.githubUsername && (
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <Github className="w-4 h-4 text-slate-500" />
              <span>github.com/{profile.githubUsername}</span>
            </a>
          )}
          {profile.linkedinUsername && (
            <a
              href={`https://linkedin.com/in/${profile.linkedinUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span>linkedin.com/in/{profile.linkedinUsername}</span>
            </a>
          )}
          <div className="flex items-center gap-1 text-amber-600 font-semibold tabular-nums">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{profile.streakDays} Days Learning Streak</span>
          </div>
        </div>
      </div>

      {/* 2-Column: Learning Progress Analytics & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Summary */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Map className="w-4 h-4 text-indigo-600" />
              <span>Learning Progress Overview</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">Live Statistics</span>
          </div>

          <div className="space-y-4">
            {/* Roadmap */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Skills Roadmap Completion</span>
                <span className="text-indigo-600 tabular-nums">{roadmapPercent}% ({completedRoadmapSteps.length}/12)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${roadmapPercent}%` }} 
                />
              </div>
            </div>

            {/* DSA */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">DSA Coding Questions</span>
                <span className="text-blue-600 tabular-nums">{solvedDSA} of {dsaProblems.length} solved</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(solvedDSA / dsaProblems.length) * 100}%` }} 
                />
              </div>
            </div>

            {/* Daily Tasks */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Daily Tasks Completed</span>
                <span className="text-emerald-600 tabular-nums">{completedTasks} tasks</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0}%` }} 
                />
              </div>
            </div>

            {/* Projects Done */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Projects Shipped</span>
                <span className="text-purple-600 tabular-nums">{completedProjects.length} of {projects.length} completed</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${projects.length > 0 ? (completedProjects.length / projects.length) * 100 : 0}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-600" />
                <span>Technical Skills ({profile.skills.length})</span>
              </h2>
            </div>

            <button
              onClick={() => setIsAddSkillOpen(!isAddSkillOpen)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddSkillOpen ? 'Cancel' : 'Add Skill'}</span>
            </button>
          </div>

          {/* Add skill input inline */}
          {isAddSkillOpen && (
            <form onSubmit={handleAddSkill} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2">
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Docker, GraphQL)"
                className="flex-1 min-w-[140px] px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />

              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as StudentSkill['level'])}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Add
              </button>
            </form>
          )}

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all text-xs"
              >
                <span className="font-semibold text-slate-800">{skill.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  skill.level === 'Advanced' 
                    ? 'bg-purple-100 text-purple-700' 
                    : skill.level === 'Intermediate' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {skill.level}
                </span>

                <button
                  onClick={() => handleRemoveSkill(skill.name)}
                  title="Remove skill"
                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Completed List */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-emerald-600" />
            <span>Projects Completed ({completedProjects.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Shipped and ready for resume</span>
        </div>

        {completedProjects.length === 0 ? (
          <p className="text-xs text-slate-500 py-3 text-center">
            No projects marked as Completed yet. Move your projects from "In Progress" to "Completed" in the Projects tab!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedProjects.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {p.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-[10px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">Edit Student Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College / University *</label>
                  <input
                    type="text"
                    required
                    value={editForm.college}
                    onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Degree *</label>
                  <input
                    type="text"
                    required
                    value={editForm.branch}
                    onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Semester</label>
                  <input
                    type="text"
                    value={editForm.yearOfStudy}
                    onChange={(e) => setEditForm({ ...editForm, yearOfStudy: e.target.value })}
                    placeholder="e.g. 2nd Year (3rd Semester)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role</label>
                  <input
                    type="text"
                    value={editForm.targetRole}
                    onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })}
                    placeholder="e.g. SDE 1 / Full Stack Engineer"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Goals</label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Username</label>
                  <input
                    type="text"
                    value={editForm.githubUsername}
                    onChange={(e) => setEditForm({ ...editForm, githubUsername: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Username</label>
                  <input
                    type="text"
                    value={editForm.linkedinUsername}
                    onChange={(e) => setEditForm({ ...editForm, linkedinUsername: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
