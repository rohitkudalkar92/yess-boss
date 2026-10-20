import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ClientMeasurements } from './pages/client-measurements/client-measurements';
import { Landing } from './pages/landing/landing';
import { Clients } from './pages/clients/clients';
import { APP_ROUTES } from './constants/app-routes';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: APP_ROUTES.LANDING, pathMatch: 'full' },
  { path: APP_ROUTES.LANDING, component: Landing, canActivate: [guestGuard] },
  { path: APP_ROUTES.DASHBOARD, component: Dashboard, canActivate: [authGuard] },
  { path: APP_ROUTES.MEASUREMENTS, component: ClientMeasurements, canActivate: [authGuard] },
  { path: APP_ROUTES.CLIENTS, component: Clients, canActivate: [authGuard] },
];
