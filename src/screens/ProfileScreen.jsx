// src/screens/ProfileScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Animated,
} from 'react-native';
import { useThoughts } from '../hooks/useThoughts';
import { ThoughtCard } from '../components/ThoughtCard';
import { MemoryCard } from '../components/MemoryCard';
import { Logo } from '../components/Logo';
import { getMemoryLabel } from '../utils/dateHelpers';
import { T } from '../theme';

const FILTERS = [
    { key: 'all',     label: 'All' },
    { key: 'good',    label: '🌤  Good' },
    { key: 'neutral', label: '🌥  So-so' },
    { key: 'tough',   label: '🌧  Tough' },
];

export function ProfileScreen() {
    const { thoughts, setMood, moodStats } = useThoughts();
    const [filter, setFilter] = useState('all');
    const stats = moodStats();

    const displayed = filter === 'all'
        ? thoughts
        : thoughts.filter(t => t.mood === filter);

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
                data={displayed}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <Logo subtitle="your archive" />
                        <ProfileHeader
                            total={thoughts.length}
                            stats={stats}
                            since={thoughts.length > 0
                                ? thoughts[thoughts.length - 1].date
                                : null}
                        />
                        <MoodBar stats={stats} />
                        <FilterRow filter={filter} onFilter={setFilter} />
                        {displayed.length > 0 && (
                            <Text style={styles.sectionLabel}>
                                {filter === 'all'
                                    ? `${thoughts.length} thought${thoughts.length !== 1 ? 's' : ''}`
                                    : `${displayed.length} ${filter} day${displayed.length !== 1 ? 's' : ''}`}
                            </Text>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyWrapper}>
                        <Text style={styles.emptyIcon}>
                            {filter === 'good' ? '🌤' : filter === 'neutral' ? '🌥' : filter === 'tough' ? '🌧' : '☁'}
                        </Text>
                        <Text style={styles.emptyTitle}>
                            {filter === 'all' ? 'Your archive is empty' : `No ${filter} days yet`}
                        </Text>
                        <Text style={styles.emptySub}>
                            {filter === 'all'
                                ? 'Start writing from the Home tab.'
                                : 'Rate your days from the Home tab to see them here.'}
                        </Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 48 }}
            />
        </SafeAreaView>
    );
}

// ─── ProfileHeader ────────────────────────────────────────────────────────────

function ProfileHeader({ total, stats, since }) {
    const fadeAnim  = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.94)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, speed: 14,     useNativeDriver: true }),
        ]).start();
    }, []);

    const sinceLabel = since
        ? new Date(since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : null;

    const streak = calcStreak();

    return (
        <Animated.View style={[styles.headerWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.avatarCircle}>
                <Text style={styles.avatarSymbol}>✦</Text>
            </View>
            {sinceLabel && (
                <Text style={styles.sinceLabel}>Writing since {sinceLabel}</Text>
            )}
            <View style={styles.statsRow}>
                <StatCard value={total}        label="thoughts" />
                <StatCard value={streak}       label="day streak" />
                <StatCard value={stats.total}  label="rated" />
            </View>
        </Animated.View>
    );
}

function StatCard({ value, label }) {
    return (
        <View style={styles.statCard}>
            <Text style={styles.statNum}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

// ─── MoodBar ──────────────────────────────────────────────────────────────────

function MoodBar({ stats }) {
    if (stats.total === 0) return null;

    const pct = (n) => Math.round((n / stats.total) * 100);

    return (
        <View style={moodBarStyles.wrapper}>
            <Text style={moodBarStyles.title}>Mood overview</Text>
            <View style={moodBarStyles.bar}>
                {stats.good > 0 && (
                    <View style={[moodBarStyles.seg, { flex: stats.good, backgroundColor: '#F0D9A0' }]} />
                )}
                {stats.neutral > 0 && (
                    <View style={[moodBarStyles.seg, { flex: stats.neutral, backgroundColor: '#DDD8D0' }]} />
                )}
                {stats.tough > 0 && (
                    <View style={[moodBarStyles.seg, { flex: stats.tough, backgroundColor: '#C0CDD8' }]} />
                )}
            </View>
            <View style={moodBarStyles.legend}>
                {stats.good > 0 && (
                    <LegendItem icon="🌤" label={`${pct(stats.good)}% good`}    color="#A07830" />
                )}
                {stats.neutral > 0 && (
                    <LegendItem icon="🌥" label={`${pct(stats.neutral)}% so-so`} color="#8A7D74" />
                )}
                {stats.tough > 0 && (
                    <LegendItem icon="🌧" label={`${pct(stats.tough)}% tough`}   color="#5A7080" />
                )}
            </View>
        </View>
    );
}

function LegendItem({ icon, label, color }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 13 }}>{icon}</Text>
            <Text style={{ fontSize: 11, color, fontWeight: '600' }}>{label}</Text>
        </View>
    );
}

