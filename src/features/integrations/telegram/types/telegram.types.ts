export type ConnectTelegramInput = {
	businessId: string;
	botToken: string;
};

export type DisconnectTelegramInput = {
	businessId: string;
};

export type TelegramReplyInput = {
	leadId: string;
	message: string;
};

export type TelegramThreadMessage = {
	id: string;
	text: string;
	senderName?: string;
	createdAt?: string;
};

export type MessageResponse = {
	message: string;
};
