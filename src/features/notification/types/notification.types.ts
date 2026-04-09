import { type BaseEntity } from "@/src/types";

export type NotificationItem = BaseEntity & {
	leadId?: string | null;
	type: string;
	title: string;
	body: string;
	readAt?: string | null;
};

export type NotificationListQuery = Record<string, unknown>;

export type UnreadCountResponse = {
	unreadCount: number;
};
