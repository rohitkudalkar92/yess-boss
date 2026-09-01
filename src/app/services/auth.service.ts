import { Injectable, signal } from '@angular/core';

const USERNAME_KEY = 'yb_username';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly username = signal<string>(sessionStorage.getItem(USERNAME_KEY) ?? '');

  login(username: string) {
    sessionStorage.setItem(USERNAME_KEY, username);
    this.username.set(username);
  }

  logout() {
    sessionStorage.removeItem(USERNAME_KEY);
    this.username.set('');
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
}
