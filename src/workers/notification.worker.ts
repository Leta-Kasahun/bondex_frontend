import { API_ROUTES } from "../config/api";
import { clientApi } from "../lib/api/client";
import { createIntervalWorker, type WorkerController } from "./scheduler";

type NotificationWorkerOptions = {
	businessId?: string;
	intervalMs?: number;
	onUnreadCount?: (count: number) => void;
	onError?: (error: unknown) => void;
};

const DEFAULT_NOTIFICATION_INTERVAL_MS = 5 * 60 * 1000;

const getUnreadCountFromResponse = (payload: unknown): number => {
	const data = payload as
		| { unreadCount?: number; data?: { unreadCount?: number; count?: number }; count?: number }
		| undefined;

	return data?.data?.unreadCount ?? data?.data?.count ?? data?.unreadCount ?? data?.count ?? 0;
};

export const createNotificationWorker = (
	options: NotificationWorkerOptions = {}
): WorkerController => {
	const intervalMs = options.intervalMs ?? DEFAULT_NOTIFICATION_INTERVAL_MS;

	return createIntervalWorker(intervalMs, async () => {
		try {
			const response = await clientApi.get(`${API_ROUTES.NOTIFICATIONS.BASE}/unread-count`, {
				params: options.businessId ? { businessId: options.businessId } : undefined,
			});

			options.onUnreadCount?.(getUnreadCountFromResponse(response.data));
		} catch (error) {
			options.onError?.(error);
		}
	});
};
