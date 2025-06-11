import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Container,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Blog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "/" },
    { label: "Layanan Kami", href: "/services" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog", href: "/blog", active: true },
    { label: "Daftar Sekarang", href: "/register" },
  ];

  const blogPosts = new Array(6).fill({
    title: "Title",
    content: "Lorem ipsum dolor sit amet.",
  });

  return (
    <Box minHeight="100vh" bgcolor="#f9fafb">
      {/* Navbar */}
      <AppBar position="sticky" color="default" elevation={2}>
        <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ position: "absolute", left: 16, display: { md: "none" } }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { xs: isMenuOpen ? "flex" : "none", md: "flex" },
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              alignItems: "center",
              bgcolor: { xs: "white", md: "transparent" },
              p: { xs: 2, md: 0 },
              position: { xs: "absolute", md: "static" },
              top: 64,
              width: { xs: "100%", md: "auto" },
              zIndex: 10,
              boxShadow: { xs: 1, md: 0 },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                href={item.href}
                variant="outlined"
                color={item.active ? "success" : "inherit"}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  borderColor: "#ccc",
                  ":hover": {
                    bgcolor: "green.600",
                    color: "white",
                    borderColor: "green.600",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Bar */}
      <Container sx={{ my: 6 }}>
        <TextField
          fullWidth
          placeholder="Cari"
          variant="outlined"
          InputProps={{
            sx: { borderRadius: 999 },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Container>

      {/* Hero Section */}
      <Box position="relative" height={480}>
        <img
          src="src/assets/readquran.jpeg"
          alt="Person reading Quran"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          sx={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.3), transparent)",
          }}
        >
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pl={8}
            maxWidth="lg"
          >
            <Typography variant="h3" color="white" fontWeight="bold">
              Ketika hati dekat dengan Al-Qur'an, hidup pun tenang tanpa alasan.
            </Typography>
            <Box mt={3}>
              <Typography variant="h6" color="white">
                Di setiap hela napas, ada dzikir yang terucap tanpa suara.
                <br />
                Di setiap langkah, ada harapan menuju ampunan-Nya.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Blog Posts */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Recent blog post
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="/api/placeholder/400/200"
                  alt="Blog thumbnail"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={6} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            sx={{
              borderRadius: 999,
              borderColor: "#ccc",
              textTransform: "none",
              ":hover": {
                bgcolor: "green.600",
                color: "white",
                borderColor: "green.600",
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Read More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Blog;
