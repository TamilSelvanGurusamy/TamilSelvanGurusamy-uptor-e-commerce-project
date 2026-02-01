import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Link as MUILink
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { addToCartLocal } from "../features/app/appSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector(state => state.app.products);
  const currency = useSelector(state => state.app.currency);

  const product = products.find(item => item._id === id);

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Related products
  useEffect(() => {
    if (product && products.length > 0) {
      const related = products
        .filter(item => item.category === product.category)
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [product, products]);

  // Thumbnail
  useEffect(() => {
    if (product?.image?.length) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <Box sx={{ mt: 6 }}>
      {/* Breadcrumb */}
      <Typography variant="body2" mb={2}>
        <MUILink component={Link} to="/" underline="hover">
          Home
        </MUILink>{" "}
        /{" "}
        <MUILink component={Link} to="/products" underline="hover">
          Products
        </MUILink>{" "}
        /{" "}
        <MUILink
          component={Link}
          to={`/products/${product.category.toLowerCase()}`}
          underline="hover"
        >
          {product.category}
        </MUILink>{" "}
        /{" "}
        <Box component="span" color="primary.main">
          {product.name}
        </Box>
      </Typography>

      {/* Main Content */}
      <Grid container spacing={6}>
        {/* Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {product.image.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setThumbnail(img)}
                  sx={{
                    width: 96,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    cursor: "pointer"
                  }}
                >
                  <Box component="img" src={img} width="100%" />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                maxWidth: 400
              }}
            >
              <Box component="img" src={thumbnail} width="100%" />
            </Box>
          </Box>
        </Grid>

        {/* Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={500}>
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                component="img"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                sx={{ width: 16 }}
              />
            ))}
            <Typography ml={1}>(4)</Typography>
          </Box>

          {/* Price */}
          <Box sx={{ mt: 4 }}>
            <Typography color="text.secondary" sx={{ textDecoration: "line-through" }}>
              MRP: {currency}{product.price}
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {currency}{product.offerPrice}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (inclusive of all taxes)
            </Typography>
          </Box>

          {/* Description */}
          <Typography fontWeight={500} mt={4}>
            About Product
          </Typography>
          <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
            {product.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </Box>

          {/* Actions */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => dispatch(addToCartLocal(product._id))}
              >
                Add to Cart
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  dispatch(addToCartLocal(product._id));
                  navigate("/cart");
                }}
              >
                Buy Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Related Products */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={500}>
          Related Products
        </Typography>
        <Box
          sx={{
            width: 80,
            height: 3,
            bgcolor: "primary.main",
            mx: "auto",
            mt: 1
          }}
        />

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 4 }}>
          {relatedProducts
            .filter(p => p.inStock)
            .map(p => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={p._id}>
                <ProductCard product={p} />
              </Grid>
            ))}
        </Grid>

        <Button
          sx={{ mt: 6 }}
          variant="outlined"
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
}
