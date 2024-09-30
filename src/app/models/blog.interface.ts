// blog.model.ts
export interface IBlog {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string; // ISO date string
}
