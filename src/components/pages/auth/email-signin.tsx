'use client';

import { dispatch, useAppSelector } from '@/client/store';
import { setsignin, setsigninloading } from '@/client/store/slices/auth-slice';
import CircularLoader from '@/components/custom/loading/circular-loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AUTH_PAGES } from '@/constants/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const emailSigninSchema = z.object({
	email: z.string().email({ message: 'Email required!' }),
});

type EmailSigninT = z.infer<typeof emailSigninSchema>;

interface EmailSigninProps {
	providers: ClientSafeProvider[];
}

export default function EmailSignin({ providers }: EmailSigninProps) {
	const { email, loading, id } = useAppSelector((state) => state.authSlice).signin;
	const router = useRouter();
	const form = useForm<EmailSigninT>({
		resolver: zodResolver(emailSigninSchema),
		defaultValues: {
			email: email ?? '',
		},
	});

	useEffect(() => {
		return () => {
			dispatch(setsigninloading(false));
		};
	}, []);

	return (
		<Fragment>
			{providers.map((provider) => {
				async function handleSubmit(data: EmailSigninT) {
					dispatch(setsignin({ email: data.email, id: provider.type, loading: true }));
					await signIn(provider.id, { email: data.email, redirect: false }).then((res) => {
						if (res?.error) return console.error('EmailProvider form: ', res.error);

						router.push(AUTH_PAGES.verifyRequest);
						dispatch(setsigninloading(false));
					});
				}

				return (
					<Fragment key={provider.name}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder='hello@gmail.com' type='email' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' className='w-full mb-4' disabled={loading}>
									{loading && id === provider.id ? (
										<CircularLoader className='bg-foreground mr-8 border-x-foreground border-b-foreground' />
									) : (
										<Image src={`/auth/${provider.id}-icon.svg`} className='w-5 mr-8' alt={`${provider.id}-icon.svg`} width={50} height={50} />
									)}
									<span>Sign in with {provider.name}</span>
								</Button>
							</form>
						</Form>
					</Fragment>
				);
			})}
		</Fragment>
	);
}
