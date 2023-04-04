import type { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';

import twilio from 'twilio';

type Data = {
  name: string;
};

const twilioClient = twilio(
  process.env.TWILLO_ACCOUNT_SID,
  process.env.TWILLO_TOKEN
);

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
    await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILLO_MESSAGE_SID,
      to: process.env.TWILLO_PHONE_NUMBER!,
      body: `Your Carrot verification code is ${payload}`,
    });
  }

  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
