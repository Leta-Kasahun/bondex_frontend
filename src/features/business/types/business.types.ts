import { type BaseEntity } from "@/src/types";

export type Business = BaseEntity & {
	name?: string;
	description?: string | null;
	industry?: string | null;
	website?: string | null;
	ownerId?: string;
};

export type CreateBusinessInput = Record<string, unknown>;
export type UpdateBusinessInput = Record<string, unknown>;
export type BusinessListQuery = Record<string, unknown>;
