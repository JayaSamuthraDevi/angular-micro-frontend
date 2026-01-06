import { Component } from '@angular/core';

interface LifecyclePolicy {
  id: string;
  name: string;
  bucket: string;
  status: 'Enabled' | 'Disabled';
  rules: number;
  lastModified: string;
}

@Component({
  selector: 'app-s3-policies',
  standalone: true,
  template: `
    <div class="policies-container">
      <header class="page-header">
        <div class="header-main">
          <h2>Lifecycle Policies</h2>
          <p class="subtitle">Automate object transitions to different storage classes or expiration</p>
        </div>
        <button class="primary-btn">+ Create Policy</button>
      </header>

      <section class="policy-stats">
        <div class="stat-card">
          <span class="label">Total Policies</span>
          <span class="value">12</span>
        </div>
        <div class="stat-card">
          <span class="label">Enabled Rules</span>
          <span class="value">48</span>
        </div>
        <div class="stat-card">
          <span class="label">Storage Optimized</span>
          <span class="value">2.4 TB</span>
        </div>
      </section>

      <div class="policies-list">
        <div class="table-header">
          <h3>Active Policies</h3>
          <div class="search-box">
             <span class="search-icon">🔍</span>
             <input type="text" placeholder="Filter policies...">
          </div>
        </div>
        
        <div class="table-wrapper">
          <table class="policy-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Target Bucket</th>
                <th>Rules</th>
                <th>Last Modified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (policy of policies; track policy.id) {
                <tr>
                  <td>
                    <div class="policy-name-cell">
                      <span class="policy-icon">📜</span>
                      <div class="info">
                        <span class="name">{{ policy.name }}</span>
                        <span class="id">ID: {{ policy.id }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="bucket-pill">🪣 {{ policy.bucket }}</span>
                  </td>
                  <td>
                    <span class="rules-badge">{{ policy.rules }} Rules</span>
                  </td>
                  <td>
                    <span class="date">{{ policy.lastModified }}</span>
                  </td>
                  <td>
                    <span class="status-pill" [class.enabled]="policy.status === 'Enabled'">
                      {{ policy.status }}
                    </span>
                  </td>
                  <td>
                    <div class="action-btns">
                      <button class="icon-btn" title="Edit">⚙️</button>
                      <button class="icon-btn" title="View Details">👁️</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .policies-container { padding: 32px; font-family: 'Inter', sans-serif; background: #fdfdfd; min-height: 100vh; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .header-main h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; letter-spacing: -0.025em; }
    .subtitle { color: #64748b; margin-top: 4px; font-size: 1rem; }
    
    .primary-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .primary-btn:hover { background: #1d4ed8; transform: translateY(-2px); }

    .policy-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
    .stat-card { background: white; border: 1px solid #e2e8f0; padding: 24px; border-radius: 20px; transition: all 0.3s; }
    .stat-card .label { font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .stat-card .value { font-size: 1.75rem; font-weight: 800; color: #0f172a; display: block; margin-top: 8px; }

    .policies-list { background: white; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; }
    .table-header { padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }
    .table-header h3 { margin: 0; font-size: 1.25rem; color: #0f172a; font-weight: 700; }
    
    .search-box { position: relative; background: #f8fafc; border-radius: 10px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; border: 1px solid #e2e8f0; }
    .search-box input { background: transparent; border: none; outline: none; font-size: 0.9rem; color: #334155; width: 200px; }
    
    .table-wrapper { width: 100%; overflow-x: auto; }
    .policy-table { width: 100%; border-collapse: collapse; }
    .policy-table th { text-align: left; padding: 16px 24px; background: #f8fafc; font-size: 0.75rem; color: #64748b; text-transform: uppercase; font-weight: 700; }
    .policy-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    
    .policy-name-cell { display: flex; align-items: center; gap: 12px; }
    .policy-icon { font-size: 1.5rem; background: #f1f5f9; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px; }
    .info { display: flex; flex-direction: column; }
    .name { font-weight: 700; color: #0f172a; }
    .id { font-size: 0.75rem; color: #94a3b8; }
    
    .bucket-pill { background: #f1f5f9; padding: 4px 10px; border-radius: 99px; font-size: 0.85rem; font-weight: 600; color: #475569; }
    .rules-badge { color: #2563eb; font-weight: 700; font-size: 0.9rem; }
    .date { color: #64748b; font-size: 0.9rem; }
    
    .status-pill { padding: 6px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #94a3b8; }
    .status-pill.enabled { background: #dcfce7; color: #15803d; }
    
    .action-btns { display: flex; gap: 8px; }
    .icon-btn { background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px; cursor: pointer; transition: 0.2s; }
    .icon-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
  `]
})
export class LifecyclePoliciesComponent {
  policies: LifecyclePolicy[] = [
    { id: 'pol-001', name: 'Log Retention Daily', bucket: 'enterprise-logs-prod', status: 'Enabled', rules: 3, lastModified: '2025-12-18' },
    { id: 'pol-002', name: 'Media Expiration', bucket: 'user-assets-cache', status: 'Enabled', rules: 1, lastModified: '2025-12-19' },
    { id: 'pol-003', name: 'Archive Transition', bucket: 'project-backups-2024', status: 'Enabled', rules: 5, lastModified: '2025-12-15' },
    { id: 'pol-004', name: 'Temp File Cleanup', bucket: 'temp-upload-staging', status: 'Disabled', rules: 2, lastModified: '2024-11-05' }
  ];
}
