import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NewOrderModal } from '../components/new-order-modal/new-order-modal';
import { NewUserModal } from '../components/new-user-modal/new-user-modal';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../constants/app-routes';
import { AppIcon } from '../components/icon/icon';
import { AppButton } from '../components/button/button';
import { IconName } from '../enums/icon-name.enum';
import { ButtonVariant, ButtonSize, ButtonWidth } from '../enums/button.enum';
import { UserRoleLabel } from '../enums/user-role.enum';

@Component({
  selector: 'app-topbar',
  imports: [NewOrderModal, NewUserModal, RouterLink, RouterLinkActive, AppIcon, AppButton],
  templateUrl: './topbar.html',
})
export class Topbar {
  showModal = false;
  showUserModal = false;
  showSidebar = false;
  showUserMenu = false;
  showMobileMenu = false;
  readonly IconName = IconName;
  readonly routes = APP_ROUTES;
  readonly ButtonVariant = ButtonVariant;
  readonly ButtonSize = ButtonSize;
  readonly ButtonWidth = ButtonWidth;
  readonly UserRoleLabel = UserRoleLabel;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate([APP_ROUTES.LANDING]);
  }
}
