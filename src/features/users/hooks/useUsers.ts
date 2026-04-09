import {
	confirmUserEmailChange,
	getUserProfile,
	getUserStats,
	requestUserEmailChange,
	updateUserProfile,
} from "../services";
import {
	type ConfirmEmailChangeInput,
	type RequestEmailChangeInput,
	type UpdateUserProfileInput,
} from "../types/user.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const USER_PROFILE_KEY = buildFeatureKey("users", "profile");
const USER_STATS_KEY = buildFeatureKey("users", "stats");

export const useUserProfile = () =>
	useFeatureQuery({
		queryKey: USER_PROFILE_KEY,
		queryFn: getUserProfile,
	});

export const useUserStats = () =>
	useFeatureQuery({
		queryKey: USER_STATS_KEY,
		queryFn: getUserStats,
	});

export const useUpdateUserProfile = () =>
	useFeatureMutation((payload: UpdateUserProfileInput) => updateUserProfile(payload), {
		invalidateKeys: [USER_PROFILE_KEY],
	});

export const useRequestUserEmailChange = () =>
	useFeatureMutation((payload: RequestEmailChangeInput) => requestUserEmailChange(payload));

export const useConfirmUserEmailChange = () =>
	useFeatureMutation((payload: ConfirmEmailChangeInput) => confirmUserEmailChange(payload), {
		invalidateKeys: [USER_PROFILE_KEY],
	});
