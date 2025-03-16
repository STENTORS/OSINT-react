
import React from 'react';
import { motion } from 'framer-motion';

const AsciiHeader = () => {
  return (
    <motion.div 
      className="mb-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <pre className="text-center text-primary font-mono text-xs md:text-sm lg:text-base leading-tight mx-auto max-w-full overflow-x-auto scrollbar-none">
{`
  _______  _________ _       _________
 /  ___  \\\\  _____  \\\\  \\    /  /  ___  \\\\
/  /   \\  \\\\  \\   \\  \\\\  \\  /  /  /   \\  \\\\
\\  \\    |  \\  |   |  \\  \\/  /\\  \\    |  |
 \\  \\___/  /  |___/  /\\    /  \\  \\___/  /
  \\_______/ \\_______/  \\__/    \\_______/
`}
      </pre>
    </motion.div>
  );
};

export default AsciiHeader;
