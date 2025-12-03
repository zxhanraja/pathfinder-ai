
export enum ExperienceLevel {
  Student = 'Student',
  EntryLevel = 'Entry Level (0-2 years)',
  MidLevel = 'Mid Level (3-5 years)',
  Senior = 'Senior (5+ years)',
  Executive = 'Executive',
}

export interface UserProfile {
  name: string;
  currentRole: string;
  experienceLevel: ExperienceLevel;
  skills: string;
  interests: string;
  careerGoals: string;
  location: string;
  resumeText: string;
  resumeFile?: {
    name: string;
    type: string;
    data: string;
  } | null;
}

export interface RoadmapPhase {
  phaseName: string;
  duration: string;
  topics: string[];
}

export interface ProjectRecommendation {
  level: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface CareerPath {
  roleTitle: string;
  matchPercentage: number;
  matchReason: string;
  salaryRange: string;
  futureScope: string;
  mustHaveSkills: string[];
  goodToHaveSkills: string[];
  missingSkills: string[];
  roadmap: RoadmapPhase[];
  projects: ProjectRecommendation[];
  recommendedCourses: string[];
  searchKeywords: string[];
}

export interface AIResponse {
  summary: string;
  resumeFeedback: string[]; // New field for actionable resume advice
  careerPaths: CareerPath[];
  finalActionPlan: string[];
}
