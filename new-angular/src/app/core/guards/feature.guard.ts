import { inject } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';

export const featureGuard = (serviceName: string): CanMatchFn => {
  return async () => {
    const authService = inject(AuthService);
    const configService = inject(ConfigurationService);
    const router = inject(Router);

    // Modern functional guard using inject()
    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    // Proactively load module features if the serviceName is prefixed (e.g., 's3:buckets')
    if (serviceName.includes(':')) {
      const moduleName = serviceName.split(':')[0];
      await configService.loadModuleFeatures(moduleName);
    }

    // Check if the service is enabled in both global config and for the specific user
    const isEnabled = configService.isServiceEnabled(serviceName) &&
      authService.isServiceEnabled(serviceName);

    if (isEnabled) {
      return true;
    }

    console.warn(`🛑 Access Denied: Service '${serviceName}' is not enabled.`);
    return router.createUrlTree(['/']);
  };
};
