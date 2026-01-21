import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';

// Store data
export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (error) {
        console.error('Error storing data:', error);
        return false;
    }
};

// Get data
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
};

// Remove data
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing data:', error);
        return false;
    }
};

// Clear all data
export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
};

// User specific functions
export const saveUser = (user) => storeData(STORAGE_KEYS.USER, user);
export const getUser = () => getData(STORAGE_KEYS.USER);
export const removeUser = () => removeData(STORAGE_KEYS.USER);

// Applications specific functions
export const saveApplications = (apps) => storeData(STORAGE_KEYS.APPLICATIONS, apps);
export const getApplications = () => getData(STORAGE_KEYS.APPLICATIONS);

export default {
    storeData,
    getData,
    removeData,
    clearAllData,
    saveUser,
    getUser,
    removeUser,
    saveApplications,
    getApplications,
};
