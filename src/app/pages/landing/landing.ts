import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { APP_ROUTES } from '../../constants/app-routes';

@Component({
  selector: 'app-landing',
  imports: [FormsModule],
  templateUrl: './landing.html',
})
export class Landing {
  showLogin = false;
  username = '';
  password = '';
  readonly routes = APP_ROUTES;

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    if (this.username && this.password) {
      this.auth.login(this.username);
      this.router.navigate([APP_ROUTES.DASHBOARD]);
    }
  }
}
