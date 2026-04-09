import { type BaseEntity } from "@/src/types";

export type Deal = BaseEntity & {
	leadId: string;
	stage: string;
	value?: number | null;
};

export type ConvertLeadToDealInput = {
	leadId: string;
};

export type UpdateDealStageInput = {
	stage: string;
};

export type DealListQuery = Record<string, unknown>;
