import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ID do usuário (substitua pelo ID real ou use um ID válido)
  const userId = 1;

  // Array de categorias e quizzes a serem criados
  const categorias = [
    { name: 'Desigualdade de Gênero' },
    { name: 'Direitos das Mulheres' },
    { name: 'Feminismo e História' },
    { name: 'Políticas Públicas de Igualdade' },
    { name: 'Mulheres na Ciência e Tecnologia' }
  ];

  // Cria as categorias
  const createdCategories = await Promise.all(
    categorias.map(async (categoria) => {
      return prisma.category.upsert({
        where: { name: categoria.name },
        update: {},
        create: { name: categoria.name }
      });
    })
  );

  // Cria quizzes e perguntas associados a cada categoria
  await Promise.all(
    createdCategories.map(async (category, index) => {
      await prisma.quiz.upsert({
        where: { title: `Quiz sobre ${category.name}` },
        update: {},
        create: {
          title: `Quiz sobre ${category.name}`,
          description: `Explore temas sobre ${category.name}.`,
          categoryId: category.id,
          userId: userId, // Adiciona userId aqui
          questions: {
            create: [
              {
                text: `Pergunta ${index + 1} sobre ${category.name}: Qual das opções está correta?`,
                options: {
                  create: [
                    { text: 'Opção 1', isCorrect: false },
                    { text: 'Opção 2', isCorrect: true },
                    { text: 'Opção 3', isCorrect: false }
                  ]
                }
              },
              {
                text: `Pergunta ${index + 2} sobre ${category.name}: Qual é a resposta correta?`,
                options: {
                  create: [
                    { text: 'Resposta A', isCorrect: true },
                    { text: 'Resposta B', isCorrect: false },
                    { text: 'Resposta C', isCorrect: false }
                  ]
                }
              }
            ]
          }
        }
      });
    })
  );

  console.log('Seed data added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
