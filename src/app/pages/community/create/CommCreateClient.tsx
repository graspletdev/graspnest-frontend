// src/app/pages/community/create/CommCreateClient.tsx
// └─ this is a Client Component
'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useCreateComm } from '@/app/hooks/useCommunity';
import { CommForm } from '@/app/components/comm/CommForm';
import type { CommunityForm } from '@/app/components/comm/CommForm';

interface CommCreateClientProps {
    /** The org object loaded by the Server Component */
    orgNames: string[];
}

export default function CommCreateClient({ orgNames }: CommCreateClientProps) {
    const router = useRouter();
    const { create, isLoading, error, mutate } = useCreateComm();

    async function handleCreate(values: CommunityForm) {
        try {
            const newComm = await create(values);
            await Swal.fire('Created!', `Community “${newComm.commName}” added.`, 'success');
            //    await mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`);
            router.push('/pages/community');
        } catch (error: any) {
            const message =
                error?.response?.data?.message?.[0] || // class-validator message array
                error?.message ||
                'Failed to create community';
            Swal.fire('Error', message, 'error');
        }
    }

    return <CommForm onSubmit={handleCreate} readOnly={false} isSubmitting={isLoading} action="create" orgNames={orgNames} />;
}
