import {
	connectTelegram,
	disconnectTelegram,
	getTelegramThread,
	sendTelegramReply,
} from "../services";
import {
	type ConnectTelegramInput,
	type DisconnectTelegramInput,
	type TelegramReplyInput,
} from "../types/telegram.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const TELEGRAM_THREAD_KEY = buildFeatureKey("integrations", "telegram", "thread");

export const useTelegramThread = (leadId?: string) =>
	useFeatureQuery({
		queryKey: [...TELEGRAM_THREAD_KEY, leadId],
		queryFn: () => getTelegramThread(leadId as string),
		enabled: Boolean(leadId),
	});

export const useConnectTelegram = () =>
	useFeatureMutation((payload: ConnectTelegramInput) => connectTelegram(payload));

export const useDisconnectTelegram = () =>
	useFeatureMutation((payload: DisconnectTelegramInput) => disconnectTelegram(payload));

export const useSendTelegramReply = () =>
	useFeatureMutation((payload: TelegramReplyInput) => sendTelegramReply(payload), {
		invalidateKeys: [TELEGRAM_THREAD_KEY],
	});
