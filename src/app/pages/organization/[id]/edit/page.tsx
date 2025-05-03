// src/app/pages/organization/[id]/edit/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import OrgEditClient from './OrgEditClient';
import ClientError from '@/app/components/ClientError';
import type { ApiResponse } from '@/app/lib/api';
import type { OrganizationForm } from '@/app/components/org/OrgForm';

export default async function OrgEditPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Auth guard
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');

    // Load org
    let data: OrganizationForm;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/org/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            cache: 'no-store',
        });
        if (res.status === 404) return notFound();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        const body: ApiResponse<OrganizationForm> = await res.json();
        if (!body.data) return notFound();
        data = body.data;
    } catch (err: any) {
        console.error('[OrgEditPage]', err);
        return <ClientError message={err.message} redirectTo="/organization" />;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Edit Organization</h1>
            <OrgEditClient id={id} initialData={data} />
        </div>
    );
}
