// src/app/pages/superadmin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaPeopleGroup, FaPeopleRoof } from 'react-icons/fa6';
import { FaKey } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

interface RoleItem {
    icon: React.ReactNode;
    href: string;
    title: string;
    subtitle: string;
    totaltitle: string;
}

const rolesDetails: RoleItem[] = [
    {
        href: '/super-admin/create-organization',
        title: 'Organization',
        subtitle: 'Create and manage orgs',
        icon: <BsFillBuildingsFill />,
        totaltitle: 'Total Organizations',
    },
    {
        href: '/super-admin/create-community',
        title: 'Community',
        subtitle: 'Set up new communities',
        icon: <FaPeopleGroup />,
        totaltitle: 'Total Communities',
    },
    {
        href: '/super-admin/create-landlord',
        title: 'Landlord',
        subtitle: 'Add new landlords',
        icon: <FaKey />,
        totaltitle: 'Total Landlords',
    },
    {
        href: '/super-admin/create-tenant',
        title: 'Tenant',
        subtitle: 'Register new tenants',
        icon: <FaPeopleRoof />,
        totaltitle: 'Total Tenants',
    },
];

function SidebarMenu({ role }: { role: RoleItem }) {
    return (
        <li className="flex items-center space-x-2 rounded cursor-pointer hover:bg-[#1caec2] px-3 py-2">
            <span className="text-xl shrink-0">{role.icon}</span>
            <Link href={role.href}>{role.title}</Link>
        </li>
    );
}

function QuickCreateSection({ roles }: { roles: RoleItem[] }) {
    return (
        <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Quick Create</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map((item, idx) => (
                    <div key={idx} className="border border-gray-300 rounded p-6 text-center flex flex-col items-center justify-between hover:bg-gray-100">
                        <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-2xl">{item.icon}</div>
                        <div className="font-bold text-lg mb-1">{item.title}</div>
                        <div className="font-semibold text-sm mb-4 text-gray-600">{item.subtitle}</div>
                        <Link
                            href={item.href}
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

function TotalDetailsSection({ roles }: { roles: RoleItem[] }) {
    return (
        <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {roles.map((item, idx) => (
                    <div key={idx} className="relative border border-gray-300 rounded p-4 hover:bg-gray-100 flex flex-col justify-between items-start h-24">
                        <div className="absolute top-4 right-4 bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-xl">{item.icon}</div>
                        <div className="font-bold text-sm mb-1">{item.totaltitle}</div>
                        <div className="font-semibold text-sm text-gray-600 mt-auto text-xl">100</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function SuperAdminHome() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const organizations = [
        { name: 'Org A', communityAdmin: 'Alice', totalCommunities: 5, totalLandlords: 10, totalResidents: 200 },
        { name: 'Org B', communityAdmin: 'Bob', totalCommunities: 3, totalLandlords: 4, totalResidents: 80 },
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
                                <Link href="/super-admin">Dashboard</Link>
                            </li>
                            <hr className="border-t border-gray-600" />
                            {rolesDetails.map((rolesDetail, idx) => (
                                <SidebarMenu key={idx} role={rolesDetail} />
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
                        <h1 className="text-xl font-extrabold">Super Admin</h1>
                    </div>

                    <div className="flex items-center space-x-6 text-sm font-semibold">
                        <select className="border border-gray-300 rounded px-1 py-1">
                            <option>Select Organization</option>
                        </select>
                        <div className="flex items-center space-x-1">
                            <span>Welcome, Ravi</span>
                        </div>
                    </div>
                </header>

                {/* Total Details Section */}
                <TotalDetailsSection roles={rolesDetails} />

                {/* Quick Create Section */}
                <QuickCreateSection roles={rolesDetails} />

                {/* Organization Overview */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Organization Overview</h2>
                        <input type="text" placeholder="Search Organization" className="border border-gray-300 rounded px-3 py-1" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 border-b">Organization</th>
                                    <th className="px-4 py-2 border-b">Communities</th>
                                    <th className="px-4 py-2 border-b">Landlords</th>
                                    <th className="px-4 py-2 border-b">Residents</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizations.map((org, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b text-center">{org.name}</td>
                                        <td className="px-4 py-2 border-b text-center">{org.totalCommunities}</td>
                                        <td className="px-4 py-2 border-b text-center">{org.totalLandlords}</td>
                                        <td className="px-4 py-2 border-b text-center">{org.totalResidents}</td>
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
