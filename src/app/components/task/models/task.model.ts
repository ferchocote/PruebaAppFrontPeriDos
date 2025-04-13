export interface Task {
    id?: string;
    title: string;
    description: string;
    isCompleted: boolean;
    creationDate?: Date;
    updateDate?: Date;
  }