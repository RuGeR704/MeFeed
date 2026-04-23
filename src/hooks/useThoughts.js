// src/hooks/useThoughts.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@mefeed_thoughts';

export function useThoughts() {
    const [thoughts, setThoughts] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            if (raw) setThoughts(JSON.parse(raw));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const save = async (updated) => {
        setThoughts(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const addThought = async (text) => {
        const today = new Date().toISOString().split('T')[0];
        if (thoughts.find(t => t.date === today)) return false;
        const entry = {
            id: Date.now().toString(),
            text,
            date: today,
            mood: null,       // 'good' | 'neutral' | 'tough' | null
            createdAt: new Date().toISOString(),
        };
        await save([entry, ...thoughts]);
        return true;
    };

    const setMood = async (id, moodKey) => {
        const updated = thoughts.map(t =>
            t.id === id
                ? { ...t, mood: t.mood === moodKey ? null : moodKey }
                : t
        );
        await save(updated);
    };

    const todayThought = () => {
        const today = new Date().toISOString().split('T')[0];
        return thoughts.find(t => t.date === today) || null;
    };

    // statistiche mood per ProfileScreen
    const moodStats = () => {
        const rated = thoughts.filter(t => t.mood);
        return {
            good:    thoughts.filter(t => t.mood === 'good').length,
            neutral: thoughts.filter(t => t.mood === 'neutral').length,
            tough:   thoughts.filter(t => t.mood === 'tough').length,
            total:   rated.length,
        };
    };

    return { thoughts, loading, addThought, setMood, todayThought, moodStats };
}