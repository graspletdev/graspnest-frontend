//src/app/components/ClientError
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export interface ClientErrorProps {
    message: string;
    redirectTo?: string;
}

export default function ClientError({ message, redirectTo = '/' }: ClientErrorProps) {
    const router = useRouter();

    useEffect(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: message,
        }).then(() => {
            router.push(redirectTo);
        });
    }, [message, redirectTo, router]);

    // while waiting for the alert/redirect…
    return null;
}
