import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 Enterprise Platform. All rights reserved.</p>
        <div class="footer-links">
          <span>Version 2.0.0</span>
          <span>•</span>
          <span>Status: Green</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      height: 48px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      padding: 0 24px;
      font-size: 0.875rem;
      color: #6b7280;
    }
    .footer-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .footer-links {
      display: flex;
      gap: 8px;
    }
  `]
})
export class FooterComponent { }
