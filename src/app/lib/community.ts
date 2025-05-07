// src/app/lib/community.ts

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

export interface CommDto {
    commName: string;
    commType: string;
    blockNum: number;
    unitsinBlock: number;
    commAddress: string;
    commCity: string;
    commState: string;
    commCountry: string;
    commAdminFirst: string;
    commAdminLast: string;
    commAdminEmail: string;
    commAdminContact: string;
    orgName: string;
}

export interface CreateCommDto {
    commName: string;
    commType: string;
    blockNum: number;
    unitsinBlock: number;
    commAddress: string;
    commCity: string;
    commState: string;
    commCountry: string;
    commAdminFirst: string;
    commAdminLast: string;
    commAdminEmail: string;
    commAdminContact: string;
    orgName: string;
}

export interface UpdateCommDto extends CreateCommDto {}

export async function fetchCommDashboard(): Promise<ApiResponse<commDashboardData>> {
    //console.log("Inside lib fetchCommDashboard")
    const fetchCommDashboardUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/community/dashboard`;
    const fetchCommDashboardResponseJson = await sendApiRequest(fetchCommDashboardUrl, 'GET');
    return fetchCommDashboardResponseJson.data;
}

//CREATE
export function createComm(data: CreateCommDto): Promise<ApiResponse<CommDto>> {
    console.log('Inside lib createComm');
    console.log('Creating community with data:', data);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/community`, 'POST', data);
}

//   // DELETE
export function deleteComm(id: string): Promise<ApiResponse<null>> {
    console.log('Inside lib DeleteComm');
    console.log('id', id);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, 'DELETE');
}

//   // UPDATE
export function updateComm(id: string, data: UpdateCommDto): Promise<ApiResponse<CommDto>> {
    console.log('Inside lib UpdateComm');
    console.log('id', id);
    console.log('data', data);
    return sendApiRequest(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${id}`, 'PUT', data);
}
