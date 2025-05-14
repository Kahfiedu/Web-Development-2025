import Cookies from 'js-cookie';

const SECURE_OPTIONS = {
    secure: true,
    sameSite: 'strict',
    expires: 1 // 1 day
};

// Simple encryption key (store this in .env)
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-secret-key';

const cookieService = {
    // Encrypt value
    _encrypt(value) {
        if (!value) return '';
        try {
            const encoded = btoa(encodeURIComponent(value));
            return encoded.split('').reverse().join('');
        } catch (error) {
            console.error('Encryption error:', error);
            return '';
        }
    },

    // Decrypt value
    _decrypt(value) {
        if (!value) return '';
        try {
            const reversed = value.split('').reverse().join('');
            return decodeURIComponent(atob(reversed));
        } catch (error) {
            console.error('Decryption error:', error);
            return '';
        }
    },

    setAuthCookies(token, role) {
        const encryptedToken = this._encrypt(token);
        const encryptedRole = this._encrypt(role);

        Cookies.set('authToken', encryptedToken, SECURE_OPTIONS);
        Cookies.set('userRole', encryptedRole, SECURE_OPTIONS);
    },

    clearAuthCookies() {
        Cookies.remove('authToken');
        Cookies.remove('userRole');
    },

    getAuthToken() {
        const encryptedToken = Cookies.get('authToken');
        return this._decrypt(encryptedToken);
    },

    getUserRole() {
        const encryptedRole = Cookies.get('userRole');
        return this._decrypt(encryptedRole);
    }
};

export { cookieService };