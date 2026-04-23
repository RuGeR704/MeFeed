import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { View, Text, ActivityIndicator } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const ACCENT = '#8B7355';
const MUTED = '#C4B8AD';

export default function App() {
    const [fontsLoaded] = useFonts({ DancingScript_700Bold });
    if (!fontsLoaded) return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#FBF8F4' }}>
            <ActivityIndicator color={ACCENT} />
        </View>
    );

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: ACCENT,
                    tabBarInactiveTintColor: MUTED,
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopColor: '#EDE6DC',
                        borderTopWidth: 1,
                        height: 60,
                        paddingBottom: 8,
                    },
                    tabBarIcon: ({ color, size }) =>
                        route.name === 'Home'
                            ? <Feather name="home" size={22} color={color} />
                            : <Feather name="user" size={22} color={color} />,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}