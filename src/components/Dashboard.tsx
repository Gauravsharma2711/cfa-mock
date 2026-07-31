import React, { useState } from 'react';
import { BookOpen, Clock, Zap, CheckCircle2, Trophy, BarChart2, ArrowRight, RotateCcw, Eye, Sparkles } from 'lucide-react';
import { MockSession, ExamMode, ExamResult } from '../types';

interface DashboardProps {
  sessions: MockSession[];
  history: ExamResult[];
  onStartExam: (session: MockSession, mode: ExamMode) => void;
  onReviewResult: (result: ExamResult) => void;
  onClearHistory: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  sessions,
  history,
  onStartExam,
  onReviewResult,
  onClearHistory,
}) => {
  const [selectedSession, setSelectedSession] = useState<MockSession | null>(null);
  const [selectedMode, setSelectedMode] = useState<ExamMode>('timed');

  const totalAttempts = history.length;
  const avgScore = totalAttempts > 0 
    ? Math.round(history.reduce((acc, curr) => acc + curr.percentage, 0) / totalAttempts)
    : 0;
  const bestScore = totalAttempts > 0 
    ? Math.max(...history.map(h => h.percentage))
    : 0;

  return (
    <div className="dashboard-container animate-fade">
      {/* Hero Welcome Banner */}
      <section className="hero-banner glass-panel">
        <div className="hero-content">
          <div className="badge badge-pink">
            <Sparkles className="w-3.5 h-3.5" /> Official CFA Level 1 Mock Tests
          </div>
          <h1>Personalized CFA Exam Portal 🎓✨</h1>
          <p>
            Master your CFA Level I preparation with real exam-simulation mocks, instant automated scoring, 
            and complete step-by-step corrections for all 180 questions!
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon bg-purple-100 text-purple-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-value">{bestScore}%</div>
              <div className="stat-label">Best Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-pink-100 text-pink-600">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-value">{avgScore}%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon bg-mint-100 text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-value">{totalAttempts}</div>
              <div className="stat-label">Completed Tests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mock Tests Cards Grid */}
      <h2 className="section-title">Available Mock Exam Sessions</h2>

      <div className="sessions-grid">
        {sessions.map((session) => {
          const sessionHistory = history.filter(h => h.sessionId === session.id);
          const lastAttempt = sessionHistory[0];

          return (
            <div key={session.id} className="session-card glass-panel">
              <div className="session-header">
                <div className={`session-badge ${session.badgeColor}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="session-meta">
                  <h3>{session.title}</h3>
                  <span className="subtitle">{session.subtitle}</span>
                </div>
              </div>

              <div className="session-info-pills">
                <span className="pill">
                  <BookOpen className="w-3.5 h-3.5" /> {session.questionsCount} Questions
                </span>
                <span className="pill">
                  <Clock className="w-3.5 h-3.5" /> {session.timeAllowedMinutes} Minutes
                </span>
              </div>

              <div className="topics-list">
                <span className="topics-title">Topics covered:</span>
                <div className="topics-tags">
                  {session.topics.map((topic, i) => (
                    <span key={i} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              {lastAttempt && (
                <div className="last-attempt-banner">
                  <div className="attempt-info">
                    <span className="score font-bold">{lastAttempt.score} / {lastAttempt.totalQuestions} ({lastAttempt.percentage}%)</span>
                    <span className="date">{new Date(lastAttempt.date).toLocaleDateString()}</span>
                  </div>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onReviewResult(lastAttempt)}
                  >
                    <Eye className="w-3.5 h-3.5" /> Review
                  </button>
                </div>
              )}

              <div className="session-actions">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => setSelectedSession(session)}
                >
                  Start {session.shortTitle} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Past History & Correction Records */}
      {history.length > 0 && (
        <section className="history-section glass-panel">
          <div className="history-header">
            <h3>Past Test Attempts & Correction Records</h3>
            <button className="btn btn-secondary btn-sm text-red-500" onClick={onClearHistory}>
              <RotateCcw className="w-3.5 h-3.5" /> Clear History
            </button>
          </div>

          <div className="history-table-container">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Date</th>
                  <th>Mode</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((res) => (
                  <tr key={res.id}>
                    <td className="font-semibold">{res.sessionTitle}</td>
                    <td>{new Date(res.date).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${res.mode === 'timed' ? 'badge-purple' : 'badge-mint'}`}>
                        {res.mode}
                      </span>
                    </td>
                    <td className="font-bold">{res.score} / {res.totalQuestions}</td>
                    <td>
                      <span className={`font-bold ${res.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {res.percentage}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${res.passed ? 'badge-mint' : 'badge-pink'}`}>
                        {res.passed ? 'PASSED ✅' : 'NEEDS PRACTICE 📖'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onReviewResult(res)}
                      >
                        <Eye className="w-3.5 h-3.5" /> Corrections
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Start Exam Options Modal */}
      {selectedSession && (
        <div className="modal-overlay" onClick={() => setSelectedSession(null)}>
          <div className="modal-card glass-panel animate-fade" onClick={e => e.stopPropagation()}>
            <h3>Launch {selectedSession.title}</h3>
            <p className="text-muted">Select how you would like to attempt this mock test:</p>

            <div className="mode-options-grid">
              <div 
                className={`mode-card ${selectedMode === 'timed' ? 'active' : ''}`}
                onClick={() => setSelectedMode('timed')}
              >
                <div className="mode-icon"><Clock className="w-6 h-6 text-purple-600" /></div>
                <div>
                  <h4>Timed Exam Mode</h4>
                  <p>{selectedSession.timeAllowedMinutes} Minutes countdown timer. Simulates real test conditions.</p>
                </div>
              </div>

              <div 
                className={`mode-card ${selectedMode === 'untimed' ? 'active' : ''}`}
                onClick={() => setSelectedMode('untimed')}
              >
                <div className="mode-icon"><Zap className="w-6 h-6 text-emerald-600" /></div>
                <div>
                  <h4>Untimed Practice Mode</h4>
                  <p>Solve at your own pace without timer pressure. Ideal for thorough learning.</p>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedSession(null)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  onStartExam(selectedSession, selectedMode);
                  setSelectedSession(null);
                }}
              >
                Begin Exam <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dashboard-container {
          padding: 32px 0 64px 0;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .hero-banner {
          padding: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(243,232,255,0.7) 100%);
        }
        [data-theme='dark'] .hero-banner {
          background: linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(88,28,135,0.4) 100%);
        }
        .hero-content {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-content h1 {
          font-size: 2.2rem;
          background: linear-gradient(135deg, #6d28d9 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-content p {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .stats-cards-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .stat-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 160px;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .section-title {
          font-size: 1.5rem;
          color: var(--text-main);
          margin-top: 8px;
        }
        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 24px;
        }
        .session-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .session-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .session-badge {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .session-badge.purple { background: linear-gradient(135deg, #7c3aed, #a855f7); }
        .session-badge.pink { background: linear-gradient(135deg, #ec4899, #f43f5e); }

        .session-meta h3 {
          font-size: 1.3rem;
          margin-bottom: 4px;
        }
        .session-meta .subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .session-info-pills {
          display: flex;
          gap: 12px;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-light);
          color: var(--primary);
          padding: 6px 12px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
        }
        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .topics-title {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .topics-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .topic-tag {
          background: rgba(124, 58, 237, 0.08);
          color: var(--text-main);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          border: 1px solid var(--card-border);
        }
        .last-attempt-banner {
          background: var(--correct-bg);
          border: 1px solid var(--correct-border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .attempt-info {
          display: flex;
          flex-direction: column;
        }
        .attempt-info .score {
          color: var(--correct);
          font-size: 0.95rem;
        }
        .attempt-info .date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* History Table */
        .history-section {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .history-table-container {
          overflow-x: auto;
        }
        .history-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .history-table th, .history-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--card-border);
        }
        .history-table th {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .modal-card {
          width: 100%;
          max-width: 540px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .mode-options-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .mode-card {
          border: 2px solid var(--card-border);
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mode-card:hover {
          border-color: var(--primary);
        }
        .mode-card.active {
          border-color: var(--primary);
          background: var(--primary-light);
        }
        .mode-card h4 {
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .mode-card p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 12px;
        }
      `}</style>
    </div>
  );
};
