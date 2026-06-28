"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { SessionRepository } from '@/services/shopify/repositories/SessionRepository';
import { CartRepository } from '@/commerce/repositories';
import { cartRepository } from '@/commerce/repositories/implementations/ShopifyCartRepository';

// Create singleton instances of our repositories
const sessionRepository = new SessionRepository();

interface CommerceContextType {
  sessionRepository: SessionRepository;
  cartRepository: CartRepository;
  // productRepository: ProductRepository;
  // collectionRepository: CollectionRepository;
  // etc...
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export function CommerceProvider({ children }: { children: ReactNode }) {
  // In the future, this is where we inject the Shopify implementations
  const value = {
    sessionRepository,
    cartRepository
  };

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
}
