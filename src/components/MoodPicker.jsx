// src/components/MoodPicker.jsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MOODS } from '../theme';

export function MoodPicker({ selectedMood, onSelect }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>How was your day?</Text>
            <View style={styles.row}>
                {MOODS.map(mood => (
                    <MoodButton
                        key={mood.key}
                        mood={mood}
                        active={selectedMood === mood.key}
                        onPress={() => onSelect(mood.key)}
                    />
                ))}
            </View>
        </View>
    );
}

function MoodButton({ mood, active, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.spring(scale, { toValue: 1.18, useNativeDriver: true, speed: 50 }),
            Animated.spring(scale, { toValue: 1,    useNativeDriver: true, speed: 30 }),
        ]).start();
        onPress();
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1} style={styles.btnWrapper}>
            <Animated.View
                style={[
                    styles.btn,
                    active && { backgroundColor: mood.bg, borderColor: mood.border },
                    { transform: [{ scale }] },
                ]}
            >
                <Text style={styles.icon}>{mood.icon}</Text>
                <Text style={[styles.moodLabel, active && { color: mood.text, fontWeight: '700' }]}>
                    {mood.label}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: '#EDE6DC',
    },
    label: {
        fontSize: 10,
        color: '#B8AFA6',
        letterSpacing: 1.8,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
    },
    btnWrapper: {
        flex: 1,
    },
    btn: {
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#EDE6DC',
        backgroundColor: '#FAFAF8',
        gap: 4,
    },
    icon: {
        fontSize: 22,
    },
    moodLabel: {
        fontSize: 11,
        color: '#B8AFA6',
        fontWeight: '500',
        letterSpacing: 0.2,
    },
});