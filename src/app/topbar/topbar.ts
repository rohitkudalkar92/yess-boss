import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APP_ROUTES } from '../constants/app-routes';
import { AppButton } from '../components/button/button';
import { AppLogo } from '../components/logo/logo';
import { IconName } from '../enums/icon-name.enum';
import { ButtonVariant, ButtonSize, ButtonWidth } from '../enums/button.enum';
import { UserRoleLabel } from '../enums/user-role.enum';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive, AppButton, AppLogo],
  templateUrl: './topbar.html',
})
export class Topbar {
  showUserMenu = false;
  readonly IconName = IconName;
  readonly routes = APP_ROUTES;
  readonly ButtonSize = ButtonSize;
  readonly ButtonVariant = ButtonVariant;
  readonly ButtonWidth = ButtonWidth;
  readonly UserRoleLabel = UserRoleLabel;

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.relative')) {
      this.showUserMenu = false;
    }
  }

  logout() {
    this.auth.logout();
    this.showUserMenu = false;
    this.router.navigate([APP_ROUTES.LANDING]);
  }
}
