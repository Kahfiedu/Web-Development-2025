import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useAuth } from "../../../hooks/useAuth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

const pages = [
  { name: "Dashboard", path: "/siswa" },
   { name: "Kelas", path: "/siswa/kelas" },
  { name: "Pengajar", path: "/siswa/pengajar" },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMenuOpenToggle, setIsMenuOpenToggle] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setIsMenuOpenToggle(false);
  };

  const handleMobileMenuOpen = (event) => {
    if (isMobileMenuOpen) {
      setMobileMoreAnchorEl(null);
      setIsMenuOpenToggle(false);
    } else {
      setMobileMoreAnchorEl(event.currentTarget);
      setIsMenuOpenToggle(true);
    }
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/")
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 5,
        },
      }}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate("/siswa/profile") }}>Profile</MenuItem>
      <MenuItem onClick={() => { handleLogout() }}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      id={mobileMenuId}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 54, right: 0 }}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          width: "100vw",
          maxWidth: "100vw",
          left: 0,
          right: 0,
          top: 0,
          position: "fixed",
          bgcolor: "#fff",
          zIndex: 1300,
          borderRadius: 0,
          boxShadow: 0,
          padding: 0,
        },
      }}
    >
      {pages.map((page) => (
        <MenuItem
          key={page.name}
          component={Link}
          to={page.path}
          onClick={handleMobileMenuClose}
          selected={currentPath === page.path}
        >
          <Typography variant="body1">{page.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "white", color: "black" }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: { xs: 1, sm: 2 },
            }}
          >
            <img src="/img/logo/logo.png" alt="Logo" style={{ marginRight: "8px", height: "50px" }} />
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              {pages.map((page) => (
                <Typography
                  key={page.name}
                  variant="body1"
                  sx={{
                    backgroundColor: currentPath === page.path ? "#008B47" : "transparent",
                    color: currentPath === page.path ? "white" : "black",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#008B47",
                      color: "white",
                    },
                  }}
                  component={Link}
                  to={page.path}
                >
                  {page.name}
                </Typography>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Search sx={{ display: "flex", alignItems: "center" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
              </Search>

              <IconButton size="large" color="success">
                <NotificationsIcon />
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="success"
              >
                <AccountCircle />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                {isMenuOpenToggle ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
