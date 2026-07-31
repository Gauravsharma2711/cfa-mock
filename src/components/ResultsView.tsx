import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, Clock, RotateCcw, Filter, Search, BookOpen, Flag, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, ExamResult } from '../types';

interface ResultsViewProps {
  result: ExamResult;
  questions: Question[];
  onRetake: () => void;
  onGoDashboard: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  questions,
  onRetake,
  onGoDashboard,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'flagged' | 'unanswered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (result.percentage >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas fail
      }
    }
  }, [result]);

  const formatTimeSpent = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const filteredQuestions = questions.filter(q => {
    const userAns = result.userAnswers[q.id];
    const isCorrect = userAns === q.correctAnswer;
    const isFlagged = result.flaggedQuestions[q.id];
    const isUnanswered = !userAns;

    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'incorrect' && (isCorrect || isUnanswered)) return false;
    if (filter === 'flagged' && !isFlagged) return false;
    if (filter === 'unanswered' && !isUnanswered) return false;

    if (searchQuery.trim()) {
      const qText = (q.question + ' ' + q.category).toLowerCase();
      return qText.includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const correctCount = result.score;
  const incorrectCount = Object.keys(result.userAnswers).length - correctCount;
  const unansweredCount = result.totalQuestions - Object.keys(result.userAnswers).length;

  return (
    <div className="results-container animate-fade">
      {/* Score Banner Hero */}
      <section className="score-hero glass-panel">
        <div className="hero-left">
          <div className="score-badge-circle">
            <Trophy className="w-10 h-10 text-amber-500" />
            <span className="score-num font-extrabold">{result.percentage}%</span>
          </div>

          <div className="hero-details">
            <div className="badge badge-purple">{result.sessionTitle}</div>
            <h2>Exam Completed! 🎉</h2>
            <p className="subtitle">
              You scored <span className="font-bold text-purple-600">{result.score}</span> out of {result.totalQuestions} total marks.
            </p>

            <div className="hero-metrics">
              <span className="metric">
                <Clock className="w-4 h-4" /> Time: {formatTimeSpent(result.timeSpentSeconds)}
              </span>
              <span className="metric">
                <Award className="w-4 h-4" /> Target Pass Score: 70%
              </span>
            </div>
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn btn-secondary" onClick={onGoDashboard}>
            <BookOpen className="w-4 h-4" /> Dashboard
          </button>
          <button className="btn btn-primary" onClick={onRetake}>
            <RotateCcw className="w-4 h-4" /> Retake Exam
          </button>
        </div>
      </section>

      {/* Accuracy & Breakdown Stats Grid */}
      <div className="breakdown-grid">
        <div className="breakdown-card bg-emerald-50 text-emerald-800">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          <div>
            <div className="value">{correctCount}</div>
            <div className="label">Correct Answers</div>
          </div>
        </div>

        <div className="breakdown-card bg-red-50 text-red-800">
          <XCircle className="w-6 h-6 text-red-600" />
          <div>
            <div className="value">{incorrectCount}</div>
            <div className="label">Incorrect Answers</div>
          </div>
        </div>

        <div className="breakdown-card bg-amber-50 text-amber-800">
          <Clock className="w-6 h-6 text-amber-600" />
          <div>
            <div className="value">{unansweredCount}</div>
            <div className="label">Unanswered</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <section className="corrections-section glass-panel">
        <div className="corrections-header">
          <h3>Question Corrections & Solution Explanations</h3>

          <div className="filter-controls">
            <div className="search-box">
              <Search className="w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search questions or topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({questions.length})
              </button>
              <button
                className={`filter-btn ${filter === 'incorrect' ? 'active' : ''}`}
                onClick={() => setFilter('incorrect')}
              >
                Incorrect ({incorrectCount})
              </button>
              <button
                className={`filter-btn ${filter === 'correct' ? 'active' : ''}`}
                onClick={() => setFilter('correct')}
              >
                Correct ({correctCount})
              </button>
              <button
                className={`filter-btn ${filter === 'unanswered' ? 'active' : ''}`}
                onClick={() => setFilter('unanswered')}
              >
                Unanswered ({unansweredCount})
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Questions List with Explanations */}
        <div className="questions-correction-list">
          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <p>No questions match your selected filter.</p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const userAns = result.userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isUnans = !userAns;

              return (
                <div
                  key={q.id}
                  className={`correction-card ${
                    isUnans ? 'unanswered-card' : isCorrect ? 'correct-card' : 'incorrect-card'
                  }`}
                >
                  <div className="card-top-bar">
                    <div className="left-tags">
                      <span className="q-badge">Q{q.id}</span>
                      <span className="category-tag">{q.category}</span>
                    </div>

                    <div className="right-status">
                      {isUnans ? (
                        <span className="status-badge badge-amber">Unanswered ⚪</span>
                      ) : isCorrect ? (
                        <span className="status-badge badge-mint">Correct ✅</span>
                      ) : (
                        <span className="status-badge badge-pink">Incorrect ❌</span>
                      )}
                    </div>
                  </div>

                  <p className="question-text">{q.question}</p>

                  <div className="correction-options-grid">
                    {(['A', 'B', 'C'] as const).map((optKey) => {
                      const text = q.options[optKey];
                      if (!text) return null;

                      const isUserChoice = userAns === optKey;
                      const isCorrectChoice = q.correctAnswer === optKey;

                      let optStateClass = '';
                      if (isCorrectChoice) optStateClass = 'correct-opt';
                      else if (isUserChoice && !isCorrectChoice) optStateClass = 'incorrect-opt';

                      return (
                        <div key={optKey} className={`opt-item ${optStateClass}`}>
                          <div className="opt-key">{optKey}</div>
                          <div className="opt-val">{text}</div>
                          {isCorrectChoice && <span className="opt-badge font-bold">Correct Choice</span>}
                          {isUserChoice && !isCorrectChoice && <span className="opt-badge font-bold">Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution & Detailed Explanation Box */}
                  <div className="explanation-box">
                    <div className="exp-header font-bold text-purple-700">
                      <Sparkles className="w-4 h-4 text-purple-600" /> Solution Explanation:
                    </div>
                    <div className="exp-body">{q.explanation}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <style>{`
        .results-container {
          padding: 32px 0 64px 0;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .score-hero {
          padding: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .hero-left {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .score-badge-circle {
          width: 110px;
          height: 110px;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.25);
          flex-shrink: 0;
        }
        .score-num {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: #b45309;
        }
        .hero-details h2 {
          font-size: 1.8rem;
          margin: 6px 0;
        }
        .hero-details .subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
        }
        .hero-metrics {
          display: flex;
          gap: 16px;
          margin-top: 12px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .hero-actions {
          display: flex;
          gap: 12px;
        }

        .breakdown-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .breakdown-card {
          padding: 20px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .breakdown-card .value {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
        }
        .breakdown-card .label {
          font-size: 0.82rem;
          font-weight: 600;
        }

        /* Corrections section */
        .corrections-section {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .corrections-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .filter-controls {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-md);
        }
        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          color: var(--text-main);
          font-size: 0.9rem;
        }
        .filter-buttons {
          display: flex;
          gap: 6px;
        }
        .filter-btn {
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .filter-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .questions-correction-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .correction-card {
          border: 1px solid var(--card-border);
          border-radius: var(--radius-md);
          padding: 24px;
          background: var(--card-bg);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .correction-card.correct-card {
          border-left: 4px solid var(--correct);
        }
        .correction-card.incorrect-card {
          border-left: 4px solid var(--incorrect);
        }
        .card-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .left-tags {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .q-badge {
          font-family: var(--font-heading);
          font-weight: 800;
          color: var(--primary);
        }
        .category-tag {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: var(--primary-light);
          padding: 2px 10px;
          border-radius: var(--radius-full);
        }
        .question-text {
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--text-main);
          font-weight: 500;
        }

        .correction-options-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .opt-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--card-border);
          font-size: 0.95rem;
        }
        .opt-item.correct-opt {
          background: var(--correct-bg);
          border-color: var(--correct-border);
          color: var(--correct);
          font-weight: 600;
        }
        .opt-item.incorrect-opt {
          background: var(--incorrect-bg);
          border-color: var(--incorrect-border);
          color: var(--incorrect);
        }
        .opt-key {
          font-family: var(--font-heading);
          font-weight: 700;
          width: 24px;
        }
        .opt-val {
          flex: 1;
        }
        .opt-badge {
          font-size: 0.75rem;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          background: rgba(0,0,0,0.05);
        }

        .explanation-box {
          background: var(--primary-light);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.92rem;
          line-height: 1.5;
          color: var(--text-main);
        }
        .exp-header {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
    </div>
  );
};
