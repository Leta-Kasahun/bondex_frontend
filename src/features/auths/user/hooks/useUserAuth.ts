import { emailSchema, passwordSchema } from "@/src/validators";
import { useAuthStore } from "@/src/stores";
import {
	loginUser,
	loginUserWithGoogle,
	logoutUser,
	registerUser,
	requestPasswordResetOtp,
	resetUserPassword,
	signupUserWithGoogle,
	verifyPasswordResetOtp,
	verifyUserRegistrationOtp,
} from "../services";
import {
	type ForgotPasswordInput,
	type GoogleAuthInput,
	type LoginUserInput,
	type RegisterUserInput,
	type ResetPasswordInput,
	type VerifyResetOtpInput,
	type VerifyUserRegistrationOtpInput,
} from "../types/user-auth.types";
import { useFeatureMutation } from "@/src/features/shared/hooks";

const validateCredentials = (input: { email: string; password: string }): void => {
	emailSchema.parse(input.email);
	passwordSchema.parse(input.password);
};

export const useUserAuth = () => {
	const setAuth = useAuthStore((state) => state.setAuth);
	const clearAuth = useAuthStore((state) => state.clearAuth);

	const registerMutation = useFeatureMutation((payload: RegisterUserInput) => {
		validateCredentials(payload);
		return registerUser(payload);
	});

	const verifyRegistrationOtpMutation = useFeatureMutation((payload: VerifyUserRegistrationOtpInput) =>
		verifyUserRegistrationOtp(payload)
	);

	const signupWithGoogleMutation = useFeatureMutation((payload: GoogleAuthInput) =>
		signupUserWithGoogle(payload),
		{
			onSuccess: (session) => {
				setAuth(session.accessToken, "USER", {
					name: session.name,
					email: session.email,
					avatar: null,
				});
			},
		}
	);

	const loginMutation = useFeatureMutation((payload: LoginUserInput) => {
		validateCredentials(payload);
		return loginUser(payload);
	}, {
		onSuccess: (session) => {
			setAuth(session.accessToken, "USER", {
				name: session.name,
				email: session.email,
				avatar: null,
			});
		},
	});

	const googleLoginMutation = useFeatureMutation((payload: GoogleAuthInput) =>
		loginUserWithGoogle(payload),
		{
			onSuccess: (session) => {
				setAuth(session.accessToken, "USER", {
					name: session.name,
					email: session.email,
					avatar: null,
				});
			},
		}
	);

	const forgotPasswordMutation = useFeatureMutation((payload: ForgotPasswordInput) =>
		requestPasswordResetOtp(payload)
	);

	const verifyResetOtpMutation = useFeatureMutation((payload: VerifyResetOtpInput) =>
		verifyPasswordResetOtp(payload)
	);

	const resetPasswordMutation = useFeatureMutation((payload: ResetPasswordInput) =>
		resetUserPassword(payload)
	);

	const logoutMutation = useFeatureMutation((_payload: void) => logoutUser(), {
		onSuccess: () => {
			clearAuth();
		},
	});

	return {
		registerMutation,
		verifyRegistrationOtpMutation,
		signupWithGoogleMutation,
		loginMutation,
		googleLoginMutation,
		forgotPasswordMutation,
		verifyResetOtpMutation,
		resetPasswordMutation,
		logoutMutation,
	};
};
