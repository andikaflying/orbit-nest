export interface ProjectItem {
  title: string;
  lastEdited: string;
  tags: Array<{
    name: string;
    color: "yellow" | "green" | "orange";
  }>;
  isActive?: boolean;
}

export type ProjectList = ProjectItem[];
