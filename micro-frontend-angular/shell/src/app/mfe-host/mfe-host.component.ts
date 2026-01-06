import { Component, OnInit, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../core/services/config.service';
import { MfeLoaderService } from '../core/services/mfe-loader.service';

@Component({
  selector: 'app-mfe-host',
  standalone: true,
  template: '',
})
export class MfeHostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private configService = inject(ConfigService);
  private loader = inject(MfeLoaderService);
  private elementRef = inject(ElementRef);

  async ngOnInit() {
    const mfeKey = this.route.snapshot.data['mfe'];
    const config = this.configService.get(mfeKey);

    if (!config) {
      console.error(`No config found for ${mfeKey}`);
      return;
    }

    try {
      await this.loader.load(config.url);
      const element = document.createElement(config.element);
      this.elementRef.nativeElement.appendChild(element);
    } catch (e) {
      console.error('Error loading MFE', e);
    }
  }
}
