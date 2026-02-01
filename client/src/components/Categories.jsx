import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { categories } from "../assets/assets";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight={500} mb={3}>
        Categories
      </Typography>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2.4}
            lg={2}
            xl={1.7}
            key={index}
          >
            <Box
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                window.scrollTo(0, 0);
              }}
              sx={{
                cursor: "pointer",
                py: 3,
                px: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                bgcolor: category.bgColor,
                transition: "0.3s",
                "&:hover img": {
                  transform: "scale(1.08)"
                }
              }}
            >
              <Box
                component="img"
                src={category.image}
                alt={category.text}
                sx={{
                  maxWidth: 110,
                  transition: "0.3s"
                }}
              />

              <Typography variant="body2" fontWeight={500}>
                {category.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
