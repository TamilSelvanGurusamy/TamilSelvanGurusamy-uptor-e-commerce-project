import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { assets } from "../../assets/assets";
import { sellerLogout } from "../../features/app/appThunks";

const drawerWidth = 240;

export default function SellerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon }
  ];

  const handleLogout = () => {
    dispatch(sellerLogout());
    navigate("/");
  };

  return (
    <>
      {/* Top Header */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box
            component="img"
            src={assets.logo}
            alt="logo"
            sx={{ width: { xs: 120, md: 150 }, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography color="text.secondary">
              Hi! Admin
            </Typography>
            <Button variant="outlined" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              pt: 2
            }
          }}
        >
          <List>
            {sidebarLinks.map((item) => (
              <ListItemButton
                key={item.name}
                component={NavLink}
                to={item.path}
                end={item.path === "/seller"}
                sx={{
                  "&.active": {
                    bgcolor: "primary.light",
                    borderRight: "4px solid",
                    borderColor: "primary.main",
                    color: "primary.main"
                  }
                }}
              >
                <ListItemIcon>
                  <Box
                    component="img"
                    src={item.icon}
                    sx={{ width: 28, height: 28 }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "95vh",
            overflowY: "auto"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
