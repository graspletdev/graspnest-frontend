// src/app/pages/organization/[id]/OrgViewClient.tsx
'use client';

import { OrgForm } from '@/app/components/org/OrgForm';
import type { OrganizationForm } from '@/app/components/org/OrgForm';

interface OrgViewClientProps {
    /** The org object loaded by the Server Component */
    initialData: OrganizationForm;
}

export default function OrgViewClient({ initialData }: OrgViewClientProps) {
    return (
        <OrgForm
            initialValues={initialData} // prefill the form
            readOnly // disable all inputs & hide the Save button
            onSubmit={async () => {}} // no-op, since it's read-only
            action="view"
        />
    );
}
