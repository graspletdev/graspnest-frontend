// src/app/pages/community/create.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { count } from 'console';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';

export default function CreateCommunity() {
    const [form, setForm] = useState({
        commName: '',
        commType: '',
        blockNum: '',
        unitNum: '',
        commAddress: '',
        commPostcode: '',
        commFirst: '',
        commLast: '',
        commEmail: '',
        commContact: '',
        orgName: null,
    });

    function handleChange(e) {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: submit form data
        console.log(form);
        // router.push('/dashboard');
    }

    function Heading({ title }: { title: string }) {
        return (
            <div className="mb-1">
                <h2 className="font-bold text mb-4 text-gray-600">{title}</h2>
                <hr className="border-t border-gray-300" />
            </div>
        );
    }

    function FormInput({
        label,
        name,
        value,
        onChange,
        type = 'text',
    }: {
        label: string;
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        type?: string;
    }) {
        return (
            <div>
                <label className="font-semibold text-sm mb-2 text-gray-600 block">{label}</label>
                <input name={name} value={value} onChange={onChange} type={type} className="w-full border border-gray-300 p-2 rounded" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen text-black p-8">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Create Community</h1>
                <p className="text-sm font-semibold mt-1 text-gray-600">Add a new Residential Complex, Gated Community, or Apartment Building</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-8">
                {/* Community Details */}
                <section>
                    <Heading title="Community Details" />
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-1 gap-4">
                        <FormInput label="Community Name" name="commName" value={form.commName} onChange={handleChange} />

                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">Community Type</label>
                            <select name="commType" value={form.commType} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded">
                                <option className="font-semibold text-sm mb-4 text-gray-600" value="">
                                    Select type
                                </option>
                                <option value="res_complex">Residential Complex</option>
                                <option value="gated_community">Gated Community</option>
                                <option value="apartment">Apartment</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Number of Blocks/Buildings" name="blockNum" value={form.blockNum} onChange={handleChange} />
                        <FormInput label="Number of Units" name="unitNum" value={form.unitNum} onChange={handleChange} />
                    </div>
                </section>

                {/* Location */}
                <section>
                    <Heading title="Location" />
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={form.commAddress}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 p-2 rounded resize-y overflow-auto"
                                placeholder="Enter full address"
                            />
                        </div>
                    </div>
                </section>

                {/* Community Admin Information */}
                <section>
                    <Heading title="Community Admin Information" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Community First Name" name="commFirst" value={form.commFirst} onChange={handleChange} />
                        <FormInput label="Community Last Name" name="commLast" value={form.commLast} onChange={handleChange} />
                        <FormInput label="Community Email" name="commEmail" value={form.commEmail} onChange={handleChange} />
                        <FormInput label="Community Contact" name="commContact" value={form.commContact} onChange={handleChange} />
                    </div>
                </section>
                {/* Organization Information */}
                <section>
                    <Heading title="Organization Configuration" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-1 gap-4">
                        <FormInput label="Organization Name" name="orgName" value={form.orgName} onChange={handleChange} />
                    </div>
                </section>
            </form>
        </div>
    );
}
