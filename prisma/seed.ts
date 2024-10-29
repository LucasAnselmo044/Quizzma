import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar o banco de dados na ordem correta para evitar erros de chave estrangeira
  await prisma.result.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Todas as categorias, quizzes, perguntas, opções e resultados deletados com sucesso!");

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Igualdade de Oportunidades" } }),
    prisma.category.create({ data: { name: "Educação" } }),
    prisma.category.create({ data: { name: "Representação na Mídia" } }),
  ]);

  console.log("Categorias criadas com sucesso!");

  // Criar quizzes, perguntas e opções
  await Promise.all([
    prisma.quiz.create({
      data: {
        title: "Quiz sobre Igualdade de Oportunidades",
        description: "Teste seus conhecimentos sobre igualdade de oportunidades.",
        categoryId: categories[0].id,
        questions: {
          create: [
            {
              text: "Qual é o principal obstáculo para a igualdade de oportunidades no ambiente de trabalho?",
              options: {
                create: [
                  { text: "Falta de qualificação", isCorrect: false },
                  { text: "Desigualdade salarial entre gêneros", isCorrect: true },
                  { text: "Falta de vagas disponíveis", isCorrect: false },
                ],
              },
            },
            {
              text: "Em qual setor a desigualdade de oportunidades é mais evidente?",
              options: {
                create: [
                  { text: "Setor de tecnologia", isCorrect: true },
                  { text: "Setor agrícola", isCorrect: false },
                  { text: "Setor de turismo", isCorrect: false },
                ],
              },
            },
          ],
        },
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Quiz sobre Educação",
        description: "Saiba mais sobre o impacto da educação na igualdade.",
        categoryId: categories[1].id,
        questions: {
          create: [
            {
              text: "Qual é a porcentagem de mulheres no ensino superior em relação aos homens?",
              options: {
                create: [
                  { text: "50%", isCorrect: false },
                  { text: "60%", isCorrect: true },
                  { text: "40%", isCorrect: false },
                ],
              },
            },
            {
              text: "Quais fatores mais afetam a igualdade de acesso à educação?",
              options: {
                create: [
                  { text: "Distância de instituições", isCorrect: false },
                  { text: "Questões de gênero e cultura", isCorrect: true },
                  { text: "Quantidade de professores", isCorrect: false },
                ],
              },
            },
          ],
        },
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Quiz sobre Representação na Mídia",
        description: "Descubra a importância da representação na mídia.",
        categoryId: categories[2].id,
        questions: {
          create: [
            {
              text: "A representação feminina na mídia costuma ser:",
              options: {
                create: [
                  { text: "Equilibrada em todos os gêneros", isCorrect: false },
                  { text: "Estereotipada e sexualizada", isCorrect: true },
                  { text: "Positiva na maioria dos casos", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual o impacto de uma boa representação feminina na mídia?",
              options: {
                create: [
                  { text: "Nenhum impacto relevante", isCorrect: false },
                  { text: "Melhora a autoimagem das mulheres", isCorrect: true },
                  { text: "Reduz a audiência de programas", isCorrect: false },
                ],
              },
            },
          ],
        },
      },
    }),
  ]);

  console.log("Quizzes, perguntas e opções criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
