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
	direction: string;
	message: string;
	read: boolean;
	createdAt: string;
};

export type MessageResponse = {
	message: string;
};
