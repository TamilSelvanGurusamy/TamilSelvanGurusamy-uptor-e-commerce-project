import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function BestSeller() {
  const products = useSelector(state => state.app.products);

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight={500} mb={3}>
        Best Sellers
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {products
          .filter(product => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2.4}
              key={index}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
