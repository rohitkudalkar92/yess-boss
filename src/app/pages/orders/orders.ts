import { Component, inject, computed } from '@angular/core';
import { StatCard } from '../../components/stat-card/stat-card';
import { DataTable, TableColumn, ColumnType, TableFilter } from '../../components/data-table/data-table';
import { AppButton } from '../../components/button/button';
import { NewOrderModal } from '../../components/new-order-modal/new-order-modal';
import { OrderDetailModal } from '../../components/order-detail-modal/order-detail-modal';
import { IconName } from '../../enums/icon-name.enum';
import { ButtonVariant, ButtonSize } from '../../enums/button.enum';
import { OrderService, Order } from '../../services/order.service';
import { OrderStatus } from '../../enums/order-status.enum';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-orders',
  imports: [StatCard, DataTable, AppButton, NewOrderModal, OrderDetailModal],
  templateUrl: './orders.html',
})
export class Orders {
  private orderService = inject(OrderService);
  private clientService = inject(ClientService);

  readonly IconName = IconName;
  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;

  readonly columns: TableColumn[] = [
    { key: 'orderId', label: 'Order' },
    { key: 'client', label: 'Client' },
    { key: 'garment', label: 'Garment' },
    { key: 'status', label: 'Status', type: ColumnType.Status },
    { key: 'dueDate', label: 'Due Date', type: ColumnType.Date },
    { key: 'actions', label: '' },
  ];

  filters = computed<TableFilter[]>(() => [
    { key: 'status', label: 'All Statuses', options: Object.values(OrderStatus) },
    { key: 'client', label: 'All Clients', options: this.clientService.clients().map(c => c.name) },
  ]);

  showModal = false;
  editingOrder: Order | null = null;
  viewingOrder: Order | null = null;

  onAdd() {
    this.showModal = true;
  }

  onEdit(order: Order) {
    this.editingOrder = order;
  }

  onDetails(order: Order) {
    this.viewingOrder = order;
  }

  onModalClosed() {
    this.showModal = false;
    this.editingOrder = null;
    this.viewingOrder = null;
  }

  get orders() { return this.orderService.orders(); }
  get activeCount() { return this.orderService.activeCount(); }
  get pendingFittingsCount() { return this.orderService.pendingFittingsCount(); }
  get deliveredThisMonth(): number { return this.orderService.deliveredThisMonth(); }
  get missedDueDate(): number { return this.orderService.missedDueDate(); }

  statusClass(status: string): string {
    const map: Partial<Record<OrderStatus, string>> = {
      [OrderStatus.InStitching]: 'text-amber-700 bg-amber-50 border-amber-200',
      [OrderStatus.FittingReady]: 'text-blue-700 bg-blue-50 border-blue-200',
      [OrderStatus.Delivered]: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      [OrderStatus.InCutting]: 'text-purple-700 bg-purple-50 border-purple-200',
    };
    return map[status as OrderStatus] ?? 'text-slate-700 bg-slate-50 border-slate-200';
  }
}
