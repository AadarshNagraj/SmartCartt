"use client";

import React from 'react';
import { useSession } from '@/providers/AuthProvider';
import Link from 'next/link';
import { ChevronLeft, Check, Package, Truck, CreditCard } from 'lucide-react';
import styles from './page.module.css';

// Mock timeline based on Shopify fulfillment statuses
const getTimelineSteps = (status: string) => {
  return [
    { label: 'Order Placed', active: true, completed: true },
    { label: 'Paid', active: true, completed: status !== 'PENDING' },
    { label: 'Packed', active: status === 'FULFILLED' || status === 'DELIVERED', completed: status === 'FULFILLED' || status === 'DELIVERED' },
    { label: 'Shipped', active: status === 'FULFILLED' || status === 'DELIVERED', completed: status === 'DELIVERED' },
    { label: 'Delivered', active: status === 'DELIVERED', completed: status === 'DELIVERED' },
  ];
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { session } = useSession();
  const orders = session?.customer?.orders || [];
  
  // Try to find the exact order, or just mock it with the first one for the demo
  const order = orders.find(o => o.id === params.id) || orders[0];

  if (!order) return null;

  const timelineSteps = getTimelineSteps(order.fulfillmentStatus);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/account/orders" className={styles.backLink}>
          <ChevronLeft size={16} />
          Back to Orders
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Order {order.orderNumber}</h1>
          <span className={`${styles.badge} ${styles[order.fulfillmentStatus.toLowerCase()]}`}>
            {order.fulfillmentStatus.replace('_', ' ')}
          </span>
        </div>
        <p className={styles.subtitle}>Placed on {new Date(order.processedAt).toLocaleDateString()}</p>
      </div>

      <div className={styles.timelineContainer}>
        {timelineSteps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className={styles.timelineStep}>
              <div className={`${styles.timelineDot} ${step.active ? styles.activeDot : ''}`}>
                {step.completed && <Check size={12} strokeWidth={3} />}
              </div>
              <span className={`${styles.timelineLabel} ${step.active ? styles.activeLabel : ''}`}>
                {step.label}
              </span>
            </div>
            {index < timelineSteps.length - 1 && (
              <div className={`${styles.timelineLine} ${step.completed ? styles.activeLine : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <Package size={18} />
            <h2 className={styles.cardTitle}>Items</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.itemsList}>
              {order.items.map(item => (
                <div key={item.id} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemVariant}>{item.variantTitle}</span>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemQty}>Qty: {item.quantity}</span>
                    <span className={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.sideGrid}>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <CreditCard size={18} />
              <h2 className={styles.cardTitle}>Payment</h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.totalsRow}>
                <span>Subtotal</span>
                <span>${(parseFloat(order.totalPrice) - 25).toFixed(2)}</span>
              </div>
              <div className={styles.totalsRow}>
                <span>Shipping</span>
                <span>$25.00</span>
              </div>
              <div className={styles.totalsRow}>
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className={`${styles.totalsRow} ${styles.finalTotal}`}>
                <span>Total</span>
                <span>${parseFloat(order.totalPrice).toFixed(2)} {order.currency}</span>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <Truck size={18} />
              <h2 className={styles.cardTitle}>Shipping Details</h2>
            </div>
            <div className={styles.cardBody}>
              {order.shippingAddress ? (
                <div className={styles.addressBlock}>
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.address1}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}</p>
                </div>
              ) : (
                <p className={styles.textMuted}>No shipping address provided.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
