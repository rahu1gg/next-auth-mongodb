import ServerProfile from '@/components/pages/profile';
import { Suspense } from 'react';

export default function Page() {
	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto py-5'>
					<div>
						<h2 className='text-3xl font-semibold'>Server Profile</h2>
					</div>
					<Suspense fallback={<p>loading...</p>}>
						<ServerProfile />
					</Suspense>
				</div>
			</section>
		</main>
	);
}
