import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';
import { SidebarComponent } from './core/components/sidebar.component';
import { ConfigurationService } from './core/services/configuration.service';
import { NavGroup } from './core/models/navigation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('shell');
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private configService = inject(ConfigurationService);

  currentSidebarGroups = signal<NavGroup[]>([]);

  private readonly NAV_CONFIGS: Record<string, NavGroup[]> = {
    'cloud': [{
      title: 'Cloud Infrastructure',
      items: [
        { label: 'Compute Engine', icon: '☁️', link: '/cloud-services', exact: true },
        { label: 'Kubernetes', icon: '☸️', link: '/cloud-services/kubernetes', feature: 'cloud:k8s' },
        { label: 'Cloud Functions', icon: '⚡', link: '/cloud-services/functions', feature: 'cloud:functions' }
      ]
    }],
    'dr': [{
      title: 'Disaster Recovery',
      items: [
        { label: 'Replication Jobs', icon: '🛡️', link: '/dr', exact: true },
        { label: 'Failover History', icon: '🔄', link: '/dr/failover', feature: 'dr:history' }
      ]
    }],
    's3': [{
      title: 'Object Storage',
      items: [
        { label: 'Buckets', icon: '🪣', link: '/s3', feature: 's3:buckets', exact: true },
        { label: 'Lifecycle Policies', icon: '📜', link: '/s3/policies', feature: 's3:lifecycle' },
        { label: 'Storage Classes', icon: '📦', link: '/s3/storage-classes', feature: 's3:storage-classes', permission: 's3:storage-classes' },
        { label: 'Access Control', icon: '🔑', link: '/s3/iam', feature: 's3:iam', permission: 's3:iam' },
        { label: 'Object Versioning', icon: '🔄', link: '/s3/versioning', feature: 's3:versioning', permission: 's3:versioning' }
      ]
    }]
  };

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.snapshot.root;
      let sidebarKey = 'none';

      // Traverse to find the deepest sidebar data
      while (route.firstChild) {
        route = route.firstChild;
        if (route.data['sidebar']) {
          sidebarKey = route.data['sidebar'];
        }
      }

      console.log('🔍 Sidebar Key:', sidebarKey);

      // Load specific features for this module from separate API/JSON
      this.configService.loadModuleFeatures(sidebarKey).then(() => {
        this.currentSidebarGroups.set(this.NAV_CONFIGS[sidebarKey] || []);
      });
    });
  }
}
