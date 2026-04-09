import {
	getPublicBusinessById,
	listPublicBusinesses,
	submitPublicContact,
} from "../services";
import { type PublicContactInput } from "../types/public.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const PUBLIC_BUSINESS_KEY = buildFeatureKey("public", "businesses");

export const usePublicBusinesses = (params?: Record<string, unknown>) =>
	useFeatureQuery({
		queryKey: [...PUBLIC_BUSINESS_KEY, "list", JSON.stringify(params ?? {})],
		queryFn: () => listPublicBusinesses(params),
	});

export const usePublicBusiness = (businessId?: string) =>
	useFeatureQuery({
		queryKey: [...PUBLIC_BUSINESS_KEY, businessId],
		queryFn: () => getPublicBusinessById(businessId as string),
		enabled: Boolean(businessId),
	});

export const useSubmitPublicContact = () =>
	useFeatureMutation((payload: PublicContactInput) => submitPublicContact(payload));
