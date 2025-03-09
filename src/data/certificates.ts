
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'technical' | 'participation';
  description: string;
  imageUrl: string;
  credentialUrl?: string;
  skills?: string[];
}

export const certificates: Certificate[] = [
  // Technical Certificates
  {
    id: 'tech-1',
    title: 'NPTEL IoT Course',
    issuer: 'NPTEL - IIT',
    date: 'December 2023',
    category: 'technical',
    description: 'Comprehensive course on Internet of Things covering sensors, actuators, communication protocols, and IoT applications.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['IoT', 'Embedded Systems', 'Networking']
  },
  {
    id: 'tech-2',
    title: 'NPTEL Cloud Computing',
    issuer: 'NPTEL - IIT',
    date: 'January 2024',
    category: 'technical',
    description: 'Detailed study of cloud infrastructure, service models, virtualization, and deployment strategies.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Cloud Computing', 'Virtualization', 'Distributed Systems']
  },
  {
    id: 'tech-3',
    title: 'Cybersecurity Course',
    issuer: 'RedHat Academy',
    date: 'February 2023',
    category: 'technical',
    description: 'Comprehensive training on network security, threat detection, and security best practices.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Cybersecurity', 'Network Security', 'Threat Analysis']
  },
  {
    id: 'tech-4',
    title: 'CCNAv7 Networking',
    issuer: 'Cisco',
    date: 'March 2023',
    category: 'technical',
    description: 'In-depth training on networking fundamentals, routing, switching, and network management.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Networking', 'Routing', 'Switching', 'TCP/IP']
  },
  {
    id: 'tech-5',
    title: 'NDG Linux Unhatched',
    issuer: 'RedHat Academy',
    date: 'April 2023',
    category: 'technical',
    description: 'Fundamentals of Linux operating system, command line operations, and system administration.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Linux', 'Command Line', 'System Administration']
  },
  {
    id: 'tech-6',
    title: 'C Programming Certification',
    issuer: 'HackerRank',
    date: 'May 2023',
    category: 'technical',
    description: 'Certification validating proficiency in C programming language and algorithm implementation.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['C', 'Algorithms', 'Data Structures']
  },
  {
    id: 'tech-7',
    title: 'C++ Programming Certification',
    issuer: 'HackerRank',
    date: 'June 2023',
    category: 'technical',
    description: 'Comprehensive certification on object-oriented programming concepts in C++.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['C++', 'OOP', 'STL', 'Memory Management']
  },
  {
    id: 'tech-8',
    title: 'Java Basic Certification',
    issuer: 'Oracle',
    date: 'July 2023',
    category: 'technical',
    description: 'Certification validating core Java programming skills and OOP principles.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Java', 'OOP', 'Collections', 'Multithreading']
  },
  {
    id: 'tech-9',
    title: 'SQL Basic Certification',
    issuer: 'HackerRank',
    date: 'August 2023',
    category: 'technical',
    description: 'Certification on SQL fundamentals, database design, and query optimization.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['SQL', 'Database Design', 'Query Optimization']
  },
  {
    id: 'tech-10',
    title: 'Postman API Fundamentals',
    issuer: 'Postman',
    date: 'September 2023',
    category: 'technical',
    description: 'Student Expert certification in API testing, documentation, and design using Postman.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['API Testing', 'API Documentation', 'API Design', 'Postman']
  },
  
  // Participation Certificates
  {
    id: 'part-1',
    title: 'Technical Hub Apprenticeship',
    issuer: 'Technical Hub',
    date: 'August 2023 - Present',
    category: 'participation',
    description: 'One-year intensive application development training program covering 7+ programming languages and real client projects.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Full-Stack Development', 'Mobile Development', 'Client Projects']
  },
  {
    id: 'part-2',
    title: 'KL University Hackathon',
    issuer: 'KL University',
    date: 'October 2023',
    category: 'participation',
    description: 'Participated in a 48-hour coding competition focused on developing innovative solutions for smart cities.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Problem Solving', 'Team Collaboration', 'Rapid Prototyping']
  },
  {
    id: 'part-3',
    title: 'GIET Technical Symposium',
    issuer: 'GIET University',
    date: 'November 2023',
    category: 'participation',
    description: 'Represented Aditya Engineering College at a technical symposium presenting research on emerging technologies.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Technical Presentation', 'Research', 'Public Speaking']
  },
  {
    id: 'part-4',
    title: 'JNTUK Code Fest',
    issuer: 'JNTUK',
    date: 'December 2023',
    category: 'participation',
    description: 'Participated in competitive programming and algorithm optimization challenges against regional teams.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Competitive Programming', 'Algorithms', 'Time Complexity']
  },
  {
    id: 'part-5',
    title: 'JNTUV IoT Workshop',
    issuer: 'JNTUV',
    date: 'January 2024',
    category: 'participation',
    description: 'Hands-on workshop on IoT device programming and sensor integration for real-world applications.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['IoT', 'Sensor Programming', 'Embedded Systems']
  },
  {
    id: 'part-6',
    title: 'Eshwar AI Summit',
    issuer: 'Eshwar College of Engineering',
    date: 'February 2024',
    category: 'participation',
    description: 'Participated in AI and machine learning workshops focusing on computer vision and natural language processing.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['AI', 'Machine Learning', 'Computer Vision', 'NLP']
  },
  {
    id: 'part-7',
    title: 'Movie Marathon Organizer',
    issuer: 'Aditya University',
    date: 'March 2024',
    category: 'participation',
    description: 'Led the organization of a 24-hour movie marathon event, managing volunteers, logistics, and technical arrangements.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Event Management', 'Leadership', 'Team Coordination']
  },
  {
    id: 'part-8',
    title: 'LEO Club Technical Workshop',
    issuer: 'LEO Club',
    date: 'April 2024',
    category: 'participation',
    description: 'Program Coordinator for technical workshops reaching 2500+ students across various technology domains.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Workshop Coordination', 'Technical Training', 'Event Planning']
  },
  {
    id: 'part-9',
    title: 'LeetCode Contest Participation',
    issuer: 'LeetCode',
    date: 'Ongoing',
    category: 'participation',
    description: 'Regular participation in LeetCode contests with top 5% global ranking and completion of 500+ coding challenges.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Competitive Coding', 'Algorithms', 'Problem Solving']
  },
  {
    id: 'part-10',
    title: 'CodeChef Competition',
    issuer: 'CodeChef',
    date: 'Ongoing',
    category: 'participation',
    description: 'Active participation in CodeChef competitions with advanced rating and algorithmic problem-solving skills.',
    imageUrl: 'https://i.ibb.co/RkY4d4xj/Timetable.png',
    credentialUrl: '#',
    skills: ['Competitive Programming', 'Data Structures', 'Algorithm Optimization']
  }
];

// Helper function to get certificates by category
export const getCertificatesByCategory = (category: 'technical' | 'participation'): Certificate[] => {
  return certificates.filter(cert => cert.category === category);
};
