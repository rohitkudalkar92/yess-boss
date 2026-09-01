import { Component, input, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
}

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet],
  templateUrl: './data-table.html',
})
export class DataTable {
  title   = input<string>('');
  columns = input.required<TableColumn[]>();
  rows    = input.required<Record<string, any>[]>();

  @ContentChild('actions') actionsRef?: TemplateRef<any>;
  @ContentChild('cell')    cellRef?: TemplateRef<any>;
  @ContentChild('mobileRow') mobileRowRef?: TemplateRef<any>;
}
