import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class DurationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formDirective: FormGroupDirective | NgForm | null): boolean {
    return (control.touched && (formDirective.form.controls.duration.hasError('durationInvalid') || control.invalid)
    || (formDirective.submitted && formDirective.invalid));
  }
}
