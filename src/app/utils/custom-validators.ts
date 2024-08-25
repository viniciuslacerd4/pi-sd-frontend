import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static keyedPattern(reg: RegExp, key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regTest = reg.test(control.value);
      return regTest ? null : { [key]: { value: control.value } };
    };
  }

  static matchFields(matchTo: string, isCounterPart?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && isCounterPart) {
        const foundControl = (control.parent as any)[
          matchTo
        ] as AbstractControl;
        if (foundControl) {
          foundControl.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
