// services/quizApi.ts
export async function fetchCategories() {
    const response = await fetch('https://quizapi.io/api/v1/categories', {
      headers: {
        'X-Api-Key': 'MqPOo7LPeoMTGULgydi4hBM4PGZtAuXxTB00c50a',
      },
    });
    return response.json();
  }
  
  export async function fetchQuizByCategory(category: string) {
    const response = await fetch(`https://quizapi.io/api/v1/questions?category=${category}`, {
      headers: {
        'X-Api-Key': 'MqPOo7LPeoMTGULgydi4hBM4PGZtAuXxTB00c50a',
      },
    });
    return response.json();
  }
  