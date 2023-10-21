import { getRole } from '@/lib/utils/getRole';
import { session } from '@/server/auth';
import { notFound } from 'next/navigation';

export default async function ServerProfile() {
	const auth = await session();

	if (!auth?.user) return notFound();

	return (
		<div className='px-1 pt-1'>
			<p className='capitalize'>Name: {auth.user.name}</p>
			<p>Email: {auth.user.email}</p>
			<p className='capitalize'>Role: {getRole(auth.user.role)}</p>
		</div>
	);
}
