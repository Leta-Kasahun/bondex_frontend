import { API_ROUTES } from "@/src/config/api";
import { requestPost } from "@/src/features/shared/services";
import {
	type AdminAuthSession,
	type AdminLoginInput,
	type AdminLoginResponse,
	type AdminVerifyOtpInput,
	type MessageResponse,
} from "../types/admin-auth.types";

export const loginAdmin = (payload: AdminLoginInput) =>
	requestPost<AdminLoginResponse, AdminLoginInput>(API_ROUTES.AUTH.ADMIN.LOGIN, payload);

export const verifyAdminOtp = (payload: AdminVerifyOtpInput) =>
	requestPost<AdminAuthSession, AdminVerifyOtpInput>(API_ROUTES.AUTH.ADMIN.VERIFY_OTP, payload);

export const logoutAdmin = () => requestPost<MessageResponse>(API_ROUTES.AUTH.ADMIN.LOGOUT);
