import { session } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = await session();
	if (auth?.user) return redirect('/');

	return <>{children}</>;
}
