import { Box, Typography } from "@mui/material";
import { assets, features } from "../assets/assets";

export default function BottomBanner() {
  return (
    <Box sx={{ position: "relative", mt: 12 }}>
      {/* Desktop Banner */}
      <Box
        component="img"
        src={assets.bottom_banner_image}
        alt="banner"
        sx={{
          width: "100%",
          display: { xs: "none", md: "block" }
        }}
      />

      {/* Mobile Banner */}
      <Box
        component="img"
        src={assets.bottom_banner_image_sm}
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
          alignItems: { xs: "center", md: "flex-end" },
          justifyContent: { xs: "flex-start", md: "center" },
          pt: { xs: 8, md: 0 },
          pr: { md: 10 }
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            mb={3}
          >
            Why We Are the Best?
          </Typography>

          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 1.5
              }}
            >
              <Box
                component="img"
                src={feature.icon}
                alt={feature.title}
                sx={{
                  width: { xs: 36, md: 44 }
                }}
              />

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
