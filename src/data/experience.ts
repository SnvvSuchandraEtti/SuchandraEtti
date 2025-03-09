
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  skills: string[];
  website?: string; // Optional website property
  // Add these properties to fix the TypeScript errors
  role?: string;
  responsibilities?: string[];
  technologies?: string[];
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Summer Internship',
    company: 'Technical Hub',
    location: 'Aditya Engineering College',
    startDate: 'June 2024',
    endDate: 'July 2024',
    description: 'Engineered enterprise-class Java applications and a Flutter e-commerce platform with Firebase authentication, delivering 40% performance optimization through state management while collaborating in agile environments with 95% sprint completion rate.',
    achievements: [
      'Developed responsive UI components for the e-commerce platform',
      'Implemented secure authentication and payment gateway integration',
      'Collaborated with the team to optimize app performance',
      'Contributed to the implementation of real-time inventory management'
    ],
    skills: ['Flutter', 'Java', 'Firebase', 'UI/UX Design', 'E-commerce'],
    website: 'https://technicalhub.io',
    role: 'App Development Intern',
    responsibilities: [
      'Developing and testing Flutter-based mobile application components',
      'Implementing UI designs and ensuring responsive layouts',
      'Integrating backend services with the frontend application',
      'Collaborating with team members to ensure project milestones are met',
      'Participating in code reviews and implementation discussions'
    ],
    technologies: ['Flutter', 'Java', 'Firebase', 'RESTful APIs', 'Git', 'Android Studio']
  },
  {
    id: '2',
    title: 'Java Internship',
    company: 'Student Data Management System',
    location: 'Aditya Engineering College',
    startDate: 'April 2024',
    endDate: 'May 2024',
    description: 'Architected a Java-based enterprise with multi-threaded data processing that achieved 70% efficiency improvement by interactive dashboards, and dynamic filtering, transforming complex student data into actionable insights with 60% faster retrieval rates.',
    achievements: [
      'Developed a robust data management system for tracking student information',
      'Implemented responsive dashboards for monitoring academic performance',
      'Created efficient data retrieval mechanisms to improve system response time',
      'Integrated the system with existing college databases'
    ],
    skills: ['Java', 'JDBC', 'SQL', 'Web Development', 'Data Management'],
    website: 'https://adityaedu.net',
    role: 'Java Developer Intern',
    responsibilities: [
      'Developing backend services using Java for data management',
      'Creating and optimizing SQL queries for data retrieval and storage',
      'Implementing data validation and security measures',
      'Designing user interfaces for data visualization',
      'Documenting system architecture and functionality'
    ],
    technologies: ['Java', 'JDBC', 'MySQL', 'HTML/CSS', 'JavaScript', 'MVC Architecture']
  },
  {
    id: '3',
    title: 'Event Organizer',
    company: 'Aditya University',
    location: 'Aditya Engineering College',
    startDate: 'March 2024',
    endDate: 'March 2024',
    description: 'Directed Movie Marathon managing 15 volunteers and technical logistics for 24-hour screenings, increasing attendance by 35% through strategic digital marketing, budget allocation, vendor negotiations, and real-time analytic tracking for optimization.',
    achievements: [
      'Successfully managed logistics for a campus-wide event with 500+ attendees',
      'Coordinated with cross-functional teams for seamless event execution',
      'Implemented digital ticketing and attendance tracking system',
      'Received excellent feedback from participants and faculty'
    ],
    skills: ['Event Management', 'Leadership', 'Time Management', 'Communication', 'Problem-Solving'],
    website: 'https://adityaedu.net',
    role: 'Event Coordinator',
    responsibilities: [
      'Planning and coordinating all aspects of the movie marathon event',
      'Managing a team of volunteers for various responsibilities',
      'Handling budgeting and resource allocation',
      'Coordinating with vendors and service providers',
      'Ensuring compliance with university policies and safety regulations'
    ],
    technologies: ['Event Planning Tools', 'Digital Ticketing System', 'Social Media Management', 'A/V Equipment']
  },
  {
    id: '4',
    title: 'Competitive Coding',
    company: 'Various Platforms',
    location: 'Online',
    startDate: 'January 2023',
    endDate: 'Present',
    description: 'Ranked in the top 5% globally in competitive coding contests (within the top 5000 participants).',
    achievements: [
      'Solved 500+ coding challenges on LeetCode, GeeksforGeeks, CodeChef, and HackerRank',
      'Achieved high rankings in multiple competitive programming contests',
      'Developed efficient algorithms for complex computational problems',
      'Mentored junior students in problem-solving techniques'
    ],
    skills: ['Algorithms', 'Data Structures', 'Problem-Solving', 'Time Complexity Optimization', 'Competitive Programming'],
    role: 'Competitive Programmer',
    responsibilities: [
      'Participating in coding competitions and hackathons',
      'Practicing algorithm optimization and efficient coding techniques',
      'Solving complex programming challenges across multiple platforms',
      'Analyzing and learning from others\'s solutions', 
      'Continuously improving problem-solving skills'
    ],
    technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms']
  },
  {
    id: '5',
    title: 'Professional Development',
    company: 'Technical Hub',
    location: 'Aditya Engineering College',
    startDate: 'August 2023',
    endDate: 'Present',
    description: 'Completed intensive 12-month technical apprenticeship at Technical Hub, mastering 7+ programming languages while delivering 5 client projects with 100% satisfaction rate as Junior Developer.',
    achievements: [
      'Implemented version control systems, CI/CD & development methodologies',
      'Delivered 5 client projects with 100% satisfaction rate',
      'Mastered 7+ programming languages and frameworks',
      'Contributed to team knowledge sharing sessions'
    ],
    skills: ['Full-Stack Development', 'Version Control', 'CI/CD', 'Agile Methodologies', 'Client Management'],
    role: 'Junior Developer',
    responsibilities: [
      'Developing client projects using various programming languages',
      'Implementing version control systems and CI/CD pipelines',
      'Collaborating with senior developers on complex features',
      'Participating in client meetings and requirement gathering',
      'Contributing to code reviews and documentation'
    ],
    technologies: ['Git', 'Jenkins', 'Docker', 'JavaScript', 'Python', 'Java', 'React']
  },
  {
    id: '6',
    title: 'Startup Experience',
    company: 'Leez',
    location: 'Remote',
    startDate: 'January 2024',
    endDate: 'Present',
    description: 'Currently developing an innovative solution peer-to-peer marketplace revolutionizing on-demand rentals for local communities.',
    achievements: [
      'Designing a scalable microservices architecture for the platform',
      'Implementing secure payment processing and user verification systems',
      'Developing an intuitive UI/UX for seamless product listings and rentals',
      'Creating recommendation algorithms to match renters with products'
    ],
    skills: ['Startup Development', 'Product Design', 'Microservices', 'Payment Processing', 'User Experience'],
    role: 'Co-founder & Technical Lead',
    responsibilities: [
      'Leading the technical development of the marketplace platform',
      'Designing and implementing the product architecture',
      'Making key decisions on technology stack and development roadmap',
      'Building and managing the technical team',
      'Ensuring platform security and compliance with regulations'
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Payment APIs', 'Geolocation Services']
  }
];
