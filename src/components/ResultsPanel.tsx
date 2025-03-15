
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Database, Fingerprint, Lock, LockOpen } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ResultsPanelProps {
  results: {
    breachData: any[];
    userData: any;
  };
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const { breachData, userData } = results;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {breachData.length > 0 ? (
        <>
          <motion.div variants={itemVariants}>
            <Alert className="mb-6 border-red-700 bg-black/60 text-red-500">
              <LockOpen className="h-5 w-5 text-red-500" />
              <AlertTitle className="text-red-400 text-lg font-mono">SECURITY BREACH DETECTED</AlertTitle>
              <AlertDescription className="text-red-400 font-mono">
                Your email was found in {breachData.length} data breach{breachData.length !== 1 ? 'es' : ''}.
                <span className="block mt-2 text-xs opacity-80">[ Vulnerability identified in data storage system ]</span>
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-hacker font-mono">
              <Database className="h-4 w-4" />
              <span>[ BREACH DETAILS ]</span>
            </h3>
            
            <div className="space-y-2">
              {breachData.map((breach, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="breach-item"
                >
                  <Fingerprint className="h-4 w-4 text-red-500" />
                  <div className="font-mono">
                    <p className="text-sm font-medium text-hacker">@breach://{breach.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div variants={itemVariants}>
          <Alert className="mb-6 border-hacker-dark bg-black/60 text-hacker">
            <Lock className="h-5 w-5" />
            <AlertTitle className="text-hacker text-lg font-mono">SECURE STATUS</AlertTitle>
            <AlertDescription className="text-hacker-light font-mono">
              No data breaches were found associated with your email.
              <span className="block mt-2 text-xs opacity-80">[ Security protocols functioning normally ]</span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-sm font-medium mb-2 text-hacker font-mono">[ SEARCH PARAMETERS ]</h3>
        <div className="flex flex-wrap gap-2">
          {userData.email && (
            <Badge variant="outline" className="text-xs bg-black/50 text-hacker border-hacker/50 font-mono">
              email: {userData.email}
            </Badge>
          )}
          {userData.firstName && (
            <Badge variant="outline" className="text-xs bg-black/50 text-hacker border-hacker/50 font-mono">
              name: {userData.firstName} {userData.lastName}
            </Badge>
          )}
          {userData.phone && (
            <Badge variant="outline" className="text-xs bg-black/50 text-hacker border-hacker/50 font-mono">
              phone: {userData.phone}
            </Badge>
          )}
          {userData.username && (
            <Badge variant="outline" className="text-xs bg-black/50 text-hacker border-hacker/50 font-mono">
              username: {userData.username}
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
