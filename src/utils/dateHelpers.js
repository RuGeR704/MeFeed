// src/utils/dateHelpers.js

export function formatDate(isoDate) {
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function getMemoryLabel(isoDate) {
    const then = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));

    if (diffDays >= 364 && diffDays <= 366) return '🗓 One year ago you thought this...';
    if (diffDays >= 182 && diffDays <= 184) return '📅 6 months ago...';
    if (diffDays >= 89 && diffDays <= 92)   return '🕒 3 months ago...';
    if (diffDays >= 27 && diffDays <= 32)   return '📆 About a month ago...';
    if (diffDays >= 6 && diffDays <= 8)     return '⏪ One week ago...';
    return null;
}