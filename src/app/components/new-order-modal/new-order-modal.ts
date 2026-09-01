import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Garment, GarmentField, GARMENT_FIELDS } from '../../enums/garment.enum';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-new-order-modal',
  imports: [FormsModule],
  templateUrl: './new-order-modal.html',
})
export class NewOrderModal {
  @Output() closed = new EventEmitter<void>();

  private toast = inject(ToastService);

  step = 1;

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

  onGarmentChange() {
    this.garmentDetails = {};
  }

  nextStep() {
    if (!this.form.client || !this.form.garment || !this.form.dueDate) return;
    this.step = 2;
  }

  submit() {
    this.toast.show(`Order created for ${this.form.client} — ${this.form.garment}`);
    this.closed.emit();
  }

  close() {
    this.closed.emit();
  }
}
