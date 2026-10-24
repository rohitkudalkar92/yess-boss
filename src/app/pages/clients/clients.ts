import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService, Client } from '../../services/client.service';
import { ClientModal } from '../../components/client-modal/client-modal';
import { DataTable, TableColumn, ColumnType } from '../../components/data-table/data-table';
import { InputType } from '../../enums/input-type.enum';
import { APP_ROUTES } from '../../constants/app-routes';

@Component({
  selector: 'app-clients',
  imports: [ClientModal, DataTable],
  templateUrl: './clients.html',
})
export class Clients {
  private clientService = inject(ClientService);
  private router = inject(Router);

  readonly InputType = InputType;

  showModal = signal(false);
  editTarget = signal<Client | null>(null);

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth', type: ColumnType.Date},
    { key: 'orderCount', label: 'Orders', type: ColumnType.Number },
    { key: 'createdAt', label: 'Created At', type: ColumnType.Date },
    { key: 'modifiedAt', label: 'Modified At', type: ColumnType.Date },
    { key: 'actions', label: 'Actions', type: ColumnType.EditOnly },
  ];

  readonly mobileFields: { key: string; label?: string; type?: ColumnType }[] = [
    { key: 'phone' },
    { key: 'dob', label: 'DOB' },
    { key: 'createdAt', label: 'Created', type: ColumnType.Date },
  ];

  get clients(): Client[] { return this.clientService.clients(); }

  onCellClick({ row, col }: { row: Record<string, any>; col: string }) {
    if (col === 'orderCount') {
      this.router.navigate([APP_ROUTES.ORDERS], { queryParams: { clientId: row['id'] } });
    }
  }
}
