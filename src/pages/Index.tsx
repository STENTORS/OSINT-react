
import React, { useState } from 'react';
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Search, Database, Lock, LockOpen, Shield, AlertTriangle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        icon: <AlertTriangle className="h-4 w-4 text-amber-500" />
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
          icon: <AlertTriangle className="h-4 w-4 text-amber-500" />
        });
      } else {
        toast("Search complete. No breaches found.", {
          icon: <Check className="h-4 w-4 text-green-500" />
        });
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast("Error during search. Please try again.", {
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
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
            className="text-2xl md:text-3xl font-bold text-center mb-1 text-primary"
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
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span>Search Parameters</span>
            </h2>
            <Separator className="mb-6" />
            <SearchForm onSubmit={handleSearch} isSearching={isSearching} />
          </Card>

          <Card className="p-6 glassmorphism">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span>Command Terminal</span>
            </h2>
            <Separator className="mb-6" />
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
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {searchResults.breachData.length > 0 ? (
                  <>
                    <LockOpen className="h-5 w-5 text-amber-500" />
                    <span>Breach Results</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Security Status</span>
                  </>
                )}
              </h2>
              <Separator className="mb-6" />
              <ResultsPanel results={searchResults} />
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
