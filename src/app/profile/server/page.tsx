import { session } from '@/server/auth';

export default async function Page() {
	console.log('server: ', await session());
	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto'>
					<h2>Server Profile</h2>
					<p>profile</p>
				</div>
			</section>
		</main>
	);
}
