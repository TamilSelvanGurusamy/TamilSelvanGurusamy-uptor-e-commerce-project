import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import { addAddress } from "../features/app/appThunks";

export default function AddAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.app.user);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(address)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/cart");
      }
    });
  };

  return (
    <Box sx={{ mt: 8, pb: 8 }}>
      <Typography variant="h4" color="text.secondary">
        Add Shipping{" "}
        <Box component="span" color="primary.main" fontWeight={600}>
          Address
        </Box>
      </Typography>

      <Grid container spacing={6} sx={{ mt: 4 }}>
        {/* Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, maxWidth: 480 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={address.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={address.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={address.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="street"
                    label="Street"
                    value={address.street}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="city"
                    label="City"
                    value={address.city}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="state"
                    label="State"
                    value={address.state}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    name="zipcode"
                    label="Zip Code"
                    type="number"
                    value={address.zipcode}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="country"
                    label="Country"
                    value={address.country}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={address.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Save Address
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={assets.add_address_iamge}
            alt="Add Address"
            sx={{ maxWidth: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
