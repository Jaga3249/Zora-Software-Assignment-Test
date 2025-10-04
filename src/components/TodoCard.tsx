import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import type { Todo, User } from "../../types/types";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";

interface TodoCardProps {
  todo: Todo;
  user?: User;
  onEdit: (id: string) => void;
  setOpen: (value: boolean) => void;
  setSelectedId: (value: string) => void;
  setUpadating: (value: boolean) => void;
  setSelectedTodo: (value: Todo) => void;
}

const TodoCard = ({
  todo,
  user,
  setOpen,
  setSelectedId,
  setUpadating,
  setSelectedTodo,
}: TodoCardProps) => {
  const statusConfig = {
    todo: { label: "To Do", color: "info" as const },
    inProgress: { label: "In Progress", color: "warning" as const },
    done: { label: "Done", color: "success" as const },
  };

  const priorityConfig = {
    high: { label: "High Priority", color: "error" as const },
    low: { label: "Low Priority", color: "default" as const },
  };

  return (
    <Card
      elevation={2}
      sx={{ "&:hover": { boxShadow: 6 }, transition: "box-shadow 0.3s" }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ flexGrow: 1, pr: 1 }}
          >
            {todo.title}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => {
                setUpadating(true);
                setSelectedTodo(todo);
              }}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                setOpen(true);
                setSelectedId(todo.id);
              }}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {todo.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            label={statusConfig[todo.status]?.label || "Unknown"}
            color={statusConfig[todo.status]?.color || "default"}
            size="small"
          />
          <Chip
            label={priorityConfig[todo.priority]?.label || "Unknown"}
            color={priorityConfig[todo.priority]?.color || "default"}
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarMonthIcon />
            <Typography variant="body2" color="text.secondary">
              {todo.dueDate
                ? format(new Date(todo.dueDate), "MMM dd yyyy")
                : "No due date"}{" "}
            </Typography>
          </Box>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonIcon />
              <Typography variant="body2" color="text.secondary">
                {user.name}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
