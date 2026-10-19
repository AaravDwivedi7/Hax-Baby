import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  pageId: string;
}

export const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  children,
  pageId,
}) => {
  return (
    <motion.div
      key={pageId}
      initial={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.94, y: -16, filter: 'blur(6px)' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
};
