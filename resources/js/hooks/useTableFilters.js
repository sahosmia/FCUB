// resources/js/hooks/useTableFilters.js
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export function useTableFilters(initialFilters) {
    const [filters, setFilters] = useState(initialFilters);
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');

    function applyFilters(partial = {}) {
        const next = { ...filters, ...partial };
        // Clean undefined or empty values
        const query = Object.fromEntries(
            Object.entries(next).filter(([_, v]) => v !== '' && v !== undefined)
        );

        router.get(window.location.pathname, query, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        applyFilters({ [key]: value, page: 1 });
    };

    return { filters, setFilters, searchTerm, setSearchTerm, handleChange, applyFilters };
}
