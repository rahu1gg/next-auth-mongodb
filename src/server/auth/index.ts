import VerificationRequest from '@/components/custom/emails/verification-request';
import { AUTH_PAGES, ROLES } from '@/constants/auth';
import { transporter } from '@/lib/services/nodemailer';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { render } from '@react-email/components';
import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider, { type GithubProfile } from 'next-auth/providers/github';
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';
import { Options } from 'nodemailer/lib/mailer';
import clientPromise, { client } from './auth-db';

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
			async sendVerificationRequest({ identifier, url, provider }) {
				const { host } = new URL(url);

				const options: Options = {
					to: identifier,
					from: {
						name: 'Next-auth mongoDB',
						address: provider.from,
					},
					subject: 'Signin to Next-auth mongoDB',
					text: `Signin to ${host}\n${url}\n\n`,
					html: render(VerificationRequest({ email: identifier, signinLink: url })),
				};

				const result = await transporter.sendMail(options);
				const failed = result.rejected.concat(result.pending).filter(Boolean);
				if (failed.length) {
					throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
				}
			},
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
			// Check if the user authenticated for the first-time via EmailProvider to assign role
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
