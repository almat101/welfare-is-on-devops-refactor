import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/; // DD/MM/YYYY format
  const valid = datePattern.test(control.value);
  return valid ? null : { invalidDate: true };
}
