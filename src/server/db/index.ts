// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const options = {};

const client = new MongoClient(process.env.MONGODB_URI, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};
	if (!globalWithMongo._mongoClientPromise) {
		globalWithMongo._mongoClientPromise = client.connect();
	}

	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	clientPromise = client.connect();
}

export default clientPromise;
export { client };
