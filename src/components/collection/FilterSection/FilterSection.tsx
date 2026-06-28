"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterGroup } from '@/lib/constants/mockData';
import styles from './FilterSection.module.css';

interface FilterSectionProps {
  group: FilterGroup;
  defaultExpanded?: boolean;
}

export function FilterSection({ group, defaultExpanded = true }: FilterSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Get active values for this group from URL
  const activeValues = searchParams.get(group.id)?.split(',') || [];

  const handleToggle = (valueId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(group.id)?.split(',') || [];
    
    let newValues: string[];
    
    if (group.type === 'radio') {
      newValues = currentValues.includes(valueId) ? [] : [valueId];
    } else {
      // Checkbox behavior
      if (currentValues.includes(valueId)) {
        newValues = currentValues.filter(v => v !== valueId);
      } else {
        newValues = [...currentValues, valueId];
      }
    }

    if (newValues.length > 0) {
      params.set(group.id, newValues.join(','));
    } else {
      params.delete(group.id);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.section}>
      <button 
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className={styles.title}>{group.label}</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.content}
          >
            <ul className={styles.optionsList}>
              {group.options.map(option => {
                const isActive = activeValues.includes(option.label);
                
                return (
                  <li key={option.id} className={styles.optionItem}>
                    <label className={styles.label}>
                      <input 
                        type={group.type === 'radio' ? 'radio' : 'checkbox'} 
                        name={group.id}
                        checked={isActive}
                        onChange={() => handleToggle(option.label)}
                        className={styles.input}
                      />
                      <span className={styles.customInput} />
                      <span className={styles.optionLabel}>{option.label}</span>
                      {option.count !== undefined && (
                        <span className={styles.optionCount}>({option.count})</span>
                      )}
                    </label>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
