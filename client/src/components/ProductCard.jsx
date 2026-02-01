import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToCartLocal,
  removeFromCartLocal
} from "../features/app/appSlice";
import { updateCart } from "../features/app/appThunks";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currency, cartItems, user } = useSelector(state => state.app);
  const quantity = cartItems[product?._id] || 0;

  if (!product) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCartLocal(product._id));
    if (user) {
      dispatch(updateCart({ userId: user._id, cartItems }));
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    dispatch(removeFromCartLocal(product._id));
    if (user) {
      dispatch(updateCart({ userId: user._id, cartItems }));
    }
  };

  // const handleAdd = (e) => {
  //   e.stopPropagation();

  //   const updatedCart = {
  //     ...cartItems,
  //     [product._id]: (cartItems[product._id] || 0) + 1
  //   };

  //   dispatch(addToCartLocal(product._id));

  //   if (user) {
  //     dispatch(updateCart({ cartItems: updatedCart }));
  //   }
  // };

  // const handleRemove = (e) => {
  //   e.stopPropagation();

  //   const currentQty = cartItems[product._id] || 0;
  //   if (currentQty <= 0) return;

  //   const updatedCart = { ...cartItems };

  //   if (currentQty === 1) {
  //     delete updatedCart[product._id];
  //   } else {
  //     updatedCart[product._id] = currentQty - 1;
  //   }

  //   dispatch(removeFromCartLocal(product._id));

  //   if (user) {
  //     dispatch(updateCart({ cartItems: updatedCart }));
  //   }
  // };


  return (
    <Card
      sx={{
        width: 220,
        cursor: "pointer",
        borderRadius: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 4 }
      }}
      onClick={() => {
        navigate(
          `/products/${product.category.toLowerCase()}/${product._id}`
        );
        window.scrollTo(0, 0);
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          image={product.image[0]}
          alt={product.name}
          sx={{
            maxHeight: 140,
            objectFit: "contain",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)" }
          }}
        />
      </Box>

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>

        <Typography
          variant="subtitle1"
          fontWeight={500}
          noWrap
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {[...Array(5)].map((_, i) =>
            i < 4 ? (
              <StarIcon key={i} fontSize="small" color="warning" />
            ) : (
              <StarBorderIcon key={i} fontSize="small" />
            )
          )}
          <Typography variant="caption">(4)</Typography>
        </Box>

        {/* Price + Cart */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <Typography variant="h6" color="primary">
            {currency}
            {product.offerPrice}{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
                ml: 0.5
              }}
            >
              {currency}
              {product.price}
            </Typography>
          </Typography>

          {/* Cart Controls */}
          {quantity === 0 ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAdd}
            >
              Add
            </Button>
          ) : (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "primary.light",
                borderRadius: 1
              }}
            >
              <IconButton size="small" onClick={handleRemove}>
                <RemoveIcon />
              </IconButton>
              <Typography width={20} textAlign="center">
                {quantity}
              </Typography>
              <IconButton size="small" onClick={handleAdd}>
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
