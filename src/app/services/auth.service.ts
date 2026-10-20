import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from './user.service';
import { ToastService } from './toast.service';
import { APP_ROUTES } from '../constants/app-routes';

const SESSION_KEY = 'yb_user';
const TOKEN_KEY = 'yb_token';
const TOKEN_EXPIRY_DAYS = 7;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userService = inject(UserService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly currentUser = signal<User | null>(
    JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null')
  );

  username() {
    return this.currentUser()?.fullName ?? '';
  }

  get initials(): string {
    return this.username()
      .trim()
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.userService.findByCredentials(username, password);
    if (!user) return false;

    const token = crypto.randomUUID();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + TOKEN_EXPIRY_DAYS);

    await this.userService.saveToken(user.id, token, expiry.toISOString());

    const sessionUser = { ...user, token, tokenExpiry: expiry.toISOString() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    sessionStorage.setItem(TOKEN_KEY, token);
    this.currentUser.set(sessionUser);
    return true;
  }

  async validateSession(): Promise<boolean> {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    const user = await this.userService.findByToken(token);
    if (!user || !user.tokenExpiry) {
      this.forceLogout('Your session is invalid. Please log in again.');
      return false;
    }

    if (new Date() > new Date(user.tokenExpiry)) {
      this.forceLogout('Your session has expired. Please log in again.');
      return false;
    }

    this.currentUser.set(user);
    return true;
  }

  logout() {
    const user = this.currentUser();
    if (user) this.userService.clearToken(user.id);
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
  }

  private forceLogout(message: string) {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.toast.show(message, 'error');
    this.router.navigate([APP_ROUTES.LANDING]);
  }
}