// ─── FilterRow ────────────────────────────────────────────────────────────────

function FilterRow({ filter, onFilter }) {
    return (
        <View style={filterStyles.row}>
            {FILTERS.map(f => (
                <FilterPill
                    key={f.key}
                    label={f.label}
                    active={filter === f.key}
                    onPress={() => onFilter(f.key)}
                />
            ))}
        </View>
    );
}

function FilterPill({ label, active, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.92, duration: 70,  useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1,    duration: 120, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <Animated.View style={[
                filterStyles.pill,
                active && filterStyles.pillActive,
                { transform: [{ scale }] },
            ]}>
                <Text style={[filterStyles.pillText, active && filterStyles.pillTextActive]}>
                    {label}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

// ─── AnimatedItem ─────────────────────────────────────────────────────────────

function AnimatedItem({ children, index }) {
    const opacity    = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(14)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity,    { toValue: 1, duration: 380, delay: index * 55, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 380, delay: index * 55, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
            {children}
        </Animated.View>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcStreak(thoughts = []) {
    if (!thoughts.length) return 0;
    const dates = [...new Set(thoughts.map(t => t.date))].sort().reverse();
    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    for (const d of dates) {
        const day = new Date(d);
        day.setHours(0, 0, 0, 0);
        const diff = Math.round((cursor - day) / (1000 * 60 * 60 * 24));
        if (diff > 1) break;
        streak++;
        cursor = day;
    }
    return streak;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: T.bg,
    },
    headerWrapper: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 4,
    },
    avatarCircle: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: T.accentLight,
        borderWidth: 1.5,
        borderColor: T.memoryBorder,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarSymbol: {
        fontSize: 22,
        color: T.accent,
    },
    sinceLabel: {
        fontSize: 12,
        color: T.textMuted,
        marginBottom: 14,
        letterSpacing: 0.3,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        marginBottom: 4,
    },
    statCard: {
        flex: 1,
        backgroundColor: T.card,
        borderRadius: 18,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: T.cardBorder,
    },
    statNum: {
        fontSize: 26,
        fontWeight: '700',
        color: T.accent,
        fontFamily: 'DancingScript_700Bold',
    },
    statLabel: {
        fontSize: 10,
        color: T.textMuted,
        marginTop: 3,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    sectionLabel: {
        fontSize: 10,
        color: T.textMuted,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginHorizontal: 20,
        marginTop: 20,
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

const moodBarStyles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: T.card,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: T.cardBorder,
    },
    title: {
        fontSize: 10,
        color: T.textMuted,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 10,
    },
    bar: {
        flexDirection: 'row',
        height: 10,
        borderRadius: 6,
        overflow: 'hidden',
        gap: 2,
        marginBottom: 10,
    },
    seg: {
        borderRadius: 6,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

const filterStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 16,
        marginTop: 14,
        marginBottom: 2,
        flexWrap: 'wrap',
    },
    pill: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: T.card,
        borderWidth: 1,
        borderColor: T.cardBorder,
    },
    pillActive: {
        backgroundColor: T.accent,
        borderColor: T.accent,
    },
    pillText: {
        fontSize: 12,
        color: T.textMuted,
        fontWeight: '500',
    },
    pillTextActive: {
        color: '#fff',
        fontWeight: '700',
    },
});