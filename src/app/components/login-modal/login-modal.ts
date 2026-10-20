import { Component, EventEmitter, Output, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { APP_ROUTES } from '../../constants/app-routes';
import { AppInput } from '../input/input';
import { AppButton } from '../button/button';
import { InputType } from '../../enums/input-type.enum';
import { ButtonWidth, ButtonIconPosition } from '../../enums/button.enum';
import { IconName } from '../../enums/icon-name.enum';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule, AppInput, AppButton],
  templateUrl: './login-modal.html',
})
export class LoginModal {
  @Output() close = new EventEmitter<void>();

  readonly InputType = InputType;
  readonly ButtonWidth = ButtonWidth;
  readonly ButtonIconPosition = ButtonIconPosition;
  readonly IconName = IconName;

  username = '';
  password = '';
  loading = false;

  private router = inject(Router);
  private auth = inject(AuthService);
  private toast = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  async login() {
    this.loading = true;
    try {
      const success = await this.auth.login(this.username, this.password);
      if (!success) {
        this.toast.show('Invalid username or password.', 'error');
        return;
      }
      this.router.navigate([APP_ROUTES.DASHBOARD]);
    } catch {
      this.toast.show('Something went wrong. Please try again.', 'error');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
