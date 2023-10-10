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
    console.error('DATABASE_URL environment variable is not defined.');
  }

  if (req.method === 'POST') {
    const { clerkUserID, username, email } = req.body;
    const userExists = await sql`
      SELECT EXISTS(SELECT 1 FROM users WHERE userID = ${clerkUserID});
    `;
    if (userExists[0].exists) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }
    try {
      const result = await sql`
    INSERT INTO users (userID, username, email)
    VALUES (${clerkUserID}, ${username}, ${email});
  `;

      res
        .status(201)
        .json({ message: 'User created successfully', userID: clerkUserID });
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
