import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export type CreateTodoResponse = {
  id: number
  text: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateTodoResponse>
) {
  const todo = await prisma.todo.create({
    data: {
      text: req.body.text,
    }
  });

  res.status(200).json({
    id: todo.id,
    text: todo.text,
  })
}
