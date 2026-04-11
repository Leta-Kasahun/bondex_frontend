export type RegisterUserInput = {
	name: string;
	email: string;
	password: string;
};

export type VerifyUserRegistrationOtpInput = {
	email: string;
	otp: string;
};

export type GoogleAuthInput = {
	idToken: string;
};

export type GoogleClientConfig = {
	clientId: string;
};

export type LoginUserInput = {
	email: string;
	password: string;
};

export type ForgotPasswordInput = {
	email: string;
};

export type VerifyResetOtpInput = {
	email: string;
	otp: string;
};

export type ResetPasswordInput = {
	newPassword: string;
	confirmPassword: string;
};

export type UserAuthSession = {
	userId: string;
	email: string;
	name: string;
	accessToken: string;
	refreshToken: string;
};

export type MessageResponse = {
	message: string;
};
