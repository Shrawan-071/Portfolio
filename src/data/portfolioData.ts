import { Project, Skill, Education, Achievement } from '../types';

export const personalInfo = {
  name: 'Shrawan Kumar Gupta',
  title: 'BSc. CSIT Student',
  subtitle: 'Full-Stack Development & AI Enthusiast',
  headline: 'Building Ideas Into Interactive Digital Experiences.',
  bio: 'I’m Shrawan Kumar Gupta, a BSc. CSIT undergraduate passionate about building impactful technology solutions through full-stack development, AI-powered applications, and continuous learning. I enjoy transforming ideas into practical and interactive digital experiences.',
  email: 'shrawan.edu.117@gmail.com',
  phones: ['+977 9826228728', '+977 9763362745'],
  location: 'Nepal',
  socials: {
    github: 'https://github.com/Shrawan-071',
    linkedin: 'https://www.linkedin.com/in/shrawan-kumar-gupta-b44734411/',
    instagram: 'https://www.instagram.com/shra1_only_1/',
    facebook: 'https://www.facebook.com/shrawan.gupta.555121/',
  }
};

export const rotatingTitles = [
  'CSIT Undergraduate',
  'Full-Stack Developer',
  'AI Integration Enthusiast',
  'Creative Problem Solver'
];

export const skillsData: Skill[] = [
  // Development Tools
  { name: 'VS Code', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'GitHub', category: 'tools' },
  { name: 'npm', category: 'tools' },
  { name: 'Vite', category: 'tools' },
  { name: 'Postman', category: 'tools' },

  // Frontend & Web
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },

  // Backend
  { name: 'Python', category: 'backend' },
  { name: 'Flask', category: 'backend' },
  { name: 'Node.js', category: 'backend' },

  // Database
  { name: 'SQLite', category: 'database' },
  { name: 'SQL', category: 'database' },
  { name: 'MySQL', category: 'database' },

  // AI & APIs
  { name: 'Google Gemini API', category: 'ai' },
  { name: 'OpenRouter', category: 'ai' },
  { name: 'TensorFlow.js', category: 'ai' },
  { name: 'YOLOv5', category: 'ai' },
  { name: 'AI API Integration', category: 'ai' },

  // Deployment & Hosting
  { name: 'Vercel', category: 'deployment' },
  { name: 'Netlify', category: 'deployment' },
  { name: 'Railway', category: 'deployment' },

  // Programming Languages
  { name: 'Python', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'C', category: 'languages' },
  { name: 'C++ basics', category: 'languages' }
];

export const educationData: Education[] = [
  {
    id: 'edu-2',
    degree: 'Bachelor of Science in Computer Science and Information Technology (BSc. CSIT)',
    institution: 'Tribhuvan University Affiliated College',
    location: 'Nepal',
    period: '2081 B.S. – Present',
    status: 'Currently studying / undergraduate',
    coursework: ['Data Structures & Algorithms', 'C/C++ Programming', 'Digital Logic', 'Mathematics', 'Computer Architecture']
  },
  {
    id: 'edu-1',
    degree: 'Higher Secondary Education in Computer Science (+2)',
    institution: 'Hetauda School of Management and Social Sciences',
    location: 'Hetauda-04, Makawanpur, Nepal',
    period: '2079 – 2080 B.S.',
    gpa: '3.82',
    coursework: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry']
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Hackathon Runner-Up',
    description: 'Secured the runner-up position as part of a team by developing a kitchen gas leakage detection and safety system. The project focused on detecting potential LPG gas leaks and providing rapid alerts to help reduce the risk of fire and gas-related accidents in kitchens.',
    category: 'hackathon',
    highlights: [
      'Kitchen safety',
      'Gas leakage detection',
      'Early warning and alerts',
      'Practical problem solving',
      'Team collaboration'
    ]
  },
  {
    id: 'ach-2',
    title: 'Academic Excellence — 3.82 GPA',
    gpaHighlight: '3.82 GPA',
    description: 'Graduated from +2 with an outstanding GPA of 3.82, establishing myself as one of the leading academic performers of my college batch and demonstrating consistent dedication to academic excellence.',
    category: 'academic'
  },
  {
    id: 'ach-3',
    title: '+2 Academic Recognition',
    description: 'Awarded recognition for outstanding +2 academic performance by Sana Kisan Bikas Laghubitta Bittiyasanstha Ltd., demonstrating academic dedication and talent.',
    category: 'recognition'
  }
];
