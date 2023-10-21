import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from '@react-email/components';

interface VerificationRequestProps {
	email: string;
	signinLink: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export default function VerificationRequest({ email, signinLink }: VerificationRequestProps) {
	const previewText = `Signin ${email} to Next-auth mongoDB`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className='bg-white my-auto mx-auto font-sans'>
					<Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]'>
						<Section className='mt-[32px]'>
							<Img src={`${baseUrl}/auth/rahul-logo.png`} width='40' height='50' alt='Vercel' className='my-0 mx-auto' />
						</Section>
						<Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
							Join <strong>Next-auth mongoDB</strong>
						</Heading>
						<Text className='text-black text-[14px] leading-[24px]'>Hello {email},</Text>
						<Text className='text-black text-[14px] leading-[24px]'>
							Thanks for signin to <strong>Next-auth mongoDB</strong>. Please click on the below button to complete the signin verification.
						</Text>
						<Section className='text-center mt-[32px] mb-[32px]'>
							<Button
								pX={20}
								pY={12}
								className='bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center'
								href={signinLink}
							>
								Signin to Next-auth mongoDB
							</Button>
						</Section>
						<Text className='text-black text-[14px] leading-[24px]'>
							or copy and paste this URL into your browser:{' '}
							<Link href={signinLink} className='text-blue-600 no-underline'>
								{signinLink}
							</Link>
						</Text>
						<Hr className='border-t border-t-solid border-t-[#eaeaea] my-[26px] mx-0 w-full' />
						<Text className='text-[#666666] text-[12px] leading-[24px]'>
							Please be advised that if you did not initiate the sign-in request, you may confidently disregard this email.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
