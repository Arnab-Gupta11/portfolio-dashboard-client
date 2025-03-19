export type TProject = {
  _id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string;
  thumbnail: string;
  fullImage: string;
  type: "Website" | "Mobile App" | "Desktop App";
  clientGithubLink: string;
  serverGithubLink: string;
  liveLink: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};
export type TProjectFormData = {
  title: string;
  description: string;
  features: string[];
  technologies: string;
  thumbnail: FileList | null; // File type for image upload
  fullImage: FileList | null;
  type: "Website" | "Mobile App" | "Desktop App";
  clientGithubLink: string;
  serverGithubLink: string;
  liveLink: string;
  isFeatured: boolean;
};
