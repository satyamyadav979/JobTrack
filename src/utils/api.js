// For physical device testing, change 'localhost' to your machine's local IP (e.g., '192.168.1.5')
// Updated to use local IP address for device/emulator connectivity
const BASE_URL = 'http://10.51.6.188:3000/api';

export const API_URLS = {
    AUTH: {
        REGISTER: `${BASE_URL}/auth/register`,
        LOGIN: `${BASE_URL}/auth/login`,
    },
    APPLICATIONS: {
        BASE: `${BASE_URL}/applications`,
        STATS: `${BASE_URL}/applications/stats`,
    },
};

export default BASE_URL;
