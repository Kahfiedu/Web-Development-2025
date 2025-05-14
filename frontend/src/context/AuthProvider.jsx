import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import { cookieService } from "../services/cookieService";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = cookieService.getAuthToken();
        const storedRole = cookieService.getUserRole();

        if (storedToken && storedRole) {
            setToken(storedToken);
            setRole(storedRole);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false);
    }, []);

    const login = (authToken, roleUser) => {
        setToken(authToken);
        setRole(roleUser);
        setIsAuthenticated(true);
        cookieService.setAuthCookies(authToken, roleUser);
    };

    const logout = () => {
        setToken('');
        setRole('');
        setIsAuthenticated(false);
        cookieService.clearAuthCookies();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                role,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;