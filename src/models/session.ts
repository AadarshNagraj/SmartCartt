import { CustomerModel } from './customer';

export type SessionStatus = 'authenticated' | 'guest' | 'expired' | 'refreshing';

export interface SessionModel {
  status: SessionStatus;
  token?: string;
  expiresAt?: string;
  customer?: CustomerModel;
}
