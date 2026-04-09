import {
	disconnectGmail,
	getGmailConnectionStatus,
	sendGmailReply,
} from "../services";
import { type DisconnectGmailInput, type GmailReplyInput } from "../types/gmail.types";
import {
	buildFeatureKey,
	useFeatureMutation,
	useFeatureQuery,
} from "@/src/features/shared/hooks";

const GMAIL_STATUS_KEY = buildFeatureKey("integrations", "gmail", "status");

export const useGmailConnectionStatus = (businessId?: string) =>
	useFeatureQuery({
		queryKey: [...GMAIL_STATUS_KEY, businessId],
		queryFn: () => getGmailConnectionStatus(businessId as string),
		enabled: Boolean(businessId),
	});

export const useDisconnectGmail = () =>
	useFeatureMutation((payload: DisconnectGmailInput) => disconnectGmail(payload), {
		invalidateKeys: [GMAIL_STATUS_KEY],
	});

export const useSendGmailReply = () =>
	useFeatureMutation((payload: GmailReplyInput) => sendGmailReply(payload));
