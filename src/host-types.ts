// Question: How this will travel from the host to the component
export type Task = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  dueDate: Date | null;
  completedAt: Date | null;
  assignedUserId: number | null;
  creatorId: number;
};
