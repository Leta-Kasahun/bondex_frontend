import { convertLeadToDeal, deleteDeal, listDeals, updateDealStage } from "../services";
import {
	type ConvertLeadToDealInput,
	type DealListQuery,
	type UpdateDealStageInput,
} from "../types/deal.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const DEAL_LIST_KEY = buildFeatureKey("deals", "list");

export const useDeals = (params?: DealListQuery, enabled = true) =>
	useFeatureQuery({
		queryKey: [...DEAL_LIST_KEY, JSON.stringify(params ?? {})],
		queryFn: () => listDeals(params),
		enabled,
	});

export const useConvertLeadToDeal = () =>
	useFeatureMutation((payload: ConvertLeadToDealInput) => convertLeadToDeal(payload), {
		invalidateKeys: [DEAL_LIST_KEY],
	});

export const useUpdateDealStage = () =>
	useFeatureMutation(
		(input: { dealId: string; payload: UpdateDealStageInput }) =>
			updateDealStage(input.dealId, input.payload),
		{ invalidateKeys: [DEAL_LIST_KEY] }
	);

export const useDeleteDeal = () =>
	useFeatureMutation((dealId: string) => deleteDeal(dealId), {
		invalidateKeys: [DEAL_LIST_KEY],
	});
