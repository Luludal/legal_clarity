import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Sparkles, Scale, Clock, DollarSign, 
  HelpCircle, ChevronRight, BookOpen, AlertCircle, RefreshCw 
} from 'lucide-react';
import { 
  constitutionalArticles, 
  legalCategories, 
  costEstimationData, 
  legalFAQs, 
  aiResponses 
} from '../data/kenyanLaw';

export default function AIChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'ai',
      text: aiResponses.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      articles: [48, 159],
      estimate: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    { label: '💰 Estimate Lawsuit Cost', prompt: 'Estimate the cost and time it takes to file a case in Kenya.' },
    { label: '🛡️ Rights if Arrested (Art. 49)', prompt: 'What are my rights if I am arrested by police in Kenya?' },
    { label: '💼 Unfair Termination at Work', prompt: 'My employer fired me without notice. What are my rights under Article 41?' },
    { label: '🏡 Land Boundary Dispute', prompt: 'How much does it cost and how long does it take to resolve a land dispute in Kenya?' },
    { label: '📝 Contract Loophole Advice', prompt: 'What are common loopholes to look out for in commercial contracts?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();

    // 1. Check for specific cost/time estimate requests
    const isCostQuery = query.includes('cost') || query.includes('price') || query.includes('how much') || query.includes('estimate') || query.includes('timeline') || query.includes('how long');
    
    // Find matching category
    let matchedCategory = legalCategories.find(c => 
      query.includes(c.name.toLowerCase().split(' ')[0]) || 
      c.commonCases.some(item => query.includes(item.toLowerCase()))
    );

    if (query.includes('land') || query.includes('property') || query.includes('boundary') || query.includes('title')) {
      matchedCategory = legalCategories.find(c => c.name.includes('Land'));
    } else if (query.includes('work') || query.includes('job') || query.includes('fired') || query.includes('employ') || query.includes('salary') || query.includes('wage')) {
      matchedCategory = legalCategories.find(c => c.name.includes('Employment'));
    } else if (query.includes('divorce') || query.includes('marriage') || query.includes('custody') || query.includes('child') || query.includes('inheritance')) {
      matchedCategory = legalCategories.find(c => c.name.includes('Family'));
    } else if (query.includes('arrest') || query.includes('police') || query.includes('bail') || query.includes('crime') || query.includes('theft')) {
      matchedCategory = legalCategories.find(c => c.name.includes('Criminal'));
    }

    // Matching Constitutional Articles
    const matchedArticles = constitutionalArticles.filter(art => 
      art.keywords.some(kw => query.includes(kw.toLowerCase())) ||
      query.includes(`article ${art.articleNumber}`) ||
      query.includes(`art ${art.articleNumber}`) ||
      query.includes(art.title.toLowerCase())
    ).slice(0, 3);

    // Matching FAQs
    const matchedFAQ = legalFAQs.find(faq => 
      query.includes(faq.question.toLowerCase().split(' ')[1] || '') &&
      (query.includes('how') || query.includes('what') || query.includes('can i'))
    );

    // Formulate response
    let responseText = '';
    let estimateObj = null;

    if (isCostQuery || matchedCategory) {
      const cat = matchedCategory || legalCategories[0];
      estimateObj = {
        category: cat.name,
        courtLevel: cat.name.includes('Land') ? 'Environment & Land Court' : cat.name.includes('Employment') ? 'Employment & Labour Court' : 'Magistrate / High Court',
        courtFee: `KES ${costEstimationData.filingFees.magistrateCourt.min.toLocaleString()} - KES ${costEstimationData.filingFees.highCourt.max.toLocaleString()}`,
        lawyerFee: `KES ${cat.averageCostRange.min.toLocaleString()} - KES ${cat.averageCostRange.max.toLocaleString()}`,
        timeRange: `${cat.averageTimeRange.min} to ${cat.averageTimeRange.max} ${cat.averageTimeRange.unit}`,
        consultation: `KES ${costEstimationData.lawyerFees.consultation.min.toLocaleString()} - ${costEstimationData.lawyerFees.consultation.max.toLocaleString()}`
      };

      responseText = `Based on Kenyan legal procedures and the Advocates Remuneration Order:\n\n` +
        `⚖️ **Legal Category:** ${cat.name}\n` +
        `⏳ **Estimated Timeline:** ${cat.averageTimeRange.min} - ${cat.averageTimeRange.max} ${cat.averageTimeRange.unit} (depending on court calendar & adjournments)\n` +
        `💰 **Estimated Total Cost:** KES ${cat.averageCostRange.min.toLocaleString()} - KES ${cat.averageCostRange.max.toLocaleString()}\n\n` +
        `• **Initial Advocate Consultation:** ${estimateObj.consultation}\n` +
        `• **Statutory Court Filing Fees:** ${estimateObj.courtFee}\n` +
        `• **Professional Advocate Representation:** ${estimateObj.lawyerFee}\n\n` +
        `${cat.description}\n\n` +
        `*Tip: Under Article 159(2)(c) of the Constitution of Kenya 2010, alternative dispute resolution (ADR) like mediation can reduce both time and costs by over 60%.*`;
    } else if (matchedFAQ) {
      responseText = `${matchedFAQ.answer}\n\nThis falls under **${matchedFAQ.category}**. You have constitutional backing under Articles ${matchedFAQ.relatedArticles.join(', ')} of the Constitution of Kenya 2010.`;
    } else if (query.includes('arrest') || query.includes('police')) {
      const resp = aiResponses.getTopicResponse('criminal');
      responseText = resp.text;
    } else if (query.includes('employment') || query.includes('work') || query.includes('fired')) {
      const resp = aiResponses.getTopicResponse('employment');
      responseText = resp.text;
    } else if (query.includes('land') || query.includes('title') || query.includes('plot')) {
      const resp = aiResponses.getTopicResponse('land');
      responseText = resp.text;
    } else if (query.includes('contract') || query.includes('agreement') || query.includes('clause') || query.includes('loophole')) {
      const resp = aiResponses.getTopicResponse('contract');
      responseText = resp.text;
    } else if (query.includes('right') || query.includes('constitution') || query.includes('bill of rights')) {
      const resp = aiResponses.getTopicResponse('rights');
      responseText = resp.text;
    } else {
      responseText = aiResponses.fallback;
    }

    return {
      text: responseText,
      articles: matchedArticles.map(a => a.articleNumber),
      estimate: estimateObj
    };
  };

  const handleSend = (textToSend = input) => {
    const messageText = textToSend.trim();
    if (!messageText) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyData = generateAIResponse(messageText);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        articles: aiReplyData.articles,
        estimate: aiReplyData.estimate
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 120px)',
      background: 'rgba(10, 22, 40, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(201, 168, 76, 0.25)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
        background: 'linear-gradient(90deg, rgba(15, 34, 64, 0.8) 0%, rgba(10, 22, 40, 0.9) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(201, 168, 76, 0.4)'
          }}>
            <Scale size={24} color="#040d1a" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Legal AI Assistant
              </h2>
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                fontWeight: 600
              }}>
                Kenya Constitution 2010 Indexed
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Specialized in Kenyan law, legal fees estimation & constitutional rights
            </p>
          </div>
        </div>

        <button 
          onClick={() => setMessages([{
            id: 'init-1',
            sender: 'ai',
            text: aiResponses.greeting,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            articles: [48, 159]
          }])}
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
            fontSize: '0.85rem'
          }}
          title="Reset Chat"
        >
          <RefreshCw size={14} /> Clear Chat
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div style={{
        padding: '12px 24px',
        background: 'rgba(15, 34, 64, 0.4)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.prompt)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              background: 'rgba(201, 168, 76, 0.08)',
              color: '#d4b965',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '14px',
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                flexDirection: isAI ? 'row' : 'row-reverse'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isAI ? 'linear-gradient(135deg, #1e3f6e, #0a1628)' : 'linear-gradient(135deg, #c9a84c, #8c6e26)',
                border: isAI ? '1px solid #c9a84c' : '1px solid #f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isAI ? <Bot size={20} color="#c9a84c" /> : <User size={20} color="#040d1a" />}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  padding: '16px 20px',
                  borderRadius: isAI ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                  background: isAI ? 'rgba(15, 34, 64, 0.9)' : 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)',
                  color: isAI ? '#f8fafc' : '#040d1a',
                  border: isAI ? '1px solid rgba(201, 168, 76, 0.2)' : 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>

                {/* Estimation Card if present */}
                {isAI && msg.estimate && (
                  <div style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.08)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    marginTop: '4px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', fontWeight: 700, marginBottom: '10px' }}>
                      <Clock size={16} /> Time & Cost Breakdown Snapshot
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                      <div style={{ background: 'rgba(10, 22, 40, 0.6)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Expected Duration</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>{msg.estimate.timeRange}</div>
                      </div>
                      <div style={{ background: 'rgba(10, 22, 40, 0.6)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Statutory Court Filing</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981' }}>{msg.estimate.courtFee}</div>
                      </div>
                      <div style={{ background: 'rgba(10, 22, 40, 0.6)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lawyer Representation</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#d4b965' }}>{msg.estimate.lawyerFee}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Relevant Articles Pills */}
                {isAI && msg.articles && msg.articles.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <BookOpen size={12} /> Cited Articles:
                    </span>
                    {msg.articles.map(artNum => (
                      <span
                        key={artNum}
                        style={{
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: 'rgba(201, 168, 76, 0.15)',
                          color: '#d4b965',
                          border: '1px solid rgba(201, 168, 76, 0.3)'
                        }}
                      >
                        Article {artNum}
                      </span>
                    ))}
                  </div>
                )}

                <span style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  alignSelf: isAI ? 'flex-start' : 'flex-end',
                  padding: '0 4px'
                }}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e3f6e, #0a1628)',
              border: '1px solid #c9a84c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="#c9a84c" />
            </div>
            <div style={{
              padding: '12px 18px',
              borderRadius: '4px 18px 18px 18px',
              background: 'rgba(15, 34, 64, 0.9)',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              color: '#d4b965',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={16} className="animate-spin" /> Analyzing Constitution of Kenya & Advocates Remuneration Order...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(201, 168, 76, 0.2)',
        background: 'rgba(10, 22, 40, 0.95)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask anything about Kenyan law, estimate lawsuit costs, or check constitutional rights..."
          rows={1}
          style={{
            flex: 1,
            background: 'rgba(15, 34, 64, 0.8)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            borderRadius: '12px',
            padding: '14px 18px',
            color: '#f8fafc',
            fontSize: '0.95rem',
            resize: 'none',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          style={{
            padding: '14px 22px',
            borderRadius: '12px',
            background: input.trim() ? 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)' : 'rgba(255,255,255,0.1)',
            border: 'none',
            color: input.trim() ? '#040d1a' : '#64748b',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: input.trim() ? '0 0 20px rgba(201, 168, 76, 0.4)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Send size={18} /> Send
        </button>
      </div>
    </div>
  );
}
