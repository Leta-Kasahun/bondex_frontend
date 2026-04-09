import { type BaseEntity } from "@/src/types";

export type Lead = BaseEntity & {
	businessId: string;
	customerName: string;
	customerEmail?: string | null;
	message: string;
	status?: string;
	priority?: string;
	platform?: string;
};

export type LeadNote = BaseEntity & {
	leadId: string;
	note: string;
};

export type CreateLeadInput = Record<string, unknown>;
export type UpdateLeadInput = Record<string, unknown>;
export type LeadNoteInput = {
	note: string;
};
export type LeadListQuery = Record<string, unknown>;
