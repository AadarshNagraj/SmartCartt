"use client";

import { TrustBadge } from "./TrustBadge";
import { ShieldCheck, Truck, Clock, RefreshCw, BadgeCheck } from "lucide-react";

export function TrustStrip() {
  return (
    <div className="bg-background border-y border-border py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Mobile scrollable, Desktop grid */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 hide-scrollbar gap-8 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 lg:gap-6 justify-between items-center">
          <TrustBadge
            icon={<BadgeCheck className="h-5 w-5" />}
            title="10,000+ Happy Customers"
            description="Across India"
            className="min-w-[200px] md:min-w-0"
          />
          <TrustBadge
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Secure Checkout"
            description="Powered by Shopify"
            className="min-w-[200px] md:min-w-0"
          />
          <TrustBadge
            icon={<RefreshCw className="h-5 w-5" />}
            title="Easy Returns"
            description="30-day return policy"
            className="min-w-[200px] md:min-w-0"
          />
          <TrustBadge
            icon={<Truck className="h-5 w-5" />}
            title="Free Shipping"
            description="On all prepaid orders"
            className="min-w-[200px] md:min-w-0"
          />
          <TrustBadge
            icon={<Clock className="h-5 w-5" />}
            title="24/7 Support"
            description="Always here to help"
            className="min-w-[200px] md:min-w-0"
          />
        </div>
      </div>
    </div>
  );
}
