import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationCard } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import colors, { statusColors } from '../../utils/colors';

const DashboardScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    const { getStatistics, getRecentApplications, isLoading } = useApplications();

    const stats = getStatistics();
    const recentApplications = getRecentApplications(5);

    const statCards = [
        { label: 'Total', value: stats.total, color: colors.primary, icon: 'documents-outline' },
        { label: 'Applied', value: stats.applied, color: statusColors.Applied, icon: 'send-outline' },
        { label: 'Interview', value: stats.interview, color: statusColors.Interview, icon: 'calendar-outline' },
        { label: 'Offers', value: stats.offer, color: statusColors.Offer, icon: 'checkmark-circle-outline' },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isLoading} colors={[colors.primary]} />}
        >
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <View style={styles.headerContent}>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>{getGreeting()},</Text>
                        <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                        <Ionicons name="person-outline" size={22} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Your Application Journey</Text>
                    <Text style={styles.summarySubtitle}>
                        {stats.total} applications tracked • {stats.interview} interviews
                    </Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>Overview</Text>
                <View style={styles.statsGrid}>
                    {statCards.map((stat, index) => (
                        <TouchableOpacity key={index} style={styles.statCard} activeOpacity={0.7}>
                            <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
                                <Ionicons name={stat.icon} size={24} color={stat.color} />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.quickActionsContainer}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsRow}>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Applications', { screen: 'AddApplication' })}>
                        <View style={[styles.quickActionIcon, { backgroundColor: colors.primary }]}>
                            <Ionicons name="add" size={24} color={colors.textWhite} />
                        </View>
                        <Text style={styles.quickActionText}>Add New</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Applications')}>
                        <View style={[styles.quickActionIcon, { backgroundColor: `${colors.info}20` }]}>
                            <Ionicons name="list" size={24} color={colors.info} />
                        </View>
                        <Text style={styles.quickActionText}>View All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Applications', { filter: 'Interview' })}>
                        <View style={[styles.quickActionIcon, { backgroundColor: `${colors.warning}20` }]}>
                            <Ionicons name="calendar" size={24} color={colors.warning} />
                        </View>
                        <Text style={styles.quickActionText}>Interviews</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.recentContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Applications</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Applications')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                {recentApplications.length > 0 ? (
                    recentApplications.map((app) => (
                        <ApplicationCard
                            key={app._id || app.id}
                            application={app}
                            onPress={() => navigation.navigate('Applications', { screen: 'ApplicationDetails', params: { applicationId: app._id || app.id } })}
                        />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={48} color={colors.textLight} />
                        <Text style={styles.emptyStateText}>No applications yet</Text>
                        <Text style={styles.emptyStateSubtext}>Start tracking your job applications</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scrollContent: { flexGrow: 1 },
    header: { paddingHorizontal: 20, paddingBottom: 60, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, backgroundColor: colors.primary },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    greetingContainer: { flex: 1 },
    greeting: { fontSize: 16, color: colors.textWhite },
    userName: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginTop: 4 },
    profileButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center' },
    summaryCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 16, padding: 16 },
    summaryTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 4 },
    summarySubtitle: { fontSize: 14, color: colors.textWhite },
    statsContainer: { marginTop: -40, paddingHorizontal: 20, marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 16 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    statCard: { width: '48%', backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    statIconContainer: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    statValue: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 4 },
    statLabel: { fontSize: 14, color: colors.textSecondary },
    quickActionsContainer: { paddingHorizontal: 20, marginBottom: 24 },
    quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    quickActionButton: { alignItems: 'center', flex: 1 },
    quickActionIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    quickActionText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
    recentContainer: { paddingHorizontal: 20 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    seeAllText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
    emptyState: { alignItems: 'center', paddingVertical: 40, backgroundColor: colors.card, borderRadius: 16 },
    emptyStateText: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: 16 },
    emptyStateSubtext: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
});

export default DashboardScreen;
