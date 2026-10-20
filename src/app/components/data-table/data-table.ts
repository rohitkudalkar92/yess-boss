import { Component, input, computed, signal, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet, FormsModule],
  templateUrl: './data-table.html',
})
export class DataTable {
  title = input<string>('');
  columns = input.required<TableColumn[]>();
  rows = input.required<Record<string, any>[]>();
  searchable = input(false);

  @ContentChild('actions') actionsRef?: TemplateRef<any>;
  @ContentChild('cell') cellRef?: TemplateRef<any>;
  @ContentChild('mobileRow') mobileRowRef?: TemplateRef<any>;

  search = signal('');

  filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.rows();
    return this.rows().filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q)),
    );
  });
}
