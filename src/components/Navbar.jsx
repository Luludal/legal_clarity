import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Scale, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const Navbar = ({ onAuthClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isLanding = !user;
  const isLawyer = user?.role === 'lawyer';

  const landingLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
  ];

  const userLinks = [
    { label: 'Dashboard', href: '/user' },
    { label: 'Contract Review', href: '/user' },
    { label: 'My Lawyers', href: '/user' },
  ];

  const lawyerLinks = [
    { label: 'Dashboard', href: '/lawyer' },
    { label: 'Cases', href: '/lawyer' },
    { label: 'Vault', href: '/lawyer' },
    { label: 'Messages', href: '/lawyer' },
  ];

  const links = isLanding ? landingLinks : isLawyer ? lawyerLinks : userLinks;

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const targetId = href.replace('#', '');
        const el = document.getElementById(targetId) || document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (href) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .sheria-nav-link {
          position: relative;
          color: ${isDark ? 'rgba(255,255,255,0.75)' : '#1e293b'};
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
        }
        .sheria-nav-link:hover {
          color: #c9a84c;
          background: rgba(201,168,76,0.08);
        }
        .sheria-nav-link.active {
          color: #c9a84c;
          background: rgba(201,168,76,0.12);
        }
        .sheria-nav-btn {
          padding: 8px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: inherit;
          letter-spacing: 0.5px;
        }
        .sheria-nav-btn-outline {
          background: transparent;
          color: #c9a84c;
          border: 1.5px solid rgba(201,168,76,0.4);
        }
        .sheria-nav-btn-outline:hover {
          border-color: #c9a84c;
          background: rgba(201,168,76,0.08);
          box-shadow: 0 0 20px rgba(201,168,76,0.15);
        }
        .sheria-nav-btn-filled {
          background: linear-gradient(135deg, #c9a84c, #a8872e);
          color: #0a1628;
        }
        .sheria-nav-btn-filled:hover {
          background: linear-gradient(135deg, #e8d48b, #c9a84c);
          box-shadow: 0 4px 20px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }
        .sheria-hamburger {
          display: none;
          background: none;
          border: none;
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .sheria-hamburger:hover {
          color: #c9a84c;
          background: rgba(201,168,76,0.1);
        }
        @media (max-width: 768px) {
          .sheria-nav-center, .sheria-nav-right {
            display: none !important;
          }
          .sheria-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

      <nav
        className="sheria-nav"
        style={{
          ...navStyles.navbar,
          background: scrolled
            ? (isDark ? 'rgba(10, 22, 40, 0.94)' : 'rgba(255, 255, 255, 0.96)')
            : (isDark ? 'rgba(10, 22, 40, 0.7)' : 'rgba(255, 255, 255, 0.88)'),
          borderBottom: scrolled
            ? (isDark ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(201,168,76,0.3)')
            : (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)'),
          boxShadow: scrolled
            ? (isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.06)')
            : 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          animation: 'navSlideDown 0.6s ease-out',
        }}
      >
        <div style={navStyles.inner}>
          {/* Left: Logo */}
          <div
            style={navStyles.logoWrap}
            onClick={() => navigate(user ? (isLawyer ? '/lawyer' : '/user') : '/')}
          >
            <Logo size={34} showText={true} />
          </div>

          {/* Center: Links */}
          <div className="sheria-nav-center" style={navStyles.center}>
            {links.map((link) => (
              <button
                key={link.label}
                className={`sheria-nav-link ${isActive(link.href) ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Auth buttons or user info */}
          <div className="sheria-nav-right" style={navStyles.right}>
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 22, 40, 0.08)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#c9a84c',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              {isDark ? <Sun size={15} color="#e0ca7e" /> : <Moon size={15} color="#c9a84c" />}
              <span style={{ fontSize: '11px', textTransform: 'capitalize' }}>{theme}</span>
            </button>

            {!user ? (
              <>
                <button
                  className="sheria-nav-btn sheria-nav-btn-outline"
                  onClick={() => onAuthClick ? onAuthClick('login') : navigate('/')}
                >
                  Login
                </button>
                <button
                  className="sheria-nav-btn sheria-nav-btn-filled"
                  onClick={() => onAuthClick ? onAuthClick('signup') : navigate('/')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div style={navStyles.userSection}>
                <div style={navStyles.userInfo}>
                  <div style={navStyles.avatar}>
                    {isLawyer ? (
                      <Scale size={16} color="#0a1628" />
                    ) : (
                      <User size={16} color="#0a1628" />
                    )}
                  </div>
                  <div style={navStyles.userMeta}>
                    <span style={navStyles.userName}>{user.name || 'User'}</span>
                    <span style={navStyles.userRole}>
                      {isLawyer ? 'Lawyer' : 'Client'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={navStyles.logoutBtn}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="sheria-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={navStyles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              ...navStyles.mobileMenu,
              background: isDark ? 'rgba(10, 22, 40, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              borderLeft: isDark ? '1px solid rgba(201,168,76,0.2)' : '1px solid rgba(201,168,76,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={navStyles.mobileHeader}>
              <Logo size={30} showText={true} />
              <button
                className="sheria-hamburger"
                style={{ display: 'flex' }}
                onClick={() => setMobileOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div style={navStyles.mobileLinks}>
              {links.map((link) => (
                <button
                  key={link.label}
                  className={`sheria-nav-link ${isActive(link.href) ? 'active' : ''}`}
                  style={{ width: '100%', textAlign: 'left', fontSize: '16px', padding: '12px 16px' }}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div style={navStyles.mobileDivider} />

            <div style={navStyles.mobileActions}>
              <button
                onClick={toggleTheme}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 22, 40, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 600
                }}
              >
                {isDark ? <Sun size={16} color="#e0ca7e" /> : <Moon size={16} color="#c9a84c" />}
                <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
              </button>

              {!user ? (
                <>
                  <button
                    className="sheria-nav-btn sheria-nav-btn-outline"
                    style={{ width: '100%', padding: '12px' }}
                    onClick={() => { if (onAuthClick) onAuthClick('login'); else navigate('/'); setMobileOpen(false); }}
                  >
                    Login
                  </button>
                  <button
                    className="sheria-nav-btn sheria-nav-btn-filled"
                    style={{ width: '100%', padding: '12px' }}
                    onClick={() => { if (onAuthClick) onAuthClick('signup'); else navigate('/'); setMobileOpen(false); }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <div style={{ ...navStyles.userInfo, padding: '8px 0' }}>
                    <div style={navStyles.avatar}>
                      {isLawyer ? (
                        <Scale size={16} color="#0a1628" />
                      ) : (
                        <User size={16} color="#0a1628" />
                      )}
                    </div>
                    <div style={navStyles.userMeta}>
                      <span style={navStyles.userName}>{user.name || 'User'}</span>
                      <span style={navStyles.userRole}>
                        {isLawyer ? 'Lawyer' : 'Client'}
                      </span>
                    </div>
                  </div>
                  <button
                    className="sheria-nav-btn sheria-nav-btn-outline"
                    style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const navStyles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.4s ease',
    padding: '0 24px',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '68px',
  },
  logoWrap: {
    cursor: 'pointer',
    flexShrink: 0,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #c9a84c, #e8d48b)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  userRole: {
    color: '#c9a84c',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    lineHeight: 1.2,
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  // Mobile
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: 1001,
    animation: 'mobileMenuIn 0.3s ease-out',
  },
  mobileMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '300px',
    maxWidth: '85vw',
    background: 'rgba(10, 22, 40, 0.97)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    borderLeft: '1px solid rgba(201,168,76,0.15)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    animation: 'mobileMenuIn 0.35s ease-out',
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '8px',
  },
  mobileLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  mobileDivider: {
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '8px 0',
  },
  mobileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    paddingTop: '4px',
  },
};

export default Navbar;
