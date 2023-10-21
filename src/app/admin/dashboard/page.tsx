import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next-auth mongoDB - Dashboard',
};

export default function Page() {
	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto py-5'>
					<h2>Dashboard Page</h2>
				</div>
			</section>
		</main>
	);
}
