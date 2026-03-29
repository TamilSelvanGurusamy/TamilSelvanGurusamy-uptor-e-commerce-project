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

  const taxRate = 0.02;
  const shippingFee = 0;
  const taxAmount = Number((cartAmount * taxRate).toFixed(2));
  const totalAmount = Number((cartAmount + shippingFee + taxAmount).toFixed(2));

  return (
    <Grid container spacing={4} sx={{ mt: 8, alignItems: "flex-start", px: { xs: 2, md: 6 } }}>
      {/* Cart Items */}
      <Grid item xs={12} md={8.5} lg={9}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Shopping Cart <Typography component="span" color="primary.main">{cartCount} Items</Typography>
        </Typography>

        <Paper sx={{ p: 2, border: "1px solid #e0e0e0" }}>
          <Grid container sx={{ pb: 2, borderBottom: "1px solid #e0e0e0", columnGap: 50 }}>
            <Grid item xs={6} sx={{ pr: 1 }}><Typography fontWeight={600} color="text.secondary">Product Details</Typography></Grid>
            <Grid item xs={3} sx={{ px: 1 }}><Typography fontWeight={600} color="text.secondary" textAlign="center">Subtotal</Typography></Grid>
            <Grid item xs={3} sx={{ pl: 1 }}><Typography fontWeight={600} color="text.secondary" textAlign="center">Action</Typography></Grid>
          </Grid>

          {cartArray.map(product => (
            <Grid key={product._id} container alignItems="center" sx={{ py: 2, borderBottom: "1px solid #f2f2f2", columnGap: 40 }}>
              <Grid item xs={6} sx={{ pr: 1 }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Box
                    component="img"
                    src={product.image?.[0] || assets.product_placeholder}
                    alt={product.name}
                    sx={{ width: 90, height: 90, border: "1px solid #ddd", borderRadius: 1, objectFit: "cover", cursor: "pointer" }}
                    onClick={() => navigate(`/products/${product.category.toLowerCase()}/${product._id}`)}
                  />

                  <Box>
                    <Typography fontWeight={600} fontSize="1rem">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Weight: N/A</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <Typography variant="body2">Qty:</Typography>
                      <Select
                        size="small"
                        value={product.quantity}
                        onChange={(e) => dispatch(updateCartItemLocal({ itemId: product._id, quantity: Number(e.target.value) }))}
                      >
                        {[...Array(10)].map((_, i) => (<MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>))}
                      </Select>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={3} textAlign="center" sx={{ px: 1 }}>
                <Typography fontWeight={600}>{currency}{(product.offerPrice * product.quantity).toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={3} textAlign="center" sx={{ pl: 1 }}>
                <Button onClick={() => dispatch(removeFromCartLocal(product._id))} sx={{ minWidth: 0, p: 0.5 }}>
                  <img src={assets.remove_icon} width={22} alt="remove" />
                </Button>
              </Grid>
            </Grid>
          ))}
        </Paper>

        <Button sx={{ mt: 3 }} onClick={() => navigate("/products")}>← Continue Shopping</Button>
      </Grid>

      {/* Order Summary */}
      <Grid item xs={12} md={3.5} lg={3} sx={{ position: { md: "sticky" }, top: 100, ml: "auto", mr: { xs: 0, md: 6 } }}>
        <Paper sx={{ p: 3, backgroundColor: "rgba(244,248,250,0.9)" }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Order Summary</Typography>

          <Typography fontWeight={600} letterSpacing={0.5}>Delivery Address</Typography>

          {selectedAddress ? (
            <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography variant="body2" color="text.secondary">{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state || ""}</Typography>
              <Button size="small" onClick={e => setAddressAnchor(e.currentTarget)}>Change</Button>
            </Box>
          ) : (
            <Button size="small" onClick={() => navigate("/add-address")} sx={{ mt: 1 }}>Add Address</Button>
          )}

          <Menu anchorEl={addressAnchor} open={Boolean(addressAnchor)} onClose={() => setAddressAnchor(null)}>
            {addresses.map(addr => (
              <MenuItem key={addr._id} onClick={() => { dispatch(setSelectedAddress(addr)); setAddressAnchor(null); }}>
                {addr.street}, {addr.city}
              </MenuItem>
            ))}
            <MenuItem onClick={() => navigate("/add-address")}>➕ Add Address</MenuItem>
          </Menu>

          <Typography fontWeight={600} letterSpacing={0.5} sx={{ mt: 3 }}>Payment Method</Typography>
          <Select fullWidth size="small" value={paymentOption} onChange={e => setPaymentOption(e.target.value)} sx={{ mt: 1 }}>
            <MenuItem value="COD">Cash On Delivery</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
          </Select>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Price</Typography>
            <Typography fontWeight={600}>{currency}{cartAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Shipping Fee</Typography>
            <Typography fontWeight={600}>Free</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
            <Typography variant="body2" color="text.secondary">Tax (2%)</Typography>
            <Typography fontWeight={600}>{currency}{taxAmount.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>Total Amount:</Typography>
            <Typography variant="h6" fontWeight={700}>{currency}{totalAmount.toFixed(2)}</Typography>
          </Box>

          <Button fullWidth variant="contained" size="large">Place Order</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
