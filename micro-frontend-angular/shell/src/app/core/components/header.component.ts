import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="logo">
        <span class="logo-icon">💠</span>
        <span class="logo-text">Enterprise<span class="highlight">Platform</span></span>
      </div>
      <nav class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a>
        <a routerLink="/users" routerLinkActive="active">Users</a>
        <a routerLink="/instances" routerLinkActive="active">Instances</a>
        <a routerLink="/volumes" routerLinkActive="active">Volumes</a>
        <a routerLink="/storage" routerLinkActive="active">Storage</a>
      </nav>
      <div class="user-profile">
        <span class="avatar">AD</span>
        <span class="username">Admin</span>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 1.25rem;
      color: #111827;
    }
    .highlight { color: #2563eb; }
    .nav-links {
      display: flex;
      gap: 8px;
    }
    .nav-links a {
      text-decoration: none;
      color: #6b7280;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s;
    }
    .nav-links a:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
    .nav-links a.active {
      background: #eff6ff;
      color: #2563eb;
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      background: #2563eb;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class HeaderComponent { }
