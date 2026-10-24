import { Component } from '@angular/core';
import { LoginModal } from '../../components/login-modal/login-modal';
import { AppButton } from '../../components/button/button';
import { AppLogo } from '../../components/logo/logo';
import { ButtonSize } from '../../enums/button.enum';

@Component({
  selector: 'app-landing',
  imports: [LoginModal, AppButton, AppLogo],
  templateUrl: './landing.html',
})
export class Landing {
  showLogin = false;
  readonly ButtonSize = ButtonSize;
}
