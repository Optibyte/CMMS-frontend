// Utility to save the authentication token
export const saveAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
};

// Utility to retrieve the authentication token
export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// Utility to save the user data
export const saveUser = (user: object) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Utility to retrieve the user data
export const getUser = (): object | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Utility to remove the authentication token and user data (for logout)
export const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
};
