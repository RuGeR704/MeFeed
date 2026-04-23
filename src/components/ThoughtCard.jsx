// src/components/ThoughtCard.jsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { formatDate } from '../utils/dateHelpers';
import { getMood, T } from '../theme';
import { MoodPicker } from './MoodPicker';

export function ThoughtCard({ thought, onSetMood, showMoodPicker = false }) {
    const mood = getMood(thought.mood);

    return (
        <View style={[
            styles.card,
            mood && { backgroundColor: mood.bg, borderColor: mood.border },
        ]}>
            <View style={styles.header}>
                <Text style={styles.date}>{formatDate(thought.date)}</Text>
                {mood && <MoodBadge mood={mood} />}
            </View>

            <Text style={styles.text}>{thought.text}</Text>

            {onSetMood && (
                <MoodPicker
                    selectedMood={thought.mood}
                    onSelect={(key) => onSetMood(thought.id, key)}
                />
            )}
        </View>
    );
}

function MoodBadge({ mood }) {
    const scale = useRef(new Animated.Value(0.7)).current;

    React.useEffect(() => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20 }).start();
    }, [mood]);

    return (
        <Animated.View style={[
            styles.badge,
            { backgroundColor: mood.bg, borderColor: mood.border, transform: [{ scale }] }
        ]}>
            <Text style={styles.badgeIcon}>{mood.icon}</Text>
            <Text style={[styles.badgeLabel, { color: mood.text }]}>{mood.label}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: T.card,
        borderRadius: 20,
        padding: 18,
        marginHorizontal: 16,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: T.cardBorder,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    date: {
        fontSize: 11,
        color: T.textMuted,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    text: {
        fontSize: 15,
        color: T.text,
        lineHeight: 24,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },
    badgeIcon: { fontSize: 13 },
    badgeLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.2 },
});