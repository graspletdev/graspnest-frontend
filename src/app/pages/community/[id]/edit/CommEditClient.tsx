// src/app/pages/community/[id]/edit/CommEditClient.tsx
// └─ this is a Client Component
'use client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useUpdateComm } from '@/app/hooks/useCommunity';
import { CommForm } from '@/app/components/comm/CommForm';
import type { CommunityForm } from '@/app/components/comm/CommForm';

interface Props {
    id: string;
    initialData: CommunityForm;
}

export default function CommEditClient({ id, initialData }: Props) {
    const router = useRouter();
    const { update, isLoading, error } = useUpdateComm();

    const onSubmit = async (values: CommunityForm) => {
        try {
            await update(id, values);
            await Swal.fire('Saved!', 'Community updated successfully.', 'success');
            router.push('/pages/community');
        } catch {
            Swal.fire('Error', error ?? 'Failed to update Community.', 'error');
        }
    };

    return <CommForm initialValues={initialData} onSubmit={onSubmit} readOnly={false} isSubmitting={isLoading} action="edit" />;
}
