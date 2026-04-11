import { type BaseEntity } from "@/src/types";

export type Business = BaseEntity & {
	name: string;
	type?: string | null;
	description?: string | null;
	logo?: string | null;
	ownerId?: string;
};

export type CreateBusinessInput = {
	name: string;
	type?: string;
	description?: string;
	logo?: string;
};

export type UpdateBusinessInput = {
	name?: string;
	type?: string;
	description?: string;
	logo?: string;
};

export type BusinessListQuery = {
	page?: number;
	limit?: number;
	search?: string;
};
