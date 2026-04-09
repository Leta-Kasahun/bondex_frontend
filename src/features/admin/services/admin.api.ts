import { API_ROUTES } from "@/src/config/api";
import {
	requestDelete,
	requestGet,
	requestPatch,
} from "@/src/features/shared/services";
import {
	type AdminSystemStats,
	type AdminUser,
	type AdminUserListQuery,
	type MessageResponse,
} from "../types/admin.types";

export const listAdminUsers = (params?: AdminUserListQuery) =>
	requestGet<AdminUser[]>(`${API_ROUTES.ADMIN.BASE}/users`, { params });

export const getAdminUserDetails = (userId: string) =>
	requestGet<AdminUser>(`${API_ROUTES.ADMIN.BASE}/users/${userId}`);

export const blockAdminUser = (userId: string) =>
	requestPatch<MessageResponse>(`${API_ROUTES.ADMIN.BASE}/users/${userId}/block`);

export const unblockAdminUser = (userId: string) =>
	requestPatch<MessageResponse>(`${API_ROUTES.ADMIN.BASE}/users/${userId}/unblock`);

export const deleteAdminUser = (userId: string) =>
	requestDelete<MessageResponse>(`${API_ROUTES.ADMIN.BASE}/users/${userId}`);

export const getAdminSystemStats = () =>
	requestGet<AdminSystemStats>(`${API_ROUTES.ADMIN.BASE}/stats/system`);
