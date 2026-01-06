import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard = (requiredRole: string): CanActivateFn => {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // BYPASS AUTH FOR LOCAL DEV (Requested for UI testing)
    console.warn('⚠️ AuthGuard bypassed for local development');
    return true;

    /* 
    // Real Production Logic (Uncomment when Keycloak is ready)
    // In a real app, strict mode would ensure KeycloakService is ready.
    // For demo/dev without a real Keycloak server, we might want to bypass or mock.
    // But since the user requested "Production Ready", we implement the real logic.
    try {
      const keycloak = inject(KeycloakService);
      const router = inject(Router);

      const loggedIn = await keycloak.isLoggedIn();
      if (!loggedIn) {
        await keycloak.login({
          redirectUri: window.location.origin + state.url
        });
        return false;
      }

      const hasRole = keycloak.getUserRoles().includes(requiredRole);
      if (!hasRole) {
        console.warn(`User missing required role: ${requiredRole}`);
        // router.navigate(['/unauthorized']); 
        return false;
      }
      return true;
    } catch (e) {
      console.error('Auth Guard Error', e);
      return false;
    }
    */
  };
};
