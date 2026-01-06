import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GeneralConfig {
  activeServices: string[];
  maintenanceMode: boolean;
  config: any;
}

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private http = inject(HttpClient);

  // Base services from the primary config
  private baseServices: string[] = [];

  // Currently active module-specific features
  private moduleFeatures: string[] = [];

  // Unified signal for UI to consume
  allowedFeatures = signal<string[]>([]);
  fullConfig = signal<any>(null);

  async loadGeneralConfigurations(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<GeneralConfig>('assets/generalconfigurations.json')
      );
      this.baseServices = data.activeServices;
      this.fullConfig.set(data.config);
      this.refreshFeatures();
      console.log('✅ General Configurations Loaded:', data);
    } catch (err) {
      console.error('❌ Failed to load general configurations', err);
    }
  }

  async loadModuleFeatures(moduleName: string): Promise<void> {
    if (moduleName === 'none') {
      this.moduleFeatures = [];
      this.refreshFeatures();
      return;
    }

    try {
      const data = await firstValueFrom(
        this.http.get<{ enabledFeatures: string[] }>(`assets/features-${moduleName}.json`)
      );
      this.moduleFeatures = data.enabledFeatures;
      this.refreshFeatures();
      console.log(`✅ ${moduleName} Features Loaded:`, data.enabledFeatures);
    } catch (err) {
      console.warn(`⚠️ No feature file found for ${moduleName}, using defaults.`);
      this.moduleFeatures = [];
      this.refreshFeatures();
    }
  }

  private refreshFeatures() {
    this.allowedFeatures.set([...this.baseServices, ...this.moduleFeatures]);
  }

  isServiceEnabled(featureName: string): boolean {
    return this.allowedFeatures().includes(featureName);
  }
}
