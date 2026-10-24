import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClientService, Client } from '../../services/client.service';
import { ClientModal } from '../../components/client-modal/client-modal';
import { ConfirmModal } from '../../components/confirm-modal/confirm-modal';
import { AppButton } from '../../components/button/button';
import { DataTable, TableColumn } from '../../components/data-table/data-table';
import { ButtonVariant, ButtonSize } from '../../enums/button.enum';

@Component({
  selector: 'app-clients',
  imports: [ClientModal, AppButton, DataTable, DatePipe, ConfirmModal],
  templateUrl: './clients.html',
})
export class Clients {
  private clientService = inject(ClientService);

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;

  showModal = signal(false);
  editTarget = signal<Client | null>(null);
  deleteTarget = signal<Client | null>(null);

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth' },
    { key: 'orderCount', label: 'Orders' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'modifiedAt', label: 'Modified At' },
    { key: 'actions', label: 'Actions' },
  ];

  get clients(): Client[] { return this.clientService.clients(); }

  async confirmDelete() {
    const client = this.deleteTarget();
    if (client) await this.clientService.delete(client.id);
    this.deleteTarget.set(null);
  }
}
