import VerifyRequest from '@/components/pages/auth/verify-request';
import { Button } from '@/components/ui/button';
import { PencilLine } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto flex items-center justify-center min-h-dvh'>
					<div className='max-w-xl w-full px-6 py-6 rounded-lg bg-muted border -translate-y-1/4'>
						<h2 className='text-2xl font-medium text-center uppercase'>Verification Link Sent</h2>
						<div className='text-center py-4'>
							<Button className='mx-auto rounded-full gap-3' variant='outline' asChild>
								<Link href={'/auth/signin'} className='text-xs'>
									<VerifyRequest />
									<PencilLine size={16} />
								</Link>
							</Button>
						</div>
						<p className='text-center text-sm'>
							Thank you for signing up for <span className='font-semibold'>Next-auth mongoDB</span>. A verification link has been send to your email
							address
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
