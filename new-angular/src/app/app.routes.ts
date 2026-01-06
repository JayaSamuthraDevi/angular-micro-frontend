import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { featureGuard } from './core/guards/feature.guard';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { sidebar: 'none' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { sidebar: 'none' }
  },
  {
    path: '',
    component: DashboardComponent,
    data: { sidebar: 'none' }
  },
  {
    path: 'cloud-services',
    loadChildren: () => import('@cloud-services/app.routes').then(m => m.routes),
    canMatch: [featureGuard('cloud-services')],
    data: { sidebar: 'cloud' }
  },
  {
    path: 'dr',
    loadChildren: () => import('@dr/app/app.routes').then(m => m.routes),
    canMatch: [featureGuard('dr')],
    data: { sidebar: 'dr' }
  },
  {
    path: 's3',
    loadChildren: () => import('@s3/app.routes').then(m => m.routes),
    canMatch: [featureGuard('s3')],
    data: { sidebar: 's3' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
