import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ExamPortal } from './components/ExamPortal';
import { ResultsView } from './components/ResultsView';
import { Question, MockSession, ExamMode, UserAnswers, FlaggedQuestions, ExamResult, ActiveExamState } from './types';

const SESSIONS: MockSession[] = [
  {
    id: 'mock1_ss1',
    title: 'CFA Level I - Mock 1 Session 1',
    shortTitle: 'Mock 1 Session 1',
    subtitle: 'Ethical Standards, Quantitative Methods, Economics & Financial Statement Analysis',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Ethics', 'Quantitative Methods', 'Economics', 'Financial Statement Analysis'],
    dataFile: '/data/mock1_ss1.json',
    iconName: 'BookOpen',
    badgeColor: 'purple'
  },
  {
    id: 'mock1_ss2',
    title: 'CFA Level I - Mock 1 Session 2',
    shortTitle: 'Mock 1 Session 2',
    subtitle: 'Corporate Issuers, Equity, Fixed Income, Derivatives, Alternative Investments & Portfolio Management',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Corporate Issuers', 'Equity', 'Fixed Income', 'Derivatives', 'Alternative Investments', 'Portfolio Management'],
    dataFile: '/data/mock1_ss2.json',
    iconName: 'Award',
    badgeColor: 'pink'
  },
  {
    id: 'mock2_ss1',
    title: 'CFA Level I - Mock 2 Session 1',
    shortTitle: 'Mock 2 Session 1',
    subtitle: 'Ethical Standards, Quantitative Methods, Economics & Financial Statement Analysis',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Ethics', 'Quantitative Methods', 'Economics', 'Financial Statement Analysis'],
    dataFile: '/data/mock2_ss1.json',
    iconName: 'BookOpen',
    badgeColor: 'blue'
  },
  {
    id: 'mock2_ss2',
    title: 'CFA Level I - Mock 2 Session 2',
    shortTitle: 'Mock 2 Session 2',
    subtitle: 'Corporate Issuers, Equity, Fixed Income, Derivatives, Alternative Investments & Portfolio Management',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Corporate Issuers', 'Equity', 'Fixed Income', 'Derivatives', 'Alternative Investments', 'Portfolio Management'],
    dataFile: '/data/mock2_ss2.json',
    iconName: 'Award',
    badgeColor: 'emerald'
  },
  {
    id: 'mock3_ss1',
    title: 'CFA Level I - Mock 3 Session 1',
    shortTitle: 'Mock 3 Session 1',
    subtitle: 'Ethical Standards, Quantitative Methods, Economics & Financial Statement Analysis',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Ethics', 'Quantitative Methods', 'Economics', 'Financial Statement Analysis'],
    dataFile: '/data/mock3_ss1.json',
    iconName: 'BookOpen',
    badgeColor: 'orange'
  },
  {
    id: 'mock3_ss2',
    title: 'CFA Level I - Mock 3 Session 2',
    shortTitle: 'Mock 3 Session 2',
    subtitle: 'Corporate Issuers, Equity, Fixed Income, Derivatives, Alternative Investments & Portfolio Management',
    questionsCount: 90,
    timeAllowedMinutes: 135,
    topics: ['Corporate Issuers', 'Equity', 'Fixed Income', 'Derivatives', 'Alternative Investments', 'Portfolio Management'],
    dataFile: '/data/mock3_ss2.json',
    iconName: 'Award',
    badgeColor: 'teal'
  }
];

