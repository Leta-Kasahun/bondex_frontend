import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost } from "@/src/features/shared/services";
import {
	type MessageResponse,
	type PublicBusiness,
	type PublicContactInput,
} from "../types/public.types";

export const listPublicBusinesses = (params?: Record<string, unknown>) =>
	requestGet<PublicBusiness[]>(`${API_ROUTES.PUBLIC.BASE}/businesses`, { params });

export const getPublicBusinessById = (businessId: string) =>
	requestGet<PublicBusiness>(`${API_ROUTES.PUBLIC.BASE}/businesses/${businessId}`);

export const submitPublicContact = (payload: PublicContactInput) =>
	requestPost<MessageResponse, PublicContactInput>(`${API_ROUTES.PUBLIC.BASE}/contact`, payload);
