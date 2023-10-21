import { ROLES, Role } from '@/constants/auth';

export function getRole(role: Role) {
	const res = Object.entries(ROLES).find((val) => val[1] === role);
	return res![0];
}
