// src/app/hooks/dashBoard.ts
import useSWR from 'swr';
import type { adminDashboardData } from '@/app/lib/admin';
import { fetchDashboard } from '@/app/lib/admin';
import type { orgDashboardData } from '@/app/lib/org';
import { fetchOrgDashboard } from '@/app/lib/org';
import type { commDashboardData } from '@/app/lib/comm';
import { fetchCommDashboard } from '@/app/lib/comm';

export function Dashboard(initialData: adminDashboardData) {
    //console.log("Inside hooks useDashboard")
    //https://swr.vercel.app/docs/api for Details
    const { data, error, isValidating } = useSWR<adminDashboardData>('admindashboard', fetchDashboard, { fallback: initialData, revalidateOnFocus: false });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export function orgDashboard(initialData: orgDashboardData) {
    //console.log("Inside hooks useDashboard")
    //https://swr.vercel.app/docs/api for Details
    const { data, error, isValidating } = useSWR<orgDashboardData>('orgdashboard', fetchOrgDashboard, { fallback: initialData, revalidateOnFocus: false });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}

export function commDashboard(initialData: commDashboardData) {
    //console.log("Inside hooks useDashboard")
    //https://swr.vercel.app/docs/api for Details
    const { data, error, isValidating } = useSWR<commDashboardData>('commdashboard', fetchCommDashboard, { fallback: initialData, revalidateOnFocus: false });

    return {
        data,
        isLoading: !error && !data,
        isError: error,
        isValidating,
    };
}
