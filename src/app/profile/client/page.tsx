'use client';

import { useSession } from 'next-auth/react';

export default function Page() {
	const { data: session } = useSession();
	console.log(session);

	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto'>
					<h2>Client Profile</h2>
					<p>profile</p>
				</div>
			</section>
		</main>
	);
}
