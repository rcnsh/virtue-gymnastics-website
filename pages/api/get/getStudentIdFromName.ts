import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { student_first_name, student_last_name, student_dob } = req.body;
    const bookings = await prisma.students.findMany({
      where: {
        student_first_name: student_first_name as string,
        student_last_name: student_last_name as string,
        student_dob: student_dob as string,
      },
    });
    res.status(200).json(bookings[0].student_id);
  }
}
