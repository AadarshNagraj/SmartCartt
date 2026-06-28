"use client";

import React from 'react';
import { useSession } from '@/providers/AuthProvider';
import Link from 'next/link';
import { MapPin, Package, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function AccountOverviewPage() {
  const { session } = useSession();
  const customer = session?.customer;

  if (!customer) return null;

  // For overview, we just mock some recent data based on the model
  const recentOrders = customer.orders?.slice(0, 2) || [];
  const defaultAddress = customer.addresses?.find(a => a.isDefault) || customer.addresses?.[0];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Account Overview</h1>
        <p className={styles.subtitle}>Manage your profile, orders, and preferences.</p>
      </div>

      <div className={styles.grid}>
        {/* Profile Snapshot */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Profile</h2>
            <Link href="/account/profile" className={styles.editLink}>Edit</Link>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.infoText}><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
            <p className={styles.infoText}><strong>Email:</strong> {customer.email}</p>
            <p className={styles.infoText}><strong>Phone:</strong> {customer.phone || 'Not provided'}</p>
          </div>
        </section>

        {/* Default Address */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Default Address</h2>
            <Link href="/account/addresses" className={styles.editLink}>Manage</Link>
          </div>
          <div className={styles.cardBody}>
            {defaultAddress ? (
              <div className={styles.addressBlock}>
                <div className={styles.addressLabelWrapper}>
                  <MapPin size={16} />
                  <span className={styles.addressLabel}>{defaultAddress.label || 'Home'}</span>
                </div>
                <p className={styles.infoText}>{defaultAddress.address1}</p>
                {defaultAddress.address2 && <p className={styles.infoText}>{defaultAddress.address2}</p>}
                <p className={styles.infoText}>
                  {defaultAddress.city}, {defaultAddress.province} {defaultAddress.zip}
                </p>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.infoText}>No default address set.</p>
                <Link href="/account/addresses" className={styles.actionBtn}>Add Address</Link>
              </div>
            )}
          </div>
        </section>

        {/* Recent Orders */}
        <section className={`${styles.card} ${styles.fullWidth}`}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Orders</h2>
            <Link href="/account/orders" className={styles.editLink}>View All</Link>
          </div>
          <div className={styles.cardBody}>
            {recentOrders.length > 0 ? (
              <div className={styles.orderList}>
                {recentOrders.map(order => (
                  <div key={order.id} className={styles.orderRow}>
                    <div className={styles.orderMeta}>
                      <span className={styles.orderNumber}>{order.orderNumber}</span>
                      <span className={styles.orderDate}>
                        {new Date(order.processedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={styles.orderStatus}>
                      <span className={`${styles.badge} ${styles[order.fulfillmentStatus.toLowerCase()]}`}>
                        {order.fulfillmentStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className={styles.orderTotal}>
                      ${parseFloat(order.totalPrice).toFixed(2)}
                    </div>
                    <Link href={`/account/orders/${order.id}`} className={styles.iconLink}>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <Package size={24} className={styles.emptyIcon} />
                <p className={styles.infoText}>You haven't placed any orders yet.</p>
                <Link href="/collections/all" className={styles.actionBtn}>Start Shopping</Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
