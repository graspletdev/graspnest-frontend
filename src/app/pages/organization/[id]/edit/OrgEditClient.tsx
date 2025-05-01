// src/app/organization/[id]/edit/OrgEditClient.tsx
// └─ this is a Client Component
'use client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useUpdateOrg } from '@/app/hooks/useOrg';
import { OrgForm } from '@/app/components/org/OrgForm';
import type { OrganizationForm } from '@/app/components/org/OrgForm';

interface Props {
    id: string;
    initialData: OrganizationForm;
}

export default function OrgEditClient({ id, initialData }: Props) {
    const router = useRouter();
    const { update, isLoading, error } = useUpdateOrg();

    const onSubmit = async (values: OrganizationForm) => {
        try {
            await update(id, values);
            await Swal.fire('Saved!', 'Organization updated successfully.', 'success');
            router.push('/pages/organization');
        } catch {
            Swal.fire('Error', error ?? 'Failed to update organization.', 'error');
        }
    };

    return <OrgForm initialValues={initialData} onSubmit={onSubmit} readOnly={false} isSubmitting={isLoading} action="edit" />;
}
