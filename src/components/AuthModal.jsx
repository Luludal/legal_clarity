import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, Scale, Eye, EyeOff, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [role, setRole] = useState('user'); // 'user' | 'lawyer'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password, role);
      } else {
        await signup(formData.name, formData.email, formData.password, role);
      }
      navigate(role === 'lawyer' ? '/lawyer' : '/user');
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError('');
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes authOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes authCardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes authSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes authShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .auth-input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #ffffff;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .auth-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .auth-input:focus {
          border-color: rgba(201,168,76,0.5);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }
        .auth-input-icon {
          position: absolute;
          left: 14px;
          color: rgba(255,255,255,0.3);
          pointer-events: none;
          transition: color 0.3s ease;
        }
        .auth-input:focus ~ .auth-input-icon-reorder,
        .auth-input-wrap:focus-within .auth-input-icon {
          color: #c9a84c;
        }
        .auth-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }
        .auth-eye-btn:hover {
          color: #c9a84c;
        }
        .auth-submit {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .auth-submit:not(:disabled) {
          background: linear-gradient(135deg, #c9a84c, #a8872e);
          color: #0a1628;
        }
        .auth-submit:not(:disabled):hover {
          background: linear-gradient(135deg, #e8d48b, #c9a84c);
          box-shadow: 0 6px 24px rgba(201,168,76,0.35);
          transform: translateY(-1px);
        }
        .auth-submit:disabled {
          background: rgba(201,168,76,0.3);
          color: rgba(10,22,40,0.5);
          cursor: not-allowed;
        }
        .auth-role-pill {
          flex: 1;
          padding: 10px 16px;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
          letter-spacing: 0.3px;
        }
        .auth-role-pill:hover {
          border-color: rgba(201,168,76,0.3);
          color: rgba(255,255,255,0.7);
        }
        .auth-role-pill.active {
          background: rgba(201,168,76,0.12);
          border-color: #c9a84c;
          color: #c9a84c;
          box-shadow: 0 0 16px rgba(201,168,76,0.1);
        }
        .auth-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .auth-close-btn:hover {
          color: #c9a84c;
          background: rgba(201,168,76,0.1);
          border-color: rgba(201,168,76,0.2);
        }
        .auth-switch-btn {
          background: none;
          border: none;
          color: #c9a84c;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          padding: 0;
          transition: all 0.3s ease;
        }
        .auth-switch-btn:hover {
          color: #e8d48b;
          text-decoration: underline;
        }
      `}</style>

      {/* Overlay */}
      <div
        style={modalStyles.overlay}
        onClick={onClose}
      >
        {/* Card */}
        <div
          style={modalStyles.card}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="auth-close-btn" onClick={onClose}>
            <X size={18} />
          </button>

          {/* Header */}
          <div style={modalStyles.header}>
            <div style={modalStyles.headerIcon}>
              <Scale size={24} color="#c9a84c" />
            </div>
            <h2 style={modalStyles.title}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={modalStyles.subtitle}>
              {mode === 'login'
                ? 'Sign in to access your portal'
                : 'Create your account to access legal intelligence'}
            </p>
          </div>

          {/* Role Selector */}
          <div style={modalStyles.roleSelector}>
            <button
              className={`auth-role-pill ${role === 'user' ? 'active' : ''}`}
              onClick={() => setRole('user')}
              type="button"
            >
              <User size={16} />
              User
            </button>
            <button
              className={`auth-role-pill ${role === 'lawyer' ? 'active' : ''}`}
              onClick={() => setRole('lawyer')}
              type="button"
            >
              <Briefcase size={16} />
              Lawyer
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                ...modalStyles.error,
                animation: 'authShake 0.4s ease',
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={modalStyles.form}>
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div className="auth-input-wrap">
                <input
                  className="auth-input"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <span className="auth-input-icon">
                  <User size={18} />
                </span>
              </div>
            )}

            {/* Email */}
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <span className="auth-input-icon">
                <Mail size={18} />
              </span>
            </div>

            {/* Password */}
            <div className="auth-input-wrap">
              <input
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                style={{ paddingRight: '44px' }}
              />
              <span className="auth-input-icon">
                <Lock size={18} />
              </span>
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(10,22,40,0.2)',
                      borderTop: '2px solid #0a1628',
                      borderRadius: '50%',
                      animation: 'authSpin 0.8s linear infinite',
                      display: 'inline-block',
                    }}
                  />
                  Processing...
                </>
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div style={modalStyles.switchRow}>
            <span style={modalStyles.switchText}>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </span>
            <button className="auth-switch-btn" onClick={switchMode}>
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          {/* Demo credentials hint */}
          <div style={modalStyles.demoHint}>
            <div style={modalStyles.demoLabel}>Demo Credentials</div>
            <div style={modalStyles.demoCreds}>
              <span>
                <strong>User:</strong> user@demo.com / password123
              </span>
              <span>
                <strong>Lawyer:</strong> lawyer@demo.com / password123
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.65)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '20px',
    animation: 'authOverlayIn 0.3s ease-out',
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '440px',
    background: 'rgba(14, 28, 50, 0.92)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '20px',
    padding: '40px 32px 32px',
    boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.06)',
    animation: 'authCardIn 0.4s ease-out',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  headerIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'rgba(201,168,76,0.1)',
    border: '1px solid rgba(201,168,76,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '26px',
    fontWeight: 700,
    color: '#ffffff',
    margin: '0 0 6px',
    letterSpacing: '0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
    fontWeight: 400,
  },
  roleSelector: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  error: {
    background: 'rgba(220, 38, 38, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#f87171',
    fontSize: '13px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '20px',
  },
  switchRow: {
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  switchText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '13px',
  },
  demoHint: {
    background: 'rgba(201,168,76,0.06)',
    border: '1px solid rgba(201,168,76,0.12)',
    borderRadius: '12px',
    padding: '14px 16px',
    textAlign: 'center',
  },
  demoLabel: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#c9a84c',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  demoCreds: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.5,
  },
};

export default AuthModal;
