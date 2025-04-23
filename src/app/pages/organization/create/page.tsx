// src/app/pages/organization/create.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { count } from 'console';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaUpload } from 'react-icons/fa6';

export default function CreateOrganization() {
    // const router = useRouter();
    const [form, setForm] = useState({
        orgName: '',
        orgType: '',
        address: '',
        postcode: '',
        country: '',
        state: '',
        city: '',
        adminFirst: '',
        adminLast: '',
        adminEmail: '',
        adminContact: '',
        fcaNumber: '',
        companyHouse: '',
        incorporationDate: '',
    });
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

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

    function UploadButton({
        label,
        name,
        value,
        onChange,
        type = 'pdf',
    }: {
        label: string;
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        type?: string;
    }) {
        return (
            <div>
                <label className="inline-flex items-center bg-gray-200 text-black px-5 py-1 rounded mb-2 cursor-pointer space-x-2">
                    <FaUpload />
                    <span>{label}</span>
                    <input type="file" name={name} accept="${type}/*" onChange={handleChange} className="hidden" />
                </label>
                <p className="text-xs text-gray-500">{value}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen text-black p-8">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Create Organization</h1>
                <p className="text-sm font-semibold mt-1 text-gray-600">Set up New Property Management Organization</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-8">
                {/* Basic Information */}
                <section>
                    <Heading title="Basic Information" />
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Organization Name" name="orgName" value={form.orgName} onChange={handleChange} />

                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">Organization Type</label>
                            <select name="orgType" value={form.orgType} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-2 rounded">
                                <option className="font-semibold text-sm mb-4 text-gray-600" value="">
                                    Select type
                                </option>
                                <option value="Estate Agent">Estate Agent</option>
                                <option value="Management Company">Management Company</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="font-semibold text-sm mb-4 text-gray-600">Logo Upload</label>
                            <div className="mt-1 flex items-start space-x-4">
                                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded overflow-hidden text-3xl text-gray-400">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <BsFillBuildingsFill />
                                    )}
                                </div>
                                <UploadButton
                                    label="Upload Logo"
                                    name="logo"
                                    value="Upload your organization's logo in JPG or PNG format."
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border border-gray-300 p-2 rounded resize-y overflow-auto"
                                placeholder="Enter full address"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="City" name="city" value={form.city} onChange={handleChange} />
                        <FormInput label="State" name="state" value={form.state} onChange={handleChange} />
                        <FormInput label="Country" name="country" value={form.country} onChange={handleChange} />
                    </div>
                </section>

                {/* Admin Information */}
                <section>
                    <Heading title="Admin User Information" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput label="Admin First Name" name="adminFirst" value={form.adminFirst} onChange={handleChange} />
                        <FormInput label="Admin Last Name" name="adminLast" value={form.adminLast} onChange={handleChange} />
                        <FormInput label="Admin Email" name="adminEmail" value={form.adminEmail} onChange={handleChange} />
                        <FormInput label="Admin Contact" name="adminContact" value={form.adminContact} onChange={handleChange} />
                    </div>
                </section>

                {/* Document Upload */}
                <section>
                    <Heading title="Document Upload" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">Business Registration</label>
                            <div className="mt-2 flex items-start space-x-4"></div>
                            <UploadButton label="Upload Document" name="businessReg" value="Upload Business Registration Document." onChange={handleChange} />
                        </div>

                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">License</label>
                            <div className="mt-2 flex items-start space-x-4"></div>
                            <UploadButton label="Upload Document" name="license" value="Upload License Document." onChange={handleChange} />
                        </div>

                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">Tax / VAT Document</label>
                            <div className="mt-2 flex items-start space-x-4"></div>
                            <UploadButton label="Upload Document" name="license" value="Upload Tax / VAT Document." onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {/* Additional UK-specific Fields */}
                <section>
                    <Heading title="Additional UK Registration Details" />

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormInput label="FCA Registration Number" name="fcaNumber" value={form.fcaNumber} onChange={handleChange} />
                        <FormInput label="Companies House Number" name="companyHouse" value={form.companyHouse} onChange={handleChange} />
                        <div>
                            <label className="font-semibold text-sm mb-4 text-gray-600">Date of Incorporation</label>
                            <input
                                type="date"
                                name="incorporationDate"
                                value={form.incorporationDate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}
