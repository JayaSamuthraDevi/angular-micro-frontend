# Project Recreation Guide: Angular Micro-Frontend Platform

## 📋 Overview

This guide provides step-by-step instructions to recreate the entire Angular micro-frontend project structure from scratch. The project uses **npm workspaces with standalone applications** as the core methodology.

---

## 🏗️ Methodology & Architecture

### **Methodology: npm Workspaces + Standalone Applications**

This project uses a **monorepo architecture** with the following approach:

```
Root Workspace (npm workspaces)
├── Shell Application (main host)
└── Independent Micro-Frontend Applications
    ├── cloud-services
    ├── dr
    └── s3
```

### **Why This Approach?**

✅ **Modularity** - Each micro-frontend is independent and deployable  
✅ **Scalability** - Easy to add new modules without touching existing ones  
✅ **Performance** - Lazy loading of separate bundles for each module  
✅ **Team Autonomy** - Different teams can work on different modules  
✅ **Shared Dependencies** - Root-level npm install manages common packages  
✅ **Development Speed** - Can develop/test modules independently  

### **Key Characteristics**

- **Not using library structure** (`ng generate library`) - each module is a full application
- **Not using Module Federation** - using Angular's built-in lazy loading with separate builds
- **Standalone Components** - Angular 14+ `standalone: true` API
- **npm Workspaces** - Native npm feature for monorepo management

---

## 📂 Project Structure Overview

```
enterprise-platform/                    # Root workspace
│
├── package.json                        # Root package.json (workspaces config)
├── tsconfig.json                       # Root TypeScript config
├── angular.json                        # Angular workspace config
│
├── projects/                           # All micro-frontend applications
│   ├── cloud-services/                # Micro-frontend #1
│   │   ├── package.json
│   │   ├── tsconfig.app.json
│   │   ├── angular.json (or app config)
│   │   └── src/
│   │       ├── index.html
│   │       ├── main.ts
│   │       └── app/
│   │
│   ├── dr/                            # Micro-frontend #2
│   │   └── (same structure)
│   │
│   └── s3/                            # Micro-frontend #3
│       └── (same structure)
│
├── src/                               # Shell Application (Host)
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   └── app/
│       ├── app.ts
│       ├── app.routes.ts
│       ├── app.config.ts
│       ├── core/
│       │   ├── services/
│       │   ├── guards/
│       │   ├── directives/
│       │   ├── components/
│       │   └── models/
│       └── pages/
│
├── public/                            # Static assets
│   └── assets/
│       ├── generalconfigurations.json
│       └── features-*.json
│
├── k8s/                               # Kubernetes manifests
│   └── deployment.yaml
│
└── Documentation files
    ├── README.md
    ├── QUICK_START.md
    ├── ARCHITECTURE.md
    ├── DOCUMENTATION.md
    └── FEATURE_IMPLEMENTATION_GUIDE.md
```

---

## 🚀 Step-by-Step Recreation Guide

### **Phase 1: Project Initialization**

#### **Step 1: Create Root Workspace using ng new**

```bash
# Create root workspace with ng new (NOT with npm init)
ng new enterprise-platform --create-application=false --package-manager=npm

cd enterprise-platform
```

This automatically creates:
- ✅ `package.json`
- ✅ `angular.json`
- ✅ `tsconfig.json`
- ✅ `tsconfig.app.json`
- ✅ `tsconfig.spec.json`
- ✅ `.gitignore`
- ✅ All configuration files

#### **Step 2: Update package.json for Workspaces**

Edit `package.json` to add workspaces configuration:

```json
{
  "name": "enterprise-platform",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "projects/*"
  ],
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^21.0.0",
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/platform-browser": "^21.0.0",
    "@angular/platform-browser-dynamic": "^21.0.0",
    "@angular/router": "^21.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^21.0.0",
    "@angular/build": "^21.0.3",
    "@angular/cli": "^21.0.3",
    "@angular/compiler-cli": "^21.0.0",
    "@tailwindcss/postcss": "^4.1.12",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.12",
    "typescript": "~5.9.2"
  }
}
```

#### **Step 3: Install Dependencies**

```bash
npm install
```

---

### **Phase 2: Angular Configuration Files**

#### **Step 4: Create Root tsconfig.json**

The tsconfig.json is already created by `ng new` command. If you need to customize it:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

#### **Step 5: Update Root angular.json (Auto-Created by ng new)**

The `angular.json` is automatically created by `ng new`. It already contains the shell application configuration. The file is ready to use - no changes needed.

If you want to configure it manually, `ng new` already creates a proper setup. You can verify with:

