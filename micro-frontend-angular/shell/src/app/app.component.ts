import { Component, inject, OnInit } from '@angular/core';
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
  template: `
    <div class="app-layout">
      <app-header class="header-area"></app-header>
      
      <div class="main-body">
        <!-- Sidebar Area -->
        <app-sidebar 
          *ngIf="currentSidebarType !== 'none'"
          [type]="currentSidebarType"
          class="sidebar-area">
        </app-sidebar>

        <!-- Main Content Area -->
        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </div>

      <app-footer class="footer-area"></app-footer>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #f8fafc;
    }
    .main-body {
      display: flex;
      flex: 1;
      overflow: hidden; /* Prevent body scroll, invoke explicit scroll areas */
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      position: relative;
    }
  `]
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentSidebarType: 'users' | 'infra' | 'none' = 'none';

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Traverse route tree to find the child with data.sidebar
      let route = this.route.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.currentSidebarType = route.snapshot.data['sidebar'] || 'none';
    });
  }
}
