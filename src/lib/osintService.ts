
import { toast } from "sonner";

type BreachData = {
  title: string;
  domain?: string;
  breachDate?: string;
  pwnCount?: number;
  dataClasses?: string[];
  description?: string;
  [key: string]: any;
};

// This function simulates the backend HaveIBeenPwned check
// In a real application, you would call your backend API
export const checkEmailBreaches = async (email: string): Promise<BreachData[]> => {
  console.log("Checking breaches for email:", email);
  
  // ==========================================
  // OPTION 1: Mock implementation for demo purposes
  // ==========================================
  
  // Simulate API delay with random timing to feel more realistic
  const delay = 1500 + Math.random() * 2000;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // For demo purposes, return mock data for specific test emails
  if (email.includes("test") || email.includes("example")) {
    return [
      {
        title: "Adobe",
        domain: "adobe.com",
        breachDate: "2013-10-04",
        pwnCount: 152445165,
        dataClasses: ["Email addresses", "Password hints", "Passwords"],
        description: "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text."
      },
      {
        title: "LinkedIn",
        domain: "linkedin.com",
        breachDate: "2012-05-05",
        pwnCount: 164611595,
        dataClasses: ["Email addresses", "Passwords"],
        description: "In May 2016, LinkedIn had 164 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later."
      },
      {
        title: "Dropbox",
        domain: "dropbox.com",
        breachDate: "2012-07-07",
        pwnCount: 68648009,
        dataClasses: ["Email addresses", "Passwords"],
        description: "In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers."
      }
    ];
  } else if (email.includes("breach") || email.includes("pwned") || email.includes("hack")) {
    return [
      {
        title: "Canva",
        domain: "canva.com",
        breachDate: "2019-05-24",
        pwnCount: 137272116,
        dataClasses: ["Email addresses", "Geographic locations", "Names", "Passwords", "Usernames"],
        description: "In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million users."
      },
      {
        title: "MyFitnessPal",
        domain: "myfitnesspal.com",
        breachDate: "2018-02-01",
        pwnCount: 143606147,
        dataClasses: ["Email addresses", "IP addresses", "Passwords", "Usernames"],
        description: "In February 2018, the diet and exercise service MyFitnessPal suffered a data breach."
      },
      {
        title: "Imgur",
        domain: "imgur.com",
        breachDate: "2013-09-01",
        pwnCount: 1795988,
        dataClasses: ["Email addresses", "Passwords"],
        description: "In September 2013, the image sharing service Imgur suffered a data breach."
      }
    ];
  } else if (email.length > 0 && Math.random() > 0.7) {
    // Randomly return 1-2 breaches for some emails to make it feel more realistic
    const breaches = [
      {
        title: "Animoto",
        domain: "animoto.com",
        breachDate: "2018-07-10",
        pwnCount: 22437771,
        dataClasses: ["Email addresses", "Geographic locations", "Names", "Passwords"],
        description: "In July 2018, the video creation service Animoto suffered a data breach."
      },
      {
        title: "Epic Games",
        domain: "epicgames.com",
        breachDate: "2016-08-11",
        pwnCount: 12817728,
        dataClasses: ["Email addresses", "IP addresses", "Names", "Passwords", "Payment histories", "Usernames"],
        description: "In August 2016, the Epic Games forum suffered a data breach."
      }
    ];
    return breaches.slice(0, Math.floor(Math.random() * 2) + 1);
  }
  
  // Return empty array for no breaches
  return [];

  // ==========================================
  // OPTION 2: Real implementation with API key
  // ==========================================
  // To implement this properly, you would need:
  // 1. A HaveIBeenPwned API key (requires subscription)
  // 2. A backend service to make the API call securely
  // 
  // Example backend code (Node.js/Express):
  // 
  // app.post('/api/check-breach', async (req, res) => {
  //   const { email } = req.body;
  //   try {
  //     const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
  //       method: 'GET',
  //       headers: {
  //         'hibp-api-key': process.env.HIBP_API_KEY,
  //         'User-Agent': 'YourAppName'
  //       }
  //     });
  //     
  //     if (response.status === 404) {
  //       // 404 means no breaches found
  //       return res.json({ breaches: [] });
  //     }
  //     
  //     if (!response.ok) {
  //       throw new Error(`API responded with ${response.status}`);
  //     }
  //     
  //     const data = await response.json();
  //     return res.json({ breaches: data });
  //   } catch (error) {
  //     console.error('Error checking breaches:', error);
  //     return res.status(500).json({ error: 'Failed to check breaches' });
  //   }
  // });
  // 
  // Then, on the frontend (this file), you would call your backend:
  // 
  // try {
  //   const response = await fetch('/api/check-breach', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email }),
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error('Failed to check breaches');
  //   }
  //   
  //   const data = await response.json();
  //   return data.breaches || [];
  // } catch (error) {
  //   console.error('Error checking breaches:', error);
  //   toast.error('Failed to check for breaches');
  //   throw error;
  // }
};