```bash
ng config projects.enterprise-platform.sourceRoot
```

This outputs the source root directory.

#### **Step 6: Create tsconfig.app.json**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

#### **Step 7: Create tsconfig.spec.json**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

---

### **Phase 3: Shell Application Setup**

#### **Step 8: Create Shell App Structure**

```bash
# Create directory structure
mkdir -p src/app/core/{services,guards,directives,models,components}
mkdir -p src/app/core/components/{header,sidebar,footer}
mkdir -p src/app/pages/{auth,dashboard}
```

#### **Step 9: Create src/main.ts**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
```

#### **Step 10: Create src/app/app.ts (Shell Component)**

```typescript
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="flex flex-col h-screen">
      <app-header></app-header>
      <div class="flex flex-1 overflow-hidden">
        <app-sidebar></app-sidebar>
        <main class="flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Enterprise Platform';
}
```

#### **Step 11: Create src/app/app.routes.ts**

```typescript
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login.component';
import { SignupComponent } from './pages/auth/signup.component';
import { featureGuard } from './core/guards/feature.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [featureGuard]
  },
  
  // Lazy-loaded micro-frontend modules
  {
    path: 'cloud-services',
    canActivate: [featureGuard],
    loadChildren: () => import('projects/cloud-services/src/lib/cloud-services.routes')
      .then(m => m.CLOUD_SERVICES_ROUTES)
  },
  {
    path: 'dr',
    canActivate: [featureGuard],
    loadChildren: () => import('projects/dr/src/lib/dr.routes')
      .then(m => m.DR_ROUTES)
  },
  {
    path: 's3',
    canActivate: [featureGuard],
    loadChildren: () => import('projects/s3/src/lib/s3.routes')
      .then(m => m.S3_ROUTES)
  }
];
```

#### **Step 12: Create src/app/app.config.ts**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations()
  ]
};
```

#### **Step 13: Create src/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Enterprise Platform</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

#### **Step 8: Generate Core Services using ng generate**

```bash
# Generate Auth Service
ng generate service core/services/auth

# Generate Configuration Service
ng generate service core/services/configuration

# Generate Feature Guard
ng generate guard core/guards/feature

# Generate HasPermission Directive
ng generate directive core/directives/has-permission
```

Then implement the business logic in each generated file (see Phase 3 for code examples).

#### **Step 9: Generate Shell Components**

```bash
# Generate Header Component
ng generate component core/components/header --standalone

# Generate Sidebar Component
ng generate component core/components/sidebar --standalone

# Generate Footer Component
ng generate component core/components/footer --standalone

# Generate Dashboard Page
ng generate component pages/dashboard --standalone

# Generate Login Page
ng generate component pages/auth/login --standalone

# Generate Signup Page
ng generate component pages/auth/signup --standalone
```

---

### **Phase 4: Create Micro-Frontend Applications**

#### **Step 10: Generate Micro-Frontend Applications using ng CLI**

```bash
# Generate first micro-frontend (cloud-services)
ng generate application projects/cloud-services --routing --skip-git --package-manager=npm

# Generate second micro-frontend (dr)
ng generate application projects/dr --routing --skip-git --package-manager=npm

# Generate third micro-frontend (s3)
ng generate application projects/s3 --routing --skip-git --package-manager=npm
```

This automatically creates for each module:
- ✅ `package.json`
- ✅ `tsconfig.app.json` & `tsconfig.spec.json`
- ✅ `src/main.ts`
- ✅ `src/index.html`
- ✅ `src/app/` folder structure
- ✅ Routing files configured

#### **Step 11: Generate Components in Each Micro-Frontend**

For `cloud-services` module:

```bash
ng generate component projects/cloud-services/src/app/pages/cloud-dashboard --standalone

ng generate component projects/cloud-services/src/app/pages/compute --standalone

ng generate component projects/cloud-services/src/app/pages/kubernetes --standalone

ng generate component projects/cloud-services/src/app/pages/functions --standalone
```

For `dr` module:

```bash
ng generate component projects/dr/src/app/pages/dr-dashboard --standalone

ng generate component projects/dr/src/app/pages/dr-multizone --standalone

ng generate component projects/dr/src/app/pages/failover-history --standalone
```

For `s3` module:

```bash
ng generate component projects/s3/src/app/pages/s3-dashboard --standalone

ng generate component projects/s3/src/app/pages/s3-buckets --standalone

ng generate component projects/s3/src/app/pages/storage-classes --standalone
```

---

### **Phase 5: Configuration and Assets**

