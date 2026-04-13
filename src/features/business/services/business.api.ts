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

type BusinessListPayload = Business[] | { items?: Business[]; data?: Business[] };

const normalizeBusinessList = (payload: BusinessListPayload): Business[] => {
	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload.items)) {
		return payload.items;
	}

	if (Array.isArray(payload.data)) {
		return payload.data;
	}

	return [];
};

export const createBusiness = (payload: CreateBusinessInput) =>
	requestPost<Business, CreateBusinessInput>(API_ROUTES.BUSINESSES.BASE, payload);

export const listBusinesses = async (params?: BusinessListQuery): Promise<Business[]> => {
	const queryParams = {
		page: 1,
		limit: 20,
		...(params ?? {}),
	};
	const payload = await requestGet<BusinessListPayload>(API_ROUTES.BUSINESSES.BASE, {
		params: queryParams,
	});
	return normalizeBusinessList(payload);
};

export const getBusinessById = (businessId: string) =>
	requestGet<Business>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`);

export const updateBusiness = (businessId: string, payload: UpdateBusinessInput) =>
	requestPatch<Business, UpdateBusinessInput>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`, payload);

export const deleteBusiness = (businessId: string) =>
	requestDelete<{ message: string }>(`${API_ROUTES.BUSINESSES.BASE}/${businessId}`);
