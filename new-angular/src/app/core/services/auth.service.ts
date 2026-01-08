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
    console.log('📝 AuthService: Starting signup for', user.username);
    const users = this.getAllUsers();

    const newUser = {
      ...user,
      services: user.services.map(s => s.toLowerCase())
    };

    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
      console.log('🔄 AuthService: User already exists, updating...');
      users[index] = newUser;
    } else {
      console.log('➕ AuthService: Registering new user');
      users.push(newUser);
    }

    sessionStorage.setItem('mock_users', JSON.stringify(users));
    console.log('💾 AuthService: User saved to sessionStorage');

    const loginSuccess = this.login(newUser.username, newUser.password!);
    if (!loginSuccess) {
      console.error('❌ AuthService: Automatic login after signup failed!');
      throw new Error('Registration successful, but automatic login failed. Please try logging in manually.');
    }
  }

  login(username: string, password: string): boolean {
    console.log('🔑 AuthService: Attempting login for', username);
    const users = this.getAllUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      console.log('✅ AuthService: Login successful');
      const { password: _, ...userWithoutPassword } = user;
      sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      this.currentUserSignal.set(userWithoutPassword);
      this.router.navigate(['/']);
      return true;
    }

    console.warn('❌ AuthService: Login failed - invalid credentials');
    return false;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  private getUserFromSession(): User | null {
    try {
      const userJson = sessionStorage.getItem('currentUser');
      return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
      console.error('❌ Error parsing currentUser from sessionStorage:', e);
      return null;
    }
  }

  private getAllUsers(): User[] {
    try {
      const usersJson = sessionStorage.getItem('mock_users');
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
      console.error('❌ Error parsing mock_users from sessionStorage:', e);
      return [];
    }
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
