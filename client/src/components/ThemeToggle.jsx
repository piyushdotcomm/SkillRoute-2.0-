import React from 'react';
import { useTheme } from '../App.jsx';
import { motion } from 'framer-motion';

export default function ThemeToggle(){
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={()=> setTheme(theme==='light'?'dark':'light')} className="rounded-full p-2 bg-surfaceAlt border border-gray-300 dark:border-gray-600 shadow-soft">
      <motion.span initial={false} animate={{ rotate: theme==='light'?0:180 }} transition={{ type:'spring', stiffness:180, damping:12 }}>
        {theme==='light' ? '🌞' : '🌜'}
      </motion.span>
    </button>
  );
}
