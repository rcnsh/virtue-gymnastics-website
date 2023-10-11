import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { student_id } = req.query;

    const id = parseInt(student_id as string, 10);

    try {
      const deletedBooking = await prisma.students.delete({
        where: {
          student_id: id,
        },
      });

      res.status(200).json(deletedBooking);
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ error: 'Error deleting booking' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
