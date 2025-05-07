// src/app/components/community/CommForm.tsx
'use client';

import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';

export interface CommunityForm {
    commName: string;
    commType: string;
    blockNum: number;
    unitsinBlock: number;
    commAddress: string;
    commCity: string;
    commState: string;
    commCountry: string;
    commAdminFirst: string;
    commAdminLast: string;
    commAdminEmail: string;
    commAdminContact: string;
    orgName: string;
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
    name: keyof CommunityForm;
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

export interface CommFormProps {
    initialValues?: Partial<CommunityForm>;
    readOnly?: boolean;
    isSubmitting?: boolean;
    onSubmit: (values: CommunityForm) => Promise<void>;
    action?: 'create' | 'edit' | 'view';
}

export function CommForm({ initialValues = {}, readOnly = false, onSubmit, isSubmitting = false, action = 'create' }: CommFormProps) {
    const [form, setForm] = useState<CommunityForm>({
        commName: initialValues.commName || '',
        commType: initialValues.commType || '',
        blockNum: initialValues.blockNum || '',
        unitsinBlock: initialValues.unitsinBlock || '',
        commAddress: initialValues.commAddress || '',
        commCity: initialValues.commCity || '',
        commState: initialValues.commState || '',
        commCountry: initialValues.commCountry || '',
        commAdminFirst: initialValues.commAdminFirst || '',
        commAdminLast: initialValues.commAdminLast || '',
        commAdminEmail: initialValues.commAdminEmail || '',
        commAdminContact: initialValues.commAdminContact || '',
        orgName: initialValues.orgName || '',
    } as CommunityForm);
    //const [isSubmitting, setSubmitting] = useState(false);
    const isCreate = action === 'create';
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]: ['blockNum', 'unitsinBlock'].includes(name) ? Number(value) : value,
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
            {/* Community Details */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Community Details</h2>
                <hr className="mb-4 border-t border-gray-300" />
                <div className="mt-3 grid grid-cols-1 md:grid-cols-1 gap-4">
                    <FormInput label="Community Name" name="commName" value={form.commName} onChange={handleChange} required readOnly={readOnly} />

                    <div>
                        <label className="font-semibold text-sm mb-4 text-gray-600">
                            Community Type<span className="text-red-500">*</span>
                        </label>
                        <select
                            name="commType"
                            value={form.commType}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 p-2 rounded"
                            required
                            disabled={readOnly}
                        >
                            <option className="font-semibold text-sm mb-4 text-gray-600" value="">
                                Select type
                            </option>
                            <option value="res_complex">Residential Complex</option>
                            <option value="gated_community">Gated Community</option>
                            <option value="apartment">Apartment</option>
                            <option value="office">Office</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label="Number of Blocks/Buildings" name="blockNum" value={form.blockNum} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="Number of Units" name="unitsinBlock" value={form.unitsinBlock} onChange={handleChange} required readOnly={readOnly} />
                </div>
            </section>
            {/* Location */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Community Location</h2>
                <hr className="mb-4 border-t border-gray-300" />

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-semibold mb-2 text-gray-600">
                            Address<span className="text-red-500">*</span>
                        </h2>
                        <textarea
                            name="commAddress"
                            value={form.commAddress}
                            onChange={handleChange as any}
                            rows={3}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="Full address with postcode"
                            readOnly={readOnly}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput label="City" name="commCity" value={form.commCity} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="State" name="commState" value={form.commState} onChange={handleChange} required readOnly={readOnly} />
                    <FormInput label="Country" name="commCountry" value={form.commCountry} onChange={handleChange} required readOnly={readOnly} />
                </div>
            </section>
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Community Admin User</h2>
                <hr className="mb-4 border-t border-gray-300" />
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Community First Name"
                        name="commAdminFirst"
                        value={form.commAdminFirst}
                        onChange={handleChange}
                        required
                        readOnly={readOnly}
                    />
                    <FormInput
                        label="Community Last Name"
                        name="commAdminLast"
                        value={form.commAdminLast}
                        onChange={handleChange}
                        required
                        readOnly={readOnly}
                    />
                    <FormInput
                        label="Community Email"
                        name="commAdminEmail"
                        value={form.commAdminEmail}
                        onChange={handleChange}
                        required
                        readOnly={!isCreate}
                    />
                    <FormInput
                        label="Community Contact"
                        name="commAdminContact"
                        value={form.commAdminContact}
                        onChange={handleChange}
                        required
                        readOnly={readOnly}
                    />
                </div>
            </section>
            {/* Organization Information */}
            <section>
                <h2 className="font-semibold mb-2 text-gray-600">Organization Configuration</h2>
                <hr className="mb-4 border-t border-gray-300" />

                <div className="mt-3 grid grid-cols-1 md:grid-cols-1 gap-4">
                    <FormInput label="Organization Name" name="orgName" value={form.orgName} onChange={handleChange} required readOnly={readOnly} />
                </div>
            </section>
            {!readOnly && (
                <div className="flex">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mx-auto w-60 py-2 bg-blue-600 text-white font-semibold rounded disabled:opacity-50"
                    >
                        {isSubmitting ? (isCreate ? 'Creating' : 'Saving') : isCreate ? 'Create Community' : 'Save Changes'}
                    </button>
                </div>
            )}
        </form>
    );
}
