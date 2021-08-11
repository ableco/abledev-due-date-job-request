// Question: How this will travel from the host to the component
export type Task = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  dueDate?: Date;
  completedAt?: Date;
  assignedUserId?: number;
  creatorId: number;
  assignedUser?: {
    picture?: string;
  };
};
