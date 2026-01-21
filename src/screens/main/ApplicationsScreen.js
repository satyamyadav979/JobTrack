import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ApplicationCard } from '../../components';
import { useApplications } from '../../context/ApplicationContext';
import colors, { statusColors } from '../../utils/colors';
import { APPLICATION_STATUSES } from '../../utils/constants';

const ApplicationsScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const {
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        getFilteredApplications,
        deleteApplication,
    } = useApplications();

    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Handle filter from navigation params
    useEffect(() => {
        if (route.params?.filter) {
            setStatusFilter(route.params.filter);
        }
    }, [route.params?.filter]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearch]);

    const filteredApplications = getFilteredApplications();
    const filterTabs = ['All', ...APPLICATION_STATUSES];

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Application',
            'Are you sure you want to delete this application?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteApplication(id),
                },
            ]
        );
    };

    const renderApplicationItem = ({ item }) => (
        <ApplicationCard
            application={item}
            onPress={() =>
                navigation.navigate('ApplicationDetails', { applicationId: item._id || item.id })
            }
        />
    );

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.textLight} />
            <Text style={styles.emptyTitle}>No applications found</Text>
            <Text style={styles.emptySubtitle}>
                {statusFilter !== 'All'
                    ? `No ${statusFilter.toLowerCase()} applications`
                    : 'Try adjusting your search or add a new application'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <Text style={styles.title}>Applications</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddApplication')}
                >
                    <Ionicons name="add" size={24} color={colors.textWhite} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search company or role..."
                        placeholderTextColor={colors.textLight}
                        value={localSearch}
                        onChangeText={setLocalSearch}
                    />
                    {localSearch.length > 0 && (
                        <TouchableOpacity onPress={() => setLocalSearch('')}>
                            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filterTabs}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.filterList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.filterTab,
                                statusFilter === item && styles.filterTabActive,
                                item !== 'All' && { borderColor: statusColors[item] },
                                statusFilter === item && item !== 'All' && { backgroundColor: statusColors[item] },
                            ]}
                            onPress={() => setStatusFilter(item)}
                        >
                            <Text
                                style={[
                                    styles.filterTabText,
                                    statusFilter === item && styles.filterTabTextActive,
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Applications List */}
            <FlatList
                data={filteredApplications}
                keyExtractor={(item) => item._id || item.id}
                renderItem={renderApplicationItem}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: insets.bottom + 20 },
                ]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyList}
            />

            {/* Floating Action Button */}
            <TouchableOpacity
                style={[styles.fab, { bottom: insets.bottom + 20 }]}
                onPress={() => navigation.navigate('AddApplication')}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={28} color={colors.textWhite} />
            </TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: colors.card,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.text,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: colors.card,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
        marginLeft: 10,
    },
    filterContainer: {
        backgroundColor: colors.card,
        paddingBottom: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    filterList: {
        paddingHorizontal: 20,
    },
    filterTab: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.background,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    filterTabActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    filterTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    filterTabTextActive: {
        color: colors.textWhite,
    },
    listContent: {
        padding: 20,
        paddingTop: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.text,
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});

export default ApplicationsScreen;
