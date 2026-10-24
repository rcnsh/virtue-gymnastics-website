import {
	randomBytes,
	type ScryptOptions,
	scrypt,
	timingSafeEqual,
} from "node:crypto";

/* Passwords are hashed with scrypt from Node's standard library, so there's no
native dependency to build. Hashes are stored as
`scrypt$N$r$p$salt$hash` (salt and hash in base64) so the cost can be raised
later without breaking existing hashes. */

const COST = { N: 2 ** 16, r: 8, p: 1 };
const KEY_LENGTH = 64;

function derive(
	password: string,
	salt: Buffer,
	options: { N: number; r: number; p: number },
): Promise<Buffer> {
	const scryptOptions: ScryptOptions = {
		...options,
		// scrypt needs 128 * N * r bytes; Node's default cap is 32 MB.
		maxmem: 256 * options.N * options.r,
	};
	return new Promise((resolve, reject) => {
		scrypt(
			password.normalize("NFKC"),
			salt,
			KEY_LENGTH,
			scryptOptions,
			(err, key) => (err ? reject(err) : resolve(key)),
		);
	});
}

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16);
	const key = await derive(password, salt, COST);
	return [
		"scrypt",
		COST.N,
		COST.r,
		COST.p,
		salt.toString("base64"),
		key.toString("base64"),
	].join("$");
}

export async function verifyPassword(
	password: string,
	stored: string,
): Promise<boolean> {
	const [scheme, N, r, p, salt, hash] = stored.split("$");
	if (scheme !== "scrypt" || !salt || !hash) return false;

	const expected = Buffer.from(hash, "base64");
	const actual = await derive(password, Buffer.from(salt, "base64"), {
		N: Number(N),
		r: Number(r),
		p: Number(p),
	});
	return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/* Checked against when an email isn't registered, so a failed sign-in takes
the same time whether or not the account exists. */
let dummyHash: Promise<string> | undefined;
export function getDummyHash(): Promise<string> {
	dummyHash ??= hashPassword(randomBytes(16).toString("hex"));
	return dummyHash;
}
