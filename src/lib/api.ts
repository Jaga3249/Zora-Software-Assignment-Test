import type { AuthCredentials, Todo, User } from "../../types/types";

const API_BASE_URL = "http://localhost:3000";

// Auth API
export const authApi = {
  login: async (credentials: AuthCredentials): Promise<AuthCredentials> => {
    const response = await fetch(`${API_BASE_URL}/auth`);
    if (!response.ok) throw new Error("Failed to fetch auth credentials");
    return response.json();
  },
};

// Todo API
export const todoApi = {
  getAll: async (params?: {
    status?: string;
    assignedUser?: string;
    priority?: string;
    _sort?: string;
    _order?: string;
    _page?: number;
    _limit?: number;
    q?: string;
  }): Promise<Todo[]> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, value.toString());
        }
      });
    }
    const response = await fetch(`${API_BASE_URL}/todo?${searchParams}`);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`);
    if (!response.ok) throw new Error("Failed to fetch todo");
    return response.json();
  },

  create: async (todo: Omit<Todo, "id">): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
  },

  update: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  },
};
