import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MfeLoaderService {
  load(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.type = 'module';
      script.onload = () => resolve();
      script.onerror = (e) => {
        console.error(`Failed to load script: ${url}`, e);
        reject(e);
      };
      document.body.appendChild(script);
    });
  }
}
