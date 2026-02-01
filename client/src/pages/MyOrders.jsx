import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider
} from "@mui/material";
import { useSelector } from "react-redux";

import { dummyOrders } from "../assets/assets";

export default function MyOrders() {
  const currency = useSelector(state => state.app.currency);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    // later replace with API thunk
    setMyOrders(dummyOrders);
  }, []);

  return (
    <Box sx={{ mt: 8, pb: 8 }}>
      {/* Page Heading */}
      <Box sx={{ alignSelf: "flex-end", width: "fit-content", mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={500}
          textTransform="uppercase"
        >
          My Orders
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

      {myOrders.map((order, index) => (
        <Paper
          key={index}
          sx={{
            p: 3,
            mb: 4,
            maxWidth: 900
          }}
        >
          {/* Order Summary */}
          <Grid
            container
            spacing={2}
            sx={{ color: "text.secondary", mb: 2 }}
          >
            <Grid item xs={12} md={4}>
              Order ID: {order._id}
            </Grid>
            <Grid item xs={12} md={4}>
              Payment: {order.paymentType}
            </Grid>
            <Grid item xs={12} md={4}>
              Total Amount: {currency}{order.amount}
            </Grid>
          </Grid>

          {/* Order Items */}
          {order.items.map((item, i) => (
            <Box key={i}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                sx={{ py: 2 }}
              >
                {/* Product */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      component="img"
                      src={item.product.image[0]}
                      alt={item.product.name}
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: "primary.light",
                        p: 1,
                        borderRadius: 2
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={500}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2">
                        Category: {item.product.category}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Details */}
                <Grid item xs={12} md={4}>
                  <Typography variant="body2">
                    Quantity: {item.quantity || 1}
                  </Typography>
                  <Typography variant="body2">
                    Status: {item.status}
                  </Typography>
                  <Typography variant="body2">
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>

                {/* Amount */}
                <Grid item xs={12} md={4}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={500}
                  >
                    {currency}
                    {item.product.offerPrice * item.quantity}
                  </Typography>
                </Grid>
              </Grid>

              {order.items.length !== i + 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      ))}
    </Box>
  );
}
