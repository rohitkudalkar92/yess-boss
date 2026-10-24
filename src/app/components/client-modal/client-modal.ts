import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';
import { ClientService, Client } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { ClientForm, defaultClientForm } from '../../constants/form-models';

@Component({
  selector: 'app-client-modal',
  imports: [FormsModule, AppButton, AppInput],
  templateUrl: './client-modal.html',
})
export class ClientModal implements OnChanges {
  @Input() client: Client | null = null;
  @Output() closed = new EventEmitter<void>();

  private clientService = inject(ClientService);
  private toast = inject(ToastService);
  private auth = inject(AuthService);

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;

  form: ClientForm = defaultClientForm();

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
      await this.clientService.update(this.client!.id, { ...this.form, shopId: this.client!.shopId });
      this.toast.show(`Client "${trimmed}" updated`);
    } else {
      await this.clientService.add({ ...this.form, shopId: this.auth.currentUser()!.shopId });
      this.toast.show(`Client "${trimmed}" added`);
    }
    this.close();
  }

  close() {
    this.form = defaultClientForm();
    this.closed.emit();
  }
}
