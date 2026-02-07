import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', variants, delay = 0, ...props }) => {
    const defaultVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            variants={variants || defaultVariants}
            initial={variants ? undefined : "hidden"}
            whileInView={variants ? undefined : "visible"}
            viewport={variants ? undefined : { once: true, margin: "-50px" }}
            whileHover={{ y: -8, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className={`card relative overflow-hidden bg-card text-card-foreground border border-border/50 ${className}`}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {children}
        </motion.div>
    );
};

export default AnimatedCard;
