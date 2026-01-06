import { Component } from '@angular/core';

@Component({
  selector: 'app-s3-versioning',
  standalone: true,
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h2>Object Versioning</h2>
          <p class="subtitle">Maintain multiple variants of an object in the same bucket</p>
        </div>
      </header>

      <div class="versioning-info-card">
        <div class="icon">🔄</div>
        <div class="info">
          <h3>Protect your data from accidental deletes</h3>
          <p>Versioning is a means of keeping multiple variants of an object in the same bucket. You can use versioning to preserve, retrieve, and restore every version of every object stored in your buckets.</p>
        </div>
        <button class="enable-btn">Enable Global Versioning</button>
      </div>

      <div class="history-section">
        <h3>Recent Version History</h3>
        <div class="table-card">
          <table>
            <thead>
              <tr>
                <th>Object Name</th>
                <th>Version ID</th>
                <th>Last Modified</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              @for (v of versions; track v.id) {
                <tr>
                  <td>{{ v.name }}</td>
                  <td><code>{{ v.id }}</code></td>
                  <td>{{ v.modified }}</td>
                  <td>{{ v.size }}</td>
                  <td><button class="restore-link">Restore</button></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px; font-family: 'Inter', sans-serif; }
    .page-header { margin-bottom: 32px; }
    .page-header h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; }
    .subtitle { color: #64748b; margin-top: 4px; }
    
    .versioning-info-card { background: #eff6ff; border: 1px solid #dbeafe; border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 24px; margin-bottom: 40px; }
    .versioning-info-card .icon { font-size: 2rem; }
    .versioning-info-card .info { flex: 1; }
    .versioning-info-card h3 { margin: 0 0 8px 0; color: #1e40af; }
    .versioning-info-card p { margin: 0; color: #3b82f6; font-size: 0.95rem; line-height: 1.5; }
    
    .enable-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; }

    .history-section h3 { font-size: 1.25rem; color: #0f172a; margin-bottom: 20px; }
    .table-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 16px 24px; background: #f8fafc; color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 700; }
    td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 0.9rem; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.85rem; }
    
    .restore-link { color: #2563eb; background: none; border: none; font-weight: 700; cursor: pointer; text-decoration: underline; padding: 0; }
  `]
})
export class S3VersioningComponent {
  versions = [
    { name: 'app-config-prod.json', id: 'v25-8x92nd', modified: '2025-12-19 14:20', size: '4.2 KB' },
    { name: 'app-config-prod.json', id: 'v24-4l2k9m', modified: '2025-12-18 09:15', size: '4.1 KB' },
    { name: 'header-logo.png', id: 'v02-9a0s1d', modified: '2025-11-05 11:45', size: '124 KB' }
  ];
}
