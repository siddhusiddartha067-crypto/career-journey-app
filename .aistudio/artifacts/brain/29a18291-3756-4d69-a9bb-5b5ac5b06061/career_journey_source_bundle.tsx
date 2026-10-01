/**
 * Career Journey - Complete Editable React TypeScript Application Source Bundle
 * 
 * Target: Engineering students preparing for software engineering roles
 * Tech Stack: React 18/19, Tailwind CSS, Lucide icons, Canvas Confetti, LocalStorage persistence
 */

import React, { useState, useEffect } from 'react';

// ==========================================
// 1. TYPES
// ==========================================
export type NavigationTab = 'home' | 'roadmap' | 'daily' | 'projects' | 'coding' | 'career' | 'profile';
export type StepStatus = 'not_started' | 'in_progress' | 'completed';

export interface RoadmapSubSkill {
  id: string;
  name: string;
  completed: boolean;
}

export interface RoadmapStep {
  id: number;
  title: string;
  category: 'Foundation' | 'Programming' | 'Core CS' | 'Development' | 'Practical' | 'Career Prep';
  description: string;
  estimatedWeeks: string;
  status: StepStatus;
  subSkills: RoadmapSubSkill[];
  keyTopics: string[];
  recommendedResources: { title: string; url: string }[];
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

export interface DSAProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  bookmarked: boolean;
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
  practiceUrl: string;
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
  skills: StudentSkill[];
}

