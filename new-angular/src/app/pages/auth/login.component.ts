import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" formControlName="username" placeholder="Enter username">
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" formControlName="password" placeholder="Enter password">
          </div>

          @if (errorMessage()) {
            <div class="error-box">
              {{ errorMessage() }}
            </div>
          }
          
          <button type="submit" [disabled]="loginForm.invalid" class="btn-primary">
            Login
          </button>
          
          <p class="auth-footer">
            Don't have an account? <a routerLink="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
    }
    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 400px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
    }
    .auth-header h2 {
      margin: 0;
      color: #111827;
      font-size: 1.5rem;
    }
    .auth-header p {
      color: #6b7280;
      margin-top: 8px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }
    input[type="text"], input[type="password"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 1rem;
    }
    .btn-primary {
      width: 100%;
      background: #2563eb;
      color: white;
      padding: 12px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
    .auth-footer {
      text-align: center;
      margin-top: 24px;
      font-size: 0.9rem;
      color: #6b7280;
    }
    .auth-footer a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
    }
    .error-box {
      background: #fef2f2;
      color: #b91c1c;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 0.875rem;
      border: 1px solid #fecaca;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username!, password!);
      if (!success) {
        this.errorMessage.set('Invalid username or password');
      }
    }
  }
}
