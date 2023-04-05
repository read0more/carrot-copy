import type { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

const twilioClient = twilio(
  process.env.TWILLO_ACCOUNT_SID,
  process.env.TWILLO_TOKEN
);

const transporter = nodemailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.NAVER_MAIL_ID,
    pass: process.env.NAVER_MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILLO_MESSAGE_SID,
      to: process.env.TWILLO_PHONE_NUMBER!,
      body: `Your Carrot verification code is ${payload}`,
    });
    console.log(message);
  } else if (email) {
    const message = await transporter.sendMail({
      from: process.env.NAVER_MAIL,
      to: email,
      subject: 'Your Carrot Market Verification Email',
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(message);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
