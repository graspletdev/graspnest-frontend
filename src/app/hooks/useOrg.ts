// src/hooks/useOrg.ts
import { useState, useCallback } from 'react';
import { createOrg, CreateOrgDto, OrgDto } from '@/app/lib/org';
import { updateOrg, UpdateOrgDto } from '@/app/lib/org';

export function useCreateOrg() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = useCallback(async (data: CreateOrgDto) => {
        setLoading(true);
        setError(null);
        try {
            const resp = await createOrg(data);
            if (!resp.result) {
                throw new Error(resp.message || 'Failed to create organization');
            }
            return resp.data as OrgDto;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { create, isLoading, error };
}

export function useUpdateOrg() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const update = useCallback(async (id: string, data: UpdateOrgDto): Promise<OrgDto> => {
        setLoading(true);
        setError(null);
        try {
            const resp = await updateOrg(id, data);
            if (!resp.result) {
                throw new Error(resp.message || 'Failed to create organization');
            }
            return resp.data as OrgDto;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { update, isLoading, error };
}
