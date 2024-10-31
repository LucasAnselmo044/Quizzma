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
    prisma.category.create({ data: { name: "Violência de Gênero" } }),
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
                  { text: "Falta de capacidade", isCorrect: false }
                ],
              },
            },
            {
              text: "Em qual setor a desigualdade de oportunidades é mais evidente?",
              options: {
                create: [
                  { text: "Setor de Tecnologia", isCorrect: true },
                  { text: "Setor Agrícola", isCorrect: false },
                  { text: "Setor de Turismo", isCorrect: false },
                  { text: "Setor de Ciências", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual é a diferença média de salário entre homens e mulheres em muitos países?",
              options: {
                create: [
                  { text: "5%", isCorrect: false},
                  { text: "25%", isCorrect: false},
                  { text: "20%", isCorrect: false},
                  { text: "15%", isCorrect: true}
                ]
              }
            },
            {
              text: "O que é o teto de vidro (glass ceiling)?",
              options : {
                create: [
                  { text: "Uma barreira invisível que impede mulheres de ascender a posições de liderança", isCorrect: true},
                  { text: "Uma política de contratação que favorece mulheres", isCorrect: false},
                  { text: "Uma lei que garante igualdade salarial", isCorrect: false},
                  {text: " Um programa de mentoria para mulheres", isCorrect: false}
                ]
              }
            }
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
                  { text: "70%", isCorrect: false }
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
                  { text: "Falta de recursos", isCorrect: false}
                ],
              },
            },
            {
              text: "O que é educação não formal e como ela se relaciona com a igualdade de gênero?",
              options: {
                create: [
                  { text: "Educação em ambientes informais, que pode capacitar mulheres e meninas", isCorrect: true },
                  { text: "Educação apenas para meninos", isCorrect: false },
                  { text: "Educação que não ensina sobre direitos de gêneros", isCorrect: false },
                  { text: "FApenas cursos online", isCorrect: false}
                ],
              },
            },
            {
              text: "O que é educação não formal e como ela se relaciona com a igualdade de gênero?",
              options: {
                create: [
                  { text: "Educação em ambientes informais, que pode capacitar mulheres e meninas", isCorrect: true },
                  { text: "Educação apenas para meninos", isCorrect: false },
                  { text: "Educação que não ensina sobre direitos de gêneros", isCorrect: false },
                  { text: "FApenas cursos online", isCorrect: false}
                ],
              },
            }
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
        title: "Quiz sobre Violência de Gênero",
        description: "Descubra a importância de saber sobre a Violência de Gênero.",
        categoryId: categories[3].id,
        questions: {
          create: [
            {
              text: "Qual é a forma mais comum de violência de gênero?",
              options: {
                create: [
                  { text: "Violência física", isCorrect: false },
                  { text: "Violência psicológica", isCorrect: true },
                  { text: "Violência sexual", isCorrect: false },
                  { text: "Violência patrimonial", isCorrect: false}
                ],
              },
            },
            {
              text: "Qual é a importância de se discutir violência de gênero nas escolas e na sociedade?",
              options: {
                create: [
                  { text: "Para reforçar papéis de gênero", isCorrect: false },
                  { text: "Para promover o respeito, a igualdade e a prevenção de comportamentos violentos", isCorrect: true },
                  { text: "Para desencorajar a busca por ajuda", isCorrect: false },
                  { text: "Para enfatizar que violência é um problema apenas privado", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual foi o impacto da Lei Maria da Penha na conscientização e redução da violência de gênero no Brasil?",
              options: {
                create: [
                  { text: "Nenhum impacto", isCorrect: false },
                  { text: "Redução significativa das denúncias", isCorrect: false },
                  { text: "Aumento da conscientização e do número de denúncias", isCorrect: true },
                  { text: "Eliminação da violência doméstica", isCorrect: false }
                ],
              },
            },
            {
              text: "Qual porcentagem de mulheres ao redor do mundo já experimentou algum tipo de violência física ou sexual em algum momento de suas vidas, de acordo com a OMS?",
              options: {
                create: [
                  { text: "Cerca de 15%", isCorrect: false },
                  { text: "Aproximadamente 25%", isCorrect: false },
                  { text: "Em torno de 33%", isCorrect: true },
                  { text: "Mais de 50%", isCorrect: false }
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
