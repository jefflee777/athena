'use client';

const STORAGE_KEY = 'athena_swap_history';
const MAX_ENTRIES = 50;

export function addSwapToHistory(entry) {
    if (typeof window === 'undefined') return;
    try {
        const history = getSwapHistory();

        // Deduplicate by txHash
        if (entry.txHash && history.some(h => h.txHash === entry.txHash)) {
            return; // Already saved
        }

        history.unshift({
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: Date.now(),
        });
        const trimmed = history.slice(0, MAX_ENTRIES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
        console.error('Failed to save swap history:', e);
    }
}

export function getSwapHistory() {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function clearSwapHistory() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}
