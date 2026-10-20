import { Component, input } from '@angular/core';
import { ICONS } from '../../constants/icons';
import { IconName } from '../../enums/icon-name.enum';

@Component({
  selector: 'app-icon',
  template: `
    <svg [class]="cls()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="path()" />
    </svg>
  `,
  host: { style: 'display:contents' },
})
export class AppIcon {
  name = input.required<IconName>();
  cls = input('w-5 h-5');

  path() {
    return ICONS[this.name()];
  }
}
