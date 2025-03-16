
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Database, Fingerprint } from 'lucide-react';
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
            <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-amber-800">Security Alert</AlertTitle>
              <AlertDescription className="text-amber-700">
                Your email was found in {breachData.length} data breach{breachData.length !== 1 ? 'es' : ''}.
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Database className="h-4 w-4" />
              <span>Breach Details</span>
            </h3>
            
            <div className="space-y-2">
              {breachData.map((breach, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="breach-item"
                >
                  <Fingerprint className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">{breach.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div variants={itemVariants}>
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <Shield className="h-4 w-4" />
            <AlertTitle className="text-green-800">Secure Status</AlertTitle>
            <AlertDescription className="text-green-700">
              No data breaches were found associated with your email.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-sm font-medium mb-2">Search Parameters</h3>
        <div className="flex flex-wrap gap-2">
          {userData.email && (
            <Badge variant="outline" className="text-xs">
              Email: {userData.email}
            </Badge>
          )}
          {userData.firstName && (
            <Badge variant="outline" className="text-xs">
              Name: {userData.firstName} {userData.lastName}
            </Badge>
          )}
          {userData.phone && (
            <Badge variant="outline" className="text-xs">
              Phone: {userData.phone}
            </Badge>
          )}
          {userData.username && (
            <Badge variant="outline" className="text-xs">
              Username: {userData.username}
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
