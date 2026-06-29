import { SessionModel } from '@/models/session';
import { CustomerModel } from '@/models/customer';

// In a real implementation, this would handle OAuth/Storefront API tokens
export class SessionRepository {
  private STORAGE_KEY = 'smartcart_session';

  async getSession(): Promise<SessionModel> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const session = JSON.parse(stored) as SessionModel;
        
        // Mock token expiration check
        if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
          this.clearSession();
          return { status: 'expired' };
        }
        
        return session;
      }
    } catch (_e) {
      console.warn("Failed to parse session from storage");
    }
    
    return { status: 'guest' };
  }

  async login(email: string, _password?: string): Promise<SessionModel> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock customer data
    const mockCustomer: CustomerModel = {
      id: "gid://shopify/Customer/123",
      firstName: "Jane",
      lastName: "Doe",
      email: email,
      phone: "+1 555-0198",
      addresses: [],
      orders: []
    };

    const session: SessionModel = {
      status: 'authenticated',
      token: "mock_jwt_token_123",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      customer: mockCustomer
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
    this.clearSession();
  }

  private clearSession() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (_e) {}
  }
}
