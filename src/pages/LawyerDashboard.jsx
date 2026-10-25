import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  FolderOpen,
  Upload,
  MessageSquare,
  Users,
  Home,
  LogOut,
  Settings,
  Scale,
  Plus,
  Eye,
  Bell,
  Shield,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  ChevronRight,
  Mail,
  Phone,
  User,
  Hash,
  ToggleLeft,
  ToggleRight,
  Save,
  AlertCircle,
  Star,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CaseManagement from '../components/CaseManagement';
import FileUpload from '../components/FileUpload';
import ClientMessages from '../components/ClientMessages';

const LawyerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Advocate Wanjiku Muthoni',
    email: user?.email || 'wanjiku@advocates.co.ke',
    specialization: 'Constitutional & Human Rights Law',
    phone: '+254 712 345 678',
    barNumber: 'LSK/2019/04521',
  });
  const [availability, setAvailability] = useState(true);
  const [notifications, setNotifications] = useState({
    emailNotifs: true,
    smsNotifs: false,
    caseUpdates: true,
    clientMessages: true,
    systemAlerts: true,
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'lawyer') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    setAnimateCards(false);
    const timer = setTimeout(() => setAnimateCards(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!user || user.role !== 'lawyer') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
    setSettingsSaved(false);
  };

  const handleNotificationChange = (field) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
    setSettingsSaved(false);
  };

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'cases', label: 'Case Management', icon: FolderOpen },
    { id: 'upload', label: 'Upload Files', icon: Upload },
    { id: 'messages', label: 'Client Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    {
      label: 'Active Cases',
      value: '12',
      icon: Briefcase,
      color: '#c9a84c',
      trend: '+3 this month',
    },
    {
      label: 'Total Clients',
      value: '47',
      icon: Users,
      color: '#06b6d4',
      trend: '+5 this month',
    },
    {
      label: 'Pending Messages',
      value: '8',
      icon: MessageSquare,
      color: '#10b981',
      trend: '3 unread',
    },
    {
      label: 'Files Uploaded',
      value: '156',
      icon: FileText,
      color: '#d4b965',
      trend: '+12 this week',
    },
  ];

  const recentCases = [
    {
      id: 1,
      name: 'Kamau vs. National Land Commission',
      status: 'Active',
      date: '2024-12-15',
      type: 'Land Dispute',
      client: 'James Kamau',
    },
    {
      id: 2,
      name: 'Odhiambo Employment Tribunal',
      status: 'Pending',
      date: '2024-12-12',
      type: 'Employment Law',
      client: 'Sarah Odhiambo',
    },
    {
      id: 3,
      name: 'Mwangi Constitutional Petition',
      status: 'Active',
      date: '2024-12-10',
      type: 'Constitutional Law',
      client: 'Peter Mwangi',
    },
    {
      id: 4,
      name: 'Njoroge vs. KRA Tax Appeal',
      status: 'Review',
      date: '2024-12-08',
      type: 'Tax Law',
      client: 'Grace Njoroge',
    },
    {
      id: 5,
      name: 'Wafula Commercial Arbitration',
      status: 'Active',
      date: '2024-12-05',
      type: 'Commercial Law',
      client: 'David Wafula',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        };
      case 'Pending':
        return {
          backgroundColor: 'rgba(201, 168, 76, 0.15)',
          color: '#c9a84c',
          border: '1px solid rgba(201, 168, 76, 0.3)',
        };
      case 'Review':
        return {
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          color: '#06b6d4',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        };
      default:
        return {
          backgroundColor: 'rgba(248, 250, 252, 0.1)',
          color: '#f8fafc',
          border: '1px solid rgba(248, 250, 252, 0.2)',
        };
    }
  };

  const renderDashboardOverview = () => (
    <div style={{ padding: '0' }}>
      {/* Welcome Section */}
      <div
        style={{
          marginBottom: '32px',
          opacity: animateCards ? 1 : 0,
          transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#f8fafc',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Welcome back, Advocate{' '}
          <span style={{ color: '#c9a84c' }}>
            {user?.name || 'Wanjiku Muthoni'}
          </span>
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(248, 250, 252, 0.5)',
            margin: '0',
            letterSpacing: '0.01em',
          }}
        >
          Here's an overview of your practice today •{' '}
          {new Date().toLocaleDateString('en-KE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {stats.map((stat, index) => {
          const IconComp = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                background:
                  'linear-gradient(135deg, rgba(15, 34, 64, 0.7) 0%, rgba(10, 22, 40, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(201, 168, 76, 0.12)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                opacity: animateCards ? 1 : 0,
                transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${stat.color}40`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${stat.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border =
                  '1px solid rgba(201, 168, 76, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${stat.color}08 0%, transparent 70%)`,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={22} color={stat.color} />
                </div>
                <TrendingUp
                  size={16}
                  color={stat.color}
                  style={{ opacity: 0.6 }}
                />
              </div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#f8fafc',
                  marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'rgba(248, 250, 252, 0.6)',
                  marginBottom: '8px',
                  fontWeight: '500',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: stat.color,
                  opacity: 0.8,
                  fontWeight: '500',
                }}
              >
                {stat.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Cases & Quick Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '24px',
        }}
      >
        {/* Recent Cases */}
        <div
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(10, 22, 40, 0.7) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(201, 168, 76, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            opacity: animateCards ? 1 : 0,
            transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#f8fafc',
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Scale size={20} color="#c9a84c" />
              Recent Cases
            </h2>
            <button
              onClick={() => setActiveTab('cases')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c9a84c',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: '500',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'rgba(201, 168, 76, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentCases.map((caseItem, index) => (
              <div
                key={caseItem.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: 'rgba(4, 13, 26, 0.4)',
                  border: '1px solid rgba(248, 250, 252, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: animateCards ? 1 : 0,
                  transform: animateCards ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${0.5 + index * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 34, 64, 0.6)';
                  e.currentTarget.style.border =
                    '1px solid rgba(201, 168, 76, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(4, 13, 26, 0.4)';
                  e.currentTarget.style.border =
                    '1px solid rgba(248, 250, 252, 0.04)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#f8fafc',
                      marginBottom: '4px',
                    }}
                  >
                    {caseItem.name}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'rgba(248, 250, 252, 0.4)',
                    }}
                  >
                    <span>{caseItem.type}</span>
                    <span>•</span>
                    <span>{caseItem.client}</span>
                    <span>•</span>
                    <span>{caseItem.date}</span>
                  </div>
                </div>
                <span
                  style={{
                    ...getStatusStyle(caseItem.status),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                  }}
                >
                  {caseItem.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            opacity: animateCards ? 1 : 0,
            transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(10, 22, 40, 0.7) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(201, 168, 76, 0.1)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#f8fafc',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Star size={20} color="#c9a84c" />
              Quick Actions
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {[
                {
                  label: 'New Case',
                  icon: Plus,
                  color: '#10b981',
                  tab: 'cases',
                },
                {
                  label: 'Upload Files',
                  icon: Upload,
                  color: '#06b6d4',
                  tab: 'upload',
                },
                {
                  label: 'View Messages',
                  icon: Eye,
                  color: '#c9a84c',
                  tab: 'messages',
                },
              ].map((action) => {
                const ActionIcon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => setActiveTab(action.tab)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: 'rgba(4, 13, 26, 0.5)',
                      border: '1px solid rgba(248, 250, 252, 0.06)',
                      cursor: 'pointer',
                      color: '#f8fafc',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.25s ease',
                      width: '100%',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${action.color}15`;
                      e.currentTarget.style.border = `1px solid ${action.color}30`;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(4, 13, 26, 0.5)';
                      e.currentTarget.style.border =
                        '1px solid rgba(248, 250, 252, 0.06)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: `${action.color}15`,
                        border: `1px solid ${action.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ActionIcon size={18} color={action.color} />
                    </div>
                    <span>{action.label}</span>
                    <ChevronRight
                      size={16}
                      color="rgba(248, 250, 252, 0.3)"
                      style={{ marginLeft: 'auto' }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practice Info Card */}
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(201, 168, 76, 0.08) 0%, rgba(15, 34, 64, 0.6) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
              }}
            >
              <Shield size={18} color="#c9a84c" />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#c9a84c',
                }}
              >
                Practice Status
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'rgba(248, 250, 252, 0.5)' }}>
                  LSK License
                </span>
                <span
                  style={{
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: '500',
                  }}
                >
                  <CheckCircle size={12} /> Valid
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'rgba(248, 250, 252, 0.5)' }}>
                  Next Renewal
                </span>
                <span style={{ color: '#f8fafc', fontWeight: '500' }}>
                  March 2025
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'rgba(248, 250, 252, 0.5)' }}>
                  Availability
                </span>
                <span
                  style={{
                    color: availability ? '#10b981' : '#ef4444',
                    fontWeight: '500',
                  }}
                >
                  {availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div
      style={{
        maxWidth: '720px',
        opacity: animateCards ? 1 : 0,
        transform: animateCards ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#f8fafc',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
        }}
      >
        Settings
      </h1>
      <p
        style={{
          fontSize: '15px',
          color: 'rgba(248, 250, 252, 0.5)',
          margin: '0 0 32px 0',
        }}
      >
        Manage your profile, availability, and notification preferences
      </p>

      {/* Success Message */}
      {settingsSaved && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#10b981',
            fontSize: '14px',
            fontWeight: '500',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <CheckCircle size={18} />
          Settings saved successfully
        </div>
      )}

      {/* Profile Section */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(10, 22, 40, 0.7) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(201, 168, 76, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#f8fafc',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <User size={18} color="#c9a84c" />
          Profile Information
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '18px',
          }}
        >
          {[
            {
              label: 'Full Name',
              field: 'name',
              icon: User,
              type: 'text',
              full: false,
            },
            {
              label: 'Email Address',
              field: 'email',
              icon: Mail,
              type: 'email',
              full: false,
            },
            {
              label: 'Specialization',
              field: 'specialization',
              icon: Briefcase,
              type: 'text',
              full: true,
            },
            {
              label: 'Phone Number',
              field: 'phone',
              icon: Phone,
              type: 'tel',
              full: false,
            },
            {
              label: 'LSK Bar Number',
              field: 'barNumber',
              icon: Hash,
              type: 'text',
              full: false,
            },
          ].map((inputField) => {
            const FieldIcon = inputField.icon;
            return (
              <div
                key={inputField.field}
                style={{
                  gridColumn: inputField.full ? '1 / -1' : 'auto',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: 'rgba(248, 250, 252, 0.6)',
                    marginBottom: '8px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {inputField.label}
                </label>
                <div style={{ position: 'relative' }}>
                  <FieldIcon
                    size={16}
                    color="rgba(248, 250, 252, 0.3)"
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type={inputField.type}
                    value={profileForm[inputField.field]}
                    onChange={(e) =>
                      handleProfileChange(inputField.field, e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '10px',
                      border: '1px solid rgba(248, 250, 252, 0.08)',
                      background: 'rgba(4, 13, 26, 0.5)',
                      color: '#f8fafc',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.border =
                        '1px solid rgba(201, 168, 76, 0.4)';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(201, 168, 76, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border =
                        '1px solid rgba(248, 250, 252, 0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Availability Toggle */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(10, 22, 40, 0.7) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(201, 168, 76, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#f8fafc',
                margin: '0 0 6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Clock size={18} color="#c9a84c" />
              Availability
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(248, 250, 252, 0.5)',
                margin: '0',
              }}
            >
              When enabled, clients can see you as available for new
              consultations
            </p>
          </div>
          <button
            onClick={() => {
              setAvailability(!availability);
              setSettingsSaved(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {availability ? (
              <ToggleRight size={40} color="#10b981" />
            ) : (
              <ToggleLeft size={40} color="rgba(248, 250, 252, 0.3)" />
            )}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(10, 22, 40, 0.7) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(201, 168, 76, 0.1)',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '24px',
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#f8fafc',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Bell size={18} color="#c9a84c" />
          Notification Preferences
        </h3>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {[
            {
              field: 'emailNotifs',
              label: 'Email Notifications',
              desc: 'Receive updates via email',
            },
            {
              field: 'smsNotifs',
              label: 'SMS Notifications',
              desc: 'Receive alerts via SMS',
            },
            {
              field: 'caseUpdates',
              label: 'Case Updates',
              desc: 'Get notified on case status changes',
            },
            {
              field: 'clientMessages',
              label: 'Client Messages',
              desc: 'Alerts for new client messages',
            },
            {
              field: 'systemAlerts',
              label: 'System Alerts',
              desc: 'Important system notifications',
            },
          ].map((notif) => (
            <div
              key={notif.field}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(4, 13, 26, 0.3)',
                border: '1px solid rgba(248, 250, 252, 0.03)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(15, 34, 64, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(4, 13, 26, 0.3)';
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#f8fafc',
                    marginBottom: '2px',
                  }}
                >
                  {notif.label}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(248, 250, 252, 0.4)',
                  }}
                >
                  {notif.desc}
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange(notif.field)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {notifications[notif.field] ? (
                  <ToggleRight size={32} color="#c9a84c" />
                ) : (
                  <ToggleLeft size={32} color="rgba(248, 250, 252, 0.25)" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveSettings}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #c9a84c 0%, #d4b965 100%)',
          border: 'none',
          color: '#040d1a',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(201, 168, 76, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Save size={18} />
        Save Settings
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'cases':
        return <CaseManagement />;
      case 'upload':
        return <FileUpload />;
      case 'messages':
        return <ClientMessages />;
      case 'settings':
        return renderSettings();
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background:
          'linear-gradient(145deg, #040d1a 0%, #0a1628 40%, #0f2240 100%)',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          right: '20%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201, 168, 76, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '30%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Sidebar */}
      <aside
        style={{
          width: '272px',
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, rgba(10, 22, 40, 0.95) 0%, rgba(4, 13, 26, 0.98) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(201, 168, 76, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          boxShadow: '4px 0 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Lawyer Profile Section */}
        <div
          style={{
            padding: '28px 20px 24px',
            borderBottom: '1px solid rgba(201, 168, 76, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background:
                  'linear-gradient(135deg, #c9a84c 0%, #d4b965 50%, #e0ca7e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '700',
                color: '#040d1a',
                boxShadow: '0 4px 15px rgba(201, 168, 76, 0.25)',
                flexShrink: 0,
              }}
            >
              {(user?.name || 'WM')
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#f8fafc',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.name || 'Wanjiku Muthoni'}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                <CheckCircle size={10} />
                Verified Advocate
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {navItems.map((item) => {
            const NavIcon = item.icon;
            const isActive = activeTab === item.id;
            const isHovered = sidebarHovered === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setSidebarHovered(item.id)}
                onMouseLeave={() => setSidebarHovered(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive
                    ? '#c9a84c'
                    : isHovered
                      ? '#f8fafc'
                      : 'rgba(248, 250, 252, 0.55)',
                  background: isActive
                    ? 'rgba(201, 168, 76, 0.1)'
                    : isHovered
                      ? 'rgba(248, 250, 252, 0.04)'
                      : 'transparent',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  position: 'relative',
                  letterSpacing: '0.01em',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '20px',
                      borderRadius: '0 3px 3px 0',
                      background:
                        'linear-gradient(180deg, #c9a84c 0%, #d4b965 100%)',
                    }}
                  />
                )}
                <NavIcon
                  size={19}
                  style={{
                    opacity: isActive ? 1 : 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                />
                {item.label}
                {item.id === 'messages' && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      minWidth: '18px',
                      textAlign: 'center',
                      lineHeight: '1.3',
                    }}
                  >
                    3
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Sheria AI branding & Logout */}
        <div
          style={{
            padding: '16px 12px',
            borderTop: '1px solid rgba(201, 168, 76, 0.08)',
          }}
        >
          <button
            onClick={handleLogout}
            onMouseEnter={() => setSidebarHovered('logout')}
            onMouseLeave={() => setSidebarHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color:
                sidebarHovered === 'logout'
                  ? '#ef4444'
                  : 'rgba(248, 250, 252, 0.45)',
              background:
                sidebarHovered === 'logout'
                  ? 'rgba(239, 68, 68, 0.08)'
                  : 'transparent',
              transition: 'all 0.2s ease',
              textAlign: 'left',
            }}
          >
            <LogOut size={19} style={{ opacity: 0.7 }} />
            Log Out
          </button>

          {/* Sheria AI Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 0 4px',
            }}
          >
            <Scale size={16} color="#c9a84c" style={{ opacity: 0.6 }} />
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgba(201, 168, 76, 0.5)',
                letterSpacing: '0.06em',
              }}
            >
              LEGAL CLARITY
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: '272px',
          padding: '36px 40px',
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {renderContent()}
      </main>

      {/* Global keyframe animation injection */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(201, 168, 76, 0.2) transparent;
          }
          *::-webkit-scrollbar {
            width: 6px;
          }
          *::-webkit-scrollbar-track {
            background: transparent;
          }
          *::-webkit-scrollbar-thumb {
            background: rgba(201, 168, 76, 0.2);
            border-radius: 3px;
          }
          *::-webkit-scrollbar-thumb:hover {
            background: rgba(201, 168, 76, 0.35);
          }
          input::placeholder {
            color: rgba(248, 250, 252, 0.25);
          }
        `}
      </style>
    </div>
  );
};

export default LawyerDashboard;
