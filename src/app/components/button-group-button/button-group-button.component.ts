import { Component } from '@angular/core';
import { ButtonGroupButtonDirective } from 'src/app/directives/button-group-button.directive';

@Component({
  selector: 'button[appButtonGroupButton]',
  templateUrl: './button-group-button.component.html',
  styleUrls: ['./button-group-button.component.css'],
})
export class ButtonGroupButtonComponent extends ButtonGroupButtonDirective {}
