import { API_ROUTES } from "@/src/config/api";
import { clientApi } from "@/src/lib/api/client";
import {
	requestDelete,
	requestGet,
	requestPatch,
} from "@/src/features/shared/services";
import {
	type AdminSystemStatsQuery,
	type AdminSystemStats,
	type AdminUserDetails,
	type AdminUserListMeta,
	type AdminUserListResponse,
	type AdminUser,
	type AdminUserListQuery,
	type MessageResponse,
} from "../types/admin.types";

type ApiEnvelope<T> = {
	data: T;
	meta?: AdminUserListMeta;
	message?: string;
	success?: boolean;
};

export const listAdminUsers = async (params?: AdminUserListQuery): Promise<AdminUserListResponse> => {
	const response = await clientApi.get<ApiEnvelope<AdminUser[]>>(`${API_ROUTES.ADMIN.BASE}/users`, {
		params,
	});

	return {
		items: response.data.data ?? [],
		meta: response.data.meta ?? {
			total: 0,
			page: params?.page ?? 1,
			limit: params?.limit ?? 10,
			offset: 0,
		},
	};
};

export const getAdminUserDetails = (userId: string) =>
	requestGet<AdminUserDetails>(`${API_ROUTES.ADMIN.BASE}/users/${userId}`);

export const blockAdminUser = (userId: string) =>
	requestPatch<AdminUser>(`${API_ROUTES.ADMIN.BASE}/users/${userId}/block`);

export const unblockAdminUser = (userId: string) =>
	requestPatch<AdminUser>(`${API_ROUTES.ADMIN.BASE}/users/${userId}/unblock`);

export const deleteAdminUser = (userId: string) =>
	requestDelete<MessageResponse>(`${API_ROUTES.ADMIN.BASE}/users/${userId}`);

export const getAdminSystemStats = (params?: AdminSystemStatsQuery) =>
	requestGet<AdminSystemStats>(`${API_ROUTES.ADMIN.BASE}/stats/system`, { params });
