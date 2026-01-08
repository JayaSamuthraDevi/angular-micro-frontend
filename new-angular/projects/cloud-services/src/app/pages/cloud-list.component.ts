import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cloud-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-header">
      <div>
        <h2>Cloud Compute Services</h2>
        <p class="subtitle">Management of your globally distributed compute resources</p>
      </div>
      <button class="create-btn">+ Deploy New Resource</button>
    </div>

    <div class="instance-grid">
      @for (instance of resources; track instance.id) {
        <div class="instance-card">
          <div class="status-indicator" [class.running]="instance.status === 'Running'"></div>
          <div class="card-header">
            <h3>{{ instance.name }}</h3>
            <span class="status-text">{{ instance.status }} - {{ instance.region }}</span>
          </div>
          <div class="card-details">
            <p><strong>Endpoint:</strong> {{ instance.ip }}</p>
            <p><strong>Configuration:</strong> {{ instance.flavor }}</p>
          </div>
          <div class="card-actions">
            <a [routerLink]="['/cloud-services', instance.id]" class="detail-link">Inspect Resource</a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .subtitle {
      color: #64748b;
      margin-top: 4px;
    }
    .create-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .create-btn:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }
    .instance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    .instance-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      position: relative;
      transition: all 0.3s;
    }
    .instance-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-color: #2563eb;
    }
    .status-indicator {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #94a3b8;
    }
    .status-indicator.running {
      background: #10b981;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    }
    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
      color: #0f172a;
      font-weight: 700;
    }
    .status-text {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;
    }
    .card-details {
      margin: 20px 0;
      font-size: 0.95rem;
      color: #334155;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .detail-link {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  `]
})
export class CloudListComponent {
  resources = [
    { id: 'cs-1', name: 'N-Virginia-Edge-01', status: 'Running', region: 'us-east-1', ip: '3.214.12.88', flavor: 'Premium 2xlarge' },
    { id: 'cs-2', name: 'Frankfurt-Core-DB', status: 'Running', region: 'eu-central-1', ip: '18.156.9.2', flavor: 'Memory Optimized' },
    { id: 'cs-3', name: 'Tokyo-Frontend-Proxy', status: 'Stopped', region: 'ap-northeast-1', ip: '52.192.33.1', flavor: 'Compute Optimized' }
  ];
}
