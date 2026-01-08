````md
# Angular Application Deployment on Nginx (General & Best Practices)

This document describes **general, project-agnostic steps** to deploy any **Angular application** on **Nginx**, following **latest best practices**.  
Applicable for Angular v14+ (including v16–v18+) with modern SPA routing and security requirements.

---

## 1. Prerequisites

Ensure the following are installed and ready:

- Node.js (LTS recommended)
- Angular CLI
- Nginx (latest stable)
- Linux server (Ubuntu 20.04+ preferred)
- Domain name pointing to server IP

---

## 2. Build the Angular Application

Always create a **production build**.

```bash
npm install
npm run build
````

Or explicitly:

```bash
ng build --configuration production
```

### Verify Build Output

The output folder will be:

```
dist/<project-name>/browser
```

> 📌 **Best Practice**

* Use **AOT + optimization** (enabled by default in production)
* Avoid `ng build --prod` (deprecated alias)

---

## 3. Prepare Server Directory

Create a dedicated directory for the Angular app:

```bash
sudo mkdir -p /var/www/angular-app
sudo chown -R www-data:www-data /var/www/angular-app
```

Copy build files:

```bash
cp -r dist/<project-name>/browser/* /var/www/angular-app/
```

---

## 4. Nginx Configuration (Mandatory Setup)

Create a site config:

```bash
sudo nano /etc/nginx/sites-available/angular-app
```

### Recommended Nginx Configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/angular-app;
    index index.html;

    # Angular SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static asset caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types
        text/plain
        text/css
        application/javascript
        application/json
        application/xml
        image/svg+xml;
    gzip_min_length 256;

    # Security headers (mandatory)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Optional CSP (adjust if needed)
    # add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" always;

    # Hide Nginx version
    server_tokens off;
}
```

---

## 5. Enable the Site

```bash
sudo ln -s /etc/nginx/sites-available/angular-app \
           /etc/nginx/sites-enabled/
```

Disable default site (recommended):

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## 6. Test & Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Enable HTTPS (Strongly Recommended)

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
```

Generate SSL certificate:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will automatically:

* Configure HTTPS
* Redirect HTTP → HTTPS
* Set up auto-renewal

---

## 8. Environment Configuration (Best Practice)

### Runtime Config (Recommended)

Avoid rebuilding per environment. Use:

* `assets/config.json`
* `window.__env`
* API base URL via runtime injection

Example:

```ts
fetch('/assets/config.json')
```

---

## 9. Mandatory Best Practices Checklist

✅ Production build only
✅ SPA routing via `try_files`
✅ Long-term caching for static assets
✅ Gzip enabled
✅ Security headers added
✅ HTTPS enabled
✅ Server tokens disabled
✅ Single build per environment

---

## 10. Common Mistakes to Avoid

❌ Missing `try_files` → 404 on refresh
❌ Serving Angular from `/usr/share/nginx/html` without isolation
❌ Rebuilding app per domain
❌ No cache headers → slow load
❌ No HTTPS in production

---

## 11. Final Result

* Angular app served efficiently via Nginx
* Optimized loading & caching
* Secure, scalable, and production-ready
* Compatible with monolith, MFE, and SSR setups

---

## ✅ Recommended for Enterprise Deployments

* CDN in front of Nginx
* HTTP/2 enabled
* Runtime configuration
* Health check endpoint
* Blue/green deployments

---

**This deployment model is aligned with current Angular & Nginx best practices (2025-ready).**

```
```
