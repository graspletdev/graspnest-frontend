// src/app/pages/organization/OrgAdminClient.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiMenu, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaPeopleGroup, FaPeopleRoof } from 'react-icons/fa6';
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { orgDashboardData } from '@/app/lib/org';
import { TotalDetailsSection, QuickCreateSection, SidebarMenu, SidebarLogoutItem } from '@/app/pages/superadmin/SuperAdminClient';
import { useSession } from 'next-auth/react';
import { useOrgDashboard } from '@/app/hooks/useDashboard';
import { deleteComm } from '@/app/lib/community';
import Swal from 'sweetalert2';

interface RoleItem {
    icon: React.ReactNode;
    href: string;
    title: string;
    subtitle: string;
    totaltitle: string;
    createhref: string;
    totalCountName: string;
}

const orgRolesDetails: RoleItem[] = [
    {
        href: '/pages/community',
        title: 'Community',
        subtitle: 'Set up new communities',
        icon: <FaPeopleGroup />,
        totaltitle: 'Total Communities',
        createhref: '/pages/community/create',
        totalCountName: 'communities',
    },
    {
        href: '/organization/create-landlord',
        title: 'Landlord',
        subtitle: 'Add new landlords',
        icon: <FaKey />,
        totaltitle: 'Total Landlords',
        createhref: '/pages/landlords/create',
        totalCountName: 'landlords',
    },
    {
        href: '/organization/create-tenant',
        title: 'Tenant',
        subtitle: 'Register new tenants',
        icon: <FaPeopleRoof />,
        totaltitle: 'Total Tenants',
        createhref: '/pages/tenants/create',
        totalCountName: 'tenants',
    },
];

export default function OrgAdminClient({ initialData }: { initialData: orgDashboardData }) {
    const { data: sessionData } = useSession();
    // We are using custom hooks useDashboard.ts, as we can use function useDashboard() in other components
    const { data, isError, isLoading, isValidating } = useOrgDashboard(initialData);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [selectedCommName, setSelectedCommName] = useState<string | 'all'>('all');
    const filteredComms = useMemo(() => {
        if (selectedCommName === 'all') return data?.orgCommDetails;

        return data?.orgCommDetails.filter((o) => o.commName === selectedCommName);
    }, [data, selectedCommName]);
    const handleDelete = async (commId: string) => {
        const ok = await Swal.fire({
            title: 'Disable Community?',
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, disable it',
        });
        if (!ok.isConfirmed) return;

        try {
            await deleteComm(commId);
            await Swal.fire('Disabled!', 'Organization has been disabled.', 'success');
            //await mutate();
        } catch (err: any) {
            console.error(err);
            Swal.fire('Error', err.message || 'Failed to disable org.', 'error');
        }
    };
    return (
        <div className="font-inter flex h-screen bg-white text-black">
            {/* Sidebar */}
            {isSidebarOpen && (
                <aside className="w-50 bg-black p-7 shadow-lg text-white">
                    <nav>
                        <ul className="space-y-6">
                            <li className="flex items-center space-x-2">
                                <MdSecurity className="text-xl" />
                                <Link href="/organization">Dashboard</Link>
                            </li>
                            <hr className="border-t border-gray-600" />
                            {orgRolesDetails.map((orgRolesDetail, idx) => (
                                <SidebarMenu key={idx} role={orgRolesDetail} />
                            ))}
                            <SidebarLogoutItem />
                        </ul>
                    </nav>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
                            <FiMenu size={24} />
                        </button>
                        <h1 className="text-xl font-extrabold">Organization Admin</h1>
                    </div>

                    <div className="flex items-center space-x-6 text-sm font-semibold">
                        <select
                            className="border border-gray-300 rounded px-1 py-1"
                            value={selectedCommName}
                            onChange={(e) => setSelectedCommName(e.target.value as string)}
                        >
                            <option value="all">Select Community</option>
                            {data?.orgCommDetails.map((comm, idx) => (
                                <option key={idx} value={comm.commName}>
                                    {comm.commName}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center space-x-1">
                            <span>Welcome, {sessionData?.user.name}</span>
                        </div>
                    </div>
                </header>
                {/* Total Details Section */}
                <TotalDetailsSection roles={orgRolesDetails} totalCounts={data?.totals} />

                {/* Quick Create Section */}
                <QuickCreateSection roles={orgRolesDetails} />

                {/* Community Overview */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Community Overview</h2>
                        {/* <input type="text" placeholder="Search Organization" className="border border-gray-300 rounded px-3 py-1" /> */}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 border-b">Community Name</th>
                                    <th className="px-4 py-2 border-b">Community Admin</th>
                                    <th className="px-4 py-2 border-b">Landlords</th>
                                    <th className="px-4 py-2 border-b">Residents</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComms.map((comm, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{comm.commName}</td>
                                        <td className="px-4 py-2 border-b text-center">
                                            {comm.commAdminFirstName} {comm.commAdminLastName}
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">{comm.landlordsCount}</td>
                                        <td className="px-4 py-2 border-b text-center">{comm.tenantsCount}</td>
                                        <td className="px-4 py-2 border-b text-center space-x-3">
                                            <Link
                                                href={`/pages/community/${comm.commId}/view`}
                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                            >
                                                <FiEye className="mr-1" />
                                            </Link>
                                            <Link href={`/pages/community/${comm.commId}/edit`} className="text-yellow-500 hover:text-yellow-600">
                                                <FiEdit2 className="inline" />
                                            </Link>
                                            <button onClick={() => handleDelete(comm.commId)} className="text-red-600 hover:text-red-800">
                                                <FiTrash2 className="inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
