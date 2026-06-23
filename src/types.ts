export interface SnackItem {
  id: string;
  name: string;
  description: string;
  category: 'sweet' | 'savory' | 'fresh' | 'beverage';
  imagePlaceholder: string;
  popular?: boolean;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  location: string;
  guestCount: number;
  eventType: string;
  snackStyle: string;
  message: string;
  selectedSnacks: string[];
  cartColor: string;
  umbrellaStyle: string;
  status: 'sent' | 'reviewing' | 'proposal_ready' | 'confirmed';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'team' | 'user';
  text: string;
  timestamp: string;
}

export interface EventTypeDetail {
  id: string;
  name: string;
  description: string;
  recommendedSnacks: string[];
  vibe: string;
  iconName: string;
}
