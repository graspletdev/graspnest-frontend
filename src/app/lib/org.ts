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

export interface OrgDto {
    orgId: string;
    orgName: string;
    orgType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    regNum: string;
    vatID: string;
    website: string;
    adminFirst: string;
    adminLast: string;
    adminEmail: string;
    adminContact: string;
    logo?: string;
    docUpload?: string;
}

export interface CreateOrgDto {
    orgName: string;
    orgType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    regNum: string;
    vatID: string;
    website: string;
    adminFirst: string;
    adminLast: string;
    adminEmail: string;
    adminContact: string;
    logo?: string;
    docUpload?: string;
}

export interface UpdateOrgDto extends CreateOrgDto {}

export async function fetchOrgDashboard(): Promise<ApiResponse<orgDashboardData>> {
    //console.log("Inside lib fetchOrgDashboard")
    const fetchOrgDashboardUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/org/dashboard`;
    const fetchOrgDashboardResponseJson = await sendApiRequest(fetchOrgDashboardUrl, 'GET');
    return fetchOrgDashboardResponseJson.data;
}

//CREATE
export function createOrg(data: CreateOrgDto): Promise<ApiResponse<OrgDto>> {
    //console.log("Inside lib createOrg")
    //console.log('Creating organization with data:', data);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/org`, 'POST', data);
}

// LIST
// export function listOrgs(): Promise<ApiResponse<OrgDto[]>> {
//     return sendApiRequest('/api/organizations', 'GET');
//   }

//   // READ
export function getOrg(id: string): Promise<ApiResponse<OrgDto>> {
    console.log('Inside lib getOrg');
    console.log('id', id);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/org/${id}`, 'GET');
}

//   // UPDATE
export function updateOrg(id: string, data: UpdateOrgDto): Promise<ApiResponse<OrgDto>> {
    console.log('Inside lib UpdateOrg');
    console.log('id', id);
    console.log('data', data);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/org/${id}`, 'PUT', data);
}

//   // DELETE
//   export function deleteOrg(id: string): Promise<ApiResponse<null>> {
//     return sendApiRequest(`/api/organizations/${id}`, 'DELETE');
//   }
