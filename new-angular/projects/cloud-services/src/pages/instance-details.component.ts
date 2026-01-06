import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-instance-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="back-link">
      <a routerLink="/instances">← Back to Dashboard</a>
    </div>

    <div class="detail-container">
      <header>
        <h1>Instance: {{ instanceId }}</h1>
        <span class="badge">Running</span>
      </header>

      <div class="specs-grid">
        <div class="spec-item">
          <label>ID</label>
          <span>{{ instanceId }}</span>
        </div>
        <div class="spec-item">
          <label>Availability Zone</label>
          <span>us-east-1a</span>
        </div>
        <div class="spec-item">
          <label>Instance Type</label>
          <span>m5.large</span>
        </div>
        <div class="spec-item">
          <label>Launch Time</label>
          <span>Dec 18, 2025</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-link {
      margin-bottom: 20px;
    }
    .back-link a {
      color: #6b7280;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .detail-container {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 32px;
    }
    header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 32px;
    }
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    .badge {
      background: #ecfdf5;
      color: #059669;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .spec-item label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #9ca3af;
      font-weight: 600;
    }
    .spec-item span {
      font-weight: 500;
      color: #111827;
    }
  `]
})
export class InstanceDetailsComponent {
  private route = inject(ActivatedRoute);
  instanceId = this.route.snapshot.params['id'];
}
