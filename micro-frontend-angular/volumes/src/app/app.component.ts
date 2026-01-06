import { Component } from '@angular/core';

@Component({
  selector: 'volumes-root',
  standalone: true,
  template: `
    <div style="border: 1px dashed #6f42c1; padding: 20px; border-radius: 8px;">
      <h2 style="color: #6f42c1;">Volumes Micro-App</h2>
      <p>Manage your volumes here. Independent Angular Instance.</p>
    </div>
  `
})
export class AppComponent { }
