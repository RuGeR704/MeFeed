// src/screens/HomeScreen.jsx
import React, { useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView,
    Animated,
} from 'react-native';
import { useThoughts } from '../hooks/useThoughts';
import { TodayInput } from '../components/TodayInput';
import { ThoughtCard } from '../components/ThoughtCard';
import { MemoryCard } from '../components/MemoryCard';
import { Logo } from '../components/Logo';
import { getMemoryLabel } from '../utils/dateHelpers';
import { T } from '../theme';

export function HomeScreen() {
    const { thoughts, loading, addThought, setMood, todayThought } = useThoughts();

    const today = new Date().toISOString().split('T')[0];
    const currentToday = todayThought();
    const pastThoughts = thoughts.filter(t => t.date !== today);

    const renderItem = ({ item, index }) => {
        const isMemory = !!getMemoryLabel(item.date);
        return (
            <AnimatedItem index={index}>
                {isMemory
                    ? <MemoryCard thought={item} onSetMood={setMood} />
                    : <ThoughtCard thought={item} onSetMood={setMood} />
                }
            </AnimatedItem>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <FlatList
                data={pastThoughts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <Logo subtitle="your daily reflection" />

                        {!currentToday ? (
                            <TodayInput onSubmit={addThought} />
                        ) : (
                            <View>
                                <Text style={styles.todayLabel}>Today</Text>
                                <AnimatedItem index={0}>
                                    <ThoughtCard
                                        thought={currentToday}
                                        onSetMood={setMood}
                                        showMoodPicker
                                    />
                                </AnimatedItem>
                            </View>
                        )}

                        {pastThoughts.length > 0 && (
                            <Text style={styles.sectionLabel}>Your past thoughts</Text>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    !currentToday ? (
                        <View style={styles.emptyWrapper}>
                            <Text style={styles.emptyIcon}>☁</Text>
                            <Text style={styles.emptyTitle}>No thoughts yet</Text>
                            <Text style={styles.emptySub}>Write your first one above.</Text>
                        </View>
                    ) : null
                }
                contentContainerStyle={{ paddingBottom: 48 }}
            />
        </SafeAreaView>
    );
}

function AnimatedItem({ children, index }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(14)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 380,
                delay: index * 60,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 380,
                delay: index * 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            {children}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: T.bg,
    },
    todayLabel: {
        fontSize: 10,
        color: T.textMuted,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 18,
        marginBottom: 6,
    },
    sectionLabel: {
        fontSize: 10,
        color: T.textMuted,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 24,
        marginBottom: 6,
    },
    emptyWrapper: {
        alignItems: 'center',
        marginTop: 56,
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 38,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 16,
        color: T.textSoft,
        fontWeight: '600',
        marginBottom: 6,
    },
    emptySub: {
        fontSize: 13,
        color: T.textMuted,
        textAlign: 'center',
        lineHeight: 20,
    },
});