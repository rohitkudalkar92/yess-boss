import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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

  constructor(private router: Router, private auth: AuthService) {}

  async login() {
    this.loading = true;
    await new Promise(res => setTimeout(res, 2000));
    this.auth.login(this.username);
    this.router.navigate([APP_ROUTES.DASHBOARD]);
  }
}
