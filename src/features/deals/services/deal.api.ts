import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost, requestPut } from "@/src/features/shared/services";
import {
	type ConvertLeadToDealInput,
	type Deal,
	type DealListQuery,
	type UpdateDealStageInput,
} from "../types/deal.types";

export const convertLeadToDeal = (payload: ConvertLeadToDealInput) =>
	requestPost<Deal, ConvertLeadToDealInput>(`${API_ROUTES.DEALS.BASE}/convert`, payload);

export const listDeals = (params?: DealListQuery) =>
	requestGet<Deal[]>(API_ROUTES.DEALS.BASE, { params });

export const updateDealStage = (dealId: string, payload: UpdateDealStageInput) =>
	requestPut<Deal, UpdateDealStageInput>(`${API_ROUTES.DEALS.BASE}/${dealId}/stage`, payload);
