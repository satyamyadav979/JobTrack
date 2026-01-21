import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
} from 'react-native';
import colors from '../utils/colors';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const isDisabled = disabled === true;
    const isLoading = loading === true;

    const getButtonStyles = () => {
        const baseStyles = [buttonStyles.base];

        // Size styles
        if (size === 'small') baseStyles.push(buttonStyles.small);
        else if (size === 'large') baseStyles.push(buttonStyles.large);
        else baseStyles.push(buttonStyles.medium);

        // Variant styles
        if (variant === 'primary') baseStyles.push(buttonStyles.primary);
        else if (variant === 'secondary') baseStyles.push(buttonStyles.secondary);
        else if (variant === 'outline') baseStyles.push(buttonStyles.outline);
        else if (variant === 'ghost') baseStyles.push(buttonStyles.ghost);
        else if (variant === 'danger') baseStyles.push(buttonStyles.danger);

        if (isDisabled) baseStyles.push(buttonStyles.disabled);
        if (style) baseStyles.push(style);

        return baseStyles;
    };

    const getTextStyles = () => {
        const baseStyles = [buttonStyles.text];

        if (size === 'small') baseStyles.push(buttonStyles.textSmall);
        else if (size === 'large') baseStyles.push(buttonStyles.textLarge);

        if (variant === 'outline') baseStyles.push(buttonStyles.textOutline);
        else if (variant === 'ghost') baseStyles.push(buttonStyles.textGhost);

        if (isDisabled) baseStyles.push(buttonStyles.textDisabled);
        if (textStyle) baseStyles.push(textStyle);

        return baseStyles;
    };

    return (
        <TouchableOpacity
            style={getButtonStyles()}
            onPress={onPress}
            disabled={isDisabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textWhite}
                    size="small"
                />
            ) : (
                <Text style={getTextStyles()}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const buttonStyles = StyleSheet.create({
    base: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    medium: {
        paddingVertical: 14,
        paddingHorizontal: 24,
    },
    large: {
        paddingVertical: 18,
        paddingHorizontal: 32,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    danger: {
        backgroundColor: colors.danger,
    },
    disabled: {
        backgroundColor: colors.backgroundDark,
        opacity: 0.6,
    },
    text: {
        color: colors.textWhite,
        fontWeight: '600',
        fontSize: 16,
    },
    textSmall: {
        fontSize: 14,
    },
    textLarge: {
        fontSize: 18,
    },
    textOutline: {
        color: colors.primary,
    },
    textGhost: {
        color: colors.primary,
    },
    textDisabled: {
        color: colors.textSecondary,
    },
});

export default Button;
