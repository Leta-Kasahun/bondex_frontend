import {
	blockAdminUser,
	deleteAdminUser,
	getAdminSystemStats,
	getAdminUserDetails,
	listAdminUsers,
	unblockAdminUser,
} from "../services";
import { type AdminUserListQuery } from "../types/admin.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const ADMIN_USERS_KEY = buildFeatureKey("admin", "users");
const ADMIN_STATS_KEY = buildFeatureKey("admin", "stats");

export const useAdminUsers = (params?: AdminUserListQuery) =>
	useFeatureQuery({
		queryKey: [...ADMIN_USERS_KEY, JSON.stringify(params ?? {})],
		queryFn: () => listAdminUsers(params),
	});

export const useAdminUserDetails = (userId?: string) =>
	useFeatureQuery({
		queryKey: buildFeatureKey("admin", "user", userId),
		queryFn: () => getAdminUserDetails(userId as string),
		enabled: Boolean(userId),
	});

export const useAdminSystemStats = () =>
	useFeatureQuery({
		queryKey: ADMIN_STATS_KEY,
		queryFn: getAdminSystemStats,
	});

export const useBlockAdminUser = () =>
	useFeatureMutation((userId: string) => blockAdminUser(userId), {
		invalidateKeys: [ADMIN_USERS_KEY, ADMIN_STATS_KEY],
	});

export const useUnblockAdminUser = () =>
	useFeatureMutation((userId: string) => unblockAdminUser(userId), {
		invalidateKeys: [ADMIN_USERS_KEY, ADMIN_STATS_KEY],
	});

export const useDeleteAdminUser = () =>
	useFeatureMutation((userId: string) => deleteAdminUser(userId), {
		invalidateKeys: [ADMIN_USERS_KEY, ADMIN_STATS_KEY],
	});
