import { Routes } from '@angular/router';
import { S3DashboardComponent } from './pages/s3-dashboard.component';
import { LifecyclePoliciesComponent } from './pages/lifecycle-policies.component';
import { StorageClassesComponent } from './pages/storage-classes.component';
import { S3IAMComponent } from './pages/iam.component';
import { S3VersioningComponent } from './pages/versioning.component';
import { featureGuard } from '@core/guards/feature.guard';

export const routes: Routes = [
  {
    path: '',
    component: S3DashboardComponent,
    canMatch: [featureGuard('s3')]
  },
  {
    path: 'policies',
    component: LifecyclePoliciesComponent,
    canMatch: [featureGuard('s3')]
  },
  {
    path: 'storage-classes',
    component: StorageClassesComponent,
    canMatch: [featureGuard('s3:storage-classes')],
  },
  {
    path: 'iam',
    component: S3IAMComponent,
    canMatch: [featureGuard('s3:iam')]
  },
  {
    path: 'versioning',
    component: S3VersioningComponent,
    canMatch: [featureGuard('s3:versioning')]
  }
];
