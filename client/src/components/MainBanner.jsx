import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { assets } from "../assets/assets";

export default function MainBanner() {
  return (
    <Box position="relative">
      {/* Desktop Banner */}
      <Box
        component="img"
        src={assets.main_banner_bg}
        alt="banner"
        sx={{
          width: "100%",
          display: { xs: "none", md: "block" }
        }}
      />

      {/* Mobile Banner */}
      <Box
        component="img"
        src={assets.main_banner_bg_sm}
        alt="banner"
        sx={{
          width: "100%",
          display: { xs: "block", md: "none" }
        }}
      />

      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: { xs: "flex-end", md: "center" },
          pb: { xs: 6, md: 0 },
          px: { xs: 2, md: 6, lg: 10 }
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: { xs: "center", md: "left" },
            maxWidth: { xs: 280, md: 320, lg: 420 },
            lineHeight: 1.2
          }}
        >
          Freshness You Can Trust, Savings You Will Love!
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="primary"
            endIcon={
              <Box
                component="img"
                src={assets.white_arrow_icon}
                alt="arrow"
                sx={{
                  transition: "transform 0.3s",
                  ".MuiButton-root:hover &": {
                    transform: "translateX(4px)"
                  }
                }}
              />
            }
            sx={{
              px: { xs: 3, md: 4 },
              py: 1.5,
              mr: 2,
              textTransform: "none",
              fontWeight: 500
            }}
          >
            Shop now
          </Button>

          <Button
            component={RouterLink}
            to="/products"
            variant="text"
            endIcon={
              <Box
                component="img"
                src={assets.black_arrow_icon}
                alt="arrow"
                sx={{
                  transition: "transform 0.3s",
                  ".MuiButton-root:hover &": {
                    transform: "translateX(4px)"
                  }
                }}
              />
            }
            sx={{
              display: { xs: "none", md: "flex" },
              textTransform: "none",
              fontWeight: 500
            }}
          >
            Explore deals
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
