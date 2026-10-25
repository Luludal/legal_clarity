import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, CheckCircle, ShieldCheck, FileText, Users, Scale } from 'lucide-react';
import Logo from '../components/Logo';
import AuthModal from '../components/AuthModal';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/* ---------------- Keyframe Injection ---------------- */
const injectKeyframes = () => {
  if (document.getElementById('legal-landing-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'legal-landing-keyframes';
  style.textContent = `
    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
};

/* ---------------- Scroll-Reveal Wrapper ---------------- */
const ScrollReveal = ({ children, delay = 0, style = {} }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ---------------- Scales Emblem Watermark ---------------- */
const ScalesWatermark = ({ isDark }) => (
  <svg
    viewBox="0 0 400 400"
    style={{
      position: 'absolute',
      width: 480,
      height: 480,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: isDark ? 0.04 : 0.03,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <rect x="195" y="80" width="10" height="240" fill="#c9a84c" rx="5" />
    <polygon points="200,50 180,90 220,90" fill="#c9a84c" />
    <rect x="150" y="310" width="100" height="14" rx="7" fill="#c9a84c" />
    <line x1="200" y1="100" x2="80" y2="140" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" />
    <line x1="200" y1="100" x2="320" y2="140" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" />
    <path d="M50,150 Q80,200 110,150" stroke="#c9a84c" strokeWidth="4" fill="none" />
    <path d="M290,150 Q320,200 350,150" stroke="#c9a84c" strokeWidth="4" fill="none" />
  </svg>
);

/* ---------------- Section Title ---------------- */
const SectionTitle = ({ children, subtitle, badge, isDark }) => (
  <div style={{ textAlign: 'center', marginBottom: 50 }}>
    {badge && (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: isDark ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.18)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 100,
          padding: '6px 16px',
          marginBottom: 16,
          fontSize: 12,
          fontWeight: 600,
          color: '#c9a84c',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {badge}
      </div>
    )}
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(28px, 4vw, 42px)',
        fontWeight: 700,
        margin: '0 0 12px',
        lineHeight: 1.25,
        color: isDark ? '#f8fafc' : '#0f172a',
      }}
    >
      {children}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          maxWidth: 620,
          margin: '0 auto',
          color: isDark ? '#94a3b8' : '#475569',
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

/* ---------------- Landing Page Component ---------------- */
export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('user');

  useEffect(() => {
    injectKeyframes();
    if (user) {
      navigate(user.role === 'lawyer' ? '/lawyer' : '/user');
    }
  }, [user, navigate]);

  const openAuth = (role, mode) => {
    setAuthRole(role);
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reusable dynamic color tokens
  const titleColor = isDark ? '#f8fafc' : '#0f172a';
  const descColor = isDark ? '#94a3b8' : '#475569';
  const cardBg = isDark ? 'rgba(15, 34, 64, 0.75)' : '#ffffff';
  const cardBorder = isDark ? 'rgba(201, 168, 76, 0.25)' : 'rgba(201, 168, 76, 0.35)';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <Navbar onAuthClick={(mode) => openAuth('user', mode || 'login')} />

      {/* ========================================================
          HERO SECTION (#home)
          Purpose in at most 2 words: "Legal Clarity"
          ======================================================== */}
      <section
        id="home"
        style={{
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '120px 24px 70px',
          overflow: 'hidden',
          background: isDark
            ? 'linear-gradient(135deg, #040d1a 0%, #0a1628 35%, #0f2240 70%, #152e54 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)',
        }}
      >
        <ScalesWatermark isDark={isDark} />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          {/* Subtle Justice Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: isDark ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.18)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 100,
              padding: '8px 20px',
              marginBottom: 28,
              fontSize: 13,
              fontWeight: 600,
              color: '#c9a84c',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
            Kenyan Legal Intelligence & Advocate Network
          </div>

          {/* Headline in at most 2 words */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(44px, 8vw, 84px)',
              fontWeight: 800,
              lineHeight: 1.08,
              margin: '0 0 24px',
              color: titleColor,
              letterSpacing: '-1px',
            }}
          >
            Legal Clarity
          </h1>

          {/* Subtitle explicitly clarifying individual scope & lawyer scope */}
          <p
            style={{
              fontSize: 'clamp(16px, 2.2vw, 19px)',
              lineHeight: 1.7,
              color: descColor,
              maxWidth: 680,
              margin: '0 auto 40px',
            }}
          >
            A dedicated legal platform for Kenya. For individuals, your access is focused purely on 
            <strong style={{ color: '#c9a84c' }}> Contract Review</strong> and <strong style={{ color: '#c9a84c' }}>Direct Lawyer Consultation</strong>. 
            For advocates, a secure suite for case management and client dossiers.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollToSection('how-it-works')}
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)',
                color: '#040d1a',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px rgba(201, 168, 76, 0.3)',
                transition: 'transform 0.2s ease',
              }}
            >
              See How It Works <ArrowDown size={18} />
            </button>

            <button
              onClick={() => scrollToSection('portals')}
              style={{
                background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.9)',
                color: titleColor,
                border: '1px solid rgba(201, 168, 76, 0.35)',
                borderRadius: '12px',
                padding: '16px 28px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
              }}
            >
              Access Portals
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS SECTION (#how-it-works, #about)
          Placed immediately after Hero so visitors understand first
          ======================================================== */}
      <section
        id="how-it-works"
        style={{
          padding: '100px 24px',
          background: isDark ? 'rgba(10, 22, 40, 0.85)' : '#ffffff',
          position: 'relative',
        }}
      >
        <span id="about" style={{ position: 'absolute', top: -80 }} />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal>
            <SectionTitle
              badge="Platform Workflow"
              subtitle="Understand the exact scope and step-by-step process before creating an account"
              isDark={isDark}
            >
              How The Platform Works
            </SectionTitle>
          </ScrollReveal>

          {/* Scope Specification Notice for Individuals */}
          <ScrollReveal delay={100}>
            <div
              style={{
                background: isDark ? 'rgba(201, 168, 76, 0.08)' : 'rgba(201, 168, 76, 0.12)',
                border: '1px solid rgba(201, 168, 76, 0.35)',
                borderRadius: '16px',
                padding: '18px 24px',
                marginBottom: 50,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(201, 168, 76, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#c9a84c'
              }}>
                <FileText size={20} />
              </div>
              <div style={{ fontSize: '0.92rem', color: titleColor, lineHeight: 1.5 }}>
                <strong style={{ color: '#c9a84c' }}>Important Notice for Individuals: </strong>
                For individual clients, the platform is <strong>purely limited to automated Contract Review and direct Lawyer Interaction</strong>. You can upload contracts to detect loopholes, get statutory fee estimates, and securely consult qualified advocates.
              </div>
            </div>
          </ScrollReveal>

          {/* Side-by-Side Workflow Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* 1. For Individuals Card */}
            <ScrollReveal delay={150}>
              <div
                style={{
                  background: cardBg,
                  padding: '36px 30px',
                  borderRadius: '20px',
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.06)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(201, 168, 76, 0.15)',
                    color: '#c9a84c',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    Individual Scope
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> Contract Review & Legal Advice
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', margin: '0 0 16px', fontFamily: "'Playfair Display', serif", color: titleColor }}>
                  For Individuals (Clients)
                </h3>
                <p style={{ color: descColor, fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  You have access to automated contract diagnostics and direct lawyer communication:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#c9a84c',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>1</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Upload Any Contract</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Upload employment agreements, tenancy leases, or NDAs. The AI analyzes clauses against Kenyan statutory standards.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#c9a84c',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>2</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Identify Loopholes & Risks</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Reveals ambiguous termination clauses, unlimited liabilities, missing Kenyan jurisdiction clauses, and risk scores.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#c9a84c',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>3</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Interact with a Verified Lawyer</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Message Law Society of Kenya (LSK) certified advocates directly, share redlined contract reports, and request representation.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. For Lawyers Card */}
            <ScrollReveal delay={250}>
              <div
                style={{
                  background: cardBg,
                  padding: '36px 30px',
                  borderRadius: '20px',
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.06)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: '#06b6d4',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    Advocate Scope
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> Practice & File Records
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', margin: '0 0 16px', fontFamily: "'Playfair Display', serif", color: titleColor }}>
                  For Lawyers (Advocates)
                </h3>
                <p style={{ color: descColor, fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  A specialized workspace to manage active litigation, pleadings, and client inquiries:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>1</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Encrypted Pleadings Vault</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Upload and index court pleadings, affidavits, and exhibits under 256-bit AES encryption compliant with data protection laws.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>2</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Case Docket & Diaries</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Maintain active records of court numbers, next hearing schedules, and cause list diaries across all Kenyan courts.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#06b6d4',
                      color: '#040d1a',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>3</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '3px', color: titleColor }}>Client Consultations</div>
                      <div style={{ fontSize: '0.85rem', color: descColor }}>
                        Communicate directly with clients through encrypted chat protected by legal professional privilege.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ========================================================
          CORE FEATURES SECTION (#features)
          ======================================================== */}
      <section
        id="features"
        style={{
          padding: '100px 24px',
          background: isDark ? 'linear-gradient(180deg, #0a1628 0%, #0f2240 100%)' : '#f8fafc',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ScrollReveal>
            <SectionTitle
              badge="Capabilities"
              subtitle="Specialized technology built around Kenyan legal standards"
              isDark={isDark}
            >
              Key Platform Features
            </SectionTitle>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {/* Feature 1 */}
            <ScrollReveal delay={100}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#c9a84c' }}>
                  <FileText size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Contract Loophole Detection</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Automated scanning detects ambiguous notice periods, infinite liabilities, and unenforceable non-compete clauses under Kenyan law.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 2 */}
            <ScrollReveal delay={150}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#06b6d4' }}>
                  <Users size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Direct Lawyer Interaction</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Engage verified Law Society of Kenya advocates directly to seek formal legal opinions, review redlined agreements, and schedule sessions.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 3 */}
            <ScrollReveal delay={200}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#10b981' }}>
                  <Scale size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Time & Cost Estimator</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Transparent estimates for statutory court filing fees, advocate scale remuneration, and realistic dispute resolution timelines.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 4 */}
            <ScrollReveal delay={250}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#c9a84c' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Secure Pleadings Vault</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Lawyers store confidential affidavits, plaints, and evidence briefs with 256-bit AES encryption compliant with the Kenya Data Protection Act.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 5 */}
            <ScrollReveal delay={300}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#06b6d4' }}>
                  <Scale size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Kenya Constitutional Pool</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Indexed articles covering Bill of Rights (Articles 19–59), Land & Property (Art. 40), and Judicial Authority (Art. 159).
                </p>
              </div>
            </ScrollReveal>

            {/* Feature 6 */}
            <ScrollReveal delay={350}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, padding: '28px', borderRadius: '16px', height: '100%', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#10b981' }}>
                  <CheckCircle size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 8px', fontWeight: 700, color: titleColor }}>Court Case Dossiers</h3>
                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  Maintain case files, track cause list schedules, and record legal notes for High Court, ELC, and ELRC proceedings.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          PORTALS ACCESS SECTION (#portals)
          Now that user knows how it works, they can log in / sign up
          ======================================================== */}
      <section
        id="portals"
        style={{
          padding: '100px 24px',
          background: isDark ? '#0a1628' : '#ffffff',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <SectionTitle
              badge="Access Portals"
              subtitle="Choose your portal to sign in or create an account"
              isDark={isDark}
            >
              Enter The Platform
            </SectionTitle>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: 20 }}>
            {/* User Portal Card */}
            <ScrollReveal delay={100}>
              <div
                style={{
                  background: cardBg,
                  padding: '40px 30px',
                  borderRadius: '24px',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.06)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(201, 168, 76, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c9a84c'
                  }}>
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: titleColor }}>Client Portal</h3>
                    <span style={{ fontSize: '0.78rem', color: '#10b981' }}>For Individual Clients</span>
                  </div>
                </div>

                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
                  Limited purely to <strong>Contract Review</strong> (clause loophole checks & liability analysis) and <strong>Direct Lawyer Interaction</strong>.
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => openAuth('user', 'login')}
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c 0%, #a88a3a 100%)',
                      color: '#040d1a',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                    }}
                  >
                    Log In to Client Portal
                  </button>
                  <button
                    onClick={() => openAuth('user', 'signup')}
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                      color: titleColor,
                      border: '1px solid rgba(201, 168, 76, 0.3)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Create Client Account
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Lawyer Portal Card */}
            <ScrollReveal delay={200}>
              <div
                style={{
                  background: cardBg,
                  padding: '40px 30px',
                  borderRadius: '24px',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.06)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4'
                  }}>
                    <Scale size={22} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: titleColor }}>Advocate Portal</h3>
                    <span style={{ fontSize: '0.78rem', color: '#06b6d4' }}>For Licensed Advocates</span>
                  </div>
                </div>

                <p style={{ color: descColor, fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
                  Full workspace for <strong>Encrypted Pleadings Vault</strong>, case tracking across Kenyan courts, and direct client representation.
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => openAuth('lawyer', 'login')}
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                      color: '#040d1a',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                    }}
                  >
                    Log In to Advocate Portal
                  </button>
                  <button
                    onClick={() => openAuth('lawyer', 'signup')}
                    style={{
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
                      color: titleColor,
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Register Advocate Account
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========================================================
          CLEAN MINIMAL FOOTER
          ======================================================== */}
      <footer
        style={{
          padding: '36px 24px',
          background: isDark ? '#040d1a' : '#f1f5f9',
          borderTop: isDark ? '1px solid rgba(201,168,76,0.15)' : '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <Logo size={32} title="Legal Clarity" />

          <p style={{ margin: 0, fontSize: '0.85rem', color: isDark ? '#64748b' : '#64748b' }}>
            © {new Date().getFullYear()} Legal Clarity. Privileged & Confidential Legal Technology.
          </p>

          <div style={{ display: 'flex', gap: 20, fontSize: '0.85rem' }}>
            <span style={{ color: '#10b981' }}>Kenya Data Protection Act 2019 Compliant</span>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
        defaultRole={authRole}
      />
    </div>
  );
}
