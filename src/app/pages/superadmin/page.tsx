// src/app/pages/superadmin/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import SuperAdminClient from './SuperAdminClient';
import { adminDashboardData } from '@/app/lib/admin';

export default async function SuperAdminHome() {
    // Check session & roles on the server
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    if (!session.user.roles.includes('SuperAdmin')) {
        return redirect('/403');
    }

    // Fetch your dashboard data (server-side)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
        headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
        },
    });
    if (!res.ok) {
        // you could redirect to an error page, or render an error UI
        throw new Error('Failed to load dashboard data');
    }
    const api = await res.json();
    const data: adminDashboardData = api.data;

    //  Hand off to a client component for rendering + hooks
    return <SuperAdminClient initialData={data} />;
}
