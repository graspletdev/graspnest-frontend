// src/app/pages/superadmin/SuperAdminClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiMenu, FiEye, FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaPeopleGroup, FaPeopleRoof } from 'react-icons/fa6';
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useAdminDashboard } from '@/app/hooks/useDashboard';
import { useSession, signOut } from 'next-auth/react';
import { adminDashboardData } from '@/app/lib/admin';
import { deleteOrg } from '@/app/lib/org';
import AppLayout from '@/app/layouts/AppLayout';

interface RoleItem {
    icon: React.ReactNode;
    href: string;
    title: string;
    subtitle: string;
    totaltitle: string;
    createhref: string;
    totalCountName: string;
}

interface totalCounts {
    organizations?: number;
    communities?: number;
    landlords?: number;
    tenants?: number;
}

const rolesDetails: RoleItem[] = [
    {
        href: '/pages/organization',
        title: 'Organization',
        subtitle: 'Create and manage orgs',
        icon: <BsFillBuildingsFill />,
        totaltitle: 'Total Organizations',
        totalCountName: 'organizations',
        createhref: '/pages/organization/create',
    },
    {
        href: '/pages/community',
        title: 'Community',
        subtitle: 'Set up new communities',
        icon: <FaPeopleGroup />,
        totaltitle: 'Total Communities',
        totalCountName: 'communities',
        createhref: '/pages/community/create',
    },
    {
        href: '/super-admin/create-landlord',
        title: 'Landlord',
        subtitle: 'Add new landlords',
        icon: <FaKey />,
        totaltitle: 'Total Landlords',
        totalCountName: 'landlords',
        createhref: '/pages/landlords/create',
    },
    {
        href: '/super-admin/create-tenant',
        title: 'Tenant',
        subtitle: 'Register new tenants',
        icon: <FaPeopleRoof />,
        totaltitle: 'Total Tenants',
        totalCountName: 'tenants',
        createhref: '/pages/tenants/create',
    },
];

export function QuickCreateSection({ roles }: { roles: RoleItem[] }) {
    return (
        <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Create</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${roles.length || 1}, minmax(0, 1fr))` }}>
                {roles.map((item, idx) => (
                    <div key={idx} className="border border-gray-300 rounded p-6 text-center flex flex-col items-center justify-between hover:bg-gray-100">
                        <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-2xl">{item.icon}</div>
                        <div className="font-bold text-lg mb-1">{item.title}</div>
                        <div className="font-semibold text-sm mb-4 text-gray-600">{item.subtitle}</div>
                        <Link
                            href={item.createhref}
                            className="mt-auto inline-block bg-black text-white px-5 py-2.5 rounded-lg font-semibold transition hover:bg-[#1caec2]"
                        >
                            Create
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function TotalDetailsSection({ roles, totalCounts }: { roles: RoleItem[]; totalCounts: totalCounts | undefined }) {
    return (
        <section className="mb-8">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${roles.length || 1}, minmax(0, 1fr))` }}>
                {totalCounts &&
                    roles.map((item, idx) => (
                        <div key={idx} className="relative border border-gray-300 rounded p-4 hover:bg-gray-100 flex flex-col justify-between items-start h-24">
                            <div className="absolute top-4 right-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                {item.icon}
                            </div>
                            <div className="font-bold text-sm mb-1">{item.totaltitle}</div>
                            <div className="font-semibold text-sm text-gray-600 mt-auto text-xl">{totalCounts[item.totalCountName]}</div>
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default function SuperAdminClient({ initialData }: { initialData: adminDashboardData }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { data: sessionData } = useSession();

    // We are using custom hooks useDashboard.ts, as we can use function useDashboard() in other components
    const { data, isError, isLoading, isValidating, mutate } = useAdminDashboard(initialData);
    const [selectedOrgName, setSelectedOrgName] = useState<string | 'all'>('all');
    const filteredOrgs = useMemo(() => {
        if (selectedOrgName === 'all') return data?.adminOrgDetails;

        return data?.adminOrgDetails.filter((o) => o.orgName === selectedOrgName);
    }, [data, selectedOrgName]);

    const handleDelete = async (orgId: string) => {
        const ok = await Swal.fire({
            title: 'Disable organization?',
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, disable it',
        });
        if (!ok.isConfirmed) return;

        try {
            await deleteOrg(orgId);
            await Swal.fire('Disabled!', 'Organization has been disabled.', 'success');
            //await mutate();
        } catch (err: any) {
            console.error(err);
            Swal.fire('Error', err.message || 'Failed to disable org.', 'error');
        }
    };

    console.log('Data from backend');
    console.log(data);
    useEffect(() => {
        if (isError) {
            Swal.fire({
                icon: 'error',
                text: (isError as Error).message || 'Something went wrong fetching your dashboard.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#1CAEC2',
            });
        }
    }, [isError]);

    return (
        <AppLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
            <div className="font-inter flex flex-col bg-white text-black w-full">
                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <FiMenu size={24} />
                            </button>
                            <h1 className="text-xl font-extrabold">Super Admin</h1>
                        </div>

                        <div className="flex items-center space-x-6 text-sm font-semibold">
                            <select
                                className="border border-gray-300 rounded px-1 py-1"
                                value={selectedOrgName}
                                onChange={(e) => setSelectedOrgName(e.target.value as string)}
                            >
                                <option value="all">Select Organization</option>
                                {data?.adminOrgDetails.map((org, idx) => (
                                    <option key={idx} value={org.orgName}>
                                        {org.orgName}
                                    </option>
                                ))}
                            </select>
                            <div className="flex items-center space-x-1">
                                <span>Welcome, {sessionData?.user.name}</span>
                            </div>
                        </div>
                    </header>

                    {/* Total Details Section */}
                    <TotalDetailsSection roles={rolesDetails} totalCounts={data?.totals} />

                    {/* Quick Create Section */}
                    <QuickCreateSection roles={rolesDetails} />

                    {/* Organization Overview */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Organization Overview</h2>
                            {/* <input type="text" placeholder="Search Organization" className="border border-gray-300 rounded px-3 py-1" /> */}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 border-b">Organization</th>
                                        <th className="px-4 py-2 border-b">Organization Admin</th>
                                        <th className="px-4 py-2 border-b">Communities</th>
                                        <th className="px-4 py-2 border-b">Landlords</th>
                                        <th className="px-4 py-2 border-b">Residents</th>
                                        <th className="px-4 py-2 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrgs.map((org, idx) => (
                                        <tr key={idx} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border-b text-center">{org.orgName}</td>
                                            <td className="px-4 py-2 border-b text-center">
                                                {org.orgAdminFirstName} {org.orgAdminLastName}
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">{org.communitiesCount}</td>
                                            <td className="px-4 py-2 border-b text-center">{org.landlordsCount}</td>
                                            <td className="px-4 py-2 border-b text-center">{org.tenantsCount}</td>
                                            <td className="px-4 py-2 border-b text-center space-x-3">
                                                <Link
                                                    href={`/pages/organization/${org.orgId}/view`}
                                                    className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                                >
                                                    <FiEye className="mr-1" />
                                                </Link>
                                                <Link href={`/pages/organization/${org.orgId}/edit`} className="text-yellow-500 hover:text-yellow-600">
                                                    <FiEdit2 className="inline" />
                                                </Link>
                                                <button onClick={() => handleDelete(org.orgId)} className="text-red-600 hover:text-red-800">
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
        </AppLayout>
    );
}
