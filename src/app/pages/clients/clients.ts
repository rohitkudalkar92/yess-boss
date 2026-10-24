import { Component, inject, signal } from '@angular/core';
import { ClientService, Client } from '../../services/client.service';
import { ClientModal } from '../../components/client-modal/client-modal';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';
import { DataTable, TableColumn, ColumnType } from '../../components/data-table/data-table';

@Component({
  selector: 'app-clients',
  imports: [ClientModal, DataTable, ConfirmModal],
  templateUrl: './clients.html',
})
export class Clients {
  private clientService = inject(ClientService);

  showModal = signal(false);
  editTarget = signal<Client | null>(null);
  deleteTarget = signal<Client | null>(null);

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth', type: ColumnType.Date},
    { key: 'orderCount', label: 'Orders', type: ColumnType.Number },
    { key: 'createdAt', label: 'Created At', type: ColumnType.Date },
    { key: 'modifiedAt', label: 'Modified At', type: ColumnType.Date },
    { key: 'actions', label: 'Actions', type: ColumnType.Actions },
  ];

  readonly mobileFields: { key: string; label?: string; type?: ColumnType }[] = [
    { key: 'phone' },
    { key: 'dob', label: 'DOB' },
    { key: 'createdAt', label: 'Created', type: ColumnType.Date },
  ];

  get clients(): Client[] { return this.clientService.clients(); }

  async confirmDelete() {
    const client = this.deleteTarget();
    if (client) await this.clientService.delete(client.id);
    this.deleteTarget.set(null);
  }
}
