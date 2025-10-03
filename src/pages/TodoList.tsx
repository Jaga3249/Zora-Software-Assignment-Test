import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import type { Todo, User } from "../../types/types";
import { todoApi, usersApi } from "../lib/api";
import Layout from "../components/Layout";
import TodoCard from "../components/TodoCard";
import CustomModal from "../components/CustomModal";
import AddTaskForm from "../components/AddTaskForm";

const ITEMS_PER_PAGE = 6;

const TodoList = () => {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch todos and users
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoApi.getAll({
        status: statusFilter || undefined,
        assignedUser: userFilter || undefined,
        _sort: sortBy,
        _order: sortOrder,
        _page: currentPage,
        _limit: ITEMS_PER_PAGE,
        q: debouncedSearch || undefined,
      });
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    statusFilter,
    userFilter,
    sortBy,
    sortOrder,
    debouncedSearch,
    currentPage,
  ]);

  const handleDelete = (id: string) => setDeleteId(id);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await todoApi.delete(deleteId);
      setDeleteId(null);
      fetchTodos(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete task");
    }
  };

  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

  return (
    <Layout>
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              My Tasks
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and organize your tasks efficiently
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              // navigate("/add");
              setOpen(true);
            }}
            sx={{ height: "fit-content" }}
          >
            Add New Task
          </Button>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "2fr 1fr 1fr 1fr",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="inProgress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Filter by User</InputLabel>
            <Select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              label="Filter by User"
            >
              <MenuItem value="">All Users</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              label="Sort By"
            >
              <MenuItem value="dueDate-asc">Due Date (Earliest)</MenuItem>
              <MenuItem value="dueDate-desc">Due Date (Latest)</MenuItem>
              <MenuItem value="title-asc">Title (A-Z)</MenuItem>
              <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Task List */}
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
            }}
          >
            <CircularProgress />
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Loading tasks...
            </Typography>
          </Box>
        ) : todos.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography color="text.secondary" gutterBottom>
              No tasks found
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate("/add")}
              sx={{ mt: 2 }}
            >
              Create your first task
            </Button>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 3,
              }}
            >
              {todos.map((todo) => {
                const user = users.find(
                  (u) => u.id === todo.assignedUser.toString()
                );
                return (
                  <TodoCard
                    key={Math.random()}
                    todo={todo}
                    user={user}
                    onEdit={(id) => navigate(`/edit/${id}`)}
                    onDelete={handleDelete}
                  />
                );
              })}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Page {currentPage} of {totalPages}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
      <CustomModal open={open} onClose={() => setOpen(false)} title="Add Task">
        <AddTaskForm open={open} setOpen={setOpen} />
      </CustomModal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete the task.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default TodoList;
