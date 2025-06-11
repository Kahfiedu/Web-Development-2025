import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KahfLogo from "../components/Kahflogo";
import { FiBell, FiEdit, FiUser } from "react-icons/fi";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Container,
  TextField,
  Button,
  Paper,
  Box,
  Grid
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const initialUserData = {
    name: "John Bee",
    class: "Kelas 2",
    username: "John",
    phone: "+62 8123 456 78",
    email: "siswa@gmail.com",
    gender: "Male",
    birthDate: "2 Jan 2015",
    password: "********",
    address: "Kab. Kuta, Bali, Indonesia"
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    navigate("/profile-detail");
  };

  const handleSave = () => {
    setIsEditing(false);
    navigate("/profile-detail");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Header */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Box sx={{ width: 100 }}>
              <KahfLogo />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <InputBase placeholder="Cari" sx={{ bgcolor: '#eee', px: 2, py: 0.5, borderRadius: 20, width: 200 }} />
            <IconButton>
              <FiBell />
            </IconButton>
            <Link to="/profile">
              <Avatar>
                <FiUser />
              </Avatar>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Box textAlign="center" mb={4}>
            <Box position="relative" display="inline-block">
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                sx={{ width: 112, height: 112, bgcolor: "#bbdefb", mx: "auto" }}
              />
              <Box position="absolute" bottom={0} right={0} bgcolor="black" color="white" borderRadius="50%" p={0.5}>
                <FiEdit size={14} />
              </Box>
            </Box>
            <Typography variant="h6" mt={2}>{userData.name}</Typography>
            <Typography variant="body2" color="text.secondary">{userData.class}</Typography>
          </Box>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              {[
                { label: "Username", name: "username" },
                { label: "No. Telp", name: "phone" },
                { label: "Email", name: "email" },
                { label: "Gender", name: "gender" },
                { label: "Tanggal lahir", name: "birthDate" },
                { label: "Password", name: "password", type: "password" },
                { label: "Alamat", name: "address" },
              ].map(({ label, name, type }) => (
                <Grid item xs={12} key={name}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={label}
                    name={name}
                    type={type || "text"}
                    value={userData[name]}
                    onChange={handleChange}
                    disabled={!isEditing || name === "email"}
                  />
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" gap={2} mt={4}>
              <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileEdit;
