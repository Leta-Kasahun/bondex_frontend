"use client";

import { toast } from "sonner";
import { UI_ERROR_MESSAGE } from "@/src/constants";

export const useNotification = () => {
	return {
		success: (message: string, description?: string) => toast.success(message, { description }),
		error: (_message: string, _description?: string) => toast.error(UI_ERROR_MESSAGE),
		info: (message: string, description?: string) => toast.info(message, { description }),
		warning: (message: string, description?: string) => toast.warning(message, { description }),
		loading: (message: string) => toast.loading(message),
		dismiss: (id?: string | number) => toast.dismiss(id),
	};
};
