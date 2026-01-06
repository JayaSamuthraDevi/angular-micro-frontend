import { Component } from '@angular/core';

@Component({
  selector: 'instances-root',
  standalone: true,
  template: `
    <div style="border: 1px dashed #28a745; padding: 20px; border-radius: 8px;">
      <h2 style="color: #28a745;">Instances Micro-App</h2>
      <p>Manage your instances here. Independent Angular Instance.</p>
    </div>
  `
})
export class AppComponent { }
