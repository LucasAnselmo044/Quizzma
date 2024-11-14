import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



async function main() {
  // Deletar as opções antes de atualizar as categorias
  console.log('Deletando opções antigas associadas a questões...');
  await prisma.option.deleteMany({});
  
  // Deletar todas as questões se necessário
  console.log('Deletando questões antigas...');
  await prisma.question.deleteMany({});
  
  // Deletar todas as categorias antigas
  console.log('Deletando categorias antigas...');
  await prisma.category.deleteMany({});
  
  // Definindo novas categorias
  const newCategories = [
    { name: 'Desigualdade de Gênero no Mercado de Trabalho' },
    { name: 'Papel das Mulheres na Política' },
    { name: 'Acesso à Educação e Gênero' },
  ];

  console.log('Todas as questões e categorias deletadas com sucesso!')

  await Promise.all(
    newCategories.map(async (category) => {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {}, 
        create: category, 
      });
    })
  );

  // Defina os novos quizzes com perguntas e opções de resposta, incluindo description
  const newQuizzes = [
    {
      title: 'Quiz sobre Desigualdade de Gênero no Mercado de Trabalho',
      description: 'Teste seu conhecimento sobre as disparidades de gênero no mercado de trabalho.',
      categoryName: 'Desigualdade de Gênero no Mercado de Trabalho',
      questions: [
        {
          text: 'Qual é a diferença salarial média entre homens e mulheres no Brasil?',
          options: [
            { text: 'Não há diferença', isCorrect: false },
            { text: '15%', isCorrect: false },
            { text: '20%', isCorrect: false },
            { text: '28%', isCorrect: true },
          ],
        },
        {
          text: 'Qual a porcentagem de mulheres no mercado de tecnologia?',
          options: [
            { text: '15%', isCorrect: true },
            { text: '30%', isCorrect: false },
            { text: '50%', isCorrect: false },
            { text: '10%', isCorrect: false },
          ],
        },
        {
          text: 'A discriminação salarial de gênero no Brasil é mais visível em quais áreas?',
          options: [
            { text: 'Saúde', isCorrect: false },
            { text: 'Tecnologia e Engenharia', isCorrect: true },
            { text: 'Educação', isCorrect: false },
            { text: 'Administração', isCorrect: false },
          ],
        },
        {
          text: 'Qual o percentual de mulheres em cargos de liderança no Brasil?',
          options: [
            { text: '40%', isCorrect: false },
            { text: '20%', isCorrect: true },
            { text: '60%', isCorrect: false },
            { text: '10%', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um dos principais fatores para a menor presença de mulheres em cargos de chefia?',
          options: [
            { text: 'Falta de qualificação', isCorrect: false },
            { text: 'Menor confiança das mulheres', isCorrect: false },
            { text: 'Discriminação e estereótipos', isCorrect: true },
            { text: 'Escolhas pessoais', isCorrect: false },
          ],
        },
        {
          text: 'Qual é a porcentagem aproximada de mulheres nas áreas de exatas no Brasil?',
          options: [
            { text: '13%', isCorrect: true },
            { text: '30%', isCorrect: false },
            { text: '50%', isCorrect: false },
            { text: '70%', isCorrect: false },
          ],
        },
        {
          text: 'A licença-maternidade pode impactar a desigualdade salarial de gênero porque:',
          options: [
            { text: 'Aumenta o tempo das mulheres fora do mercado', isCorrect: true },
            { text: 'Os empregadores preferem contratar homens', isCorrect: false },
            { text: 'As mulheres voltam com mais experiência', isCorrect: false },
            { text: 'Afeta somente mulheres', isCorrect: false },
          ],
        },
        {
          text: 'Qual medida pode ajudar a reduzir a desigualdade de gênero no mercado?',
          options: [
            { text: 'Foco exclusivo em qualificação', isCorrect: false },
            { text: 'Divulgação de dados salariais por empresas', isCorrect: true },
            { text: 'Contratar mais homens', isCorrect: false },
            { text: 'Incentivar empregos femininos apenas em áreas tradicionais', isCorrect: false },
          ],
        },
        {
          text: 'Mulheres são mais afetadas por desigualdade de gênero em ambientes de trabalho quando:',
          options: [
            { text: 'Têm menos tempo de experiência', isCorrect: false },
            { text: 'São mães', isCorrect: true },
            { text: 'Não têm acesso a transporte', isCorrect: false },
            { text: 'Moram longe da empresa', isCorrect: false },
          ],
        },
        {
          text: 'Qual política tem o maior potencial para diminuir a diferença salarial entre homens e mulheres?',
          options: [
            { text: 'Promoção de cargos apenas por tempo de trabalho', isCorrect: false },
            { text: 'Maior transparência nos salários', isCorrect: true },
            { text: 'Aumento de carga horária', isCorrect: false },
            { text: 'Permitir menos horas para mulheres', isCorrect: false },
          ],
        },
      ],
    },  
    {
      title: 'Quiz sobre Papel das Mulheres na Política',
      description: 'Teste seus conhecimentos sobre a participação das mulheres na política.',
      categoryName: 'Papel das Mulheres na Política',
      questions: [
        {
          text: 'Qual foi a primeira mulher eleita presidente no Brasil?',
          options: [
            { text: 'Dilma Rousseff', isCorrect: true },
            { text: 'Marina Silva', isCorrect: false },
            { text: 'Carmen Lúcia', isCorrect: false },
            { text: 'Luiza Erundina', isCorrect: false },
          ],
        },
        {
          text: 'Em qual país as mulheres conquistaram o direito de votar pela primeira vez?',
          options: [
            { text: 'Brasil', isCorrect: false },
            { text: 'Nova Zelândia', isCorrect: true },
            { text: 'Estados Unidos', isCorrect: false },
            { text: 'França', isCorrect: false },
          ],
        },
        {
          text: 'Qual a porcentagem de mulheres no Congresso Nacional do Brasil?',
          options: [
            { text: '5%', isCorrect: false },
            { text: '20%', isCorrect: true },
            { text: '50%', isCorrect: false },
            { text: '30%', isCorrect: false },
          ],
        },
        {
          text: 'Qual país teve a primeira mulher eleita para o cargo de primeira-ministra?',
          options: [
            { text: 'Índia', isCorrect: false },
            { text: 'Reino Unido', isCorrect: true },
            { text: 'Alemanha', isCorrect: false },
            { text: 'Itália', isCorrect: false },
          ],
        },
        {
          text: 'Quem foi a primeira mulher a ocupar um cargo político no Brasil?',
          options: [
            { text: 'Carlota Pereira de Queirós', isCorrect: true },
            { text: 'Dilma Rousseff', isCorrect: false },
            { text: 'Luiza Erundina', isCorrect: false },
            { text: 'Marta Suplicy', isCorrect: false },
          ],
        },
        {
          text: 'Qual a porcentagem aproximada de mulheres no Parlamento Europeu?',
          options: [
            { text: '25%', isCorrect: false },
            { text: '39%', isCorrect: true },
            { text: '45%', isCorrect: false },
            { text: '60%', isCorrect: false },
          ],
        },
        {
          text: 'Em qual década as mulheres brasileiras conquistaram o direito ao voto?',
          options: [
            { text: '1920', isCorrect: false },
            { text: '1930', isCorrect: true },
            { text: '1940', isCorrect: false },
            { text: '1950', isCorrect: false },
          ],
        },
        {
          text: 'Quem foi a primeira mulher negra eleita vereadora no Brasil?',
          options: [
            { text: 'Tereza de Benguela', isCorrect: false },
            { text: 'Marielle Franco', isCorrect: true },
            { text: 'Sueli Carneiro', isCorrect: false },
            { text: 'Dandara dos Palmares', isCorrect: false },
          ],
        },
        {
          text: 'Qual país da América Latina foi o primeiro a eleger uma mulher presidente?',
          options: [
            { text: 'Chile', isCorrect: true },
            { text: 'Brasil', isCorrect: false },
            { text: 'Argentina', isCorrect: false },
            { text: 'Colômbia', isCorrect: false },
          ],
        },
        {
          text: 'Qual é o objetivo das cotas de gênero na política?',
          options: [
            { text: 'Restringir o número de candidaturas femininas', isCorrect: false },
            { text: 'Aumentar a participação feminina na política', isCorrect: true },
            { text: 'Exigir campanhas financiadas para mulheres', isCorrect: false },
            { text: 'Impedir a participação de homens em certos cargos', isCorrect: false },
          ],
        },
      ],
    },    
    {
      title: 'Quiz sobre Acesso à Educação e Gênero',
      description: 'Teste seu conhecimento sobre as desigualdades de gênero no acesso à educação.',
      categoryName: 'Acesso à Educação e Gênero',
      questions: [
        {
          text: 'Em quais áreas as mulheres têm menos acesso no ensino superior?',
          options: [
            { text: 'Medicina', isCorrect: false },
            { text: 'Engenharia e Tecnologia', isCorrect: true },
            { text: 'Administração', isCorrect: false },
            { text: 'Direito', isCorrect: false },
          ],
        },
        {
          text: 'Qual é a taxa de evasão escolar entre meninas no ensino médio no Brasil?',
          options: [
            { text: 'Menos de 10%', isCorrect: false },
            { text: 'Entre 20% e 30%', isCorrect: true },
            { text: 'Mais de 50%', isCorrect: false },
            { text: 'Não há evasão', isCorrect: false },
          ],
        },
        {
          text: 'Qual é a principal barreira para a educação das meninas em áreas rurais no Brasil?',
          options: [
            { text: 'Falta de escolas', isCorrect: false },
            { text: 'Falta de transporte escolar', isCorrect: false },
            { text: 'Desigualdade de gênero', isCorrect: true },
            { text: 'Falta de interesse das meninas', isCorrect: false },
          ],
        },
        {
          text: 'Qual continente tem a maior taxa de analfabetismo entre meninas?',
          options: [
            { text: 'Europa', isCorrect: false },
            { text: 'América do Sul', isCorrect: false },
            { text: 'África', isCorrect: true },
            { text: 'Ásia', isCorrect: false },
          ],
        },
        {
          text: 'Qual é um dos principais fatores que dificultam o acesso das meninas à educação em países em desenvolvimento?',
          options: [
            { text: 'Excesso de escolas', isCorrect: false },
            { text: 'Desigualdade de gênero', isCorrect: true },
            { text: 'Distribuição gratuita de material escolar', isCorrect: false },
            { text: 'Baixa taxa de natalidade', isCorrect: false },
          ],
        },
        {
          text: 'Qual porcentagem de mulheres em comparação aos homens termina o ensino superior no Brasil?',
          options: [
            { text: '20% menos', isCorrect: false },
            { text: 'Proporção semelhante', isCorrect: true },
            { text: '50% menos', isCorrect: false },
            { text: '10% menos', isCorrect: false },
          ],
        },
        {
          text: 'Em média, em quantos anos a educação das mulheres é interrompida devido a casamento infantil em alguns países?',
          options: [
            { text: '2 anos', isCorrect: true },
            { text: 'Nenhum', isCorrect: false },
            { text: '5 anos', isCorrect: false },
            { text: '10 anos', isCorrect: false },
          ],
        },
        {
          text: 'Qual programa global visa promover a educação das meninas e mulheres?',
          options: [
            { text: 'UNESCO Girls', isCorrect: false },
            { text: 'ONU Mulheres', isCorrect: true },
            { text: 'Educação para Todos', isCorrect: false },
            { text: 'UNICEF Meninas', isCorrect: false },
          ],
        },
        {
          text: 'Qual fator cultural ainda impacta negativamente o acesso das meninas à educação?',
          options: [
            { text: 'Preferência por atividades extracurriculares', isCorrect: false },
            { text: 'Preferência pela educação dos meninos', isCorrect: true },
            { text: 'Preferência por escolas privadas', isCorrect: false },
            { text: 'Preferência por disciplinas artísticas', isCorrect: false },
          ],
        },
        {
          text: 'Qual medida pode aumentar o acesso das meninas à educação em regiões de baixa renda?',
          options: [
            { text: 'Aumentar taxas escolares', isCorrect: false },
            { text: 'Fornecer bolsas de estudo', isCorrect: true },
            { text: 'Reduzir a quantidade de professores', isCorrect: false },
            { text: 'Estabelecer ensino apenas online', isCorrect: false },
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