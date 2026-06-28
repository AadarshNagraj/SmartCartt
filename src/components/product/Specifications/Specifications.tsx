import React from 'react';
import styles from './Specifications.module.css';

const specs = [
  { label: 'Battery', value: '40 Hours' },
  { label: 'Connectivity', value: 'Bluetooth 5.4' },
  { label: 'Weight', value: '280g' },
  { label: 'Drivers', value: '40mm Custom' },
  { label: 'Charging', value: 'USB-C (Fast Charge)' },
  { label: 'Water Resistance', value: 'IPX4' },
];

export function Specifications() {
  return (
    <section className={styles.section} id="specifications">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Specifications</h2>
        </div>
        
        <div className={styles.grid}>
          {specs.map((spec, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.label}>{spec.label}</span>
              <span className={styles.value}>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
