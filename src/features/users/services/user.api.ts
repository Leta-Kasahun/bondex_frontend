import { API_ROUTES } from "@/src/config/api";
import { requestGet, requestPost, requestPut } from "@/src/features/shared/services";
import {
	type ConfirmEmailChangeInput,
	type MessageResponse,
	type RequestEmailChangeInput,
	type UpdateUserProfileInput,
	type UserProfile,
	type UserStats,
} from "../types/user.types";

export const getUserProfile = () => requestGet<UserProfile>(API_ROUTES.USERS.PROFILE);

export const updateUserProfile = (payload: UpdateUserProfileInput) =>
	requestPut<UserProfile, UpdateUserProfileInput>(API_ROUTES.USERS.PROFILE, payload);

export const getUserStats = () => requestGet<UserStats>(API_ROUTES.USERS.STATS);

export const requestUserEmailChange = (payload: RequestEmailChangeInput) =>
	requestPost<MessageResponse, RequestEmailChangeInput>(API_ROUTES.USERS.REQUEST_EMAIL_CHANGE, payload);

export const confirmUserEmailChange = (payload: ConfirmEmailChangeInput) =>
	requestPut<MessageResponse, ConfirmEmailChangeInput>(API_ROUTES.USERS.CONFIRM_EMAIL_CHANGE, payload);