#### **Step 12: Create Global Configuration File**

**public/assets/generalconfigurations.json:**

```json
{
  "apiEndpoint": "http://localhost:3000/api",
  "modules": [
    {
      "id": "cloud-services",
      "name": "Cloud Services",
      "available": true
    },
    {
      "id": "dr",
      "name": "Disaster Recovery",
      "available": true
    },
    {
      "id": "s3",
      "name": "S3 Storage",
      "available": true
    }
  ],
  "features": {
    "sso": true,
    "mfa": false,
    "auditLogging": true
  }
}
```

#### **Step 13: Auto-Generate Feature Configuration Files**

Instead of manually writing each `features-*.json` file, use an automated script!

**Option A: Node.js Script (Recommended)**

Create `scripts/generate-features.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Define your modules and their features
const modulesConfig = {
  'cloud-services': {
    name: 'Cloud Services',
    features: [
      { id: 'compute', label: 'Compute', permission: 'cloud:compute' },
      { id: 'kubernetes', label: 'Kubernetes', permission: 'cloud:k8s' },
      { id: 'functions', label: 'Functions', permission: 'cloud:functions' }
    ]
  },
  'dr': {
    name: 'Disaster Recovery',
    features: [
      { id: 'dashboard', label: 'Dashboard', permission: 'dr:dashboard' },
      { id: 'multizone', label: 'Multi-Zone', permission: 'dr:multi-domain' },
      { id: 'history', label: 'History', permission: 'dr:history' }
    ]
  },
  's3': {
    name: 'S3 Storage',
    features: [
      { id: 'buckets', label: 'Buckets', permission: 's3:buckets' },
      { id: 'storage-classes', label: 'Storage Classes', permission: 's3:storage-classes' },
      { id: 'iam', label: 'IAM', permission: 's3:iam' },
      { id: 'versioning', label: 'Versioning', permission: 's3:versioning' },
      { id: 'lifecycle', label: 'Lifecycle Policies', permission: 's3:lifecycle' }
    ]
  }
};

// Ensure output directory exists
const outputDir = 'public/assets';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate feature files for each module
Object.entries(modulesConfig).forEach(([moduleId, config]) => {
  const featureFile = {
    serviceId: moduleId,
    serviceName: config.name,
    features: config.features
  };

  const filePath = path.join(outputDir, `features-${moduleId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(featureFile, null, 2));
  console.log(`✅ Generated: ${filePath}`);
});

console.log('\n🎉 All feature configuration files generated!');
```

Add to root `package.json`:

```json
{
  "scripts": {
    "generate:features": "node scripts/generate-features.js",
    "setup": "npm install && npm run generate:features"
  }
}
```

Run the script:

```bash
npm run generate:features
```

---

**Option B: Bash Script**

Create `scripts/generate-features.sh`:

```bash
#!/bin/bash

# Create output directory
mkdir -p public/assets

# Function to generate feature file
generate_feature_file() {
  local module_id=$1
  local service_name=$2
  local features=$3
  
  cat > "public/assets/features-${module_id}.json" << EOF
{
  "serviceId": "${module_id}",
  "serviceName": "${service_name}",
  "features": ${features}
}
EOF

  echo "✅ Generated: public/assets/features-${module_id}.json"
}

# Generate cloud-services features
generate_feature_file "cloud-services" "Cloud Services" '[
  { "id": "compute", "label": "Compute", "permission": "cloud:compute" },
  { "id": "kubernetes", "label": "Kubernetes", "permission": "cloud:k8s" },
  { "id": "functions", "label": "Functions", "permission": "cloud:functions" }
]'

# Generate dr features
generate_feature_file "dr" "Disaster Recovery" '[
  { "id": "dashboard", "label": "Dashboard", "permission": "dr:dashboard" },
  { "id": "multizone", "label": "Multi-Zone", "permission": "dr:multi-domain" },
  { "id": "history", "label": "History", "permission": "dr:history" }
]'

# Generate s3 features
generate_feature_file "s3" "S3 Storage" '[
  { "id": "buckets", "label": "Buckets", "permission": "s3:buckets" },
  { "id": "storage-classes", "label": "Storage Classes", "permission": "s3:storage-classes" },
  { "id": "iam", "label": "IAM", "permission": "s3:iam" },
  { "id": "versioning", "label": "Versioning", "permission": "s3:versioning" },
  { "id": "lifecycle", "label": "Lifecycle Policies", "permission": "s3:lifecycle" }
]'

