import type { Todo } from "../../types/types";
import { todoApi } from "./api"; // your existing API

export interface FetchTodosParams {
  status?: string;
  assignedUser?: string; // must be string to match API
  priority?: string;
  _sort?: string;
  _order?: "asc" | "desc";
  _page?: number;
  _limit?: number;
  q?: string;
}

export const fetchTodos = async (
  params?: FetchTodosParams
): Promise<Todo[]> => {
  try {
    const data = await todoApi.getAll(params);
    return data;
  } catch (err) {
    console.error("Failed to fetch todos", err);
    return []; // return empty array on error
  }
};
