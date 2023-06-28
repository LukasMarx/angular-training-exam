import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonGroupService } from 'src/app/services/button-group.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css'],
  providers: [
    ButtonGroupService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonGroupComponent),
      multi: true,
    },
  ],
})
export class ButtonGroupComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  private readonly buttonGroupService = inject(ButtonGroupService);

  @Input({ required: true }) public correctButtonValue?: string;
  @Input() public showCorrectButton = false;

  public isDisabled = false;

  private onChange?: (value?: string) => void;
  private onTouched?: () => void;

  constructor() {
    this.buttonGroupService.selectedValue$
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.onChange?.(value);
        this.onTouched?.();
      });
  }

  public ngOnInit(): void {
    this.buttonGroupService.setCorrectValue(this.correctButtonValue);
    this.buttonGroupService.showCorrectButtons(this.showCorrectButton);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['correctButtonValue']) {
      this.buttonGroupService.setCorrectValue(
        changes['correctButtonValue'].currentValue
      );
    }
    if (changes['showCorrectButton']) {
      this.buttonGroupService.showCorrectButtons(
        changes['showCorrectButton'].currentValue
      );
    }
  }

  public writeValue(value: string): void {
    this.buttonGroupService.setSelectedValue(value);
  }

  public registerOnChange(fn: (value?: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.buttonGroupService.setIsDisabled(this.isDisabled);
  }
}
