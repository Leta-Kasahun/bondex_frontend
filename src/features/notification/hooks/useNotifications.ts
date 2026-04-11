import {
	getUnreadNotificationCount,
	listNotifications,
	markNotificationAsRead,
} from "../services";
import { type NotificationListQuery } from "../types/notification.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const NOTIFICATION_LIST_KEY = buildFeatureKey("notifications", "list");
const NOTIFICATION_UNREAD_KEY = buildFeatureKey("notifications", "unread");

export const useNotifications = (params?: NotificationListQuery, enabled = true) =>
	useFeatureQuery({
		queryKey: [...NOTIFICATION_LIST_KEY, JSON.stringify(params ?? {})],
		queryFn: () => listNotifications(params),
		enabled,
	});

export const useUnreadNotificationCount = (params?: NotificationListQuery, enabled = true) =>
	useFeatureQuery({
		queryKey: [...NOTIFICATION_UNREAD_KEY, JSON.stringify(params ?? {})],
		queryFn: () => getUnreadNotificationCount(params),
		enabled,
	});

export const useMarkNotificationAsRead = () =>
	useFeatureMutation((notificationId: string) => markNotificationAsRead(notificationId), {
		invalidateKeys: [NOTIFICATION_LIST_KEY, NOTIFICATION_UNREAD_KEY],
	});
