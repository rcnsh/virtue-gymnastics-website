import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '@/components/footer/footer-email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Virtue Website Enquiry <enquires@virtue.rcn.sh>',
      text: 'Virtue Email',
      to: ['jacobjameswiltshire@protonmail.com'],
      subject: 'New Enquiry from Virtue Website',
      react: EmailTemplate({
        Name: name,
        Email: email,
        Message: message,
      }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
