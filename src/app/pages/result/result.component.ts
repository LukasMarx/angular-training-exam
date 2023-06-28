import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, shareReplay, take } from 'rxjs';
import { AnswerForm } from 'src/app/interfaces/answer-form';
import { TriviaQuestion } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public result$: Observable<{
    questions: TriviaQuestion[];
    answers: AnswerForm;
  }> = this.route.params.pipe(
    map((params) =>
      JSON.parse(
        decodeURIComponent(atob(decodeURIComponent(params['results'])))
      )
    ),
    shareReplay(1)
  );

  public questions$ = this.result$.pipe(map((result) => result.questions));
  public answers$ = this.result$.pipe(map((result) => result.answers));

  public readonly answersFormGroup = new FormGroup({
    question1: new FormControl('', [Validators.required]),
    question2: new FormControl('', [Validators.required]),
    question3: new FormControl('', [Validators.required]),
    question4: new FormControl('', [Validators.required]),
    question5: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.answers$.pipe(takeUntilDestroyed()).subscribe((answers) => {
      this.answersFormGroup.setValue(answers);
    });
    this.answersFormGroup.disable();
  }

  public getCorrectAnswerCount() {
    const values = Object.values(this.answersFormGroup.value);
    return this.questions$.pipe(
      take(1),
      map((questions) => {
        return questions.filter(
          (question, index) => question.correct_answer === values[index]
        ).length;
      })
    );
  }

  public getScoreBackgroundColor() {
    return this.getCorrectAnswerCount().pipe(
      map((count) => {
        if (count > 3) {
          return 'green';
        }
        if (count > 1) {
          return 'yellow';
        }
        return 'red';
      })
    );
  }

  public getQuestionName(index: number) {
    return `question${index}`;
  }

  public createNewQuiz() {
    this.router.navigate(['']);
  }
}
