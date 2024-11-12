import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(req: Request) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 })
  }

  const userId = session.user.id
  const { quizId, score } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: 'ID do usuário não encontrado' }, { status: 400 })
  }

  try {
    await prisma.result.create({
      data: {
        userId,
        quizId,
        score,
      },
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        quizzesCompleted: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ message: 'Quiz completado e registrado com sucesso!' })
  } catch (error) {
    console.error('Erro ao registrar quiz:', error)
    return NextResponse.json({ error: 'Erro ao registrar o quiz' }, { status: 500 })
  }
}
