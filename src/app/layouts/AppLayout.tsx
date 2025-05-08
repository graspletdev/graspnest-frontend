// layouts/AppLayout.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaPeopleGroup, FaKey, FaPeopleRoof } from 'react-icons/fa6';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MENU_ITEMS = {
    SuperAdmin: [
        { href: '/pages/organization', title: 'Organization', icon: <BsFillBuildingsFill /> },
        { href: '/pages/community', title: 'Community', icon: <FaPeopleGroup /> },
        { href: '/pages/landlord', title: 'Landlord', icon: <FaKey /> },
        { href: '/pages/tenant', title: 'Tenant', icon: <FaPeopleRoof /> },
    ],
    OrgAdmin: [
        { href: '/pages/community', title: 'Community', icon: <FaPeopleGroup /> },
        { href: '/pages/landlord', title: 'Landlord', icon: <FaKey /> },
        { href: '/pages/tenant', title: 'Tenant', icon: <FaPeopleRoof /> },
    ],
    CommunityAdmin: [
        { href: '/pages/landlord', title: 'Landlord', icon: <FaKey /> },
        { href: '/pages/tenant', title: 'Tenant', icon: <FaPeopleRoof /> },
    ],
};

const DASHBOARD_PATH = {
    SuperAdmin: '/pages/superadmin',
    OrgAdmin: '/pages/organization',
    CommunityAdmin: '/pages/community',
};

export default function AppLayout({
    children,
    isSidebarOpen,
    setIsSidebarOpen,
}: {
    children: React.ReactNode;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [userRole, setUserRole] = useState<string | null>(null);
    //const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/login');
            return;
        }

        const roles = session.user?.roles || [];

        if (roles.includes('SuperAdmin')) {
            setUserRole('SuperAdmin');
        } else if (roles.includes('OrgAdmin')) {
            setUserRole('OrgAdmin');
        } else if (roles.includes('CommunityAdmin')) {
            setUserRole('CommunityAdmin');
        } else {
            router.push('/login');
        }
    }, [session, status, router]);

    if (!userRole) return null; // or loading spinner

    const menuItems = MENU_ITEMS[userRole] || [];
    const dashboardHref = DASHBOARD_PATH[userRole];

    return (
        <div className="flex flex-row w-full min-h-screen">
            {/* Sidebar */}
            <div className="flex-shrink-0">
                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} rolesDetails={menuItems} dashboardHref={dashboardHref} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 bg-white">{children}</div>
        </div>
    );
    //   <div className="flex flex-row w-full min-h-screen">
    //     <Sidebar
    //       isSidebarOpen={isSidebarOpen}
    //       setIsSidebarOpen={setIsSidebarOpen}
    //       rolesDetails={menuItems}
    //       dashboardHref={dashboardHref}
    //     />

    //     <div className="flex-1">
    //       <main className="ml-0 sm:ml-1">{children}</main>
    //     </div>
    //   </div>
    // );
}
