"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { 
  ProductRepository, 
  CollectionRepository, 
  CartRepository, 
  CustomerRepository,
  SearchRepository
} from '../repositories';

interface CommerceContextValue {
  products: ProductRepository;
  collections: CollectionRepository;
  cart: CartRepository;
  customer: CustomerRepository;
  search: SearchRepository;
}

const CommerceContext = createContext<CommerceContextValue | null>(null);

export interface CommerceProviderProps {
  children: ReactNode;
  repositories: CommerceContextValue;
}

/**
 * Dependency Injection container for the commerce infrastructure.
 * Wraps the application and provides access to strictly-typed repositories.
 */
export function CommerceProvider({ children, repositories }: CommerceProviderProps) {
  return (
    <CommerceContext.Provider value={repositories}>
      {children}
    </CommerceContext.Provider>
  );
}

/**
 * Hook to access commerce repositories.
 */
export function useCommerce(): CommerceContextValue {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
}
