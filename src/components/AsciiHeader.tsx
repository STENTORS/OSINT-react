
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
      <pre className="text-center vaporwave-glow text-gradient-pink font-mono text-xs md:text-sm lg:text-base leading-tight mx-auto max-w-full overflow-x-auto scrollbar-none">
{`
 ██████╗ ███████╗██╗███╗   ██╗████████╗
██╔═══██╗██╔════╝██║████╗  ██║╚══██╔══╝
██║   ██║███████╗██║██╔██╗ ██║   ██║   
██║   ██║╚════██║██║██║╚██╗██║   ██║   
╚██████╔╝███████║██║██║ ╚████║   ██║   
 ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝   ╚═╝   
+----------------------------------------+
| [root@vaporshell:~] ./breach_scanner   |
| > INITIALIZING SYSTEMS...               |
| > ACCESS GRANTED                        |
+----------------------------------------+
`}
      </pre>
    </motion.div>
  );
};

export default AsciiHeader;
