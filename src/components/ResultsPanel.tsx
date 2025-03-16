
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Database, Fingerprint, Lock, LockOpen, Calendar, Users, FileText, Code } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from '@/context/ThemeContext';

interface ResultsPanelProps {
  results: {
    breachData: any[];
    userData: any;
  };
}

const ResultsPanel = ({ results }: ResultsPanelProps) => {
  const { theme } = useTheme();
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
  
  // Theme-specific colors
  const getThemeColors = () => {
    switch (theme) {
      case 'cyber':
        return {
          text: 'text-cyber-blue',
          lightText: 'text-cyber-blue/80',
          darkText: 'text-cyber-blue/50',
          border: 'border-cyber-blue/30',
          bg: 'bg-black/60',
          badgeBg: 'bg-black/30',
          badgeBorder: 'border-cyber-blue/30'
        };
      case 'glitch':
        return {
          text: 'text-glitch-primary',
          lightText: 'text-glitch-primary/80',
          darkText: 'text-glitch-primary/50',
          border: 'border-glitch-primary/30',
          bg: 'bg-black/60',
          badgeBg: 'bg-black/30',
          badgeBorder: 'border-glitch-primary/30'
        };
      case 'retro':
        return {
          text: 'text-retro-brightGreen',
          lightText: 'text-retro-brightGreen/80',
          darkText: 'text-retro-darkGray',
          border: 'border-retro-brightGreen/30',
          bg: 'bg-black/60',
          badgeBg: 'bg-black/30',
          badgeBorder: 'border-retro-brightGreen/30'
        };
      default: // hacker
        return {
          text: 'text-hacker',
          lightText: 'text-hacker-light',
          darkText: 'text-hacker-dark',
          border: 'border-hacker-dark',
          bg: 'bg-black/60',
          badgeBg: 'bg-black/30',
          badgeBorder: 'border-hacker/50'
        };
    }
  };
  
  const colors = getThemeColors();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {breachData.length > 0 ? (
        <>
          <motion.div variants={itemVariants}>
            <Alert className={`mb-6 ${colors.border} ${colors.bg} ${colors.text}`}>
              <LockOpen className={`h-5 w-5 ${colors.text}`} />
              <AlertTitle className={`${colors.text} text-lg font-mono`}>█▓▒░ SECURITY BREACH DETECTED ░▒▓█</AlertTitle>
              <AlertDescription className={`${colors.lightText} font-mono`}>
                Your email was found in {breachData.length} data breach{breachData.length !== 1 ? 'es' : ''}.
                <span className="block mt-2 text-xs opacity-80">[ Vulnerability identified in {breachData.length} connected system{breachData.length !== 1 ? 's' : ''} ]</span>
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <div className="mb-4">
            <h3 className={`text-sm font-medium mb-3 flex items-center gap-1.5 ${colors.text} font-mono`}>
              <Database className="h-4 w-4" />
              <span>[ BREACH DETAILS ]</span>
            </h3>
            
            <Table>
              <TableHeader>
                <TableRow className={colors.border}>
                  <TableHead className={`${colors.lightText} font-mono`}>Service</TableHead>
                  <TableHead className={`${colors.lightText} font-mono`}>Date</TableHead>
                  <TableHead className={`${colors.lightText} font-mono`}>Compromised Data</TableHead>
                  <TableHead className={`${colors.lightText} font-mono hidden md:table-cell`}>Affected Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breachData.map((breach, index) => (
                  <TableRow key={index} className={colors.border}>
                    <TableCell className={`font-mono ${colors.text}`}>
                      <div className="flex items-center gap-2">
                        <Fingerprint className={`h-4 w-4 ${colors.text}`} />
                        <span>{breach.title}</span>
                        {breach.domain && <span className={`text-xs ${colors.darkText}`}>({breach.domain})</span>}
                      </div>
                    </TableCell>
                    <TableCell className={`font-mono ${colors.lightText}`}>
                      {breach.breachDate ? breach.breachDate : 'Unknown'}
                    </TableCell>
                    <TableCell className="font-mono">
                      <div className="flex flex-wrap gap-1">
                        {breach.dataClasses ? 
                          breach.dataClasses.slice(0, 3).map((dataClass: string, i: number) => (
                            <Badge key={i} variant="outline" className={`text-xs ${colors.text} ${colors.badgeBorder} ${colors.badgeBg}`}>
                              {dataClass}
                            </Badge>
                          ))
                          : 
                          <Badge variant="outline" className={`text-xs ${colors.text} ${colors.badgeBorder} ${colors.badgeBg}`}>
                            Unknown
                          </Badge>
                        }
                        {breach.dataClasses && breach.dataClasses.length > 3 && (
                          <Badge variant="outline" className={`text-xs ${colors.darkText} ${colors.badgeBorder} ${colors.badgeBg}`}>
                            +{breach.dataClasses.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className={`font-mono ${colors.lightText} hidden md:table-cell`}>
                      {breach.pwnCount ? 
                        new Intl.NumberFormat().format(breach.pwnCount) : 
                        'Unknown'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className={`mt-4 font-mono text-xs ${colors.darkText} ${colors.border} p-3 rounded ${colors.badgeBg}`}>
              <details>
                <summary className={`cursor-pointer ${colors.lightText} hover:${colors.text} flex items-center gap-2`}>
                  <FileText className="h-4 w-4" />
                  <span>Detailed breach information</span>
                </summary>
                <div className="pt-3 space-y-3">
                  {breachData.map((breach, index) => (
                    <div key={index} className={`border-t ${colors.border} pt-3`}>
                      <h4 className={`${colors.text} font-medium mb-1`}>{breach.title}</h4>
                      <p className={colors.lightText}>{breach.description || 'No detailed information available.'}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </>
      ) : (
        <motion.div variants={itemVariants}>
          <Alert className={`mb-6 ${colors.border} ${colors.bg} ${colors.text}`}>
            <Lock className="h-5 w-5" />
            <AlertTitle className={`${colors.text} text-lg font-mono`}>█▓▒░ SECURE STATUS ░▒▓█</AlertTitle>
            <AlertDescription className={`${colors.lightText} font-mono`}>
              No data breaches were found associated with your email.
              <span className="block mt-2 text-xs opacity-80">[ Security protocols functioning normally ]</span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="mt-6">
        <h3 className={`text-sm font-medium mb-2 flex items-center gap-1.5 ${colors.text} font-mono`}>
          <Code className="h-4 w-4" />
          <span>[ SEARCH PARAMETERS ]</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {userData.email && (
            <Badge variant="outline" className={`text-xs ${colors.badgeBg} ${colors.text} ${colors.badgeBorder} font-mono`}>
              email: {userData.email}
            </Badge>
          )}
          {userData.firstName && (
            <Badge variant="outline" className={`text-xs ${colors.badgeBg} ${colors.text} ${colors.badgeBorder} font-mono`}>
              name: {userData.firstName} {userData.lastName}
            </Badge>
          )}
          {userData.phone && (
            <Badge variant="outline" className={`text-xs ${colors.badgeBg} ${colors.text} ${colors.badgeBorder} font-mono`}>
              phone: {userData.phone}
            </Badge>
          )}
          {userData.username && (
            <Badge variant="outline" className={`text-xs ${colors.badgeBg} ${colors.text} ${colors.badgeBorder} font-mono`}>
              username: {userData.username}
            </Badge>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsPanel;
