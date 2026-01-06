import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <!-- Sidebar for Users -->
      <div *ngIf="type === 'users'" class="sidebar-group">
        <h3 class="group-title">User Management</h3>
        <a class="nav-item" routerLink="/users" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
          👥 My Users
        </a>
        <a class="nav-item" routerLink="/users/groups">
          🛡 groups
        </a>
        <a class="nav-item" routerLink="/users/permissions">
           🔐 Permissions
        </a>
      </div>

      <!-- Sidebar for Instances & Volumes (Shared) -->
      <div *ngIf="type === 'infra'" class="sidebar-group">
        <h3 class="group-title">Infrastructure</h3>
        <a class="nav-item" routerLink="/instances" routerLinkActive="active">
          🖥 Instances
        </a>
        <a class="nav-item" routerLink="/volumes" routerLinkActive="active">
          💾 Volumes
        </a>
        <div class="divider"></div>
        <h3 class="group-title">Networking</h3>
        <a class="nav-item">🌐 VPCs</a>
        <a class="nav-item">🔒 Firewalls</a>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      height: 100%;
      background: #fdfdfd;
      border-right: 1px solid #e5e7eb;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .group-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9ca3af;
      font-weight: 600;
      margin-bottom: 8px;
      padding-left: 12px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      color: #374151;
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: all 0.15s;
    }
    .nav-item:hover {
      background: #f3f4f6;
      color: #111827;
    }
    .nav-item.active {
      background: #eff6ff;
      color: #2563eb;
      font-weight: 500;
    }
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 8px 0;
    }
  `]
})
export class SidebarComponent {
  @Input() type: 'users' | 'infra' | 'none' = 'none';
}
