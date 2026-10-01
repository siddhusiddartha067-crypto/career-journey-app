import { RoadmapStep, DailyTask, ProjectItem, DSAProblem, InterviewQA, StudentProfile } from '../types/career';

export const INITIAL_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    title: 'HTML & CSS',
    category: 'Foundation',
    description: 'The visual and structural foundation of web applications. Learn semantic markup, accessibility, the Box Model, Flexbox, CSS Grid, animations, and responsive utility styling with Tailwind CSS.',
    estimatedWeeks: '2-3 weeks',
    status: 'completed',
    keyTopics: [
      'Semantic Elements (header, nav, main, section, footer)',
      'Forms, Input Types & Validation',
      'Accessibility Standards (ARIA, alt attributes, WCAG AA)',
      'Box Model, Flexbox Alignment & CSS Grid Layouts',
      'Mobile-First Responsive Design & Tailwind CSS'
    ],
    subSkills: [
      { id: 'hc1', name: 'Semantic markup & document structure', completed: true },
      { id: 'hc2', name: 'Images, responsive picture tags & alt attributes', completed: true },
      { id: 'hc3', name: 'Box model (margin, border, padding, border-box)', completed: true },
      { id: 'hc4', name: 'Flexbox axis alignment & responsive CSS Grid', completed: true },
      { id: 'hc5', name: 'Tailwind CSS utility classes & responsive variants', completed: true }
    ],
    recommendedResources: [
      { title: 'MDN Web Docs - HTML & CSS Curriculum', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Learn' },
      { title: 'freeCodeCamp - Responsive Web Design Certification', type: 'Course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
      { title: 'Tailwind CSS Official Documentation', type: 'Documentation', url: 'https://tailwindcss.com/docs' }
    ]
  },
  {
    id: 2,
    title: 'JavaScript',
    category: 'Programming',
    description: 'The core programming language of the modern web. Master ES6+ syntax, asynchronous programming, DOM manipulation, closures, prototypes, and event loop execution.',
    estimatedWeeks: '3-4 weeks',
    status: 'completed',
    keyTopics: [
      'Variables (let/const), Primitive Types & Type Coercion',
      'Modern ES6+ (Destructuring, Spread/Rest, Arrow Functions, Modules)',
      'Asynchronous JS (Promises, async/await, Fetch API)',
      'Closures, Lexical Scope, Hoisting & the "this" keyword',
      'Event Loop, Call Stack, Microtasks & Macrotasks'
    ],
    subSkills: [
      { id: 'js1', name: 'Array methods (map, filter, reduce, find, some, every)', completed: true },
      { id: 'js2', name: 'Promises, error handling & async/await workflows', completed: true },
      { id: 'js3', name: 'DOM manipulation & efficient event delegation', completed: true },
      { id: 'js4', name: 'Lexical scope, closures & function currying', completed: true },
      { id: 'js5', name: 'Event loop concurrency model & timer behaviors', completed: true }
    ],
    recommendedResources: [
      { title: 'JavaScript.info - The Modern JavaScript Tutorial', type: 'Guide', url: 'https://javascript.info/' },
      { title: 'MDN JavaScript Guide', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { title: 'Namaste JavaScript by Akshay Saini', type: 'Course', url: 'https://www.youtube.com/@akshaymarch7' }
    ]
  },
  {
    id: 3,
    title: 'Python',
    category: 'Programming',
    description: 'Versatile language for backend development, scripting, data handling, and algorithmic problem-solving with expressive syntax.',
    estimatedWeeks: '3-4 weeks',
    status: 'in_progress',
    keyTopics: [
      'Pythonic Syntax, List & Dictionary Comprehensions',
      'Object-Oriented Programming (Classes, Inheritance, Dunder Methods)',
      'File Handling, Context Managers & Exception Handling',
      'Decorators, Generators & Functional Iteration',
      'Virtual Environments, Pip & Modular Code Organization'
    ],
    subSkills: [
      { id: 'py1', name: 'Built-in data structures (lists, tuples, dicts, sets)', completed: true },
      { id: 'py2', name: 'OOP implementation with classes and dunder methods', completed: true },
      { id: 'py3', name: 'List, set & dictionary comprehensions', completed: true },
      { id: 'py4', name: 'Custom decorators and generator functions', completed: false },
      { id: 'py5', name: 'Exception handling with try/except/finally blocks', completed: false }
    ],
    recommendedResources: [
      { title: 'Official Python Documentation & Tutorial', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/' },
      { title: 'CS50P - CS50 Introduction to Programming with Python', type: 'Course', url: 'https://cs50.harvard.edu/python/' },
      { title: 'Automate the Boring Stuff with Python', type: 'Guide', url: 'https://automatetheboringstuff.com/' }
    ]
  },
  {
    id: 4,
    title: 'C/C++',
    category: 'Programming',
    description: 'High-performance systems programming and the foundation for competitive programming. Master pointers, manual memory allocation, and the Standard Template Library (STL).',
    estimatedWeeks: '3-4 weeks',
    status: 'in_progress',
    keyTopics: [
      'Pointers, References & Direct Memory Addresses',
      'Dynamic Memory Allocation (malloc/free, new/delete)',
      'C++ STL (vector, map, unordered_map, set, priority_queue, stack)',
      'Object-Oriented Design in C++ (Constructors, Destructors, Polymorphism)',
      'Fast I/O & Competitive Programming Best Practices'
    ],
    subSkills: [
      { id: 'cpp1', name: 'Pointers, pointer arithmetic & reference variables', completed: true },
      { id: 'cpp2', name: 'C++ STL containers (vector, unordered_map, set, stack)', completed: true },
      { id: 'cpp3', name: 'C++ STL algorithms (sort, binary_search, lower_bound)', completed: true },
      { id: 'cpp4', name: 'Dynamic memory management & avoiding memory leaks', completed: false },
      { id: 'cpp5', name: 'OOP concepts (Inheritance, virtual functions, templates)', completed: false }
    ],
    recommendedResources: [
      { title: 'LearnCpp.com - Comprehensive C++ Tutorial', type: 'Guide', url: 'https://www.learncpp.com/' },
      { title: 'cppreference.com - Standard C++ Reference', type: 'Documentation', url: 'https://en.cppreference.com/w/' },
      { title: 'Luv C++ STL Playlist for Competitive Programming', type: 'Course', url: 'https://www.youtube.com/@LuvMaths' }
    ]
  },
  {
    id: 5,
    title: 'Data Structures',
    category: 'Core CS',
    description: 'The structural foundation of efficient computer software. Understand how data is stored, referenced, and traversed in memory.',
    estimatedWeeks: '4-5 weeks',
    status: 'in_progress',
    keyTopics: [
      'Linear Structures: Arrays, Strings, Singly & Doubly Linked Lists',
      'Stacks (LIFO) & Queues (FIFO, Deque, Priority Queue)',
      'Hash Tables, Hash Functions, Collision Resolution & Amortized O(1)',
      'Trees: Binary Trees, Binary Search Trees, AVL & Heaps',
      'Graphs: Adjacency Matrix & Adjacency List Representations'
    ],
    subSkills: [
      { id: 'ds1', name: 'Implement Singly and Doubly Linked Lists from scratch', completed: true },
      { id: 'ds2', name: 'Stack and Queue implementations and applications', completed: true },
      { id: 'ds3', name: 'Hash Map lookups, hash collision handling', completed: true },
      { id: 'ds4', name: 'Binary Tree traversals (Inorder, Preorder, Postorder, Level-order)', completed: false },
      { id: 'ds5', name: 'Min-Heap and Max-Heap priority queue operations', completed: false }
    ],
    recommendedResources: [
      { title: 'NeetCode Roadmap - Core Data Structures', type: 'Guide', url: 'https://neetcode.io/roadmap' },
      { title: 'Striver A2Z DSA Sheet - Data Structures Track', type: 'Course', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/' },
      { title: 'VisuAlgo - Visualising Data Structures and Algorithms', type: 'Interactive', url: 'https://visualgo.net/en' }
    ]
  },
  {
    id: 6,
    title: 'Algorithms',
    category: 'Core CS',
    description: 'Algorithmic problem-solving methodologies for technical coding assessments. Master asymptotic complexity analysis and fundamental algorithmic paradigms.',
    estimatedWeeks: '4-6 weeks',
    status: 'in_progress',
    keyTopics: [
      'Big-O Time & Space Complexity Analysis',
      'Searching: Linear Search, Binary Search & Search on Answer',
      'Sorting: Merge Sort, Quick Sort, Insertion Sort & Counting Sort',
      'Two Pointers, Sliding Window & Prefix Sum Patterns',
      'Graph Traversals (BFS, DFS), Recursion, Backtracking & Dynamic Programming'
    ],
    subSkills: [
      { id: 'alg1', name: 'Asymptotic Big-O time and space complexity evaluation', completed: true },
      { id: 'alg2', name: 'Binary Search implementation and boundary conditions', completed: true },
      { id: 'alg3', name: 'Divide-and-conquer sorting (Merge Sort & Quick Sort)', completed: true },
      { id: 'alg4', name: 'Breadth-First Search (BFS) and Depth-First Search (DFS)', completed: false },
      { id: 'alg5', name: 'Dynamic Programming: Memoization and Tabulation approaches', completed: false }
    ],
    recommendedResources: [
      { title: 'Introduction to Algorithms (CLRS Book Guide)', type: 'Guide', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
      { title: 'Abdul Bari - Algorithms Video Lectures', type: 'Course', url: 'https://www.youtube.com/@abdul_bari' },
      { title: 'LeetCode Problem Archive', type: 'Interactive', url: 'https://leetcode.com/problemset/all/' }
    ]
  },
  {
    id: 7,
    title: 'SQL',
    category: 'Core CS',
    description: 'Relational database architecture and structured querying. Master table schemas, multi-table JOINs, aggregations, indexing, and transactional ACID guarantees.',
    estimatedWeeks: '2-3 weeks',
    status: 'not_started',
    keyTopics: [
      'Relational Schema Design, Primary Keys & Foreign Keys',
      'Data Querying: SELECT, WHERE, GROUP BY, HAVING, ORDER BY',
      'Table Joins: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN',
      'Subqueries, Common Table Expressions (CTEs) & Window Functions',
      'Database Normalization (1NF to 3NF), B-Tree Indexing & ACID Transactions'
    ],
    subSkills: [
      { id: 'sql1', name: 'Write fluent CRUD operations and filtered queries', completed: false },
      { id: 'sql2', name: 'Multi-table INNER and OUTER joins with condition filters', completed: false },
      { id: 'sql3', name: 'Aggregate data using GROUP BY and HAVING clauses', completed: false },
      { id: 'sql4', name: 'Database normalization rules and reducing data redundancy', completed: false },
      { id: 'sql5', name: 'Index creation, EXPLAIN query plans & transaction isolation', completed: false }
    ],
    recommendedResources: [
      { title: 'SQLBolt - Interactive SQL Lessons', type: 'Interactive', url: 'https://sqlbolt.com/' },
      { title: 'PostgreSQL Official Documentation', type: 'Documentation', url: 'https://www.postgresql.org/docs/' },
      { title: 'Use The Index, Luke - SQL Indexing Guide', type: 'Guide', url: 'https://use-the-index-luke.com/' }
    ]
  },
  {
    id: 8,
    title: 'Git & GitHub',
    category: 'Foundation',
    description: 'Version control workflows used by professional software engineering teams. Track revisions, manage branches, handle merge conflicts, and collaborate through pull requests.',
    estimatedWeeks: '1-2 weeks',
    status: 'completed',
    keyTopics: [
      'Git Architecture: Working Directory, Staging Area & Repository',
      'Core Commands: init, add, commit, status, log, diff, checkout',
      'Branching Strategies, Git Merge vs. Git Rebase',
      'Resolving Merge Conflicts Confidently in Code Editors',
      'GitHub Workflows: Remotes, Forks, Pull Requests & Code Reviews'
    ],
    subSkills: [
      { id: 'git1', name: 'Configuring Git credentials and SSH authentication keys', completed: true },
      { id: 'git2', name: 'Writing clear, conventional commit messages', completed: true },
      { id: 'git3', name: 'Creating feature branches and opening GitHub Pull Requests', completed: true },
      { id: 'git4', name: 'Resolving merge conflicts and rebasing branches cleanly', completed: true },
      { id: 'git5', name: 'Drafting professional markdown README documentation for repositories', completed: true }
    ],
    recommendedResources: [
      { title: 'Pro Git Book (Free by Scott Chacon)', type: 'Documentation', url: 'https://git-scm.com/book/en/v2' },
      { title: 'Learn Git Branching - Interactive Sandbox', type: 'Interactive', url: 'https://learngitbranching.js.org/' },
      { title: 'GitHub Skills - Hands-on Interactive Tutorials', type: 'Course', url: 'https://skills.github.com/' }
    ]
  },
  {
    id: 9,
    title: 'React',
    category: 'Frontend',
    description: 'Declarative component-based UI engineering. Master JSX, reactive state, side effects, custom hooks, component composition, and client-side routing.',
    estimatedWeeks: '3-4 weeks',
    status: 'in_progress',
    keyTopics: [
      'Declarative Component Architecture & JSX Syntax',
      'Core Hooks: useState, useEffect, useRef, useMemo, useCallback',
      'State Lifting, Prop Drilling & Context API for Global State',
      'Controlled vs. Uncontrolled Form Elements & Custom Hooks',
      'Component Lifecycle, Reconciliation & Virtual DOM Internals'
    ],
    subSkills: [
      { id: 'rc1', name: 'Building reusable, modular components with TypeScript props', completed: true },
      { id: 'rc2', name: 'Managing local state and side effects with useState and useEffect', completed: true },
      { id: 'rc3', name: 'Fetching API data with loading and error boundary states', completed: true },
      { id: 'rc4', name: 'Authoring clean custom hooks to encapsulate reusable logic', completed: false },
      { id: 'rc5', name: 'Performance optimization with React.memo and useCallback', completed: false }
    ],
    recommendedResources: [
      { title: 'React Official Documentation (react.dev)', type: 'Documentation', url: 'https://react.dev/' },
      { title: 'Epic React Articles by Kent C. Dodds', type: 'Guide', url: 'https://kentcdodds.com/blog' },
      { title: 'Full Stack Open - React Module', type: 'Course', url: 'https://fullstackopen.com/en/part1' }
    ]
  },
  {
    id: 10,
    title: 'Backend Development',
    category: 'Backend',
    description: 'Server-side engineering, RESTful API design, database persistence, and secure authentication protocols with Node.js and Express.',
    estimatedWeeks: '4-5 weeks',
    status: 'not_started',
    keyTopics: [
      'Node.js Runtime Architecture, Event Loop & Non-blocking I/O',
      'RESTful API Principles, HTTP Methods & Status Codes',
      'Express Framework: Routers, Middleware & Error Handlers',
      'Authentication: Password Hashing (bcrypt), JWT Tokens & Cookies',
      'Database ORM/Query Integration (PostgreSQL, MongoDB) & CORS Security'
    ],
    subSkills: [
      { id: 'be1', name: 'Build structured REST API endpoints using Express', completed: false },
      { id: 'be2', name: 'Implement custom middleware for request logging and error handling', completed: false },
      { id: 'be3', name: 'Secure user login with password hashing and JWT authentication', completed: false },
      { id: 'be4', name: 'Connect Express server to relational and document databases', completed: false },
      { id: 'be5', name: 'Input validation and sanitization against injection attacks', completed: false }
    ],
    recommendedResources: [
      { title: 'MDN Express Web Framework Tutorial', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' },
      { title: 'Node.js Official Documentation', type: 'Documentation', url: 'https://nodejs.org/docs/latest/api/' },
      { title: 'RESTful API Design Best Practices', type: 'Guide', url: 'https://restfulapi.net/' }
    ]
  },
  {
    id: 11,
    title: 'Projects',
    category: 'Practical',
    description: 'Translating knowledge into production-grade full-stack applications that demonstrate system architecture, clean code, and user value.',
    estimatedWeeks: '4-6 weeks',
    status: 'not_started',
    keyTopics: [
      'Full-Stack Architecture Design & Component Wireframing',
      'Secure End-to-End Authentication & Role-Based Authorization',
      'Relational Database Schema Design & Real Data Integration',
      'Clean Code, TypeScript Safety & Error Handling',
      'Production Deployment (Vercel, Render, Railway, AWS)'
    ],
    subSkills: [
      { id: 'prj1', name: 'Architect and build a full-stack CRUD application', completed: false },
      { id: 'prj2', name: 'Deploy project live with custom domain and public URL', completed: false },
      { id: 'prj3', name: 'Write a comprehensive README with architecture diagrams and setup instructions', completed: false },
      { id: 'prj4', name: 'Implement persistent database storage with foreign key relations', completed: false },
      { id: 'prj5', name: 'Feature project on GitHub profile with clean commit history', completed: false }
    ],
    recommendedResources: [
      { title: 'Build Your Own X - Open Source Directory', type: 'Guide', url: 'https://github.com/codecrafters-io/build-your-own-x' },
      { title: 'Full Stack Open - University of Helsinki', type: 'Course', url: 'https://fullstackopen.com/en/' },
      { title: 'roadmap.sh - Full Stack Developer Guidance', type: 'Guide', url: 'https://roadmap.sh/full-stack' }
    ]
  },
  {
    id: 12,
    title: 'Placement & Interview Preparation',
    category: 'Career Prep',
    description: 'Comprehensive preparation for campus placement drives and off-campus tech hiring: ATS resume formatting, online assessments, technical rounds, Core CS, and behavioral interviews.',
    estimatedWeeks: '4-6 weeks',
    status: 'not_started',
    keyTopics: [
      'ATS-Compliant Single-Page Software Engineer Resume',
      'Online Coding Assessments (HackerRank, CodeChef, LeetCode)',
      'Live Technical Coding Interviews & Communicating Big-O Intuition',
      'Core CS Subject Revision (OOP, DBMS, OS, Computer Networks)',
      'Behavioral Rounds & STAR Method (Situation, Task, Action, Result)'
    ],
    subSkills: [
      { id: 'pip1', name: 'Format ATS-optimized 1-page engineering resume with metrics', completed: false },
      { id: 'pip2', name: 'Complete 30 timed Online Assessment coding simulations', completed: false },
      { id: 'pip3', name: 'Revise 50 essential Core CS questions (OOP, DBMS, OS, Networks)', completed: false },
      { id: 'pip4', name: 'Prepare 5 structured behavioral STAR stories from real projects', completed: false },
      { id: 'pip5', name: 'Conduct peer mock interviews with whiteboard problem solving', completed: false }
    ],
    recommendedResources: [
      { title: 'Tech Interview Handbook by Yangshun Tay', type: 'Guide', url: 'https://www.techinterviewhandbook.org/' },
      { title: 'r/EngineeringResumes Wiki and Best Practices', type: 'Guide', url: 'https://www.reddit.com/r/EngineeringResumes/wiki/index/' },
      { title: 'Pramp - Free Peer Technical Mock Interviews', type: 'Interactive', url: 'https://www.pramp.com/' }
    ]
  }
];

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'Solve LeetCode #1: Two Sum (Optimal Hash Map approach)',
    category: 'DSA',
    priority: 'high',
    estimatedMinutes: 30,
    completed: true,
    dateAdded: 'Today'
  },
  {
    id: 'task-2',
    title: 'Build responsive navigation bar using Tailwind CSS Flexbox',
    category: 'Web Dev',
    priority: 'high',
    estimatedMinutes: 45,
    completed: true,
    dateAdded: 'Today'
  },
  {
    id: 'task-3',
    title: 'Review Git merge vs. rebase differences & commit conventions',
    category: 'Core CS',
    priority: 'medium',
    estimatedMinutes: 20,
    completed: false,
    dateAdded: 'Today'
  },
  {
    id: 'task-4',
    title: 'Refactor user authentication routes with JWT verification',
    category: 'Project',
    priority: 'high',
    estimatedMinutes: 50,
    completed: false,
    dateAdded: 'Today'
  },
  {
    id: 'task-5',
    title: 'Revise DBMS ACID properties and indexing concepts',
    category: 'Core CS',
    priority: 'medium',
    estimatedMinutes: 25,
    completed: false,
    dateAdded: 'Today'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'CampusConnect - Peer Tutoring & Study Material Exchange',
    description: 'A full-stack collaborative platform for university students to share lecture notes, find study buddies by subject, and schedule peer tutoring sessions with real-time messaging.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Socket.io'],
    status: 'In Progress',
    githubUrl: 'https://github.com/siddharthadev/campus-connect',
    liveUrl: 'https://campus-connect.demo.app',
    highlights: [
      'Implemented real-time messaging with Socket.io and room-based authentication',
      'Created categorized document search with debounced text querying and indexing',
      'Engineered JWT-based role authorization for student learners and peer tutors'
    ]
  },
  {
    id: 'proj-2',
    title: 'AlgoVisualizer - Interactive Algorithm & Graph Simulator',
    description: 'An interactive web tool that step-by-step visualizes pathfinding algorithms (Dijkstra, A*, BFS, DFS) and sorting routines (Quick Sort, Merge Sort) with customizable speeds and obstacle walls.',
    technologies: ['TypeScript', 'React', 'HTML5 Canvas', 'Tailwind CSS'],
    status: 'Completed',
    githubUrl: 'https://github.com/siddharthadev/algo-visualizer',
    liveUrl: 'https://algo-visualizer.demo.app',
    highlights: [
      'Visualized graph traversal animations with 60 FPS requestAnimationFrame rendering',
      'Provided step-by-step state inspection and pseudocode highlighter for learners',
      'Achieved 100% mobile-friendly responsive grid touch interaction'
    ]
  },
  {
    id: 'proj-3',
    title: 'DevTrack - Software Engineering Internship Tracker',
    description: 'A specialized job application tracker built for computer science students to manage application stages, cold email follow-up alerts, interview dates, and salary comparisons.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    status: 'Planned',
    githubUrl: 'https://github.com/siddharthadev/devtrack-app',
    liveUrl: 'https://devtrack.demo.app',
    highlights: [
      'Kanban drag-and-drop board for Applied, Interview, Offer, and Rejected stages',
      'Automated email reminder triggers for pending recruiter follow-up windows',
      'Aggregated interview question log for company-specific debriefs'
    ]
  },
  {
    id: 'proj-4',
    title: 'FastStore - High-Performance E-Commerce Backend API',
    description: 'RESTful microservice handling product catalogs, inventory reservations with Redis locks, order processing, and Stripe payment webhook integrations.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    status: 'Planned',
    githubUrl: 'https://github.com/siddharthadev/faststore-api',
    highlights: [
      'Designed normalized PostgreSQL relational schema handling 100k+ inventory SKUs',
      'Used Redis in-memory caching to reduce popular product query latency by 65%',
      'Integrated idempotency keys on payment routes to prevent double charging'
    ]
  }
];

export const INITIAL_DSA_PROBLEMS: DSAProblem[] = [
  // 1. Arrays
  {
    id: 'dsa-1',
    title: 'Two Sum',
    topic: 'Arrays',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Use a hash map to store numbers and their indices. For each element num, check if (target - num) exists in the map.',
    practiceUrl: 'https://leetcode.com/problems/two-sum/'
  },
  {
    id: 'dsa-2',
    title: 'Best Time to Buy and Sell Stock',
    topic: 'Arrays',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Track the minimum price seen so far in a single pass, updating the maximum profit possible at each step.',
    practiceUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'
  },
  {
    id: 'dsa-3',
    title: 'Product of Array Except Self',
    topic: 'Arrays',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Calculate prefix products from the left in a first pass, then multiply suffix products from the right in a second pass.',
    practiceUrl: 'https://leetcode.com/problems/product-of-array-except-self/'
  },
  {
    id: 'dsa-4',
    title: 'First Missing Positive',
    topic: 'Arrays',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Place each number in its correct bucket index (val - 1) using cyclic sort, then find the first misplaced index.',
    practiceUrl: 'https://leetcode.com/problems/first-missing-positive/'
  },

  // 2. Strings
  {
    id: 'dsa-5',
    title: 'Valid Palindrome',
    topic: 'Strings',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Use two pointers from start and end, skipping non-alphanumeric characters and comparing lowercase values.',
    practiceUrl: 'https://leetcode.com/problems/valid-palindrome/'
  },
  {
    id: 'dsa-6',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Strings',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))',
    hint: 'Use sliding window with two pointers and a hash map storing the latest index of each seen character.',
    practiceUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
  },
  {
    id: 'dsa-7',
    title: 'Minimum Window Substring',
    topic: 'Strings',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(k)',
    hint: 'Use a sliding window with frequency counts for target string characters. Expand right pointer until valid, shrink left pointer to minimize.',
    practiceUrl: 'https://leetcode.com/problems/minimum-window-substring/'
  },

  // 3. Linked Lists
  {
    id: 'dsa-8',
    title: 'Reverse Linked List',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Iteratively maintain prev, curr, and next pointers. Redirect curr.next to prev at each step.',
    practiceUrl: 'https://leetcode.com/problems/reverse-linked-list/'
  },
  {
    id: 'dsa-9',
    title: 'Linked List Cycle',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Floyd\'s Tortoise and Hare algorithm: move slow pointer by 1 step and fast pointer by 2 steps. If they meet, a cycle exists.',
    practiceUrl: 'https://leetcode.com/problems/linked-list-cycle/'
  },
  {
    id: 'dsa-10',
    title: 'Reorder List',
    topic: 'Linked Lists',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Find the middle node, reverse the second half of the linked list, and merge the two halves alternately.',
    practiceUrl: 'https://leetcode.com/problems/reorder-list/'
  },
  {
    id: 'dsa-11',
    title: 'Merge k Sorted Lists',
    topic: 'Linked Lists',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    hint: 'Use a min-heap (priority queue) containing the head node of each of the k lists, extracting the smallest node each turn.',
    practiceUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/'
  },

  // 4. Stack
  {
    id: 'dsa-12',
    title: 'Valid Parentheses',
    topic: 'Stack',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Push expected closing brackets onto a stack when opening brackets appear. Pop and verify equality on closing brackets.',
    practiceUrl: 'https://leetcode.com/problems/valid-parentheses/'
  },
  {
    id: 'dsa-13',
    title: 'Daily Temperatures',
    topic: 'Stack',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Maintain a monotonic decreasing stack of indices. Pop elements whenever the current temperature is warmer.',
    practiceUrl: 'https://leetcode.com/problems/daily-temperatures/'
  },
  {
    id: 'dsa-14',
    title: 'Largest Rectangle in Histogram',
    topic: 'Stack',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Use a monotonic increasing stack storing index and height to compute the maximal area extending left and right.',
    practiceUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/'
  },

  // 5. Queue
  {
    id: 'dsa-15',
    title: 'Implement Queue using Stacks',
    topic: 'Queue',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(n)',
    hint: 'Use an in-stack for pushes and an out-stack for pops. Only transfer elements when the out-stack is empty.',
    practiceUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/'
  },
  {
    id: 'dsa-16',
    title: 'Design Circular Queue',
    topic: 'Queue',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(k)',
    hint: 'Use a fixed-size array with head and tail pointers updated modulo the queue capacity.',
    practiceUrl: 'https://leetcode.com/problems/design-circular-queue/'
  },
  {
    id: 'dsa-17',
    title: 'Sliding Window Maximum',
    topic: 'Queue',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    hint: 'Maintain a monotonic decreasing double-ended queue (deque) of indices, keeping the current maximum at the front.',
    practiceUrl: 'https://leetcode.com/problems/sliding-window-maximum/'
  },

  // 6. Hash Map
  {
    id: 'dsa-18',
    title: 'Valid Anagram',
    topic: 'Hash Map',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Count frequencies of each character with an array of size 26 or a hash map. All counts must equal zero.',
    practiceUrl: 'https://leetcode.com/problems/valid-anagram/'
  },
  {
    id: 'dsa-19',
    title: 'Group Anagrams',
    topic: 'Hash Map',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    hint: 'Sort each string alphabetically or build a character frequency signature tuple to use as the hash map key.',
    practiceUrl: 'https://leetcode.com/problems/group-anagrams/'
  },
  {
    id: 'dsa-20',
    title: 'Longest Consecutive Sequence',
    topic: 'Hash Map',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hint: 'Store elements in a hash set. Only begin counting sequence length from values where (val - 1) is not in the set.',
    practiceUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
  },

  // 7. Trees
  {
    id: 'dsa-21',
    title: 'Maximum Depth of Binary Tree',
    topic: 'Trees',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hint: 'Recursively return 1 + max(depth(left), depth(right)), or use level-order BFS traversal with a queue.',
    practiceUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
  },
  {
    id: 'dsa-22',
    title: 'Validate Binary Search Tree',
    topic: 'Trees',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hint: 'Pass down valid lower and upper value bounds during recursive traversal, verifying each node falls strictly within (min, max).',
    practiceUrl: 'https://leetcode.com/problems/validate-binary-search-tree/'
  },
  {
    id: 'dsa-23',
    title: 'Lowest Common Ancestor of a BST',
    topic: 'Trees',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    hint: 'Utilize BST ordering: if both nodes are smaller, move left; if both are larger, move right; otherwise, current node is the LCA.',
    practiceUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'
  },
  {
    id: 'dsa-24',
    title: 'Binary Tree Maximum Path Sum',
    topic: 'Trees',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    hint: 'Compute max branch sum recursively, updating global maximum using node.val + leftMax + rightMax when splitting.',
    practiceUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/'
  },

  // 8. Graphs
  {
    id: 'dsa-25',
    title: 'Number of Islands',
    topic: 'Graphs',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    hint: 'Iterate across the grid. When encountering "1", increment island count and run BFS/DFS to sink connected land cells.',
    practiceUrl: 'https://leetcode.com/problems/number-of-islands/'
  },
  {
    id: 'dsa-26',
    title: 'Clone Graph',
    topic: 'Graphs',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    hint: 'Use a hash map mapping original nodes to cloned nodes during BFS/DFS traversal to handle cycles correctly.',
    practiceUrl: 'https://leetcode.com/problems/clone-graph/'
  },
  {
    id: 'dsa-27',
    title: 'Course Schedule (Cycle Detection)',
    topic: 'Graphs',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    hint: 'Topological sort via Kahn\'s algorithm (in-degrees with queue) or DFS cycle detection using 3-state visiting arrays.',
    practiceUrl: 'https://leetcode.com/problems/course-schedule/'
  },
  {
    id: 'dsa-28',
    title: 'Word Ladder',
    topic: 'Graphs',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(m^2 * n)',
    spaceComplexity: 'O(m^2 * n)',
    hint: 'Breadth-First Search (BFS) finding shortest transformation path by mutating one letter at a time against a word set.',
    practiceUrl: 'https://leetcode.com/problems/word-ladder/'
  },

  // 9. Sorting
  {
    id: 'dsa-29',
    title: 'Sort Colors (Dutch National Flag)',
    topic: 'Sorting',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    hint: 'Three pointers: low, mid, and high. Swap 0s to low, 2s to high, and advance mid on 1s.',
    practiceUrl: 'https://leetcode.com/problems/sort-colors/'
  },
  {
    id: 'dsa-30',
    title: 'Merge Intervals',
    topic: 'Sorting',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    hint: 'Sort intervals by starting time. Merge overlapping intervals whenever current interval start <= previous interval end.',
    practiceUrl: 'https://leetcode.com/problems/merge-intervals/'
  },
  {
    id: 'dsa-31',
    title: 'Kth Largest Element in an Array',
    topic: 'Sorting',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    hint: 'Maintain a min-heap of size k, or use QuickSelect with average O(n) runtime.',
    practiceUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
  },

  // 10. Searching
  {
    id: 'dsa-32',
    title: 'Binary Search',
    topic: 'Searching',
    difficulty: 'Easy',
    completed: true,
    bookmarked: false,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hint: 'Calculate mid = left + (right - left) / 2 to prevent integer overflow. Adjust left or right pointer based on comparison.',
    practiceUrl: 'https://leetcode.com/problems/binary-search/'
  },
  {
    id: 'dsa-33',
    title: 'Search in Rotated Sorted Array',
    topic: 'Searching',
    difficulty: 'Medium',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hint: 'Identify which half (left or right) is normally sorted, then determine if target lies inside that sorted range.',
    practiceUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
  },
  {
    id: 'dsa-34',
    title: 'Find Minimum in Rotated Sorted Array',
    topic: 'Searching',
    difficulty: 'Medium',
    completed: false,
    bookmarked: false,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    hint: 'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], minimum lies in right half; otherwise in left half.',
    practiceUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'
  },
  {
    id: 'dsa-35',
    title: 'Median of Two Sorted Arrays',
    topic: 'Searching',
    difficulty: 'Hard',
    completed: false,
    bookmarked: true,
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    hint: 'Binary search partition cuts on the smaller array ensuring left half elements are smaller than right half elements.',
    practiceUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/'
  }
];

export const INITIAL_INTERVIEW_QA: InterviewQA[] = [
  {
    id: 'qa-1',
    category: 'OOP',
    question: 'What are the 4 main pillars of Object-Oriented Programming (OOP)?',
    answer: '1. Encapsulation: Bundling data (attributes) and methods that operate on that data inside a class, restricting direct outside access via private/protected specifiers.\n2. Abstraction: Hiding complex internal implementation details and exposing only a clean, simple interface (e.g., interfaces and abstract classes).\n3. Inheritance: Mechanism where a child class inherits properties and behaviors from a parent class, promoting code reuse.\n4. Polymorphism: Ability of an entity to take multiple forms—either compile-time (method overloading) or runtime (method overriding using virtual functions).',
    keyPoints: [
      'Encapsulation secures internal state',
      'Abstraction hides complexity',
      'Inheritance promotes code reuse',
      'Polymorphism enables dynamic method dispatch'
    ]
  },
  {
    id: 'qa-2',
    category: 'DBMS',
    question: 'Explain ACID properties in Database Management Systems with a real-world example.',
    answer: 'ACID ensures reliable database transactions, especially during concurrent operations or system failures:\n- Atomicity: "All or nothing". In a bank transfer of ₹5000 from Siddhartha to Alice, either both debit and credit succeed, or neither happens.\n- Consistency: The database must transition from one valid state to another, satisfying all constraints, foreign keys, and balances.\n- Isolation: Concurrent transactions execute as if they were running serially without interfering with each other.\n- Durability: Once a transaction commits, its modifications are permanently recorded in non-volatile storage, surviving crashes.',
    keyPoints: [
      'Atomicity = all-or-nothing execution',
      'Consistency = integrity constraints preserved',
      'Isolation = transactions do not observe intermediate states',
      'Durability = committed data survives power failures'
    ]
  },
  {
    id: 'qa-3',
    category: 'OS',
    question: 'What is the fundamental difference between a Process and a Thread?',
    answer: 'A Process is an executing program instance with its own dedicated memory address space, file handles, and resources allocated by the OS.\nA Thread is a lightweight execution unit inside a process. Multiple threads within the same process share code, data, and open files, but each thread has its own program counter, registers, and call stack.\nContext switching between threads is significantly faster and less costly than switching between processes because virtual memory mappings do not need to be flushed.',
    keyPoints: [
      'Processes have isolated memory spaces; threads share memory within a process',
      'Threads are lightweight with faster context switches',
      'A process crash does not affect other processes, but an unhandled thread exception can terminate the whole process'
    ]
  },
  {
    id: 'qa-4',
    category: 'Computer Networks',
    question: 'Describe the TCP 3-Way Handshake mechanism for establishing a connection.',
    answer: 'TCP uses a 3-way handshake to establish a reliable, full-duplex connection before sending application data:\n1. SYN: The client generates an initial sequence number (ISN_c) and sends a SYN packet to the server.\n2. SYN-ACK: The server receives the SYN, generates its own sequence number (ISN_s), and sends back a packet with SYN=1 and ACK=ISN_c + 1.\n3. ACK: The client sends an ACK packet with ACK=ISN_s + 1. The connection is now ESTABLISHED on both sides.',
    keyPoints: [
      'Step 1: Client sends SYN (ISN_c)',
      'Step 2: Server responds with SYN-ACK (ISN_s, ACK=ISN_c + 1)',
      'Step 3: Client confirms with ACK (ISN_s + 1)',
      'Guarantees both sides agree on sequence numbers'
    ]
  },
  {
    id: 'qa-5',
    category: 'Behavioral / HR',
    question: 'How do you structure responses to behavioral interview questions using the STAR method?',
    answer: 'The STAR framework ensures clear, structured, and impactful storytelling:\n- Situation (20%): Set the scene, context, and challenge faced (e.g., college project deadline, unexpected bug).\n- Task (10%): Explain your specific responsibility or goal.\n- Action (50%): Detail the precise technical and interpersonal steps YOU took (e.g., debugged memory leak with profiler, coordinated tasks).\n- Result (20%): Share tangible, measurable outcomes, learnings, and positive impacts (e.g., improved load time by 40%, completed on schedule).',
    keyPoints: [
      'Situation: Brief context and problem',
      'Task: Your specific role',
      'Action: 50% of your time focusing on what YOU engineered',
      'Result: Concrete numbers, impact, and reflection'
    ]
  }
];

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Siddhartha',
  college: 'Jain Institute of Technology Davangere',
  branch: 'Computer Science & Engineering',
  yearOfStudy: '2nd Year (3rd Semester)',
  targetRole: 'Software Development Engineer (SDE 1)',
  bio: 'Computer Science student passionate about Data Structures, Algorithms, full-stack software development, and systems engineering. Preparing consistently for campus placements, technical assessments, and software engineering internships.',
  githubUsername: 'siddharthadev',
  linkedinUsername: 'siddhartha-engineer',
  streakDays: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  skills: [
    { name: 'C / C++', level: 'Advanced' },
    { name: 'Data Structures & Algorithms', level: 'Intermediate' },
    { name: 'JavaScript / TypeScript', level: 'Intermediate' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'SQL & PostgreSQL', level: 'Intermediate' },
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'HTML & CSS', level: 'Advanced' },
    { name: 'Tailwind CSS', level: 'Advanced' }
  ]
};
