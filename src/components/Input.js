import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    multiline,
    numberOfLines,
    leftIcon,
    rightIcon,
    onRightIconPress,
    editable,
    style,
    inputStyle,
}) => {
    const isSecureEntry = secureTextEntry === true;
    const isMultiline = multiline === true;
    const isEditable = editable !== false;
    const lines = typeof numberOfLines === 'number' ? numberOfLines : 1;

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <View
                style={[
                    styles.inputContainer,
                    isFocused ? styles.inputFocused : null,
                    error ? styles.inputError : null,
                    !isEditable ? styles.inputDisabled : null,
                    isMultiline ? styles.inputMultiline : null,
                ]}
            >
                {leftIcon ? (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={isFocused ? colors.primary : colors.textSecondary}
                        style={styles.leftIcon}
                    />
                ) : null}

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    secureTextEntry={isSecureEntry && !showPassword}
                    keyboardType={keyboardType || 'default'}
                    autoCapitalize={autoCapitalize || 'sentences'}
                    multiline={isMultiline}
                    numberOfLines={lines}
                    editable={isEditable}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={[
                        styles.input,
                        leftIcon ? styles.inputWithLeftIcon : null,
                        (rightIcon || isSecureEntry) ? styles.inputWithRightIcon : null,
                        isMultiline ? styles.inputTextMultiline : null,
                        inputStyle,
                    ]}
                />

                {isSecureEntry ? (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
                        <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                ) : null}

                {rightIcon && !isSecureEntry ? (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
                        <Ionicons name={rightIcon} size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16 },
    inputFocused: { borderColor: colors.primary, borderWidth: 2 },
    inputError: { borderColor: colors.danger },
    inputDisabled: { backgroundColor: colors.backgroundDark },
    inputMultiline: { alignItems: 'flex-start', paddingVertical: 12 },
    input: { flex: 1, fontSize: 16, color: colors.text, paddingVertical: 14 },
    inputWithLeftIcon: { paddingLeft: 8 },
    inputWithRightIcon: { paddingRight: 8 },
    inputTextMultiline: { textAlignVertical: 'top', minHeight: 100 },
    leftIcon: { marginRight: 4 },
    rightIcon: { padding: 4 },
    errorText: { fontSize: 12, color: colors.danger, marginTop: 4, marginLeft: 4 },
});

export default Input;
