import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * AuthContext
 * -----------
 * Provides authentication state, mock login / signup / logout,
 * in-app messaging between users and lawyers, and case management.
 *
 * Demo accounts (any password works):
 *   • user@demo.com   → role "user"
 *   • lawyer@demo.com → role "lawyer"
 */

const AuthContext = createContext(null);

/* ---------- Local-storage helpers ---------- */
const STORAGE_KEYS = {
  USER: 'sheriaai_user',
  MESSAGES: 'sheriaai_messages',
  CASES: 'sheriaai_cases',
  FILES: 'sheriaai_files',
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded — silently ignore */
  }
}

/* ---------- ID generator ---------- */
let _idCounter = Date.now();
function generateId() {
  return `${++_idCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------- Demo seed data ---------- */
function seedMessages() {
  return [
    {
      id: generateId(),
      from: 'user@demo.com',
      to: 'lawyer@demo.com',
      text: 'Hello, I need help reviewing a tenancy agreement. Are you available this week?',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      read: true,
    },
    {
      id: generateId(),
      from: 'lawyer@demo.com',
      to: 'user@demo.com',
      text: 'Hi! Absolutely, I can review it. Please upload the document and I will get back to you within 24 hours.',
      timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
      read: true,
    },
    {
      id: generateId(),
      from: 'user@demo.com',
      to: 'lawyer@demo.com',
      text: 'Great, I have uploaded the agreement. Let me know if you need anything else.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
    },
  ];
}

function seedCases() {
  return [
    {
      id: generateId(),
      title: 'Tenancy Agreement Review',
      client: 'Demo User',
      clientEmail: 'user@demo.com',
      lawyerEmail: 'lawyer@demo.com',
      status: 'in-progress',
      priority: 'medium',
      category: 'Property Law',
      description:
        'Review and advise on a residential tenancy agreement for a 2-year lease in Nairobi.',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      files: [],
      notes: 'Client uploaded the draft agreement. Reviewing clause 12 regarding early termination.',
    },
    {
      id: generateId(),
      title: 'Business Registration',
      client: 'Demo User',
      clientEmail: 'user@demo.com',
      lawyerEmail: 'lawyer@demo.com',
      status: 'pending',
      priority: 'high',
      category: 'Corporate Law',
      description:
        'Assist with registering a new limited company, including preparation of memorandum & articles of association.',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      files: [],
      notes: '',
    },
    {
      id: generateId(),
      title: 'Employment Contract Dispute',
      client: 'Jane Kamau',
      clientEmail: 'jane@example.com',
      lawyerEmail: 'lawyer@demo.com',
      status: 'resolved',
      priority: 'low',
      category: 'Employment Law',
      description:
        'Mediation for wrongful termination claim. Parties reached a settlement.',
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      files: [],
      notes: 'Settlement agreement signed. Case closed.',
    },
  ];
}

/* ---------- Provider ---------- */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON(STORAGE_KEYS.USER, null));
  const [messages, setMessages] = useState(() =>
    loadJSON(STORAGE_KEYS.MESSAGES, seedMessages())
  );
  const [cases, setCases] = useState(() =>
    loadJSON(STORAGE_KEYS.CASES, seedCases())
  );
  const [files, setFiles] = useState(() =>
    loadJSON(STORAGE_KEYS.FILES, [])
  );

  const isAuthenticated = !!user;

  /* Persist to localStorage on change */
  useEffect(() => {
    saveJSON(STORAGE_KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.MESSAGES, messages);
  }, [messages]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.CASES, cases);
  }, [cases]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.FILES, files);
  }, [files]);

  /* -------- Auth actions -------- */
  const login = useCallback((email, password, role) => {
    // Determine role from email if not explicitly given
    let resolvedRole = role;
    if (!resolvedRole) {
      if (email === 'lawyer@demo.com') {
        resolvedRole = 'lawyer';
      } else {
        resolvedRole = 'user';
      }
    }

    const avatarInitial = email.charAt(0).toUpperCase();

    const loggedInUser = {
      id: generateId(),
      name:
        resolvedRole === 'lawyer'
          ? 'Adv. Sarah Wanjiku'
          : email === 'user@demo.com'
          ? 'Demo User'
          : email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: resolvedRole,
      avatar: avatarInitial,
      joinedAt: new Date().toISOString(),
    };

    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const signup = useCallback((name, email, password, role) => {
    const resolvedRole = role || 'user';
    const avatarInitial = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase();

    const newUser = {
      id: generateId(),
      name: name || email.split('@')[0],
      email,
      role: resolvedRole,
      avatar: avatarInitial,
      joinedAt: new Date().toISOString(),
    };

    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // We intentionally keep messages / cases so they persist across sessions.
  }, []);

  /* -------- Messaging -------- */
  const sendMessage = useCallback((from, to, text) => {
    const msg = {
      id: generateId(),
      from,
      to,
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const markMessageRead = useCallback((messageId) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  }, []);

  const markAllMessagesRead = useCallback((userEmail) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.to === userEmail && !m.read ? { ...m, read: true } : m
      )
    );
  }, []);

  /* -------- Case management -------- */
  const addCase = useCallback((caseData) => {
    const newCase = {
      id: generateId(),
      status: 'pending',
      priority: 'medium',
      files: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...caseData,
    };
    setCases((prev) => [...prev, newCase]);
    return newCase;
  }, []);

  const updateCase = useCallback((id, data) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...data, updatedAt: new Date().toISOString() }
          : c
      )
    );
  }, []);

  const deleteCase = useCallback((id) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
  }, []);

  /* -------- File uploads (mock) -------- */
  const uploadFile = useCallback((caseId, file) => {
    const fileMeta = {
      id: generateId(),
      caseId,
      name: file.name || file,
      size: file.size || 0,
      type: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
      uploadedBy: null, // will be set by caller if needed
      url: '#', // mock URL
    };

    setFiles((prev) => [...prev, fileMeta]);

    // Also attach to case
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? {
              ...c,
              files: [...(c.files || []), fileMeta],
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );

    return fileMeta;
  }, []);

  /* -------- Context value -------- */
  const value = {
    // Auth
    user,
    isAuthenticated,
    login,
    signup,
    logout,

    // Messaging
    messages,
    sendMessage,
    markMessageRead,
    markAllMessagesRead,

    // Cases
    cases,
    addCase,
    updateCase,
    deleteCase,

    // Files
    files,
    uploadFile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — convenience hook to consume AuthContext.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return context;
}

export default AuthContext;
