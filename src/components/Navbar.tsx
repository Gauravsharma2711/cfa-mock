import React from 'react';
import { Award, Moon, Sun, Home, Clock, Sparkles } from 'lucide-react';
import { MockSession, ExamMode } from '../types';

interface NavbarProps {
  currentSession: MockSession | null;
  examMode: ExamMode | null;
  timeRemainingSeconds: number | null;
  isPaused: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSession,
  examMode,
  timeRemainingSeconds,
  isPaused,
  theme,
  onToggleTheme,
  onGoHome,
}) => {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <header className="navbar-container">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <div className="logo-brand" onClick={onGoHome}>
          <div className="logo-icon">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="logo-text">
            <span className="title font-bold">CFA Prep Hub</span>
            <span className="subtitle flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-400" /> Exam Portal
            </span>
          </div>
        </div>

        {/* Center: Live Exam Timer if taking exam */}
        {currentSession && timeRemainingSeconds !== null && (
          <div className="live-timer-chip">
            <Clock className={`w-4 h-4 ${timeRemainingSeconds < 300 ? 'timer-urgent' : ''}`} />
            <span className="font-mono font-bold text-lg">
              {formatTime(timeRemainingSeconds)}
            </span>
            {examMode === 'untimed' && (
              <span className="badge badge-mint btn-sm">Untimed Practice</span>
            )}
            {isPaused && <span className="badge badge-amber">PAUSED</span>}
          </div>
        )}

        {/* Right Controls */}
        <div className="navbar-actions">
          {currentSession && (
            <button className="btn btn-secondary btn-sm" onClick={onGoHome}>
              <Home className="w-4 h-4" /> Home
            </button>
          )}

          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-purple-600" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </button>
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--card-border);
          padding: 12px 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }
        .logo-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .logo-text .title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: var(--text-main);
          line-height: 1.2;
        }
        .logo-text .subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .live-timer-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: var(--primary-light);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: var(--radius-full);
          color: var(--primary);
        }
        .timer-urgent {
          color: #ef4444;
          animation: pulse 1s infinite;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .theme-toggle-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .theme-toggle-btn:hover {
          transform: rotate(15deg) scale(1.05);
        }
      `}</style>
    </header>
  );
};
