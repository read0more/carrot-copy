// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/client';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // planetscale 테스트
  client.user
    .create({
      data: {
        name: 'vatista',
        email: 'krkr@gmail',
      },
    })
    .then((user) => {
      res.status(200).json(user);
    });
}
