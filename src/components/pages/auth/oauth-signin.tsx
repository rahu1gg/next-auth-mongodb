'use client';

import { useAppSelector } from '@/client/store';
import CircularLoader from '@/components/custom/loading/circular-loader';
import { Button } from '@/components/ui/button';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import { Fragment } from 'react';

interface OAuthSigninProps {
	providers: ClientSafeProvider[];
}

export default function OAuthSignin({ providers }: OAuthSigninProps) {
	const { loading, id } = useAppSelector((state) => state.authSlice).signin;

	return (
		<Fragment>
			{providers.map((provider) => (
				<div key={provider.name}>
					<Button className='w-full mt-5' type='button' disabled={loading} onClick={() => signIn(provider.id)}>
						{loading && id === provider.id ? (
							<CircularLoader className='bg-foreground mr-8 border-x-foreground border-b-foreground' />
						) : (
							<Image src={`/auth/${provider.id}-icon.svg`} className='w-5 h-5 mr-8' alt={`${provider.id}-icon`} width={50} height={50} />
						)}
						<span>Sign in with {provider.name}</span>
					</Button>
				</div>
			))}
		</Fragment>
	);
}
