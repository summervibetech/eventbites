import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, MessageSquare, Send, CheckCircle2, AlertCircle, X, ShieldCheck, Sparkles, User, UserCheck } from 'lucide-react';
import { BookingInquiry, ChatMessage } from '../types';

interface InquiryHubProps {
  inquiries: BookingInquiry[];
  onClose: () => void;
  onUpdateInquiryStatus: (id: string, status: BookingInquiry['status']) => void;
  onAddChatMessage: (inquiryId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  chatMessages: Record<string, ChatMessage[]>;
}

export default function InquiryHub({
  inquiries,
  onClose,
  onUpdateInquiryStatus,
  onAddChatMessage,
  chatMessages,
}: InquiryHubProps) {
  const [selectedId, setSelectedId] = useState<string>('');
  const [typedMessage, setTypedMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inquiries.length > 0 && !selectedId) {
      setSelectedId(inquiries[0].id);
    }
  }, [inquiries, selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, selectedId]);

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);
  const activeMessages = selectedInquiry ? chatMessages[selectedInquiry.id] || [] : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedInquiry) return;

    const userText = typedMessage.trim();
    // Send user message
    onAddChatMessage(selectedInquiry.id, {
      sender: 'user',
      text: userText,
    });

    setTypedMessage('');

    // Trigger an automatic context-aware response from Chloe after a small delay
    setTimeout(() => {
      let replyText = "Thank you so much for the message! I'm reviewing these details and will update your custom booking options right away.";
      
      const lowerText = userText.toLowerCase();
      if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
        replyText = "Our snack catering booking starts at a base rate of $250 which includes cart delivery, complete set up, compostable cups, and 2 hours of active guest service. The final pricing depends on your guest count and snack choices. Your current custom selections look perfect, and I'm drafting a bespoke invoice for you now!";
      } else if (lowerText.includes('allergy') || lowerText.includes('allergic') || lowerText.includes('gluten') || lowerText.includes('vegan')) {
        replyText = "We take dietary restrictions very seriously! Our Fresh Fruit and Crudités cups are 100% gluten-free and vegan. We can also provide nut-free, vegan pastries and alternative milk options. I've added a special kitchen note to your event file.";
      } else if (lowerText.includes('tassel') || lowerText.includes('style') || lowerText.includes('color') || lowerText.includes('umbrella')) {
        replyText = "I love customizing the setup! We can accent the striped umbrella with custom tasseling, add miniature table blossoms, or write a gorgeous handwritten welcome sign on our natural wood chalkboard to match your exact color theme. What are your event colors?";
      } else if (lowerText.includes('confirm') || lowerText.includes('book') || lowerText.includes('reserve') || lowerText.includes('yes')) {
        replyText = "That is exciting! I have updated your status to 'Details Confirmed'. I will send over our secure digital waiver and deposit invoice shortly. Once submitted, your spot will be officially reserved on our calendar!";
        onUpdateInquiryStatus(selectedInquiry.id, 'confirmed');
      } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        replyText = `Hi ${selectedInquiry.name}! I'm so excited to help plan your ${selectedInquiry.eventType}. Your selections look absolutely wonderful. Let me know if you have any questions about our setup!`;
      }

      onAddChatMessage(selectedInquiry.id, {
        sender: 'team',
        text: replyText,
      });
    }, 1200);
  };

  // Stepper steps
  const steps = [
    { key: 'sent', label: 'Inquiry Received', desc: 'Host review' },
    { key: 'reviewing', label: 'Coordinator Assigned', desc: 'Chloe reviewing' },
    { key: 'proposal_ready', label: 'Proposal Ready', desc: 'Snacks customized' },
    { key: 'confirmed', label: 'Cart Reserved', desc: 'Date locked in!' },
  ];

  const getStepIndex = (status: BookingInquiry['status']) => {
    if (status === 'sent') return 0;
    if (status === 'reviewing') return 1;
    if (status === 'proposal_ready') return 2;
    if (status === 'confirmed') return 3;
    return 0;
  };

  const currentStepIdx = selectedInquiry ? getStepIndex(selectedInquiry.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-soft-white rounded-[32px] shadow-2xl border border-natural-border w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden relative"
      >
        {/* Floating close x */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer z-50"
          aria-label="Close panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="bg-white border-b border-natural-border py-5 px-6 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left">
            <div className="flex items-center space-x-2 text-olive-green">
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs font-display font-bold uppercase tracking-widest">
                Event Bites Reservation Console
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-charcoal-text mt-1">
              Your Booking & Custom Proposals
            </h2>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2 bg-sage-green/10 text-olive-green text-xs font-semibold px-4 py-2 rounded-full border border-sage-green/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Client Dashboard</span>
          </div>
        </div>

        {/* Main interactive grid content */}
        {inquiries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <AlertCircle className="w-12 h-12 text-stone-300" />
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-800">No Active Inquiries Found</h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto mt-1">
                You haven't submitted an inquiry for Event Bites yet. Fill out the reservation form on the homepage and track your status right here!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            
            {/* Left side panel: List of inquiries (4 cols on lg) */}
            <div className="lg:col-span-4 border-r border-natural-border bg-stone-50/40 overflow-y-auto p-4 space-y-3">
              <h3 className="text-left text-xs font-display font-bold uppercase tracking-wider text-stone-400 mb-2 px-1">
                Your Submissions
              </h3>
              
              <div className="space-y-2.5">
                {inquiries.map((inq) => {
                  const isActive = inq.id === selectedId;
                  return (
                    <button
                      key={inq.id}
                      onClick={() => setSelectedId(inq.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer block ${
                        isActive
                          ? 'bg-white border-natural-border shadow-xs ring-1 ring-sage-green/30'
                          : 'bg-white/60 border-natural-border/60 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-serif font-black text-sm text-charcoal-text truncate block">
                          {inq.eventType}
                        </span>
                        
                        {/* Status chip */}
                        <span className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          inq.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'proposal_ready'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {inq.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-500 space-y-0.5 mt-2">
                        <p className="font-medium">Date: {new Date(inq.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        <p>Guests: {inq.guestCount} servings • {inq.selectedSnacks.length} snacks</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side panel: Selected inquiry details + Chat portal (8 cols on lg) */}
            {selectedInquiry ? (
              <div className="lg:col-span-8 flex flex-col md:flex-row overflow-hidden h-full">
                
                {/* Mid-column: Detailed Summary & Stepper (4 cols) */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-natural-border text-left space-y-6">
                  
                  {/* Stepper tracker */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-display font-black uppercase tracking-wider text-stone-400">
                      Reservation Status Timeline
                    </h4>
                    
                    <div className="relative pl-4 border-l-2 border-stone-200 space-y-5">
                      {steps.map((st, sIdx) => {
                        const isDone = sIdx <= currentStepIdx;
                        const isCurrent = sIdx === currentStepIdx;
                        return (
                          <div key={st.key} className="relative">
                            {/* Dot indicator */}
                            <div className={`absolute -left-[23px] top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                              isDone
                                ? 'bg-sage-green border-sage-green text-white shadow-xs'
                                : 'bg-white border-stone-300'
                            }`}>
                              {isDone && <span className="text-[8px]">✓</span>}
                            </div>
                            
                            <div className="text-xs pl-2.5">
                              <h5 className={`font-semibold ${isDone ? 'text-charcoal-text font-black' : 'text-stone-400'}`}>
                                {st.label}
                              </h5>
                              <p className="text-[10px] text-stone-500 leading-normal mt-0.5">{st.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Booking Details Cards list */}
                  <div className="bg-warm-cream/20 p-5 rounded-2xl border border-natural-border space-y-4">
                    <h4 className="font-serif font-black text-sm text-charcoal-text border-b border-natural-border/60 pb-2 flex items-center justify-between">
                      <span>Event Specifications</span>
                      <span className="text-[10px] bg-white border px-2 py-0.5 rounded-full font-display">No. {selectedInquiry.id.slice(0, 5)}</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5 text-xs text-stone-600">
                      <p><strong className="text-stone-500 font-medium">Contact:</strong> {selectedInquiry.name} ({selectedInquiry.phone || 'No phone provided'})</p>
                      <p><strong className="text-stone-500 font-medium">Email:</strong> {selectedInquiry.email}</p>
                      <p><strong className="text-stone-500 font-medium">Location:</strong> {selectedInquiry.location}</p>
                      <p><strong className="text-stone-500 font-medium">Snack Style:</strong> {selectedInquiry.snackStyle}</p>
                      {selectedInquiry.message && (
                        <p className="italic bg-white/70 p-2.5 rounded-lg border border-stone-100 mt-1"><strong className="text-stone-500 not-italic block font-medium mb-0.5">Notes:</strong> "{selectedInquiry.message}"</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-natural-border/60">
                      <span className="text-[10px] font-display font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                        Selected Menu Items:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedInquiry.selectedSnacks.map((s, i) => (
                          <span key={i} className="text-[10px] bg-white border border-natural-border/80 px-2 py-0.5 rounded-md font-medium text-stone-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right-column: Interactive Live Chat with Chloe (4 cols) */}
                <div className="w-full md:w-1/2 flex flex-col justify-between bg-white h-full overflow-hidden">
                  
                  {/* Chat header */}
                  <div className="bg-stone-50 p-4 border-b border-natural-border flex items-center space-x-3 text-left">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-sage-green bg-warm-cream shadow-xs">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                          alt="Chloe"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm text-charcoal-text">Chloe</h4>
                      <p className="text-[10px] text-stone-500 flex items-center space-x-1">
                        <UserCheck className="w-3 h-3 text-sage-green" />
                        <span>Booking Host Coordinator</span>
                      </p>
                    </div>
                  </div>

                  {/* Chat logs */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30">
                    <AnimatePresence initial={false}>
                      {activeMessages.map((msg) => {
                        const isUser = msg.sender === 'user';
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[85%] p-3 rounded-2xl text-xs text-left ${
                              isUser
                                ? 'bg-sage-green text-soft-white rounded-tr-none shadow-xs'
                                : 'bg-white text-stone-800 border border-natural-border rounded-tl-none shadow-2xs'
                            }`}>
                              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                              <span className={`block text-[8px] text-right mt-1.5 opacity-60`}>
                                {msg.timestamp}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input form */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-natural-border bg-white flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message (ask about 'price', 'allergy', 'tassels')..."
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-natural-border focus:outline-hidden focus:border-sage-green text-xs bg-stone-50/50"
                    />
                    <button
                      type="submit"
                      disabled={!typedMessage.trim()}
                      className={`p-2.5 rounded-xl text-white transition-colors cursor-pointer ${
                        typedMessage.trim() ? 'bg-sage-green hover:bg-olive-green' : 'bg-stone-200 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                </div>

              </div>
            ) : null}

          </div>
        )}
      </motion.div>
    </div>
  );
}
