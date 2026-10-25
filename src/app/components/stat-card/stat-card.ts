import { Component, input, output, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
})
export class StatCard {
  label = input.required<string>();
  value = input.required<string | number>();
  badge = input<string>('');
  badgeClass = input<string>('text-emerald-600');
  color = input<'emerald' | 'amber' | 'blue' | 'red'>('emerald');
  active = input(false, { transform: booleanAttribute });
  clicked = output<void>();
}
