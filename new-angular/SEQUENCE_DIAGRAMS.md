# Sequence Diagrams - Angular Micro-Frontend Platform

This document contains Mermaid sequence diagrams illustrating the key flows in the application.

---

## 1. Application Startup Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Main
    participant AppInit
    participant ConfigService
    participant API
    participant Router
    participant App

    User->>Browser: Navigate to app
    Browser->>Main: Load main.ts
    Main->>AppInit: Bootstrap application
    AppInit->>ConfigService: APP_INITIALIZER
    ConfigService->>API: GET /generalconfigurations.json
    API-->>ConfigService: { activeServices: [...] }
    ConfigService->>ConfigService: Set allowedFeatures signal
    ConfigService-->>AppInit: Configuration loaded
    AppInit->>App: Render shell component
    App->>Router: Initialize routes
    Router-->>App: Routes ready
    App->>Browser: Display app shell
    Browser-->>User: Show login page
```

---

## 2. User Login Flow

```mermaid
sequenceDiagram
    participant User
    participant LoginPage
    participant AuthService
    participant SessionStorage
    participant Router
    participant App

    User->>LoginPage: Enter credentials
    LoginPage->>AuthService: login(username, password)
    AuthService->>AuthService: Validate credentials
    AuthService->>AuthService: Find user in MOCK_USERS
    AuthService->>SessionStorage: Store user data
    AuthService->>AuthService: Set currentUserSignal()
    AuthService-->>LoginPage: Login successful
    LoginPage->>Router: navigate(['/'])
    Router->>App: NavigationEnd event
    App->>App: Update sidebar based on user
    App-->>User: Show dashboard
```

---

## 3. Module Loading with @defer Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Router
    participant FeatureGuard
    participant AuthService
    participant ConfigService
    participant DRModule
    participant CDN

    User->>Browser: Navigate to /dr
    Browser->>Router: Route change
    Router->>FeatureGuard: canMatch(['dr'])
    FeatureGuard->>AuthService: isAuthenticated()
    AuthService-->>FeatureGuard: true
    FeatureGuard->>ConfigService: isServiceEnabled('dr')
    ConfigService-->>FeatureGuard: true
    FeatureGuard->>AuthService: isServiceEnabled('dr')
    AuthService-->>FeatureGuard: true
    FeatureGuard-->>Router: Allow navigation
    Router->>CDN: Load DR module chunk
    CDN-->>Router: dr.module.js
    Router->>DRModule: Initialize module
    DRModule-->>Browser: Render DR Dashboard
    Browser-->>User: Display DR page
```

---

## 4. Component Lazy Loading with @defer (Permission-Based)

```mermaid
sequenceDiagram
    participant User
    participant DRDashboard
    participant Template
    participant AuthService
    participant Angular
    participant CDN
    participant DRMultizone

    User->>DRDashboard: Page loads
    DRDashboard->>Template: Evaluate @defer block
    Template->>AuthService: hasPermission('dr:multi-domain')
    AuthService->>AuthService: Check currentUserSignal().permissions
    
    alt User has permission
        AuthService-->>Template: true
        Template->>Angular: Trigger lazy load
        Angular->>CDN: Request chunk-X7FXEDFE.js
        CDN-->>Angular: DRMultizoneComponent chunk
        Angular->>DRMultizone: Instantiate component
        DRMultizone-->>DRDashboard: Render multizone UI
        DRDashboard-->>User: Show multizone section
    else User lacks permission
        AuthService-->>Template: false
        Template-->>DRDashboard: Skip loading
        DRDashboard-->>User: Multizone section hidden
    end
```

---

## 5. Viewport-Based Lazy Loading Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant DRDashboard
    participant IntersectionObserver
    participant Angular
    participant CDN
    participant DRJobList

    User->>Browser: Loads DR Dashboard
    Browser->>DRDashboard: Render page
    DRDashboard->>DRDashboard: Show @placeholder (skeleton)
    DRDashboard->>IntersectionObserver: Register viewport trigger
    DRDashboard-->>User: Show page with skeleton
    
    User->>Browser: Scrolls down
    Browser->>IntersectionObserver: Job list enters viewport
    IntersectionObserver->>Angular: Trigger @defer
    Angular->>CDN: Request chunk-ANPFYPJT.js
    CDN-->>Angular: DRJobListComponent chunk
    Angular->>DRJobList: Instantiate component
    DRJobList->>DRJobList: Render job table
    DRJobList-->>DRDashboard: Replace placeholder
    DRDashboard-->>User: Show actual job list
