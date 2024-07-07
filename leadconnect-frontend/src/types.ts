export type Experience = {
    bulletpoints: string;
    company_duration: string;
    company_location: string;
    company_logo: string;
    company_name: string;
    company_role: string;
    company_total_duration: string;
  };
  
  export type Contact = {
    about: string;
    contact_url: string;
    current_location: string;
    experiences: Experience[];
    headline: string;
    name: string;
    profile_pic_url: string;
    frequency: string;
    last_interacted: string;
    notes: string;
  };

  export interface Connection {
    contact_url: string;
    name: string;
    profile_pic_url: string;
  };
  
  