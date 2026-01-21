import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, StatusBadge } from '../../components';
import { useApplications } from '../../context/ApplicationContext';
import colors, { statusColors } from '../../utils/colors';

const ApplicationDetailsScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { applicationId } = route.params;
    const { getApplicationById, deleteApplication } = useApplications();

    const application = getApplicationById(applicationId);

    if (!application) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Ionicons name="alert-circle-outline" size={64} color={colors.textLight} />
                <Text style={styles.notFoundText}>Application not found</Text>
                <Button
                    title="Go Back"
                    onPress={() => navigation.goBack()}
                    variant="outline"
                    style={{ marginTop: 20 }}
                />
            </View>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleOpenUrl = async () => {
        if (application.jobUrl) {
            const supported = await Linking.canOpenURL(application.jobUrl);
            if (supported) {
                await Linking.openURL(application.jobUrl);
            } else {
                Alert.alert('Error', 'Cannot open this URL');
            }
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Application',
            'Are you sure you want to delete this application? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deleteApplication(applicationId);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    const statusColor = statusColors[application.status];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top + 16, backgroundColor: `${statusColor}15` },
                ]}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>

                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                            navigation.navigate('EditApplication', { applicationId })
                        }
                    >
                        <Ionicons name="pencil" size={20} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Ionicons name="trash-outline" size={20} color={colors.danger} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 20 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Company Info Card */}
                <View style={styles.companyCard}>
                    <View style={styles.companyIcon}>
                        <Ionicons name="business" size={32} color={colors.primary} />
                    </View>
                    <Text style={styles.companyName}>{application.companyName}</Text>
                    <Text style={styles.jobRole}>{application.jobRole}</Text>
                    <StatusBadge status={application.status} size="large" />
                </View>

                {/* Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>

                    <View style={styles.detailCard}>
                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Application Date</Text>
                                <Text style={styles.detailValue}>
                                    {formatDate(application.applicationDate)}
                                </Text>
                            </View>
                        </View>

                        {application.jobUrl && (
                            <TouchableOpacity style={styles.detailRow} onPress={handleOpenUrl}>
                                <View style={styles.detailIcon}>
                                    <Ionicons name="link-outline" size={20} color={colors.primary} />
                                </View>
                                <View style={styles.detailContent}>
                                    <Text style={styles.detailLabel}>Job URL</Text>
                                    <Text style={[styles.detailValue, styles.linkText]} numberOfLines={1}>
                                        {application.jobUrl}
                                    </Text>
                                </View>
                                <Ionicons name="open-outline" size={18} color={colors.primary} />
                            </TouchableOpacity>
                        )}

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Ionicons name="pulse-outline" size={20} color={statusColor} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Current Status</Text>
                                <Text style={[styles.detailValue, { color: statusColor }]}>
                                    {application.status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Notes Section */}
                {application.notes && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <View style={styles.notesCard}>
                            <Text style={styles.notesText}>{application.notes}</Text>
                        </View>
                    </View>
                )}

                {/* Status Timeline */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status Timeline</Text>
                    <View style={styles.timelineCard}>
                        {['Applied', 'Interview', 'Offer'].map((step, index) => {
                            const isActive =
                                application.status === step ||
                                (application.status === 'Rejected' && step === 'Applied') ||
                                (application.status === 'Interview' && step === 'Applied') ||
                                (application.status === 'Offer' && (step === 'Applied' || step === 'Interview'));

                            return (
                                <View key={step} style={styles.timelineItem}>
                                    <View
                                        style={[
                                            styles.timelineDot,
                                            isActive && { backgroundColor: statusColors[step] },
                                        ]}
                                    >
                                        {isActive && (
                                            <Ionicons name="checkmark" size={12} color={colors.textWhite} />
                                        )}
                                    </View>
                                    {index < 2 && (
                                        <View
                                            style={[
                                                styles.timelineLine,
                                                isActive && { backgroundColor: statusColors[step] },
                                            ]}
                                        />
                                    )}
                                    <Text
                                        style={[
                                            styles.timelineLabel,
                                            isActive && { color: colors.text, fontWeight: '600' },
                                        ]}
                                    >
                                        {step}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Edit Application"
                        onPress={() =>
                            navigation.navigate('EditApplication', { applicationId: application._id || application.id })
                        }
                        style={styles.editButton}
                    />
                    <Button
                        title="Delete"
                        onPress={handleDelete}
                        variant="outline"
                        style={styles.deleteButtonFull}
                        textStyle={{ color: colors.danger }}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: colors.textSecondary,
        marginTop: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: `${colors.danger}10`,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    companyCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    companyIcon: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: `${colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    companyName: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 4,
        textAlign: 'center',
    },
    jobRole: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 16,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 12,
    },
    detailCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    detailIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: `${colors.primary}10`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 15,
        color: colors.text,
        fontWeight: '500',
    },
    linkText: {
        color: colors.primary,
    },
    notesCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
    },
    notesText: {
        fontSize: 15,
        color: colors.text,
        lineHeight: 22,
    },
    timelineCard: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timelineItem: {
        alignItems: 'center',
        flex: 1,
    },
    timelineDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    timelineLine: {
        position: 'absolute',
        top: 12,
        left: '60%',
        right: '-40%',
        height: 2,
        backgroundColor: colors.border,
        zIndex: -1,
    },
    timelineLabel: {
        fontSize: 12,
        color: colors.textLight,
    },
    buttonContainer: {
        marginTop: 8,
    },
    editButton: {
        marginBottom: 12,
    },
    deleteButtonFull: {
        borderColor: colors.danger,
    },
});

export default ApplicationDetailsScreen;
