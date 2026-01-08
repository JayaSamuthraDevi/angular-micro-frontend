import { Component } from '@angular/core';

@Component({
  selector: 'app-functions-list',
  standalone: true,
  imports: [],
  template: `
    <div class="page-header">
      <div>
        <h2>Cloud Functions</h2>
        <p class="subtitle">Event-driven serverless computing platform</p>
      </div>
      <button class="create-btn">+ Create Function</button>
    </div>

    <div class="functions-list">
      <div class="list-header">
        <span>Function Name</span>
        <span>Runtime</span>
        <span>Last Invoked</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      
      @for (fn of functions; track fn.name) {
        <div class="function-row">
          <div class="name-col">
            <span class="bolt">⚡</span>
            <div class="info">
              <span class="name">{{ fn.name }}</span>
              <span class="trigger">{{ fn.trigger }}</span>
            </div>
          </div>
          <div class="runtime-col">
            <span class="runtime-badge">{{ fn.runtime }}</span>
          </div>
          <div class="invoked-col">
            {{ fn.lastInvoked }}
          </div>
          <div class="status-col">
            <span class="status-pill" [class.active]="fn.status === 'Active'">{{ fn.status }}</span>
          </div>
          <div class="actions-col">
            <button class="icon-btn">⚙️</button>
            <button class="icon-btn">📊</button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .subtitle { color: #64748b; margin-top: 4px; }
    .create-btn { background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; }

    .functions-list { background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    .list-header { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 100px; padding: 16px 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
    
    .function-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 100px; padding: 16px 24px; border-bottom: 1px solid #f1f5f9; align-items: center; transition: background 0.2s; }
    .function-row:hover { background: #f8fafc; }
    .function-row:last-child { border-bottom: none; }
    
    .name-col { display: flex; gap: 12px; align-items: center; }
    .bolt { font-size: 1.25rem; color: #f59e0b; }
    .info { display: flex; flex-direction: column; }
    .name { font-weight: 700; color: #0f172a; }
    .trigger { font-size: 0.75rem; color: #94a3b8; }
    
    .runtime-badge { background: #f1f5f9; padding: 4px 8px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; color: #475569; }
    .last-invoked { color: #64748b; font-size: 0.9rem; }
    
    .status-pill { padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: #f1f5f9; color: #64748b; }
    .status-pill.active { background: #dcfce7; color: #15803d; }
    
    .icon-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 4px; border-radius: 6px; transition: background 0.2s; }
    .icon-btn:hover { background: #e2e8f0; }
  `]
})
export class FunctionsListComponent {
  functions = [
    { name: 'process-order-receipt', trigger: 'HTTP Trigger', runtime: 'Node.js 20', lastInvoked: '2 mins ago', status: 'Active' },
    { name: 'resize-image-webhook', trigger: 'S3 Event', runtime: 'Python 3.11', lastInvoked: '15 mins ago', status: 'Active' },
    { name: 'db-cleanup-task', trigger: 'Cron Schedule', runtime: 'Go 1.21', lastInvoked: '6 hours ago', status: 'Active' },
    { name: 'email-notification-service', trigger: 'Pub/Sub', runtime: 'Node.js 20', lastInvoked: '1 day ago', status: 'Paused' }
  ];
}
