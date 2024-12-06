import { sampleUsers } from '../data/sample-data';

export class AuthService {
  private currentUser = null;

  async signIn(email: string, password: string) {
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = sampleUsers.find(u => u.email === email);
    if (user && password === 'demo') { // Simple password check for demo
      this.currentUser = user;
      return user;
    }
    throw new Error('Invalid credentials');
  }

  async signOut() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}