import { Component } from '@angular/core';

@Component({
  selector: 'app-s3-iam',
  standalone: true,
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h2>Access Control (IAM)</h2>
          <p class="subtitle">Manage bucket policies, user permissions, and identity-based access</p>
        </div>
        <button class="primary-btn">+ Add Policy</button>
      </header>

      <div class="iam-content">
        <div class="policy-list">
          @for (policy of policies; track policy.name) {
            <div class="policy-card">
              <div class="policy-icon">🛡️</div>
              <div class="policy-details">
                <h4>{{ policy.name }}</h4>
                <p>{{ policy.description }}</p>
                <div class="tags">
                   @for (tag of policy.tags; track tag) {
                     <span class="tag">{{ tag }}</span>
                   }
                </div>
              </div>
              <div class="policy-meta">
                <span class="status healthy">Attached</span>
                <button class="edit-btn">Edit</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px; font-family: 'Inter', sans-serif; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .page-header h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; }
    .subtitle { color: #64748b; margin-top: 4px; }
    
    .primary-btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; }
    
    .policy-list { display: flex; flex-direction: column; gap: 16px; }
    .policy-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 20px; }
    
    .policy-icon { font-size: 1.5rem; background: #f8fafc; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
    
    .policy-details { flex: 1; }
    .policy-details h4 { margin: 0 0 4px 0; color: #0f172a; font-size: 1.1rem; }
    .policy-details p { margin: 0 0 12px 0; color: #64748b; font-size: 0.9rem; }
    
    .tags { display: flex; gap: 8px; }
    .tag { background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    
    .policy-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .status.healthy { color: #10b981; font-size: 0.8rem; font-weight: 700; }
    .edit-btn { background: none; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; cursor: pointer; color: #64748b; font-weight: 600; }
    .edit-btn:hover { background: #f8fafc; color: #1e293b; }
  `]
})
export class S3IAMComponent {
  policies = [
    { name: 'FullAccessBucketAdmin', description: 'Provides full access to S3 buckets and objects including deletion.', tags: ['Admin', 'Sovereign'] },
    { name: 'ReadOnlyPublicAssets', description: 'Restricted read-only access for CDN and public static assets.', tags: ['Public', 'Read-Only'] },
    { name: 'CrossRegionSyncPolicy', description: 'Required permissions for automated replication between clusters.', tags: ['Internal', 'System'] }
  ];
}
