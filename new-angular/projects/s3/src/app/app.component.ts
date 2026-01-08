import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 's3-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: []
})
export class AppComponent { }