// ==========================================
// 2. INITIAL SEED DATA
// ==========================================
export const INITIAL_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: 'HTML',
    category: 'Foundation',
    description: 'The foundation of the web. Learn semantic markup, accessibility, forms, metadata, and modern HTML5 APIs.',
    estimatedWeeks: '1-2 weeks',
    status: 'completed',
    keyTopics: ['Semantic Elements', 'Forms & Validation', 'SEO Meta Tags', 'Accessibility (ARIA, alt attributes)', 'HTML5 APIs'],
    subSkills: [
      { id: 'h1', name: 'Document Structure & <!DOCTYPE html>', completed: true },
      { id: 'h2', name: 'Semantic tags (article, section, nav, footer)', completed: true },
      { id: 'h3', name: 'Input types, form labels & validation', completed: true },
      { id: 'h4', name: 'Images, responsive pictures, and alt attributes', completed: true },
      { id: 'h5', name: 'Web accessibility basics (ARIA, keyboard navigation)', completed: true }
    ],
    recommendedResources: [
      { title: 'MDN Web Docs - HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { title: 'freeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/learn' }
    ]
  },
  {
    id: 2,
    title: 'CSS',
    category: 'Foundation',
    description: 'Styling the web with precision. Master the Box Model, Flexbox, CSS Grid, responsive design, animations, and Tailwind CSS.',
    estimatedWeeks: '2-3 weeks',
    status: 'completed',
    keyTopics: ['Box Model', 'Flexbox Alignment', 'CSS Grid 2D Layouts', 'Media Queries & Mobile-First', 'Tailwind CSS'],
    subSkills: [
      { id: 'c1', name: 'Box model, box-sizing: border-box', completed: true },
      { id: 'c2', name: 'Flexbox alignment, flex-grow, shrink, basis', completed: true },
      { id: 'c3', name: 'CSS Grid templates, auto-fit, minmax', completed: true },
      { id: 'c4', name: 'CSS Variables and Dark mode theming', completed: true },
      { id: 'c5', name: 'Tailwind CSS utility classes & responsive prefixes', completed: false }
    ],
    recommendedResources: [
      { title: 'Flexbox Froggy - Interactive Game', url: 'https://flexboxfroggy.com/' },
      { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' }
    ]
  },
  {
    id: 3,
    title: 'JavaScript',
    category: 'Programming',
    description: 'The core programming language of the modern web. Understand ES6+, Async/Await, DOM manipulation, closures, and event loops.',
    estimatedWeeks: '3-4 weeks',
    status: 'in_progress',
    keyTopics: ['ES6+', 'DOM Manipulation', 'Promises & Async/Await', 'Closures & Scoping', 'Event Loop & Call Stack'],
    subSkills: [
      { id: 'j1', name: 'Variables (let/const), Types & Coercion', completed: true },
      { id: 'j2', name: 'Array methods (map, filter, reduce, find)', completed: true },
      { id: 'j3', name: 'Promises & Async/Await with try/catch', completed: true },
      { id: 'j4', name: 'Closures & lexical scoping', completed: false },
      { id: 'j5', name: 'Event loop, microtasks vs macrotasks', completed: false }
    ],
    recommendedResources: [
      { title: 'JavaScript.info - The Modern Tutorial', url: 'https://javascript.info/' },
      { title: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
    ]
  },
  {
    id: 4,
    title: 'Python',
    category: 'Programming',
    description: 'Versatile language for backend development, scripting, data handling, and algorithmic problem-solving.',
    estimatedWeeks: '3-4 weeks',
    status: 'in_progress',
    keyTopics: ['Pythonic Syntax & Comprehensions', 'OOP (Classes & Objects)', 'File I/O & Exceptions', 'Decorators & Generators', 'FastAPI / Flask Basics'],
    subSkills: [
      { id: 'p1', name: 'Data structures (lists, tuples, dicts, sets)', completed: true },
      { id: 'p2', name: 'Object-Oriented Programming', completed: true },
      { id: 'p3', name: 'List & dictionary comprehensions', completed: true },
      { id: 'p4', name: 'Decorators, *args and **kwargs', completed: false },
      { id: 'p5', name: 'FastAPI / Flask basic API routing', completed: false }
    ],
    recommendedResources: [
      { title: 'Official Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'CS50P - Python Programming', url: 'https://cs50.harvard.edu/python/' }
    ]
  },
  {
    id: 5,
    title: 'Data Structures and Algorithms',
    category: 'Core CS',
    description: 'The backbone of technical engineering interviews and efficient software design. Master arrays, trees, graphs, and dynamic programming.',
    estimatedWeeks: '6-8 weeks',
    status: 'in_progress',
    keyTopics: ['Big-O Analysis', 'Arrays, Hash Maps & Two Pointers', 'Linked Lists, Stacks & Queues', 'Binary Trees & Traversals', 'Graphs & Dynamic Programming'],
    subSkills: [
      { id: 'd1', name: 'Big O asymptotic time & space analysis', completed: true },
      { id: 'd2', name: 'Hash Map lookups & frequency counters', completed: true },
      { id: 'd3', name: 'Two pointers and sliding window pattern', completed: true },
      { id: 'd4', name: 'Binary Tree BFS & DFS traversals', completed: false },
      { id: 'd5', name: 'Dynamic Programming memoization & tabulation', completed: false }
    ],
    recommendedResources: [
      { title: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap' },
      { title: 'Striver A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' }
    ]
  },
  {
    id: 6,
    title: 'Git and GitHub',
    category: 'Foundation',
    description: 'Industry-standard version control. Track code history, branch effectively, write clean commits, and collaborate on pull requests.',
    estimatedWeeks: '1-2 weeks',
    status: 'in_progress',
    keyTopics: ['Git Init, Add, Commit, Push, Pull', 'Branching & Feature Workflows', 'Merge vs. Rebase & Conflicts', 'Pull Requests & Code Reviews', 'Writing Clean README Files'],
    subSkills: [
      { id: 'g1', name: 'Configuring Git user credentials & SSH keys', completed: true },
      { id: 'g2', name: 'Committing with conventional commit messages', completed: true },
      { id: 'g3', name: 'Branching and creating GitHub Pull Requests', completed: true },
      { id: 'g4', name: 'Resolving merge conflicts in code editor', completed: false },
      { id: 'g5', name: 'Writing clean project README with markdown', completed: false }
    ],
    recommendedResources: [
      { title: 'Pro Git Book (Free)', url: 'https://git-scm.com/book/en/v2' },
      { title: 'Learn Git Branching', url: 'https://learngitbranching.js.org/' }
    ]
  },
  {
    id: 7,
    title: 'SQL',
    category: 'Core CS',
    description: 'Relational databases and structured queries. Understand schemas, JOIN operations, indexing, aggregation, and normalization.',
    estimatedWeeks: '2-3 weeks',
    status: 'not_started',
    keyTopics: ['Relational Schema Design & Keys', 'SELECT, GROUP BY, HAVING, ORDER BY', 'INNER, LEFT, RIGHT, FULL JOINS', 'Subqueries & CTEs', 'Indexing, Transactions & ACID'],
    subSkills: [
      { id: 's1', name: 'CRUD queries (Create, Read, Update, Delete)', completed: false },
      { id: 's2', name: 'Multi-table JOIN operations', completed: false },
      { id: 's3', name: 'Aggregate functions (COUNT, SUM, AVG) with GROUP BY', completed: false },
      { id: 's4', name: 'Database normalization (1NF, 2NF, 3NF)', completed: false },
      { id: 's5', name: 'Query optimization and B-Tree indexes', completed: false }
    ],
    recommendedResources: [
      { title: 'SQLBolt - Interactive SQL Lessons', url: 'https://sqlbolt.com/' },
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' }
    ]
  },
  {
    id: 8,
    title: 'Web Development',
    category: 'Development',
    description: 'Building modern full-stack web applications. Learn React, component state, REST APIs, client-server communication, and Node.js/Express.',
    estimatedWeeks: '4-6 weeks',
    status: 'not_started',
    keyTopics: ['React Fundamentals & JSX', 'React Hooks (useState, useEffect)', 'RESTful APIs with Node.js & Express', 'Authentication (JWT & Cookies)', 'Database Connectivity'],
    subSkills: [
      { id: 'w1', name: 'React component lifecycle & state management', completed: false },
      { id: 'w2', name: 'Fetching data and handling loading/error states', completed: false },
      { id: 'w3', name: 'Building REST endpoints in Node.js/Express', completed: false },
      { id: 'w4', name: 'CORS, HTTP status codes & middleware', completed: false },
      { id: 'w5', name: 'Connecting full-stack frontend to database', completed: false }
    ],
    recommendedResources: [
      { title: 'React Official Documentation', url: 'https://react.dev/' },
      { title: 'Full Stack Open', url: 'https://fullstackopen.com/en/' }
    ]
  },
  {
    id: 9,
    title: 'Projects',
    category: 'Practical',
    description: 'Translate theoretical knowledge into real, production-grade applications that stand out on your resume and impress recruiters.',
    estimatedWeeks: '3-4 weeks',
    status: 'not_started',
    keyTopics: ['Architecture & Clean Code', 'User Authentication & Routes', 'Database Integration & Migrations', 'Responsive UI & Error Handling', 'Cloud Deployment'],
    subSkills: [
      { id: 'pr1', name: 'Build 1 standout Full-Stack CRUD project', completed: false },
      { id: 'pr2', name: 'Deploy project live with working demo link', completed: false },
      { id: 'pr3', name: 'Write professional README with screenshots & architecture diagram', completed: false },
      { id: 'pr4', name: 'Implement user auth & real database storage', completed: false },
      { id: 'pr5', name: 'Pin top repositories on GitHub profile', completed: false }
    ],
    recommendedResources: [
      { title: 'Build Your Own X Guides', url: 'https://github.com/codecrafters-io/build-your-own-x' },
      { title: 'App Ideas Collection', url: 'https://github.com/florinpop17/app-ideas' }
    ]
  },
  {
    id: 10,
    title: 'Resume',
    category: 'Career Prep',
    description: 'Craft an ATS-optimized, single-page engineering resume showcasing strong project impact, technical skills, and academic achievements.',
    estimatedWeeks: '1 week',
    status: 'not_started',
    keyTopics: ['ATS Friendly Formatting', 'Action-Verb Bullet Points with Metrics', 'Google XYZ Formula', 'Technical Skills Grouping', 'Clean 1-Page Layout'],
    subSkills: [
      { id: 're1', name: 'Use Jake\'s Resume / Overleaf LaTeX template or clean 1-page layout', completed: false },
      { id: 're2', name: 'Format 3 top projects using impact metrics', completed: false },
      { id: 're3', name: 'Categorize skills cleanly without arbitrary percentage bars', completed: false },
      { id: 're4', name: 'Proofread for zero grammatical or spelling errors', completed: false },
      { id: 're5', name: 'Export cleanly formatted PDF file', completed: false }
    ],
    recommendedResources: [
      { title: 'r/EngineeringResumes Wiki & Checklist', url: 'https://www.reddit.com/r/EngineeringResumes/wiki/index/' },
      { title: 'Jake\'s Resume LaTeX Template on Overleaf', url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs' }
    ]
  },
  {
    id: 11,
    title: 'Internship',
    category: 'Career Prep',
    description: 'Navigate internship hiring cycles. Learn cold outreach, LinkedIn networking, hackathons, and on/off-campus application tracking.',
    estimatedWeeks: '3-6 weeks',
    status: 'not_started',
    keyTopics: ['Internship Timelines for Tech', 'Cold Emailing Engineers & Recruiters', 'Leveraging Alumni on LinkedIn', 'Hackathons & Coding Contests', 'Application Tracking Kanban'],
    subSkills: [
      { id: 'in1', name: 'Optimize LinkedIn profile with headline & projects', completed: false },
      { id: 'in2', name: 'Prepare customized cold message template', completed: false },
      { id: 'in3', name: 'Apply to at least 25 targeted tech companies/startups', completed: false },
      { id: 'in4', name: 'Participate in at least 1 coding contest or hackathon', completed: false },
      { id: 'in5', name: 'Follow up respectfully after 5-7 business days', completed: false }
    ],
    recommendedResources: [
      { title: 'Wellfound Startup Jobs', url: 'https://wellfound.com/' },
      { title: 'Unstop Tech Challenges & Hackathons', url: 'https://unstop.com/' }
    ]
  },
  {
    id: 12,
    title: 'Interview Preparation',
    category: 'Career Prep',
    description: 'Ace technical and HR rounds. Master live coding, Core CS fundamentals (OOP, DBMS, OS, CN), System Design basics, and behavioral STAR stories.',
    estimatedWeeks: '3-4 weeks',
    status: 'not_started',
    keyTopics: ['Live Coding & Explaining Thoughts Out Loud', 'Core CS Fundamentals (OOP, DBMS, OS, Networks)', 'Low-Level System Design (LLD) Basics', 'Behavioral STAR Method', 'Peer Mock Interviews'],
    subSkills: [
      { id: 'ip1', name: 'Practice 5 mock coding interviews with timer', completed: false },
      { id: 'ip2', name: 'Revise 50 core CS conceptual questions', completed: false },
      { id: 'ip3', name: 'Prepare 4 STAR stories for behavioral rounds', completed: false },
      { id: 'ip4', name: 'Formulate thoughtful questions to ask the interviewer', completed: false },
      { id: 'ip5', name: 'Complete 1 end-to-end full mock interview simulation', completed: false }
    ],
    recommendedResources: [
      { title: 'Pramp - Peer Mock Interviews', url: 'https://www.pramp.com/' },
      { title: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org/' }
    ]
  }
];

export const INITIAL_TASKS: DailyTask[] = [
  { id: 't-1', title: 'Solve LeetCode #1: Two Sum (Optimal Hash Map approach)', category: 'DSA', priority: 'high', estimatedMinutes: 30, completed: true, dateAdded: 'Today' },
  { id: 't-2', title: 'Build responsive navigation bar using Tailwind CSS Flexbox', category: 'Web Dev', priority: 'high', estimatedMinutes: 45, completed: true, dateAdded: 'Today' },
  { id: 't-3', title: 'Review Git merge vs. rebase differences & commit conventions', category: 'Core CS', priority: 'medium', estimatedMinutes: 20, completed: false, dateAdded: 'Today' },
  { id: 't-4', title: 'Refactor user authentication routes with JWT verification', category: 'Project', priority: 'high', estimatedMinutes: 50, completed: false, dateAdded: 'Today' },
  { id: 't-5', title: 'Update LinkedIn headline & add latest project GitHub repository', category: 'Career', priority: 'low', estimatedMinutes: 15, completed: false, dateAdded: 'Today' }
];

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Siddhartha',
  college: 'Jain Institute of Technology',
  branch: 'Computer Science & Engineering',
  yearOfStudy: '3rd Year (6th Semester)',
  targetRole: 'Software Development Engineer (SDE 1)',
  bio: 'Aspiring Full-Stack Software Engineer passionate about clean architectures, distributed systems, and solving data structure problems. Preparing for campus placements and top tech internships.',
  githubUsername: 'siddharthadev',
  linkedinUsername: 'siddhartha-engineer',
  streakDays: 5,
  skills: [
    { name: 'C++', level: 'Advanced' },
    { name: 'JavaScript / TypeScript', level: 'Intermediate' },
    { name: 'React.js', level: 'Intermediate' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'SQL & PostgreSQL', level: 'Beginner' },
    { name: 'Tailwind CSS', level: 'Advanced' }
  ]
};
