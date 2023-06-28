import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  QuizService,
  TriviaCategory,
  TriviaDificulty,
  TriviaQuestion,
} from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  public readonly categoryFormGroup = new FormGroup({
    category: new FormControl(9, [Validators.required]),
    difficulty: new FormControl('easy', [Validators.required]),
  });

  public readonly answersFormGroup = new FormGroup({
    question1: new FormControl('', [Validators.required]),
    question2: new FormControl('', [Validators.required]),
    question3: new FormControl('', [Validators.required]),
    question4: new FormControl('', [Validators.required]),
    question5: new FormControl('', [Validators.required]),
  });

  public questions: TriviaQuestion[] = [];
  public categories: TriviaCategory[] = [];
  public difficulties = ['easy', 'medium', 'hard'];

  constructor() {
    this.quizService
      .getCategories()
      .subscribe((catergories) => (this.categories = catergories));
  }

  public getQuestionName(index: number) {
    return `question${index}`;
  }

  public onSubmit() {
    this.router.navigate(
      [
        `/result/${encodeURIComponent(
          btoa(
            encodeURIComponent(
              JSON.stringify({
                questions: this.questions,
                answers: this.answersFormGroup.value,
              })
            )
          )
        )}`,
      ],
      {}
    );
  }

  public onCreateQuiz() {
    const value = this.categoryFormGroup.value;
    if (this.categoryFormGroup.valid) {
      this.quizService
        .getQuestions(
          value.category || 0,
          (value.difficulty || 'easy') as TriviaDificulty
        )
        .subscribe((questions) => (this.questions = questions));
    }
  }
}
