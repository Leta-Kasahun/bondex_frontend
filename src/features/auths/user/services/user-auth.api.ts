import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost } from "@/src/features/shared/services";
import {
	type ForgotPasswordInput,
	type GoogleAuthInput,
	type GoogleClientConfig,
	type LoginUserInput,
	type MessageResponse,
	type ResetPasswordInput,
	type RegisterUserInput,
	type UserAuthSession,
	type VerifyResetOtpInput,
	type VerifyUserRegistrationOtpInput,
} from "../types/user-auth.types";

export const registerUser = (payload: RegisterUserInput) =>
	requestPost<MessageResponse, RegisterUserInput>(API_ROUTES.AUTH.USER.REGISTER, payload);

export const getGoogleClientConfig = () =>
	requestGet<GoogleClientConfig>(API_ROUTES.AUTH.USER.GOOGLE_CLIENT_CONFIG);

export const verifyUserRegistrationOtp = (payload: VerifyUserRegistrationOtpInput) =>
	requestPost<UserAuthSession, VerifyUserRegistrationOtpInput>(
		API_ROUTES.AUTH.USER.REGISTER_VERIFY_OTP,
		payload
	);

export const signupUserWithGoogle = (payload: GoogleAuthInput) =>
	requestPost<UserAuthSession, GoogleAuthInput>(API_ROUTES.AUTH.USER.GOOGLE_SIGNUP, payload);

export const loginUser = (payload: LoginUserInput) =>
	requestPost<UserAuthSession, LoginUserInput>(API_ROUTES.AUTH.USER.LOGIN, payload);

export const loginUserWithGoogle = (payload: GoogleAuthInput) =>
	requestPost<UserAuthSession, GoogleAuthInput>(API_ROUTES.AUTH.USER.GOOGLE_LOGIN, payload);

export const requestPasswordResetOtp = (payload: ForgotPasswordInput) =>
	requestPost<MessageResponse, ForgotPasswordInput>(API_ROUTES.AUTH.USER.FORGOT_PASSWORD, payload);

export const verifyPasswordResetOtp = (payload: VerifyResetOtpInput) =>
	requestPost<MessageResponse, VerifyResetOtpInput>(
		API_ROUTES.AUTH.USER.VERIFY_RESET_OTP,
		payload
	);

export const resetUserPassword = (payload: ResetPasswordInput) =>
	requestPost<MessageResponse, ResetPasswordInput>(API_ROUTES.AUTH.USER.RESET_PASSWORD, payload);

export const logoutUser = () => requestPost<MessageResponse>(API_ROUTES.AUTH.USER.LOGOUT);
