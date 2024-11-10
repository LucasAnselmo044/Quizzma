import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Defina as novas categorias que você quer adicionar
  const newCategories = [
    { name: 'Maternidade e Direitos das Mulheres' },
    { name: 'Igualdade de Oportunidades' },
    { name: 'Tecnologia e Diversidade' },
  ];

  // Faz upsert das categorias
  await Promise.all(
    newCategories.map(async (category) => {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {}, // Se já existe, mantém os dados atuais
        create: category, // Se não existe, cria a nova categoria
      });
    })
  );

  // Defina os novos quizzes com mais perguntas e opções de resposta, incluindo description
  const newQuizzes = [
    {
      title: 'Quiz sobre Maternidade e Direitos das Mulheres',
      description: 'Um quiz sobre os princípios da Maternidade e Direitos das Mulheres.',
      categoryName: 'Maternidade e Direitos das Mulheres',
      questions: [
        {
          text: 'Qual é o tempo de licença-maternidade garantido por lei no Brasil?',
          options: [
            { text: '90 dias', isCorrect: false },
            { text: '120 dias', isCorrect: false },
            { text: '180 dias', isCorrect: true },
            { text: '360 dias', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um exemplo de violação de direitos humanos?',
          options: [
            { text: 'Liberdade de expressão', isCorrect: false },
            { text: 'Discriminação racial', isCorrect: true },
            { text: 'Direito ao voto', isCorrect: false },
            { text: 'Liberdade de movimento', isCorrect: false },
          ],
        },
        {
          text: 'Qual é a base para os direitos humanos?',
          options: [
            { text: 'A economia de um país', isCorrect: false },
            { text: 'A dignidade humana', isCorrect: true },
            { text: 'A religião dominante', isCorrect: false },
            { text: 'A cultura local', isCorrect: false },
          ],
        },
      ],
    },
    {
      title: 'Quiz sobre Igualdade de Oportunidades',
      description: 'Teste seu conhecimento sobre igualdade de oportunidades.',
      categoryName: 'Igualdade de Oportunidades',
      questions: [
        {
          text: 'O que significa igualdade de oportunidades?',
          options: [
            { text: 'Acesso igual a direitos e oportunidades', isCorrect: true },
            { text: 'Favoritismo em contratações', isCorrect: false },
            { text: 'Preferência para grupos dominantes', isCorrect: false },
            { text: 'Oportunidades limitadas para minorias', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um exemplo de desigualdade de oportunidades?',
          options: [
            { text: 'Promover com base no desempenho', isCorrect: false },
            { text: 'Discriminação salarial de gênero', isCorrect: true },
            { text: 'Igualdade de salários para todos', isCorrect: false },
            { text: 'Respeito aos direitos trabalhistas', isCorrect: false },
          ],
        },
        {
          text: 'Qual é o objetivo da igualdade de oportunidades?',
          options: [
            { text: 'Impedir a ascensão social', isCorrect: false },
            { text: 'Garantir tratamento justo para todos', isCorrect: true },
            { text: 'Dar preferência a um grupo específico', isCorrect: false },
            { text: 'Reduzir o acesso à educação', isCorrect: false },
          ],
        },
      ],
    },
    {
      title: 'Quiz sobre Tecnologia e Diversidade',
      description: 'Explore a importância da diversidade na tecnologia.',
      categoryName: 'Tecnologia e Diversidade',
      questions: [
        {
          text: 'Por que a diversidade é importante na tecnologia?',
          options: [
            { text: 'Para aumentar o lucro das empresas', isCorrect: false },
            { text: 'Para criar soluções mais inclusivas', isCorrect: true },
            { text: 'Para garantir empregos apenas para homens', isCorrect: false },
            { text: 'Para eliminar a inovação', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um exemplo de ação para promover a diversidade na tecnologia?',
          options: [
            { text: 'Contratar apenas homens brancos', isCorrect: false },
            { text: 'Incentivar mulheres em STEM', isCorrect: true },
            { text: 'Eliminar treinamentos sobre inclusão', isCorrect: false },
            { text: 'Desigualdade salarial', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um desafio para aumentar a diversidade na tecnologia?',
          options: [
            { text: 'Falta de candidatos qualificados de grupos sub-representados', isCorrect: true },
            { text: 'Excesso de diversidade', isCorrect: false },
            { text: 'Aumento de custos', isCorrect: false },
            { text: 'Falta de interesse de todos os grupos', isCorrect: false },
          ],
        },
      ],
    },
  ];

  // Insere ou atualiza os novos quizzes com as perguntas e opções adicionais
  await Promise.all(
    newQuizzes.map(async (quiz) => {
      const category = await prisma.category.findUnique({
        where: { name: quiz.categoryName },
      });

      if (category) {
        const existingQuiz = await prisma.quiz.findFirst({
          where: { title: quiz.title },
        });

        if (existingQuiz) {
          // Atualiza o quiz existente e recria as perguntas e opções
          await prisma.quiz.update({
            where: { id: existingQuiz.id },
            data: {
              description: quiz.description,
              categoryId: category.id,
              questions: {
                deleteMany: {}, // Remove as perguntas antigas
                create: quiz.questions.map((question) => ({
                  text: question.text,
                  options: {
                    create: question.options,
                  },
                })),
              },
            },
          });
        } else {
          // Cria o novo quiz com as perguntas e opções
          await prisma.quiz.create({
            data: {
              title: quiz.title,
              description: quiz.description,
              categoryId: category.id,
              questions: {
                create: quiz.questions.map((question) => ({
                  text: question.text,
                  options: {
                    create: question.options,
                  },
                })),
              },
            },
          });
        }
      }
    })
  );

  console.log('Novas categorias e quizzes adicionados ou atualizados com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