echo ""
echo "🎉 All feature configuration files generated!"
```

Make executable and run:

```bash
chmod +x scripts/generate-features.sh
./scripts/generate-features.sh
```

---

**Option C: TypeScript/Angular Schematics (Advanced)**

For more complex automation, create an Angular schematic that generates both the structure and config files. This is useful if you have multiple modules to create frequently.

---

### **Phase 6: Styling Setup**

#### **Step 14: Setup Tailwind CSS**

```bash
npm install -D tailwindcss postcss @tailwindcss/postcss
npx tailwindcss init -p
```

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
```

**src/styles.css:**

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Global styles */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
}
```

---

### **Phase 7: Deployment Configuration**

#### **Step 15: Create Dockerfile**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=builder /app/dist ./dist
EXPOSE 4200

CMD ["http-server", "dist/enterprise-platform", "-p", "4200"]
```

#### **Step 16: Create Kubernetes Manifest**

**k8s/deployment.yaml:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: enterprise-platform
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: enterprise-platform
  template:
    metadata:
      labels:
        app: enterprise-platform
    spec:
      containers:
      - name: app
        image: enterprise-platform:latest
        imagePullPolicy: Never
        ports:
        - containerPort: 4200
          name: http
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 4200
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: enterprise-platform-service
spec:
  type: LoadBalancer
  selector:
    app: enterprise-platform
  ports:
  - port: 80
    targetPort: 4200
    protocol: TCP
```

---

### **Phase 8: Utility Scripts**

#### **Step 17: Create run-local.sh**

```bash
#!/bin/bash
set -e

echo "🚀 Starting Enterprise Platform..."
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the application
echo "🌐 Starting development server..."
npm start

# Open browser
echo "🔗 Opening browser at http://localhost:4200"
open http://localhost:4200 2>/dev/null || xdg-open http://localhost:4200 2>/dev/null || echo "Please open http://localhost:4200 in your browser"
```

#### **Step 18: Create build-all.sh**

```bash
#!/bin/bash
set -e

echo "🏗️  Building all projects..."

# Build shell
echo "📦 Building shell application..."
ng build

# Build cloud-services
echo "📦 Building cloud-services module..."
ng build --project=projects/cloud-services

# Build dr
echo "📦 Building dr module..."
ng build --project=projects/dr

# Build s3
echo "📦 Building s3 module..."
ng build --project=projects/s3

echo "✅ All projects built successfully!"
echo "📂 Output: dist/"
```

---

### **Phase 9: Documentation Files**

#### **Step 19: Create README.md**

Create comprehensive documentation explaining:
- Project overview
- Key features
- Quick start instructions
- Architecture overview
- Project structure
- Technology stack

#### **Step 20: Create QUICK_START.md**

Document:
- Installation steps
- Common commands
- Available routes
- Default test users
- Troubleshooting

#### **Step 21: Create ARCHITECTURE.md**

Include visual diagrams for:
- System architecture
- Micro-frontend loading flow
- Permission check flow
- Data flow architecture

#### **Step 22: Create FEATURE_IMPLEMENTATION_GUIDE.md**

Explain:
- How to add new features
- Permission patterns
- Best practices
- Component lazy loading with `@defer`

---

## 🎯 Summary of Key Decisions

| Decision | Approach | Why |
|----------|----------|-----|
| **Monorepo Structure** | npm workspaces | Native npm support, easy dependency management |
| **Micro-Frontend Type** | Standalone Applications | Full independent modules with routing |
| **Code Sharing** | Shared core services in shell | Prevent duplication of auth, config, UI |
| **Lazy Loading** | Angular Router + @defer | Built-in Angular features, no extra config |
| **State Management** | RxJS Observables + Signals | Modern Angular state patterns |
| **Styling** | Tailwind CSS | Utility-first, consistent design system |
| **Permission System** | Two-tier (service + feature) | Granular access control |
| **Testing** | Vitest + JSDOM | Fast, modern testing framework |
| **Deployment** | Docker + Kubernetes | Cloud-native, scalable deployment |

---

## 📋 Quick Reference: Command Sequence

Using **Official Angular CLI Commands Only** (No Custom Scripts):

```bash
# 1. Create workspace using ng new (auto-creates all config files)
ng new enterprise-platform --create-application=false --skip-git --package-manager=npm

cd enterprise-platform

# 2. Update package.json manually to add:
# "workspaces": ["projects/*"]

# 3. Install dependencies
npm install
npm install -D tailwindcss postcss

# 4. Generate shell app components using ng CLI
mkdir -p src/app/core/{services,guards,directives,components/{header,sidebar,footer}}
mkdir -p src/app/pages/auth
mkdir -p public/assets

