"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ConsentContextValue {
  hasConsent: boolean;
  grantConsent: () => void;
  revokeConsent: () => void;
}

const ConsentContext = createContext<ConsentContextValue>({
  hasConsent: false,
  grantConsent: () => {},
  revokeConsent: () => {},
});

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check localStorage for prior consent on mount
    // For now, default to true unless GDPR strict mode is enforced
    const saved = localStorage.getItem("smartcart_analytics_consent");
    if (saved !== "false") {
      setHasConsent(true);
    }
  }, []);

  const grantConsent = () => {
    setHasConsent(true);
    localStorage.setItem("smartcart_analytics_consent", "true");
  };

  const revokeConsent = () => {
    setHasConsent(false);
    localStorage.setItem("smartcart_analytics_consent", "false");
  };

  return (
    <ConsentContext.Provider value={{ hasConsent, grantConsent, revokeConsent }}>
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => useContext(ConsentContext);
