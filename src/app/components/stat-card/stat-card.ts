import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.html',
})
export class StatCard {
  label  = input.required<string>();
  value  = input.required<string | number>();
  badge  = input<string>('');
  badgeClass = input<string>('text-emerald-600');
}
