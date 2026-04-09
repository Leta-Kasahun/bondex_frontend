import { API_ROUTES } from "@/src/config/api";
import {
	requestDelete,
	requestGet,
	requestPatch,
	requestPost,
} from "@/src/features/shared/services";
import {
	type Business,
	type BusinessListQuery,
	type CreateBusinessInput,
	type UpdateBusinessInput,
} from "../types/business.types";

export const createBusiness = (payload: CreateBusinessInput) =>
	requestPost<Business, CreateBusinessInput>(API_ROUTES.BUSINESSES.BASE, payload);

export const listBusinesses = (params?: BusinessListQuery) =>
	requestGet<Business[]>(API_ROUTES.BUSINESSES.BASE, { params });

export const getBusinessById = (businessId: string) =>
	requestGet<Business>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`);

export const updateBusiness = (businessId: string, payload: UpdateBusinessInput) =>
	requestPatch<Business, UpdateBusinessInput>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`, payload);

export const deleteBusiness = (businessId: string) =>
	requestDelete<{ message: string }>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`);
