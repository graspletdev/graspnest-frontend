// src/app/pages/community/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import CommAdminClient from './CommAdminClient';
import { commDashboardData } from '@/app/lib/comm';

export default async function CommAdminHome() {
    // Check session & roles on the server
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect('/login');
    }
    // const allowedRoles = ['SuperAdmin', 'OrgAdmin', 'CommunityAdmin'];
    // if (!session.user.roles.some((role: string) => allowedRoles.includes(role))) {
    //     return redirect('/403');
    // }
    console.log('CommAdminHomemAPI');
    // Fetch your dashboard data (server-side)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
        },
    });
    console.log('CommAdminHome: ', res);
    if (!res.ok) {

        // you could redirect to an error page, or render an error UI
        throw new Error('Failed to load dashboard data');
    }
    const api = await res.json();
    const data: commDashboardData = api.data;

    //  Hand off to a client component for rendering + hooks
    return <CommAdminClient initialData={data} />;
}