const STORAGE_ACTIVE_EXAM_KEY = 'cfa_active_exam_state';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'dashboard' | 'exam' | 'results'>('dashboard');
  
  const [currentSession, setCurrentSession] = useState<MockSession | null>(null);
  const [examMode, setExamMode] = useState<ExamMode>('timed');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestions>({});
  
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const [currentResult, setCurrentResult] = useState<ExamResult | null>(null);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [hasSavedSession, setHasSavedSession] = useState(false);

  // Load theme, history, and active exam state from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('cfa_theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const savedHistory = localStorage.getItem('cfa_exam_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }

    const savedActiveExam = localStorage.getItem(STORAGE_ACTIVE_EXAM_KEY);
    if (savedActiveExam) {
      try {
        const parsed: ActiveExamState = JSON.parse(savedActiveExam);
        if (parsed && parsed.sessionId && parsed.questions && parsed.questions.length > 0) {
          setHasSavedSession(true);
        }
      } catch (e) {
        console.error('Failed to parse active exam state', e);
        localStorage.removeItem(STORAGE_ACTIVE_EXAM_KEY);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('cfa_theme', nextTheme);
  };

  // Persist active exam state while taking an exam
  useEffect(() => {
    if (view === 'exam' && currentSession && questions.length > 0) {
      const activeState: ActiveExamState = {
        sessionId: currentSession.id,
        examMode,
        questions,
        userAnswers,
        flaggedQuestions,
        timeRemainingSeconds,
        currentIndex,
        startTime: Date.now()
      };
      localStorage.setItem(STORAGE_ACTIVE_EXAM_KEY, JSON.stringify(activeState));
      setHasSavedSession(true);
    }
  }, [view, currentSession, questions, userAnswers, flaggedQuestions, timeRemainingSeconds, currentIndex, examMode]);

  const clearActiveExamState = () => {
    localStorage.removeItem(STORAGE_ACTIVE_EXAM_KEY);
    setHasSavedSession(false);
  };

  const resumeSavedExam = () => {
    const savedActiveExam = localStorage.getItem(STORAGE_ACTIVE_EXAM_KEY);
    if (!savedActiveExam) return;

    try {
      const parsed: ActiveExamState = JSON.parse(savedActiveExam);
      const session = SESSIONS.find(s => s.id === parsed.sessionId);
      if (!session) return;

      setCurrentSession(session);
      setExamMode(parsed.examMode);
      setQuestions(parsed.questions);
      setUserAnswers(parsed.userAnswers || {});
      setFlaggedQuestions(parsed.flaggedQuestions || {});
      setTimeRemainingSeconds(parsed.timeRemainingSeconds ?? null);
      setCurrentIndex(parsed.currentIndex || 0);
      setIsPaused(false);
      setView('exam');
    } catch (e) {
      console.error('Failed to resume saved exam', e);
      clearActiveExamState();
    }
  };

  const handleAutoSubmit = () => {
    handleSubmitExam();
  };

  // Timer countdown implementation
  useEffect(() => {
    if (view === 'exam' && examMode === 'timed' && timeRemainingSeconds !== null && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev === null || prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, examMode, isPaused, timeRemainingSeconds === null]);

  const handleStartExam = async (session: MockSession, mode: ExamMode) => {
    setLoading(true);
    setCurrentSession(session);
    setExamMode(mode);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);

    try {
      const res = await fetch(session.dataFile);
      const data: Question[] = await res.json();
      setQuestions(data);

      if (mode === 'timed') {
        setTimeRemainingSeconds(session.timeAllowedMinutes * 60);
      } else {
        setTimeRemainingSeconds(null);
      }
      setIsPaused(false);
      setView('exam');
    } catch (err) {
      console.error('Failed to load dataset file', err);
      alert('Failed to load exam data. Please check data files.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, option: 'A' | 'B' | 'C') => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleClearOption = (questionId: number) => {
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const calculateResult = (): ExamResult | null => {
    if (!currentSession || questions.length === 0) return null;

    let score = 0;
    const topicBreakdown: { [topic: string]: { correct: number; total: number; percentage: number } } = {};

    questions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) {
        score++;
      }

      const category = q.category || 'General';
      if (!topicBreakdown[category]) {
        topicBreakdown[category] = { correct: 0, total: 0, percentage: 0 };
      }
      topicBreakdown[category].total += 1;
      if (isCorrect) {
        topicBreakdown[category].correct += 1;
      }
    });

    Object.keys(topicBreakdown).forEach((cat) => {
      const t = topicBreakdown[cat];
      t.percentage = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    let timeSpent = 0;
    if (examMode === 'timed' && timeRemainingSeconds !== null) {
      timeSpent = (currentSession.timeAllowedMinutes * 60) - timeRemainingSeconds;
    }

    const result: ExamResult = {
      id: 'res_' + Date.now(),
      sessionId: currentSession.id,
      sessionTitle: currentSession.shortTitle,
      date: new Date().toISOString(),
      timeSpentSeconds: Math.max(timeSpent, 0),
      mode: examMode,
      totalQuestions,
      score,
      percentage,
      passed,
      userAnswers,
      flaggedQuestions,
      topicBreakdown
    };

    return result;
  };

  const handleSubmitExam = () => {
    const res = calculateResult();
    if (!res) return;

    setCurrentResult(res);
    const newHistory = [res, ...history];
    setHistory(newHistory);
    localStorage.setItem('cfa_exam_history', JSON.stringify(newHistory));

    clearActiveExamState();
    setView('results');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your test history?')) {
      setHistory([]);
      localStorage.removeItem('cfa_exam_history');
    }
  };

  return (
    <div className="app-main-wrapper">
      <Navbar
        currentSession={view === 'exam' ? currentSession : null}
        examMode={examMode}
        timeRemainingSeconds={timeRemainingSeconds}
        isPaused={isPaused}
        theme={theme}
        onToggleTheme={toggleTheme}
        onGoHome={() => {
          if (view === 'exam') {
            if (window.confirm('Are you sure you want to exit the exam? Your progress will be saved.')) {
              setView('dashboard');
            }
          } else {
            setView('dashboard');
          }
        }}
      />

      <main className="container flex-1">
        {loading ? (
          <div className="loading-spinner-container">
            <div className="cute-loader">🎓 Loading Questions...</div>
          </div>
        ) : view === 'dashboard' ? (
          <Dashboard
            sessions={SESSIONS}
            history={history}
            hasSavedSession={hasSavedSession}
            onResumeSavedExam={resumeSavedExam}
            onStartExam={handleStartExam}
            onReviewResult={(res) => {
              const session = SESSIONS.find(s => s.id === res.sessionId);
              if (session) {
                fetch(session.dataFile)
                  .then(r => r.json())
                  .then(qs => {
                    setQuestions(qs);
                    setCurrentResult(res);
                    setView('results');
                  });
              }
            }}
            onClearHistory={handleClearHistory}
          />
        ) : view === 'exam' && currentSession ? (
          <ExamPortal
            session={currentSession}
            questions={questions}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onSelectOption={handleSelectOption}
            onToggleFlag={handleToggleFlag}
            onClearOption={handleClearOption}
            onSubmitExam={handleSubmitExam}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
          />
        ) : view === 'results' && currentResult ? (
          <ResultsView
            result={currentResult}
            questions={questions}
            onRetake={() => {
              const session = SESSIONS.find(s => s.id === currentResult.sessionId);
              if (session) handleStartExam(session, currentResult.mode);
            }}
            onGoDashboard={() => setView('dashboard')}
          />
        ) : null}
      </main>

      <footer className="footer-bar">
        <div className="container footer-inner">
          <span>Personalized CFA Mock Portal ✨ Lightweight Vercel Ready App</span>
          <span>Designed with ❤️ for CFA Level I Success</span>
        </div>
      </footer>

      <style>{`
        .app-main-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .loading-spinner-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }
        .cute-loader {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          animation: pulse 1.2s infinite;
        }
        .footer-bar {
          margin-top: auto;
          background: var(--card-bg);
          border-top: 1px solid var(--card-border);
          padding: 16px 0;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
      `}</style>
    </div>
  );
};
