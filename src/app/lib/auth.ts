// src/app/lib/auth.ts

import { ApiResponse, sendApiRequest } from './api';

export interface SignInResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    session_state: string;
    scope: string;
}

export async function signIn(username: string, password: string,rememberMe: True): Promise<ApiResponse<SignInResponse>> {
    const signInUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
    const signInResponse = await sendApiRequest(signInUrl, 'POST', { username, password });
    if (signInResponse && signInResponse.access_token) {
         this.storageService.saveRememberMe(rememberMe);
         this.storageService.saveToken(response.data.access_token, rememberMe);
         this.storageService.saveRefreshToken(response.data.refresh_token, rememberMe);
    }
}
