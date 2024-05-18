import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (
      value === undefined ||
      value === null ||
      (typeof value === 'number' && isNaN(value)) ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      return { required: true };
    }

    return null;
  };
}
