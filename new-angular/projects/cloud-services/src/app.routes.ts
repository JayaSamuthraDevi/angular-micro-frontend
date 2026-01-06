import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CloudListComponent } from './pages/cloud-list.component';
import { KubernetesListComponent } from './pages/kubernetes-list.component';
import { FunctionsListComponent } from './pages/functions-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: CloudListComponent
      },
      {
        path: 'kubernetes',
        component: KubernetesListComponent
      },
      {
        path: 'functions',
        component: FunctionsListComponent
      },
      // {
      //   path: ':id',
      //   component: InstanceDetailsComponent
      // }
    ]
  }
];
