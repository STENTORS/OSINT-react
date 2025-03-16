
import React, { useState } from 'react';
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Search, Database, Lock, LockOpen, Shield, AlertTriangle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AsciiHeader from "@/components/AsciiHeader";
import TypedText from "@/components/TypedText";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import SearchForm from "@/components/SearchForm";
import ResultsPanel from "@/components/ResultsPanel";
import { checkEmailBreaches } from "@/lib/osintService";

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  
  const handleSearch = async (formData: any) => {
    if (!formData.email) {
      toast("Please provide an email address to search for breaches", {
        icon: <AlertTriangle className="h-4 w-4 text-neon-orange" />
      });
      return;
    }
    
    setIsSearching(true);
    toast("Starting OSINT search...");
    
    try {
      // Search for email breaches
      const breachResults = await checkEmailBreaches(formData.email);
      setSearchResults({
        breachData: breachResults,
        userData: formData
      });
      
      if (breachResults.length > 0) {
        toast(`Search complete. Found ${breachResults.length} breach${breachResults.length !== 1 ? 'es' : ''}!`, {
          icon: <AlertTriangle className="h-4 w-4 text-neon-orange" />
        });
      } else {
        toast("Search complete. No breaches found.", {
          icon: <Check className="h-4 w-4 text-neon-green" />
        });
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast("Error during search. Please try again.", {
        icon: <AlertTriangle className="h-4 w-4 text-neon-orange" />
      });
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-teal animate-vapor-gradient bg-300% opacity-70"></div>
      
      <motion.div 
        className="section-container py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <AsciiHeader />
          <TypedText 
            text="OSINT Research Tool" 
            className="text-2xl md:text-3xl font-bold text-center mb-1 vaporwave-glow"
          />
          <p className="text-center text-muted-foreground mb-12">
            Integrated open-source intelligence research platform
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={itemVariants}
        >
          <Card className="p-6 glassmorphism">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neon-pink">
              <Search className="h-5 w-5" />
              <span>Search Parameters</span>
            </h2>
            <Separator className="mb-6 bg-neon-pink/30" />
            <SearchForm onSubmit={handleSearch} isSearching={isSearching} />
          </Card>

          <Card className="p-6 glassmorphism">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neon-teal">
              <Database className="h-5 w-5" />
              <span>Command Terminal</span>
            </h2>
            <Separator className="mb-6 bg-neon-teal/30" />
            <AnimatedTerminal
              isSearching={isSearching}
              searchParams={searchResults?.userData}
            />
          </Card>
        </motion.div>

        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 glassmorphism">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-neon-purple">
                {searchResults.breachData.length > 0 ? (
                  <>
                    <LockOpen className="h-5 w-5 text-neon-orange" />
                    <span>Breach Results</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 text-neon-green" />
                    <span>Security Status</span>
                  </>
                )}
              </h2>
              <Separator className="mb-6 bg-neon-purple/30" />
              <ResultsPanel results={searchResults} />
            </Card>
          </motion.div>
        )}
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-neon-teal via-neon-purple to-neon-pink animate-vapor-gradient bg-300% opacity-70"></div>
    </div>
  );
};

export default Index;
