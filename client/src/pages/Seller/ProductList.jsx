import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toggleProductStock } from "../../features/app/appThunks";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, currency } = useSelector(state => state.app);

  return (
    <Box sx={{ height: "95vh", overflowY: "auto" }}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight={500} mb={3}>
          All Products
        </Typography>

        <Paper sx={{ maxWidth: 1000, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Product</b></TableCell>
                <TableCell><b>Category</b></TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  <b>Selling Price</b>
                </TableCell>
                <TableCell><b>In Stock</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map(product => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={product.image[0]}
                        alt="product"
                        sx={{
                          width: 64,
                          border: "1px solid #ddd",
                          borderRadius: 1,
                          p: 1
                        }}
                      />
                      <Typography
                        noWrap
                        sx={{ maxWidth: 220, display: { xs: "none", sm: "block" } }}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{product.category}</TableCell>

                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {currency}{product.offerPrice}
                  </TableCell>

                  <TableCell>
                    <Switch
                      checked={product.inStock}
                      onChange={() =>
                        dispatch(
                          toggleProductStock({
                            id: product._id,
                            inStock: !product.inStock
                          })
                        )
                      }
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
