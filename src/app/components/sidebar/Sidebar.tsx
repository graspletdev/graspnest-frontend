import { MdSecurity } from 'react-icons/md';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { HiMenuAlt2 } from 'react-icons/hi';

export interface RoleItem {
    href: string;
    title: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    rolesDetails: RoleItem[];
    dashboardHref: string;
}

export function SidebarLogoutItem() {
    return (
        <li className="flex items-center space-x-2 rounded cursor-pointer hover:bg-[#1caec2] px-3 py-2">
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="flex items-center w-full text-left">
                <FiLogOut className="text-xl shrink-0" />
                <span className="ml-2">Logout</span>
            </button>
        </li>
    );
}

export function SidebarMenu({ role }: { role: RoleItem }) {
    return (
        <li className="flex items-center space-x-2 rounded cursor-pointer hover:bg-[#1caec2] px-3 py-2">
            <span className="text-xl shrink-0">{role.icon}</span>
            <Link href={role.href}>{role.title}</Link>
        </li>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, rolesDetails, dashboardHref }) => {
    if (!isSidebarOpen) return null;

    return (
        <aside className="w-64 bg-black p-7 shadow-lg text-white h-full">
            <nav>
                <ul className="space-y-6">
                    <li className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                            <MdSecurity className="text-xl" />
                            <Link href={dashboardHref}>Dashboard</Link>
                        </div>
                    </li>
                    <hr className="border-t border-gray-600" />
                    {rolesDetails.map((role, idx) => (
                        <SidebarMenu key={idx} role={role} />
                    ))}
                    <SidebarLogoutItem />
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
