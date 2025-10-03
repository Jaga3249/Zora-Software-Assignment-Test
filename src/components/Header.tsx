import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "background.paper" }}
    >
      <Container maxWidth={false}>
        <Toolbar sx={{ gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckBoxIcon fontSize="large" sx={{ color: "white" }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                TaskFlow
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Manage your tasks efficiently
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="body2" fontWeight="medium">
                {username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin User
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              startIcon={<LogoutIcon fontSize="medium" />}
              sx={{ textTransform: "none" }}
            >
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Logout
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
