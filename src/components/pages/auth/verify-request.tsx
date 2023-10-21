'use client';

import { useAppSelector } from '@/client/store';

export default function VerifyRequest() {
	const { email } = useAppSelector((state) => state.authSlice).signin;

	return email;
}
