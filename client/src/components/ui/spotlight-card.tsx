import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
    size?: 'sm' | 'md' | 'lg';
    width?: string | number;
    height?: string | number;
    customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
    blue: { base: 220, spread: 200 },
    purple: { base: 280, spread: 300 },
    green: { base: 120, spread: 200 },
    red: { base: 0, spread: 200 },
    orange: { base: 30, spread: 200 }
};

const sizeMap = {
    sm: 'w-48 h-64',
    md: 'w-64 h-80',
    lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({
    children,
    className = '',
    glowColor = 'blue',
    size = 'md',
    width,
    height,
    customSize = false
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const syncPointer = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;

            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();
                cardRef.current.style.setProperty('--x', (x - rect.left).toFixed(2));
                cardRef.current.style.setProperty('--xp', ((x - rect.left) / rect.width).toFixed(2));
                cardRef.current.style.setProperty('--y', (y - rect.top).toFixed(2));
                cardRef.current.style.setProperty('--yp', ((y - rect.top) / rect.height).toFixed(2));
            }
        };

        // Using global pointer move to update relative to card creates better effect for multi-card grid
        // But adjusting the calculation: standard spotlight often uses page coords or client coords.
        // The provided code used window.innerWidth/Height which seems global.
        // However, usually detailed spotlight effects need local coordinates relative to the card.
        // Let's stick to the provided code logic first, but if it looks weird, we might need to adjust.
        // Actually, looking at the provided code:
        // cardRef.current.style.setProperty('--x', x.toFixed(2));
        // This sets X to clientX globally.
        // Then CSS: radial-gradient(... at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px) ...)
        // If background-attachment: fixed is used, then global coords work.
        // The provided code HAS `backgroundAttachment: 'fixed'`.
        // So global coords are correct.

        const OriginalSyncPointer = (e: PointerEvent) => {
            const { clientX: x, clientY: y } = e;

            if (cardRef.current) {
                cardRef.current.style.setProperty('--x', x.toFixed(2));
                cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
                cardRef.current.style.setProperty('--y', y.toFixed(2));
                cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
            }
        };

        document.addEventListener('pointermove', OriginalSyncPointer);
        return () => document.removeEventListener('pointermove', OriginalSyncPointer);
    }, []);

    const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue;

    // Determine sizing
    const getSizeClasses = () => {
        if (customSize) {
            return ''; // Let className or inline styles handle sizing
        }
        return sizeMap[size];
    };

    const getInlineStyles = () => {
        // Cast to any to avoid TS errors with custom properties
        const baseStyles: any = {
            '--base': base,
            '--spread': spread,
            '--radius': '16', // Slightly rounded
            '--border': '2',
            '--backdrop': 'hsl(0 0% 60% / 0.12)',
            '--backup-border': 'var(--backdrop)',
            '--size': '200',
            '--outer': '1',
            '--border-size': 'calc(var(--border, 2) * 1px)',
            '--spotlight-size': 'calc(var(--size, 150) * 1px)',
            '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
            backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.15)), transparent
      )`,
            backgroundColor: 'var(--backdrop, transparent)',
            backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
            backgroundPosition: '50% 50%',
            backgroundAttachment: 'fixed',
            border: 'var(--border-size) solid var(--backup-border)',
            position: 'relative',
            touchAction: 'none',
        };

        // Add width and height if provided
        if (width !== undefined) {
            baseStyles.width = typeof width === 'number' ? `${width}px` : width;
        }
        if (height !== undefined) {
            baseStyles.height = typeof height === 'number' ? `${height}px` : height;
        }

        return baseStyles;
    };

    // We need to inject the keyframes/styles globally or scoped. 
    // Since this is a component, injecting a style tag is a valid strategy as per provided snippet.
    const beforeAfterStyles = `
    .glow-card-container [data-glow]::before,
    .glow-card-container [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    .glow-card-container [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
      z-index: 2;
    }
    
    .glow-card-container [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
      z-index: 2;
    }
    
    /* Inner glow effect */
    .glow-card-container [data-glow] > [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
      z-index: 1;
    }
    
    /* Adjust inner glow clipping */
    .glow-card-container [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
            <div
                ref={cardRef}
                data-glow
                style={getInlineStyles()}
                className={`glow-card-container
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          flex flex-col
          shadow-lg 
          backdrop-blur-md
          bg-slate-900/40
          ${className}
        `}
            >
                <div ref={innerRef} data-glow></div>
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </div>
        </>
    );
};

export { GlowCard }
