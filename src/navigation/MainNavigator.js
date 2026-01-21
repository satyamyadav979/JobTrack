import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import {
    DashboardScreen,
    ApplicationsScreen,
    AddApplicationScreen,
    ApplicationDetailsScreen,
    EditApplicationScreen,
    ProfileScreen,
} from '../screens/main';
import colors from '../utils/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Applications Stack Navigator
const ApplicationsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ApplicationsList" component={ApplicationsScreen} />
            <Stack.Screen name="ApplicationDetails" component={ApplicationDetailsScreen} />
            <Stack.Screen name="EditApplication" component={EditApplicationScreen} />
            <Stack.Screen name="AddApplication" component={AddApplicationScreen} />
        </Stack.Navigator>
    );
};

// Dashboard Stack Navigator  
const DashboardStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DashboardMain" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Applications') {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    } else if (route.name === 'Add') {
                        iconName = 'add';
                    } else if (route.name === 'ProfileTab') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardStack}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Applications"
                component={ApplicationsStack}
                options={{ tabBarLabel: 'Applications' }}
            />
            <Tab.Screen
                name="Add"
                component={AddApplicationScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.addButton}>
                            <Ionicons name="add" size={28} color={colors.textWhite} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    addButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
});

export default MainNavigator;
