import { Component, inject } from '@angular/core';
import { StatCard } from '../../components/stat-card/stat-card';
import { DataTable, TableColumn } from '../../components/data-table/data-table';
import { IconName } from '../../enums/icon-name.enum';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard, DataTable],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private orderService = inject(OrderService);

  readonly IconName = IconName;

  readonly columns: TableColumn[] = [
    { key: 'id', label: 'Order' },
    { key: 'client', label: 'Client' },
    { key: 'garment', label: 'Garment' },
    { key: 'status', label: 'Status' },
    { key: 'dueDate', label: 'Due Date' },
  ];

  get orders() { return this.orderService.orders(); }
  get activeCount() { return this.orderService.activeCount(); }
  get pendingFittingsCount() { return this.orderService.pendingFittingsCount(); }
  get deliveredThisMonth(): number { return this.orderService.deliveredThisMonth(); }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      'In Stitching': 'text-amber-700 bg-amber-50 border-amber-200',
      'Fitting Ready': 'text-blue-700 bg-blue-50 border-blue-200',
      Delivered: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      'In Cutting': 'text-purple-700 bg-purple-50 border-purple-200',
    };
    return map[status] ?? 'text-slate-700 bg-slate-50 border-slate-200';
  }
}
