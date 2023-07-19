import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/footer/footer-email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: 'Virtue-Test <onboarding@resend.dev>',
      text: 'Hello world',
      to: ['jacobjameswiltshire@protonmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({
        Name: 'John',
        Email: 'email',
        Message: 'message',
      }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
