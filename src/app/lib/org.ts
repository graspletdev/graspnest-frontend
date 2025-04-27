// src/app/lib/admin.ts

import { ApiResponse, sendApiRequest } from './api';

export interface CommDetailsDto {
    orgId: number;
    orgName: string;
    commName: string;
    commAdminFirstName: string;
    commAdminLastName: string;
    communitiesCount: number;
    landlordsCount: number;
    tenantsCount: number;
}

export interface orgDashboardData {
    totals: {
        communities: number;
        landlords: number;
        tenants: number;
    };
    orgCommDetails: CommDetailsDto[];
}

export async function fetchOrgDashboard(): Promise<ApiResponse<orgDashboardData>> {
    //console.log("Inside lib fetchOrgDashboard")
    const fetchOrgDashboardUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/org/dashboard`;
    const fetchOrgDashboardResponseJson = await sendApiRequest(fetchOrgDashboardUrl, 'GET');
    return fetchOrgDashboardResponseJson.data;
}
