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
  const loading = useSelector(state => state.app.loading);

  const [addressAnchor, setAddressAnchor] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading.user || loading.products) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Typography variant="h6">Loading your cart...</Typography>
      </Box>
    );
  }

  if (!cartArray.length) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Typography variant="h5" gutterBottom>Your cart is empty</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add some products to get started!
        </Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>Browse Products</Button>
      </Box>
    );
  }

  const taxRate = 0.02;
  const shippingFee = 0;
  const taxAmount = Number((cartAmount * taxRate).toFixed(2));
  const totalAmount = Number((cartAmount + shippingFee + taxAmount).toFixed(2));

  return (
    <Grid container spacing={4} sx={{ mt: 8, px: { xs: 2, md: 6 } }}>
      <Grid item xs={12} md={8} lg={9}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Shopping Cart <Typography component="span" color="primary.main">{cartCount} Items</Typography>
        </Typography>

        <Paper sx={{ p: { xs: 2, md: 3 }, border: "1px solid #e8eef0", borderRadius: 3, boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 30, pb: 2, mb: 2, borderBottom: "1px solid #e6ecf0" }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ minWidth: 220 }}>Product Details</Typography>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ flex: "0 0 120px", textAlign: "center" }}>Subtotal</Typography>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ flex: "0 0 80px", textAlign: "center" }}>Action</Typography>
          </Box>

          {cartArray.map(product => (
            <Box key={product._id} sx={{ display: "flex", justifyContent: "space-between", gap: 30, py: 2, borderBottom: "1px solid #f2f5f6" }}>
              <Box sx={{ minWidth: 220 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    component="img"
                    src={product.image?.[0] || assets.product_placeholder}
                    alt={product.name}
                    sx={{ width: 96, height: 96, border: "1px solid #ebf0f2", borderRadius: 2, objectFit: "cover", cursor: "pointer" }}
                    onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product._id}`)}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={700}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Weight: N/A</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
                      <Typography variant="body2" color="text.secondary">Qty:</Typography>
                      <Select
                        size="small"
                        value={product.quantity}
                        onChange={(e) => dispatch(updateCartItemLocal({ itemId: product._id, quantity: Number(e.target.value) }))}
                        sx={{ minWidth: 90 }}
                      >
                        {[...Array(10)].map((_, idx) => (
                          <MenuItem key={idx} value={idx + 1}>{idx + 1}</MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ flex: "0 0 120px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography fontWeight={700}>{currency}{(product.offerPrice * product.quantity).toFixed(2)}</Typography>
              </Box>

              <Box sx={{ flex: "0 0 80px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button onClick={() => dispatch(removeFromCartLocal(product._id))} sx={{ minWidth: 0, p: 0.5 }}>
                  <img src={assets.remove_icon} width={22} alt="remove" />
                </Button>
              </Box>
            </Box>
          ))}
        </Paper>

        <Button variant="text" sx={{ mt: 3, textTransform: "none" }} onClick={() => navigate("/products")}>← Continue Shopping</Button>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e8eef0", boxShadow: "0px 8px 24px rgba(15, 23, 42, 0.08)", position: { md: "sticky" }, top: 100 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Order Summary</Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 1, fontWeight: 700 }}>Delivery Address</Typography>
            {selectedAddress ? (
              <Button size="small" onClick={e => setAddressAnchor(e.currentTarget)} sx={{ textTransform: "none", p: 0, minWidth: 0 }}>
                Change
              </Button>
            ) : (
              <Button size="small" onClick={() => navigate("/add-address")} sx={{ textTransform: "none", p: 0, minWidth: 0 }}>
                Add Address
              </Button>
            )}
          </Box>

          {selectedAddress ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state || ""}
            </Typography>
          ) : null}

          <Menu anchorEl={addressAnchor} open={Boolean(addressAnchor)} onClose={() => setAddressAnchor(null)}>
            {addresses.map(addr => (
              <MenuItem key={addr._id} onClick={() => { dispatch(setSelectedAddress(addr)); setAddressAnchor(null); }}>
                {addr.street}, {addr.city}
              </MenuItem>
            ))}
            <MenuItem onClick={() => navigate("/add-address")}>➕ Add Address</MenuItem>
          </Menu>

          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1, mt: 3 }}>Payment Method</Typography>
          <Select fullWidth size="small" value={paymentOption} onChange={e => setPaymentOption(e.target.value)} sx={{ mt: 1 }}>
            <MenuItem value="COD">Cash On Delivery</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
          </Select>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Price</Typography>
            <Typography fontWeight={700}>{currency}{cartAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Shipping Fee</Typography>
            <Typography fontWeight={700}>Free</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Tax (2%)</Typography>
            <Typography fontWeight={700}>{currency}{taxAmount.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={700}>Total Amount:</Typography>
            <Typography variant="subtitle1" fontWeight={700}>{currency}{totalAmount.toFixed(2)}</Typography>
          </Box>

          <Button fullWidth variant="contained" size="large" sx={{ textTransform: "none" }}>Place Order</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
