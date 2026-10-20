import { Component, input } from '@angular/core';
import { AppIcon } from '../icon/icon';
import { IconName } from '../../enums/icon-name.enum';

@Component({
  selector: 'app-stat-card',
  imports: [AppIcon],
  templateUrl: './stat-card.html',
})
export class StatCard {
  label = input.required<string>();
  value = input.required<string | number>();
  badge = input<string>('');
  badgeClass = input<string>('text-emerald-600');
  icon = input<IconName | null>(null);
}
