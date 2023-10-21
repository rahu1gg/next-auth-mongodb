import Link from 'next/link';
import { HeaderAuth } from './client';

const NAV_LINKS = [
	{
		id: 1,
		label: 'Home',
		href: '/',
	},
	{
		id: 2,
		label: 'Profile(client)',
		href: '/profile/client',
	},
	{
		id: 3,
		label: 'Profile(server)',
		href: '/profile/server',
	},
];

export default function Header() {
	return (
		<header className='border-b'>
			<div className='max-w-7xl mx-auto h-16 flex items-center justify-between'>
				<div className='flex items-center justify-center'>
					<Link href={'/'}>Next-auth mongoDB</Link>
				</div>
				<nav className='flex items-center justify-center'>
					<ul className='flex items-center justify-center'>
						{NAV_LINKS.map(({ id, label, href }) => (
							<li key={id}>
								<Link href={href} className='py-2 px-4'>
									{label}
								</Link>
							</li>
						))}
						<li className='pl-5'>
							<HeaderAuth />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
