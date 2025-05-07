// src/app/pages/community/[id]/view/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import CommViewClient from './CommViewClient';
import { ApiResponse } from '@/app/lib/api';
import ClientError from '@/app/components/ClientError';

export default async function CommViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Auth guard
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');

    let commData: any;
    console.log('community id', id);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            cache: 'no-store', //  to ensure fresh data
        });

        if (!res.ok) {
            throw new Error(`Server responded ${res.status} ${res.statusText}`);
        }

        const body: ApiResponse<any> = await res.json();
        if (!body.data) {
            return notFound();
        }
        commData = body.data;
    } catch (error: any) {
        console.error('[CommViewPage] fetch community failed:', error);
        return <ClientError message={error.message} redirectTo="/pages/community" />;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">View Community</h1>
            <CommViewClient initialData={commData} />
        </div>
    );
}