ng generate service core/services/auth --skip-tests
ng generate service core/services/configuration --skip-tests
ng generate guard core/guards/feature --skip-tests
ng generate directive core/directives/has-permission --skip-tests

ng generate component core/components/header --standalone --skip-tests
ng generate component core/components/sidebar --standalone --skip-tests
ng generate component core/components/footer --standalone --skip-tests
ng generate component pages/dashboard --standalone --skip-tests
ng generate component pages/auth/login --standalone --skip-tests
ng generate component pages/auth/signup --standalone --skip-tests

# 5. Generate micro-frontend applications
ng generate application projects/cloud-services --routing --skip-git --package-manager=npm
ng generate application projects/dr --routing --skip-git --package-manager=npm
ng generate application projects/s3 --routing --skip-git --package-manager=npm

# 6. Generate components in each micro-frontend
ng generate component projects/cloud-services/src/app/pages/cloud-dashboard --standalone --skip-tests
ng generate component projects/cloud-services/src/app/pages/compute --standalone --skip-tests
ng generate component projects/cloud-services/src/app/pages/kubernetes --standalone --skip-tests
ng generate component projects/cloud-services/src/app/pages/functions --standalone --skip-tests

ng generate component projects/dr/src/app/pages/dr-dashboard --standalone --skip-tests
ng generate component projects/dr/src/app/pages/dr-multizone --standalone --skip-tests
ng generate component projects/dr/src/app/pages/failover-history --standalone --skip-tests

ng generate component projects/s3/src/app/pages/s3-dashboard --standalone --skip-tests
ng generate component projects/s3/src/app/pages/s3-buckets --standalone --skip-tests
ng generate component projects/s3/src/app/pages/storage-classes --standalone --skip-tests

# 7. Manually create config JSON files
# public/assets/generalconfigurations.json
# public/assets/features-cloud-services.json
# public/assets/features-dr.json
# public/assets/features-s3.json

# 8. Install Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init -p

# 9. Run development server
npm start
```

### **What Gets Auto-Generated vs Manual**

| File/Config | Auto-Generated? | How |
|---|---|---|
| **Root package.json** | ✅ Fully Auto | `ng new enterprise-platform --create-application=false` |
| **Root angular.json** | ✅ Fully Auto | `ng new` creates this |
| **Root tsconfig.json** | ✅ Fully Auto | `ng new` creates this |
| **Root tsconfig.app.json** | ✅ Fully Auto | `ng new` creates this |
| **Root tsconfig.spec.json** | ✅ Fully Auto | `ng new` creates this |
| **Core services** | ✅ Fully Auto | `ng generate service` |
| **Core guards** | ✅ Fully Auto | `ng generate guard` |
| **Core directives** | ✅ Fully Auto | `ng generate directive` |
| **Shell components** | ✅ Fully Auto | `ng generate component --standalone` |
| **Micro-frontend applications** | ✅ Fully Auto | `ng generate application` |
| **Micro-frontend components** | ✅ Fully Auto | `ng generate component --standalone` |
| **Micro-frontend package.json** | ✅ Fully Auto | `ng generate application` creates |
| **public/assets/*.json files** | ❌ Manual | Must create manually (business config) |
| **Micro-frontend package.json** | ✅ Fully Auto | `ng generate application` creates |
| **Micro-frontend tsconfig files** | ✅ Fully Auto | `ng generate application` creates |
| **Micro-frontend src/main.ts** | ✅ Fully Auto | `ng generate application` creates |
| **Micro-frontend src/index.html** | ✅ Fully Auto | `ng generate application` creates |
| **public/assets/generalconfigurations.json** | ❌ Manual | Business config file |
| **public/assets/features-*.json** | ✅ Script-Auto | Use Node.js/Bash script |
| **Core services/guards/directives** | ❌ Manual | Must write business logic |
| **Components** | ❌ Manual | Must write component code |

---

## ✅ Verification Checklist

- [ ] npm workspaces configured in root `package.json`
- [ ] All 4 applications created (1 shell + 3 micro-frontends)
- [ ] Core services implemented (auth, configuration)
- [ ] Guards and directives created
- [ ] Routes configured with lazy loading
- [ ] Feature configuration JSON files created
- [ ] Tailwind CSS setup complete
- [ ] Docker and Kubernetes manifests created
- [ ] Documentation files written
- [ ] Shell scripts created and executable
- [ ] Application runs on `http://localhost:4200`

---

This methodology ensures **scalability, maintainability, and team autonomy** while leveraging Angular's modern features!
