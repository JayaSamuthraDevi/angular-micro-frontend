import { Component } from '@angular/core';

@Component({
  selector: 'app-dr-multizone',
  standalone: true,
  template: `
    <section class="multizone-box">
      <div class="box-badge">ADVANCED ACCESS</div>
      <h3>Multizone Replication Configuration</h3>
      <p>You have permission to configure replication across multiple availability zones and cloud domains.</p>
      <div class="zone-grid">
        <div class="zone-pill">Zone A (Primary)</div>
        <div class="zone-pill">Zone B (Secondary)</div>
        <div class="zone-pill">Zone C (Quorum)</div>
        <button class="add-zone">+ Add New Zone</button>
      </div>
    </section>
  `,
  styles: [`
    .multizone-box { 
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); 
      color: white; padding: 24px; border-radius: 20px; margin-bottom: 32px;
      position: relative; overflow: hidden;
    }
    .box-badge { position: absolute; top: 12px; right: 12px; font-size: 0.65rem; background: #2563eb; padding: 4px 8px; border-radius: 4px; font-weight: 800; }
    .multizone-box h3 { margin: 0; color: #3b82f6; }
    .multizone-box p { opacity: 0.8; font-size: 0.9rem; margin: 8px 0 20px 0; }
    .zone-grid { display: flex; gap: 12px; flex-wrap: wrap; }
    .zone-pill { background: rgba(255,255,255,0.1); padding: 6px 14px; border-radius: 99px; font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.2); }
    .add-zone { background: #2563eb; border: none; color: white; padding: 6px 14px; border-radius: 99px; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
  `]
})
export class DRMultizoneComponent {
}
