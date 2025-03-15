
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Database, Fingerprint, Lock, LockOpen, Calendar, Users, FileText, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            <Alert className="mb-6 border-hacker-dark bg-black/60 text-hacker">
              <LockOpen className="h-5 w-5 text-hacker" />
              <AlertTitle className="text-hacker text-lg font-mono">█▓▒░ SECURITY BREACH DETECTED ░▒▓█</AlertTitle>
              <AlertDescription className="text-hacker-light font-mono">
                Your email was found in {breachData.length} data breach{breachData.length !== 1 ? 'es' : ''}.
                <span className="block mt-2 text-xs opacity-80">[ Vulnerability identified in {breachData.length} connected system{breachData.length !== 1 ? 's' : ''} ]</span>
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5 text-hacker font-mono">
              <Database className="h-4 w-4" />
              <span>[ BREACH DETAILS ]</span>
            </h3>
            
            <Table>
              <TableHeader>
                <TableRow className="border-hacker-dark/30">
                  <TableHead className="text-hacker-light font-mono">Service</TableHead>
                  <TableHead className="text-hacker-light font-mono">Date</TableHead>
                  <TableHead className="text-hacker-light font-mono">Compromised Data</TableHead>
                  <TableHead className="text-hacker-light font-mono hidden md:table-cell">Affected Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breachData.map((breach, index) => (
                  <TableRow key={index} className="border-hacker-dark/30">
                    <TableCell className="font-mono text-hacker">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-hacker" />
                        <span>{breach.title}</span>
                        {breach.domain && <span className="text-xs text-hacker-dark">({breach.domain})</span>}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-hacker-light">
                      {breach.breachDate ? breach.breachDate : 'Unknown'}
                    </TableCell>
                    <TableCell className="font-mono">
                      <div className="flex flex-wrap gap-1">
                        {breach.dataClasses ? 
                          breach.dataClasses.slice(0, 3).map((dataClass: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs text-hacker border-hacker-dark/30 bg-black/30">
                              {dataClass}
                            </Badge>
                          ))
                          : 
                          <Badge variant="outline" className="text-xs text-hacker border-hacker-dark/30 bg-black/30">
                            Unknown
                          </Badge>
                        }
                        {breach.dataClasses && breach.dataClasses.length > 3 && (
                          <Badge variant="outline" className="text-xs text-hacker-dark border-hacker-dark/30 bg-black/30">
                            +{breach.dataClasses.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-hacker-light hidden md:table-cell">
                      {breach.pwnCount ? 
                        new Intl.NumberFormat().format(breach.pwnCount) : 
                        'Unknown'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 font-mono text-xs text-hacker-dark border border-hacker-dark/30 p-3 rounded bg-black/30">
              <details>
                <summary className="cursor-pointer text-hacker-light hover:text-hacker flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Detailed breach information</span>
                </summary>
                <div className="pt-3 space-y-3">
                  {breachData.map((breach, index) => (
                    <div key={index} className="border-t border-hacker-dark/30 pt-3">
                      <h4 className="text-hacker font-medium mb-1">{breach.title}</h4>
                      <p className="text-hacker-light">{breach.description || 'No detailed information available.'}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </>
      ) : (
        <motion.div variants={itemVariants}>
          <Alert className="mb-6 border-hacker-dark bg-black/60 text-hacker">
            <Lock className="h-5 w-5" />
            <AlertTitle className="text-hacker text-lg font-mono">█▓▒░ SECURE STATUS ░▒▓█</AlertTitle>
            <AlertDescription className="text-hacker-light font-mono">
              No data breaches were found associated with your email.
              <span className="block mt-2 text-xs opacity-80">[ Security protocols functioning normally ]</span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-hacker font-mono">
          <Code className="h-4 w-4" />
          <span>[ SEARCH PARAMETERS ]</span>
        </h3>
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
