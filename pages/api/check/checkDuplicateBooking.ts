import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { student_id, selected_class } = req.query;

    const student_id_number = parseInt(student_id as string, 10);
    try {
      const existingBooking = await prisma.bookings.findFirst({
        where: {
          student_id: student_id_number,
          selected_class: selected_class as string,
        },
      });

      res.status(200).json({ hasBooking: !!existingBooking });
    } catch (error) {
      console.error('Error checking for existing booking:', error);
      res.status(500).json({ error: 'Error checking for existing booking' });
    }
  }
}
