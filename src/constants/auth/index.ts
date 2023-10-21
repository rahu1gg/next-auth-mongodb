import { type PagesOptions } from 'next-auth';

export const ROLES = {
	user: 21,
	admin: 120,
	superadmin: 148,
} as const;
export type Role = typeof ROLES[keyof typeof ROLES];

export const AUTH_PAGES = {
	signIn: '/auth/signin',
	verifyRequest: '/auth/verify-request',
} satisfies Partial<PagesOptions>;
