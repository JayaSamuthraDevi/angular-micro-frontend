import { Component } from '@angular/core';

@Component({
  selector: 'app-failover-history',
  standalone: true,
  imports: [],
  template: `
    <div class="history-container">
      <header class="history-header">
        <h2>Failover History</h2>
        <p class="subtitle">Log of all recovery operations and domain switches</p>
      </header>

      <div class="timeline">
        @for (event of events; track event.id) {
          <div class="timeline-event" [class.success]="event.status === 'Completed'" [class.failed]="event.status === 'Stopped'">
            <div class="event-time">
              <span class="date">{{ event.date }}</span>
              <span class="time">{{ event.time }}</span>
            </div>
            
            <div class="event-marker">
              <div class="dot"></div>
              <div class="line"></div>
            </div>

            <div class="event-card">
              <div class="card-header">
                <span class="type-badge">{{ event.type }}</span>
                <span class="status-pill">{{ event.status }}</span>
              </div>
              <div class="card-body">
                <h3>{{ event.description }}</h3>
                <div class="meta">
                  <span><strong>Source:</strong> {{ event.source }}</span>
                  <span class="arrow">→</span>
                  <span><strong>Destination:</strong> {{ event.dest }}</span>
                </div>
                <p class="details">{{ event.details }}</p>
              </div>
              @if (event.status === 'Completed') {
                <div class="card-footer">
                  <button class="report-btn">📄 View Recovery Report</button>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .history-container { padding: 24px; font-family: 'Inter', sans-serif; }
    .history-header { margin-bottom: 48px; }
    .history-header h2 { margin: 0; font-size: 1.8rem; color: #0f172a; }
    .subtitle { color: #64748b; margin-top: 4px; }

    .timeline { display: flex; flex-direction: column; gap: 0; position: relative; }
    
    .timeline-event { display: flex; gap: 24px; }
    
    .event-time { width: 100px; display: flex; flex-direction: column; align-items: flex-end; pt: 4px; }
    .event-time .date { font-size: 0.85rem; font-weight: 700; color: #0f172a; }
    .event-time .time { font-size: 0.75rem; color: #94a3b8; }

    .event-marker { display: flex; flex-direction: column; align-items: center; }
    .event-marker .dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #2563eb; background: white; z-index: 2; position: relative; margin-top: 8px; }
    .event-marker .line { width: 2px; flex: 1; background: #e2e8f0; margin-top: -2px; margin-bottom: -2px; }
    .timeline-event:last-child .event-marker .line { display: none; }

    .event-card { flex: 1; background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-bottom: 32px; transition: transform 0.2s; }
    .event-card:hover { transform: translateX(8px); border-color: #2563eb; }
    
    .card-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .type-badge { font-size: 0.7rem; font-weight: 800; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; color: #475569; }
    .status-pill { font-size: 0.75rem; font-weight: 700; color: #15803d; }
    
    .timeline-event.success .event-marker .dot { background: #dcfce7; border-color: #10b981; }
    .timeline-event.success .status-pill { color: #15803d; }
    
    .timeline-event.failed .event-marker .dot { background: #fee2e2; border-color: #ef4444; }
    .timeline-event.failed .status-pill { color: #b91c1c; }

    .card-body h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }
    .meta { display: flex; align-items: center; gap: 12px; margin: 12px 0; font-size: 0.85rem; color: #64748b; }
    .arrow { color: #cbd5e1; font-weight: 800; }
    .details { font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0; }
    
    .card-footer { margin-top: 16px; pt: 16px; border-top: 1px solid #f1f5f9; }
    .report-btn { font-size: 0.85rem; font-weight: 700; color: #2563eb; background: none; border: none; cursor: pointer; padding: 0; }
  `]
})
export class FailoverHistoryComponent {
  events = [
    {
      id: 1,
      date: 'Dec 18, 2025',
      time: '14:22:05',
      type: 'Routine drill',
      status: 'Completed',
      description: 'Quarterly Disaster Recovery Simulation',
      source: 'Primary-US-East',
      dest: 'DR-US-West',
      details: 'Full stack failover completed in 4m 12s. All database integrity checks passed. Load balancer diverted 100% traffic to secondary region.'
    },
    {
      id: 2,
      date: 'Nov 05, 2025',
      time: '03:15:42',
      type: 'Network Outage',
      status: 'Completed',
      description: 'Emergency Failover - ISP Interruption',
      source: 'Paris-Core-01',
      dest: 'Frankfurt-DR',
      details: 'Triggered by automatic health check failure. System restored in secondary domain within 58 seconds of detection.'
    },
    {
      id: 3,
      date: 'Oct 12, 2025',
      time: '11:00:00',
      type: 'Maintenance',
      status: 'Stopped',
      description: 'Planned Switch - Hardware Upgrade',
      source: 'Tokyo-Main',
      dest: 'Osaka-DR',
      details: 'Operation aborted by user. Primary site confirmed stable before switch execution.'
    }
  ];
}
