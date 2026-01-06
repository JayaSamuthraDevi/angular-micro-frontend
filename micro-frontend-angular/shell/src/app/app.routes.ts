import { Routes } from '@angular/router';
import { MfeHostComponent } from './mfe-host/mfe-host.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { sidebar: 'none' }
  },
  {
    path: 'users',
    component: MfeHostComponent,
    data: { mfe: 'users', sidebar: 'users' },
    canActivate: [authGuard('USERS_VIEW')]
  },
  {
    path: 'instances',
    component: MfeHostComponent,
    data: { mfe: 'instances', sidebar: 'infra' },
    canActivate: [authGuard('INSTANCES_VIEW')]
  },
  {
    path: 'storage',
    component: MfeHostComponent,
    data: { mfe: 'storage', sidebar: 'none' }, // No Sidebar
    canActivate: [authGuard('STORAGE_VIEW')]
  },
  {
    path: 'volumes',
    component: MfeHostComponent,
    data: { mfe: 'volumes', sidebar: 'infra' },
    canActivate: [authGuard('VOLUMES_VIEW')]
  }
];
