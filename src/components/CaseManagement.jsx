import React, { useState } from 'react';
import { 
  FolderPlus, Search, Filter, Calendar, FileText, User, 
  Clock, CheckCircle2, AlertCircle, ChevronRight, X, Plus, 
  Scale, Briefcase, Paperclip, MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CaseManagement() {
  const { cases: contextCases, addCase, updateCase } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fallback initial cases if context is empty
  const initialCases = [
    {
      id: 'case-001',
      title: 'Kamau v. Sovereign Real Estate Ltd',
      caseNumber: 'ELC/NAI/482/2024',
      client: 'Joseph Mwangi Kamau',
      court: 'Environment & Land Court, Milimani',
      category: 'Land & Property',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-11-14',
      filingDate: '2024-03-12',
      description: 'Dispute over boundary encroachment and irregular issuance of title deed in Karen sector 4.',
      filesCount: 6,
      notes: [
        { date: '2024-04-02', text: 'Filed preliminary objection against respondent\'s replying affidavit.' },
        { date: '2024-05-18', text: 'Surveyor report submitted confirming 0.4 acre boundary variance.' }
      ]
    },
    {
      id: 'case-002',
      title: 'Achieng v. Prime Logistics East Africa',
      caseNumber: 'ELRC/291/2024',
      client: 'Grace Mary Achieng',
      court: 'Employment & Labour Relations Court, Nairobi',
      category: 'Employment Law',
      status: 'Hearing Scheduled',
      priority: 'Medium',
      nextHearing: '2024-11-04',
      filingDate: '2024-06-20',
      description: 'Unlawful termination claim seeking 12 months compensation and withheld terminal dues under Sec 49.',
      filesCount: 4,
      notes: [
        { date: '2024-07-10', text: 'Witness summons issued to HR Director.' }
      ]
    },
    {
      id: 'case-003',
      title: 'Republic v. Peter Kiprono',
      caseNumber: 'CR/KIB/1042/2024',
      client: 'Peter Kiprono',
      court: 'Kibera Chief Magistrate\'s Court',
      category: 'Criminal Defence',
      status: 'Bail Granted',
      priority: 'High',
      nextHearing: '2024-11-28',
      filingDate: '2024-08-01',
      description: 'Defence against alleged financial fraud charges under Penal Code Sec 313. Bond executed at KES 500,000.',
      filesCount: 8,
      notes: [
        { date: '2024-08-05', text: 'Bail application argued successfully before Hon. CM.' }
      ]
    },
    {
      id: 'case-004',
      title: 'In Re Estate of Late Duncan Mutua',
      caseNumber: 'SUCC/MACH/119/2023',
      client: 'Beatrice Mutua',
      court: 'High Court, Machakos',
      category: 'Succession & Family',
      status: 'Pending Grant',
      priority: 'Low',
      nextHearing: '2024-12-02',
      filingDate: '2023-11-15',
      description: 'Petition for Letters of Administration intestate over ancestral holdings and commercial plots in Athi River.',
      filesCount: 3,
      notes: [
        { date: '2024-02-12', text: 'Kenya Gazette notice publication confirmed.' }
      ]
    }
  ];

  const [caseList, setCaseList] = useState(
    contextCases && contextCases.length > 0 ? contextCases : initialCases
  );

  // New Case Form State
  const [formData, setFormData] = useState({
    title: '',
    caseNumber: '',
    client: '',
    court: 'Environment & Land Court, Milimani',
    category: 'Commercial Law',
    priority: 'Medium',
    status: 'Active',
    nextHearing: '',
    description: ''
  });

  const handleCreateCase = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client) return;

    const newCase = {
      ...formData,
      id: `case-${Date.now()}`,
      filingDate: new Date().toISOString().split('T')[0],
      filesCount: 0,
      notes: [{ date: new Date().toISOString().split('T')[0], text: 'Case file opened on platform.' }]
    };

    setCaseList([newCase, ...caseList]);
    if (addCase) addCase(newCase);
    setIsModalOpen(false);
    setFormData({
      title: '',
      caseNumber: '',
      client: '',
      court: 'Environment & Land Court, Milimani',
      category: 'Commercial Law',
      priority: 'Medium',
      status: 'Active',
      nextHearing: '',
      description: ''
    });
  };

  const filteredCases = caseList.filter(c => {
    const matchesSearch = (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.caseNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.client || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Action & Stats Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Advocate Case Management
          </h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: '0.9rem' }}>
            Track active court pleadings, cause list schedules, and client dossiers securely
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 20px',
            color: '#040d1a',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 20px rgba(201, 168, 76, 0.35)'
          }}
        >
          <FolderPlus size={18} /> Register New Case File
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        background: 'rgba(15, 34, 64, 0.6)',
        padding: '14px',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Search by case title, suit number, or client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(10, 22, 40, 0.8)',
              border: '1px solid rgba(201, 168, 76, 0.25)',
              borderRadius: '8px',
              padding: '10px 14px 10px 38px',
              color: '#f8fafc',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {['All', 'Active', 'Hearing Scheduled', 'Bail Granted', 'Pending Grant'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: statusFilter === st ? '1px solid #c9a84c' : '1px solid rgba(255, 255, 255, 0.1)',
                background: statusFilter === st ? 'rgba(201, 168, 76, 0.15)' : 'rgba(10, 22, 40, 0.5)',
                color: statusFilter === st ? '#d4b965' : '#cbd5e1',
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {filteredCases.map((c) => {
          const isUrgent = c.priority === 'High';
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              style={{
                background: 'rgba(15, 34, 64, 0.75)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: isUrgent ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(201, 168, 76, 0.2)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(201, 168, 76, 0.15)',
                  color: '#d4b965',
                  border: '1px solid rgba(201, 168, 76, 0.3)'
                }}>
                  {c.caseNumber}
                </span>

                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  background: isUrgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: isUrgent ? '#ef4444' : '#10b981',
                  border: `1px solid ${isUrgent ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`
                }}>
                  {c.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0, lineHeight: '1.4' }}>
                {c.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <User size={14} color="#c9a84c" />
                <span>Client: <strong>{c.client}</strong></span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
                <Scale size={14} color="#94a3b8" />
                <span>{c.court}</span>
              </div>

              <p style={{
                margin: '4px 0 0',
                fontSize: '0.85rem',
                color: '#94a3b8',
                lineHeight: '1.4',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {c.description}
              </p>

              <div style={{
                marginTop: 'auto',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem'
              }}>
                <span style={{ color: '#d4b965', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> Next: {c.nextHearing || 'TBD'}
                </span>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Paperclip size={13} /> {c.filesCount || 0} Docs
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Details Drawer / Modal */}
      {selectedCase && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 13, 26, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 1000
        }}>
          <div style={{
            width: '100%',
            maxWidth: '520px',
            height: '100%',
            background: 'rgba(10, 22, 40, 0.95)',
            borderLeft: '1px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ color: '#d4b965', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {selectedCase.caseNumber}
                </span>
                <h2 style={{ fontSize: '1.4rem', color: '#f8fafc', margin: '4px 0 0' }}>
                  {selectedCase.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: '#cbd5e1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(15, 34, 64, 0.7)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Client Details</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  {selectedCase.client}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                  Venue: {selectedCase.court}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '8px' }}>Pleadings & Case Summary</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                  {selectedCase.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '10px' }}>Advocate Diary & Court Notes</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCase.notes && selectedCase.notes.map((note, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(255,255,255,0.04)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #c9a84c'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#d4b965' }}>{note.date}</div>
                      <div style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>{note.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => alert(`Opening e-filing bundle for ${selectedCase.caseNumber}...`)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #c9a84c, #a88a3a)',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    color: '#040d1a',
                    cursor: 'pointer'
                  }}
                >
                  Open e-Court Bundle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Case Registration Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 13, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <form
            onSubmit={handleCreateCase}
            style={{
              background: 'rgba(10, 22, 40, 0.95)',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '20px',
              padding: '30px',
              width: '100%',
              maxWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', color: '#f8fafc', margin: 0, fontWeight: 700 }}>
                Register New Matter / Suit
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Suit Title *</label>
              <input
                type="text"
                placeholder="e.g. Omondi v. Kenya Commercial Bank"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: 'rgba(15, 34, 64, 0.8)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f8fafc',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Court File Number</label>
                <input
                  type="text"
                  placeholder="e.g. HCCC/E140/2024"
                  value={formData.caseNumber}
                  onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 34, 64, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#f8fafc',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Client Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Faith Wanjala"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(15, 34, 64, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#f8fafc',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Jurisdiction / Court</label>
              <select
                value={formData.court}
                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 34, 64, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f8fafc',
                  outline: 'none'
                }}
              >
                <option value="High Court of Kenya, Milimani">High Court of Kenya, Milimani</option>
                <option value="Environment & Land Court, Milimani">Environment & Land Court, Milimani</option>
                <option value="Employment & Labour Relations Court">Employment & Labour Relations Court</option>
                <option value="Chief Magistrate's Court, Kibera/Nairobi">Chief Magistrate's Court, Kibera/Nairobi</option>
                <option value="Court of Appeal of Kenya">Court of Appeal of Kenya</option>
                <option value="Nairobi Centre for International Arbitration (NCIA)">Nairobi Centre for International Arbitration (NCIA)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Summary / Brief</label>
              <textarea
                rows={3}
                placeholder="Key claims, cause of action, and initial relief sought..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 34, 64, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#f8fafc',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #c9a84c, #a88a3a)',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 700,
                color: '#040d1a',
                cursor: 'pointer'
              }}
            >
              Confirm and Open Dossier
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
