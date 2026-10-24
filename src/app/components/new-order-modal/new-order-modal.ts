import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Garment, GarmentField, GARMENT_FIELDS } from '../../enums/garment.enum';
import { OrderStep } from '../../enums/order-step.enum';
import { OrderStatus } from '../../enums/order-status.enum';
import { OrderMode } from '../../enums/order-mode.enum';
import { ToastService } from '../../services/toast.service';
import { ClientService } from '../../services/client.service';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';
import { OrderForm, defaultOrderForm, ClientForm } from '../../constants/form-models';

@Component({
  selector: 'app-new-order-modal',
  imports: [FormsModule, AppButton, AppInput],
  templateUrl: './new-order-modal.html',
})
export class NewOrderModal implements OnChanges {
  @Input() order: Order | null = null;
  @Output() closed = new EventEmitter<void>();

  private toast = inject(ToastService);
  private clientService = inject(ClientService);
  private orderService = inject(OrderService);
  private auth = inject(AuthService);

  @ViewChild('detailsForm') detailsForm?: NgForm;

  get clients() {
    return this.clientService.clients().map(c => c.name);
  }

  selectedClientName = '';

  onClientChange(name: string) {
    const client = this.clientService.clients().find(c => c.name === name);
    if (client) {
      this.form.clientId = client.id;
      if (client.phone) this.form.phone = client.phone;
    }
  }

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;
  readonly OrderStep = OrderStep;
  readonly OrderMode = OrderMode;
  readonly OrderStatus = OrderStatus;

  get mode(): OrderMode {
    return this.order ? OrderMode.Edit : OrderMode.Create;
  }

  step = OrderStep.Info;

  garments = Object.values(Garment);
  statuses = Object.values(OrderStatus);

  form: OrderForm = defaultOrderForm();

  garmentDetails: Record<string, string> = {};

  get fields(): GarmentField[] {
    return this.form.garment ? GARMENT_FIELDS[this.form.garment as Garment] : [];
  }

  ngOnChanges() {
    if (this.order) {
      this.selectedClientName = this.clientService.clients().find(c => c.id === this.order!.clientId)?.name ?? '';
      this.form = {
        clientId: this.order.clientId,
        phone: this.order.phone,
        garment: this.order.garment as Garment,
        status: this.order.status,
        dueDate: this.order.dueDate,
        isPaid: this.order.isPaid,
      } satisfies OrderForm;
    }
  }

  async onCreateClient(name: string) {
    if (!name.trim()) return;
    try {
      const id = await this.clientService.add({ name: name.trim(), phone: '', dob: '', shopId: this.auth.currentUser()!.shopId });
      this.form.clientId = id;
      this.selectedClientName = name.trim();
      this.toast.show(`Client "${name.trim()}" created`);
    } catch {
      this.toast.show('Failed to create client', 'error');
    }
  }

  onGarmentChange() {
    this.garmentDetails = {};
  }

  nextStep() {
    if (!this.form.clientId || !this.form.garment) return;
    this.step = OrderStep.Details;
  }

  async submit() {
    if (this.mode === OrderMode.Edit && this.order) {
      await this.orderService.update(this.order.id, {
        clientId: this.form.clientId,
        phone: this.form.phone,
        garment: this.form.garment as string,
        status: this.form.status,
        dueDate: this.form.dueDate,
        isPaid: this.form.isPaid,
      });
      this.toast.show(`Order updated — ${this.form.garment}`);
    } else {
      await this.orderService.add({
        shopId: this.auth.currentUser()!.shopId,
        clientId: this.form.clientId,
        phone: this.form.phone,
        garment: this.form.garment as string,
        status: this.form.status,
        dueDate: this.form.dueDate,
        isPaid: this.form.isPaid,
      });
      this.toast.show(`Order created — ${this.form.garment}`);
    }
    this.close();
  }

  close() {
    this.step = OrderStep.Info;
    this.form = defaultOrderForm();
    this.selectedClientName = '';
    this.garmentDetails = {};
    this.closed.emit();
  }
}
