import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';
import { ClientService, Client } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-new-user-modal',
  imports: [FormsModule, AppButton, AppInput],
  templateUrl: './new-user-modal.html',
})
export class NewUserModal implements OnChanges {
  @Input() client: Client | null = null;
  @Output() closed = new EventEmitter<void>();

  private clientService = inject(ClientService);
  private toast = inject(ToastService);

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;

  form = { name: '', phone: '', dob: '' };

  get isEdit() { return !!this.client; }

  ngOnChanges() {
    if (this.client) {
      this.form = { name: this.client.name, phone: this.client.phone, dob: this.client.dob };
    }
  }

  async submit() {
    const trimmed = this.form.name.trim();
    const duplicate = this.clientService.clients().some(
      c => c.name.toLowerCase() === trimmed.toLowerCase() && c.id !== this.client?.id
    );
    if (duplicate) {
      this.toast.show(`Client "${trimmed}" already exists`, 'error');
      return;
    }
    if (this.isEdit) {
      await this.clientService.update(this.client!.id, this.form);
      this.toast.show(`Client "${trimmed}" updated`);
    } else {
      await this.clientService.add(this.form);
      this.toast.show(`Client "${trimmed}" added`);
    }
    this.close();
  }

  close() {
    this.form = { name: '', phone: '', dob: '' };
    this.closed.emit();
  }
}
