import postgres from 'postgres';
import { NextApiRequest, NextApiResponse } from 'next';
let sql: postgres.Sql;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (process.env.DATABASE_URL) {
    sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  } else {
    throw new Error('DATABASE_URL environment variable is not defined.');
  }

  if (req.method === 'PUT') {
    const { clerkUserID, username, email } = req.body;
    const userExists = await sql`
      SELECT EXISTS(SELECT 1 FROM users WHERE user_id = ${clerkUserID});
    `;
    if (userExists[0].exists) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }
    try {
      await sql`
    INSERT INTO users (user_id, username, email)
    VALUES (${clerkUserID}, ${username}, ${email});
  `;

      res
        .status(201)
        .json({ message: 'User created successfully', user_id: clerkUserID });
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
