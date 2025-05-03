// src/app/pages/organization/create/OrgCreateClient.tsx
// └─ this is a Client Component
'use client';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useCreateOrg } from '@/app/hooks/useOrg';
import { OrgForm } from '@/app/components/org/OrgForm';
import type { OrganizationForm } from '@/app/components/org/OrgForm';

export default function OrgCreateClient() {
    const router = useRouter();
    const { create, isLoading, error, mutate } = useCreateOrg();

    async function handleCreate(values: OrganizationForm) {
        try {
            const newOrg = await create(values);
            await Swal.fire('Created!', `Org “${newOrg.orgName}” added.`, 'success');
            await mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`);
            router.push('/pages/organization');
        } catch (error: any) {
            const message =
                error?.response?.data?.message?.[0] || // class-validator message array
                error?.message ||
                'Failed to create org';
            Swal.fire('Error', message, 'error');
        }
    }

    return <OrgForm onSubmit={handleCreate} readOnly={false} isSubmitting={isLoading} action="create" />;
}
