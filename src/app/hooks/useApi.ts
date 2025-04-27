// src/app/hooks/useApi.ts
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr';
import { getSession } from 'next-auth/react';

async function fetcher<T>(url: string): Promise<T> {
    const session = await getSession();
    const token = session?.user?.accessToken;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message ?? res.statusText);
    }
    return res.json();
}

export function useApi<T = any>(
    url: string | null,
    config?: SWRConfiguration
): {
    data?: T;
    error?: Error;
    isLoading: boolean;
    isValidating: boolean;
    mutate: KeyedMutator<T>;
} {
    const { data, error, isValidating, mutate } = useSWR<T>(url, fetcher, config);
    return {
        data,
        error,
        isLoading: !error && data === undefined,
        isValidating,
        mutate,
    };
}
