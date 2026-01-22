import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components';
import colors from '../../utils/colors';

const WelcomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
                <View style={styles.brandingContainer}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="briefcase" size={48} color={colors.textWhite} />
                    </View>
                    <Text style={styles.appName}>JobTrack</Text>
                    <Text style={styles.tagline}>Your Personal Job Application Manager</Text>
                </View>

                <View style={styles.featuresContainer}>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="list-outline" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.featureText}>
                            <Text style={styles.featureTitle}>Track Applications</Text>
                            <Text style={styles.featureDescription}>Keep all your applications organized</Text>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="stats-chart-outline" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.featureText}>
                            <Text style={styles.featureTitle}>Monitor Progress</Text>
                            <Text style={styles.featureDescription}>Track status and success rate</Text>
                        </View>
                    </View>

                    <View style={styles.featureItem}>
                        <View style={styles.featureIcon}>
                            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.featureText}>
                            <Text style={styles.featureTitle}>Never Miss Follow-ups</Text>
                            <Text style={styles.featureDescription}>Stay on top of interviews</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.buttonsContainer, { paddingBottom: insets.bottom + 24 }]}>
                    <Button
                        title="Get Started"
                        onPress={() => navigation.navigate('Register')}
                        variant="secondary"
                        size="large"
                        style={styles.getStartedButton}
                    />
                    <Button
                        title="I already have an account"
                        onPress={() => navigation.navigate('Login')}
                        variant="ghost"
                        style={styles.loginButton}
                        textStyle={styles.loginButtonText}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    brandingContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    appName: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.textWhite,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        color: colors.textWhite,
        textAlign: 'center',
    },
    featuresContainer: {
        backgroundColor: colors.card,
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    buttonsContainer: {
        marginTop: 'auto',
    },
    getStartedButton: {
        backgroundColor: colors.secondary,
        marginBottom: 12,
    },
    loginButton: {
        marginBottom: 8,
    },
    loginButtonText: {
        color: colors.textWhite,
    },
});

export default WelcomeScreen;
