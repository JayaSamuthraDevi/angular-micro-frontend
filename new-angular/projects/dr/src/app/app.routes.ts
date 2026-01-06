import { Routes } from '@angular/router';

import { DRDashboardComponent } from './pages/dr-dashboard.component';
import { FailoverHistoryComponent } from './pages/failover-history.component';

export const routes: Routes = [
  { path: '', component: DRDashboardComponent },
  { path: 'failover', component: FailoverHistoryComponent }
];
