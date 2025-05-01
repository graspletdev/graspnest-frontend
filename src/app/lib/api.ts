// src/app/lib/api.ts
import { getSession } from 'next-auth/react';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiResponse<T> {
    message?: string;
    data?: T;
    result?: boolean;
}

export class ApiError extends Error {
    public readonly statusCode: number;
    constructor(message: string, statusCode: number = 0) {
        super(message);
        //this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

export async function sendApiRequest(endpoint: string, method: HttpMethod, payload?: any): Promise<ApiResponse<T>> {
    // Api Request using Next.js fetch API
    try {
        const session = await getSession();
        const token = session?.user?.accessToken;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        console.log('token', token);
        console.log('session', session);
        console.log('session.user', session?.user);
        if (token) {
            console.log('Adding token', token);
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, {
            method,
            headers: headers,
            body: payload != null ? JSON.stringify(payload) : undefined,
            credentials: 'include',
        });

        const jsonData: ApiResponse<T> = await response.json();
        if (!response.ok || !jsonData.result) {
            throw new ApiError(jsonData.message || response.statusText, response.status);
        }

        return jsonData;
    } catch (err: any) {
        throw err;
    }
}
