import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: {
      questions: {
        include: { options: true },
      },
      category: true,
    },
  });
  res.json(quiz);
}
