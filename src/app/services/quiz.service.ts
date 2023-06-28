import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shuffle } from 'lodash';
import { map } from 'rxjs';

interface TriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export type TriviaDificulty = 'easy' | 'medium' | 'hard';

interface TriviaQuestionResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaQuestion {
  category: string;
  type: 'multiple';
  difficulty: TriviaDificulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly httpClient = inject(HttpClient);

  public getCategories() {
    return this.httpClient
      .get<TriviaCategoryResponse>(`https://opentdb.com/api_category.php`)
      .pipe(map((response) => response.trivia_categories));
  }

  public getQuestions(categoryId: number, dificulty: TriviaDificulty = 'easy') {
    return this.httpClient
      .get<TriviaQuestionResponse>('https://opentdb.com/api.php', {
        params: {
          amount: 5,
          category: categoryId,
          difficulty: dificulty,
          type: 'multiple',
        },
      })
      .pipe(
        map((response) =>
          response.results.map((question) => ({
            ...question,
            all_answers: shuffle([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
          }))
        )
      );
  }
}
