import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, take } from 'rxjs';

@Injectable()
export class ButtonGroupService {
  private selectedValueSubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  private correctValueSubject = new BehaviorSubject<string | undefined>(
    undefined
  );
  private showCorrectButtonSubject = new BehaviorSubject(false);
  private disabledSubject = new BehaviorSubject(false);

  public selectedValue$ = this.selectedValueSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public showCorrectButton$ = this.showCorrectButtonSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public correctValue$ = this.correctValueSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public disabled$ = this.disabledSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public setSelectedValue(value?: string) {
    this.disabled$.pipe(take(1)).subscribe((isDisabled) => {
      if (!isDisabled) {
        this.selectedValueSubject.next(value);
      }
    });
  }

  public showCorrectButtons(show: boolean) {
    this.showCorrectButtonSubject.next(show);
  }

  public setCorrectValue(value?: string) {
    this.correctValueSubject.next(value);
  }

  public setIsDisabled(isDisabled: boolean) {
    this.disabledSubject.next(isDisabled);
  }
}
