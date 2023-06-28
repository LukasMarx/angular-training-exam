import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorySelectionComponent } from './components/category-selection/category-selection.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { QuestionComponent } from './components/question/question.component';
import { ButtonGroupButtonDirective } from './directives/button-group-button.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonGroupButtonComponent } from './components/button-group-button/button-group-button.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    ButtonGroupComponent,
    QuestionComponent,
    ButtonGroupButtonDirective,
    ButtonGroupButtonComponent,
    QuizComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
