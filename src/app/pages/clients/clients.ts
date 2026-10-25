import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientService, Client } from '../../services/client.service';
import { ClientModal } from '../../components/client-modal/client-modal';
import { AppButton } from '../../components/button/button';
import { DataTable, TableColumn, ColumnType } from '../../components/data-table/data-table';
import { InputType } from '../../enums/input-type.enum';
import { ButtonVariant, ButtonSize, ButtonWidth } from '../../enums/button.enum';
import { IconName } from '../../enums/icon-name.enum';
import { APP_ROUTES } from '../../constants/app-routes';

@Component({
  selector: 'app-clients',
  imports: [ClientModal, DataTable, AppButton, DatePipe],
  templateUrl: './clients.html',
})
export class Clients {
  private clientService = inject(ClientService);
  private router = inject(Router);

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;
  readonly ButtonWidth = ButtonWidth;
  readonly IconName = IconName;

  readonly InputType = InputType;

  showModal = signal(false);
  editTarget = signal<Client | null>(null);

  readonly columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'shopId', label: 'Shop', type: ColumnType.Hidden },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'Date of Birth', type: ColumnType.Date},
    { key: 'orderCount', label: 'Orders', type: ColumnType.Number },
    { key: 'createdAt', label: 'Created At', type: ColumnType.Date },
    { key: 'modifiedAt', label: 'Modified At', type: ColumnType.Date },
    { key: 'actions', label: 'Actions', type: ColumnType.EditOnly },
  ];

  get clients(): Client[] { return this.clientService.clients(); }

  onCellClick({ row, col }: { row: Record<string, any>; col: string }) {
    if (col === 'orderCount') {
      this.router.navigate([APP_ROUTES.ORDERS], { queryParams: { clientId: row['id'] } });
    }
  }
}
