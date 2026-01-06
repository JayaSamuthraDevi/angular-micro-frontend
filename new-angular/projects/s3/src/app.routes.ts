import { Routes } from '@angular/router';
import { S3DashboardComponent } from './app/pages/s3-dashboard.component';
import { LifecyclePoliciesComponent } from './app/pages/lifecycle-policies.component';
import { StorageClassesComponent } from './app/pages/storage-classes.component';
import { S3IAMComponent } from './app/pages/iam.component';
import { S3VersioningComponent } from './app/pages/versioning.component';
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
