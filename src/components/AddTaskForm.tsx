import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Stack,
} from "@mui/material";
import type { Todo, User } from "../../types/types";
import { todoApi, usersApi } from "../lib/api";
import toast from "react-hot-toast";
import { useTodos } from "../hooks/useTodos";

interface AddTaskFormProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setTodos: (value: Todo[]) => void;
  task: Todo;
  setTask: (value: Todo) => void;
  onUpdate?: (id: string, updatedFields: Partial<Todo>) => Promise<Todo>;
}

const AddTaskForm = ({
  setOpen,
  setTodos,
  setTask,
  task,
  onUpdate,
}: AddTaskFormProps) => {
  const [step, setStep] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const { todos: todoList } = useTodos();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { fetchTodos } = useTodos();

  const isEditing = !!task.id;

  // Handle input changes
  const handleChange = (field: keyof Todo, value: any) => {
    setTask({ ...task, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on change
  };

  // Step validation
  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!task.title.trim()) newErrors.title = "Title is required";
      if (!task.dueDate.trim()) newErrors.dueDate = "Due Date is required";
    } else if (step === 1) {
      if (!task.assignedUser)
        newErrors.assignedUser = "Assigned User is required";
      if (!task.priority.trim()) newErrors.priority = "Priority is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit handler
  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      if (isEditing && onUpdate) {
        // Update existing task
        await onUpdate(task.id, task);
      } else {
        // Create new task
        const newTask: Todo = { ...task, id: Math.random().toString() };
        await todoApi.create(newTask);
        toast.success("Todo added successfully");
      }

      const updatedTodo = await fetchTodos();
      setTodos([...updatedTodo]);
      setOpen(false);
    } catch (err) {
      toast.error("Failed to save Todo");
      console.error(err);
    }
  };

  // Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await usersApi.getAll();
        setUsers(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Available tags from existing todos
  const availableTags = Array.from(
    new Set(todoList.flatMap((todo) => todo.tags || []))
  );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", overflowY: "auto" }}>
      {/* Step 1 */}
      {step === 0 && (
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={task.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            label="Description"
            multiline
            minRows={3}
            value={task.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            label="Due Date"
            type="date"
            value={task.dueDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />
          <Autocomplete
            multiple
            freeSolo
            options={availableTags}
            value={task.tags || []}
            onChange={(_, newValue) => handleChange("tags", newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Add tags" />
            )}
          />
        </Stack>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <Stack spacing={2}>
          <TextField
            select
            label="Status"
            value={task.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <TextField
            select
            label="Assigned User"
            value={task.assignedUser}
            onChange={(e) =>
              handleChange("assignedUser", Number(e.target.value))
            }
            error={!!errors.assignedUser}
            helperText={errors.assignedUser}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Priority"
            value={task.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            error={!!errors.priority}
            helperText={errors.priority}
          >
            {["high", "low"].map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      )}

      {/* Navigation */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button disabled={step === 0} onClick={prevStep}>
          Back
        </Button>
        {step === 1 ? (
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        ) : (
          <Button variant="contained" onClick={nextStep}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddTaskForm;
