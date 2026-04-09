export type GmailStatus = {
	businessId: string;
	connected: boolean;
	email: string | null;
};

export type DisconnectGmailInput = {
	businessId: string;
};

export type GmailReplyInput = {
	leadId: string;
	message: string;
};

export type MessageResponse = {
	message: string;
};
