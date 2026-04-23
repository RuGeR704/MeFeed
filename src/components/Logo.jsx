// src/components/Logo.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Logo({ subtitle }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.logo}>MeFeed</Text>
            {subtitle && <Text style={styles.sub}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center', paddingTop: 14, paddingBottom: 6 },
    logo: {
        fontFamily: 'DancingScript_700Bold',
        fontSize: 36,
        color: '#8B7355',
        letterSpacing: 1,
    },
    sub: {
        fontSize: 11,
        color: '#C4B8AD',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 2,
    },
});