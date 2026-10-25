import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  FileText,
  Bot,
  Scale,
  Home,
  LogOut,
  Upload,
  Settings,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Activity,
  Bell,
  Star,
  BookOpen,
  Filter,
  X,
  Menu,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AIChatBot from '../components/AIChatBot';
import ContractReview from '../components/ContractReview';
import LawyerCommunication from '../components/LawyerCommunication';
import { constitutionalArticles } from '../data/kenyanLaw';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      const timer = setTimeout(() => setAnimateStats(true), 200);
      return () => clearTimeout(timer);
    }
    setAnimateStats(false);
  }, [activeTab]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'contract-review', label: 'Contract Review', icon: FileText },
    { id: 'my-lawyers', label: 'My Lawyers', icon: MessageSquare },
    { id: 'legal-resources', label: 'Legal Resources', icon: Scale },
  ];

  const statsData = [
    {
      id: 'consultations',
      label: 'Active Consultations',
      value: 3,
      icon: Users,
      color: '#06b6d4',
      change: '+2 this week',
    },
    {
      id: 'contracts',
      label: 'Contracts Reviewed',
      value: 12,
      icon: FileText,
      color: '#10b981',
      change: '+5 this month',
    },
    {
      id: 'messages',
      label: 'Messages',
      value: 28,
      icon: MessageSquare,
      color: '#c9a84c',
      change: '4 unread',
    },
  ];

  const quickActions = [
    {
      id: 'ask-ai',
      label: 'Ask AI',
      description: 'Get instant legal guidance from our AI assistant',
      icon: Sparkles,
      color: '#c9a84c',
      tab: 'ai-assistant',
    },
    {
      id: 'upload-contract',
      label: 'Upload Contract',
      description: 'Submit a contract for AI-powered review and analysis',
      icon: Upload,
      color: '#10b981',
      tab: 'contract-review',
    },
    {
      id: 'find-lawyer',
      label: 'Find a Lawyer',
      description: 'Connect with verified Kenyan legal professionals',
      icon: Briefcase,
      color: '#06b6d4',
      tab: 'my-lawyers',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'ai',
      title: 'AI Consultation',
      description: 'Asked about tenant rights under the Landlord and Tenant Act',
      time: '2 hours ago',
      icon: Bot,
      color: '#c9a84c',
    },
    {
      id: 2,
      type: 'contract',
      title: 'Contract Reviewed',
      description: 'Employment contract analysis completed — 3 risk areas identified',
      time: '1 day ago',
      icon: FileText,
      color: '#10b981',
    },
    {
      id: 3,
      type: 'lawyer',
      title: 'Lawyer Message',
      description: 'Adv. Wanjiku responded to your property dispute inquiry',
      time: '2 days ago',
      icon: MessageSquare,
      color: '#06b6d4',
    },
    {
      id: 4,
      type: 'resource',
      title: 'Resource Accessed',
      description: 'Viewed Chapter 4: Bill of Rights — Article 27 on Equality',
      time: '3 days ago',
      icon: BookOpen,
      color: '#8b5cf6',
    },
    {
      id: 5,
      type: 'contract',
      title: 'Contract Uploaded',
      description: 'Lease agreement submitted for review',
      time: '4 days ago',
      icon: Upload,
      color: '#ef4444',
    },
  ];

  const chapters = ['All', ...new Set((constitutionalArticles || []).map((a) => a.chapter).filter(Boolean))];

  const filteredArticles = (constitutionalArticles || []).filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      (article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.articleNumber && String(article.articleNumber).includes(searchQuery));
    const matchesChapter = selectedChapter === 'All' || article.chapter === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderSidebar = () => (
    <div
      style={{
        width: sidebarOpen ? '280px' : '80px',
        minWidth: sidebarOpen ? '280px' : '80px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        background: 'linear-gradient(180deg, rgba(10, 22, 40, 0.98) 0%, rgba(4, 13, 26, 0.99) 100%)',
        borderRight: '1px solid rgba(201, 168, 76, 0.15)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* User Profile Section */}
      <div
        style={{
          padding: sidebarOpen ? '28px 24px' : '28px 16px',
          borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          transition: 'padding 0.3s ease',
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            minWidth: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #c9a84c 0%, #d4b965 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '700',
            color: '#040d1a',
            boxShadow: '0 4px 15px rgba(201, 168, 76, 0.3)',
            cursor: 'pointer',
          }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        {sidebarOpen && (
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <div
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#f8fafc',
                letterSpacing: '0.01em',
              }}
            >
              {user?.name || 'User'}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(201, 168, 76, 0.7)',
                marginTop: '2px',
                letterSpacing: '0.02em',
              }}
            >
              {user?.email || 'user@demo.com'}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav
        style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          overflowY: 'auto',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isHovered = hoveredNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: sidebarOpen ? '13px 16px' : '13px 0',
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(201, 168, 76, 0.18) 0%, rgba(201, 168, 76, 0.08) 100%)'
                  : isHovered
                  ? 'rgba(201, 168, 76, 0.08)'
                  : 'transparent',
                color: isActive ? '#c9a84c' : isHovered ? '#d4b965' : 'rgba(248, 250, 252, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '60%',
                    borderRadius: '0 4px 4px 0',
                    background: 'linear-gradient(180deg, #c9a84c 0%, #d4b965 100%)',
                    boxShadow: '0 0 8px rgba(201, 168, 76, 0.5)',
                  }}
                />
              )}
              <Icon
                size={20}
                style={{
                  minWidth: '20px',
                  filter: isActive ? 'drop-shadow(0 0 6px rgba(201, 168, 76, 0.4))' : 'none',
                  transition: 'filter 0.25s ease',
                }}
              />
              {sidebarOpen && (
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '500',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        style={{
          padding: '16px 12px',
          borderTop: '1px solid rgba(201, 168, 76, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <button
          onMouseEnter={() => setHoveredNav('settings')}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: sidebarOpen ? '13px 16px' : '13px 0',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: hoveredNav === 'settings' ? 'rgba(248, 250, 252, 0.05)' : 'transparent',
            color: 'rgba(248, 250, 252, 0.5)',
            transition: 'all 0.25s ease',
            width: '100%',
            fontFamily: 'inherit',
          }}
        >
          <Settings size={20} style={{ minWidth: '20px' }} />
          {sidebarOpen && (
            <span style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Settings</span>
          )}
        </button>
        <button
          onClick={handleLogout}
          onMouseEnter={() => setHoveredNav('logout')}
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: sidebarOpen ? '13px 16px' : '13px 0',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: hoveredNav === 'logout' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            color: hoveredNav === 'logout' ? '#ef4444' : 'rgba(248, 250, 252, 0.5)',
            transition: 'all 0.25s ease',
            width: '100%',
            fontFamily: 'inherit',
          }}
        >
          <LogOut size={20} style={{ minWidth: '20px' }} />
          {sidebarOpen && (
            <span style={{ fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Logout</span>
          )}
        </button>
      </div>
    </div>
  );

  const renderMobileSidebar = () => (
    <>
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 13, 26, 0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: mobileSidebarOpen ? 0 : '-300px',
          width: '280px',
          height: '100vh',
          zIndex: 100,
          background: 'linear-gradient(180deg, rgba(10, 22, 40, 0.99) 0%, rgba(4, 13, 26, 1) 100%)',
          borderRight: '1px solid rgba(201, 168, 76, 0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Mobile Close Button */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b965 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: '700',
                color: '#040d1a',
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#f8fafc' }}>
                {user?.name || 'User'}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(201, 168, 76, 0.7)' }}>
                {user?.email || 'user@demo.com'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(248, 250, 252, 0.6)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>
        {/* Mobile Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(201, 168, 76, 0.18) 0%, rgba(201, 168, 76, 0.08) 100%)'
                    : 'transparent',
                  color: isActive ? '#c9a84c' : 'rgba(248, 250, 252, 0.6)',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '60%',
                      borderRadius: '0 4px 4px 0',
                      background: 'linear-gradient(180deg, #c9a84c 0%, #d4b965 100%)',
                    }}
                  />
                )}
                <Icon size={20} />
                <span style={{ fontSize: '14px', fontWeight: isActive ? '600' : '500' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(201, 168, 76, 0.12)' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '13px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              background: 'rgba(239, 68, 68, 0.08)',
              color: '#ef4444',
              width: '100%',
              fontFamily: 'inherit',
            }}
          >
            <LogOut size={20} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  const renderDashboardOverview = () => (
    <div style={{ animation: 'fadeInUp 0.5s ease forwards' }}>
      {/* Welcome Section */}
      <div
        style={{
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#f8fafc',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Welcome back,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #e0ca7e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {user?.name?.split(' ')[0] || 'User'}
            </span>
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(248, 250, 252, 0.5)', margin: 0 }}>
            Here&apos;s your legal activity overview for today
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              position: 'relative',
              background: 'rgba(15, 34, 64, 0.6)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderRadius: '12px',
              padding: '10px',
              cursor: 'pointer',
              color: 'rgba(248, 250, 252, 0.6)',
              transition: 'all 0.25s ease',
            }}
          >
            <Bell size={20} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 6px rgba(239, 68, 68, 0.5)',
              }}
            />
          </button>
        </div>
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
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          const isHovered = hoveredCard === stat.id;
          return (
            <div
              key={stat.id}
              onMouseEnter={() => setHoveredCard(stat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, rgba(15, 34, 64, 0.8) 0%, rgba(21, 46, 84, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(21, 46, 84, 0.4) 100%)',
                border: `1px solid ${isHovered ? 'rgba(201, 168, 76, 0.25)' : 'rgba(201, 168, 76, 0.1)'}`,
                borderRadius: '16px',
                padding: '24px',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateY(${animateStats ? '0' : '20px'}) ${isHovered ? 'translateY(-2px)' : ''}`,
                opacity: animateStats ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${stat.color}10 0%, transparent 70%)`,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                  }}
                >
                  <Icon size={22} />
                </div>
                <TrendingUp size={16} style={{ color: '#10b981', opacity: 0.7 }} />
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
                  fontSize: '13px',
                  color: 'rgba(248, 250, 252, 0.5)',
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
                  fontWeight: '500',
                  opacity: 0.8,
                }}
              >
                {stat.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#f8fafc',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isHovered = hoveredAction === action.id;
            return (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.tab)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                style={{
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(15, 34, 64, 0.8) 0%, rgba(21, 46, 84, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(15, 34, 64, 0.5) 0%, rgba(21, 46, 84, 0.3) 100%)',
                  border: `1px solid ${isHovered ? `${action.color}40` : 'rgba(201, 168, 76, 0.1)'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 8px 25px ${action.color}15` : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  fontFamily: 'inherit',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}08 100%)`,
                    border: `1px solid ${action.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.color,
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#f8fafc',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {action.label}
                    <ChevronRight
                      size={16}
                      style={{
                        color: action.color,
                        transition: 'transform 0.25s ease',
                        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'rgba(248, 250, 252, 0.45)',
                      lineHeight: '1.5',
                    }}
                  >
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <h2
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#f8fafc',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Recent Activity
          </h2>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#c9a84c',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'inherit',
            }}
          >
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(15, 34, 64, 0.5) 0%, rgba(21, 46, 84, 0.3) 100%)',
            border: '1px solid rgba(201, 168, 76, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
          }}
        >
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;
            const isHovered = hoveredActivity === activity.id;
            return (
              <div
                key={activity.id}
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 24px',
                  borderBottom:
                    index < recentActivity.length - 1 ? '1px solid rgba(201, 168, 76, 0.06)' : 'none',
                  transition: 'background 0.2s ease',
                  background: isHovered ? 'rgba(201, 168, 76, 0.04)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    minWidth: '40px',
                    borderRadius: '10px',
                    background: `${activity.color}12`,
                    border: `1px solid ${activity.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activity.color,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#f8fafc',
                      marginBottom: '3px',
                    }}
                  >
                    {activity.title}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'rgba(248, 250, 252, 0.45)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activity.description}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(248, 250, 252, 0.3)',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLegalResources = () => (
    <div style={{ animation: 'fadeInUp 0.5s ease forwards' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: '700',
            color: '#f8fafc',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Legal Resources
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(248, 250, 252, 0.5)', margin: 0 }}>
          Browse the Constitution of Kenya, 2010 — Articles &amp; Chapters
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* Search Input */}
        <div
          style={{
            flex: '1 1 320px',
            position: 'relative',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(201, 168, 76, 0.5)',
            }}
          />
          <input
            type="text"
            placeholder="Search articles by title, content, or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 46px',
              background: 'rgba(15, 34, 64, 0.6)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.25s ease',
              backdropFilter: 'blur(8px)',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(201, 168, 76, 0.4)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(201, 168, 76, 0.15)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(248, 250, 252, 0.4)',
                cursor: 'pointer',
                padding: '2px',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Chapter Filter */}
        <div style={{ position: 'relative', minWidth: '200px' }}>
          <Filter
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(201, 168, 76, 0.5)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 40px',
              background: 'rgba(15, 34, 64, 0.6)',
              border: '1px solid rgba(201, 168, 76, 0.15)',
              borderRadius: '12px',
              color: '#f8fafc',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          >
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter} style={{ background: '#0a1628', color: '#f8fafc' }}>
                {chapter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div
        style={{
          fontSize: '13px',
          color: 'rgba(248, 250, 252, 0.4)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <BookOpen size={14} />
        {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        {selectedChapter !== 'All' && (
          <span>
            in <span style={{ color: '#c9a84c' }}>{selectedChapter}</span>
          </span>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'linear-gradient(135deg, rgba(15, 34, 64, 0.4) 0%, rgba(21, 46, 84, 0.2) 100%)',
            border: '1px solid rgba(201, 168, 76, 0.08)',
            borderRadius: '16px',
          }}
        >
          <Search size={40} style={{ color: 'rgba(201, 168, 76, 0.3)', marginBottom: '16px' }} />
          <p style={{ fontSize: '16px', color: 'rgba(248, 250, 252, 0.5)', margin: '0 0 8px 0' }}>
            No articles found
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(248, 250, 252, 0.3)', margin: 0 }}>
            Try adjusting your search query or chapter filter
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredArticles.map((article, index) => {
            const isExpanded = expandedArticle === index;
            const isHovered = hoveredArticle === index;
            return (
              <div
                key={index}
                onClick={() => setExpandedArticle(isExpanded ? null : index)}
                onMouseEnter={() => setHoveredArticle(index)}
                onMouseLeave={() => setHoveredArticle(null)}
                style={{
                  background: isExpanded
                    ? 'linear-gradient(135deg, rgba(15, 34, 64, 0.7) 0%, rgba(21, 46, 84, 0.5) 100%)'
                    : isHovered
                    ? 'linear-gradient(135deg, rgba(15, 34, 64, 0.6) 0%, rgba(21, 46, 84, 0.4) 100%)'
                    : 'linear-gradient(135deg, rgba(15, 34, 64, 0.45) 0%, rgba(21, 46, 84, 0.25) 100%)',
                  border: `1px solid ${
                    isExpanded
                      ? 'rgba(201, 168, 76, 0.25)'
                      : isHovered
                      ? 'rgba(201, 168, 76, 0.18)'
                      : 'rgba(201, 168, 76, 0.08)'
                  }`,
                  borderRadius: '14px',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#c9a84c',
                          background: 'rgba(201, 168, 76, 0.12)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid rgba(201, 168, 76, 0.2)',
                          letterSpacing: '0.03em',
                        }}
                      >
                        Article {article.articleNumber || '—'}
                      </span>
                      {article.chapter && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '500',
                            color: 'rgba(6, 182, 212, 0.8)',
                            background: 'rgba(6, 182, 212, 0.08)',
                            padding: '3px 8px',
                            borderRadius: '5px',
                          }}
                        >
                          {article.chapter}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#f8fafc',
                        margin: '0 0 6px 0',
                        lineHeight: '1.4',
                      }}
                    >
                      {article.title || 'Untitled Article'}
                    </h3>
                    <p
                      style={{
                        fontSize: '13px',
                        color: 'rgba(248, 250, 252, 0.45)',
                        margin: 0,
                        lineHeight: '1.6',
                        overflow: isExpanded ? 'visible' : 'hidden',
                        textOverflow: isExpanded ? 'unset' : 'ellipsis',
                        whiteSpace: isExpanded ? 'pre-wrap' : 'nowrap',
                        maxWidth: isExpanded ? '100%' : '100%',
                      }}
                    >
                      {article.content || 'Content not available.'}
                    </p>
                  </div>
                  <div
                    style={{
                      color: 'rgba(201, 168, 76, 0.5)',
                      transition: 'transform 0.3s ease',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      minWidth: '20px',
                      marginTop: '4px',
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(201, 168, 76, 0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'rgba(248, 250, 252, 0.6)',
                        lineHeight: '1.8',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {article.content || 'Full content not available for this article.'}
                    </div>
                    {article.subsections && article.subsections.length > 0 && (
                      <div style={{ marginTop: '16px' }}>
                        <h4
                          style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#c9a84c',
                            margin: '0 0 10px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          Subsections
                        </h4>
                        {article.subsections.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            style={{
                              padding: '10px 14px',
                              background: 'rgba(4, 13, 26, 0.4)',
                              borderRadius: '8px',
                              marginBottom: '6px',
                              border: '1px solid rgba(201, 168, 76, 0.06)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '12px',
                                color: '#d4b965',
                                fontWeight: '600',
                                marginRight: '8px',
                              }}
                            >
                              ({subIndex + 1})
                            </span>
                            <span
                              style={{ fontSize: '13px', color: 'rgba(248, 250, 252, 0.55)', lineHeight: '1.6' }}
                            >
                              {sub}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'ai-assistant':
        return <AIChatBot />;
      case 'contract-review':
        return <ContractReview />;
      case 'my-lawyers':
        return <LawyerCommunication />;
      case 'legal-resources':
        return renderLegalResources();
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #040d1a 0%, #0a1628 50%, #0f2240 100%)',
        color: '#f8fafc',
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Inject Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @media (max-width: 768px) {
            .desktop-sidebar { display: none !important; }
            .mobile-header { display: flex !important; }
          }
          @media (min-width: 769px) {
            .mobile-header { display: none !important; }
            .mobile-sidebar-wrapper { display: none !important; }
          }

          /* Scrollbar Styles */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(201, 168, 76, 0.2); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(201, 168, 76, 0.35); }

          /* Select option styling */
          select option { background: #0a1628; color: #f8fafc; }

          /* Input placeholder */
          input::placeholder { color: rgba(248, 250, 252, 0.3); }
        `}
      </style>

      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">{renderSidebar()}</div>

      {/* Mobile Sidebar */}
      <div className="mobile-sidebar-wrapper">{renderMobileSidebar()}</div>

      {/* Mobile Top Header */}
      <div
        className="mobile-header"
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(10, 22, 40, 0.95)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
          backdropFilter: 'blur(16px)',
          zIndex: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}
      >
        <button
          onClick={() => setMobileSidebarOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#f8fafc',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <Menu size={24} />
        </button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Scale size={20} style={{ color: '#c9a84c' }} />
          <span style={{ fontSize: '16px', fontWeight: '700', color: '#c9a84c' }}>Legal Clarity</span>
        </div>
        <button
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            color: 'rgba(248, 250, 252, 0.6)',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#ef4444',
            }}
          />
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: window.innerWidth > 768 ? (sidebarOpen ? '280px' : '80px') : '0',
          paddingTop: window.innerWidth <= 768 ? '76px' : '0',
          minHeight: '100vh',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          style={{
            padding: activeTab === 'ai-assistant' || activeTab === 'my-lawyers' ? '0' : '32px 32px 48px',
            maxWidth: activeTab === 'ai-assistant' || activeTab === 'my-lawyers' ? '100%' : '1200px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Tab Header for non-dashboard tabs (except components that handle their own header) */}
          {activeTab !== 'dashboard' &&
            activeTab !== 'ai-assistant' &&
            activeTab !== 'contract-review' &&
            activeTab !== 'my-lawyers' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                  fontSize: '12px',
                  color: 'rgba(248, 250, 252, 0.35)',
                }}
              >
                <Home size={12} />
                <span>Dashboard</span>
                <ChevronRight size={12} />
                <span style={{ color: '#c9a84c' }}>
                  {navItems.find((item) => item.id === activeTab)?.label}
                </span>
              </div>
            )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
