export type PublicBusiness = {
	id: string;
	name: string;
	description?: string | null;
};

export type PublicContactInput = {
	businessId: string;
	name: string;
	email: string;
	phone?: string;
	message: string;
};

export type MessageResponse = {
	message: string;
};

export type PublicAiResponse = {
	success: boolean;
	message?: string;
	data?: {
		output?: string;
	};
};
