import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cloud-services-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="cloud-services-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .cloud-services-container {
      padding: 0;
    }
  `]
})
export class AppComponent { }
