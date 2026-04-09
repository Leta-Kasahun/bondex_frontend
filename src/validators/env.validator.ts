import { z } from "zod";

const frontendPublicEnvSchema = z.object({
	NEXT_PUBLIC_APP_URL: z.string().trim().url().default("http://localhost:3000"),
	NEXT_PUBLIC_BACKEND_ORIGIN: z.string().trim().url().default("http://localhost:7000"),
	NEXT_PUBLIC_API_PREFIX: z
		.string()
		.trim()
		.default("/api")
		.transform((value) => (value.startsWith("/") ? value : `/${value}`)),
	NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
	NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().trim().optional(),
});

export const parseFrontendPublicEnv = (
	envSource: NodeJS.ProcessEnv
): z.infer<typeof frontendPublicEnvSchema> => {
	const parsed = frontendPublicEnvSchema.safeParse({
		NEXT_PUBLIC_APP_URL: envSource.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_BACKEND_ORIGIN: envSource.NEXT_PUBLIC_BACKEND_ORIGIN,
		NEXT_PUBLIC_API_PREFIX: envSource.NEXT_PUBLIC_API_PREFIX,
		NEXT_PUBLIC_API_TIMEOUT_MS: envSource.NEXT_PUBLIC_API_TIMEOUT_MS,
		NEXT_PUBLIC_GOOGLE_CLIENT_ID: envSource.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
	});

	if (!parsed.success) {
		throw new Error(`Invalid frontend environment configuration: ${parsed.error.message}`);
	}

	return parsed.data;
};
