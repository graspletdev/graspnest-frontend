// src/app/pages/community/create/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import CommCreateClient from './CommCreateClient';
import { ApiResponse } from '@/app/lib/api';
import ClientError from '@/app/components/ClientError';
import { OrgDto } from '@/app/lib/org';

export default async function CommCreatePage() {
    const session = await getServerSession(authOptions);
    if (!session) return redirect('/login');

    const accessToken = session.user?.accessToken;
    const userRoles = session.user?.roles || [];

    // Optional: Uncomment if you want server-side role-based access check
    // const allowedRoles = ['SuperAdmin', 'OrgAdmin', 'CommunityAdmin'];
    // const hasAccess = userRoles.some((role: string) => allowedRoles.includes(role));
    // if (!hasAccess) return redirect('/403');

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/org`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Server responded ${res.status} ${res.statusText}`);
        }

        const body: ApiResponse<OrgDto[]> = await res.json();
        const orgData = body.data;

        if (!orgData || orgData.length === 0) {
            return notFound();
        }

        const orgNames = orgData.filter((org) => org.orgName).map((org) => org.orgName);

        return (
            <div className="bg-gray-100 min-h-screen p-8">
                <h1 className="text-2xl font-bold mb-6">Create Community</h1>
                <CommCreateClient orgNames={orgNames} />
            </div>
        );
    } catch (error: any) {
        console.error('[CommCreatePage] Failed to load org data:', error);
        return <ClientError message={error.message} redirectTo="/organization" />;
    }
}
