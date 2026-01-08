import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ConfigurationService } from '../../core/services/configuration.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">✨</div>
          <h2>Create Account</h2>
          <p>Provision your enterprise workspace</p>
        </div>
        
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input id="username" type="text" formControlName="username" placeholder="Choose a username">
            </div>
            @if (signupForm.get('username')?.touched && signupForm.get('username')?.invalid) {
              <span class="error-text">Username is required (min 3 chars)</span>
            }
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input id="password" type="password" formControlName="password" placeholder="Min 6 characters">
            </div>
            @if (signupForm.get('password')?.touched && signupForm.get('password')?.invalid) {
              <span class="error-text">Password is required (min 6 chars)</span>
            }
          </div>
          
          <div class="form-group">
            <label>Select Entitlements</label>
            <div class="services-dropdown">
              @for (service of filteredServices(); track service.id) {
                <div class="service-option" 
                     [class.selected]="isSelected(service.id)"
                     (click)="toggleService(service.id)">
                   <div class="service-icon-box">{{ service.icon }}</div>
                   <div class="service-info">
                     <span class="service-name">{{ service.name }}</span>
                     <span class="service-desc">{{ service.description }}</span>
                   </div>
                   <div class="checkbox-ui">
                     @if (isSelected(service.id)) {
                       <span>✓</span>
                     }
                   </div>
                </div>
              } @empty {
                <p class="no-services">No services available for this domain.</p>
              }
            </div>
            @if (signupForm.get('services')?.touched && signupForm.get('services')?.invalid) {
              <span class="error-text">Select at least one service</span>
            }
          </div>

          <!-- Advanced Settings for DR -->
          @if (isSelected('dr')) {
            <div class="advanced-settings dr-settings">
              <h5>DR Advanced Options</h5>
              <label class="toggle-container">
                <input type="checkbox" formControlName="enableMultiDomain">
                <span class="toggle-label">Enable Multi-Zone DR Access</span>
              </label>
              <p class="setting-hint">Allows creating disaster recovery jobs across zones.</p>
            </div>
          }

          <!-- Advanced Settings for S3 -->
          @if (isSelected('s3')) {
            <div class="advanced-settings s3-settings">
              <h5>S3 Storage Options</h5>
              <div class="options-grid">
                <label class="toggle-container">
                  <input type="checkbox" formControlName="enableS3StorageClasses">
                  <span class="toggle-label">Storage Classes</span>
                </label>
                <label class="toggle-container">
                  <input type="checkbox" formControlName="enableS3IAM">
                  <span class="toggle-label">Access Control (IAM)</span>
                </label>
                <label class="toggle-container">
                  <input type="checkbox" formControlName="enableS3Versioning">
                  <span class="toggle-label">Versioning</span>
                </label>
              </div>
              <p class="setting-hint">Grant management permissions for specialized S3 tools.</p>
            </div>
          }

          @if (errorMessage()) {
            <div class="error-box">
              {{ errorMessage() }}
            </div>
          }

          <button type="submit" class="btn-primary">
            Initialize Workspace
          </button>
          
          <p class="auth-footer">
            Already have an account? <a routerLink="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .advanced-settings { margin: 16px 0; padding: 16px; border-radius: 12px; animation: slideIn 0.3s ease-out; }
    .dr-settings { background: #fdf2f2; border: 1px solid #fee2e2; }
    .s3-settings { background: #eff6ff; border: 1px solid #dbeafe; }
    .dr-settings h5 { color: #991b1b; }
    .s3-settings h5 { color: #1e40af; }
    h5 { margin: 0 0 12px 0; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; }
    .options-grid { display: flex; flex-direction: column; gap: 8px; }
    .toggle-container { display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 700; }
    .dr-settings .toggle-container { color: #991b1b; }
    .s3-settings .toggle-container { color: #1e40af; }
    .toggle-label { font-size: 0.85rem; }
    .setting-hint { font-size: 0.7rem; margin-top: 8px; opacity: 0.7; }
    .error-text { color: #ef4444; font-size: 0.75rem; margin-top: 4px; display: block; }
    .error-box { background: #fef2f2; color: #b91c1c; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.85rem; border: 1px solid #fecaca; }
    .no-services { text-align: center; color: #64748b; font-size: 0.9rem; padding: 20px; }

    /* Core styles */
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 140px); padding: 20px; }
    .auth-card { background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); width: 100%; max-width: 500px; border: 1px solid #f1f5f9; }
    .auth-header { text-align: center; margin-bottom: 40px; }
    .auth-icon { font-size: 2.5rem; margin-bottom: 16px; }
    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.875rem; font-weight: 800; }
    .auth-header p { color: #64748b; margin-top: 8px; }
    .form-group { margin-bottom: 24px; }
    .form-group label { display: block; margin-bottom: 10px; font-weight: 600; color: #334155; }
    .input-wrapper { position: relative; }
    .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
    input[type="text"], input[type="password"] { width: 100%; padding: 12px 12px 12px 42px; border: 2px solid #e2e8f0; border-radius: 12px; outline: none; }
    .services-dropdown { display: flex; flex-direction: column; gap: 12px; max-height: 250px; overflow-y: auto; }
    .service-option { display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8fafc; border: 2px solid transparent; border-radius: 14px; cursor: pointer; }
    .service-option.selected { border-color: #2563eb; background: #eff6ff; }
    .service-icon-box { width: 44px; height: 44px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .btn-primary { width: 100%; background: #2563eb; color: white; padding: 14px; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
    .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
    .auth-footer { text-align: center; margin-top: 28px; }
    .auth-footer a { color: #2563eb; font-weight: 700; text-decoration: none; }
    .service-info { flex: 1; display: flex; flex-direction: column; }
    .service-name { font-weight: 700; color: #1e293b; }
    .service-desc { font-size: 0.8rem; color: #64748b; }
    .checkbox-ui { width: 24px; height: 24px; border: 2px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
  `]
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private configService = inject(ConfigurationService);

  private availableServices = [
    { id: 'cloud-services', name: 'Cloud Compute', icon: '☁️', description: 'Elastic VM and Container clusters' },
    { id: 'dr', name: 'Disaster Recovery', icon: '🛡️', description: 'Failover management and data replication' },
    { id: 's3', name: 'S3 Object Storage', icon: '🪣', description: 'Highly available distributed storage' }
  ];

  errorMessage = signal<string | null>(null);

  filteredServices = computed(() => {
    const allowed = this.configService.allowedFeatures();
    // Only show the top-level services that are allowed by the current domain configuration
    return this.availableServices.filter(s => allowed.includes(s.id));
  });

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    services: this.fb.array([], [Validators.required, (arr: any) => arr.length > 0 ? null : { required: true }]),
    enableMultiDomain: [false],
    enableS3StorageClasses: [false],
    enableS3IAM: [false],
    enableS3Versioning: [false]
  });

  isSelected(serviceId: string): boolean {
    const services = this.signupForm.get('services') as FormArray;
    return services.controls.some(ctrl => ctrl.value === serviceId);
  }

  toggleService(serviceId: string) {
    const services = this.signupForm.get('services') as FormArray;
    const index = services.controls.findIndex(ctrl => ctrl.value === serviceId);

    if (index === -1) {
      services.push(new FormControl(serviceId));
    } else {
      services.removeAt(index);
    }
    services.markAsTouched();
    services.updateValueAndValidity();
  }

  onSubmit() {
    console.log('🚀 Registration attempt initiated...');
    this.errorMessage.set(null);

    // Explicitly mark everything as touched so validation errors show up
    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {
      const data = this.signupForm.value;
      const permissions: string[] = [];

      if (data.enableMultiDomain) permissions.push('dr:multi-domain');
      if (data.enableS3StorageClasses) permissions.push('s3:storage-classes');
      if (data.enableS3IAM) permissions.push('s3:iam');
      if (data.enableS3Versioning) permissions.push('s3:versioning');

      console.log('📦 Form Data Valid:', {
        username: data.username,
        services: data.services,
        permissions: permissions
      });

      try {
        this.authService.signup({
          username: data.username!,
          password: data.password!,
          services: data.services as string[],
          permissions: permissions
        });
        console.log('✅ Signup method completed successfully');
      } catch (err: any) {
        console.error('❌ Signup failed with catch error:', err);
        this.errorMessage.set(err.message || 'An unexpected error occurred during signup.');
      }
    } else {
      console.warn('⚠️ Signup attempt blocked: Form is invalid');

      // Construct a helpful error message based on common failures
      const servicesArray = this.signupForm.get('services') as FormArray;
      if (servicesArray.length === 0) {
        this.errorMessage.set('Please select at least one entitlement to continue.');
      } else if (this.signupForm.get('username')?.invalid || this.signupForm.get('password')?.invalid) {
        this.errorMessage.set('Please check your username (min 3) and password (min 6).');
      } else {
        this.errorMessage.set('Please fill out all required fields correctly.');
      }
    }
  }
}
