export type TodoStatus = "todo" | "inProgress" | "done";
export type TodoPriority = "high" | "low";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  dueDate: string;
  description: string;
  assignedUser: number;
  priority: TodoPriority;
  tags: string[] | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}
