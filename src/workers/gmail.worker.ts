import { API_ROUTES } from "../config/api";
import { clientApi } from "../lib/api/client";
import { createIntervalWorker, type WorkerController } from "./scheduler";

type GmailStatus = {
	businessId: string;
	connected: boolean;
	email: string | null;
};

type GmailWorkerOptions = {
	businessId: string;
	intervalMs?: number;
	onStatus?: (status: GmailStatus) => void;
	onError?: (error: unknown) => void;
};

const DEFAULT_GMAIL_INTERVAL_MS = 60 * 1000;

const getStatusFromResponse = (payload: unknown): GmailStatus => {
	const data = payload as { data?: GmailStatus } & Partial<GmailStatus>;
	return (data.data ?? data) as GmailStatus;
};

export const createGmailStatusWorker = (options: GmailWorkerOptions): WorkerController => {
	const intervalMs = options.intervalMs ?? DEFAULT_GMAIL_INTERVAL_MS;

	return createIntervalWorker(intervalMs, async () => {
		try {
			const response = await clientApi.get(
				`${API_ROUTES.GMAIL.BASE}/status/${options.businessId}`
			);
			options.onStatus?.(getStatusFromResponse(response.data));
		} catch (error) {
			options.onError?.(error);
		}
	});
};
