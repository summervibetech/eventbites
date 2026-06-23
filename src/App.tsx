import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PerfectFor from './components/PerfectFor';
import MenuPlanner from './components/MenuPlanner';
import HowItWorks from './components/HowItWorks';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import InquiryHub from './components/InquiryHub';
import { BookingInquiry, ChatMessage } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Customization preferences
  const [cartColor, setCartColor] = useState('sage');
  const [umbrellaStyle, setUmbrellaStyle] = useState<'striped-cream' | 'striped-green' | 'solid-cream' | 'terracotta'>('striped-cream');
  
  // Planner syncing states
  const [selectedSnacks, setSelectedSnacks] = useState<string[]>(['Fresh Fruit Cups', 'Mini Sandwiches', 'Mini Desserts']);
  const [plannedGuestCount, setPlannedGuestCount] = useState<number>(50);

  // Inquiries and simulated chats state
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [isInquiryHubOpen, setIsInquiryHubOpen] = useState(false);

  // 1. Scroll-Spy implementation to highlight current section in navigation
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'perfect-for', 'menu', 'how-it-works', 'booking'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. LocalStorage Persistence & Initial Seed Setup
  useEffect(() => {
    const storedInquiries = localStorage.getItem('event_bites_inquiries');
    const storedChats = localStorage.getItem('event_bites_chats');

    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      // Seed initial sample booking so user can interact with the client panel immediately!
      const sampleInquiry: BookingInquiry = {
        id: 'inq_sample101',
        name: 'Olivia Vance',
        email: 'olivia.vance@example.com',
        phone: '(512) 482-9011',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 25 days out
        location: 'Zilker Park Clubhouse, Austin',
        guestCount: 45,
        eventType: 'Baby Shower',
        snackStyle: 'Organic & Fresh',
        message: 'Looking for elegant floral touches! Can we match the cart umbrella to our blush theme?',
        selectedSnacks: ['Fresh Fruit Cups', 'Crudités Cups', 'Mini Desserts'],
        cartColor: 'rose',
        umbrellaStyle: 'striped-cream',
        status: 'proposal_ready',
        createdAt: new Date().toISOString(),
      };

      const seedInqs = [sampleInquiry];
      localStorage.setItem('event_bites_inquiries', JSON.stringify(seedInqs));
      setInquiries(seedInqs);
    }

    if (storedChats) {
      setChatMessages(JSON.parse(storedChats));
    } else {
      // Seed messages matching the initial Olivia Vance booking
      const seedMessages: Record<string, ChatMessage[]> = {
        'inq_sample101': [
          {
            id: 'm1',
            sender: 'team',
            text: "Hi Olivia! Congratulations on the upcoming shower! A warm, garden-themed baby shower at the Zilker Clubhouse sounds absolutely magical. \n\nWe have verified our cart is fully available on your date! I've pre-configured your quote for 45 guests with Fresh Fruit Cups, Crudités Cups, and Mini Desserts.",
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
          },
          {
            id: 'm2',
            sender: 'user',
            text: "Oh that is wonderful! Can we add custom pink tassels or floral vines to the striped umbrella?",
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
          },
          {
            id: 'm3',
            sender: 'team',
            text: "Absolutely! We can add hand-bundled blush tassels to the cream umbrella and wrap matching eucalyptus foliage around the frame. I've updated your event proposal to reflect a custom styled setup at no extra cost. \n\nLet me know if this looks perfect so we can reserve your date!",
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
          }
        ]
      };
      localStorage.setItem('event_bites_chats', JSON.stringify(seedMessages));
      setChatMessages(seedMessages);
    }
  }, []);

  // Save changes to localStorage helper
  const saveInquiries = (updated: BookingInquiry[]) => {
    localStorage.setItem('event_bites_inquiries', JSON.stringify(updated));
    setInquiries(updated);
  };

  const saveChats = (updated: Record<string, ChatMessage[]>) => {
    localStorage.setItem('event_bites_chats', JSON.stringify(updated));
    setChatMessages(updated);
  };

  // 3. Navigation Scrolling Trigger
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. Handle Menu Selections & scroll to Form
  const handleSelectMenu = (snacks: string[], count: number) => {
    setSelectedSnacks(snacks);
    setPlannedGuestCount(count);
    
    // Smooth scroll down to the form
    setTimeout(() => {
      handleNavigate('booking');
    }, 100);
  };

  // 5. Submit New Inquiry (saves locally)
  const handleSubmitInquiry = (newInqData: Omit<BookingInquiry, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'inq_' + Math.random().toString(36).substr(2, 9);
    
    const newInquiry: BookingInquiry = {
      ...newInqData,
      id: newId,
      cartColor: cartColor,
      umbrellaStyle: umbrellaStyle,
      status: 'sent',
      createdAt: new Date().toISOString(),
    };

    // Add initial greeting from Chloe inside the chat
    const initialGreeting: ChatMessage = {
      id: 'greeting_' + Date.now(),
      sender: 'team',
      text: `Hi ${newInquiry.name}! Thanks so much for inquiring about bringing Event Bites to your ${newInquiry.eventType}. \n\nI am currently looking over your date (${newInquiry.date}) and your preferred snack style (${newInquiry.snackStyle}). I'll have a custom menu suggestion and estimated pricing proposal ready for you within minutes! Let me know if you have any special notes.`,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedInquiries = [newInquiry, ...inquiries];
    const updatedChats = {
      ...chatMessages,
      [newId]: [initialGreeting],
    };

    saveInquiries(updatedInquiries);
    saveChats(updatedChats);

    // Open inquiry hub shortly to delight the user
    setTimeout(() => {
      setIsInquiryHubOpen(true);
    }, 1200);
  };

  // Update Status
  const handleUpdateInquiryStatus = (id: string, status: BookingInquiry['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    saveInquiries(updated);
  };

  // Add Chat message
  const handleAddChatMessage = (inquiryId: string, messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
    };

    const currentHistory = chatMessages[inquiryId] || [];
    const updatedChats = {
      ...chatMessages,
      [inquiryId]: [...currentHistory, newMessage],
    };

    saveChats(updatedChats);
  };

  return (
    <div className="min-h-screen bg-soft-white font-sans flex flex-col justify-between">
      <SplashScreen visible={showSplash} />
      {/* 1. Header Navigation */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'es' : 'en')}
      />

      {/* 2. Main Content Sections */}
      <main className="flex-1">
        {/* Homepage Hero */}
        <Hero
          onNavigate={handleNavigate}
          cartColor={cartColor}
          setCartColor={setCartColor}
          umbrellaStyle={umbrellaStyle}
          setUmbrellaStyle={setUmbrellaStyle}
          language={language}
        />

        {/* About Section */}
        <About language={language} />

        {/* What We Do / Services Section */}
        <Services onNavigate={handleNavigate} language={language} />

        {/* Perfect For Section */}
        <PerfectFor language={language} />

        {/* Menu / Snack Ideas Section */}
        <MenuPlanner
          onSelectMenu={handleSelectMenu}
          cartColor={cartColor}
          umbrellaStyle={umbrellaStyle}
          language={language}
        />

        {/* How It Works Section */}
        <HowItWorks language={language} />

        {/* Booking Inquiry Section */}
        <BookingForm
          onSubmitInquiry={handleSubmitInquiry}
          selectedSnacks={selectedSnacks}
          plannedGuestCount={plannedGuestCount}
          language={language}
        />
      </main>

      {/* 3. Footer Section */}
      <Footer onNavigate={handleNavigate} language={language} />

      {/* 4. Overlay Client Status Hub */}
      {isInquiryHubOpen && (
        <InquiryHub
          inquiries={inquiries}
          onClose={() => setIsInquiryHubOpen(false)}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onAddChatMessage={handleAddChatMessage}
          chatMessages={chatMessages}
        />
      )}
    </div>
  );
}

