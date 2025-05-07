//src/app/components/org/OrgForm
'use client';

import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { FaUpload } from 'react-icons/fa6';
import { BsFillBuildingsFill } from 'react-icons/bs';

export interface OrganizationForm {
    orgName: string;
    orgType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    regNum: string;
    vatID: string;
    website: string;
    adminFirst: string;
    adminLast: string;
    adminEmail: string;
    adminContact: string;
    logo?: string;
    docUpload?: string;
}

// Generic text input
function FormInput({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    readOnly = false,
}: {
    label: string;
    name: keyof OrganizationForm;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    readOnly?: boolean;
}) {
    return (
        <div>
            <label className="block mb-1 font-semibold text-gray-600">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                required={required}
                readOnly={readOnly}
                className="w-full border border-gray-300 p-2 rounded"
            />
        </div>
    );
}

//  file uploader
function UploadButton({
    label,
    name,
    file,
    onChange,
    value,
}: {
    label: string;
    value: string;
    name: keyof OrganizationForm;
    file?: File;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label className="inline-flex items-center bg-gray-200 px-4 py-2 rounded cursor-pointer space-x-2">
                <FaUpload />
                <span>{label}</span>
                <input type="file" name={name} accept="image/*" onChange={onChange} className="hidden" />
            </label>
            {file && (
                <div className="mt-2 w-24 h-24 relative">
                    <Image src={URL.createObjectURL(file)} alt="Preview" fill className="object-cover rounded" />
                </div>
            )}
            <p className="mt-2 text-xs text-gray-500">{value}</p>
        </div>
    );
}

export interface OrgFormProps {
    initialValues?: Partial<OrganizationForm>;
    readOnly?: boolean;
    isSubmitting?: boolean;
    onSubmit: (values: OrganizationForm) => Promise<void>;
    action?: 'create' | 'edit' | 'view';
}

export function OrgForm({ initialValues = {}, readOnly = false, onSubmit, isSubmitting = false, action = 'create' }: OrgFormProps) {
    const [form, setForm] = useState<OrganizationForm>({
        orgName: initialValues.orgName || '',
        orgType: initialValues.orgType || '',
        address: initialValues.address || '',
        city: initialValues.city || '',
        state: initialValues.state || '',
        country: initialValues.country || '',
        regNum: initialValues.regNum || '',
        vatID: initialValues.vatID || '',
        website: initialValues.website || '',
        adminFirst: initialValues.adminFirst || '',
        adminLast: initialValues.adminLast || '',
        adminEmail: initialValues.adminEmail || '',
        adminContact: initialValues.adminContact || '',
        logo: initialValues.logo || '',
        docUpload: initialValues.docUpload || '',
    } as OrganizationForm);
    //const [isSubmitting, setSubmitting] = useState(false);
    const isCreate = action === 'create';
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]: files?.[0] ?? value,
        }));
    }, []);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            //  setSubmitting(true);
            try {
                await onSubmit(form);
            } finally {
                //   setSubmitting(false);
            }
        },
        [form, onSubmit]
    );

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
            {/* Basic Info */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Basic Information</h2>
                <hr className="mb-4 border-t border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Organization Name" name="orgName" value={form.orgName} onChange={handleChange} required readOnly={readOnly} />
                    <div>
                        <label className="block mb-1 font-semibold text-gray-600">
                            Organization Type<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="orgType"
                            value={form.orgType}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                            disabled={readOnly}
                        >
                            <option value="">Select type</option>
                            <option>Estate Agent</option>
                            <option>Management Company</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="md:col-span-2 flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                            <BsFillBuildingsFill size={32} />
                        </div>
                        {!readOnly && (
                            <UploadButton
                                label="Upload Logo"
                                name="logo"
                                //file={form.logoFile}
                                onChange={handleChange}
                                value="Upload Company Logo"
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Address */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">
                    Address<span className="text-red-500">*</span>
                </h2>
                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange as any}
                    rows={3}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Full address with postcode"
                    readOnly={readOnly}
                />
            </section>

            {/* Location */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="City" name="city" value={form.city} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="State" name="state" value={form.state} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="Country" name="country" value={form.country} onChange={handleChange} required readOnly={readOnly} />
                </div>
            </section>

            {/* Company Details */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Company Details</h2>
                <hr className="mb-4 border-t border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="Company Reg Number" name="regNum" value={form.regNum} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="VAT ID" name="vatID" value={form.vatID} onChange={handleChange} readOnly={readOnly} />
                    <FormInput label="Website" name="website" value={form.website} onChange={handleChange} type="url" readOnly={readOnly} />
                </div>
            </section>

            {/* Admin User */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Admin User</h2>
                <hr className="mb-4 border-t border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="First Name" name="adminFirst" value={form.adminFirst} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="Last Name" name="adminLast" value={form.adminLast} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="Email" name="adminEmail" value={form.adminEmail} onChange={handleChange} type="email" required readOnly={!isCreate} />
                    <FormInput label="Contact" name="adminContact" value={form.adminContact} onChange={handleChange} type="tel" readOnly={readOnly} />
                </div>
            </section>

            {/* Documents */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Documents</h2>
                <hr className="mb-4 border-t border-gray-300" />
                {!readOnly && (
                    <UploadButton
                        label="Upload Contract"
                        name="docUpload"
                        //file={form.docUpload}
                        onChange={handleChange}
                        value="Upload GraspNest Contract Document."
                    />
                )}
            </section>
            {!readOnly && (
                <div className="flex">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mx-auto w-60 py-2 bg-blue-600 text-white font-semibold rounded disabled:opacity-50"
                    >
                        {isSubmitting ? (isCreate ? 'Creating' : 'Saving') : isCreate ? 'Create Organization' : 'Save Changes'}
                    </button>
                </div>
            )}
        </form>
    );
}
