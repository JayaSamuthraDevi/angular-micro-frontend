import { Component } from '@angular/core';

@Component({
  selector: 'users-root',
  standalone: true,
  template: `
    <div style="border: 1px dashed #007bff; padding: 20px; border-radius: 8px;">
      <h2 style="color: #007bff;">Users Micro-App</h2>
      <p>Manage your users here. Independent Angular Instance.</p>
    </div>
  `
})
export class AppComponent { }
