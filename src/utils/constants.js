// Application Status Options
export const APPLICATION_STATUSES = [
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
];

// Default Application Object
export const DEFAULT_APPLICATION = {
    id: '',
    companyName: '',
    jobRole: '',
    applicationDate: new Date().toISOString(),
    status: 'Applied',
    jobUrl: '',
    notes: '',
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    passwordLength: 'Password must be at least 6 characters',
    passwordMatch: 'Passwords do not match',
};

// Storage Keys
export const STORAGE_KEYS = {
    USER: '@jobtrack_user',
    APPLICATIONS: '@jobtrack_applications',
    AUTH_TOKEN: '@jobtrack_auth_token',
};

export default {
    APPLICATION_STATUSES,
    DEFAULT_APPLICATION,
    VALIDATION_MESSAGES,
    STORAGE_KEYS,
};
