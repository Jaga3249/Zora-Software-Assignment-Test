import { useState, useEffect, useCallback } from "react";
import type { FetchTodosParams, Todo } from "../../types/types";
import { todoApi } from "../lib/api";
import toast from "react-hot-toast";

export const useTodos = (params?: FetchTodosParams) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(
    async (overrideParams?: FetchTodosParams) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await todoApi.getAll({ ...params, ...overrideParams });
        setTodos(data);
        return data;
      } catch (err) {
        console.error(err);
        setError("Failed to fetch todos");
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [params]
  );

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        await todoApi.delete(id);
        toast.success("Todo deleted successfully");
        await fetchTodos();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete todo");
      } finally {
        setIsDeleting(false);
      }
    },
    [fetchTodos]
  );

  const handleUpdateTodo = useCallback(
    async (id: string, updatedFields: Partial<Todo>) => {
      setIsUpdating(true);
      try {
        const updatedTodo = await todoApi.update(id, updatedFields);
        toast.success("Todo updated successfully");
        // Update the local state
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
        return updatedTodo;
      } catch (err) {
        console.error(err);
        toast.error("Failed to update todo");
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    isDeleting,
    isUpdating,
    setIsDeleting,
    setTodos,
    error,
    fetchTodos,
    handleDeleteTodo,
    handleUpdateTodo,
    setIsUpdating,
  };
};
