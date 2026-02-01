import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem
} from "@mui/material";
import { useDispatch } from "react-redux";

import { assets, categories } from "../../assets/assets";
import { addProduct } from "../../features/app/appThunks";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      description: description.split("\n"),
      category,
      price,
      offerPrice
    };

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));

    files.forEach((file) => {
      if (file) formData.append("images", file);
    });

    dispatch(addProduct(formData));

    // reset
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setOfferPrice("");
    setFiles([]);
  };

  return (
    <Box
      sx={{
        height: "95vh",
        overflowY: "auto",
        p: { xs: 2, md: 4 }
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 520 }}>
        <Typography variant="h6" fontWeight={500} mb={3}>
          Add Product
        </Typography>

        {/* Image Upload */}
        <Box mb={3}>
          <Typography fontWeight={500}>Product Images</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
            {[...Array(4)].map((_, index) => (
              <label key={index}>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />
                <Box
                  component="img"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  sx={{
                    width: 96,
                    height: 96,
                    cursor: "pointer",
                    objectFit: "cover",
                    borderRadius: 1
                  }}
                />
              </label>
            ))}
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            select
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            required
          >
            {categories.map((item, index) => (
              <MenuItem key={index} value={item.path}>
                {item.path}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label="Product Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Offer Price"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              fullWidth
              required
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4 }}
          >
            Add Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
