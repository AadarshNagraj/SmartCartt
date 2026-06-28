import React from 'react';
import { X } from 'lucide-react';
import styles from './FilterChip.module.css';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <button className={styles.chip} onClick={onRemove} aria-label={`Remove filter ${label}`}>
      <span>{label}</span>
      <X size={14} className={styles.icon} />
    </button>
  );
}
