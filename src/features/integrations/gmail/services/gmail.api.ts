import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost } from "@/src/features/shared/services";
import {
	type DisconnectGmailInput,
	type GmailReplyInput,
	type GmailStatus,
	type MessageResponse,
} from "../types/gmail.types";

export const getGmailConnectionStatus = (businessId: string) =>
	requestGet<GmailStatus>(`${API_ROUTES.GMAIL.BASE}/status/${businessId}`);

export const disconnectGmail = (payload: DisconnectGmailInput) =>
	requestPost<MessageResponse, DisconnectGmailInput>(`${API_ROUTES.GMAIL.BASE}/disconnect`, payload);

export const sendGmailReply = (payload: GmailReplyInput) =>
	requestPost<MessageResponse, GmailReplyInput>(`${API_ROUTES.GMAIL.BASE}/reply`, payload);
