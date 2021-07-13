import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/dist/client/router';
import prisma from '../../lib/prisma';

export type DeleteTodoResponse = {
  id: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteTodoResponse>
) {
  const { id: rawId } = req.body
  console.log(`rawId: ${rawId}`)

  if (Array.isArray(rawId)) {
    res.status(400)
    return
  }

  const id = parseInt(rawId, 10)

  const deleteTodo = await prisma.todo.delete({
    where: { id }
  })

  res.status(200).json({
    id: deleteTodo.id,
  })
}
