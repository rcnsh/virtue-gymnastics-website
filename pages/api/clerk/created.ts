import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { data } = req.body;

    let admin = false;

    if (
      data.email_addresses[0].email_address.endsWith('@virtuemovement.co.uk')
    ) {
      admin = true;
    }

    try {
      const newUser = await prisma.users.create({
        data: {
          user_id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email_addresses[0].email_address,
          admin: admin,
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
