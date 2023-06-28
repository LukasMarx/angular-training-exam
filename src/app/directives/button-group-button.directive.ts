import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { ButtonGroupService } from '../services/button-group.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';

@Directive({
  selector: '[appButtonGroupButton]',
})
export class ButtonGroupButtonDirective {
  protected readonly buttonGroupService = inject(ButtonGroupService);
  protected readonly elementRef = inject(ElementRef);

  @Input({ required: true }) public value?: string;
  @Input() public text?: string;

  public isSelected$ = this.buttonGroupService.selectedValue$.pipe(
    map((value) => value === this.value)
  );

  constructor() {
    if (!(this.elementRef.nativeElement as HTMLElement).getAttribute('type')) {
      (this.elementRef.nativeElement as HTMLElement).setAttribute(
        'type',
        'button'
      );
    }
  }

  public isCorretion$ = combineLatest([
    this.buttonGroupService.selectedValue$,
    this.buttonGroupService.correctValue$,
    this.buttonGroupService.showCorrectButton$,
  ]).pipe(
    map(
      ([value, correctValue, show]) =>
        show && value !== this.value && this.value === correctValue
    )
  );

  @HostListener('click')
  public onClick() {
    this.buttonGroupService.setSelectedValue(this.value);
  }
}
