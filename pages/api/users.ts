import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.users.findMany();

      res.status(200).json(users);
    } catch (error) {
      console.error('Error checking for existing user:', error);
      res.status(500).json({ error: 'Error checking for existing user' });
    }
  }
}
