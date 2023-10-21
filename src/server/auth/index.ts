import { AUTH_PAGES, ROLES } from '@/constants/auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider, { type GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';
import clientPromise, { client } from '../db';

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise) as Adapter,
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: Number(process.env.EMAIL_SERVER_PORT),
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
			profile(profile: GoogleProfile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
					role: profile.role ?? ROLES.user,
				};
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			profile(profile: GithubProfile) {
				return {
					id: profile.id.toString(),
					name: profile.name,
					email: profile.email,
					image: profile.avatar_url,
					role: profile.role ?? ROLES.user,
				};
			},
		}),
	],
	callbacks: {
		session({ session, user }) {
			if (user) {
				session.user.id = user.id;
				session.user.role = user.role;
			}
			return session;
		},
	},
	events: {
		async signIn({ account, user, isNewUser }) {
			// Check if the user authenticated for the first-time via EmailProvider to assing role
			if (isNewUser && account?.type === 'email') {
				try {
					await client.connect();
					const db = client.db();
					const usersCollection = db.collection('users');
					await usersCollection.updateOne({ email: user.email }, { $set: { role: ROLES.user } });
				} catch (err) {
					console.error('Next-auth after signin error: ', err);
				} finally {
					await client.close();
				}
			}
		},
	},
	pages: AUTH_PAGES,
};

export const handler = NextAuth(authOptions);

export const session = async () => {
	return await getServerSession(authOptions);
};
