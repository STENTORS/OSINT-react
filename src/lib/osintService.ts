
import { toast } from "sonner";

type BreachData = {
  title: string;
  [key: string]: any;
};

// This function simulates the backend HaveIBeenPwned check
// In a real application, you would call your backend API
export const checkEmailBreaches = async (email: string): Promise<BreachData[]> => {
  // This is a mock implementation to simulate the backend functionality
  // In a real app, you would make a fetch call to your backend API
  
  console.log("Checking breaches for email:", email);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // For demo purposes, return mock data for specific test emails
  if (email.includes("test") || email.includes("example")) {
    return [
      { title: "Adobe" },
      { title: "LinkedIn" },
      { title: "Dropbox" }
    ];
  } else if (email.includes("breached")) {
    return [
      { title: "Canva" },
      { title: "MyFitnessPal" }
    ];
  } else if (email === "ezraibaldwin@gmail.com") {
    // This matches the example from the original code
    return [
      { title: "Adobe" },
      { title: "LinkedIn" }
    ];
  }
  
  // Return empty array for no breaches
  return [];
};

// This would be the real implementation when you're ready to connect to a backend
// export const checkEmailBreaches = async (email: string): Promise<BreachData[]> => {
//   try {
//     const response = await fetch('/api/check-breach', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to check breaches');
//     }
    
//     const data = await response.json();
//     return data.breaches || [];
//   } catch (error) {
//     console.error('Error checking breaches:', error);
//     toast.error('Failed to check for breaches');
//     throw error;
//   }
// };
