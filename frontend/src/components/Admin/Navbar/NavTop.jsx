import { Box, Button, InputAdornment, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { HiBell, HiChat, HiClipboardList, HiCog, HiLogout, HiUser } from "react-icons/hi";
import { Search } from "@mui/icons-material";
import IconCard from "../../Ui/IconCard";
import CustomeAvatar from "../../Ui/CustomeAvatar";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

function NavTop() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { logout } = useAuth()

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Logo dan Icon Kiri */}
            <Box display="flex" alignItems="center" width={400} justifyContent="space-between">
                <Box component="img" src="/img/logo/logo.png" alt="logo-kahf" sx={{ width: 80, objectFit: "cover" }} />
                <Stack direction="row" gap={2} alignItems="center">
                    <IconCard icon={<HiClipboardList size={24} />} />
                    <IconCard icon={<HiChat size={24} />} />
                </Stack>
            </Box>

            {/* Bagian Kanan: Bell, Search, Avatar */}
            <Box display="flex" justifyContent="end" alignItems="center" flex={1} gap={2}>
                <IconCard icon={<HiBell size={24} />} />

                <TextField
                    placeholder="search here ..."
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Avatar Button */}
                <Button
                    onClick={handleOpenMenu}
                    sx={{ borderRadius: "999px", minWidth: 0, padding: 0 }}
                >
                    <CustomeAvatar src="/img/avatar/avatar-1.png" alt="avatar" />
                </Button>

                {/* Dropdown Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        sx: {
                            px: 1,
                            mt: 1
                        }

                    }}
                >

                    <MenuItem
                        onClick={handleCloseMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                backgroundColor: '#f0f0f0', // ganti sesuai kebutuhan
                            }
                        }}
                    >
                        <HiUser size={18} />
                        Profile
                    </MenuItem>

                    <MenuItem
                        onClick={handleCloseMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            }
                        }}
                    >
                        <HiCog size={18} />
                        Settings
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            logout();
                            handleCloseMenu();
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                backgroundColor: '#ffecec', // merah muda untuk logout
                                color: '#c62828', // teks merah
                            }
                        }}
                    >
                        <HiLogout size={18} />
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}

export default NavTop;
