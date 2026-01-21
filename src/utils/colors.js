// JobTrack Color Theme
export const colors = {
  // Primary Colors
  primary: '#4F46E5',      // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  
  // Secondary Colors
  secondary: '#7C3AED',    // Purple
  secondaryLight: '#A78BFA',
  
  // Status Colors
  success: '#10B981',      // Green - Offer
  warning: '#F59E0B',      // Orange - Interview
  danger: '#EF4444',       // Red - Rejected
  info: '#3B82F6',         // Blue - Applied
  
  // Background Colors
  background: '#F3F4F6',
  backgroundDark: '#E5E7EB',
  card: '#FFFFFF',
  
  // Text Colors
  text: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Gradient Colors
  gradientStart: '#4F46E5',
  gradientEnd: '#7C3AED',
};

// Status Colors Mapping
export const statusColors = {
  Applied: colors.info,
  Interview: colors.warning,
  Offer: colors.success,
  Rejected: colors.danger,
};

export default colors;
