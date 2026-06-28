"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package } from 'lucide-react';
import { useSession } from '@/providers/AuthProvider';
import { OrderModel } from '@/models/customer';
import styles from './page.module.css';

function ExpandableOrderCard({ order }: { order: OrderModel }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.orderCard}>
      <div 
        className={styles.orderHeader} 
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
      >
        <div className={styles.orderMeta}>
          <span className={styles.orderNumber}>{order.orderNumber}</span>
          <span className={styles.orderDate}>
            Placed on {new Date(order.processedAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className={styles.orderStatusContainer}>
          <span className={`${styles.badge} ${styles[order.fulfillmentStatus.toLowerCase()]}`}>
            {order.fulfillmentStatus.replace('_', ' ')}
          </span>
        </div>

        <div className={styles.orderTotal}>
          ${parseFloat(order.totalPrice).toFixed(2)}
        </div>

        <div className={styles.expandIcon}>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.orderExpandedContent}
          >
            <div className={styles.orderItems}>
              {order.items.map(item => (
                <div key={item.id} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemVariant}>Qty: {item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.orderFooter}>
              <Link href={`/account/orders/${order.id}`} className={styles.detailsBtn}>
                View Order Details
              </Link>
              <button className={styles.invoiceBtn}>Download Invoice</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OrdersPage() {
  const { session } = useSession();
  const orders = session?.customer?.orders || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Order History</h1>
        <p className={styles.subtitle}>View and track all your recent purchases.</p>
      </div>

      {orders.length > 0 ? (
        <div className={styles.orderList}>
          {orders.map(order => (
            <ExpandableOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <Package size={32} />
          </div>
          <h2 className={styles.emptyTitle}>No orders yet</h2>
          <p className={styles.emptySubtitle}>When you place orders, they will appear here.</p>
          <Link href="/collections/all" className={styles.primaryBtn}>
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
