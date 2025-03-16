
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
  
  // Different colors for rows
  const getRowColor = (index: number) => {
    const colors = [
      'text-neon-pink',
      'text-neon-teal',
      'text-neon-purple',
      'text-neon-blue',
      'text-neon-green'
    ];
    return colors[index % colors.length];
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
            <Alert className="mb-6 border-neon-orange/30 bg-terminal-dark text-neon-orange">
              <LockOpen className="h-5 w-5 text-neon-orange" />
              <AlertTitle className="text-neon-orange text-lg font-mono">█▓▒░ SECURITY BREACH DETECTED ░▒▓█</AlertTitle>
              <AlertDescription className="text-neon-orange/80 font-mono">
                Your email was found in {breachData.length} data breach{breachData.length !== 1 ? 'es' : ''}.
                <span className="block mt-2 text-xs opacity-80">[ Vulnerability identified in {breachData.length} connected system{breachData.length !== 1 ? 's' : ''} ]</span>
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5 text-neon-purple font-mono">
              <Database className="h-4 w-4" />
              <span>[ BREACH DETAILS ]</span>
            </h3>
            
            <Table>
              <TableHeader>
                <TableRow className="border-neon-purple/30">
                  <TableHead className="text-neon-pink font-mono">Service</TableHead>
                  <TableHead className="text-neon-teal font-mono">Date</TableHead>
                  <TableHead className="text-neon-purple font-mono">Compromised Data</TableHead>
                  <TableHead className="text-neon-blue font-mono hidden md:table-cell">Affected Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breachData.map((breach, index) => (
                  <TableRow key={index} className="border-neon-purple/20">
                    <TableCell className={`font-mono ${getRowColor(index)}`}>
                      <div className="flex items-center gap-2">
                        <Fingerprint className={`h-4 w-4 ${getRowColor(index)}`} />
                        <span>{breach.title}</span>
                        {breach.domain && <span className="text-xs text-neon-purple/60">({breach.domain})</span>}
                      </div>
                    </TableCell>
                    <TableCell className={`font-mono ${getRowColor(index+1)}`}>
                      {breach.breachDate ? breach.breachDate : 'Unknown'}
                    </TableCell>
                    <TableCell className="font-mono">
                      <div className="flex flex-wrap gap-1">
                        {breach.dataClasses ? 
                          breach.dataClasses.slice(0, 3).map((dataClass: string, i: number) => (
                            <Badge key={i} variant="outline" className={`text-xs ${getRowColor(i+index)} border-${getRowColor(i+index)}/30 bg-terminal-dark/30`}>
                              {dataClass}
                            </Badge>
                          ))
                          : 
                          <Badge variant="outline" className="text-xs text-neon-pink border-neon-pink/30 bg-terminal-dark/30">
                            Unknown
                          </Badge>
                        }
                        {breach.dataClasses && breach.dataClasses.length > 3 && (
                          <Badge variant="outline" className="text-xs text-neon-green/80 border-neon-green/30 bg-terminal-dark/30">
                            +{breach.dataClasses.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={`font-mono ${getRowColor(index+2)} hidden md:table-cell`}>
                      {breach.pwnCount ? 
                        new Intl.NumberFormat().format(breach.pwnCount) : 
                        'Unknown'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 font-mono text-xs text-neon-purple/60 border-neon-purple/20 p-3 rounded bg-terminal-dark/30">
              <details>
                <summary className="cursor-pointer text-neon-purple hover:text-neon-pink flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Detailed breach information</span>
                </summary>
                <div className="pt-3 space-y-3">
                  {breachData.map((breach, index) => (
                    <div key={index} className="border-t border-neon-purple/20 pt-3">
                      <h4 className={`${getRowColor(index)} font-medium mb-1`}>{breach.title}</h4>
                      <p className="text-neon-teal/80">{breach.description || 'No detailed information available.'}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </>
      ) : (
        <motion.div variants={itemVariants}>
          <Alert className="mb-6 border-neon-green/30 bg-terminal-dark text-neon-green">
            <Lock className="h-5 w-5" />
            <AlertTitle className="text-neon-green text-lg font-mono">█▓▒░ SECURE STATUS ░▒▓█</AlertTitle>
            <AlertDescription className="text-neon-green/80 font-mono">
              No data breaches were found associated with your email.
              <span className="block mt-2 text-xs opacity-80">[ Security protocols functioning normally ]</span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-neon-blue font-mono">
          <Code className="h-4 w-4" />
          <span>[ SEARCH PARAMETERS ]</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {userData.email && (
            <Badge variant="outline" className="text-xs bg-terminal-dark/30 text-neon-pink border-neon-pink/30 font-mono">
              email: {userData.email}
            </Badge>
          )}
          {userData.firstName && (
            <Badge variant="outline" className="text-xs bg-terminal-dark/30 text-neon-teal border-neon-teal/30 font-mono">
              name: {userData.firstName} {userData.lastName}
            </Badge>
          )}
          {userData.phone && (
            <Badge variant="outline" className="text-xs bg-terminal-dark/30 text-neon-purple border-neon-purple/30 font-mono">
              phone: {userData.phone}
            </Badge>
          )}
          {userData.username && (
            <Badge variant="outline" className="text-xs bg-terminal-dark/30 text-neon-blue border-neon-blue/30 font-mono">
              username: {userData.username}
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
