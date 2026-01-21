import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../../components';
import { useApplications } from '../../context/ApplicationContext';
import colors, { statusColors } from '../../utils/colors';
import { APPLICATION_STATUSES } from '../../utils/constants';

const EditApplicationScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { applicationId } = route.params;
    const { getApplicationById, updateApplication } = useApplications();
    const application = getApplicationById(applicationId);

    const [companyName, setCompanyName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [status, setStatus] = useState('Applied');
    const [jobUrl, setJobUrl] = useState('');
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (application) {
            setCompanyName(application.companyName);
            setJobRole(application.jobRole);
            setApplicationDate(application.applicationDate.split('T')[0]);
            setStatus(application.status);
            setJobUrl(application.jobUrl || '');
            setNotes(application.notes || '');
        }
    }, [application]);

    if (!application) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Ionicons name="alert-circle-outline" size={64} color={colors.textLight} />
                <Text style={styles.notFoundText}>Application not found</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} variant="outline" />
            </View>
        );
    }

    const validateForm = () => {
        const newErrors = {};
        if (!companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!jobRole.trim()) newErrors.jobRole = 'Job role is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const result = await updateApplication(applicationId, {
                companyName: companyName.trim(),
                jobRole: jobRole.trim(),
                applicationDate: new Date(applicationDate).toISOString(),
                status,
                jobUrl: jobUrl.trim(),
                notes: notes.trim(),
            });

            if (result.success) {
                Alert.alert('Success', 'Application updated!', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            } else {
                Alert.alert('Error', result.error || 'Failed to update application.');
            }
        } catch (error) {
            Alert.alert('Error', 'Connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Application</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.formContainer} contentContainerStyle={[styles.formContent, { paddingBottom: insets.bottom + 20 }]} keyboardShouldPersistTaps="handled">
                <Input label="Company Name *" value={companyName} onChangeText={setCompanyName} placeholder="e.g., Google" leftIcon="business-outline" error={errors.companyName} />
                <Input label="Job Role *" value={jobRole} onChangeText={setJobRole} placeholder="e.g., Software Engineer" leftIcon="briefcase-outline" error={errors.jobRole} />
                <Input label="Application Date" value={applicationDate} onChangeText={setApplicationDate} placeholder="YYYY-MM-DD" leftIcon="calendar-outline" />

                <View style={styles.statusContainer}>
                    <Text style={styles.label}>Status</Text>
                    <View style={styles.statusGrid}>
                        {APPLICATION_STATUSES.map((opt) => (
                            <TouchableOpacity key={opt} style={[styles.statusOption, status === opt && { backgroundColor: statusColors[opt], borderColor: statusColors[opt] }]} onPress={() => setStatus(opt)}>
                                <Text style={[styles.statusText, status === opt && styles.statusTextActive]}>{opt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <Input label="Job URL (Optional)" value={jobUrl} onChangeText={setJobUrl} placeholder="https://..." keyboardType="url" autoCapitalize="none" leftIcon="link-outline" />
                <Input label="Notes (Optional)" value={notes} onChangeText={setNotes} placeholder="Add notes..." multiline numberOfLines={4} leftIcon="document-text-outline" />
                <Button title="Save Changes" onPress={handleSubmit} loading={isLoading} size="large" style={styles.submitButton} />
                <Button title="Cancel" onPress={() => navigation.goBack()} variant="outline" style={styles.cancelButton} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    centered: { justifyContent: 'center', alignItems: 'center' },
    notFoundText: { fontSize: 18, color: colors.textSecondary, marginTop: 16 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 16, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
    backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
    placeholder: { width: 40 },
    formContainer: { flex: 1 },
    formContent: { padding: 20 },
    statusContainer: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
    statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    statusOption: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
    statusText: { fontSize: 14, fontWeight: '600', color: colors.textSecondary },
    statusTextActive: { color: colors.textWhite },
    submitButton: { marginTop: 24 },
    cancelButton: { marginTop: 12 },
});

export default EditApplicationScreen;
