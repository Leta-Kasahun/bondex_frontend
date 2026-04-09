import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost } from "@/src/features/shared/services";
import {
	type ConnectTelegramInput,
	type DisconnectTelegramInput,
	type MessageResponse,
	type TelegramReplyInput,
	type TelegramThreadMessage,
} from "../types/telegram.types";

export const connectTelegram = (payload: ConnectTelegramInput) =>
	requestPost<MessageResponse, ConnectTelegramInput>(`${API_ROUTES.TELEGRAM.BASE}/connect`, payload);

export const disconnectTelegram = (payload: DisconnectTelegramInput) =>
	requestPost<MessageResponse, DisconnectTelegramInput>(
		`${API_ROUTES.TELEGRAM.BASE}/disconnect`,
		payload
	);

export const sendTelegramReply = (payload: TelegramReplyInput) =>
	requestPost<MessageResponse, TelegramReplyInput>(`${API_ROUTES.TELEGRAM.BASE}/reply`, payload);

export const getTelegramThread = (leadId: string) =>
	requestGet<TelegramThreadMessage[]>(`${API_ROUTES.TELEGRAM.BASE}/leads/${leadId}/thread`);
