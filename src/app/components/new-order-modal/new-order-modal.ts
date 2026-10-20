import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Garment, GarmentField, GARMENT_FIELDS } from '../../enums/garment.enum';
import { OrderStep } from '../../enums/order-step.enum';
import { OrderMode } from '../../enums/order-mode.enum';
import { ToastService } from '../../services/toast.service';
import { ClientService } from '../../services/client.service';
import { OrderService, Order } from '../../services/order.service';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';

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

  get clients() {
    return this.clientService.clients().map(c => c.name);
  }

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly InputType = InputType;
  readonly OrderStep = OrderStep;
  readonly OrderMode = OrderMode;

  get mode(): OrderMode {
    return this.order ? OrderMode.Edit : OrderMode.Create;
  }

  step = OrderStep.Info;

  garments = Object.values(Garment);
  statuses = ['In Cutting', 'In Stitching', 'Fitting Ready', 'Delivered'];

  form = {
    client: '',
    phone: '',
    garment: '' as Garment | '',
    status: 'In Cutting',
    dueDate: '',
    isPaid: false,
  };

  garmentDetails: Record<string, string> = {};

  get fields(): GarmentField[] {
    return this.form.garment ? GARMENT_FIELDS[this.form.garment as Garment] : [];
  }

  ngOnChanges() {
    if (this.order) {
      this.form = {
        client: this.order.client,
        phone: this.order.phone,
        garment: this.order.garment as Garment,
        status: this.order.status,
        dueDate: this.order.dueDate,
        isPaid: this.order.isPaid,
      };
    }
  }

  async onCreateClient(name: string) {
    if (!name.trim()) return;
    await this.clientService.add({ name: name.trim(), phone: '', dob: '' });
    this.form.client = name.trim();
  }

  onGarmentChange() {
    this.garmentDetails = {};
  }

  nextStep() {
    if (!this.form.client || !this.form.garment || !this.form.dueDate) return;
    this.step = OrderStep.Details;
  }

  async submit() {
    if (this.mode === OrderMode.Edit && this.order) {
      await this.orderService.update(this.order.id, {
        client: this.form.client,
        phone: this.form.phone,
        garment: this.form.garment as string,
        status: this.form.status,
        dueDate: this.form.dueDate,
        isPaid: this.form.isPaid,
      });
      this.toast.show(`Order updated for ${this.form.client} — ${this.form.garment}`);
    } else {
      await this.orderService.add({
        client: this.form.client,
        phone: this.form.phone,
        garment: this.form.garment as string,
        status: this.form.status,
        dueDate: this.form.dueDate,
        isPaid: this.form.isPaid,
      });
      this.toast.show(`Order created for ${this.form.client} — ${this.form.garment}`);
    }
    this.close();
  }

  close() {
    this.step = OrderStep.Info;
    this.form = {
      client: '',
      phone: '',
      garment: '' as Garment | '',
      status: 'In Cutting',
      dueDate: '',
      isPaid: false,
    };
    this.garmentDetails = {};
    this.closed.emit();
  }
}
