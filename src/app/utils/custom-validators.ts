import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

export class CustomValidators {
  static keyedPattern(reg: RegExp, key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regTest = reg.test(control.value);
      return regTest ? null : { [key]: { value: control.value } };
    };
  }

  static matchFields(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === (control.parent?.controls as any)[matchTo].value
        ? of(null)
        : of({ matching: true });
    };
  }
}
