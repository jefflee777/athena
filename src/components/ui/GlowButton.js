'use client';

import { motion } from 'framer-motion';

export default function GlowButton({ children, onClick, disabled, variant = 'primary', className = '', ...props }) {
    const variants = {
        primary: {
            background: 'linear-gradient(135deg, #5C7CFF, #4A66D9)',
            shadow: '0 4px 12px rgba(92,124,255,0.3)',
            hoverShadow: '0 6px 20px rgba(92,124,255,0.45)',
        },
        neon: {
            background: 'linear-gradient(135deg, #00E0FF, #00B8D4)',
            shadow: '0 4px 12px rgba(0,224,255,0.3)',
            hoverShadow: '0 6px 20px rgba(0,224,255,0.45)',
        },
        ghost: {
            background: 'rgba(92,124,255,0.08)',
            shadow: 'none',
            hoverShadow: '0 4px 12px rgba(92,124,255,0.15)',
        },
    };

    const v = variants[variant];

    return (
        <motion.button
            whileHover={!disabled ? { y: -1 } : {}}
            whileTap={!disabled ? { y: 1, scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={`
        relative px-6 py-3 rounded-xl text-sm font-semibold
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'ghost' ? 'text-accent-primary border border-accent-primary/20' : 'text-white'}
        ${className}
      `}
            style={{
                background: v.background,
                boxShadow: disabled ? 'none' : v.shadow,
            }}
            onMouseEnter={(e) => {
                if (!disabled) e.currentTarget.style.boxShadow = v.hoverShadow;
            }}
            onMouseLeave={(e) => {
                if (!disabled) e.currentTarget.style.boxShadow = v.shadow;
            }}
            {...props}
        >
            {children}
        </motion.button>
    );
}
