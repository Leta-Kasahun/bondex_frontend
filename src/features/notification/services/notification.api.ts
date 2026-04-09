import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPatch } from "@/src/features/shared/services";
import {
	type NotificationItem,
	type NotificationListQuery,
	type UnreadCountResponse,
} from "../types/notification.types";

export const listNotifications = (params?: NotificationListQuery) =>
	requestGet<NotificationItem[]>(API_ROUTES.NOTIFICATIONS.BASE, { params });

export const getUnreadNotificationCount = (params?: NotificationListQuery) =>
	requestGet<UnreadCountResponse>(`${API_ROUTES.NOTIFICATIONS.BASE}/unread-count`, { params });

export const markNotificationAsRead = (notificationId: string) =>
	requestPatch<NotificationItem>(`${API_ROUTES.NOTIFICATIONS.BASE}/${notificationId}/read`);