```

---

## 6. Permission Check Flow (Directive)

```mermaid
sequenceDiagram
    participant Template
    participant HasPermissionDirective
    participant AuthService
    participant ViewContainer
    participant DOM

    Template->>HasPermissionDirective: *appHasPermission="'dr:multi-domain'"
    HasPermissionDirective->>HasPermissionDirective: ngOnInit()
    HasPermissionDirective->>AuthService: Inject service
    HasPermissionDirective->>HasPermissionDirective: effect(() => {...})
    
    loop Reactive check
        HasPermissionDirective->>AuthService: hasPermission('dr:multi-domain')
        AuthService->>AuthService: Check currentUserSignal()
        
        alt User has permission
            AuthService-->>HasPermissionDirective: true
            HasPermissionDirective->>ViewContainer: createEmbeddedView()
            ViewContainer->>DOM: Insert element
            DOM-->>Template: Element visible
        else User lacks permission
            AuthService-->>HasPermissionDirective: false
            HasPermissionDirective->>ViewContainer: clear()
            ViewContainer->>DOM: Remove element
            DOM-->>Template: Element hidden
        end
    end
```

---

## 7. Dynamic Sidebar Update Flow

```mermaid
sequenceDiagram
    participant User
    participant Router
    participant App
    participant ConfigService
    participant Sidebar
    participant AuthService

    User->>Router: Navigate to /s3
    Router->>Router: NavigationEnd event
    Router->>App: Event subscription fires
    App->>App: Extract route.data['sidebar']
    App->>App: sidebarKey = 's3'
    App->>ConfigService: loadModuleFeatures('s3')
    ConfigService->>ConfigService: GET /features-s3.json
    ConfigService->>ConfigService: Update allowedFeatures signal
    ConfigService-->>App: Features loaded
    App->>App: currentSidebarGroups.set(NAV_CONFIGS['s3'])
    App->>Sidebar: Pass sidebar groups
    
    loop For each nav item
        Sidebar->>ConfigService: isServiceEnabled(item.permission)
        ConfigService-->>Sidebar: true/false
        Sidebar->>AuthService: hasPermission(item.permission)
        AuthService-->>Sidebar: true/false
        
        alt Both checks pass
            Sidebar->>Sidebar: Show nav item
        else Any check fails
            Sidebar->>Sidebar: Hide nav item
        end
    end
    
    Sidebar-->>User: Display filtered navigation
```

---

## 8. Feature Guard Route Protection Flow

```mermaid
sequenceDiagram
    participant User
    participant Router
    participant FeatureGuard
    participant AuthService
    participant ConfigService
    participant API

    User->>Router: Navigate to /s3/storage-classes
    Router->>FeatureGuard: canMatch(['s3:storage-classes'])
    
    FeatureGuard->>AuthService: isAuthenticated()
    alt Not authenticated
        AuthService-->>FeatureGuard: false
        FeatureGuard->>Router: createUrlTree(['/login'])
        Router-->>User: Redirect to login
    else Authenticated
        AuthService-->>FeatureGuard: true
        FeatureGuard->>FeatureGuard: Parse 's3:storage-classes'
        FeatureGuard->>FeatureGuard: moduleName = 's3'
        FeatureGuard->>ConfigService: loadModuleFeatures('s3')
        ConfigService->>API: GET /features-s3.json
        API-->>ConfigService: { enabledFeatures: [...] }
        ConfigService-->>FeatureGuard: Features loaded
        
        FeatureGuard->>ConfigService: isServiceEnabled('s3:storage-classes')
        ConfigService-->>FeatureGuard: true/false
        FeatureGuard->>AuthService: isServiceEnabled('s3:storage-classes')
        AuthService-->>FeatureGuard: true/false
        
        alt Both enabled
            FeatureGuard-->>Router: true (allow navigation)
            Router-->>User: Load page
        else Not enabled
            FeatureGuard->>Router: createUrlTree(['/'])
            Router-->>User: Redirect to home
        end
    end
```

---

## 9. @defer Loading States Flow

```mermaid
sequenceDiagram
    participant User
    participant Template
    participant Angular
    participant CDN
    participant Component

    User->>Template: Page loads
    Template->>Template: Evaluate @defer condition
    
    alt Condition is true
        Template->>Angular: Show @loading block
        Angular-->>User: Display skeleton UI
        Note over Angular: minimum 1s; after 100ms
        
        Angular->>CDN: Request component chunk
        
        alt Successful load
            CDN-->>Angular: Component code
            Angular->>Component: Instantiate
            Component-->>Angular: Rendered
            Angular->>Template: Replace @loading with component
            Template-->>User: Show actual component
        else Load fails
            CDN-->>Angular: Error
            Angular->>Template: Show @error block
            Template-->>User: Display error message
        end
    else Condition is false
        Template->>Template: Show @placeholder block
        Template-->>User: Display placeholder UI
        Note over Template: minimum 500ms
    end
