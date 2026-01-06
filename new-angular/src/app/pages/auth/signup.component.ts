import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">✨</div>
          <h2>Create Account</h2>
          <p>Provision your enterprise workspace</p>
        </div>
        
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <!-- ... existing fields ... -->
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input id="username" type="text" formControlName="username" placeholder="Choose a username">
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input id="password" type="password" formControlName="password" placeholder="Min 6 characters">
            </div>
          </div>
          
          <div class="form-group">
            <label>Select Entitlements</label>
            <div class="services-dropdown">
              @for (service of availableServices; track service.id) {
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
              }
            </div>
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

          <button type="submit" [disabled]="signupForm.invalid" class="btn-primary">
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
    .advanced-settings {
      margin: 16px 0;
      padding: 16px;
      border-radius: 12px;
      animation: slideIn 0.3s ease-out;
    }
    .dr-settings { background: #fdf2f2; border: 1px solid #fee2e2; }
    .s3-settings { background: #eff6ff; border: 1px solid #dbeafe; }
    .dr-settings h5 { color: #991b1b; }
    .s3-settings h5 { color: #1e40af; }
    h5 { margin: 0 0 12px 0; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 800; }
    
    .options-grid { display: flex; flex-direction: column; gap: 8px; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .toggle-container {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-weight: 700;
    }
    .dr-settings .toggle-container { color: #991b1b; }
    .s3-settings .toggle-container { color: #1e40af; }
    
    .toggle-label { font-size: 0.85rem; }
    .setting-hint { font-size: 0.7rem; margin-top: 8px; opacity: 0.7; }
    .dr-settings .setting-hint { color: #b91c1c; }
    .s3-settings .setting-hint { color: #1e40af; }

    /* Core styles */
    .auth-container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 140px); padding: 20px; }
    .auth-card { background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); width: 100%; max-width: 500px; border: 1px solid #f1f5f9; }
    .auth-header { text-align: center; margin-bottom: 40px; }
    .auth-icon { font-size: 2.5rem; margin-bottom: 16px; }
    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; }
    .auth-header p { color: #64748b; margin-top: 8px; }
    .form-group { margin-bottom: 24px; }
    .form-group label { display: block; margin-bottom: 10px; font-weight: 600; color: #334155; font-size: 0.95rem; }
    .input-wrapper { position: relative; display: flex; align-items: center; }
    .input-icon { position: absolute; left: 14px; color: #94a3b8; }
    input[type="text"], input[type="password"] { width: 100%; padding: 12px 12px 12px 42px; border: 2px solid #e2e8f0; border-radius: 12px; font-size: 1rem; transition: all 0.2s; outline: none; }
    .services-dropdown { display: flex; flex-direction: column; gap: 12px; max-height: 250px; overflow-y: auto; padding: 4px; }
    .service-option { display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8fafc; border: 2px solid transparent; border-radius: 14px; cursor: pointer; transition: all 0.2s; }
    .service-option.selected { border-color: #2563eb; background: #eff6ff; }
    .service-icon-box { width: 44px; height: 44px; background: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .service-info { flex: 1; display: flex; flex-direction: column; }
    .service-name { font-weight: 700; color: #1e293b; font-size: 1rem; }
    .service-desc { font-size: 0.8rem; color: #64748b; }
    .checkbox-ui { width: 24px; height: 24px; border: 2px solid #cbd5e1; border-radius: 6px; display: flex; align-items: center; justify-content: center; background: white; color: #2563eb; }
    .service-option.selected .checkbox-ui { background: #2563eb; border-color: #2563eb; color: white; }
    .btn-primary { width: 100%; background: #2563eb; color: white; padding: 14px; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; margin-top: 10px; }
    .auth-footer { text-align: center; margin-top: 28px; font-size: 0.95rem; color: #64748b; }
    .auth-footer a { color: #2563eb; font-weight: 700; text-decoration: none; }
  `]
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  availableServices = [
    { id: 'cloud-services', name: 'Cloud Compute', icon: '☁️', description: 'Elastic VM and Container clusters' },
    { id: 'dr', name: 'Disaster Recovery', icon: '🛡️', description: 'Failover management and data replication' },
    { id: 's3', name: 'S3 Object Storage', icon: '🪣', description: 'Highly available distributed storage' }
  ];

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    services: this.fb.array([], Validators.required),
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
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const data = this.signupForm.value;
      const permissions: string[] = [];

      if (data.enableMultiDomain) {
        permissions.push('dr:multi-domain');
      }

      if (data.enableS3StorageClasses) {
        permissions.push('s3:storage-classes');
      }

      if (data.enableS3IAM) {
        permissions.push('s3:iam');
      }

      if (data.enableS3Versioning) {
        permissions.push('s3:versioning');
      }

      this.authService.signup({
        username: data.username!,
        password: data.password!,
        services: data.services as string[],
        permissions: permissions
      });
    }
  }
}
