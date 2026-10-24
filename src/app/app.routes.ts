import { Routes } from '@angular/router';
import { Orders } from './pages/orders/orders';
import { Landing } from './pages/landing/landing';
import { Clients } from './pages/clients/clients';
import { APP_ROUTES } from './constants/app-routes';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.LANDING, pathMatch: 'full' },
  { path: APP_ROUTES.LANDING, component: Landing, canActivate: [guestGuard] },
  { path: APP_ROUTES.ORDERS, component: Orders, canActivate: [authGuard] },
  { path: APP_ROUTES.CLIENTS, component: Clients, canActivate: [authGuard] },
  { path: '**', redirectTo: APP_ROUTES.LANDING },
];
