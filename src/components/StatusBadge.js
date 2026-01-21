import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors, { statusColors } from '../utils/colors';

const StatusBadge = ({ status, size = 'medium' }) => {
    const backgroundColor = statusColors[status] || colors.info;

    return (
        <View
            style={[
                styles.badge,
                { backgroundColor: `${backgroundColor}20` },
                size === 'small' && styles.badgeSmall,
                size === 'large' && styles.badgeLarge,
            ]}
        >
            <View style={[styles.dot, { backgroundColor }]} />
            <Text
                style={[
                    styles.text,
                    { color: backgroundColor },
                    size === 'small' && styles.textSmall,
                    size === 'large' && styles.textLarge,
                ]}
            >
                {status}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeSmall: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    badgeLarge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
    },
    textSmall: {
        fontSize: 12,
    },
    textLarge: {
        fontSize: 16,
    },
});

export default StatusBadge;
