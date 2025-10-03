// CustomModal.tsx
import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: ActionButton[]; // Dynamic buttons
  showDefaultClose?: boolean; // Optional default close button
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: "auto" as "auto",
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  showDefaultClose = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box sx={style}>
        {/* Close icon at top-right */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        {title && (
          <Typography
            id="custom-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            {title}
          </Typography>
        )}

        {children && <Box sx={{ mb: 3 }}>{children}</Box>}

        {(actions?.length || showDefaultClose) && (
          <Box display="flex" justifyContent="flex-end" gap={1}>
            {actions &&
              actions.map((btn, idx) => (
                <Button
                  key={idx}
                  variant={btn.variant || "contained"}
                  color={btn.color || "primary"}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              ))}

            {showDefaultClose && (
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Close
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
