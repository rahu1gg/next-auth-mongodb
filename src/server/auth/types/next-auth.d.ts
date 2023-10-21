import { type Roles } from '@/constants/auth';
import { type DefaultJWT } from '@auth/core/jwt';
import { type DefaultSession, type DefaultUser } from '@auth/core/types';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: Roles;
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		role: Roles;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role: Roles;
	}
}
