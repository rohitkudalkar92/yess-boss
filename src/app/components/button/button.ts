import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import {
  ButtonVariant,
  ButtonSize,
  ButtonWidth,
  ButtonType,
  ButtonIconPosition,
  ButtonLoadingStyle,
} from '../../enums/button.enum';
import { IconName } from '../../enums/icon-name.enum';
import { AppIcon } from '../icon/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  imports: [AppIcon],
})
export class AppButton {
  @Input() label = '';
  @Input() variant: ButtonVariant = ButtonVariant.Primary;
  @Input() size: ButtonSize = ButtonSize.Md;
  @Input() width: ButtonWidth = ButtonWidth.Auto;
  @Input() type: ButtonType = ButtonType.Button;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) loading = false;
  @Input({ transform: booleanAttribute }) active = false;
  @Input() icon?: IconName;
  @Input() iconPosition: ButtonIconPosition = ButtonIconPosition.Left;
  @Input() loadingStyle: ButtonLoadingStyle = ButtonLoadingStyle.Spinner;
  @Input() loadingText = 'Loading...';

  @Output() clicked = new EventEmitter<void>();

  get isDisabled() {
    return this.disabled || this.loading;
  }
  get isSpinner() {
    return this.loading && this.loadingStyle === ButtonLoadingStyle.Spinner;
  }
  get isTextLoad() {
    return this.loading && this.loadingStyle === ButtonLoadingStyle.Text;
  }
  get isIconLoad() {
    return this.loading && this.loadingStyle === ButtonLoadingStyle.Icon;
  }

  get variantClasses(): string {
    if (this.isDisabled) return 'bg-slate-200 text-slate-400 cursor-not-allowed';
    const map: Record<ButtonVariant, string> = {
      [ButtonVariant.Primary]: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      [ButtonVariant.Secondary]: 'border border-slate-200 text-slate-600 hover:bg-slate-50',
      [ButtonVariant.Danger]: 'bg-red-500 hover:bg-red-600 text-white',
      [ButtonVariant.Ghost]: 'text-slate-500 hover:text-slate-800 hover:bg-slate-100',
    };
    const active = this.active ? 'ring-2 ring-offset-1 ring-emerald-400' : '';
    return `${map[this.variant]} ${active}`;
  }

  get sizeClasses(): string {
    const map: Record<ButtonSize, string> = {
      [ButtonSize.Sm]: 'text-xs px-3 py-1.5 rounded-lg',
      [ButtonSize.Md]: 'text-sm px-5 py-2.5 rounded-xl',
      [ButtonSize.Lg]: 'text-sm px-6 py-3 rounded-xl',
      [ButtonSize.Xl]: 'text-base px-8 py-3.5 rounded-2xl',
    };
    return map[this.size];
  }

  get widthClass(): string {
    return this.width === ButtonWidth.Full ? 'w-full' : '';
  }
}
