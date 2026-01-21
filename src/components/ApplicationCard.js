import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';
import StatusBadge from './StatusBadge';

const ApplicationCard = ({ application, onPress }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <View style={styles.companyInfo}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="business-outline" size={24} color={colors.primary} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.companyName} numberOfLines={1}>
                            {application.companyName}
                        </Text>
                        <Text style={styles.jobRole} numberOfLines={1}>
                            {application.jobRole}
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
            </View>

            <View style={styles.footer}>
                <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
                    <Text style={styles.dateText}>
                        {formatDate(application.applicationDate)}
                    </Text>
                </View>
                <StatusBadge status={application.status} size="small" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: `${colors.primary}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 2,
    },
    jobRole: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginLeft: 4,
    },
});

export default ApplicationCard;
