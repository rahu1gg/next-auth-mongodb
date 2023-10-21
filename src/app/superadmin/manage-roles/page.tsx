import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next-auth mongoDB - Manage roles 🍁',
};

export default function ManageRoles() {
	return (
		<main>
			<section>
				<div className='max-w-7xl mx-auto pt-5'>
					<h2 className='font-poppins font-medium text-3xl'>Manage Roles</h2>
					<p className='text-muted-foreground'>Manage roles of our app with ease as superadmin 🍁</p>
				</div>
			</section>
			<section>
				<div className='max-w-maxi mx-auto pt-5'>{/* <ManageRolesForm /> */}</div>
			</section>
			<section>
				<div className='max-w-maxi mx-auto pt-6'>{/* <ManageRolesUser /> */}</div>
			</section>
		</main>
	);
}
