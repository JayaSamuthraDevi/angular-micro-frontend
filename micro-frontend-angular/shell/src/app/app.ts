import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';
import { SidebarComponent } from './core/components/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('shell');
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentSidebarType: 'users' | 'infra' | 'none' = 'none';

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.route.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.currentSidebarType = route.snapshot.data['sidebar'] || 'none';
    });
  }
}
