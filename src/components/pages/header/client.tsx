'use client';

import CircularLoader from '@/components/custom/loading/circular-loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ROLES, Role } from '@/constants/auth';
import { genetateUserName } from '@/lib/utils/generate-username';
import { LayoutDashboard, LogOut, Users } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

export function HeaderAuth() {
	const { data: session, status } = useSession();

	if (status === 'authenticated' && session) {
		return <UserProfile />;
	}

	return (
		<Button asChild>
			<Link href={'/auth/signin'}>Signin</Link>
		</Button>
	);
}

function UserProfile() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { data: session, status } = useSession();

	async function handleSignout() {
		setLoading(true);
		await signOut();
		setLoading(false);
		router.replace('/');
	}

	if (status === 'authenticated' && session)
		return (
			<div className='flex items-center justify-center'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type='button'
							className='ring-primary/50 data-[state=closed]:ring-0 data-[state=open]:ring-4 duration-200 rounded-full focus:outline-0 border-primary-foreground border'
						>
							<Avatar className='scale-100 shadow-lg'>
								<AvatarImage src={session.user.image as string} alt='profile-pic' />
								<AvatarFallback>
									{genetateUserName(session.user.name ? (session.user.name as string) : (session.user.email as string))}
								</AvatarFallback>
							</Avatar>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-96 rounded-[1rem] border-white shadow-spread pb-0' variant='space' align='end' sideOffset={12}>
						<DropdownMenuLabel className='font-normal px-6 py-0 mb-2'>
							<div className='flex justify-start items-center gap-4'>
								<div className='w-11 aspect-square'>
									<Image
										src={session.user.image as string}
										className='rounded-full'
										alt='profile-pic'
										width={100}
										height={100}
										unoptimized
										loading='lazy'
									/>
								</div>
								<div>
									<p className='font-medium text-sm'>
										{session.user.name} ·{' '}
										<span className='font-normal'>{Object.entries(ROLES).find((val) => val[1] === session.user.role && val[0])![0]}</span>
									</p>
									<p className='text-muted-foreground text-[13px]'>{session.user.email}</p>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							<NavAuthLinks />
							<DropdownMenuItem
								className='focus:bg-red-100 w-full hover:cursor-pointer px-6 py-3.5 rounded-none text-black-1050'
								onClick={(e) => e.preventDefault()}
								asChild
							>
								<button type='button' className='gap-4' onClick={handleSignout} disabled={loading}>
									<span className='flex items-stretch justify-center basis-11'>
										{loading ? <CircularLoader className='h-5' /> : <LogOut className='text-grey-1050' size={16} strokeWidth={2.25} />}
									</span>
									<span>Sign out</span>
								</button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);

	return <Button onClick={() => signIn()}>Signin</Button>;
}

export const AUTHORIZED_ROUTES = [
	{
		id: 1,
		label: 'Dashboard',
		href: '/admin/dashboard',
		icon: LayoutDashboard,
	},
] as const;
const SUPERADMIN_ROUTES = [
	{
		id: 100,
		label: 'Manage roles',
		href: '/superadmin/manage-roles',
		icon: Users,
	},
] as const;

const AUTHORIZED_USERS = [ROLES.superadmin, ROLES.admin] as Role[];
const SUPERADMIN_USERS = [ROLES.superadmin] as Role[];

function NavAuthLinks() {
	const { data: session } = useSession();

	return (
		<Fragment>
			{session?.user && AUTHORIZED_USERS.includes(session?.user.role) && (
				<Fragment>
					{AUTHORIZED_ROUTES.map((link) => (
						<DropdownMenuItem key={link.id} className='px-6 py-3.5 rounded-none text-black-1050' asChild>
							<Link href={link.href} className='hover:cursor-pointer flex justify-start items-center gap-4'>
								<span className='flex items-stretch justify-center basis-11'>
									{<link.icon className='text-grey-1050' size={16} strokeWidth={2.25} />}
								</span>
								<span>{link.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</Fragment>
			)}
			{session?.user && SUPERADMIN_USERS.includes(session?.user.role) && (
				<Fragment>
					{SUPERADMIN_ROUTES.map((link) => (
						<DropdownMenuItem key={link.id} className='px-6 py-3.5 rounded-none text-black-1050' asChild>
							<Link href={link.href} className='hover:cursor-pointer flex justify-start items-center gap-4'>
								<span className='flex items-stretch justify-center basis-11'>
									{<link.icon className='text-grey-1050' size={16} strokeWidth={2.25} />}
								</span>
								<span>{link.label}</span>
							</Link>
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
				</Fragment>
			)}
			{session?.user.role === ROLES.admin && <DropdownMenuSeparator />}
		</Fragment>
	);
}
