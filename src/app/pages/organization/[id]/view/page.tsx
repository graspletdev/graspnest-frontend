// src/app/pages/organization/[id]/view/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import OrgViewClient from './OrgViewClient';
import { ApiResponse } from '@/app/lib/api';
import ClientError from '@/app/components/ClientError';

export default async function OrgViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 1) Auth guard
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');

    let orgData: any;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/org/${id}`, {
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
        orgData = body.data;
    } catch (error: any) {
        console.error('[OrgViewPage] fetch org failed:', error);
        return <ClientError message={error.message} redirectTo="/organization" />;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">View Organization</h1>
            <OrgViewClient initialData={orgData} />
        </div>
    );
}
