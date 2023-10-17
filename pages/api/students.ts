import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const students = await prisma.students.findMany();

      res.status(200).json(students);
    } catch (error) {
      console.error('Error checking for students:', error);
      res.status(500).json({ error: 'Error checking for students' });
    }
  }
}
