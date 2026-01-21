import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../../components';
import { useAuth } from '../../context/AuthContext';
import colors from '../../utils/colors';

const RegisterScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { register, isLoading } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        const result = await register(fullName, email, password);
        if (!result.success) {
            setErrors({ general: result.error });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>
                        Start tracking your job applications today
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {errors.general && (
                        <View style={styles.errorBanner}>
                            <Ionicons name="alert-circle" size={20} color={colors.danger} />
                            <Text style={styles.errorBannerText}>{errors.general}</Text>
                        </View>
                    )}

                    <Input
                        label="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                        leftIcon="person-outline"
                        error={errors.fullName}
                    />

                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon="mail-outline"
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Create a password"
                        secureTextEntry
                        leftIcon="lock-closed-outline"
                        error={errors.password}
                    />

                    <Input
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your password"
                        secureTextEntry
                        leftIcon="lock-closed-outline"
                        error={errors.confirmPassword}
                    />

                    <Button
                        title="Create Account"
                        onPress={handleRegister}
                        loading={isLoading}
                        size="large"
                        style={styles.registerButton}
                    />
                </View>

                {/* Login Link */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    form: {
        flex: 1,
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: `${colors.danger}15`,
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
    },
    errorBannerText: {
        color: colors.danger,
        marginLeft: 8,
        flex: 1,
    },
    registerButton: {
        marginTop: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    loginText: {
        color: colors.textSecondary,
        fontSize: 15,
    },
    loginLink: {
        color: colors.primary,
        fontWeight: '600',
        fontSize: 15,
    },
});

export default RegisterScreen;
