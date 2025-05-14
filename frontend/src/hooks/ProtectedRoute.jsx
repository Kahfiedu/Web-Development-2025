import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/Ui/LoadingSpinner';
import { useAuth } from './useAuth';
import { cookieService } from '../services/cookieService';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const storedToken = cookieService.getAuthToken;
        const storedRole = cookieService.getUserRole;

        if (!storedToken || !storedRole) {
            setLoading(false);
            return;
        }

        // Pastikan route sesuai role
        if (storedRole === 'admin' && !location.pathname.startsWith('/admin')) {
            window.location.replace('/admin/dashboard');
        } else if (storedRole === 'customer' && location.pathname.startsWith('/admin')) {
            window.location.replace('/dashboard');
        }

        setLoading(false);
    }, [location.pathname]);

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;