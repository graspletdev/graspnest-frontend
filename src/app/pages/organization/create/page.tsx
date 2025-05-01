// src/app/pages/organization/create/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/lib/authOptions';
import OrgCreateClient from './OrgCreateClient'; //  client form

export default async function OrgCreatePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/login');
    }

    // const allowedRoles = ['SuperAdmin', 'OrgAdmin'];
    // if (!session.user.roles.some((role: string) => allowedRoles.includes(role))) {
    //     return redirect('/403');
    // }

    return (
        <>
            <div className="bg-gray-100 min-h-screen p-8">
                <h1 className="text-2xl font-bold mb-6">Create Organization</h1>
                <OrgCreateClient />
            </div>
        </>
    );
}
