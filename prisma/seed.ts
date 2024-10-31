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
    prisma.category.create({ data: { name: "Violência contra a mulher" } }),
    prisma.category.create({ data: { name: "Desigualdade na área da T.I"}})
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
              text: "Qual é a principal consequência da desigualdade de gênero no local de trabalho?",
              options: {
                create: [
                  { text: "Aumento da produtividade geral", isCorrect: false },
                  { text: "Diminuição da diversidade de ideias e inovação", isCorrect: true },
                  { text: "Melhoria na cultura organizacional", isCorrect: false },
                  { text: "Aumento da concorrência saudável", isCorrect: false }
                ],
              },
            },
            {
              text: "Como as políticas de licença parental podem impactar a igualdade de gênero no trabalho?",
              options: {
                create: [
                  { text: "Elas não têm impacto significativo", isCorrect: false },
                  { text: "Podem ajudar a equilibrar as responsabilidades entre pais e mães", isCorrect: true },
                  { text: "Apenas beneficiam as mulheres", isCorrect: false },
                  { text: "Elas criam mais desigualdade ao encarecer as empresas", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual é um fator que contribui para a sub-representação de mulheres em cargos de liderança?",
              options: {
                create: [
                  { text: "Habilidades de liderança inferiores", isCorrect: false },
                  { text: "Falta de modelos femininos e mentorias", isCorrect: true },
                  { text: "Preferência por ambientes de trabalho dominados por homens", isCorrect: false },
                  { text: "Aumento do número de mulheres no mercado de trabalho", isCorrect: false }
                ],
              },
            },
            {
              text: "Como a cultura organizacional pode influenciar a desigualdade de gênero no local de trabalho?",
              options: {
                create: [
                  { text: "A cultura não tem efeito sobre a desigualdade de gênero", isCorrect: false },
                  { text: "Uma cultura inclusiva pode promover a igualdade de oportunidades", isCorrect: true },
                  { text: "A cultura organizacional é sempre neutra em relação a gênero", isCorrect: false },
                  { text: "A cultura organizacional só é importante para cargos de liderança", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual é o papel da legislação na promoção da igualdade de oportunidades de gênero no trabalho?",
              options: {
                create: [
                  { text: "É irrelevante, pois a mudança deve vir das empresas", isCorrect: false },
                  { text: "Ajuda a garantir direitos iguais e penaliza a discriminação", isCorrect: true },
                  { text: "Cria mais burocracia e inibe a inovação", isCorrect: false },
                  { text: "Só serve para aumentar a desigualdade", isCorrect: false }
                ],
              },
            },         
          ],
        },
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Quiz sobre Educação e Igualdade de Gênero",
        description: "Teste seus conhecimentos sobre o papel da educação na promoção da igualdade de gênero.",
        categoryId: categories[1].id,
        questions: {
          create: [
            {
              text: "Qual é o impacto de uma educação inclusiva para meninas e mulheres nas sociedades?",
              options: {
                create: [
                  { text: "Nenhum impacto, pois educação é apenas um direito individual", isCorrect: false },
                  { text: "Reduz a desigualdade e promove desenvolvimento econômico e social", isCorrect: true },
                  { text: "Pode resultar em conflitos de gênero", isCorrect: false },
                  { text: "Promove competitividade entre homens e mulheres", isCorrect: false }
                ],
              },
            },
            {
              text: "Quais são alguns dos principais obstáculos para que meninas em comunidades rurais possam acessar a educação?",
              options: {
                create: [
                  { text: "Distância de instituições e normas culturais", isCorrect: true },
                  { text: "Interesse apenas em atividades domésticas", isCorrect: false },
                  { text: "Falta de professores do sexo feminino", isCorrect: false },
                  { text: "Apenas falta de recursos financeiros", isCorrect: false }
                ],
              },
            },
            {
              text: "Como a educação não formal contribui para a igualdade de gênero em comunidades com limitações educacionais?",
              options: {
                create: [
                  { text: "Oferece aprendizado prático e promove conscientização sobre direitos e igualdade", isCorrect: true },
                  { text: "É focada em atividades esportivas e recreativas", isCorrect: false },
                  { text: "Ensina apenas habilidades específicas de trabalho", isCorrect: false },
                  { text: "É uma opção menos importante comparada à educação formal", isCorrect: false }
                ],
              },
            },
            {
              text: "Estudos indicam que aumentar a presença feminina no ensino superior pode trazer quais benefícios para a sociedade?",
              options: {
                create: [
                  { text: "Apenas melhora nas oportunidades de emprego para mulheres", isCorrect: false },
                  { text: "Maior inovação, diversidade de perspectivas e progresso econômico", isCorrect: true },
                  { text: "Diminuição das oportunidades de emprego para homens", isCorrect: false },
                  { text: "Maior igualdade, mas com impactos econômicos negativos", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual é o papel dos currículos que promovem igualdade de gênero na educação formal?",
              options: {
                create: [
                  { text: "São focados exclusivamente em estudos de gênero", isCorrect: false },
                  { text: "Ajudam a reduzir preconceitos e incentivar uma cultura de igualdade desde cedo", isCorrect: true },
                  { text: "Não têm efeito real na sociedade", isCorrect: false },
                  { text: "Servem para orientar apenas as mulheres sobre seus direitos", isCorrect: false }
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
        description: "Explore os impactos e as implicações da representação de gênero na mídia.",
        categoryId: categories[2].id,
        questions: {
          create: [
            {
              text: "Como a representação feminina frequentemente aparece em filmes e programas populares?",
              options: {
                create: [
                  { text: "Como personagens principais e complexas", isCorrect: false },
                  { text: "Como secundárias e muitas vezes com papéis estereotipados", isCorrect: true },
                  { text: "Principalmente como líderes fortes", isCorrect: false },
                  { text: "Em representações equilibradas e realistas", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual o impacto de uma representação equitativa de gêneros na percepção pública sobre os papéis de gênero?",
              options: {
                create: [
                  { text: "Pode diminuir estereótipos e influenciar positivamente as expectativas sociais", isCorrect: true },
                  { text: "Nenhum impacto significativo", isCorrect: false },
                  { text: "Reflete apenas o que já acontece na sociedade", isCorrect: false },
                  { text: "Reforça as diferenças de gênero ao invés de minimizá-las", isCorrect: false }
                ],
              },
            },
            {
              text: "De acordo com estudos, qual é um efeito comum da objetificação de personagens femininas na mídia?",
              options: {
                create: [
                  { text: "Aumento da autoestima entre jovens mulheres", isCorrect: false },
                  { text: "Desvalorização de competências e habilidades reais das mulheres", isCorrect: true },
                  { text: "Mais interesse em papéis de liderança", isCorrect: false },
                  { text: "Nenhuma mudança na percepção social", isCorrect: false }
                ],
              },
            },
            {
              text: "Como a representação de mulheres em papéis de liderança na mídia pode impactar a sociedade?",
              options: {
                create: [
                  { text: "Não afeta, pois a mídia é apenas entretenimento", isCorrect: false },
                  { text: "Pode inspirar e normalizar a presença feminina em cargos de alta relevância", isCorrect: true },
                  { text: "Diminui a importância dos papéis tradicionais", isCorrect: false },
                  { text: "Provoca uma desconexão entre a realidade e a ficção", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual é a consequência da ausência de diversidade de gênero e raça na mídia?",
              options: {
                create: [
                  { text: "Promove uma visão homogênea e limitadora da sociedade", isCorrect: true },
                  { text: "Não tem efeito na percepção das pessoas", isCorrect: false },
                  { text: "Garante uma mensagem universal e imparcial", isCorrect: false },
                  { text: "Aumenta a audiência devido à simplicidade dos papéis", isCorrect: false }
                ],
              },
            },
          ],
        },
      },
    }),    
    prisma.quiz.create({
      data: {
        title: "Quiz sobre Violência Contra a Mulher",
        description: "Avalie seus conhecimentos sobre os tipos, causas e impactos da violência contra a mulher.",
        categoryId: categories[3].id, // Certifique-se de que o ID da categoria está correto
        questions: {
          create: [
            {
              text: "Qual é o tipo mais comum de violência doméstica sofrida por mulheres no Brasil?",
              options: {
                create: [
                  { text: "Violência física", isCorrect: false },
                  { text: "Violência psicológica e emocional", isCorrect: true },
                  { text: "Violência sexual", isCorrect: false },
                  { text: "Violência patrimonial", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual é o objetivo da Lei Maria da Penha no Brasil?",
              options: {
                create: [
                  { text: "Promover a igualdade salarial entre homens e mulheres", isCorrect: false },
                  { text: "Proteger as mulheres da violência doméstica e familiar", isCorrect: true },
                  { text: "Incentivar a criação de políticas de maternidade", isCorrect: false },
                  { text: "Reforçar papéis de gênero tradicionais", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual é uma barreira comum que impede muitas mulheres de denunciarem casos de violência?",
              options: {
                create: [
                  { text: "Falta de leis específicas sobre o tema", isCorrect: false },
                  { text: "Medo de represálias e falta de apoio familiar", isCorrect: true },
                  { text: "Ausência de delegacias especializadas", isCorrect: false },
                  { text: "Acreditar que a violência não é um problema sério", isCorrect: false },
                ],
              },
            },
            {
              text: "Como a sociedade pode contribuir para a prevenção da violência contra a mulher?",
              options: {
                create: [
                  { text: "Silenciando discussões sobre o tema", isCorrect: false },
                  { text: "Promovendo a conscientização e oferecendo apoio às vítimas", isCorrect: true },
                  { text: "Encorajando as mulheres a permanecerem em situações de violência", isCorrect: false },
                  { text: "Ignorando comportamentos abusivos", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual é o impacto da violência doméstica na saúde mental das mulheres?",
              options: {
                create: [
                  { text: "Melhora a resiliência emocional das mulheres", isCorrect: false },
                  { text: "Pode causar traumas duradouros e distúrbios emocionais", isCorrect: true },
                  { text: "Não possui impacto psicológico significativo", isCorrect: false },
                  { text: "Aumenta a produtividade no trabalho", isCorrect: false },
                ],
              },
            },
          ],
        },
      },
    }),    
    prisma.quiz.create({
      data: {
        title: "Desigualdade na área da T.I",
        description: "Desafie seus conhecimentos sobre as barreiras e a desigualdade de gênero no setor de tecnologia.",
        categoryId: categories[4].id,
        questions: {
          create: [
            {
              text: "Qual é uma consequência da falta de diversidade de gênero no desenvolvimento de software?",
              options: {
                create: [
                  { text: "Melhor aceitação de produtos devido à uniformidade de ideias", isCorrect: false },
                  { text: "Riscos aumentados de vieses nos algoritmos e produtos criados", isCorrect: true },
                  { text: "Maior foco em funcionalidades e menos em design", isCorrect: false },
                  { text: "Diminuição do custo com salários na área de TI", isCorrect: false },
                ],
              },
            },
            {
              text: "Estudos indicam que a sub-representação de mulheres em TI pode ser atribuída a:",
              options: {
                create: [
                  { text: "Preferência das mulheres por outras áreas", isCorrect: false },
                  { text: "Fatores culturais e falta de incentivo na formação inicial", isCorrect: true },
                  { text: "A falta de flexibilidade de horários em empresas de TI", isCorrect: false },
                  { text: "Políticas públicas insuficientes para formar profissionais da área", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual política corporativa pode ajudar a reduzir a evasão feminina na tecnologia?",
              options: {
                create: [
                  { text: "Reduzir o número de vagas femininas para evitar favoritismo", isCorrect: false },
                  { text: "Implementar políticas de flexibilidade e apoio ao equilíbrio entre trabalho e vida pessoal", isCorrect: true },
                  { text: "Restringir cargos de liderança para promover igualdade", isCorrect: false },
                  { text: "Promover mentoria exclusiva para lideranças masculinas", isCorrect: false },
                ],
              },
            },
            {
              text: "Como o viés inconsciente pode afetar a contratação de mulheres na TI?",
              options: {
                create: [
                  { text: "Aumenta as chances de contratação de mulheres para cargos de liderança", isCorrect: false },
                  { text: "Impacta negativamente, pois pode levar a julgamentos baseados em estereótipos", isCorrect: true },
                  { text: "Neutraliza as políticas de inclusão nas empresas", isCorrect: false },
                  { text: "Tem impacto insignificante devido à neutralidade dos processos de recrutamento", isCorrect: false },
                ],
              },
            },
            {
              text: "Qual fator contribui para a falta de progressão na carreira de mulheres na área de TI?",
              options: {
                create: [
                  { text: "Menor dedicação e foco das mulheres comparado aos homens", isCorrect: false },
                  { text: "Desigualdade no acesso a oportunidades de desenvolvimento e treinamento", isCorrect: true },
                  { text: "Preferência feminina por cargos não técnicos", isCorrect: false },
                  { text: "Maior resistência das mulheres a mudanças tecnológicas", isCorrect: false },
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
