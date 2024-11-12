import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Defina as novas categorias que você quer adicionar
  const newCategories = [
    { name: 'Desigualdade de Gênero e Saúde' },
    { name: 'Mulheres e o Mercado Global' },
    { name: 'Violência Doméstica e Gênero' },
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

  // Defina os novos quizzes com perguntas e opções de resposta, incluindo description
  const newQuizzes = [
    {
      title: 'Quiz sobre Desigualdade de Gênero e Saúde',
      description: 'Teste seu conhecimento sobre a desigualdade de gênero no acesso à saúde.',
      categoryName: 'Desigualdade de Gênero e Saúde',
      questions: [
        {
          text: 'Qual é a taxa de mortalidade materna no Brasil? ',
          options: [
            { text: '15 por 100.000', isCorrect: false },
            { text: '35 por 100.000', isCorrect: true },
            { text: '50 por 100.000', isCorrect: false },
            { text: '20 por 100.000', isCorrect: false },
          ],
        },
        {
          text: 'Quantas mulheres no Brasil têm acesso a cuidados pré-natais adequados?',
          options: [
            { text: 'Apenas 50%', isCorrect: false },
            { text: 'Apenas 70%', isCorrect: true },
            { text: 'Apenas 30%', isCorrect: false },
            { text: 'Quase 100%', isCorrect: false },
          ],
        },
        {
          text: 'Qual é o impacto da violência doméstica na saúde das mulheres?',
          options: [
            { text: 'Nenhum impacto significativo', isCorrect: false },
            { text: 'Impacta o bem-estar emocional e físico', isCorrect: true },
            { text: 'Afeta apenas as mulheres em áreas rurais', isCorrect: false },
            { text: 'Impacta apenas mulheres idosas', isCorrect: false },
          ],
        },
        {
          text: 'Qual a principal razão para a sub-representação feminina em cargos de liderança?',
          options: [
            { text: 'Falta de qualificação', isCorrect: false },
            { text: 'Estereótipos de gênero', isCorrect: true },
            { text: 'Falta de interesse', isCorrect: false },
            { text: 'Oportunidades iguais', isCorrect: false },
          ],
        },
        {
          text: 'Em que áreas as mulheres recebem salários mais baixos que os homens?',
          options: [
            { text: 'Saúde', isCorrect: false },
            { text: 'Tecnologia', isCorrect: true },
            { text: 'Engenharia', isCorrect: true },
            { text: 'Educação', isCorrect: false },
          ],
        },
        {
          text: 'Qual é a principal barreira para as mulheres no mercado de trabalho?',
          options: [
            { text: 'Baixa formação acadêmica', isCorrect: false },
            { text: 'Falta de redes de apoio', isCorrect: true },
            { text: 'Falta de experiência', isCorrect: false },
            { text: 'Falta de interesse em trabalhar', isCorrect: false },
          ],
        },
        {
          text: 'Qual é o impacto da licença maternidade na carreira das mulheres?',
          options: [
            { text: 'Nenhum impacto', isCorrect: false },
            { text: 'Atraso na progressão da carreira', isCorrect: true },
            { text: 'Aumento de salários', isCorrect: false },
            { text: 'Aumento de promoções', isCorrect: false },
          ],
        },
        {
          text: 'Qual é o principal desafio enfrentado pelas mulheres no mercado de tecnologia?',
          options: [
            { text: 'Falta de habilidades técnicas', isCorrect: false },
            { text: 'Estereótipos de gênero', isCorrect: true },
            { text: 'Baixos salários', isCorrect: false },
            { text: 'Falta de motivação', isCorrect: false },
          ],
        },
        {
          text: 'O que é a "teia de vidro" no contexto das mulheres no mercado de trabalho?',
          options: [
            { text: 'Uma rede de apoio para as mulheres', isCorrect: false },
            { text: 'O obstáculo invisível para ascensão das mulheres', isCorrect: true },
            { text: 'Uma política pública para igualdade salarial', isCorrect: false },
            { text: 'Aumento de mulheres em cargos de liderança', isCorrect: false },
          ],
        },
      ],
    },
    {
      title: 'Quiz sobre Mulheres e o Mercado Global',
      description: 'Teste seus conhecimentos sobre o papel das mulheres na economia global.',
      categoryName: 'Mulheres e o Mercado Global',
      questions: [
        {
          text: 'Qual é a porcentagem de mulheres no setor de TI globalmente?',
          options: [
            { text: '28%', isCorrect: false },
            { text: '25%', isCorrect: false },
            { text: '10%', isCorrect: true },
            { text: '50%', isCorrect: false },
          ],
        },
        {
          text: 'Quantas mulheres ocupam cargos de liderança em grandes empresas?',
          options: [
            { text: 'Apenas 5%', isCorrect: true },
            { text: 'Apenas 10%', isCorrect: false },
            { text: '20%', isCorrect: false },
            { text: '30%', isCorrect: false },
          ],
        },
        {
          text: 'Em quais países as mulheres têm maior acesso ao mercado de trabalho?',
          options: [
            { text: 'Países da Europa Ocidental', isCorrect: true },
            { text: 'Países da África Subsariana', isCorrect: false },
            { text: 'Países da Ásia Central', isCorrect: false },
            { text: 'Países da América Latina', isCorrect: false },
          ],
        },
      ],
    },
    {
      title: 'Quiz sobre Violência Doméstica e Gênero',
      description: 'Teste seus conhecimentos sobre a violência doméstica e suas implicações de gênero.',
      categoryName: 'Violência Doméstica e Gênero',
      questions: [
        {
          text: 'Qual é a principal causa da violência doméstica?',
          options: [
            { text: 'Desigualdade de poder e controle', isCorrect: true },
            { text: 'Problemas financeiros', isCorrect: false },
            { text: 'Diferenças culturais', isCorrect: false },
            { text: 'Comportamento agressivo', isCorrect: false },
          ],
        },
        {
          text: 'Quantas mulheres são vítimas de violência doméstica por ano no Brasil?',
          options: [
            { text: 'Mais de 1 milhão', isCorrect: true },
            { text: '500 mil', isCorrect: false },
            { text: '2 milhões', isCorrect: false },
            { text: '100 mil', isCorrect: false },
          ],
        },
        {
          text: 'O que pode ser feito para combater a violência doméstica?',
          options: [
            { text: 'Criar mais leis punitivas', isCorrect: false },
            { text: 'Educar a sociedade sobre igualdade de gênero', isCorrect: true },
            { text: 'Reforçar a vigilância policial', isCorrect: false },
            { text: 'Ignorar o problema', isCorrect: false },
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
