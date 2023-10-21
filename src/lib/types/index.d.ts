import { z } from 'zod';

const processEnvSchema = z.object({
	// Auth
	NEXTAUTH_URL: z.string(),
	NEXTAUTH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
	EMAIL_SERVER_USER: z.string(),
	EMAIL_SERVER_PASSWORD: z.string(),
	EMAIL_SERVER_HOST: z.string(),
	EMAIL_SERVER_PORT: z.string(),
	EMAIL_FROM: z.string(),

	// Server
	MONGODB_URI: z.string(),
});
processEnvSchema.parse(process.env);

// global
declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof processEnvSchema> {}
	}
}
