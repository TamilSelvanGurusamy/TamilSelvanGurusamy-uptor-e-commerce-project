import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

export default function ProductCategory() {
  const products = useSelector(state => state.app.products);
  const { category } = useParams();

  const searchCategory = categories.find(
    item => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === category
  );

  return (
    <Box sx={{ mt: 8 }}>
      {/* Category Heading */}
      {searchCategory && (
        <Box sx={{ alignSelf: "flex-end", width: "fit-content" }}>
          <Typography
            variant="h5"
            fontWeight={500}
            textTransform="uppercase"
          >
            {searchCategory.text}
          </Typography>
          <Box
            sx={{
              width: 64,
              height: 3,
              bgcolor: "primary.main",
              borderRadius: 2,
              mt: 0.5
            }}
          />
        </Box>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ mt: 3 }}
        >
          {filteredProducts.map(product => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2.4}
              key={product._id}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            color="primary"
          >
            No products found in this category.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
