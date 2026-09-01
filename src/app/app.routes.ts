import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ClientMeasurements } from './pages/client-measurements/client-measurements';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'measurements', component: ClientMeasurements },
];
