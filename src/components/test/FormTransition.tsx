import React from 'react';
import { motion } from 'framer-motion';

interface FormTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export default function FormTransition({ children, delay = 0 }: FormTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
