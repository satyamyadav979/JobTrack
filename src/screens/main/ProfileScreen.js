import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { useApplications } from '../../context/ApplicationContext';
import colors from '../../utils/colors';

const ProfileScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { user, logout } = useAuth();
    const { getStatistics } = useApplications();
    const stats = getStatistics();

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: logout },
        ]);
    };

    const menuItems = [
        { icon: 'person-outline', title: 'Edit Profile', onPress: () => { } },
        { icon: 'notifications-outline', title: 'Notifications', onPress: () => { } },
        { icon: 'shield-checkmark-outline', title: 'Privacy', onPress: () => { } },
        { icon: 'help-circle-outline', title: 'Help & Support', onPress: () => { } },
        { icon: 'information-circle-outline', title: 'About', onPress: () => { } },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={40} color={colors.primary} />
                    </View>
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Ionicons name="camera" size={14} color={colors.textWhite} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.userName}>{user?.fullName || 'User'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{stats.total}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: colors.warning }]}>{stats.interview}</Text>
                    <Text style={styles.statLabel}>Interviews</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={[styles.statValue, { color: colors.success }]}>{stats.offer}</Text>
                    <Text style={styles.statLabel}>Offers</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                <Text style={styles.sectionTitle}>Settings</Text>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                        <View style={styles.menuIconContainer}>
                            <Ionicons name={item.icon} size={22} color={colors.primary} />
                        </View>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.logoutContainer}>
                <Button title="Logout" onPress={handleLogout} variant="danger" size="large" />
            </View>

            <Text style={styles.version}>JobTrack v1.0.0</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { alignItems: 'center', paddingBottom: 30, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, backgroundColor: colors.primary },
    avatarContainer: { position: 'relative', marginBottom: 16 },
    avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)' },
    editAvatarButton: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.secondary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.card },
    userName: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
    userEmail: { fontSize: 14, color: colors.textWhite },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.card, marginHorizontal: 20, marginTop: -20, borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    statCard: { alignItems: 'center' },
    statValue: { fontSize: 28, fontWeight: '700', color: colors.text },
    statLabel: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    menuContainer: { padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 16 },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 10 },
    menuIconContainer: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    menuTitle: { flex: 1, fontSize: 16, fontWeight: '500', color: colors.text },
    logoutContainer: { paddingHorizontal: 20, marginTop: 10 },
    version: { textAlign: 'center', color: colors.textLight, fontSize: 13, marginTop: 24 },
});

export default ProfileScreen;
