import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard-container">
      @if (auth.isAuthenticated()) {
        <header class="dashboard-header">
          <h1>Welcome, {{ auth.currentUser()?.username }}!</h1>
          <p>Enterprise Resource Dashboard</p>
        </header>
      } @else {
        <header class="dashboard-header">
          <h1>Enterprise Control Plane</h1>
          <p>Please <a routerLink="/login">Login</a> or <a routerLink="/signup">Sign Up</a> to manage your services.</p>
        </header>
      }

      <!-- Service Entitlement Summary -->
      @if (auth.isAuthenticated()) {
        <section class="entitlement-section">
          <div class="section-header">
            <h3>Your Active Entitlements</h3>
            <button (click)="resetSession()" class="reset-btn">Reset Account Data</button>
          </div>
          <div class="entitlement-grid">
            @for (s of availableServices; track s.id) {
              <div class="entitlement-item" [class.enabled]="auth.isServiceEnabled(s.id)">
                <span class="status-dot"></span>
                <span class="entitlement-icon">{{ s.icon }}</span>
                <div class="entitlement-info">
                  <span class="name">{{ s.name }}</span>
                  <span class="status">{{ auth.isServiceEnabled(s.id) ? 'Active' : 'Not Provisioned' }}</span>
                </div>
                @if (auth.isServiceEnabled(s.id)) {
                  <a [routerLink]="['/' + s.id]" class="go-btn">Go to Service →</a>
                }
              </div>
            }
          </div>
        </section>
        
        <div class="stats-grid">
          @if (auth.isServiceEnabled('cloud-services')) {
            <div class="stat-card cloud">
              <div class="card-icon">☁️</div>
              <div class="card-content">
                <span class="label">Compute Instances</span>
                <span class="value">24 Active</span>
                <span class="trend positive">↑ 4 added today</span>
              </div>
            </div>
          }

          @if (auth.isServiceEnabled('dr')) {
            <div class="stat-card dr">
              <div class="card-icon">🛡️</div>
              <div class="card-content">
                <span class="label">DR Health</span>
                <span class="value">99.9%</span>
                <span class="trend">Last sync 2m ago</span>
              </div>
            </div>
          }

          @if (auth.isServiceEnabled('s3')) {
            <div class="stat-card s3">
              <div class="card-icon">🪣</div>
              <div class="card-content">
                <span class="label">Total Buckets</span>
                <span class="value">14</span>
                <span class="trend">8.2 GB stored</span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-container { display: flex; flex-direction: column; gap: 32px; padding: 20px; }
    .dashboard-header h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin: 0; }
    .dashboard-header p { color: #64748b; font-size: 1.1rem; }
    
    .entitlement-section { background: #f8fafc; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-header h3 { margin: 0; font-size: 1.2rem; color: #334155; }
    .reset-btn { font-size: 0.8rem; color: #ef4444; background: none; border: 1px solid #fee2e2; padding: 4px 12px; border-radius: 6px; cursor: pointer; }
    
    .entitlement-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .entitlement-item { background: white; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; position: relative; opacity: 0.6; filter: grayscale(100%); transition: all 0.3s; }
    .entitlement-item.enabled { opacity: 1; filter: grayscale(0%); border-color: #2563eb; }
    
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }
    .enabled .status-dot { background: #10b981; box-shadow: 0 0 8px #10b981; }
    .entitlement-icon { font-size: 1.5rem; }
    .entitlement-info { flex: 1; display: flex; flex-direction: column; }
    .entitlement-info .name { font-weight: 700; color: #1e293b; }
    .entitlement-info .status { font-size: 0.75rem; color: #64748b; }
    .enabled .status { color: #10b981; font-weight: 600; }
    
    .go-btn { font-size: 0.85rem; font-weight: 700; color: #2563eb; text-decoration: none; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 20px; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .stat-card:hover { transform: translateY(-4px); border-color: #2563eb; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    .card-icon { font-size: 2rem; width: 64px; height: 64px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .card-content { display: flex; flex-direction: column; }
    .label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
    .value { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 2px 0; }
    .trend { font-size: 0.75rem; font-weight: 600; color: #94a3b8; }
    .positive { color: #10b981; }
  `]
})
export class DashboardComponent {
  protected auth = inject(AuthService);

  availableServices = [
    { id: 'cloud-services', name: 'Cloud Compute', icon: '☁️' },
    { id: 'dr', name: 'Disaster Recovery', icon: '🛡️' },
    { id: 's3', name: 'S3 Object Storage', icon: '🪣' }
  ];

  resetSession() {
    sessionStorage.clear();
    location.reload();
  }
}
