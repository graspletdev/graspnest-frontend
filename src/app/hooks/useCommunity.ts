// src/app/hooks/useCommunity.ts
import { useState, useCallback } from 'react';
import { createComm, CreateCommDto, CommDto } from '@/app/lib/community';
import { updateComm, UpdateCommDto } from '@/app/lib/community';
import { mutate } from 'swr';

export function useCreateComm() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (data: CreateCommDto) => {
        setLoading(true);
        setError(null);
        try {
            const resp = await createComm(data);
            if (!resp.result) {
                throw new Error(resp.message || 'Failed to create organization');
            }
            return resp.data as CommDto;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { create, isLoading, error, mutate };
}

export function useUpdateComm() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = useCallback(async (id: string, data: UpdateCommDto): Promise<CommDto> => {
        setLoading(true);
        setError(null);
        try {
            const resp = await updateComm(id, data);
            if (!resp.result) {
                throw new Error(resp.message || 'Failed to create organization');
            }
            return resp.data as CommDto;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { update, isLoading, error };
}
