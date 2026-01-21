import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../utils/colors';

const Header = ({
    title,
    subtitle,
    showBack = false,
    onBackPress,
    rightAction,
    rightActionIcon,
    onRightActionPress,
    transparent = false,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                { paddingTop: insets.top + 10 },
                transparent && styles.transparent,
            ]}
        >
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBackPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={transparent ? colors.textWhite : colors.text}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.titleContainer}>
                <Text
                    style={[
                        styles.title,
                        transparent && styles.titleTransparent,
                    ]}
                    numberOfLines={1}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        style={[
                            styles.subtitle,
                            transparent && styles.subtitleTransparent,
                        ]}
                        numberOfLines={1}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            <View style={styles.rightContainer}>
                {rightAction && (
                    <TouchableOpacity
                        style={styles.rightButton}
                        onPress={onRightActionPress}
                        activeOpacity={0.7}
                    >
                        {rightActionIcon ? (
                            <Ionicons
                                name={rightActionIcon}
                                size={24}
                                color={transparent ? colors.textWhite : colors.text}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.rightActionText,
                                    transparent && styles.rightActionTextTransparent,
                                ]}
                            >
                                {rightAction}
                            </Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    transparent: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    },
    leftContainer: {
        width: 60,
        alignItems: 'flex-start',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    titleTransparent: {
        color: colors.textWhite,
    },
    subtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    subtitleTransparent: {
        color: colors.textWhite,
        opacity: 0.8,
    },
    rightContainer: {
        width: 60,
        alignItems: 'flex-end',
    },
    rightButton: {
        padding: 8,
        marginRight: -8,
    },
    rightActionText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    rightActionTextTransparent: {
        color: colors.textWhite,
    },
});

export default Header;
