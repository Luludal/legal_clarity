import React from 'react';

const Logo = ({ size = 40, showText = true, title = 'Legal Clarity' }) => {
  const scale = size / 40;

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes logoPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
      <div
        style={{
          ...styles.svgWrap,
          width: size,
          height: size,
          animation: 'logoFloat 3s ease-in-out infinite, logoPulse 4s ease-in-out infinite',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d48b" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#a8872e" />
            </linearGradient>
            <linearGradient id="goldGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8d48b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Top circle / pivot */}
          <circle cx="32" cy="10" r="3.5" fill="url(#goldGrad)" />

          {/* Central pillar */}
          <rect x="31" y="13" width="2" height="30" rx="1" fill="url(#goldGrad)" />

          {/* Beam / crossbar */}
          <rect x="10" y="22" width="44" height="2" rx="1" fill="url(#goldGrad)" />

          {/* Left chain */}
          <rect x="13.5" y="24" width="1.5" height="14" rx="0.75" fill="url(#goldGradLight)" />

          {/* Right chain */}
          <rect x="49" y="24" width="1.5" height="14" rx="0.75" fill="url(#goldGradLight)" />

          {/* Left scale pan */}
          <path
            d="M6 39 Q6 36 10 36 L18 36 Q22 36 22 39 Q22 42 14 43 Q6 42 6 39Z"
            fill="url(#goldGrad)"
            opacity="0.85"
          />

          {/* Right scale pan */}
          <path
            d="M42 39 Q42 36 46 36 L54 36 Q58 36 58 39 Q58 42 50 43 Q42 42 42 39Z"
            fill="url(#goldGrad)"
            opacity="0.85"
          />

          {/* Base platform */}
          <rect x="22" y="43" width="20" height="2.5" rx="1.25" fill="url(#goldGrad)" />

          {/* Base foot */}
          <rect x="18" y="46" width="28" height="2.5" rx="1.25" fill="url(#goldGrad)" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div style={styles.textWrap}>
          <span
            style={{
              ...styles.brandName,
              fontSize: Math.max(16, size * 0.48),
            }}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    userSelect: 'none',
    cursor: 'pointer',
  },
  svgWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  brandName: {
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
    fontWeight: 700,
    color: '#c9a84c',
    letterSpacing: '3px',
    lineHeight: 1,
  },
  aiBadge: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    fontWeight: 700,
    color: '#0a1628',
    backgroundColor: '#c9a84c',
    borderRadius: '4px',
    letterSpacing: '1px',
    lineHeight: 1,
    marginTop: '2px',
  },
};

export default Logo;
