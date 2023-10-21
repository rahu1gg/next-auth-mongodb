import { ROLES, Role } from '@/constants/auth';
import { session } from '@/server/auth';
import { notFound } from 'next/navigation';

const SUPERADMIN_USERS = [ROLES.superadmin] as Role[];

export default async function SuperadminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = await session();
	if (!SUPERADMIN_USERS.includes(auth?.user.role)) return notFound();

	return <>{children}</>;
}
