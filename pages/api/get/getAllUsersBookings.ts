import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { user_id } = req.query;

    try {
      const bookings = await prisma.bookings.findMany({
        where: {
          student: {
            user_id: user_id as string,
          },
        },
      });
      res.status(200).json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Error fetching bookings' });
    }
  }
}
