import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URLS } from '../utils/api';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error('useApplications must be used within an ApplicationProvider');
    }
    return context;
};

export const ApplicationProvider = ({ children }) => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [stats, setStats] = useState({
        total: 0,
        Applied: 0,
        Interview: 0,
        Offer: 0,
        Rejected: 0,
    });

    // Load applications whenever user changes (login/logout)
    useEffect(() => {
        if (user && user.token) {
            loadApplications();
            loadStats();
        } else {
            setApplications([]);
            setIsLoading(false);
        }
    }, [user]);

    const loadApplications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_URLS.APPLICATIONS.BASE, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setApplications(data.data);
            }
        } catch (error) {
            console.error('Error loading applications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await fetch(API_URLS.APPLICATIONS.STATS, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const addApplication = async (application) => {
        try {
            const response = await fetch(API_URLS.APPLICATIONS.BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(application),
            });
            const data = await response.json();
            if (data.success) {
                setApplications(prev => [data.data, ...prev]);
                loadStats();
                return { success: true, data: data.data };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    };

    const updateApplication = async (id, updates) => {
        try {
            const response = await fetch(`${API_URLS.APPLICATIONS.BASE}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(updates),
            });
            const data = await response.json();
            if (data.success) {
                setApplications(prev =>
                    prev.map(app => (app._id === id ? data.data : app))
                );
                loadStats();
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    };

    const deleteApplication = async (id) => {
        try {
            const response = await fetch(`${API_URLS.APPLICATIONS.BASE}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setApplications(prev => prev.filter(app => app._id !== id));
                loadStats();
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Connection error' };
        }
    };

    const getApplicationById = (id) => {
        return applications.find(app => (app._id === id || app.id === id));
    };

    const getFilteredApplications = () => {
        let filtered = [...applications];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                app =>
                    app.companyName.toLowerCase().includes(query) ||
                    app.jobRole.toLowerCase().includes(query)
            );
        }
        if (statusFilter !== 'All') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }
        return filtered;
    };

    const getStatistics = () => {
        return {
            total: stats.total || 0,
            applied: stats.Applied || 0,
            interview: stats.Interview || 0,
            offer: stats.Offer || 0,
            rejected: stats.Rejected || 0,
        };
    };

    const getRecentApplications = (count = 5) => {
        return [...applications]
            .sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate))
            .slice(0, count);
    };

    const value = {
        applications,
        isLoading,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        addApplication,
        updateApplication,
        deleteApplication,
        getApplicationById,
        getFilteredApplications,
        getStatistics,
        getRecentApplications,
        loadApplications,
    };

    return (
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationContext;
