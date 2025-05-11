import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";

const pages = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: "/tentangkami" },
  { name: "Program Pilihan", path: "/programpilihan" },
  { name: "Blog", path: "/blog" },
  { name: "Karir", path: "/karir" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page) => {
    console.log(`Navigating to: ${page.name}`);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <img
            src="img/logo/logo.png"
            alt="Logo"
            style={{ marginRight: "8px", height: "50px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#000",
              textDecoration: "none",
            }}
          />

          {/* Menu Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#008B47",
                  display: "block",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "medium",
                  mx: 3,
                  "&:hover": {
                    textDecoration: "underline",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Tombol Masuk & Daftar (Desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "#008B47",
                mx: 1,
                boxShadow: "none",
              }}
            >
              Daftar
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                backgroundColor: "#008B47",
                mx: 1,
                boxShadow: "none",
              }}
            >
              Masuk
            </Button>
          </Box>

          {/* Hamburger Menu (Mobile) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="menu"
              onClick={anchorElNav ? handleCloseNavMenu : handleOpenNavMenu}
              sx={{ color: "black" }}
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Menu Dropdown Mobile */}
        <Box
          sx={{
            position: "absolute",
            top: "64px",
            left: 0,
            width: "100vw",
            bgcolor: "#fff",
            display: anchorElNav ? "block" : "none",
            zIndex: 1300,
            boxShadow: 0,
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => handleMenuItemClick(page)}
              sx={{
                textAlign: "center",
                color: "black",
                backgroundColor: "white",
              }}
            >
              <Link
                to={page.path}
                onClick={handleCloseNavMenu}
                style={{ width: "100%", textDecoration: "none", color: "black" }}
              >
                <Typography>{page.name}</Typography>
              </Link>
            </MenuItem>
          ))}
          <MenuItem onClick={handleCloseNavMenu}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                color: "white",
                width: "100%",
                backgroundColor: "#008B47",
              }}
            >
              Daftar
            </Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button
              component={Link}
              to="/masuk"
              variant="contained"
              sx={{
                color: "white",
                width: "100%",
                backgroundColor: "#008B47",
              }}
            >
              Masuk
            </Button>
          </MenuItem>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Navbar;
