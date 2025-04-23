// src/app/pages/community/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaPeopleGroup, FaPeopleRoof } from 'react-icons/fa6';
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { TotalDetailsSection, QuickCreateSection, SidebarMenu } from '../superadmin/page';

interface RoleItem {
    icon: React.ReactNode;
    href: string;
    title: string;
    subtitle: string;
    totaltitle: string;
}

const commRolesDetails: RoleItem[] = [
    {
        href: '/community/create-landlord',
        title: 'Landlord',
        subtitle: 'Add new landlords',
        icon: <FaKey />,
        totaltitle: 'Total Landlords',
    },
    {
        href: '/community/create-tenant',
        title: 'Tenant',
        subtitle: 'Register new tenants',
        icon: <FaPeopleRoof />,
        totaltitle: 'Total Tenants',
    },
];

export default function CommunityHome() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const communities = [
        { name: 'Comm A', communityAdmin: 'Alice', totalLandlords: 10, totalResidents: 200 },
        { name: 'Comm B', communityAdmin: 'Bob', totalLandlords: 4, totalResidents: 80 },
    ];
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
                        <select className="border border-gray-300 rounded px-1 py-1">
                            <option>Select Landlord</option>
                        </select>
                        <div className="flex items-center space-x-1">
                            <span>Welcome, Ravi</span>
                        </div>
                    </div>
                </header>
                {/* Total Details Section */}
                <TotalDetailsSection roles={commRolesDetails} />

                {/* Quick Create Section */}
                <QuickCreateSection roles={commRolesDetails} />

                {/* Community Overview */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Community Overview</h2>
                        <input type="text" placeholder="Search Organization" className="border border-gray-300 rounded px-3 py-1" />
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
                                {communities.map((comm, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{comm.name}</td>
                                        <td className="px-4 py-2 border-b text-center">{comm.communityAdmin}</td>
                                        <td className="px-4 py-2 border-b text-center">{comm.totalLandlords}</td>
                                        <td className="px-4 py-2 border-b text-center">{comm.totalResidents}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
