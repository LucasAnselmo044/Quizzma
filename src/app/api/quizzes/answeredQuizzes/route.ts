// src/app/api/quizzes/answeredQuizzes/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth"; 
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const quizzesRespondidos = await prisma.result.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            description: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(quizzesRespondidos, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar quizzes respondidos:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
