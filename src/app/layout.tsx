import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// Server‐side imports:
import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'GraspNest',
    description: 'GraspNest Sign In',
    icons: {
        icon: '/grasplet.ico',
        shortcut: '/grasplet.ico',
        apple: '/grasplet.ico',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers session={session}>{children}</Providers>
            </body>
        </html>
    );
}
