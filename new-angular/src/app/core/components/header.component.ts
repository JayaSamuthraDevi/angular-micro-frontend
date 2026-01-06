import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, UpperCasePipe],
  template: `
    <header class="header">
      <div class="logo">
        <span class="logo-icon">💠</span>
        <span class="logo-text">Enterprise<span class="highlight">Platform</span></span>
      </div>
      
      @if (auth.isAuthenticated()) {
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
          
          @if (config.isServiceEnabled('cloud-services') && auth.isServiceEnabled('cloud-services')) {
            <a routerLink="/cloud-services" routerLinkActive="active">Cloud Services</a>
          }
          
          @if (config.isServiceEnabled('dr') && auth.isServiceEnabled('dr')) {
            <a routerLink="/dr" routerLinkActive="active">DR</a>
          }
          
          @if (config.isServiceEnabled('s3') && auth.isServiceEnabled('s3')) {
            <a routerLink="/s3" routerLinkActive="active">S3</a>
          }
        </nav>
      }

      @if (!auth.isAuthenticated()) {
        <div class="auth-actions">
          <a routerLink="/login" class="btn-text">Login</a>
          <a routerLink="/signup" class="btn-primary">Sign Up</a>
        </div>
      } @else {
        <div class="user-profile">
          <div class="user-info">
            <span class="username">{{ auth.currentUser()?.username }}</span>
            <span class="user-role">Premium Member</span>
          </div>
          <div class="avatar">
            {{ (auth.currentUser()?.username?.[0] || 'U') | uppercase }}
          </div>
          <button (click)="auth.logout()" class="logout-btn" title="Logout">
            <span class="icon">Logout</span>
          </button>
        </div>
      }
    </header>
  `,
  styles: [`
    .header {
      height: 72px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 1.4rem;
      letter-spacing: -0.025em;
      color: #0f172a;
    }
    .highlight { color: #2563eb; }
    .nav-links {
      display: flex;
      gap: 4px;
    }
    .nav-links a {
      text-decoration: none;
      color: #64748b;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .nav-links a:hover {
      background: #f1f5f9;
      color: #0f172a;
    }
    .nav-links a.active {
      background: #eff6ff;
      color: #2563eb;
    }
    .auth-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-left: 20px;
      border-left: 1px solid #e2e8f0;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .username {
      font-weight: 700;
      color: #1e293b;
      font-size: 0.95rem;
    }
    .user-role {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
    }
    .avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    }
    .logout-btn {
      background: #f1f5f9;
      border: none;
      color: #64748b;
      padding: 8px 12px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: #fee2e2;
      color: #ef4444;
    }
    .btn-primary {
      background: #2563eb;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #1d4ed8;
    }
    .btn-text {
      color: #64748b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .btn-text:hover {
      color: #0f172a;
    }
  `]
})
export class HeaderComponent {
  protected auth = inject(AuthService);
  protected config = inject(ConfigurationService);
}
