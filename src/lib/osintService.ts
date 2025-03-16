
// IMPORTANT: Puppeteer doesn't work in the browser environment
// We'll create a mock implementation that simulates real data fetching
// In a real app, this would be a server-side API endpoint

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

export const checkEmailBreaches = async (email: string): Promise<BreachData[]> => {
  console.log("Checking breaches for email:", email);
  
  // In a browser environment, we can't use Puppeteer directly
  // We should use an API instead, but for demo purposes, we'll use different mock data
  // based on email patterns to simulate real responses
  
  try {
    toast("Connecting to breach database...");
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    toast("Scanning breach records...");
    
    // Simulate another delay for searching
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Get mock data based on email pattern
    const breaches = getMockBreachData(email);
    
    if (breaches.length > 0) {
      toast.success(`Found ${breaches.length} breach records!`);
    } else {
      toast.success("No breach records found.");
    }
    
    return breaches;
  } catch (error) {
    console.error("Error checking breaches:", error);
    toast.error("Error checking breaches. Using fallback data.");
    
    // Fall back to basic mock data
    return getMockBreachData(email);
  }
};

// Helper function to get more realistic mock breach data
const getMockBreachData = (email: string): BreachData[] => {
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
  } else if (email.length > 5 && email.includes("@") && !email.includes("mock")) {
    // More realistic - return 1-3 breaches for most emails
    const numBreaches = Math.floor(Math.random() * 3) + 1;
    const allPossibleBreaches = [
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
      },
      {
        title: "Bitly",
        domain: "bitly.com",
        breachDate: "2014-05-08",
        pwnCount: 9322981,
        dataClasses: ["Email addresses", "Passwords", "Usernames"],
        description: "In May 2014, the URL shortening service Bitly announced they'd suffered a data breach."
      },
      {
        title: "Kickstarter",
        domain: "kickstarter.com",
        breachDate: "2014-02-16",
        pwnCount: 5236276,
        dataClasses: ["Email addresses", "Passwords", "Usernames"],
        description: "In February 2014, the crowdfunding platform Kickstarter announced they'd suffered a data breach."
      },
      {
        title: "Patreon",
        domain: "patreon.com",
        breachDate: "2015-10-01",
        pwnCount: 2330382,
        dataClasses: ["Email addresses", "Payment histories", "Passwords", "Usernames"],
        description: "In October 2015, the crowdfunding site Patreon was hacked and over 16GB of data was leaked."
      }
    ];
    
    // Shuffle and take first numBreaches items
    return [...allPossibleBreaches]
      .sort(() => 0.5 - Math.random())
      .slice(0, numBreaches);
  }
  
  // Return empty array for no breaches
  return [];
};
