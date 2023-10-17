import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { user_id, admin } = req.body;

      const user = await prisma.users.findUnique({
        where: { user_id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await prisma.users.update({
        where: { user_id },
        data: { admin: admin },
      });

      return res
        .status(200)
        .json({ message: 'Admin state updated successfully' });
    } catch (error) {
      console.error('Error updating admin state:', error);
      return res.status(500).json({ error: 'Error updating admin state' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
