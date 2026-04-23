// src/theme.js
export const T = {
    bg: '#FBF8F4',
    card: '#FFFFFF',
    cardBorder: '#EDE6DC',
    memoryCard: '#FFFAF5',
    memoryBorder: '#D4C4B0',
    accent: '#8B7355',
    accentLight: '#F0E8DC',
    text: '#5A4E44',
    textSoft: '#8A7D74',
    textMuted: '#B8AFA6',
    textHint: '#C4B8AD',

    // mood colors
    moodGood:     { bg: '#FFF8EC', border: '#F0D9A0', text: '#A07830', icon: '🌤' },
    moodNeutral:  { bg: '#F7F5F2', border: '#DDD8D0', text: '#8A7D74', icon: '🌥' },
    moodTough:    { bg: '#F0F4F8', border: '#C0CDD8', text: '#5A7080', icon: '🌧' },
};

export const MOODS = [
    { key: 'good',    label: 'Good day',   ...T.moodGood },
    { key: 'neutral', label: 'So-so',      ...T.moodNeutral },
    { key: 'tough',   label: 'Tough day',  ...T.moodTough },
];

export function getMood(key) {
    return MOODS.find(m => m.key === key) || null;
}