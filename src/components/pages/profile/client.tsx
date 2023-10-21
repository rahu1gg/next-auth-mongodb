'use client';

import { getRole } from '@/lib/utils/getRole';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';

export function ClientProfile() {
	const { data: session, status } = useSession();

	if (status !== 'authenticated') return notFound();

	return (
		<div className='px-1 pt-1'>
			<p className='capitalize'>Name: {session.user.name}</p>
			<p>Email: {session.user.email}</p>
			<p className='capitalize'>Role: {getRole(session.user.role)}</p>
		</div>
	);
}
