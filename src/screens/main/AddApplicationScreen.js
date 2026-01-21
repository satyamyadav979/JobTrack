import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../../components';
import { useApplications } from '../../context/ApplicationContext';
import colors, { statusColors } from '../../utils/colors';
import { APPLICATION_STATUSES } from '../../utils/constants';

const AddApplicationScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { addApplication } = useApplications();

    const [companyName, setCompanyName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [applicationDate, setApplicationDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [status, setStatus] = useState('Applied');
    const [jobUrl, setJobUrl] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!jobRole.trim()) {
            newErrors.jobRole = 'Job role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const newApplication = {
                companyName: companyName.trim(),
                jobRole: jobRole.trim(),
                applicationDate: new Date(applicationDate).toISOString(),
                status,
                jobUrl: jobUrl.trim(),
                notes: notes.trim(),
            };

            addApplication(newApplication);

            Alert.alert(
                'Success',
                'Application added successfully!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to add application. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Application</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.formContainer}
                contentContainerStyle={[
                    styles.formContent,
                    { paddingBottom: insets.bottom + 20 },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Company Name */}
                <Input
                    label="Company Name *"
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholder="e.g., Google"
                    leftIcon="business-outline"
                    error={errors.companyName}
                />

                {/* Job Role */}
                <Input
                    label="Job Role *"
                    value={jobRole}
                    onChangeText={setJobRole}
                    placeholder="e.g., Software Engineer"
                    leftIcon="briefcase-outline"
                    error={errors.jobRole}
                />

                {/* Application Date */}
                <Input
                    label="Application Date"
                    value={applicationDate}
                    onChangeText={setApplicationDate}
                    placeholder="YYYY-MM-DD"
                    leftIcon="calendar-outline"
                />

                {/* Status Selector */}
                <View style={styles.statusContainer}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusGrid}>
                        {APPLICATION_STATUSES.map((statusOption) => (
                            <TouchableOpacity
                                key={statusOption}
                                style={[
                                    styles.statusOption,
                                    status === statusOption && {
                                        backgroundColor: statusColors[statusOption],
                                        borderColor: statusColors[statusOption],
                                    },
                                ]}
                                onPress={() => setStatus(statusOption)}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        status === statusOption && styles.statusTextActive,
                                    ]}
                                >
                                    {statusOption}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Job URL */}
                <Input
                    label="Job URL (Optional)"
                    value={jobUrl}
                    onChangeText={setJobUrl}
                    placeholder="https://..."
                    keyboardType="url"
                    autoCapitalize="none"
                    leftIcon="link-outline"
                />

                {/* Notes */}
                <Input
                    label="Notes (Optional)"
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add any notes about this application..."
                    multiline
                    numberOfLines={4}
                    leftIcon="document-text-outline"
                />

                {/* Submit Button */}
                <Button
                    title="Add Application"
                    onPress={handleSubmit}
                    loading={isLoading}
                    size="large"
                    style={styles.submitButton}
                />

                {/* Cancel Button */}
                <Button
                    title="Cancel"
                    onPress={() => navigation.goBack()}
                    variant="outline"
                    style={styles.cancelButton}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: colors.card,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    placeholder: {
        width: 40,
    },
    formContainer: {
        flex: 1,
    },
    formContent: {
        padding: 20,
    },
    statusContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    statusGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    statusOption: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    statusTextActive: {
        color: colors.textWhite,
    },
    submitButton: {
        marginTop: 24,
    },
    cancelButton: {
        marginTop: 12,
    },
});

export default AddApplicationScreen;
