import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dr-job-list',
  standalone: true,
  template: `
    <section class="dr-jobs">
      <div class="section-header">
        <h3>Active Replication Jobs</h3>
        <button class="create-btn">+ Create Job</button>
      </div>
      <table class="jobs-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Destination</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (job of jobs; track job.id) {
            <tr>
              <td>{{ job.source }}</td>
              <td>{{ job.dest }}</td>
              <td><span class="type-badge">{{ job.type }}</span></td>
              <td><span class="status-tag" [class.active]="job.status === 'Healthy'">{{ job.status }}</span></td>
              <td><button class="action-btn">Manage</button></td>
            </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .create-btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    
    .jobs-table { width: 100%; border-collapse: collapse; background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .jobs-table th { text-align: left; padding: 16px; background: #f8fafc; color: #475569; font-size: 0.75rem; text-transform: uppercase; }
    .jobs-table td { padding: 16px; border-top: 1px solid #e2e8f0; font-size: 0.95rem; }
    
    .type-badge { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .status-tag { padding: 4px 10px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; background: #f1f5f9; }
    .status-tag.active { background: #dcfce7; color: #15803d; }
    
    .action-btn { background: none; border: 1px solid #e2e8f0; padding: 4px 12px; border-radius: 6px; font-weight: 600; cursor: pointer; }
  `]
})
export class DRJobListComponent {
  @Input() jobs: any[] = [];
}
