import { Injectable, signal, inject } from '@angular/core';
import { UserService, User } from './user.service';

const SESSION_KEY = 'yb_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userService = inject(UserService);

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
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    this.currentUser.set(user);
    return true;
  }

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    this.currentUser.set(null);
  }
}
