// src/app/lib/authOptions.ts

import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { jwtDecode } from 'jwt-decode';

// ==== 1) ENVIRONMENT VALIDATION ====
const { NEXT_PUBLIC_API_URL, NEXTAUTH_SECRET } = process.env;
if (!NEXT_PUBLIC_API_URL) {
    throw new Error('Missing env var NEXT_PUBLIC_API_URL');
}
if (!NEXTAUTH_SECRET) {
    throw new Error('Missing env var NEXTAUTH_SECRET');
}

// ==== 2) TYPES ====
interface KeycloakToken {
    realm_access?: {
        roles: string[];
    };
    resource_access?: {
        [client: string]: { roles: string[] };
    };
    name?: string;
}

interface SignInResponse {
    access_token: string;
    expires_in: number; // seconds
    refresh_expires_in: number; // seconds
    refresh_token: string;
}

interface ApiResponse<T> {
    message?: string;
    data?: T;
    result?: boolean;
}

type AuthUser = User & {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    roles: string[];
};

declare module 'next-auth' {
    interface Session {
        user: AuthUser;
    }
    interface JWT {
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        roles: string[];
    }
}

// ==== 3) HELPERS ====
async function loginWithCredentials(email: string, password: string) {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
    });
    const json: ApiResponse<SignInResponse> = await res.json();
    if (!res.ok || !json.result || !json.data) {
        throw new Error(json.message || 'Invalid credentials');
    }
    return json.data;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
    console.log('Before Refreshing access token', token.refereshToken);

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/auth/refreshtoken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
    });
    const json: ApiResponse<SignInResponse> = await res.json();
    if (!res.ok || !json.result || !json.data) {
        throw new Error('Unable to refresh access token');
    }
    const { access_token, refresh_token, expires_in } = json.data;
    console.log('After Refreshing access token', json.data);
    return {
        ...token,
        accessToken: access_token,
        refreshToken: refresh_token,
        accessTokenExpires: Date.now() + expires_in * 1000,
    };
}

// ==== 4) NEXTAUTH CONFIG ====
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email & Password',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(creds) {
                if (!creds?.email || !creds.password) {
                    throw new Error('Email and password required');
                }

                const data = await loginWithCredentials(creds.email, creds.password);

                //decode roles from the returned token
                const decoded = jwtDecode<KeycloakToken>(data.access_token);
                const roles = decoded.resource_access?.[process.env.KEYCLOAK_CLIENT_ID!]?.roles || [];
                const name = decoded?.name || '';

                // “user” object for NextAuth
                return {
                    email: creds.email,
                    name: name,
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token,
                    accessTokenExpires: Date.now() + data.expires_in * 1000,
                    roles,
                } as AuthUser;
            },
        }),
    ],

    session: { strategy: 'jwt' },
    secret: NEXTAUTH_SECRET,

    callbacks: {
        // Persist tokens + roles on initial sign-in, refresh if expired
        async jwt({ token, user }) {
            console.log('From JWT');
            // console.log('jwt callback user', user);
            // console.log('jwt callback token', token);

            // user is only defined on the very first JWT callback (right after authorize() returns).
            // This is where we save the tokens and roles to the JWT.
            if (user) {
                return {
                    ...token,
                    accessToken: (user as AuthUser).accessToken,
                    refreshToken: (user as AuthUser).refreshToken,
                    accessTokenExpires: (user as AuthUser).accessTokenExpires,
                    roles: (user as AuthUser).roles,
                    name: (user as AuthUser).name,
                    email: (user as AuthUser).email,
                };
            }
            // check if token still valid?
            // pageload or  client call to useSession() or getToken().
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }
            // expired → refresh
            return refreshAccessToken(token);
        },

        // Expose tokens + roles to the client `useSession()`
        async session({ session, token }) {
            console.log('From Session');
            // console.log('session callback token', token);
            // console.log(' begin session', session);
            session.user.accessToken = token.accessToken as string;
            session.user.refreshToken = token.refreshToken as string;
            session.user.accessTokenExpires = token.accessTokenExpires as number;
            session.user.roles = token.roles as string[];
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            //console.log('after assign callback session', session);
            return session;
        },
    },

    pages: {
        signIn: '/login',
        error: '/auth/error', // your client‐side error page
    },
};
