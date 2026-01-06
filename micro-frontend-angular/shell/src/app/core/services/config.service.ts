import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface MfeConfig {
  url: string;
  element: string;
  permission: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private http = inject(HttpClient);
  private config: Record<string, MfeConfig> = {};

  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(this.http.get<Record<string, MfeConfig>>('assets/mfe.config.json'));
      console.log('MFE Config loaded:', this.config);
    } catch (err) {
      console.error('Failed to load MFE config', err);
    }
  }

  get(key: string): MfeConfig {
    return this.config[key];
  }
}
