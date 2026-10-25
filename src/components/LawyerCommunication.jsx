import React, { useState } from 'react';
import { 
  MessageSquare, Send, Paperclip, Phone, Video, ShieldCheck, 
  Search, Star, Clock, CheckCheck, FileText 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LawyerCommunication() {
  const { user, messages: contextMessages, sendMessage } = useAuth();

  const advocates = [
    {
      id: 'adv-1',
      name: 'Adv. Wanjiku Muthoni',
      email: 'wanjiku.muthoni@advocates.co.ke',
      specialty: 'Commercial & Property Law',
      barNumber: 'LSK/2014/4891',
      rating: 4.9,
      reviewsCount: 38,
      status: 'online',
      avatarText: 'WM',
      hourlyRate: 'KES 8,000 / hr'
    },
    {
      id: 'adv-2',
      name: 'Adv. James Ochieng',
      email: 'james.ochieng@advocates.co.ke',
      specialty: 'Employment & Labour Disputes',
      barNumber: 'LSK/2012/3104',
      rating: 4.8,
      reviewsCount: 52,
      status: 'online',
      avatarText: 'JO',
      hourlyRate: 'KES 6,500 / hr'
    },
    {
      id: 'adv-3',
      name: 'Adv. Fatma Hassan',
      email: 'fatma.hassan@advocates.co.ke',
      specialty: 'Family & Succession Law',
      barNumber: 'LSK/2016/6211',
      rating: 4.9,
      reviewsCount: 44,
      status: 'offline',
      avatarText: 'FH',
      hourlyRate: 'KES 7,000 / hr'
    },
    {
      id: 'adv-4',
      name: 'Adv. David Kipchoge',
      email: 'david.kipchoge@advocates.co.ke',
      specialty: 'Constitutional & Criminal Defence',
      barNumber: 'LSK/2009/1982',
      rating: 5.0,
      reviewsCount: 71,
      status: 'online',
      avatarText: 'DK',
      hourlyRate: 'KES 10,000 / hr'
    }
  ];

  const [selectedAdvocate, setSelectedAdvocate] = useState(advocates[0]);
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Fallback initial conversations
  const [chatThreads, setChatThreads] = useState({
    'adv-1': [
      { id: 1, sender: 'advocate', text: 'Hello! I have received your case inquiry regarding the lease agreement in Westlands, Nairobi. How can I assist you today?', time: '10:15 AM' },
      { id: 2, sender: 'user', text: 'Thank you Advocate Wanjiku. I noticed that the landlord has added a clause stating they can increase rent at any time without notice. Can they do that under Kenyan law?', time: '10:18 AM' },
      { id: 3, sender: 'advocate', text: 'Under Section 5 of the Landlord & Tenant Act as well as standard contract law, rent escalation must be tethered to specific notice periods (usually 60-90 days) or fixed annually. An unrestricted escalation clause can be challenged in the Rent Restriction Tribunal.', time: '10:22 AM' }
    ],
    'adv-2': [
      { id: 1, sender: 'advocate', text: 'Good day! I specialize in the Employment & Labour Relations Court. Feel free to share your contract or termination letter.', time: 'Yesterday' }
    ],
    'adv-3': [
      { id: 1, sender: 'advocate', text: 'Hello, Advocate Fatma here. Let me know if you need assistance with succession or estate division matters.', time: 'Monday' }
    ],
    'adv-4': [
      { id: 1, sender: 'advocate', text: 'Greetings. I am available for constitutional petition drafting or urgent bail representation.', time: '3 days ago' }
    ]
  });

  const activeMessages = chatThreads[selectedAdvocate.id] || [];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev => ({
      ...prev,
      [selectedAdvocate.id]: [...(prev[selectedAdvocate.id] || []), newMsg]
    }));

    if (sendMessage) {
      sendMessage(user?.email || 'user@demo.com', selectedAdvocate.email, inputText.trim());
    }

    setInputText('');

    // Simulate advocate reply after 2 seconds
    setTimeout(() => {
      const advocateReply = {
        id: Date.now() + 1,
        sender: 'advocate',
        text: `Thank you for sharing this. I have recorded this in your file. I am reviewing the statutory provisions and will prepare an actionable legal opinion for you shortly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatThreads(prev => ({
        ...prev,
        [selectedAdvocate.id]: [...(prev[selectedAdvocate.id] || []), advocateReply]
      }));
    }, 2000);
  };

  const filteredAdvocates = advocates.filter(a => 
    a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    a.specialty.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      height: 'calc(100vh - 140px)',
      background: 'rgba(10, 22, 40, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(201, 168, 76, 0.25)',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Left Roster Panel */}
      <div style={{
        borderRight: '1px solid rgba(201, 168, 76, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(15, 34, 64, 0.6)'
      }}>
        <div style={{ padding: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' }}>
            Verified Advocates
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input
              type="text"
              placeholder="Filter by advocate or area..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(10, 22, 40, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 12px 8px 36px',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredAdvocates.map((adv) => {
            const isSelected = selectedAdvocate.id === adv.id;
            return (
              <div
                key={adv.id}
                onClick={() => setSelectedAdvocate(adv)}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(201, 168, 76, 0.12)' : 'transparent',
                  borderLeft: isSelected ? '4px solid #c9a84c' : '4px solid transparent',
                  transition: 'background 0.2s',
                  display: 'flex',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e3f6e, #0a1628)',
                  border: '1px solid #c9a84c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#d4b965',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  {adv.avatarText}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: adv.status === 'online' ? '#10b981' : '#64748b',
                    border: '2px solid #0a1628'
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {adv.name}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#d4b965', marginTop: '2px' }}>
                    {adv.specialty}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#eab308' }}>
                      <Star size={11} fill="#eab308" /> {adv.rating}
                    </span>
                    <span>• {adv.barNumber}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(10, 22, 40, 0.9)' }}>
        {/* Chat Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 34, 64, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a84c, #8c6e26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#040d1a'
            }}>
              {selectedAdvocate.avatarText}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: 700 }}>
                  {selectedAdvocate.name}
                </h3>
                <span style={{
                  fontSize: '0.7rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={12} /> Law Society of Kenya Active
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                {selectedAdvocate.specialty} • {selectedAdvocate.hourlyRate}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert(`Initiating secure voice consultation with ${selectedAdvocate.name}...`)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem'
              }}
            >
              <Phone size={14} /> Call
            </button>
            <button
              onClick={() => alert(`Starting encrypted video conference room with ${selectedAdvocate.name}...`)}
              style={{
                background: 'rgba(201, 168, 76, 0.1)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                color: '#d4b965',
                padding: '8px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Video size={14} /> Video Session
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#64748b',
            margin: '10px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '60px' }} />
            <span>🔒 Messages protected by Advocate-Client Privilege</span>
            <span style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '60px' }} />
          </div>

          {activeMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{
                  padding: '14px 18px',
                  borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: isUser ? 'linear-gradient(135deg, #c9a84c, #a88a3a)' : 'rgba(15, 34, 64, 0.85)',
                  color: isUser ? '#040d1a' : '#f8fafc',
                  border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#64748b',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {msg.time}
                  {isUser && <CheckCheck size={14} color="#10b981" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '18px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 22, 40, 0.95)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => alert('Select a document from your files to share with the advocate.')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '10px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
            title="Attach Case Document or Contract"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            placeholder={`Message ${selectedAdvocate.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            style={{
              flex: 1,
              background: 'rgba(15, 34, 64, 0.8)',
              border: '1px solid rgba(201, 168, 76, 0.25)',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#f8fafc',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            style={{
              background: inputText.trim() ? 'linear-gradient(135deg, #c9a84c, #a88a3a)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 20px',
              color: inputText.trim() ? '#040d1a' : '#64748b',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
