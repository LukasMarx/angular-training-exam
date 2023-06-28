import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent {
  @Input() public parent?: FormGroup;
  @Input() public name?: string;

  @Input() public question?: string;
  @Input() public answer?: string;
  @Input() public options?: string[];
  @Input() public showCorrection = false;
}
