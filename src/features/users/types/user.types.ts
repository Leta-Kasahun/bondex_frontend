export type UserProfile = {
	id: string;
	name: string;
	email: string;
	avatar?: string | null;
};

export type UpdateUserProfileInput = {
	name?: string;
	avatar?: string | null;
};

export type UserStats = Record<string, number>;

export type RequestEmailChangeInput = {
	email: string;
};

export type ConfirmEmailChangeInput = {
	email: string;
	otp: string;
};

export type MessageResponse = {
	message: string;
};
