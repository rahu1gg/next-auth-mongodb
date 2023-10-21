import { ROLES, Role } from '@/constants/auth';
import { session } from '@/server/auth';
import { notFound } from 'next/navigation';

const AUTHORIZED_USERS = [ROLES.superadmin, ROLES.admin] as Role[];

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = await session();
	if (!AUTHORIZED_USERS.includes(auth?.user.role)) return notFound();

	return <>{children}</>;
}
