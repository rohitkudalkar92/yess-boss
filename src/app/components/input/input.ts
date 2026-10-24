import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  booleanAttribute,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
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
  private el = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null) {
    if (this.open && !this.el.nativeElement.contains(target)) this.closeDropdown();
  }

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: InputType = InputType.Text;
  @Input() options: string[] = [];
  @Input({ transform: booleanAttribute }) allowCreate = false;
  @Output() createNew = new EventEmitter<string>();
  readonly InputType = InputType;
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) disablePast = false;
  @Input() minLength = 0;
  @Input() maxLength = 64;
  @Input({ transform: booleanAttribute }) showCharCount = false;
  @Input({ transform: booleanAttribute }) compact = false;
  @Input({ transform: booleanAttribute }) hideLabel = false;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) showSearch = true;

  get todayStr() {
    return new Date().toISOString().split('T')[0];
  }

  value = '';
  touched = false;
  search = '';
  open = false;

  private onChange = (_: string) => {};
  onTouched = () => {};

  get charCount() {
    return this.value?.length ?? 0;
  }

  get filtered() {
    return this.options.filter(o => o.toLowerCase().includes(this.search.toLowerCase()));
  }

  get errors(): string[] {
    const errs: string[] = [];
    if (this.touched && this.required && !this.value) errs.push('This field is required.');
    if (this.type !== InputType.Date && this.type !== InputType.Select) {
      if (
        this.touched &&
        this.minLength > 0 &&
        this.charCount > 0 &&
        this.charCount < this.minLength
      )
        errs.push(`Minimum ${this.minLength} characters required.`);
    }
    return errs;
  }

  onCreate() {
    this.createNew.emit(this.search);
    this.closeDropdown();
  }

  onInput(val: string) {
    if (this.type === InputType.Number) {
      val = val.replace(/[^0-9]/g, '');
    }
    this.value = val;
    this.onChange(val);
    this.onValidatorChange();
  }

  onBlur() {
    this.touched = true;
    this.onTouched();
  }

  select(opt: string) {
    this.onInput(opt);
    this.open = false;
    this.search = '';
    this.touched = true;
    this.onTouched();
  }

  toggleOpen() {
    this.open = !this.open;
    this.search = '';
  }

  closeDropdown() {
    this.open = false;
    this.search = '';
    this.onBlur();
  }

  writeValue(val: string) {
    this.value = val ?? '';
  }
  registerOnChange(fn: (_: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  private onValidatorChange = () => {};

  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  validate(_: AbstractControl): ValidationErrors | null {
    if (this.required && !this.value) return { required: true };
    if (this.type !== InputType.Date && this.type !== InputType.Select) {
      if (this.minLength > 0 && this.charCount > 0 && this.charCount < this.minLength)
        return { minLength: true };
    }
    return null;
  }
}
