'use client';

export default function GradientBorder({ children, className = '' }) {
    return (
        <div className={`gradient-border ${className}`}>
            <div className="bg-bg-surface">{children}</div>
        </div>
    );
}
