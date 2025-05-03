// src/app/hooks/useDashboard.ts
// useAdminDashboard
import { useApi } from './useApi';
import type { adminDashboardData } from '@/app/lib/admin';

export function useAdminDashboard(initialData?: adminDashboardData) {
    return useApi<adminDashboardData>(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
        fallbackData: initialData,
        revalidateOnFocus: false,
    });
}

// useOrgDashboard
import type { orgDashboardData } from '@/app/lib/org';

export function useOrgDashboard(initialData?: orgDashboardData) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/org/dashboard`;
    return useApi<orgDashboardData>(url, { fallbackData: initialData });
}

// useCommDashboard
import type { commDashboardData } from '@/app/lib/comm';

export function useCommDashboard(initialData?: commDashboardData) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/community/dashboard`;
    return useApi<commDashboardData>(url, { fallbackData: initialData });
}
