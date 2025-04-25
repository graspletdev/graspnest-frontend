// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Roles } from '@/app/constants';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from 'next-auth/react';

// Define types for each form
type LoginInputs = {
    email: string;
    password: string;
};

type KeycloakToken = {
    resource_access?: {
        GraspNestClient?: { roles?: string[] };
    };
    // add other claims as needed
};

export default function LoginPage() {
    const { register, handleSubmit } = useForm<LoginInputs>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm<LoginInputs>();

    const onLoginSubmit: SubmitHandler<LoginInputs> = async (data) => {
        setLoading(true);
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });
        setLoading(false);
        //console.log('res', res);
        const session = await getSession();
        const roles = session?.user.roles || [];
        //console.log('session from login', session);
        //console.log('roles', roles);
        if (roles.includes('SuperAdmin')) {
            return router.push('/pages/superadmin');
        }

        if (res?.error) {
            return Swal.fire({
                icon: 'error',
                text: res.error,
                confirmButtonColor: '#1CAEC2',
            });
        }
    };

    return (
        <div className="w-full bg-red-400 h-[100px]">
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold text-white">Welcome to GraspNest</h1>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-sm p-6 bg-white rounded shadow">
                    <div className="flex mb-4 justify-center">Login</div>

                    <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email-login"
                                placeholder="Email Address"
                                {...registerLogin('email', { required: 'Email is required' })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                            />
                            {errorsLogin.email && <p className="text-red-500 text-xs mt-1">{errorsLogin.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password-login"
                                placeholder="Password"
                                {...registerLogin('password', { required: 'Password is required' })}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 font-sans"
                            />
                            {errorsLogin.password && <p className="text-red-500 text-xs mt-1">{errorsLogin.password.message}</p>}
                            <div className="ml-1 font-bold pt-2 text-blue-500">
                                <a href="/forgotpassword">Forgot Password?</a>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 font-bold rounded hover:bg-blue-600 transition-colors duration-200">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
