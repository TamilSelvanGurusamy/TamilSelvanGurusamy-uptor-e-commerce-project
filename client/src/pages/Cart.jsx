import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
  Button,
  Divider,
  Menu
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectCartArray,
  selectCartAmount,
  selectCartCount
} from "../features/app/selectors";

import {
  updateCartItemLocal,
  removeFromCartLocal,
  setSelectedAddress
} from "../features/app/appSlice";

import { fetchAddresses } from "../features/app/appThunks";
import { assets } from "../assets/assets";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartArray = useSelector(selectCartArray);
  const cartCount = useSelector(selectCartCount);
  const cartAmount = useSelector(selectCartAmount);
  const currency = useSelector(state => state.app.currency);

  const addresses = useSelector(state => state.app.addresses);
  const selectedAddress = useSelector(state => state.app.selectedAddress);

  const [addressAnchor, setAddressAnchor] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (!cartArray.length) return null;

  return (
    <Grid container spacing={4} sx={{ mt: 8, alignItems: "flex-start" }}>
      {/* Cart Items */}
      <Grid item xs={12} md={8.5} lg={9}>
        <Typography variant="h4" fontWeight={500} mb={3}>
          Shopping Cart{" "}
          <Typography component="span" color="primary.main">
            {cartCount} Items
          </Typography>
        </Typography>

        <Paper sx={{ p: 3 }}>
          {cartArray.map(product => (
            <Grid
              key={product._id}
              container
              spacing={2}
              alignItems="center"
              sx={{ py: 2 }}
            >
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={product.image[0]}
                    sx={{
                      width: 80,
                      height: 80,
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      navigate(
                        `/products/${product.category.toLowerCase()}/${product._id}`
                      )
                    }
                  />

                  <Box>
                    <Typography fontWeight={600}>
                      {product.name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2">Qty:</Typography>
                      <Select
                        size="small"
                        value={product.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateCartItemLocal({
                              itemId: product._id,
                              quantity: Number(e.target.value)
                            })
                          )
                        }
                      >
                        {[...Array(10)].map((_, i) => (
                          <MenuItem key={i} value={i + 1}>
                            {i + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} textAlign="center">
                {currency}{product.offerPrice * product.quantity}
              </Grid>

              <Grid item xs={3} textAlign="center">
                <Button
                  onClick={() =>
                    dispatch(removeFromCartLocal(product._id))
                  }
                >
                  <img src={assets.remove_icon} width={24} />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Paper>

        <Button sx={{ mt: 3 }} onClick={() => navigate("/products")}>
          ← Continue Shopping
        </Button>
      </Grid>

      {/* Order Summary */}
      <Grid item xs={12} md={3.5} lg={3} sx={{ position: { md: "sticky" }, top: 100 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" mb={2}>
            Order Summary
          </Typography>

          <Typography fontWeight={500}>Delivery Address</Typography>

          {selectedAddress ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                {selectedAddress.street}, {selectedAddress.city}
              </Typography>
              <Button size="small" onClick={e => setAddressAnchor(e.currentTarget)}>
                Change
              </Button>
            </Box>
          ) : (
            <Button size="small" onClick={() => navigate("/add-address")}>
              Add Address
            </Button>
          )}

          <Menu
            anchorEl={addressAnchor}
            open={Boolean(addressAnchor)}
            onClose={() => setAddressAnchor(null)}
          >
            {addresses.map(addr => (
              <MenuItem
                key={addr._id}
                onClick={() => {
                  dispatch(setSelectedAddress(addr));
                  setAddressAnchor(null);
                }}
              >
                {addr.street}, {addr.city}
              </MenuItem>
            ))}
            <MenuItem onClick={() => navigate("/add-address")}>
              ➕ Add Address
            </MenuItem>
          </Menu>

          <Divider sx={{ my: 3 }} />

          <Typography display="flex" justifyContent="space-between">
            <span>Total</span>
            <span>{currency}{(cartAmount * 1.02).toFixed(2)}</span>
          </Typography>

          <Button fullWidth variant="contained" sx={{ mt: 3 }}>
            Place Order
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
