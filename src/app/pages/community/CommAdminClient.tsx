// src/app/pages/community/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiMenu, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaPeopleRoof, FaBuilding } from 'react-icons/fa6';
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { TotalDetailsSection, QuickCreateSection, SidebarMenu, SidebarLogoutItem } from '@/app/pages/superadmin/SuperAdminClient';
import { useSession } from 'next-auth/react';
import { commDashboardData } from '@/app/lib/comm';
import { useCommDashboard } from '@/app/hooks/useDashboard';
import { RiBuildingFill } from 'react-icons/ri';

interface RoleItem {
    icon: React.ReactNode;
    href: string;
    title: string;
    subtitle: string;
    totaltitle: string;
    createhref: string;
    totalCountName: string;
}

const commRolesDetails: RoleItem[] = [
    {
        href: '/community/create-landlord',
        title: 'Landlord',
        subtitle: 'Add new landlords',
        icon: <FaKey />,
        totaltitle: 'Total Landlords',
        createhref: '/pages/landlords/create',
        totalCountName: 'landlords',
    },
    {
        href: '/community/create-tenant',
        title: 'Tenant',
        subtitle: 'Register new tenants',
        icon: <FaPeopleRoof />,
        totaltitle: 'Total Tenants',
        createhref: '/pages/tenants/create',
        totalCountName: 'tenants',
    },
];

export default function CommAdminClient({ initialData }: { initialData: commDashboardData }) {
    const { data: sessionData } = useSession();
    // We are using custom hooks useDashboard.ts, as we can use function useDashboard() in other components
    const { data, isError, isLoading, isValidating } = useCommDashboard(initialData);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchLandlord, setSearchLandlord] = useState<string>('');

    const filteredLandLords = useMemo(() => {
        if (!searchLandlord) return data?.commlandlordDetails;
        return data?.commlandlordDetails.filter((o) => {
            const fullName = `${o.landlordFirstName} ${o.landlordLastName}`;
            return fullName.toLowerCase().includes(searchLandlord.toLowerCase());
        });
    }, [data, searchLandlord]);

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
                            {commRolesDetails.map((commRolesDetail, idx) => (
                                <SidebarMenu key={idx} role={commRolesDetail} />
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
                        <h1 className="text-xl font-extrabold">Community Admin</h1>
                    </div>

                    <div className="flex items-center space-x-6 text-sm font-semibold">
                        {/* <select
                            className="border border-gray-300 rounded px-1 py-1"
                            value={selectedLandLordName}
                            onChange={(e) => setSelectedLandLordName(e.target.value as string)}
                        >
                            <option value="all">Select Landlord</option>
                            {data?.commlandlordDetails.map((landlord, idx) => (
                                <option key={idx} value={`${landlord.landlordFirstName} ${landlord.landlordLastName}`}>
                                    {landlord.landlordFirstName} {landlord.landlordLastName}
                                </option>
                            ))}
                        </select> */}
                        <div className="flex items-center space-x-1">
                            <span>Welcome, {sessionData?.user.name}</span>
                        </div>
                    </div>
                </header>
                {/* Total Details Section */}
                <TotalDetailsSection roles={commRolesDetails} totalCounts={data?.totals} />
                <section className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative border border-gray-300 rounded p-4 hover:bg-gray-100 flex flex-col justify-between items-start h-24">
                            <div className="absolute top-4 right-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                <FaBuilding />
                            </div>
                            <div className="font-bold text-sm mb-1">Total Blocks</div>
                            <div className="font-semibold text-sm text-gray-600 mt-auto text-xl">{data?.totals.blocksCount}</div>
                        </div>

                        <div className="relative border border-gray-300 rounded p-4 hover:bg-gray-100 flex flex-col justify-between items-start h-24">
                            <div className="absolute top-4 right-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                                <RiBuildingFill />
                            </div>
                            <div className="font-bold text-sm mb-1">Units in Each Blocks</div>
                            <div className="font-semibold text-sm text-gray-600 mt-auto text-xl">{data?.totals.unitsCount}</div>
                        </div>
                    </div>
                </section>

                {/* Quick Create Section */}
                <QuickCreateSection roles={commRolesDetails} />

                {/* Community Overview */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Community Overview</h2>
                        <input
                            type="text"
                            placeholder="Search Community"
                            value={searchLandlord}
                            onChange={(e) => setSearchLandlord(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 border-b">Block Name</th>
                                    <th className="px-4 py-2 border-b">LandLords</th>
                                    <th className="px-4 py-2 border-b">Residents</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLandLords.length > 0 ? (
                                    filteredLandLords.map((landlord, idx) => (
                                        <tr key={idx} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border-b text-center">Block {idx + 1}</td>
                                            <td className="px-4 py-2 border-b text-center">
                                                {landlord.landlordFirstName} {landlord.landlordLastName}
                                            </td>
                                            <td className="px-4 py-2 border-b text-center">{landlord.tenantsCount}</td>
                                            <td className="px-4 py-2 border-b text-center space-x-3">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <FiEye className="inline" />
                                                </button>
                                                <button className="text-yellow-500 hover:text-yellow-600">
                                                    <FiEdit2 className="inline" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <FiTrash2 className="inline" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                                            No matching records
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
