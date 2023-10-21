import { ClientProfile } from '@/components/pages/profile/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next-auth mongoDB - Profile(client)',
};

export default function Page() {
	return (
		<main>
			<section>
				<div className='max-w-7xl py-5 mx-auto'>
					<div>
						<h2 className='text-3xl font-semibold'>Client Profile</h2>
					</div>
					<ClientProfile />
				</div>
			</section>
		</main>
	);
}
