import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StatCard } from '../../components/stat-card/stat-card';
import { DataTable, TableColumn, ColumnType, TableFilter } from '../../components/data-table/data-table';
import { AppButton } from '../../components/button/button';
import { NewOrderModal } from '../../components/new-order-modal/new-order-modal';
import { OrderDetailModal } from '../../components/order-detail-modal/order-detail-modal';
import { IconName } from '../../enums/icon-name.enum';
import { ButtonVariant, ButtonSize, ButtonWidth } from '../../enums/button.enum';
import { InputType } from '../../enums/input-type.enum';
import { OrderService, Order } from '../../services/order.service';
import { OrderStatus } from '../../enums/order-status.enum';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-orders',
  imports: [StatCard, DataTable, AppButton, NewOrderModal, OrderDetailModal, DatePipe],
  templateUrl: './orders.html',
})
export class Orders {
  private orderService = inject(OrderService);
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);

  initialFilters = signal<Record<string, string>>({});
  activeStatFilter = signal<string | null>(null);

  constructor() {
    const params = this.route.snapshot.queryParamMap;
    const filters: Record<string, string> = {};
    const clientId = params.get('clientId');
    if (clientId) {
      const name = this.clientService.clients().find(c => c.id === clientId)?.name;
      if (name) filters['clientId'] = name;
    }
    const shopId = params.get('shopId');
    if (shopId) filters['shopId'] = shopId;
    if (Object.keys(filters).length) this.initialFilters.set(filters);
  }

  readonly InputType = InputType;
  readonly IconName = IconName;
  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;
  readonly ButtonWidth = ButtonWidth;

  readonly columns: TableColumn[] = [
    { key: 'orderId', label: 'Order' },
    { key: 'shopId', label: 'Shop', type: ColumnType.Hidden },
    { key: 'clientId', label: 'Client', type: ColumnType.Client },
    { key: 'garment', label: 'Garment' },
    { key: 'status', label: 'Status', type: ColumnType.Status },
    { key: 'dueDate', label: 'Due Date', type: ColumnType.Date },
    { key: 'actions', label: '' },
  ];

  get filters(): TableFilter[] {
    return [
      { key: 'status', label: 'All Statuses', options: Object.values(OrderStatus) },
      {
        key: 'clientId',
        label: 'All Clients',
        options: this.clientService.clients().map(c => c.id),
        optionLabels: this.clientService.clients().map(c => c.name),
        searchable: true,
      },
    ];
  }

  clientName(id: string) {
    return this.clientService.clients().find(c => c.id === id)?.name ?? id;
  }

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

  onStatClick(status: string | null) {
    const next = this.activeStatFilter() === status ? null : status;
    this.activeStatFilter.set(next);
    const base = this.route.snapshot.queryParamMap;
    const filters: Record<string, string> = {};
    const clientId = base.get('clientId');
    if (clientId) {
      const name = this.clientService.clients().find(c => c.id === clientId)?.name;
      if (name) filters['clientId'] = name;
    }
    if (next) filters['status'] = next;
    this.initialFilters.set({ ...filters });
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
