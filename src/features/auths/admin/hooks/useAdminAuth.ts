import { emailSchema, passwordSchema } from "@/src/validators";
import { useAuthStore } from "@/src/stores";
import { loginAdmin, logoutAdmin, verifyAdminOtp } from "../services";
import { type AdminLoginInput, type AdminVerifyOtpInput } from "../types/admin-auth.types";
import { useFeatureMutation } from "@/src/features/shared/hooks";

const validateCredentials = (input: AdminLoginInput): void => {
	emailSchema.parse(input.email);
	passwordSchema.parse(input.password);
};

export const useAdminAuth = () => {
	const setAuth = useAuthStore((state) => state.setAuth);
	const clearAuth = useAuthStore((state) => state.clearAuth);

	const loginMutation = useFeatureMutation((payload: AdminLoginInput) => {
		validateCredentials(payload);
		return loginAdmin(payload);
	});

	const verifyOtpMutation = useFeatureMutation((payload: AdminVerifyOtpInput) =>
		verifyAdminOtp(payload),
		{
			onSuccess: (session) => {
				setAuth(session.accessToken, "ADMIN", {
					name: session.name,
					email: session.email,
					avatar: null,
				});
			},
		}
	);

	const logoutMutation = useFeatureMutation((_payload: void) => logoutAdmin(), {
		onSuccess: () => {
			clearAuth();
		},
	});

	return { loginMutation, verifyOtpMutation, logoutMutation };
};
