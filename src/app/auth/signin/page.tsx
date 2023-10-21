import EmailSignin from '@/components/pages/auth/email-signin';
import OAuthSignin from '@/components/pages/auth/oauth-signin';
import { Metadata } from 'next';
import { getProviders } from 'next-auth/react';

export const metadata: Metadata = {
	title: 'Next-auth mongoDB - Signin',
};

export default async function Page() {
	const providers = (await getProviders()) ?? [];

	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto flex items-center justify-center min-h-dvh'>
					<div className='max-w-xl w-full py-8 px-6 rounded-2xl'>
						<h2 className='text-2xl uppercase font-semibold'>Signin</h2>
						<p className='mb-3 text-sm'>
							to continue to <span className='font-semibold'>Next-auth mongoDB</span>
						</p>
						<div>
							<EmailSignin providers={Object.values(providers).filter((provider) => provider.type === 'email')} />
							<hr className='mt-4' />
							<OAuthSignin providers={Object.values(providers).filter((provider) => provider.type === 'oauth')} />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
