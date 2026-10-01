import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles,
  Search
} from 'lucide-react';
import { INITIAL_INTERVIEW_QA } from '../data/initialData';
import { InterviewQA } from '../types/career';

export const CareerSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'resume' | 'internship' | 'job' | 'interview'>('resume');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Resume Checklist State
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    'c1': true,
    'c2': true,
    'c3': true,
    'c4': false,
    'c5': false,
    'c6': true,
    'c7': false,
    'c8': false,
  });

  // Interview Questions state
  const [questions, setQuestions] = useState<InterviewQA[]>(INITIAL_INTERVIEW_QA);
  const [selectedQACategory, setSelectedQACategory] = useState<string>('All');
  const [qaSearch, setQaSearch] = useState('');
  const [expandedQAId, setExpandedQAId] = useState<string | null>('qa-1');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const toggleChecklist = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = questions.filter(q => {
    if (selectedQACategory !== 'All' && q.category !== selectedQACategory) return false;
    if (qaSearch.trim()) {
      const query = qaSearch.toLowerCase();
      return (
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query) ||
        q.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const studentResumeTemplate = `SIDDHARTHA KUMAR
Email: siddhartha@example.com | Phone: +91 98765 43210
GitHub: github.com/siddharthadev | LinkedIn: linkedin.com/in/siddhartha-engineer | Portfolio: siddharthadev.com

EDUCATION
Jain Institute of Technology Davangere
B.Tech in Computer Science and Engineering | CGPA: 8.8 / 10.0 | Expected Graduation: 2027

TECHNICAL SKILLS
- Languages: C++, JavaScript, TypeScript, Python, SQL
- Frameworks & Libraries: React, Node.js, Express, Tailwind CSS, Next.js
- Developer Tools: Git, GitHub, Docker, Postman, Linux / Bash
- Core Competencies: Data Structures & Algorithms, Object-Oriented Design, RESTful APIs, DBMS

FEATURED PROJECTS
CampusConnect - Peer Tutoring & Notes Exchange Platform
- Architected full-stack real-time collaboration application serving 250+ university peer learners.
- Implemented real-time messaging using Socket.io and room authentication with sub-50ms message latency.
- Built categorized document search with debounced text querying and MongoDB indexing, reducing search time by 45%.

AlgoVisualizer - Interactive Algorithm & Graph Simulator
- Visualized 6 graph and sorting algorithms utilizing HTML5 Canvas with smooth 60 FPS requestAnimationFrame rendering.
- Engineered step-by-step state inspection allowing learners to trace variable changes and recursion call stacks.

CERTIFICATIONS & ACHIEVEMENTS
- Solved 200+ Data Structures and Algorithms problems on LeetCode & Codeforces.
- Finalist, Smart India Hackathon (College Phase), 2024.`;

  const coldEmailTemplate = `Subject: Engineering Student - Software Engineering Internship Inquiry - [Your Name]

Dear [Recruiter / Engineering Manager Name],

I hope you are having a wonderful week. My name is [Your Name], and I am a 3rd-year Computer Science student at [Your College Name].

I have been following [Company Name]'s recent work on [mention a specific engineering feature or product, e.g., real-time analytics engine], and I deeply admire your engineering culture and focus on high-performance architecture.

Over the past year, I have built [mention 1 top project, e.g., a real-time collaborative workspace with Socket.io and React], and solved 200+ algorithmic problems focusing on clean code and system fundamentals.

I would love to contribute to your engineering team as a Software Engineer Intern for Summer [Year]. 

I have attached my resume and linked my GitHub below for your review:
- GitHub: [Your GitHub URL]
- Portfolio: [Your Portfolio URL]

Would you be open to a brief 10-minute introductory call next week? I appreciate your time and consideration.

Warm regards,
[Your Name]
[Your Phone Number] | [Your LinkedIn URL]`;

  const linkedInMessageTemplate = `Hi [Name],

I noticed your work as [Title] at [Company Name] and wanted to connect! I'm an engineering student passionate about full-stack development and distributed systems. 

I've built several production projects with React, Node.js, and PostgreSQL (github.com/[your-handle]). I saw [Company Name] is hiring interns and would love to ask 2 quick questions about your team's tech stack if you have a moment.

Thanks so much!
[Your Name]`;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header and Sub-Navigation */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Placement & Hiring Accelerator</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Engineering Career Development Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
          Everything you need to secure top software engineering internships and full-time job offers: ATS resume rules, cold outreach scripts, hiring workflows, and high-frequency interview Q&As.
        </p>

        {/* Sub-tab Navigation */}
        <div className="mt-5 flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => setSubTab('resume')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              subTab === 'resume' 
                ? 'bg-white text-slate-900 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Resume Preparation</span>
          </button>

          <button
            onClick={() => setSubTab('internship')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              subTab === 'internship' 
                ? 'bg-white text-slate-900 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>Internship Preparation</span>
          </button>

          <button
            onClick={() => setSubTab('job')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              subTab === 'job' 
                ? 'bg-white text-slate-900 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Job Preparation</span>
          </button>

          <button
            onClick={() => setSubTab('interview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              subTab === 'interview' 
                ? 'bg-white text-slate-900 shadow-xs font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Interview Questions</span>
          </button>
        </div>
      </div>

      {/* 1. Resume Preparation Sub-Tab */}
      {subTab === 'resume' && (
        <div className="space-y-6 animate-fadeIn">
          {/* ATS Checklist & Best Practices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Checklist */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-2">
                Student Resume ATS Checklist
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                Applicant Tracking Systems (ATS) reject 70% of resumes before a human engineer ever reads them. Ensure your resume passes every check:
              </p>

              <div className="space-y-2.5">
                {[
                  { id: 'c1', text: 'Clean single-column layout (no multi-column tables or text boxes)' },
                  { id: 'c2', text: 'Contact info includes GitHub, LinkedIn, email, and location' },
                  { id: 'c3', text: 'Skills categorized into Languages, Frameworks, Tools, and Core CS' },
                  { id: 'c4', text: 'Project bullets follow Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]' },
                  { id: 'c5', text: 'Includes at least 2 deployed full-stack or systems projects with live/code links' },
                  { id: 'c6', text: 'No arbitrary skill progress bars (e.g., 90% Python - ATS cannot read this)' },
                  { id: 'c7', text: 'Strictly 1 page length for freshers and undergraduates' },
                  { id: 'c8', text: 'Exported as clean, selectable PDF (not an image or flattened scan)' },
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      checklist[item.id] 
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-900' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.id]}
                      onChange={() => toggleChecklist(item.id)}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className={`text-xs font-medium leading-relaxed ${checklist[item.id] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Verbs Library */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                High-Impact Engineering Action Verbs
              </h2>
              <p className="text-xs text-slate-500">
                Replace passive verbs like "Worked on" or "Helped with" with decisive, impactful technical terms:
              </p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 block mb-1">Building & Developing:</span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                    {['Architected', 'Implemented', 'Engineered', 'Constructed', 'Formulated', 'Deployed'].map(v => (
                      <span key={v} className="px-2 py-0.5 bg-slate-100 rounded-md font-mono text-[11px]">{v}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 block mb-1">Optimizing & Scaling:</span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                    {['Refactored', 'Streamlined', 'Accelerated', 'Reduced latency', 'Optimized', 'Automated'].map(v => (
                      <span key={v} className="px-2 py-0.5 bg-slate-100 rounded-md font-mono text-[11px]">{v}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-purple-700 block mb-1">Testing & Security:</span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                    {['Validated', 'Integrated', 'Debugged', 'Standardized', 'Secured', 'Benchmarked'].map(v => (
                      <span key={v} className="px-2 py-0.5 bg-slate-100 rounded-md font-mono text-[11px]">{v}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* XYZ Formula breakdown */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1">
                <span className="font-bold text-indigo-900 block">The Google XYZ Resume Formula:</span>
                <p className="text-indigo-950 leading-relaxed font-mono text-[11px]">
                  "Accomplished [X], as measured by [Y], by doing [Z]"
                </p>
                <p className="text-indigo-800 text-[11px] mt-1">
                  Example: "Reduced database query latency by 42% (Y) by adding multi-column B-Tree indexing in PostgreSQL (Z) across 50,000 student records (X)."
                </p>
              </div>
            </div>
          </div>

          {/* Student Developer Resume Template */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Ready-to-Use Student Developer Resume Template
                </h2>
                <p className="text-xs text-slate-500">
                  Based on Jake's Resume (Overleaf / LaTeX standard used by top tech applicants).
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(studentResumeTemplate, 'resume-template')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors self-start"
              >
                {copiedItem === 'resume-template' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedItem === 'resume-template' ? 'Copied Template!' : 'Copy Template'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
              {studentResumeTemplate}
            </pre>
          </div>
        </div>
      )}

      {/* 2. Internship Preparation Sub-Tab */}
      {subTab === 'internship' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Engineering Year-by-Year Timeline */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Engineering College Internship Timeline
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Strategic phase-by-phase roadmap to land high-paying software internships:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">1st Year</span>
                <h3 className="text-xs font-bold text-slate-900 mb-1">Foundations & Language</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Pick one language (C++, Java, or Python). Master basics, syntax, pointers, and memory. Build simple CLI tools.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">2nd Year</span>
                <h3 className="text-xs font-bold text-slate-900 mb-1">Core DSA & Web Development</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Solve 100+ LeetCode problems. Learn React, Express, and Git. Build your first full-stack application and host it live.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">3rd Year (Peak)</span>
                <h3 className="text-xs font-bold text-slate-900 mb-1">Summer Internship Season</h3>
                <p className="text-[11px] text-indigo-950 leading-relaxed">
                  Peak on-campus tests & off-campus cold outreach. Apply to 50+ companies. Attend mock interviews and hackathons.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">4th Year</span>
                <h3 className="text-xs font-bold text-slate-900 mb-1">PPO & Full-Time Placements</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Convert internship into Pre-Placement Offer (PPO). Revise System Design (LLD/HLD) and Core CS subjects for final placements.
                </p>
              </div>
            </div>
          </div>

          {/* Cold Outreach Message Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cold Email */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Cold Email to Recruiters / Tech Leads</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(coldEmailTemplate, 'cold-email')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    {copiedItem === 'cold-email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'cold-email' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-50 text-slate-800 font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto border border-slate-200">
                  {coldEmailTemplate}
                </pre>
              </div>
            </div>

            {/* LinkedIn DM */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-blue-600" />
                    <span>LinkedIn Connection Message (&lt;300 chars)</span>
                  </h3>
                  <button
                    onClick={() => copyToClipboard(linkedInMessageTemplate, 'linkedin-msg')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    {copiedItem === 'linkedin-msg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedItem === 'linkedin-msg' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-slate-50 text-slate-800 font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto border border-slate-200">
                  {linkedInMessageTemplate}
                </pre>
              </div>

              {/* Recommended Platforms */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Top Curated Platforms for Tech Internships:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { name: 'Wellfound (AngelList)', url: 'https://wellfound.com' },
                    { name: 'Unstop Hackathons', url: 'https://unstop.com' },
                    { name: 'YC Work at a Startup', url: 'https://www.workatastartup.com' },
                    { name: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs' }
                  ].map(p => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
                    >
                      <span>{p.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Job Preparation Sub-Tab */}
      {subTab === 'job' && (
        <div className="space-y-6 animate-fadeIn">
          {/* SDE Hiring Process Blueprint */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Standard SDE 1 Campus & Off-Campus Hiring Rounds
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Top tech companies (FAANG/MAMAA, Product Startups, Unicorns) follow this 4-stage evaluation process:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                  R1
                </div>
                <h3 className="text-xs font-bold text-slate-900">Online Assessment (OA)</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  60-90 minutes on HackerRank / HackerEarth. Usually 2-3 DSA problems + 10-15 Core CS / Aptitude MCQs.
                </p>
                <span className="text-[10px] text-indigo-600 font-semibold block">Key: Speed & edge cases</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  R2
                </div>
                <h3 className="text-xs font-bold text-slate-900">Technical Round 1 (DSA)</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  45-60 minutes live pair programming. 1-2 Medium problems (Trees, Graphs, DP). Explain intuition out loud!
                </p>
                <span className="text-[10px] text-blue-600 font-semibold block">Key: Communication & Big-O</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                  R3
                </div>
                <h3 className="text-xs font-bold text-slate-900">Technical Round 2 (Design & CS)</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  In-depth deep dive into your projects, Low-Level System Design (LLD), OOPs principles, DBMS schemas, and OS concurrency.
                </p>
                <span className="text-[10px] text-purple-600 font-semibold block">Key: Architectural clarity</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                  R4
                </div>
                <h3 className="text-xs font-bold text-slate-900">Managerial & HR (Behavioral)</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  STAR method questions on conflict, leadership, deadline pressures, company values, and culture fit.
                </p>
                <span className="text-[10px] text-emerald-600 font-semibold block">Key: Self-awareness & passion</span>
              </div>
            </div>
          </div>

          {/* SDE Roles & Specializations */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              Software Roles Breakdown for Engineering Graduates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">Frontend Developer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focuses on client-side architecture, React/Next.js, performance optimization, accessibility, and clean component systems.
                </p>
                <span className="text-[11px] text-slate-500 font-mono block">Stack: React, TypeScript, Tailwind</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">Backend Developer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focuses on API design, microservices, databases (SQL/NoSQL), authentication, caching (Redis), and scalability.
                </p>
                <span className="text-[11px] text-slate-500 font-mono block">Stack: Node/Express, Python, PostgreSQL</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">Full-Stack Engineer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  End-to-end ownership of product features from database schema design to responsive UI and cloud deployment.
                </p>
                <span className="text-[11px] text-slate-500 font-mono block">Stack: Next.js, Node, Postgres, Docker</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Interview Questions Sub-Tab */}
      {subTab === 'interview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question Filter & Search Header */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  High-Frequency Interview Questions
                </h2>
                <p className="text-xs text-slate-500">
                  Essential core CS concepts and behavioral prompts asked in 90%+ of engineering interviews.
                </p>
              </div>

              {/* Search */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={qaSearch}
                  onChange={(e) => setQaSearch(e.target.value)}
                  placeholder="Search questions (e.g., ACID, thread, STAR)..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {['All', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Behavioral / HR'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedQACategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedQACategory === cat 
                      ? 'bg-white text-slate-900 shadow-xs font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((item) => {
              const isOpen = expandedQAId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedQAId(isOpen ? null : item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold mb-1">
                        <span>{item.category}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.question}
                      </h3>
                    </div>

                    <div className="p-1 rounded-lg text-slate-400 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-5 bg-slate-50/70 space-y-3 animate-fadeIn">
                      <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                        {item.answer}
                      </div>

                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Key Talking Points for the Interviewer
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {item.keyPoints.map((pt, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
