import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TABS = [
    { name: 'index', title: 'Home', icon: 'home-outline' },
    { name: 'explore', title: 'Explore', icon: 'compass-outline' },
    { name: 'profile', title: 'Profile', icon: 'person-outline' },
]

export default function TabsLayout() {
    const insets = useSafeAreaInsets()

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    const tab = TABS.find(t => t.name === route.name)
                    if (!tab) return null

                    const iconName = focused
                        ? tab.icon.replace('-outline', '')
                        : tab.icon
                    return <Ionicons name={iconName as any} size={size} color={color} />
                },
                tabBarActiveTintColor: '#4e24e6ff',
                tabBarInactiveTintColor: '#888899',
                tabBarStyle: {
                    height: 56 + insets.bottom,
                    paddingBottom: insets.bottom,
                    backgroundColor: 'white',
                    borderTopColor: '#ff5f0eff',
                },
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            })}
        >
            {TABS.map(tab => (
                <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title }} />
            ))}
        </Tabs>
    )
}
