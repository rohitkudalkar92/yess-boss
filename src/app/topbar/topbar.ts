import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NewOrderModal } from '../components/new-order-modal/new-order-modal';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../constants/app-routes';
import { AppIcon } from '../components/icon/icon';
import { IconName } from '../enums/icon-name.enum';

@Component({
  selector: 'app-topbar',
  imports: [NewOrderModal, RouterLink, RouterLinkActive, AppIcon],
  templateUrl: './topbar.html',
})
export class Topbar {
  showModal = false;
  showSidebar = false;
  showUserMenu = false;
  readonly IconName = IconName;
  readonly routes = APP_ROUTES;

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate([APP_ROUTES.LANDING]);
  }
}
