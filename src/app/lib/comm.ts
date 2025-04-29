// src/app/lib/admin.ts

import { ApiResponse, sendApiRequest } from './api';

export interface landlordDetailsDto {
    commId: number;
    commName: string;
    landlordFirstName: string;
    landlordLastName: string;
    unitsCount: number;
    blocksCount: number;
    blockName: string;
    landlordsCount: number;
    tenantsCount: number;
}

export interface commDashboardData {
    totals: {
        landlords: number;
        tenants: number;
        unitsCount: number;
        blocksCount: number;
    };
    commlandlordDetails: landlordDetailsDto[];
}

export async function fetchCommDashboard(): Promise<ApiResponse<commDashboardData>> {
    //console.log("Inside lib fetchCommDashboard")
    const fetchCommDashboardUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/community/dashboard`;
    const fetchCommDashboardResponseJson = await sendApiRequest(fetchCommDashboardUrl, 'GET');
    return fetchCommDashboardResponseJson.data;
}
