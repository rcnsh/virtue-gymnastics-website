import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { clerkUserID, username, email } = req.body;

    const userExists = await prisma.users.findUnique({
      where: { user_id: clerkUserID },
    });

    if (userExists) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    try {
      const newUser = await prisma.users.create({
        data: {
          user_id: clerkUserID,
          username: username,
          email: email,
        },
      });

      res.status(201).json({
        message: 'User created successfully',
        user_id: newUser.user_id,
      });
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
