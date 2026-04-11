import { type BaseEntity } from "@/src/types";
import { APP_CONSTANTS } from "@/src/constants/config";

type ValueOf<T> = T[keyof T];

export type LeadStatus = ValueOf<typeof APP_CONSTANTS.LEAD_STATUS>;
export type LeadPriority = ValueOf<typeof APP_CONSTANTS.LEAD_PRIORITY>;
export type LeadPlatform = ValueOf<typeof APP_CONSTANTS.PLATFORM>;

export type Lead = BaseEntity & {
	businessId: string;
	customerName?: string | null;
	customerEmail?: string | null;
	customerPhone?: string | null;
	message: string;
	status: LeadStatus;
	priority: LeadPriority;
	platform: LeadPlatform;
	aiScore?: number | null;
	aiReasoning?: string | null;
	platformUserId?: string | null;
	firstReplyAt?: string | null;
	responseTimeMinutes?: number | null;
};

export type LeadNote = {
	id: string;
	leadId: string;
	authorId: string;
	content: string;
	createdAt: string;
};

export type CreateLeadInput = {
	businessId: string;
	message: string;
	customerName?: string;
	customerEmail?: string;
	customerPhone?: string;
	status?: LeadStatus;
	priority?: LeadPriority;
};

export type UpdateLeadInput = {
	message?: string;
	customerName?: string;
	customerEmail?: string;
	customerPhone?: string;
	status?: LeadStatus;
	priority?: LeadPriority;
	platform?: LeadPlatform;
};

export type LeadNoteInput = {
	content: string;
};

export type LeadListQuery = {
	businessId: string;
	page?: number;
	limit?: number;
	search?: string;
	status?: LeadStatus;
	priority?: LeadPriority;
	platform?: LeadPlatform;
};
