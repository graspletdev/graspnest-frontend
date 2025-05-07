// src/app/pages/community/[id]/CommViewClient.tsx
'use client';

import { CommForm } from '@/app/components/comm/CommForm';
import type { CommunityForm } from '@/app/components/comm/CommForm';

interface CommViewClientProps {
    /** The org object loaded by the Server Component */
    initialData: CommunityForm;
}

export default function CommViewClient({ initialData }: CommViewClientProps) {
    return (
        <CommForm
            initialValues={initialData} // prefill the form
            readOnly // disable all inputs & hide the Save button
            onSubmit={async () => {}} // no-op, since it's read-only
            action="view" // set the action to view
        />
    );
}
