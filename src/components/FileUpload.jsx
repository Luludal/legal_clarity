import React, { useState } from 'react';
import { 
  Upload, FileText, Lock, Shield, CheckCircle, Trash2, 
  Download, Eye, Filter, Search, HardDrive, Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function FileUpload() {
  const { cases, uploadFile } = useAuth();

  const [filesList, setFilesList] = useState([
    {
      id: 'f-1',
      name: 'Notice_of_Motion_Urgent_Injunction.pdf',
      size: '2.4 MB',
      caseId: 'ELC/NAI/482/2024',
      caseTitle: 'Kamau v. Sovereign Real Estate',
      uploadedAt: '2024-10-18',
      securityStatus: 'AES-256 Encrypted',
      type: 'Pleading'
    },
    {
      id: 'f-2',
      name: 'Supporting_Affidavit_Sworn_Kamau.pdf',
      size: '1.8 MB',
      caseId: 'ELC/NAI/482/2024',
      caseTitle: 'Kamau v. Sovereign Real Estate',
      uploadedAt: '2024-10-18',
      securityStatus: 'AES-256 Encrypted',
      type: 'Affidavit'
    },
    {
      id: 'f-3',
      name: 'Employment_Contract_Signed_Achieng.docx',
      size: '480 KB',
      caseId: 'ELRC/291/2024',
      caseTitle: 'Achieng v. Prime Logistics',
      uploadedAt: '2024-10-12',
      securityStatus: 'AES-256 Encrypted',
      type: 'Contract'
    },
    {
      id: 'f-4',
      name: 'Forensic_Audit_Report_Financial_Flows.pdf',
      size: '7.2 MB',
      caseId: 'CR/KIB/1042/2024',
      caseTitle: 'Republic v. Peter Kiprono',
      uploadedAt: '2024-09-29',
      securityStatus: 'AES-256 Encrypted',
      type: 'Evidence'
    },
    {
      id: 'f-5',
      name: 'Gazette_Notice_Extract_Probate_2024.pdf',
      size: '890 KB',
      caseId: 'SUCC/MACH/119/2023',
      caseTitle: 'Estate of Late Duncan Mutua',
      uploadedAt: '2024-08-14',
      securityStatus: 'AES-256 Encrypted',
      type: 'Notice'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState('ELC/NAI/482/2024');
  const [documentType, setDocumentType] = useState('Pleading');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc = {
              id: `f-${Date.now()}`,
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              caseId: selectedCaseId,
              caseTitle: 'Assigned Matter',
              uploadedAt: new Date().toISOString().split('T')[0],
              securityStatus: 'AES-256 Encrypted',
              type: documentType
            };
            setFilesList(prevFiles => [newDoc, ...prevFiles]);
            setIsUploading(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDelete = (id) => {
    setFilesList(filesList.filter(f => f.id !== id));
  };

  const filteredFiles = filesList.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Encryption & Cloud Security Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 34, 64, 0.8) 0%, rgba(10, 22, 40, 0.9) 100%)',
        padding: '24px 28px',
        borderRadius: '20px',
        border: '1px solid rgba(201, 168, 76, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Shield size={12} /> Judicial-Grade 256-bit AES
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
              Kenya Data Protection Act (2019) Compliant
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Secure Advocate Document Vault
          </h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0', fontSize: '0.9rem' }}>
            Safely store, index, and organize sensitive case pleadings, client disclosures, and evidence briefs.
          </p>
        </div>

        <div style={{
          background: 'rgba(10, 22, 40, 0.6)',
          border: '1px solid rgba(201, 168, 76, 0.2)',
          borderRadius: '12px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <HardDrive size={24} color="#d4b965" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Secure Cloud Quota</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
              12.8 MB / 50.0 GB
            </div>
          </div>
        </div>
      </div>

      {/* Upload Box with Case Tagging */}
      <div style={{
        background: 'rgba(15, 34, 64, 0.6)',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Assign to Matter / Suit
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(10, 22, 40, 0.9)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="ELC/NAI/482/2024">ELC/NAI/482/2024 — Kamau v. Sovereign Real Estate</option>
              <option value="ELRC/291/2024">ELRC/291/2024 — Achieng v. Prime Logistics</option>
              <option value="CR/KIB/1042/2024">CR/KIB/1042/2024 — Republic v. Peter Kiprono</option>
              <option value="SUCC/MACH/119/2023">SUCC/MACH/119/2023 — Estate of Duncan Mutua</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
              Document Category
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(10, 22, 40, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#f8fafc',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Pleading">Pleading (Plaint / Defense / Petition)</option>
              <option value="Affidavit">Supporting / Replying Affidavit</option>
              <option value="Evidence">Documentary Evidence / Exhibits</option>
              <option value="Notice of Motion">Notice of Motion / Chamber Summons</option>
              <option value="Contract">Contract / Agreement</option>
            </select>
          </div>
        </div>

        {/* Dropzone */}
        <div style={{
          position: 'relative',
          border: '2px dashed rgba(201, 168, 76, 0.35)',
          borderRadius: '16px',
          padding: '36px 20px',
          textAlign: 'center',
          background: 'rgba(10, 22, 40, 0.4)',
          cursor: 'pointer'
        }}>
          <input
            type="file"
            onChange={handleFileUpload}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              width: '100%',
              height: '100%'
            }}
          />
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            color: '#d4b965'
          }}>
            <Upload size={26} />
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
            Click to upload or drag files into vault
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>
            PDF, DOCX, XLSX, JPEG up to 50MB per document
          </p>
        </div>

        {isUploading && (
          <div style={{
            background: 'rgba(10, 22, 40, 0.8)',
            padding: '14px 20px',
            borderRadius: '10px',
            border: '1px solid rgba(201, 168, 76, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#f8fafc', marginBottom: '6px' }}>
              <span>Encrypting and transmitting payload...</span>
              <span style={{ color: '#d4b965', fontWeight: 700 }}>{uploadProgress}%</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress}%`, height: '100%', background: '#c9a84c', transition: 'width 0.2s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Files Table / Library */}
      <div style={{
        background: 'rgba(10, 22, 40, 0.8)',
        borderRadius: '20px',
        border: '1px solid rgba(201, 168, 76, 0.25)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', margin: 0, fontWeight: 700 }}>
            Stored Dossier Files ({filteredFiles.length})
          </h3>
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Filter file by name or suit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 34, 64, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 12px 8px 32px',
                color: '#f8fafc',
                fontSize: '0.8rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              style={{
                background: 'rgba(15, 34, 64, 0.6)',
                borderRadius: '12px',
                padding: '14px 18px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '260px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'rgba(201, 168, 76, 0.15)',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d4b965',
                  flexShrink: 0
                }}>
                  <FileText size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                    {file.caseId} • {file.size} • Uploaded {file.uploadedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06b6d4',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}>
                  {file.type}
                </span>

                <span style={{
                  fontSize: '0.7rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Lock size={10} /> Encrypted
                </span>

                <button
                  onClick={() => alert(`Downloading verified copy of ${file.name}...`)}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem'
                  }}
                  title="Download File"
                >
                  <Download size={13} />
                </button>

                <button
                  onClick={() => handleDelete(file.id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                  title="Delete File"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
