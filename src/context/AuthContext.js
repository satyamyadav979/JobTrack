import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, getUser, removeUser } from '../utils/storage';
import { API_URLS } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing user on app load
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const storedUser = await getUser();
            if (storedUser && storedUser.token) {
                setUser(storedUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URLS.AUTH.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                const userData = {
                    ...data.user,
                    token: data.token,
                };
                await saveUser(userData);

                // Use a promise to ensure state updates complete before returning
                await new Promise((resolve) => {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    // Small delay to ensure React processes the state updates
                    setTimeout(resolve, 50);
                });

                return { success: true };
            } else {
                setIsLoading(false);
                return { success: false, error: data.error || 'Login failed' };
            }
        } catch (error) {
            setIsLoading(false);
            return { success: false, error: 'Connection error - Is the backend running?' };
        }
    };

    const register = async (fullName, email, password) => {
        try {
            console.log('Registering user:', email);
            setIsLoading(true);
            const response = await fetch(API_URLS.AUTH.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });

            const data = await response.json();
            console.log('Registration API response:', data);

            if (data.success) {
                const userData = {
                    ...data.user,
                    token: data.token,
                };
                console.log('Saving user data:', userData);
                await saveUser(userData);

                // Use a promise to ensure state updates complete before returning
                await new Promise((resolve) => {
                    setUser(userData);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    console.log('Registration successful, isAuthenticated set to true');
                    // Small delay to ensure React processes the state updates
                    setTimeout(resolve, 50);
                });

                return { success: true };
            } else {
                console.log('Registration failed:', data.error);
                setIsLoading(false);
                return { success: false, error: data.error || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration connection error:', error);
            setIsLoading(false);
            return { success: false, error: 'Connection error - Is the backend running?' };
        }
    };

    const logout = async () => {
        try {
            await removeUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
