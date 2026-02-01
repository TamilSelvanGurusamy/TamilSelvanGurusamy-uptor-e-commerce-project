import { Box, Typography, Link, Grid } from "@mui/material";
import { assets, footerLinks } from "../assets/assets";

export default function Footer() {
  return (
    <Box
      sx={{
        px: { xs: 3, md: 8, lg: 12, xl: 16 },
        mt: 12,
        bgcolor: "primary.main"
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          py: 8,
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.secondary"
        }}
      >
        <Grid container spacing={6} justifyContent="space-between">
          {/* Logo + Description */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={assets.logo}
              alt="logo"
              sx={{ width: { xs: 140, md: 120 } }}
            />
            <Typography sx={{ mt: 3, maxWidth: 420 }}>
              We deliver fresh groceries and snacks straight to your door.
              Trusted by thousands, we aim to make your shopping experience
              simple and affordable.
            </Typography>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              {footerLinks.map((section, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                    gutterBottom
                  >
                    {section.title}
                  </Typography>

                  {section.links.map((link, i) => (
                    <Typography variant="body2" key={i}>
                      <Link
                        href={link.url}
                        underline="hover"
                        color="inherit"
                      >
                        {link.text}
                      </Link>
                    </Typography>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Copyright */}
      <Typography
        sx={{
          py: 3,
          textAlign: "center",
          fontSize: { xs: 13, md: 14 },
          color: "text.secondary"
        }}
      >
        © {new Date().getFullYear()} GreatStack.dev. All Rights Reserved.
      </Typography>
    </Box>
  );
}
