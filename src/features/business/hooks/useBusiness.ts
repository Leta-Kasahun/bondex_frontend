import {
	createBusiness,
	deleteBusiness,
	getBusinessById,
	listBusinesses,
	updateBusiness,
} from "../services";
import {
	type BusinessListQuery,
	type CreateBusinessInput,
	type UpdateBusinessInput,
} from "../types/business.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const BUSINESS_LIST_KEY = buildFeatureKey("business", "list");

export const useBusinesses = (params?: BusinessListQuery, enabled = true) =>
	useFeatureQuery({
		queryKey: [...BUSINESS_LIST_KEY, JSON.stringify(params ?? {})],
		queryFn: () => listBusinesses(params),
		enabled,
	});

export const useBusiness = (businessId?: string) =>
	useFeatureQuery({
		queryKey: buildFeatureKey("business", "detail", businessId),
		queryFn: () => getBusinessById(businessId as string),
		enabled: Boolean(businessId),
	});

export const useCreateBusiness = () =>
	useFeatureMutation((payload: CreateBusinessInput) => createBusiness(payload), {
		invalidateKeys: [BUSINESS_LIST_KEY],
	});

export const useUpdateBusiness = () =>
	useFeatureMutation(
		(input: { businessId: string; payload: UpdateBusinessInput }) =>
			updateBusiness(input.businessId, input.payload),
		{ invalidateKeys: [BUSINESS_LIST_KEY] }
	);

export const useDeleteBusiness = () =>
	useFeatureMutation((businessId: string) => deleteBusiness(businessId), {
		invalidateKeys: [BUSINESS_LIST_KEY],
	});
