import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Garment, GarmentField, GARMENT_FIELDS } from '../../enums/garment.enum';
import { OrderStep } from '../../enums/order-step.enum';
import { ToastService } from '../../services/toast.service';
import { ClientService } from '../../services/client.service';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';

@Component({
  selector: 'app-new-order-modal',
  imports: [FormsModule, AppButton, AppInput],
  templateUrl: './new-order-modal.html',
})
export class NewOrderModal {
  @Output() closed = new EventEmitter<void>();

  private toast = inject(ToastService);
  private clientService = inject(ClientService);

  get clients() { return this.clientService.clients(); }

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;
  readonly OrderStep = OrderStep;

  step = OrderStep.Info;

  garments = Object.values(Garment);
  statuses = ['In Cutting', 'In Stitching', 'Fitting Ready', 'Delivered'];

  form = {
    client: '',
    phone: '',
    garment: '' as Garment | '',
    status: 'In Cutting',
    dueDate: '',
  };

  garmentDetails: Record<string, string> = {};

  get fields(): GarmentField[] {
    return this.form.garment ? GARMENT_FIELDS[this.form.garment as Garment] : [];
  }

  onCreateClient(name: string) {
    if (!name.trim()) return;
    this.clientService.add(name.trim());
    this.form.client = name.trim();
  }

  onGarmentChange() {
    this.garmentDetails = {};
  }

  nextStep() {
    if (!this.form.client || !this.form.garment || !this.form.dueDate) return;
    this.step = OrderStep.Details;
  }

  submit() {
    this.toast.show(`Order created for ${this.form.client} — ${this.form.garment}`);
    this.closed.emit();
  }

  close() {
    this.step = OrderStep.Info;
    this.form = { client: '', phone: '', garment: '' as Garment | '', status: 'In Cutting', dueDate: '' };
    this.garmentDetails = {};
    this.closed.emit();
  }
}
