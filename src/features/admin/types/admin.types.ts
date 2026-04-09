export type AdminUser = {
	id: string;
	name: string;
	email: string;
	isBlocked?: boolean;
	createdAt?: string;
};

export type AdminUserListQuery = Record<string, unknown>;

export type AdminSystemStats = Record<string, number>;

export type MessageResponse = {
	message: string;
};
