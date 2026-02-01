import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Typography,
  Badge,
  InputBase,
  Menu,
  MenuItem,
  Drawer
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { assets } from "../assets/assets";
import {
  setShowUserLogin,
  setSearchQuery
} from "../features/app/appSlice";
import { logoutUser } from "../features/app/appThunks";
import { selectCartCount } from "../features/app/selectors";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, searchQuery } = useSelector(state => state.app);
  const cartCount = useSelector(selectCartCount);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  return (
    <>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, md: 6 } }}>

          {/* Logo */}
          <Box component={NavLink} to="/" sx={{ flexGrow: 1 }}>
            <Box component="img" src={assets.logo} height={36} />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 3 }}>
            <Button component={NavLink} to="/">Home</Button>
            <Button component={NavLink} to="/products">All Products</Button>
            <Button>Contact</Button>

            {/* Search */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                px: 2,
                border: "1px solid #ddd",
                borderRadius: "20px"
              }}
            >
              <InputBase
                placeholder="Search products"
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                sx={{ fontSize: 14 }}
              />
              <SearchIcon fontSize="small" />
            </Box>

            {/* Cart */}
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Auth */}
            {!user ? (
              <Button
                variant="contained"
                onClick={() => dispatch(setShowUserLogin(true))}
              >
                Login
              </Button>
            ) : (
              <>
                <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                  <AccountCircleIcon fontSize="large" />
                </IconButton>

                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItem onClick={() => navigate("/my-orders")}>
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(logoutUser())}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile Icons */}
          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Button fullWidth component={NavLink} to="/">Home</Button>
          <Button fullWidth component={NavLink} to="/products">All Products</Button>
          {user && <Button fullWidth onClick={() => navigate("/my-orders")}>My Orders</Button>}
          <Button fullWidth>Contact</Button>

          {!user ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                dispatch(setShowUserLogin(true));
                setMobileOpen(false);
              }}
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
