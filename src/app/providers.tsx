// app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export function Providers({ children, session }: { children: ReactNode; session?: Session }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}
