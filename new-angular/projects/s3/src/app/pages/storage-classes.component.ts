import { Component } from '@angular/core';

@Component({
  selector: 'app-s3-storage-classes',
  standalone: true,
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h2>Storage Classes</h2>
          <p class="subtitle">Optimize costs with automated tiering and archival</p>
        </div>
      </header>
      
      <div class="classes-grid">
        @for (item of storageClasses; track item.name) {
          <div class="class-card">
            <div class="class-header">
              <span class="icon">{{ item.icon }}</span>
              <h3>{{ item.name }}</h3>
              <span class="status-pill">Active</span>
            </div>
            <p class="desc">{{ item.description }}</p>
            <div class="metas">
              <div class="meta">
                <span class="label">Durability</span>
                <span class="val">{{ item.durability }}</span>
              </div>
              <div class="meta">
                <span class="label">Min Duration</span>
                <span class="val">{{ item.minDuration }}</span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px; font-family: 'Inter', sans-serif; }
    .page-header { margin-bottom: 32px; }
    .page-header h2 { margin: 0; font-size: 2rem; color: #0f172a; font-weight: 800; }
    .subtitle { color: #64748b; margin-top: 4px; }
    
    .classes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
    .class-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; transition: 0.3s; }
    .class-card:hover { transform: translateY(-4px); border-color: #3b82f6; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
    
    .class-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .icon { font-size: 1.5rem; background: #f1f5f9; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
    .class-header h3 { margin: 0; font-size: 1.1rem; flex: 1; }
    
    .status-pill { font-size: 0.7rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 99px; }
    .desc { font-size: 0.9rem; color: #64748b; margin-bottom: 20px; line-height: 1.5; }
    
    .metas { display: flex; gap: 24px; border-top: 1px solid #f1f5f9; pt: 16px; margin-top: 16px; padding-top: 16px; }
    .meta { display: flex; flex-direction: column; gap: 4px; }
    .label { font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
    .val { font-size: 0.9rem; font-weight: 600; color: #334155; }
  `]
})
export class StorageClassesComponent {
  storageClasses = [
    { name: 'S3 Standard', icon: '📦', durability: '99.999999999%', minDuration: 'None', description: 'General purpose storage for any type of data, typically used for frequently accessed data.' },
    { name: 'S3 Intelligent-Tiering', icon: '🧠', durability: '99.999999999%', minDuration: 'None', description: 'Automatic cost savings by moving data between frequent and infrequent access tiers.' },
    { name: 'S3 Standard-IA', icon: '☁️', durability: '99.999999999%', minDuration: '30 days', description: 'For data that is accessed less frequently, but requires rapid access when needed.' },
    { name: 'S3 Glacier Instant Retrieval', icon: '❄️', durability: '99.999999999%', minDuration: '90 days', description: 'Archive storage that delivers the lowest cost for long-lived data that is rarely accessed.' }
  ];
}
