import { Alert, Snackbar } from "@mui/material";

const SnackbarTag = ({ msg, open, close, type }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={close}
      style={{ marginBottom: "20px" }}
    >
      <Alert onClose={close} severity={type} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarTag;
