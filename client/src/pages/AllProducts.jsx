import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const products = useSelector(state => state.app.products);
  const searchQuery = useSelector(state => state.app.searchQuery);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <Box sx={{ mt: 8, display: "flex", flexDirection: "column" }}>
      {/* Heading */}
      <Box sx={{ alignSelf: "flex-start", mb: 3 }}>
        <Typography variant="h5" fontWeight={500} textTransform="uppercase">
          All Products
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

      {/* Product Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredProducts
          .filter(product => product.inStock)
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
