import React from 'react';
import { BatteryMedium, Radio, AudioWaveform, VolumeX } from 'lucide-react';
import styles from './ProductHighlights.module.css';

const highlights = [
  {
    icon: BatteryMedium,
    title: '40 Hour Battery',
    description: 'Listen all week on a single charge with fast-charging support.'
  },
  {
    icon: AudioWaveform,
    title: 'Hi-Res Audio',
    description: 'Custom acoustic architecture tuned for uncompromising clarity.'
  },
  {
    icon: Radio,
    title: 'Bluetooth 5.4',
    description: 'Ultra-low latency connection with seamless multi-point pairing.'
  },
  {
    icon: VolumeX,
    title: 'Active Noise Cancellation',
    description: 'Immerse yourself completely and block out the world.'
  }
];

export function ProductHighlights() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why you&apos;ll love it</h2>
        
        <div className={styles.grid}>
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
