import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppButton } from '../button/button';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';

@Component({
  selector: 'app-confirm-modal',
  imports: [AppButton],
  templateUrl: './confirm-modal.html',
})
export class ConfirmModal {
  @Input() title = 'Are you sure?';
  @Input() message = '';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
}
