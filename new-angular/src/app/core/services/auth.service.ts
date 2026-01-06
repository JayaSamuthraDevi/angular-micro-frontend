import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  username: string;
  password?: string;
  services: string[];
  permissions?: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  // State
  private currentUserSignal = signal<User | null>(this.getUserFromSession());

  // Selectors
  currentUser = computed(() => this.currentUserSignal());
  isAuthenticated = computed(() => !!this.currentUserSignal());
  userServices = computed(() => this.currentUserSignal()?.services || []);

  constructor() {
    // Check session on init
    const user = this.getUserFromSession();
    if (user) {
      this.currentUserSignal.set(user);
    }
  }

  signup(user: User) {
    const users = this.getAllUsers();
    // In a real app we'd error on duplicate, but for the mock we'll replace
    const index = users.findIndex(u => u.username === user.username);

    const newUser = {
      ...user,
      services: user.services.map(s => s.toLowerCase())
    };

    if (index !== -1) {
      users[index] = newUser;
    } else {
      users.push(newUser);
    }

    sessionStorage.setItem('mock_users', JSON.stringify(users));
    console.log('📝 User Registered:', newUser);
    this.login(newUser.username, newUser.password!);
  }

  login(username: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      this.currentUserSignal.set(userWithoutPassword);
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  private getUserFromSession(): User | null {
    const userJson = sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  private getAllUsers(): User[] {
    const usersJson = sessionStorage.getItem('mock_users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  isServiceEnabled(service: string): boolean {
    const s = service.toLowerCase();
    return this.userServices().includes(s) ||
      (this.currentUserSignal()?.permissions || []).includes(s);
  }

  hasPermission(perm: string): boolean {
    return this.currentUserSignal()?.permissions?.includes(perm) || false;
  }
}
