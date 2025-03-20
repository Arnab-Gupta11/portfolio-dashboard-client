export type TSkillFormData = {
  label: string;
  icon: FileList;
  progress: number;
  category: "Frontend" | "Backend" | "Languages" | "Tools";
};
export type TSkills = {
  _id: string;
  label: string;
  icon: string;
  progress: number;
  category: "Frontend" | "Backend" | "Languages" | "Tools";
  createdAt: string;
  updatedAt: string;
};
