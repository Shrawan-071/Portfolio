export interface Project {
  id: number | string;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  isFeatured?: boolean;
  image?: string;
  owner?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'languages' | 'tools' | 'other' | 'ai' | 'deployment';
  icon?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  coursework?: string[];
  status?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'hackathon' | 'recognition';
  icon?: string;
  gpaHighlight?: string;
  highlights?: string[];
}
