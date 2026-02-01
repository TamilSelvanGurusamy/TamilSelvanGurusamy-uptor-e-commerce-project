import { Box, Typography, TextField, Button } from "@mui/material";

export default function NewsLetter() {
  return (
    <Box
      sx={{
        mt: 12,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Never Miss a Deal!
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 600, mt: 1, mb: 4 }}
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 600
        }}
      >
        <TextField
          fullWidth
          placeholder="Enter your email id"
          variant="outlined"
          size="small"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            px: { xs: 3, md: 6 },
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
}
