import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-new-user-modal',
  imports: [FormsModule, AppButton, AppInput],
  templateUrl: './new-user-modal.html',
})
export class NewUserModal {
  @Output() closed = new EventEmitter<void>();

  private clientService = inject(ClientService);
  private toast = inject(ToastService);

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;

  form = { name: '', phone: '', email: '', age: '' };

  submit() {
    this.clientService.add(this.form.name.trim());
    this.toast.show(`Client "${this.form.name.trim()}" added`);
    this.close();
  }

  close() {
    this.form = { name: '', phone: '', email: '', age: '' };
    this.closed.emit();
  }
}
