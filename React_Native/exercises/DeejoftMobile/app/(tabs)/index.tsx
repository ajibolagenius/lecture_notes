import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="flex-1"
                contentContainerClassName="px-6 py-8 items-center gap-6"
                showsVerticalScrollIndicator={false}
            >
                {/* Image - requires explicit width and height */}

                <Image
                    source={{ uri: 'https://placehold.co/400x400.png' }}
                    className="w-24 h-24 rounded-full border-4 border-brand"
                />

                {/* Text — ALL strings must be inside Text */}

                <View className="items-center gap-1">
                    <Text className="text-2xl font-bold text-dark">Odun Coder</Text>
                    <Text className="text-base text-muted">Full-Stack Developer</Text>
                </View>

                {/* Stats row */}
                <View className="flex-row gap-8">
                    {[
                        { label: 'Projects', value: '12' },
                        { label: 'Courses', value: '4' },
                        { label: 'Streak', value: '21d' },
                    ].map(stat => (
                        <View key={stat.label} className="items-center gap-1">
                            <Text className="text-2xl font-bold text-dark">{stat.value}</Text>
                            <Text className="text-sm text-muted">{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Pressable — the modern tap target */}
                <Pressable
                    className="w-full bg-brand rounded-2xl py-4 items-center active:opacity-80"
                    onPress={() => console.log('Edit profile')}
                >
                    <Text className="text-white font-bold text-base">Edit Profile</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}
