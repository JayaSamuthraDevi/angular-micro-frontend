import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../services/configuration.service';
import { NavGroup } from '../models/navigation.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      @for (group of groups; track group.title) {
        <div class="sidebar-group">
          <h3 class="group-title">{{ group.title }}</h3>
          
          @for (item of group.items; track item.link) {
            @if ((!item.permission || auth.hasPermission(item.permission)) && 
                 (!item.feature || config.isServiceEnabled(item.feature))) {
              <a class="nav-item" 
                 [routerLink]="item.link" 
                 routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: !!item.exact}">
                @if (item.icon) {
                  <span class="nav-icon">{{ item.icon }}</span>
                }
                {{ item.label }}
              </a>
            }
          }
        </div>
      }
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
    .nav-icon { font-size: 1.1rem; }
  `]
})
export class SidebarComponent {
  @Input() groups: NavGroup[] = [];
  protected auth = inject(AuthService);
  protected config = inject(ConfigurationService);
}
