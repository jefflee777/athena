'use client';

import { motion } from 'framer-motion';

export default function SkeuPanel({ children, className = '', animate = true, ...props }) {
    const Component = animate ? motion.div : 'div';
    const animateProps = animate
        ? {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: 'easeOut' },
        }
        : {};

    return (
        <Component className={`skeu-panel ${className}`} {...animateProps} {...props}>
            <div className="skeu-panel-inner">{children}</div>
        </Component>
    );
}
