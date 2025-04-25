// src/app/auth/error/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorCode = searchParams.get('error') || 'Unknown';

    useEffect(() => {
        // Map NextAuth error codes to friendly messages
        const messages: Record<string, string> = {
            Signin: 'Try signing in again.',
            OAuthSignin: 'OAuth sign-in failed.',
            CredentialsSignin: 'Invalid email or password.',
            Callback: 'Callback handler error.',
            OAuthCallback: 'OAuth callback error.',
            OAuthCreateAccount: 'Could not create OAuth account.',
            EmailCreateAccount: 'Could not create Email account.',
            EmailSignin: 'Email sign-in failed.',
            SessionRequired: 'Please sign in to access this page.',
        };
        Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: messages[errorCode] || `Unknown error: ${errorCode}`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#1CAEC2',
        }).then(() => {
            // After dismiss, send them back to the login form
            router.push('/login');
        });
    }, [errorCode, router]);

    // Render nothing (or a spinner) since we immediately redirect
    return null;
}
