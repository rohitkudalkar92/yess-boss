import { Component, Input, forwardRef, booleanAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputType } from '../../enums/input-type.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.html',
  imports: [FormsModule],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppInput), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AppInput), multi: true },
  ],
})
export class AppInput implements ControlValueAccessor, Validator {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = InputType.Text;
  @Input() options: string[] = [];
  readonly InputType = InputType;
  @Input({ transform: booleanAttribute }) required = false;
  @Input() minLength = 0;
  @Input() maxLength = 64;

  value = '';
  touched = false;

  private onChange = (_: string) => {};
  onTouched = () => {};

  get charCount() { return this.value?.length ?? 0; }

  get errors(): string[] {
    const errs: string[] = [];
    if (this.touched && this.required && !this.value) errs.push('This field is required.');
    if (this.type !== InputType.Date && this.type !== InputType.Select) {
        errs.push(`Minimum ${this.minLength} characters required.`);
      if (this.charCount > this.maxLength) errs.push(`Maximum ${this.maxLength} characters allowed.`);
    }
    return errs;
  }

  onInput(val: string) {
    this.value = val;
    this.onChange(val);
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  validate(_: AbstractControl): ValidationErrors | null {
    if (this.required && !this.value) return { required: true };
    if (this.type !== InputType.Date && this.type !== InputType.Select) {
      if (this.minLength > 0 && this.charCount > 0 && this.charCount < this.minLength) return { minLength: true };
      if (this.charCount > this.maxLength) return { maxLength: true };
    }
    return null;
  }
}
