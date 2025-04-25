// src/app/lib/admin.ts

import { ApiResponse, sendApiRequest } from './api';

export interface OrgDetailsDto {
    orgId: string;
    orgName: string;
    orgAdminFirstName: string;
    orgAdminLastName: string;
    communitiesCount: number;
    landlordsCount: number;
    tenantsCount: number;
}

export interface DashboardData {
    totals: {
        organizations: number;
        communities: number;
        landlords: number;
        tenants: number;
    };
    adminOrgDetails: OrgDetailsDto[];
}

export async function fetchDashboard(): Promise<ApiResponse<DashboardData>> {
    //console.log("Inside lib fetchDashboard")
    const fetchDashboardUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`;
    const fetchDashboardResponseJson = await sendApiRequest(fetchDashboardUrl, 'GET');
    return fetchDashboardResponseJson.data;
}
