import { type BaseEntity } from "@/src/types";
import { APP_CONSTANTS } from "@/src/constants/config";

type ValueOf<T> = T[keyof T];

export type DealStage = ValueOf<typeof APP_CONSTANTS.DEAL_STAGE>;

export type Deal = BaseEntity & {
	businessId: string;
	leadId: string;
	name: string;
	stage: DealStage;
	value?: number | null;
	closedAt?: string | null;
};

export type ConvertLeadToDealInput = {
	leadId: string;
	name: string;
	value?: number;
};

export type UpdateDealStageInput = {
	stage: DealStage;
	value?: number;
};

export type DealListQuery = {
	businessId: string;
	page?: number;
	limit?: number;
	stage?: DealStage;
	search?: string;
};
