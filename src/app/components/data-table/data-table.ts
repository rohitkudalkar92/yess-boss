import { Component, input, computed, signal, ContentChild, TemplateRef, booleanAttribute, output, effect } from '@angular/core';
import { NgTemplateOutlet, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppButton } from '../button/button';
import { AppInput } from '../input/input';
import { ButtonVariant, ButtonSize } from '../../enums/button.enum';
import { ColumnType } from '../../enums/column-type.enum';
import { InputType } from '../../enums/input-type.enum';
import { IconName } from '../../enums/icon-name.enum';
import { OrderStatus } from '../../enums/order-status.enum';

export interface TableFilter {
  key: string;
  label: string;
  options: string[];
  searchable?: boolean;
}

export interface TableColumn {
  key: string;
  label: string;
  type?: ColumnType;
}

export { ColumnType };

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet, FormsModule, DatePipe, AppButton, AppInput],
  templateUrl: './data-table.html',
})
export class DataTable {
  title = input<string>('');
  subtitle = input<string>();
  columns = input.required<TableColumn[]>();
  rows = input.required<Record<string, any>[]>();
  searchable = input(false, { transform: booleanAttribute });
  searchPlaceholder = input('Search...');
  searchType = input<InputType>(InputType.Text);
  pageSize = input(10);
  mobileTitle = input<string>('name');
  mobileFields = input<{ key: string; label?: string; type?: ColumnType }[]>([]);
  addLabel = input<string>();
  exportLabel = input<string>();
  filters = input<TableFilter[]>([]);
  initialFilters = input<Record<string, string>>({});

  @ContentChild('actions') actionsRef?: TemplateRef<any>;
  @ContentChild('cell') cellRef?: TemplateRef<any>;
  @ContentChild('mobileRow') mobileRowRef?: TemplateRef<any>;

  searchChange = output<string>();
  add = output<void>();
  export = output<void>();
  edit = output<Record<string, any>>();
  delete = output<Record<string, any>>();
  cellClick = output<{ row: Record<string, any>; col: string }>();

  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;
  readonly InputType = InputType;
  readonly IconName = IconName;

  search = signal('');
  page = signal(1);
  activeFilters = signal<Record<string, string>>({});
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const init = this.initialFilters();
      if (Object.keys(init).length) this.activeFilters.set(init);
    });
  }

  onSearch(val: string) {
    this.search.set(val);
    this.page.set(1);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.searchChange.emit(val), 400);
  }

  setFilter(key: string, value: string) {
    this.activeFilters.update(f => ({ ...f, [key]: value }));
    this.page.set(1);
  }

  clearFilters() {
    this.activeFilters.set({});
    this.page.set(1);
  }

  hasActiveFilters = computed(() => Object.values(this.activeFilters()).some(v => v));

  filtered = computed(() => {
    const q = this.search().toLowerCase().trim();
    const af = this.activeFilters();
    return this.rows().filter(row => {
      if (q && !Object.values(row).some(v => String(v).toLowerCase().includes(q))) return false;
      return Object.entries(af).every(([k, v]) => !v || row[k] === v);
    });
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize())));

  paginated = computed(() => {
    const p = this.page();
    const size = this.pageSize();
    return this.filtered().slice((p - 1) * size, p * size);
  });

  exportRows() {
    const cols = this.columns().filter(c => c.type !== ColumnType.Actions && c.type !== ColumnType.EditOnly);
    const header = cols.map(c => c.label).join(',');
    const rows = this.filtered().map(row =>
      cols.map(c => {
        let v = row[c.key] ?? '';
        if (c.type === ColumnType.Date) {
          const d = v?.toDate ? v.toDate() : new Date(v);
          v = isNaN(d.getTime()) ? '' : `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
        }
        return `"${String(v).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const now = new Date();
    const stamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}-${String(now.getMinutes()).padStart(2,'0')}`;
    a.download = `${this.title() || 'export'}_${stamp}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
  }

  private readonly statusMap: Partial<Record<OrderStatus, string>> = {
    [OrderStatus.InStitching]: 'text-amber-700 bg-amber-50 border-amber-200',
    [OrderStatus.FittingReady]: 'text-blue-700 bg-blue-50 border-blue-200',
    [OrderStatus.Delivered]: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    [OrderStatus.InCutting]: 'text-purple-700 bg-purple-50 border-purple-200',
  };

  statusClass(status: string): string {
    return this.statusMap[status as OrderStatus] ?? 'text-slate-700 bg-slate-50 border-slate-200';
  }
}
