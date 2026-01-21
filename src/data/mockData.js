// Mock Applications Data
export const mockApplications = [
    {
        id: '1',
        companyName: 'Google',
        jobRole: 'Software Engineer Intern',
        applicationDate: '2026-01-15T10:00:00.000Z',
        status: 'Interview',
        jobUrl: 'https://careers.google.com',
        notes: 'Applied through referral. Technical phone screen scheduled for next week.',
    },
    {
        id: '2',
        companyName: 'Microsoft',
        jobRole: 'Frontend Developer',
        applicationDate: '2026-01-10T09:30:00.000Z',
        status: 'Applied',
        jobUrl: 'https://careers.microsoft.com',
        notes: 'Applied via LinkedIn. Waiting for response.',
    },
    {
        id: '3',
        companyName: 'Amazon',
        jobRole: 'SDE Intern',
        applicationDate: '2026-01-05T14:00:00.000Z',
        status: 'Offer',
        jobUrl: 'https://amazon.jobs',
        notes: 'Received offer letter! Need to respond by end of month.',
    },
    {
        id: '4',
        companyName: 'Meta',
        jobRole: 'React Native Developer',
        applicationDate: '2026-01-08T11:00:00.000Z',
        status: 'Rejected',
        jobUrl: 'https://metacareers.com',
        notes: 'Did not clear the technical round. Need to practice more DSA.',
    },
    {
        id: '5',
        companyName: 'Netflix',
        jobRole: 'UI Engineer',
        applicationDate: '2026-01-12T16:00:00.000Z',
        status: 'Applied',
        jobUrl: 'https://jobs.netflix.com',
        notes: 'Applied through company website. Strong team culture.',
    },
    {
        id: '6',
        companyName: 'Apple',
        jobRole: 'iOS Developer Intern',
        applicationDate: '2026-01-18T09:00:00.000Z',
        status: 'Interview',
        jobUrl: 'https://apple.com/careers',
        notes: 'HR round cleared. Technical interview on Friday.',
    },
];

// Mock User Data
export const mockUser = {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
};

export default {
    mockApplications,
    mockUser,
};
