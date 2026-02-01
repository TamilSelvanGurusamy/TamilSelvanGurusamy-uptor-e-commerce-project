import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider
} from "@mui/material";
import { useSelector } from "react-redux";

import { assets, dummyOrders } from "../../assets/assets";

export default function Orders() {
  const currency = useSelector(state => state.app.currency);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // later replace with API thunk
    setOrders(dummyOrders);
  }, []);

  return (
    <Box
      sx={{
        height: "95vh",
        overflowY: "auto"
      }}
    >
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight={500} mb={3}>
          Orders List
        </Typography>

        {orders.map((order, index) => (
          <Paper
            key={index}
            sx={{
              p: 3,
              mb: 3,
              maxWidth: 900
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Items */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="img"
                    src={assets.box_icon}
                    alt="box"
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box>
                    {order.items.map((item, i) => (
                      <Typography key={i} fontWeight={500}>
                        {item.product.name}{" "}
                        <Box component="span" color="primary.main">
                          x {item.quantity}
                        </Box>
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>

              {/* Address */}
              <Grid item xs={12} md={3}>
                <Typography fontWeight={500}>
                  {order.address.firstName} {order.address.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.address.street}, {order.address.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </Typography>
                <Typography variant="body2">
                  {order.address.phone}
                </Typography>
              </Grid>

              {/* Amount */}
              <Grid item xs={12} md={2}>
                <Typography variant="h6" fontWeight={500}>
                  {currency}
                  {order.amount}
                </Typography>
              </Grid>

              {/* Payment Info */}
              <Grid item xs={12} md={3}>
                <Typography variant="body2">
                  Method: {order.paymentType}
                </Typography>
                <Typography variant="body2">
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Payment:{" "}
                  {order.isPaid ? "Paid" : "Pending"}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 2 }} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
