import React, { useState } from 'react';
import { 
  Send, Search, User, Paperclip, CheckCheck, Clock, 
  ShieldCheck, FileText, Sparkles, Phone, Video
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ClientMessages() {
  const { user, messages: contextMessages, sendMessage } = useAuth();

  const clients = [
    {
      id: 'c-1',
      name: 'Joseph Mwangi Kamau',
      caseRef: 'ELC/NAI/482/2024 (Land Dispute)',
      email: 'joseph.kamau@gmail.com',
      lastMessage: 'Advocate, have you had a chance to examine the surveyor’s ground report?',
      time: '10:45 AM',
      unread: 1,
      status: 'Active Client'
    },
    {
      id: 'c-2',
      name: 'Grace Mary Achieng',
      caseRef: 'ELRC/291/2024 (Unlawful Termination)',
      email: 'grace.achieng@yahoo.com',
      lastMessage: 'Thank you for sending the amended claim for review.',
      time: 'Yesterday',
      unread: 0,
      status: 'Active Client'
    },
    {
      id: 'c-3',
      name: 'Peter Kiprono',
      caseRef: 'CR/KIB/1042/2024 (Bail & Trial)',
      email: 'peter.kiprono@outlook.com',
      lastMessage: 'The surety documents are ready at the registry.',
      time: 'Oct 21',
      unread: 0,
      status: 'Active Client'
    },
    {
      id: 'c-4',
      name: 'Beatrice Mutua',
      caseRef: 'SUCC/MACH/119/2023 (Succession)',
      email: 'beatrice.mutua@gmail.com',
      lastMessage: 'The family has agreed on the proposed administrator consent.',
      time: 'Oct 19',
      unread: 0,
      status: 'Active Client'
    }
  ];

  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const [conversations, setConversations] = useState({
    'c-1': [
      { id: 1, sender: 'client', text: 'Advocate, have you had a chance to examine the surveyor’s ground report?', time: '10:45 AM' },
      { id: 2, sender: 'lawyer', text: 'Good morning Joseph. Yes, I inspected the survey beacons report. It clearly shows a 0.4 acre discrepancy where the developer built their perimeter wall.', time: '10:52 AM' },
      { id: 3, sender: 'client', text: 'That is great news! What is our next court step before the vacation begins?', time: '10:55 AM' }
    ],
    'c-2': [
      { id: 1, sender: 'client', text: 'Thank you for sending the amended claim for review.', time: 'Yesterday' }
    ],
    'c-3': [
      { id: 1, sender: 'client', text: 'The surety documents are ready at the registry.', time: 'Oct 21' }
    ],
    'c-4': [
      { id: 1, sender: 'client', text: 'The family has agreed on the proposed administrator consent.', time: 'Oct 19' }
    ]
  });

  const quickSnippets = [
    'I have reviewed the filed affidavit and will submit our response today.',
    'Please provide the original certified land search certificate.',
    'Your matter is scheduled for virtual hearing on the cause list.',
    'The court has granted the temporary stay order as prayed.'
  ];

  const activeThread = conversations[selectedClient.id] || [];

  const handleSend = (textToSend = inputText) => {
    const text = textToSend.trim();
    if (!text) return;

    const newMsg = {
      id: Date.now(),
      sender: 'lawyer',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => ({
      ...prev,
      [selectedClient.id]: [...(prev[selectedClient.id] || []), newMsg]
    }));

    if (sendMessage) {
      sendMessage(user?.email || 'lawyer@demo.com', selectedClient.email, text);
    }

    setInputText('');
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.caseRef.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '340px 1fr',
      height: 'calc(100vh - 140px)',
      background: 'rgba(10, 22, 40, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(201, 168, 76, 0.25)',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Left Client Roster */}
      <div style={{
        borderRight: '1px solid rgba(201, 168, 76, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(15, 34, 64, 0.6)'
      }}>
        <div style={{ padding: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' }}>
            Client Consultations
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input
              type="text"
              placeholder="Filter clients or matters..."
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
          {filteredClients.map((cl) => {
            const isSelected = selectedClient.id === cl.id;
            return (
              <div
                key={cl.id}
                onClick={() => setSelectedClient(cl)}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(201, 168, 76, 0.12)' : 'transparent',
                  borderLeft: isSelected ? '4px solid #c9a84c' : '4px solid transparent',
                  display: 'flex',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1e3f6e, #0a1628)',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#f8fafc',
                  flexShrink: 0
                }}>
                  {cl.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cl.name}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{cl.time}</span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#d4b965', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cl.caseRef}
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cl.lastMessage}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Conversation Window */}
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700 }}>
                {selectedClient.name}
              </h3>
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                padding: '2px 8px',
                borderRadius: '10px',
                fontWeight: 600
              }}>
                {selectedClient.status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#d4b965', marginTop: '3px' }}>
              {selectedClient.caseRef} • {selectedClient.email}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => alert(`Dialing verified phone contact for ${selectedClient.name}...`)}
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
              <Phone size={14} /> Direct Call
            </button>
            <button
              onClick={() => alert(`Opening judicial case docket for ${selectedClient.caseRef}...`)}
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
              <FileText size={14} /> Open Case Docket
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
          gap: '14px'
        }}>
          {activeThread.map((msg) => {
            const isLawyer = msg.sender === 'lawyer';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isLawyer ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{
                  padding: '14px 18px',
                  borderRadius: isLawyer ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: isLawyer ? 'linear-gradient(135deg, #1e3f6e, #0f2240)' : 'rgba(255, 255, 255, 0.06)',
                  color: '#f8fafc',
                  border: isLawyer ? '1px solid rgba(201, 168, 76, 0.35)' : '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#64748b',
                  alignSelf: isLawyer ? 'flex-end' : 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {msg.time}
                  {isLawyer && <CheckCheck size={14} color="#10b981" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Legal Snippets */}
        <div style={{
          padding: '8px 24px',
          background: 'rgba(15, 34, 64, 0.4)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <Sparkles size={12} color="#c9a84c" /> Quick Reply:
          </span>
          {quickSnippets.map((snippet, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(snippet)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#cbd5e1',
                borderRadius: '14px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              {snippet.slice(0, 36)}...
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(10, 22, 40, 0.95)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => alert('Select legal opinion or pleading draft to send to client.')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '10px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
            title="Attach Case Document"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            placeholder={`Reply to ${selectedClient.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
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
            onClick={() => handleSend()}
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
            <Send size={16} /> Send Advice
          </button>
        </div>
      </div>
    </div>
  );
}
