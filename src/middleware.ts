import { NextRequest, NextResponse } from 'next/server';

const SUPERADMIN_ROUTES = '/superadmin';
const ADMIN_ROUTES = '/admin';

export async function middleware(req: NextRequest) {
	const sessionToken = req.cookies.get('next-auth.session-token')?.value;

	// const pathname = req.nextUrl.pathname;
	// const { role } = req.nextauth.token!;

	// // superadmin-case
	// if (pathname.startsWith(SUPERADMIN_ROUTES) && role !== ROLES.superadmin) {
	// 	console.log('only super-admins allowed');
	// 	return NextResponse.rewrite(new URL('/not-found', req.url));
	// }

	// // admin-case
	// if (pathname.startsWith(ADMIN_ROUTES) && !(role === ROLES.admin || role === ROLES.superadmin)) {
	// 	console.log('super-admins and admins are allowed');
	// 	return NextResponse.rewrite(new URL('/not-found', req.url));
	// }

	return NextResponse.next();
}

// Define paths for which the middleware will run
export const config = {
	matcher: ['/profile/:path*', '/admin/:path*', '/superadmin/:path*'],
};
