import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getMemoryLabel } from '../utils/dateHelpers';
import { ThoughtCard } from './ThoughtCard';
import { T } from '../theme';

export function MemoryCard({ thought, onLike }) {
    const label = getMemoryLabel(thought.date);
    const pulse = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 1.15, duration: 900, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    if (!label) return null;

    return (
        <View style={styles.wrapper}>
            <View style={styles.banner}>
                <Animated.View style={[styles.dot, { transform: [{ scale: pulse }] }]} />
                <Text style={styles.bannerText}>{label}</Text>
            </View>
            <ThoughtCard thought={{ ...thought, _memory: true }} onLike={onLike} memoryStyle />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginVertical: 4 },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: T.memoryCard,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: T.memoryBorder,
    },
    dot: {
        width: 7, height: 7,
        borderRadius: 4,
        backgroundColor: '#C9A87C',
    },
    bannerText: { fontSize: 12, color: '#A08060', fontWeight: '600', letterSpacing: 0.3 },
});