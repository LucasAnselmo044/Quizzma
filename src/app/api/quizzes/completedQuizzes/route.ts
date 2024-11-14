import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { quizId, score } = await request.json();

    // Logs para verificar os valores recebidos
    console.log("quizId:", quizId);
    console.log("score:", score);

    if (!quizId || score === undefined) {
      return NextResponse.json({ message: "Dados insuficientes" }, { status: 400 });
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ message: "ID de usuário não encontrado" }, { status: 400 });
    }

    const quizCompleted = await prisma.result.create({
      data: {
        userId: userId,
        quizId: quizId,
        score: score,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(quizCompleted, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar quiz completado:", error);
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 });
  }
}
