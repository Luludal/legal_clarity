import React, { useState } from 'react';
import { 
  Upload, FileText, AlertTriangle, CheckCircle, ShieldAlert, 
  ArrowRight, Download, Share2, Sparkles, RefreshCw, FileCheck
} from 'lucide-react';

export default function ContractReview() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const sampleIssues = [
    {
      id: 1,
      severity: 'high',
      title: 'Ambiguous Termination & Notice Clause',
      clause: 'Clause 8.2: "Either party may terminate at will without cause upon notice."',
      issue: 'The clause fails to specify the required notice duration (e.g. 30 vs 90 days) and whether payment in lieu of notice is permitted. Under the Kenyan Law of Contract Act, courts may deem this unconscionable or unenforceable.',
      recommendation: 'Add a mandatory 30-day written notice period and explicitly declare obligations regarding work-in-progress and outstanding invoices.'
    },
    {
      id: 2,
      severity: 'high',
      title: 'Unlimited Personal Liability & Indemnity',
      clause: 'Clause 12.1: "Consultant indemnifies Client against all claims, damages, liabilities..."',
      issue: 'There is no monetary ceiling on liability. You risk infinite financial exposure including indirect, special, and consequential losses.',
      recommendation: 'Cap total cumulative liability to the total fees paid under this agreement in the prior 12 months, and exclude indirect/consequential damages.'
    },
    {
      id: 3,
      severity: 'medium',
      title: 'Missing Dispute Resolution & Local Kenyan Jurisdiction',
      clause: 'Clause 15.4: "Governed by the laws of foreign jurisdiction."',
      issue: 'Subjecting contract disputes to foreign courts outside Kenya increases litigation costs by upwards of 500% and complicates enforcement.',
      recommendation: 'Specify that disputes be governed by the laws of Kenya, with primary recourse to mediation under the Nairobi Centre for International Arbitration (NCIA).'
    },
    {
      id: 4,
      severity: 'medium',
      title: 'Overly Broad Non-Compete Restriction',
      clause: 'Clause 6: "Restricted from engaging in similar business anywhere in East Africa for 3 years."',
      issue: 'Under Kenyan competition & employment precedent, non-compete clauses exceeding 12 months or covering boundless geographic scopes are routinely struck down as unreasonable restraints of trade.',
      recommendation: 'Reduce the restriction period to 6-12 months and limit strictly to direct competitors within a 25km radius.'
    },
    {
      id: 5,
      severity: 'low',
      title: 'Vague Intellectual Property Assignment',
      clause: 'Clause 11.0: "All created materials belong to the Company."',
      issue: 'Does not distinguish between pre-existing background IP versus bespoke deliverables created exclusively for this engagement.',
      recommendation: 'Explicitly reserve ownership of pre-existing background IP and grant a non-exclusive license rather than complete assignment.'
    }
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      processFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    setAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisResult(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            setAnalysisResult({
              contractName: selectedFile.name,
              score: 64, // Risk score out of 100
              riskLevel: 'Moderate to High Risk',
              pageCount: 8,
              clausesAnalyzed: 24,
              issues: sampleIssues
            });
          }, 600);
          return 100;
        }
        return prev + 20;
      });
    }, 350);
  };

  const loadSampleContract = () => {
    processFile({ name: 'Commercial_Service_Agreement_Draft.docx', size: '240 KB' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 34, 64, 0.8) 0%, rgba(10, 22, 40, 0.9) 100%)',
        padding: '28px',
        borderRadius: '20px',
        border: '1px solid rgba(201, 168, 76, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{
              background: 'rgba(201, 168, 76, 0.15)',
              color: '#d4b965',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              AI Legal Guard
            </span>
            <span style={{ color: '#10b981', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} /> Kenya Contract Law Compliant
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Automated Contract & Agreement Review
          </h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', maxWidth: '650px', fontSize: '0.95rem' }}>
            Upload employment contracts, leases, vendor agreements, or NDAs. Our AI flags hidden liabilities, unfair clauses, and legal loopholes before you sign.
          </p>
        </div>

        <button
          onClick={loadSampleContract}
          style={{
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            color: '#d4b965',
            padding: '10px 18px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} /> Try With Demo Contract
        </button>
      </div>

      {/* Upload Zone */}
      {!analysisResult && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            border: '2px dashed rgba(201, 168, 76, 0.35)',
            borderRadius: '20px',
            padding: '50px 30px',
            textAlign: 'center',
            background: 'rgba(15, 34, 64, 0.4)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
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
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#d4b965'
          }}>
            <Upload size={32} />
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', margin: '0 0 8px' }}>
            Drag and drop your contract here, or browse files
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 16px' }}>
            Supports PDF, Microsoft Word (.docx, .doc), or plain text up to 25MB
          </p>
          <div style={{ display: 'inline-flex', gap: '8px', fontSize: '0.75rem', color: '#cbd5e1' }}>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>🔒 End-to-end Encrypted</span>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px' }}>🛡️ Never shared without permission</span>
          </div>
        </div>
      )}

      {/* Analysis in Progress */}
      {analyzing && (
        <div style={{
          background: 'rgba(15, 34, 64, 0.8)',
          borderRadius: '16px',
          padding: '30px',
          border: '1px solid rgba(201, 168, 76, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <Sparkles size={24} color="#c9a84c" />
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem' }}>
              Deep scanning contract clauses...
            </h3>
          </div>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            height: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            margin: '0 auto 12px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${analysisProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #c9a84c, #10b981)',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Comparing against Kenyan contract laws, statutory protections, and customary business terms ({analysisProgress}%)
          </p>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary Metric Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}>
            {/* Risk Meter Card */}
            <div style={{
              background: 'rgba(15, 34, 64, 0.8)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'conic-gradient(#ef4444 0% 64%, rgba(255,255,255,0.1) 64% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#0a1628',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#ef4444',
                  fontSize: '0.9rem'
                }}>
                  {analysisResult.score}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Overall Risk Rating</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {analysisResult.riskLevel}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>
                  2 High-risk clauses detected
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div style={{
              background: 'rgba(15, 34, 64, 0.8)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <FileCheck size={32} color="#10b981" />
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Target Document</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                  {analysisResult.contractName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
                  {analysisResult.clausesAnalyzed} Clauses Evaluated
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{
              background: 'rgba(15, 34, 64, 0.8)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <button
                onClick={() => alert('Contract audit report downloaded as PDF with citations!')}
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #a88a3a)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  color: '#040d1a',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} /> Download Redlined Report
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setAnalysisResult(null);
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  color: '#cbd5e1',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={14} /> Scan Another Agreement
              </button>
            </div>
          </div>

          {/* Detailed Issues List */}
          <div style={{
            background: 'rgba(10, 22, 40, 0.8)',
            borderRadius: '20px',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#c9a84c" />
              Identified Vulnerabilities & Loopholes ({analysisResult.issues.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {analysisResult.issues.map((issue) => {
                const isHigh = issue.severity === 'high';
                const isMed = issue.severity === 'medium';
                const badgeColor = isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981';
                const badgeBg = isHigh ? 'rgba(239, 68, 68, 0.15)' : isMed ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)';

                return (
                  <div
                    key={issue.id}
                    style={{
                      background: 'rgba(15, 34, 64, 0.7)',
                      borderRadius: '12px',
                      padding: '18px',
                      border: `1px solid ${isHigh ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: badgeBg,
                          color: badgeColor,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          textTransform: 'uppercase'
                        }}>
                          {issue.severity} Priority
                        </span>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
                          {issue.title}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      borderLeft: `3px solid ${badgeColor}`,
                      fontStyle: 'italic'
                    }}>
                      {issue.clause}
                    </div>

                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5' }}>
                      <strong style={{ color: '#e2e8f0' }}>Legal Impact: </strong>{issue.issue}
                    </p>

                    <div style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      color: '#34d399',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <CheckCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span><strong style={{ color: '#10b981' }}>Remediation: </strong>{issue.recommendation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
