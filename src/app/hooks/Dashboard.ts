// src/app/hooks/dashBoard.ts
import useSWR from 'swr';
import type { DashboardData } from '@/app/lib/admin';
import { fetchDashboard } from '@/app/lib/admin';

export function Dashboard() {
    //console.log("Inside hooks useDashboard")
    //https://swr.vercel.app/docs/api for Details
    const { data, error, isValidating } = useSWR<DashboardData>('dashboard', fetchDashboard, { revalidateOnFocus: false });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}
