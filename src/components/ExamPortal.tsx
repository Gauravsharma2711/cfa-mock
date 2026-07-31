import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle, Play, Pause, Send, Grid } from 'lucide-react';
import { Question, UserAnswers, FlaggedQuestions, MockSession } from '../types';

interface ExamPortalProps {
  session: MockSession;
  questions: Question[];
  userAnswers: UserAnswers;
  flaggedQuestions: FlaggedQuestions;
  onSelectOption: (questionId: number, option: 'A' | 'B' | 'C') => void;
  onToggleFlag: (questionId: number) => void;
  onClearOption: (questionId: number) => void;
  onSubmitExam: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const ExamPortal: React.FC<ExamPortalProps> = ({
  session,
  questions,
  userAnswers,
  flaggedQuestions,
  onSelectOption,
  onToggleFlag,
  onClearOption,
  onSubmitExam,
  isPaused,
  onTogglePause,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState(false);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = totalQuestions - answeredCount;

  const isCurrentFlagged = !!flaggedQuestions[currentQ.id];
  const selectedOption = userAnswers[currentQ.id];

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="exam-portal-container animate-fade">
      {/* Top Exam Toolbar */}
      <div className="exam-toolbar glass-panel">
        <div className="toolbar-left">
          <span className="badge badge-purple">{session.shortTitle}</span>
          <span className="question-counter font-bold">
            Question {currentIndex + 1} <span className="text-muted">of {totalQuestions}</span>
          </span>
          <span className="category-pill">{currentQ.category}</span>
        </div>

        <div className="toolbar-right">
          <button
            className={`btn btn-sm ${isCurrentFlagged ? 'btn-cute' : 'btn-secondary'}`}
            onClick={() => onToggleFlag(currentQ.id)}
          >
            <Flag className="w-4 h-4" /> {isCurrentFlagged ? 'Flagged 🚩' : 'Flag Question'}
          </button>

          <button className="btn btn-secondary btn-sm" onClick={onTogglePause}>
            {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <button
            className="btn btn-secondary btn-sm palette-toggle-btn"
            onClick={() => setShowPaletteDrawer(!showPaletteDrawer)}
          >
            <Grid className="w-4 h-4" /> Palette ({answeredCount}/{totalQuestions})
          </button>

          <button className="btn btn-primary btn-sm" onClick={() => setShowConfirmModal(true)}>
            <Send className="w-4 h-4" /> Submit Exam
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="exam-main-layout">
        {/* Left / Main Question Display */}
        <div className="question-card glass-panel">
          <div className="question-header">
            <span className="q-number">Q{currentQ.id}.</span>
            <p className="q-text">{currentQ.question}</p>
          </div>

          <div className="options-container">
            {(['A', 'B', 'C'] as const).map((optKey) => {
              const optionText = currentQ.options[optKey];
              if (!optionText) return null;
              const isSelected = selectedOption === optKey;

              return (
                <div
                  key={optKey}
                  className={`option-button ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectOption(currentQ.id, optKey)}
                >
                  <div className="opt-key-circle">{optKey}</div>
                  <div className="opt-text">{optionText}</div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Footer */}
          <div className="question-footer">
            <div className="footer-left">
              {selectedOption && (
                <button
                  className="btn btn-secondary btn-sm text-muted"
                  onClick={() => onClearOption(currentQ.id)}
                >
                  Clear Selection
                </button>
              )}
            </div>

            <div className="footer-right">
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={currentIndex === totalQuestions - 1}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right / Sidebar Question Grid Palette */}
        <div className={`palette-sidebar glass-panel ${showPaletteDrawer ? 'drawer-open' : ''}`}>
          <div className="palette-header">
            <h4>Question Palette</h4>
            <span className="text-muted text-xs">Click any number to jump</span>
          </div>

          <div className="palette-legend">
            <div className="legend-item"><span className="dot answered"></span> Answered ({answeredCount})</div>
            <div className="legend-item"><span className="dot flagged"></span> Flagged ({flaggedCount})</div>
            <div className="legend-item"><span className="dot unanswered"></span> Unanswered ({unansweredCount})</div>
          </div>

          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isAns = !!userAnswers[q.id];
              const isFlag = !!flaggedQuestions[q.id];
              const isCurr = idx === currentIndex;

              let statusClass = 'unanswered';
              if (isAns) statusClass = 'answered';
              if (isFlag) statusClass += ' flagged';

              return (
                <button
                  key={q.id}
                  className={`palette-num ${statusClass} ${isCurr ? 'current' : ''}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowPaletteDrawer(false);
                  }}
                >
                  {q.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-card glass-panel animate-fade" onClick={e => e.stopPropagation()}>
            <h3>Ready to Submit Exam? 🎓</h3>
            <p className="text-muted">Here is a quick summary of your attempt status:</p>

            <div className="confirm-summary-grid">
              <div className="sum-box bg-purple-100 text-purple-700">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <span className="font-bold text-lg">{answeredCount}</span>
                  <div className="text-xs">Answered</div>
                </div>
              </div>

              <div className="sum-box bg-amber-100 text-amber-700">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <span className="font-bold text-lg">{unansweredCount}</span>
                  <div className="text-xs">Unanswered</div>
                </div>
              </div>

              <div className="sum-box bg-pink-100 text-pink-700">
                <Flag className="w-5 h-5" />
                <div>
                  <span className="font-bold text-lg">{flaggedCount}</span>
                  <div className="text-xs">Flagged</div>
                </div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="warning-note">
                ⚠️ You have {unansweredCount} unanswered questions. You can still go back and complete them!
              </div>
            )}

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Go Back to Exam
              </button>
              <button className="btn btn-primary" onClick={onSubmitExam}>
                Confirm & Submit <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .exam-portal-container {
          padding: 24px 0 64px 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .exam-toolbar {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .question-counter {
          font-family: var(--font-heading);
          font-size: 1.1rem;
        }
        .category-pill {
          background: rgba(124, 58, 237, 0.08);
          color: var(--primary);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
        }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .exam-main-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .exam-main-layout {
            grid-template-columns: 1fr;
          }
          .palette-sidebar {
            display: none;
          }
          .palette-sidebar.drawer-open {
            display: flex;
            position: fixed;
            top: 0; right: 0; bottom: 0;
            width: 320px;
            z-index: 1100;
            border-radius: 0;
            box-shadow: -10px 0 30px rgba(0,0,0,0.2);
          }
        }

        .question-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          min-height: 480px;
          justify-content: space-between;
        }
        .question-header {
          display: flex;
          gap: 16px;
        }
        .q-number {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--primary);
        }
        .q-text {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--text-main);
          font-weight: 500;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .option-button {
          border: 2px solid var(--card-border);
          border-radius: var(--radius-md);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: var(--card-bg);
        }
        .option-button:hover {
          border-color: var(--primary);
          transform: translateX(4px);
          background: var(--primary-light);
        }
        .option-button.selected {
          border-color: var(--primary);
          background: var(--primary-light);
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.15);
        }

        .opt-key-circle {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: var(--card-bg);
          border: 2px solid var(--card-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--text-main);
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .option-button.selected .opt-key-circle {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .opt-text {
          font-size: 1.05rem;
          color: var(--text-main);
          line-height: 1.5;
        }

        .question-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid var(--card-border);
        }
        .footer-right {
          display: flex;
          gap: 12px;
        }

        /* Palette Sidebar */
        .palette-sidebar {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: fit-content;
          max-height: 80vh;
          overflow-y: auto;
        }
        .palette-header h4 {
          font-size: 1.1rem;
        }
        .palette-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 10px; height: 10px;
          border-radius: var(--radius-full);
        }
        .dot.answered { background: var(--primary); }
        .dot.flagged { background: var(--accent-pink); }
        .dot.unanswered { background: var(--text-light); }

        .palette-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }
        .palette-num {
          aspect-ratio: 1;
          border-radius: var(--radius-sm);
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          color: var(--text-main);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          position: relative;
        }
        .palette-num:hover {
          border-color: var(--primary);
          transform: scale(1.08);
        }
        .palette-num.answered {
          background: var(--primary-light);
          color: var(--primary);
          border-color: rgba(124, 58, 237, 0.4);
        }
        .palette-num.flagged::after {
          content: '';
          position: absolute;
          top: 3px; right: 3px;
          width: 6px; height: 6px;
          background: var(--accent-pink);
          border-radius: var(--radius-full);
        }
        .palette-num.current {
          border: 2px solid var(--primary);
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.4);
          font-weight: 800;
        }

        .confirm-summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .sum-box {
          padding: 14px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .warning-note {
          background: var(--accent-amber-light);
          color: var(--accent-amber);
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
