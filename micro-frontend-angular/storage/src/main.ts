import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const el = createCustomElement(AppComponent, {
    injector: appRef.injector,
  });
  if (!customElements.get('storage-app')) {
    customElements.define('storage-app', el);
  }
}).catch((err) => console.error(err));
