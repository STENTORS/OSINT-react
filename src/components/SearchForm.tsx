
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from 'lucide-react';

interface SearchFormProps {
  onSubmit: (data: any) => void;
  isSearching: boolean;
}

const SearchForm = ({ onSubmit, isSearching }: SearchFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      profession: '',
      company: '',
      ipAddress: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-field">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="First Name"
            {...register('firstName')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register('lastName')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
          />
          <p className="text-xs text-muted-foreground">
            Currently, only email breach checks are supported
          </p>
        </div>
        
        <div className="form-field">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Phone Number"
            {...register('phone')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Username"
            {...register('username')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            placeholder="Profession"
            {...register('profession')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Company"
            {...register('company')}
          />
        </div>
        
        <div className="form-field">
          <Label htmlFor="ipAddress">IP Address</Label>
          <Input
            id="ipAddress"
            placeholder="IP Address"
            {...register('ipAddress')}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSearching}
      >
        {isSearching ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search OSINT Database"
        )}
      </Button>
    </form>
  );
};

export default SearchForm;
