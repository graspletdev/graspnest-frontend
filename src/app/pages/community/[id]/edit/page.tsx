// src/app/pages/community/[id]/edit/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import CommEditClient from './CommEditClient';
import ClientError from '@/app/components/ClientError';
import type { ApiResponse } from '@/app/lib/api';
import type { CommunityForm } from '@/app/components/comm/CommForm';

export default async function CommEditPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Auth guard
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');

    // Load community
    let data: CommunityForm;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            cache: 'no-store',
        });
        if (res.status === 404) return notFound();
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        const body: ApiResponse<CommunityForm> = await res.json();
        if (!body.data) return notFound();
        data = body.data;
    } catch (err: any) {
        console.error('[CommEditPage]', err);
        return <ClientError message={err.message} redirectTo="/pages/community" />;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Edit Community</h1>
            <CommEditClient id={id} initialData={data} />
        </div>
    );
}
