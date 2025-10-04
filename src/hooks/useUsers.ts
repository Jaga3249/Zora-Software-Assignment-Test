import { useState, useEffect, useCallback } from "react";
import type { User } from "../../types/types";
import { usersApi } from "../lib/api";
import toast from "react-hot-toast";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await usersApi.getAll();
      setUsers(data);
      return data;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    setUsers,
  };
};
