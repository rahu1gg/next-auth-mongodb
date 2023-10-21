import { ClientProfile } from '@/components/pages/profile/client';

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
