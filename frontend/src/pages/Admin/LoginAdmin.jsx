import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Stack,
    Switch,
    FormControlLabel,
    FormControl,
    FormLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useState } from "react";
import CustomeButton from "../../components/CustomeButton";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useAlert from '../../hooks/useAlert';
import AuthService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
    const { showAlert } = useAlert()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false,
        rememberMe: true
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        try {
            const response = await AuthService.login(formData.email, formData.password)
            if (response.message && response.token && response.role) {
                if (response.role !== "admin") {
                    showAlert('Unauthorization', 'error');
                }
                login(response.token, response.role)
                showAlert('Login berhasil', 'success');
                navigate('/admin/dashboard')
            }

        } catch (error) {
            console.error(error.message)
            showAlert(error.message, 'error')
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleTogglePassword = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword
        });
    };

    const handleRememberMe = (e) => {
        setFormData({
            ...formData,
            rememberMe: e.target.checked
        });
    };

    return (
        <Box
            display="flex"
            minHeight="100vh"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: '#f5f5f5' }}
        >
            <Card sx={{
                maxWidth: 400,
                width: '100%',
                boxShadow: 3,
                py: 8,
                px: 4,
            }}>
                <Stack alignItems="center">
                    <CardMedia
                        component="img"
                        image="/img/logo/logo.png"
                        alt="Logo"
                        sx={{
                            width: 100,
                            height: 70,
                            objectFit: 'contain',
                        }}
                    />

                    <Box sx={{ textAlign: 'center' }}>
                        <p
                            className="font-monstera font-bold text-2xl"
                        >
                            Masuk
                        </p>
                        <Typography
                            variant="body2"
                            className="font-poppins"
                            color="text.secondary"
                        >
                            Enter your email and password to sign in
                        </Typography>
                    </Box>

                    <CardContent sx={{ width: '100%' }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1}>
                                <FormControl variant="outlined" fullWidth>
                                    <FormLabel className="font-poppins mb-1">Email</FormLabel>
                                    <OutlinedInput
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </FormControl>

                                <FormControl variant="outlined" fullWidth>
                                    <FormLabel className="font-poppins mb-1">Password</FormLabel>
                                    <OutlinedInput
                                        id="password"
                                        name="password"
                                        type={formData.showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleTogglePassword}
                                                    edge="end"
                                                >
                                                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.rememberMe}
                                                onChange={handleRememberMe}
                                                name="rememberMe"
                                                color="primary"
                                            />
                                        }
                                        label="Remember me"
                                        className="font-poppins"
                                    />
                                </FormControl>

                                <CustomeButton
                                    title="Login"
                                    type="submit"
                                    className="bg-kahf-green hover:bg-kahf-green/90 hover:cursor-pointer"
                                    disabled={loading ? loading : false}
                                />
                            </Stack>
                        </form>
                    </CardContent>
                </Stack>
            </Card>
        </Box>
    );
}

export default LoginAdmin;