```

---

## 10. Configuration Loading Flow

```mermaid
sequenceDiagram
    participant AppInit
    participant ConfigService
    participant HttpClient
    participant API
    participant Signal

    AppInit->>ConfigService: loadGeneralConfig()
    ConfigService->>HttpClient: GET /generalconfigurations.json
    HttpClient->>API: HTTP Request
    API-->>HttpClient: Response
    HttpClient-->>ConfigService: { activeServices: [...] }
    ConfigService->>ConfigService: baseServices = response.activeServices
    ConfigService->>Signal: allowedFeatures.set(baseServices)
    ConfigService-->>AppInit: Promise resolved
    
    Note over ConfigService: Later, when module loads
    
    ConfigService->>ConfigService: loadModuleFeatures('s3')
    ConfigService->>HttpClient: GET /features-s3.json
    HttpClient->>API: HTTP Request
    API-->>HttpClient: Response
    HttpClient-->>ConfigService: { enabledFeatures: [...] }
    ConfigService->>ConfigService: Merge with baseServices
    ConfigService->>Signal: allowedFeatures.update([...base, ...module])
    ConfigService-->>ConfigService: Promise resolved
```

---

## 11. Signal-Based Reactivity Flow

```mermaid
sequenceDiagram
    participant User
    participant AuthService
    participant Signal
    participant Component
    participant Effect
    participant DOM

    User->>AuthService: Login successful
    AuthService->>Signal: currentUserSignal.set(userData)
    Signal->>Signal: Notify all subscribers
    
    par Reactive updates
        Signal->>Component: Template re-evaluates
        Component->>Component: Check @if conditions
        Component->>DOM: Update UI
        DOM-->>User: Show/hide elements
    and
        Signal->>Effect: Trigger effect()
        Effect->>Effect: Run effect callback
        Effect->>Component: Update view state
        Component->>DOM: Render changes
        DOM-->>User: Display updates
    end
```

---

## 12. Complete User Journey Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant App
    participant Auth
    participant Config
    participant Router
    participant Guard
    participant Module
    participant Component

    User->>Browser: Open application
    Browser->>App: Load shell
    App->>Config: Load general config
    Config-->>App: Active services loaded
    App-->>User: Show login page
    
    User->>Auth: Submit credentials
    Auth->>Auth: Validate & store user
    Auth-->>User: Login successful
    
    User->>Router: Click "DR" in sidebar
    Router->>Guard: Check access
    Guard->>Auth: Verify authentication
    Guard->>Config: Verify service enabled
    Guard-->>Router: Access granted
    
    Router->>Module: Lazy load DR module
    Module-->>Router: Module loaded
    Router->>Component: Render DRDashboard
    
    Component->>Component: Evaluate @defer blocks
    
    par Conditional loading
        Component->>Auth: Check 'dr:multi-domain' permission
        alt Has permission
            Component->>Browser: Load multizone chunk
            Browser-->>Component: Chunk loaded
            Component-->>User: Show multizone UI
        else No permission
            Component-->>User: Hide multizone section
        end
    and
        Component->>Component: Wait for viewport
        User->>Browser: Scroll down
        Browser->>Component: Job list in viewport
        Component->>Browser: Load job list chunk
        Browser-->>Component: Chunk loaded
        Component-->>User: Show job list
    end
```

---

## Usage Instructions

### Viewing Diagrams

1. **GitHub/GitLab**: These platforms render Mermaid diagrams automatically.
2. **VS Code**: Install the "Markdown Preview Mermaid Support" extension.
3. **Online**: Use [Mermaid Live Editor](https://mermaid.live/).
4. **Documentation Sites**: Most support Mermaid (Docusaurus, VitePress, etc.).

### Customizing Diagrams

You can modify these diagrams by:
- Adding new participants
- Changing flow logic
- Adding notes with `Note over Participant: Text`
- Using `alt/else/end` for conditional flows
- Using `par/and/end` for parallel flows
- Using `loop/end` for iterations

---

**Last Updated:** December 24, 2025  
**Version:** 1.0.0
