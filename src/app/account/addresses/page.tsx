"use client";

import React, { useState } from 'react';
import { useSession } from '@/providers/AuthProvider';
import { Plus, MapPin, Briefcase, Compass, MoreVertical } from 'lucide-react';
import { AddressModel } from '@/models/customer';
import styles from './page.module.css';

const getLabelIcon = (label: string | undefined) => {
  switch (label) {
    case 'Home': return <MapPin size={18} />;
    case 'Office': return <Briefcase size={18} />;
    default: return <Compass size={18} />;
  }
};

export default function AddressesPage() {
  const { session } = useSession();
  const customer = session?.customer;
  const [addresses, setAddresses] = useState<AddressModel[]>(customer?.addresses || []);

  // Ensure there's a fallback if mock data has no addresses
  const mockAddresses = addresses.length > 0 ? addresses : [
    {
      id: '1',
      firstName: 'Jane',
      lastName: 'Doe',
      address1: '123 SmartCart Ave',
      city: 'San Francisco',
      province: 'CA',
      country: 'USA',
      zip: '94107',
      isDefault: true,
      label: 'Home' as const
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Doe',
      address1: 'Market St. Suite 400',
      city: 'San Francisco',
      province: 'CA',
      country: 'USA',
      zip: '94104',
      isDefault: false,
      label: 'Office' as const
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Address Book</h1>
          <p className={styles.subtitle}>Manage your shipping and billing addresses.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className={styles.grid}>
        {mockAddresses.map(address => (
          <div key={address.id} className={`${styles.card} ${address.isDefault ? styles.defaultCard : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.labelWrapper}>
                {getLabelIcon(address.label)}
                <span className={styles.labelText}>{address.label || 'Other'}</span>
                {address.isDefault && <span className={styles.defaultBadge}>Default</span>}
              </div>
              <button className={styles.menuBtn}>
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className={styles.cardBody}>
              <p className={styles.name}>{address.firstName} {address.lastName}</p>
              <p className={styles.line}>{address.address1}</p>
              {address.address2 && <p className={styles.line}>{address.address2}</p>}
              <p className={styles.line}>{address.city}, {address.province} {address.zip}</p>
              <p className={styles.line}>{address.country}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <button className={styles.textBtn}>Edit</button>
              <button className={`${styles.textBtn} ${styles.dangerText}`}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
