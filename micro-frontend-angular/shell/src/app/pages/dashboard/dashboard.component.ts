import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Platform Overview</h1>
        <p>Real-time status of your enterprise infrastructure</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card users">
          <div class="card-icon">👥</div>
          <div class="card-content">
            <span class="label">Total Users</span>
            <span class="value">1,284</span>
            <span class="trend positive">↑ 12% this month</span>
          </div>
        </div>

        <div class="stat-card instances">
          <div class="card-icon">🖥️</div>
          <div class="card-content">
            <span class="label">Active Instances</span>
            <span class="value">42</span>
            <span class="trend">Running smoothly</span>
          </div>
        </div>

        <div class="stat-card volumes">
          <div class="card-icon">💾</div>
          <div class="card-content">
            <span class="label">Total Volumes</span>
            <span class="value">156</span>
            <span class="trend negative">↓ 3 archived</span>
          </div>
        </div>

        <div class="stat-card storage">
          <div class="card-icon">☁️</div>
          <div class="card-content">
            <span class="label">Storage Available</span>
            <span class="value">4.2 TB</span>
            <span class="trend">82% capacity used</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="info-card">
          <h3>Welcome to the Control Plane</h3>
          <p>
            This dashboard provides a unified view across all your micro-services. 
            Navigate using the header to manage specific modules like Users, Instances, and Storage.
          </p>
          <button class="primary-btn">View Detailed Reports</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .dashboard-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .dashboard-header p {
      color: #6b7280;
      margin-top: 4px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
    }

    .stat-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      border-color: #2563eb;
    }

    .card-icon {
      font-size: 2.5rem;
      width: 64px;
      height: 64px;
      background: #f3f4f6;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-content {
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 4px 0;
    }

    .trend {
      font-size: 0.75rem;
      font-weight: 600;
      color: #9ca3af;
    }

    .positive { color: #10b981; }
    .negative { color: #ef4444; }

    .info-section {
      margin-top: 12px;
    }

    .info-card {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      border-radius: 16px;
      padding: 32px;
      color: white;
    }

    .info-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .info-card p {
      max-width: 600px;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .primary-btn {
      background: white;
      color: #2563eb;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .primary-btn:hover {
      background: #f3f4f6;
    }
  `]
})
export class DashboardComponent { }
