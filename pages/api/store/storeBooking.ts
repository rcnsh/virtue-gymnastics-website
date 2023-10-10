import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { bookings } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    console.log('req.body', req.body);
    try {
      const result = await prisma.bookings.create({
        data: {
          selected_class: req.body.selected_class,
          selected_student: req.body.selected_student,
        } as bookings,
      });

      res.status(201).json({
        message: 'Booking created successfully',
        bookingID: result.booking_id,
      });
    } catch (error) {
      console.error('Error inserting booking:', error);
      res.status(500).json({ error: 'Error creating booking' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
