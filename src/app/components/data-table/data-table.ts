import { Component, input, computed, signal, ContentChild, TemplateRef, booleanAttribute, output } from '@angular/core';
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
  searchable = input(false, { transform: booleanAttribute });
  searchPlaceholder = input('Search...');
  pageSize = input(10);

  @ContentChild('actions') actionsRef?: TemplateRef<any>;
  @ContentChild('cell') cellRef?: TemplateRef<any>;
  @ContentChild('mobileRow') mobileRowRef?: TemplateRef<any>;

  searchChange = output<string>();

  search = signal('');
  page = signal(1);

  onSearch(val: string) {
    this.search.set(val);
    this.page.set(1);
    this.searchChange.emit(val);
  }

  filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    if (!q) return this.rows();
    return this.rows().filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q)),
    );
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));

  paginated = computed(() => {
    const p = this.page();
    const size = this.pageSize();
    return this.filtered().slice((p - 1) * size, p * size);
  });

  setPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
  }
}
