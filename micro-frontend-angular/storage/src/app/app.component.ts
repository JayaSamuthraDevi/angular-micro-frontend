import { Component } from '@angular/core';

@Component({
  selector: 'storage-root',
  standalone: true,
  template: `
    <div style="border: 1px dashed #fd7e14; padding: 20px; border-radius: 8px;">
      <h2 style="color: #fd7e14;">Storage Micro-App</h2>
      <p>Manage your storage here. Independent Angular Instance.</p>
    </div>
  `
})
export class AppComponent { }
