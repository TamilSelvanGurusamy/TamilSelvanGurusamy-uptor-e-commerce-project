import { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  loginUser,
  registerUser
} from "../features/app/appThunks";
import { setShowUserLogin } from "../features/app/appSlice";

export default function Login() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.app.showUserLogin);

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(setShowUserLogin(false))}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h5" textAlign="center" mb={3}>
          <Box component="span" color="primary.main">
            User
          </Box>{" "}
          {mode === "login" ? "Login" : "Sign Up"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Typography variant="body2" mt={2}>
            {mode === "register" ? (
              <>
                Already have an account?{" "}
                <Box
                  component="span"
                  color="primary.main"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setMode("login")}
                >
                  Click here
                </Box>
              </>
            ) : (
              <>
                Create an account?{" "}
                <Box
                  component="span"
                  color="primary.main"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setMode("register")}
                >
                  Click here
                </Box>
              </>
            )}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            {mode === "register" ? "Create Account" : "Login"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
