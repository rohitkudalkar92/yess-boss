import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppButton } from '../button/button';
import { Order } from '../../services/order.service';
import { GARMENT_FIELDS, Garment } from '../../enums/garment.enum';
import { ButtonVariant, ButtonWidth } from '../../enums/button.enum';

@Component({
  selector: 'app-order-detail-modal',
  imports: [AppButton, DatePipe],
  templateUrl: './order-detail-modal.html',
})
export class OrderDetailModal {
  @Input() order!: Order;
  @Input() clientName = '';
  get details() { return this.order?.measurements ?? {}; }
  @Output() closed = new EventEmitter<void>();

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;

  get fields() {
    return this.order?.garment ? GARMENT_FIELDS[this.order.garment as Garment] ?? [] : [];
  }
}
