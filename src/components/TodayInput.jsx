import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { T } from '../theme';

export function TodayInput({ onSubmit, existingThought }) {
    const [value, setValue] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, []);

    if (existingThought) {
        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <Text style={styles.label}>Today's thought ✓</Text>
                <View style={[styles.card, styles.savedCard]}>
                    <Text style={styles.savedText}>{existingThought.text}</Text>
                    <Text style={styles.savedNote}>Come back tomorrow ☁</Text>
                </View>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.label}>What's on your mind today?</Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Write your thought…"
                    placeholderTextColor={T.textHint}
                    multiline
                    value={value}
                    onChangeText={setValue}
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[styles.btn, !value.trim() && styles.btnOff]}
                    onPress={() => { if (value.trim()) { onSubmit(value.trim()); setValue(''); } }}
                    disabled={!value.trim()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.btnText}>Save thought</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { margin: 16, marginTop: 8 },
    label: { fontSize: 11, color: T.textMuted, marginBottom: 8, fontWeight: '600', letterSpacing: 1.5, textTransform: 'uppercase' },
    card: { backgroundColor: T.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: T.cardBorder },
    savedCard: { backgroundColor: '#FFFAF5', borderColor: T.memoryBorder },
    input: { fontSize: 15, color: T.text, minHeight: 90, textAlignVertical: 'top', lineHeight: 24 },
    savedText: { fontSize: 15, color: T.text, lineHeight: 24 },
    savedNote: { fontSize: 11, color: T.textMuted, marginTop: 10, textAlign: 'right', letterSpacing: 0.3 },
    btn: { backgroundColor: T.accent, borderRadius: 14, padding: 13, marginTop: 12, alignItems: 'center' },
    btnOff: { backgroundColor: '#D9CEC3' },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
});