import { Component } from '@angular/core';

@Component({
  selector: 'app-kubernetes-list',
  standalone: true,
  imports: [],
  template: `
    <div class="page-header">
      <div>
        <h2>Kubernetes Clusters</h2>
        <p class="subtitle">Manage your production-grade container orchestration</p>
      </div>
      <button class="create-btn">+ Create Cluster</button>
    </div>

    <div class="cluster-grid">
      @for (cluster of clusters; track cluster.id) {
        <div class="cluster-card">
          <div class="card-header">
            <div class="cluster-name-box">
              <span class="icon">☸️</span>
              <div>
                <h3>{{ cluster.name }}</h3>
                <span class="version">v{{ cluster.version }}</span>
              </div>
            </div>
            <span class="status-tag" [class.stable]="cluster.status === 'Healthy'">{{ cluster.status }}</span>
          </div>
          
          <div class="resource-stats">
            <div class="stat">
              <span class="label">Nodes</span>
              <span class="value">{{ cluster.nodes }}</span>
            </div>
            <div class="stat">
              <span class="label">CPU Usage</span>
              <span class="value">{{ cluster.cpu }}</span>
            </div>
            <div class="stat">
              <span class="label">Memory</span>
              <span class="value">{{ cluster.memory }}</span>
            </div>
          </div>

          <div class="card-footer">
            <span class="region">{{ cluster.region }}</span>
            <button class="manage-btn">Manage Control Plane</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .subtitle { color: #64748b; margin-top: 4px; }
    .create-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; }
    
    .cluster-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
    .cluster-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; transition: all 0.3s; }
    .cluster-card:hover { border-color: #2563eb; transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .cluster-name-box { display: flex; gap: 12px; align-items: center; }
    .cluster-name-box .icon { font-size: 2rem; background: #f0f9ff; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
    .cluster-name-box h3 { margin: 0; font-size: 1.15rem; color: #0f172a; }
    .cluster-name-box .version { font-size: 0.8rem; color: #64748b; font-weight: 500; }
    
    .status-tag { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; background: #fef9c3; color: #854d0e; }
    .status-tag.stable { background: #dcfce7; color: #15803d; }
    
    .resource-stats { display: flex; justify-content: space-between; background: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 20px; }
    .stat { display: flex; flex-direction: column; gap: 4px; }
    .stat .label { font-size: 0.7rem; color: #64748b; text-transform: uppercase; font-weight: 600; }
    .stat .value { font-size: 1rem; color: #0f172a; font-weight: 700; }
    
    .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; pt: 16px; }
    .region { font-size: 0.85rem; color: #94a3b8; font-weight: 500; }
    .manage-btn { color: #2563eb; background: none; border: none; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
  `]
})
export class KubernetesListComponent {
  clusters = [
    { id: 'k8s-1', name: 'Production-US-East', version: '1.28.2', status: 'Healthy', nodes: 12, cpu: '42%', memory: '68%', region: 'us-east-1' },
    { id: 'k8s-2', name: 'Staging-EU-West', version: '1.27.4', status: 'Healthy', nodes: 3, cpu: '18%', memory: '34%', region: 'eu-west-1' },
    { id: 'k8s-3', name: 'Data-Processing-Tokyo', version: '1.28.0', status: 'Scaling', nodes: 24, cpu: '89%', memory: '91%', region: 'ap-northeast-1' }
  ];
}
