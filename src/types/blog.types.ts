export type TBlog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
export interface BlogFormData {
  title: string;
  image: FileList; // Represents the file input
  category: string;
}
