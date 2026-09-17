import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  Heart,
  UserRound,
  Search,
  Play,
  Sparkles,
  Trash2,
  Volume2,
  X,
} from "lucide-react";
import { scheduleReview, progressPercent } from "./services/learningService";
import { saveGroupProgress, setReviewStatus } from "./services/practiceProgressService";
import { storageService } from "./services/storageService";
import { translationService } from "./services/translationService";
import { ttsService } from "./services/ttsService";
import type {
  Direction,
  HistoryItem,
  PracticeProgress,
  PracticeRating,
  TranslationResult,
  VocabularyItem,
} from "./types";
import { bookVocabulary, LessonOnePage, phrases } from "./pages/LessonOnePage";
import { LessonTwoPage } from "./pages/LessonTwoPage";
import { LessonThreePage } from "./pages/LessonThreePage";
import { TestOnePage } from "./pages/TestOnePage";
import {
  lessonTwoDaysAndTime,
  lessonTwoEverydaySentences,
  lessonTwoNumbers,
  lessonTwoOlla,
} from "./data/lessonTwoPractice";
import { lessonThreeIntroductions, lessonThreeQuestions, lessonThreeVowelHarmony } from "./data/lessonThreePractice";

type Page = "dictionary" | "lessons" | "favorites" | "practice" | "profile";
type Mode = "flashcard" | "choice" | "matching" | "blank";
const flashcardWordClass = (word: string) => {
  if (word.length > 32) return "word-extra-long";
  if (word.length > 22) return "word-long";
  if (word.length > 14) return "word-medium";
  return "word-short";
};
const nav = {
  dictionary: { id: "dictionary", label: "Search", icon: Search },
  lessons: { id: "lessons", label: "Lessons", icon: BookOpen },
  favorites: { id: "favorites", label: "Favorites", icon: Heart },
  practice: { id: "practice", label: "Practice", icon: Brain },
  profile: { id: "profile", label: "Profile", icon: UserRound },
} as const;
const desktopNav = [nav.dictionary, nav.lessons, nav.favorites, nav.practice, nav.profile];
const mobileNav = [nav.lessons, nav.favorites, nav.dictionary, nav.practice, nav.profile];
const normalizeSearch = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("fi-FI");
const toVocab = (r: TranslationResult): VocabularyItem => ({
  ...r,
  favorite: true,
  createdAt: new Date().toISOString(),
  reviewCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  difficulty: "new",
  nextReviewAt: new Date().toISOString(),
  mastered: false,
});

function SpeakButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false),
    [unsupported, setUnsupported] = useState(false);
  const speak = (event: React.MouseEvent) => {
    event.stopPropagation();
    setUnsupported(false);
    const ok = ttsService.speak(
      text,
      () => setPlaying(false),
      () => {
        setPlaying(false);
        setUnsupported(true);
      },
    );
    if (!ok) setUnsupported(true);
    else setPlaying(!playing);
  };
  return (
    <>
      <button
        type="button"
        className={`icon-button ${playing ? "playing" : ""}`}
        onClick={speak}
        aria-label={`Listen to ${text}`}
      >
        <Volume2 size={18} />
      </button>
      {unsupported && (
        <span className="micro-error">Finnish voice unavailable</span>
      )}
    </>
  );
}

function Empty({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Heart;
  title: string;
  body: string;
}) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function LessonsHub({ onOpen }: { onOpen: (lesson: 1 | 2 | 3 | "test1") => void }) {
  return (
    <section className="page lessons-page">
      <div className="page-heading">
        <div>
          <span className="kicker">YOUR FINNISH JOURNEY</span>
          <h1>Lessons</h1>
        </div>
      </div>
      <div className="lessons-grid">
        <button
          type="button"
          className="lesson-card test-card"
          onClick={() => onOpen("test1")}
          aria-label="Test 1, complete exam review, texts, vocabulary, grammar, and questions"
        >
          <span className="lesson-card-number">T1</span>
          <span className="lesson-card-copy">
            <b>Test 1 · Complete exam review</b>
            <span>Texts · Phrases · Numbers · Grammar · Questions</span>
          </span>
          <span className="lesson-card-arrow" aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          className="lesson-card"
          onClick={() => onOpen(1)}
          aria-label="Lesson 1, Introduction to Finnish, Alphabet, sounds, greetings, and essential phrases"
        >
          <span className="lesson-card-number">01</span>
          <span className="lesson-card-copy">
            <b>Introduction to Finnish</b>
            <span>Alphabet · Sounds · Greetings · Essential phrases</span>
          </span>
          <span className="lesson-card-arrow" aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          className="lesson-card"
          onClick={() => onOpen(3)}
          aria-label="Lesson 3, Finnish sentence toolkit, vowel harmony, verbs, questions, and introductions"
        >
          <span className="lesson-card-number">03</span>
          <span className="lesson-card-copy">
            <b>Finnish sentence toolkit</b>
            <span>Vowel harmony · Verbs · Questions · Introductions</span>
          </span>
          <span className="lesson-card-arrow" aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          className="lesson-card"
          onClick={() => onOpen(2)}
          aria-label="Lesson 2, Everyday Finnish, Olla, days, time, numbers, and useful sentences"
        >
          <span className="lesson-card-number">02</span>
          <span className="lesson-card-copy">
            <b>Everyday Finnish</b>
            <span>Olla · Days &amp; time · Numbers · Useful sentences</span>
          </span>
          <span className="lesson-card-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

function RecentSearches({
  items,
  emptyMessage,
  onOpen,
  onRemove,
  onClear,
}: {
  items: HistoryItem[];
  emptyMessage?: string;
  onOpen: (result: TranslationResult) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <section className="dictionary-recent" aria-labelledby="recent-searches-heading">
      <div className="recent-heading">
        <div>
          <span className="kicker">YOUR WORD TRAIL</span>
          <h2 id="recent-searches-heading">Recent searches</h2>
        </div>
        {items.length > 0 && (
          <button type="button" className="text-button" onClick={onClear} aria-label="Clear all recent searches">
            Clear all
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="recent-empty">{emptyMessage ?? "Words you search for will appear here."}</p>
      ) : (
        <div className="recent-list">
          {items.map((item) => (
            <article key={item.id} className="recent-item">
              <button
                type="button"
                className="recent-open"
                onClick={() => onOpen(item.result)}
                aria-label={`Open ${item.result.finnish}, ${item.result.english}`}
              >
                <b>{item.result.finnish}</b>
                <span>{item.result.english}</span>
              </button>
              <SpeakButton text={item.result.finnish} />
              <button
                type="button"
                className="recent-remove"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.result.finnish}`}
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ProfilePage({ favorites, reviewCount }: { favorites: number; reviewCount: number }) {
  const [soundStatus, setSoundStatus] = useState<"idle" | "playing" | "success" | "error">("idle");
  const testSound = () => {
    setSoundStatus("playing");
    const ok = ttsService.speak(
      "Hei! Tervetuloa.",
      () => setSoundStatus("success"),
      () => setSoundStatus("error"),
    );
    if (!ok) setSoundStatus("error");
  };

  return (
    <section className="page profile-page">
      <div className="profile-avatar" aria-hidden="true"><UserRound /></div>
      <div className="page-heading">
        <div>
          <h1>Profile</h1>
        </div>
      </div>
      <div className="profile-summary">
        <div><b>{favorites}</b><span>Favorite words</span></div>
        <div><b>{reviewCount}</b><span>Words to review</span></div>
      </div>
      <section className="profile-sound" aria-labelledby="profile-sound-heading">
        <div>
          <h2 id="profile-sound-heading">Finnish voice</h2>
          <p>Check that Finnish pronunciation works on this device.</p>
        </div>
        <button type="button" className="sound-test-button" onClick={testSound} disabled={soundStatus === "playing"}>
          <Volume2 size={18} />
          {soundStatus === "playing" ? "Playing…" : "Test sound"}
        </button>
        {soundStatus !== "idle" && (
          <p className={`sound-test-status ${soundStatus}`} role="status">
            {soundStatus === "playing" && "Playing…"}
            {soundStatus === "success" && "Sound is working"}
            {soundStatus === "error" && "Finnish voice unavailable"}
          </p>
        )}
      </section>
    </section>
  );
}

function App() {
  const [page, setPage] = useState<Page>("dictionary"),
    [query, setQuery] = useState(""),
    [searchFocused, setSearchFocused] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState("");
  const [favorites, setFavorites] = useState<VocabularyItem[]>(
      storageService.favorites,
    ),
    [history, setHistory] = useState<HistoryItem[]>(storageService.history),
    [practiceProgress, setPracticeProgress] = useState<PracticeProgress>(
      storageService.practiceProgress,
    );
  const [filter, setFilter] = useState(""),
    [activeLesson, setActiveLesson] = useState<1 | 2 | 3 | "test1" | null>(null);
  const fullViewportHeight = useRef(0);
  const searchInput = useRef<HTMLInputElement>(null);
  const direction: Direction = "auto";
  useEffect(() => {
    window.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  }, [page, activeLesson, result?.id]);
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const handleViewportResize = () => {
      const activeSearch = document.activeElement?.getAttribute("aria-label") === "Search Finnish or English";
      if (!activeSearch || !fullViewportHeight.current) return;
      setSearchFocused(viewport.height < fullViewportHeight.current * 0.85);
    };
    viewport.addEventListener("resize", handleViewportResize);
    return () => viewport.removeEventListener("resize", handleViewportResize);
  }, []);
  const saveFav = (next: VocabularyItem[]) => {
    setFavorites(next);
    storageService.saveFavorites(next);
  };
  const saveHist = (next: HistoryItem[]) => {
    setHistory(next);
    storageService.saveHistory(next);
  };
  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    const normalizedQuery = normalizeSearch(query);
    if (!normalizedQuery) return;
    setQuery(normalizedQuery);
    const cached = history.find((item) => [
      item.result.query,
      item.result.finnish,
      item.result.english,
    ].some((value) => normalizeSearch(value) === normalizedQuery));
    if (cached) {
      setResult(cached.result);
      setError("");
      saveHist([cached, ...history.filter((item) => item.id !== cached.id)]);
      searchInput.current?.blur();
      setSearchFocused(false);
      return;
    }
    setResult(null);
    setLoading(true);
    setError("");
    try {
      const r = await translationService.translate(normalizedQuery, direction);
      setResult(r);
      saveHist([
        {
          id: crypto.randomUUID(),
          result: r,
          createdAt: new Date().toISOString(),
        },
        ...history,
      ]);
    } catch (caught) {
      setError(caught instanceof Error && caught.message === "translation_not_found"
        ? "translation_not_found"
        : "translation_failed");
    } finally {
      setLoading(false);
      searchInput.current?.blur();
      setSearchFocused(false);
    }
  };
  const favorite = () => {
    if (!result) return;
    const exists = favorites.some((x) => x.finnish === result.finnish);
    saveFav(
      exists
        ? favorites.filter((x) => x.finnish !== result.finnish)
        : [toVocab(result), ...favorites],
    );
  };
  const reopen = (r: TranslationResult) => {
    setResult(r);
    setQuery(r.query);
    setPage("dictionary");
  };
  const clearSearch = () => {
    setQuery("");
    setResult(null);
    setError("");
    searchInput.current?.focus();
  };
  const activeFav =
    result && favorites.some((x) => x.finnish === result.finnish);
  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    if (nextPage === "lessons") setActiveLesson(null);
    if (nextPage === "dictionary") window.setTimeout(() => searchInput.current?.focus(), 0);
  };
  const pageTitle = page === "dictionary"
    ? "Search"
    : page === "lessons" && activeLesson === 1
      ? "Lesson 1"
      : page === "lessons" && activeLesson === 2
        ? "Lesson 2"
      : page === "lessons" && activeLesson === 3
        ? "Lesson 3"
      : page === "lessons" && activeLesson === "test1"
        ? "Test 1"
      : nav[page].label;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span>Sisu</span>
        </div>
        <p className="eyebrow">FINNISH, EVERY DAY</p>
        <nav>
          {desktopNav.map((n) => (
            <button
              key={n.id}
              className={page === n.id ? "active" : ""}
              onClick={() => {
                navigate(n.id);
              }}
              aria-label={n.label}
            >
              <n.icon size={20} />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div className="daily">
          <Sparkles size={18} />
          <div>
            <b>Päivän sana</b>
            <span>Small steps count.</span>
          </div>
        </div>
      </aside>
      <main>
        <header className="mobile-head">
          {page === "lessons" && activeLesson !== null && (
            <button
              type="button"
              className="mobile-back"
              onClick={() => setActiveLesson(null)}
              aria-label="Back to Lessons"
            >
              <ChevronLeft />
            </button>
          )}
          <h1 data-testid="mobile-page-title">{pageTitle}</h1>
        </header>
        {page === "dictionary" && (
          <section className={`page dictionary ${searchFocused ? "search-focused" : ""} ${result ? "has-result" : ""}`}>
            <div className="hero">
              <span className="kicker">YOUR FINNISH COMPANION</span>
              <h1>
                Understand Finnish.
                <br />
                <em>One word at a time.</em>
              </h1>
            </div>
            <form className="search-card" onSubmit={submit}>
              <div className="search-line">
                <Search />
                <input
                  ref={searchInput}
                  value={query}
                  onChange={(e) => {
                    const nextQuery = e.target.value;
                    setQuery(nextQuery);
                    if (!nextQuery.trim()) {
                      setResult(null);
                      setError("");
                    }
                  }}
                  onFocus={() => {
                    fullViewportHeight.current = window.visualViewport?.height || window.innerHeight;
                    setSearchFocused(true);
                  }}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search Finnish or English..."
                  aria-label="Search Finnish or English"
                />
                {(query || result || error) && (
                  <button type="button" className="clear" onClick={clearSearch} aria-label="Clear search">
                    <X size={16} />
                  </button>
                )}
                <button className="primary search-submit" disabled={loading}>
                  {loading ? "Thinking…" : "Translate"}
                  <span>↵</span>
                </button>
              </div>
            </form>
            {!result && !error && !loading && (
              <div className="suggestions">
                <span>Try searching</span>
                {["opiskelija", "Mitä kuuluu?", "I am learning Finnish"].map(
                  (s) => (
                    <button key={s} onClick={() => setQuery(s)}>
                      {s}
                    </button>
                  ),
                )}
              </div>
            )}
            {error && (
              <div className={`error-card ${error === "translation_not_found" ? "not-found" : ""}`} role="status">
                <h2>{error === "translation_not_found" ? "Word not found" : "Translation unavailable"}</h2>
                <p>{error === "translation_not_found"
                  ? "Check the spelling or try another word."
                  : "Please check your connection and try again."}</p>
                {error !== "translation_not_found" && <button onClick={() => submit()}>Try again</button>}
              </div>
            )}
            {result && (
              <article className="result">
                <div className="result-top">
                  <div>
                    <span className="label">FINNISH</span>
                    <div className="word-row">
                      <h2>{result.finnish}</h2>
                      <SpeakButton text={result.finnish} />
                    </div>
                    {result.pronunciation && (
                      <p className="pronunciation">{result.pronunciation}</p>
                    )}
                    {result.partOfSpeech && (
                      <span className="pill">{result.partOfSpeech}</span>
                    )}
                  </div>
                  <button
                    className={`favorite ${activeFav ? "saved" : ""}`}
                    onClick={favorite}
                  >
                    <Heart
                      size={18}
                      fill={activeFav ? "currentColor" : "none"}
                    />
                    {activeFav ? "Favorited" : "Add to favorites"}
                  </button>
                </div>
                <div className="translation">
                  <span className="label">ENGLISH</span>
                  <h3>{result.english}</h3>
                </div>
                <div className="example">
                  <div className="section-title">
                    <span>Example</span>
                    <SpeakButton text={result.exampleFinnish} />
                  </div>
                  <p className="finnish-example">{result.exampleFinnish}</p>
                  <p>{result.exampleEnglish}</p>
                </div>
                {result.breakdown?.length ? (
                  <details>
                    <summary>Vocabulary breakdown</summary>
                    <div className="breakdown">
                      {result.breakdown.map((b, i) => (
                        <div key={i}>
                          <b>{b.finnish}</b>
                          <span>{b.english}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
                {(result.baseForm || result.grammarNote) && (
                  <details>
                    <summary>Show more grammar</summary>
                    <div className="grammar">
                      {result.baseForm && (
                        <p>
                          <b>Base form</b> {result.baseForm}
                        </p>
                      )}
                      {result.grammarNote && <p>{result.grammarNote}</p>}
                    </div>
                  </details>
                )}
              </article>
            )}
            {!result && !error && <RecentSearches
              items={history.filter((item) => {
                const needle = query.trim().toLowerCase();
                return !needle || `${item.result.finnish} ${item.result.english}`.toLowerCase().includes(needle);
              })}
              emptyMessage={query.trim() && history.length > 0 ? "No matching recent searches" : undefined}
              onOpen={reopen}
              onRemove={(id) => saveHist(history.filter((item) => item.id !== id))}
              onClear={() => saveHist([])}
            />}
          </section>
        )}
        {page === "lessons" && (
          activeLesson === 1
            ? <LessonOnePage />
            : activeLesson === 2
              ? <LessonTwoPage />
            : activeLesson === 3
              ? <LessonThreePage />
            : activeLesson === "test1"
              ? <TestOnePage />
            : <LessonsHub onOpen={setActiveLesson} />
        )}
        {page === "favorites" && (
          <ListPage
            title="Favorites"
            items={favorites}
            filter={filter}
            setFilter={setFilter}
            empty={
              <Empty
                icon={Heart}
                title="No favorites yet"
                body="Save useful Finnish words while you learn."
              />
            }
            onOpen={reopen}
            onRemove={(id) => saveFav(favorites.filter((x) => x.id !== id))}
          />
        )}
        {page === "practice" && (
          <Practice
            items={favorites}
            progress={practiceProgress}
            onWordResult={(groupId, item, correct, reviewSession) => {
              if (correct && !reviewSession) return;
              setPracticeProgress((current) => {
                const next = setReviewStatus(current, groupId, item, correct);
                storageService.savePracticeProgress(next);
                return next;
              });
            }}
            onGroupComplete={(groupId, firstAttempts) => {
              setPracticeProgress((current) => {
                const next = saveGroupProgress(current, groupId, firstAttempts);
                storageService.savePracticeProgress(next);
                return next;
              });
            }}
            onUpdate={(updated) =>
              saveFav(favorites.map((x) => (x.id === updated.id ? updated : x)))
            }
          />
        )}
        {page === "profile" && (
          <ProfilePage favorites={favorites.length} reviewCount={practiceProgress.reviewWords.length} />
        )}
      </main>
      <nav className="bottom-nav">
        {mobileNav.map((n) => (
          <button
            key={n.id}
            className={`${page === n.id ? "active" : ""} ${n.id === "dictionary" ? "nav-dictionary" : ""}`}
            onClick={() => {
              navigate(n.id);
            }}
            aria-label={n.label}
          >
            <n.icon />
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function ListPage({
  title,
  items,
  filter,
  setFilter,
  empty,
  onOpen,
  onRemove,
  clearAll,
}: {
  title: string;
  items: VocabularyItem[];
  filter: string;
  setFilter: (s: string) => void;
  empty: React.ReactNode;
  onOpen: (r: TranslationResult) => void;
  onRemove: (id: string) => void;
  clearAll?: () => void;
}) {
  const visible = items.filter((x) =>
    (x.finnish + " " + x.english).toLowerCase().includes(filter.toLowerCase()),
  );
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="kicker">YOUR LIBRARY</span>
          <h1>{title}</h1>
        </div>
        {clearAll && items.length > 0 ? (
          <button className="text-button" onClick={clearAll}>
            Clear all
          </button>
        ) : null}
      </div>
      {items.length > 0 && (
        <div className="filter">
          <Search size={18} />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
          />
        </div>
      )}
      {!items.length ? (
        empty
      ) : (
        <div className="vocab-list">
          {visible.map((x) => (
            <article key={x.id} onClick={() => onOpen(x)}>
              <div className="avatar">{x.finnish[0]?.toUpperCase()}</div>
              <div className="vocab-copy">
                <h3>{x.finnish}</h3>
                <p>{x.english}</p>
                {x.reviewCount > 0 && (
                  <div className="mini-progress">
                    <i style={{ width: `${progressPercent(x)}%` }} />
                    <span>{progressPercent(x)}%</span>
                  </div>
                )}
              </div>
              <SpeakButton text={x.finnish} />
              <button
                className="icon-button danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(x.id);
                }}
                aria-label={`Remove ${x.finnish}`}
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

type PracticeGroup = { id: string; title: string; items: VocabularyItem[] };

function GroupLevel({ progress }: { progress: PracticeProgress["groups"][string] | undefined }) {
  const label = progress
    ? `Level ${progress.level} of 5, latest score ${progress.accuracy} percent`
    : "Not practised yet";
  return (
    <span className="group-level" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={index}
          aria-hidden="true"
          className={progress && index < progress.level ? `filled level-${progress.level}` : ""}
        />
      ))}
    </span>
  );
}

const practiceItem = ([finnish, english]: string[], prefix: string, index: number): VocabularyItem => ({
  id: `${prefix}-${index}`,
  query: finnish,
  direction: "fi-en",
  finnish,
  english,
  exampleFinnish: finnish,
  exampleEnglish: english,
  favorite: false,
  createdAt: "",
  reviewCount: 0,
  correctCount: 0,
  incorrectCount: 0,
  difficulty: "new",
  nextReviewAt: "",
  mastered: false,
});

const chunkGroups = (title: string, id: string, items: VocabularyItem[]): PracticeGroup[] =>
  Array.from({ length: Math.ceil(items.length / 10) }, (_, index) => ({
    id: `${id}-${index + 1}`,
    title: `${title} (${index + 1})`,
    items: items.slice(index * 10, index * 10 + 10),
  }));

const numberVocabulary = [
  ["nolla", "zero"],
  ["yksi", "one"],
  ["kaksi", "two"],
  ["kolme", "three"],
  ["neljä", "four"],
  ["viisi", "five"],
  ["kuusi", "six"],
  ["seitsemän", "seven"],
  ["kahdeksan", "eight"],
  ["yhdeksän", "nine"],
  ["kymmenen", "ten"],
  ["yksitoista", "eleven"],
  ["kaksitoista", "twelve"],
  ["kolmetoista", "thirteen"],
  ["neljätoista", "fourteen"],
  ["viisitoista", "fifteen"],
  ["kuusitoista", "sixteen"],
  ["seitsemäntoista", "seventeen"],
  ["kahdeksantoista", "eighteen"],
  ["yhdeksäntoista", "nineteen"],
  ["kaksikymmentä", "twenty"],
  ["kolmekymmentä", "thirty"],
  ["neljäkymmentä", "forty"],
  ["viisikymmentä", "fifty"],
  ["kuusikymmentä", "sixty"],
  ["seitsemänkymmentä", "seventy"],
  ["kahdeksankymmentä", "eighty"],
  ["yhdeksänkymmentä", "ninety"],
  ["sata", "one hundred"],
];

const colorVocabulary = [
  ["punainen", "red"],
  ["sininen", "blue"],
  ["keltainen", "yellow"],
  ["vihreä", "green"],
  ["oranssi", "orange"],
  ["violetti", "purple"],
  ["vaaleanpunainen", "pink"],
  ["musta", "black"],
  ["valkoinen", "white"],
  ["harmaa", "gray"],
  ["ruskea", "brown"],
  ["turkoosi", "turquoise"],
];

const lettersOnly = (value: string) =>
  (value.match(/\p{L}/gu) || []).join("").toLocaleLowerCase("fi");

const liveBlank = (answer: string, input: string) => {
  const typedLetters = input.match(/\p{L}/gu) || [];
  let typedPosition = 0;
  return answer
    .split("")
    .map((character) =>
      /\p{L}/u.test(character)
        ? typedLetters[typedPosition++] || "_"
        : character,
    )
    .join(" ");
};

const shuffled = <T,>(values: T[]) => {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};

function Practice({
  items,
  progress,
  onWordResult,
  onGroupComplete,
  onUpdate,
}: {
  items: VocabularyItem[];
  progress: PracticeProgress;
  onWordResult: (
    groupId: string,
    item: VocabularyItem,
    correct: boolean,
    reviewSession: boolean,
  ) => void;
  onGroupComplete: (groupId: string, firstAttempts: boolean[]) => void;
  onUpdate: (x: VocabularyItem) => void;
}) {
  const [started, setStarted] = useState(false),
    [mode, setMode] = useState<Mode>("flashcard"),
    [selectedGroupId, setSelectedGroupId] = useState(""),
    [reviewDeck, setReviewDeck] = useState<VocabularyItem[] | null>(null),
    [listPlaying, setListPlaying] = useState(false),
    [playingWordId, setPlayingWordId] = useState<string | null>(null),
    [index, setIndex] = useState(0),
    [practiceQueue, setPracticeQueue] = useState<number[]>([]),
    [completedCount, setCompletedCount] = useState(0),
    [revealed, setRevealed] = useState(false),
    [selected, setSelected] = useState(""),
    [matched, setMatched] = useState<string[]>([]),
    [matchSelection, setMatchSelection] = useState<{
      key: string;
      id: string;
      side: "fi" | "en";
    } | null>(null),
    [blank, setBlank] = useState(""),
    [usedLetterIds, setUsedLetterIds] = useState<string[]>([]),
    [firstAttempts, setFirstAttempts] = useState<Record<string, boolean>>({}),
    [done, setDone] = useState(false);
  const playbackId = useRef(0);
  useEffect(() => {
    window.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
    document
      .querySelectorAll<HTMLElement>(".practice-session .flashcard, .practice-session .quiz")
      .forEach((element) => {
        element.scrollTop = 0;
      });
  }, [selectedGroupId, reviewDeck, started, done, index]);
  const vocabItems = useMemo(
      () => bookVocabulary.map((row, index) => practiceItem(row, "vocab", index)),
      [],
    ),
    phraseItems = useMemo(
      () => phrases.map((row, index) => practiceItem(row, "phrase", index)),
      [],
    ),
    numberItems = useMemo(
      () => numberVocabulary.map((row, index) => practiceItem(row, "number", index)),
      [],
    ),
    colorItems = useMemo(
      () => colorVocabulary.map((row, index) => practiceItem(row, "color", index)),
      [],
    ),
    lessonTwoOllaItems = useMemo(
      () => lessonTwoOlla.map((row, index) => practiceItem(row, "lesson2-olla", index)),
      [],
    ),
    lessonTwoTimeItems = useMemo(
      () => lessonTwoDaysAndTime.map((row, index) => practiceItem(row, "lesson2-time", index)),
      [],
    ),
    lessonTwoNumberItems = useMemo(
      () => lessonTwoNumbers.map((row, index) => practiceItem(row, "lesson2-number", index)),
      [],
    ),
    lessonTwoSentenceItems = useMemo(
      () => lessonTwoEverydaySentences.map((row, index) => practiceItem(row, "lesson2-sentence", index)),
      [],
    ),
    lessonThreeVowelItems = useMemo(
      () => lessonThreeVowelHarmony.map((row, index) => practiceItem(row, "lesson3-vowels", index)),
      [],
    ),
    lessonThreeQuestionItems = useMemo(
      () => lessonThreeQuestions.map((row, index) => practiceItem(row, "lesson3-questions", index)),
      [],
    ),
    lessonThreeIntroductionItems = useMemo(
      () => lessonThreeIntroductions.map((row, index) => practiceItem(row, "lesson3-introductions", index)),
      [],
    ),
    groups = useMemo(
      () => [
        ...chunkGroups("Favorites", "favorites", items),
        ...chunkGroups("Vocab — Page 12", "vocab", vocabItems),
        ...chunkGroups("Useful Phrases — Pages 12–13", "phrases", phraseItems),
        ...chunkGroups("Numbers", "numbers", numberItems),
        ...chunkGroups("Colors", "colors", colorItems),
        ...chunkGroups("Lesson 2 — Olla", "lesson2-olla", lessonTwoOllaItems),
        ...chunkGroups("Lesson 2 — Days & Time", "lesson2-time", lessonTwoTimeItems),
        ...chunkGroups("Lesson 2 — Numbers", "lesson2-number", lessonTwoNumberItems),
        ...chunkGroups("Lesson 2 — Everyday Sentences", "lesson2-sentence", lessonTwoSentenceItems),
        ...chunkGroups("Lesson 3 — Vowel harmony", "lesson3-vowels", lessonThreeVowelItems),
        ...chunkGroups("Lesson 3 — Questions", "lesson3-questions", lessonThreeQuestionItems),
        ...chunkGroups("Lesson 3 — Introductions", "lesson3-introductions", lessonThreeIntroductionItems),
      ],
      [colorItems, items, lessonThreeIntroductionItems, lessonThreeQuestionItems, lessonThreeVowelItems, lessonTwoNumberItems, lessonTwoOllaItems, lessonTwoSentenceItems, lessonTwoTimeItems, numberItems, phraseItems, vocabItems],
    ),
    groupSections = useMemo(
      () => Array.from(new Set(groups.map((group) => group.id.replace(/-\d+$/, ""))))
        .map((sectionId) => ({
          id: sectionId,
          groups: groups.filter((group) => group.id.replace(/-\d+$/, "") === sectionId),
        })),
      [groups],
    ),
    regularGroup = groups.find((group) => group.id === selectedGroupId) || groups[0],
    selectedGroup = reviewDeck
      ? { id: "review", title: "Words to review", items: reviewDeck }
      : regularGroup,
    deck = selectedGroup.items,
    item = deck[(practiceQueue[index] ?? index) % deck.length];
  const hasSelectedGroup = reviewDeck !== null || Boolean(selectedGroupId);
  const letterTiles = useMemo(
    () => shuffled((item?.finnish.match(/\p{L}/gu) || []).map((letter, position) => ({
      id: `${item.id}-letter-${position}`,
      letter,
    }))),
    [item],
  );
  const choices = useMemo(
    () => {
      const alternatives = shuffled(
        deck
          .filter((entry) => entry.english !== item?.english)
          .map((entry) => entry.english),
      );
      return shuffled(
        Array.from(
          new Set([item?.english, ...alternatives.slice(0, 3)]),
        ).filter((answer): answer is string => Boolean(answer)),
      );
    },
    [deck, item],
  );
  const matchColumns = useMemo(() => {
    const orderedEntries = started && practiceQueue.length
      ? practiceQueue.map((position) => deck[position])
      : deck;
    const finnishEntries = shuffled(orderedEntries);
    const offset =
      finnishEntries.length > 1
        ? 1 + Math.floor(Math.random() * (finnishEntries.length - 1))
        : 0;
    const englishEntries = finnishEntries.map(
      (_, position) =>
        finnishEntries[(position + offset) % finnishEntries.length],
    );
    return {
      finnish: finnishEntries.map((entry) => ({
        key: `${entry.id}-fi`,
        id: entry.id,
        text: entry.finnish,
        side: "fi" as const,
      })),
      english: englishEntries.map((entry) => ({
        key: `${entry.id}-en`,
        id: entry.id,
        text: entry.english,
        side: "en" as const,
      })),
    };
  }, [deck, practiceQueue, started]);

  useEffect(() => {
    if (
      started &&
      !done &&
      (mode === "choice" || mode === "flashcard") &&
      item
    ) {
      ttsService.speak(item.finnish);
    }
  }, [done, item, mode, started]);

  useEffect(() => () => {
    playbackId.current += 1;
    ttsService.stop();
  }, []);

  useEffect(() => {
    if (!playingWordId) return;
    document.querySelector(`[data-practice-word="${playingWordId}"]`)
      ?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, [playingWordId]);

  const stopListPlayback = () => {
    playbackId.current += 1;
    ttsService.stop();
    setListPlaying(false);
    setPlayingWordId(null);
  };
  const playAllWords = () => {
    if (listPlaying) {
      stopListPlayback();
      return;
    }
    const requestId = playbackId.current + 1;
    playbackId.current = requestId;
    setListPlaying(true);
    const speakAt = (position: number) => {
      if (requestId !== playbackId.current) return;
      if (position >= deck.length) {
        setListPlaying(false);
        setPlayingWordId(null);
        return;
      }
      setPlayingWordId(deck[position].id);
      const ok = ttsService.speak(
        deck[position].finnish,
        () => speakAt(position + 1),
        () => {
          setListPlaying(false);
          setPlayingWordId(null);
        },
      );
      if (!ok) {
        setListPlaying(false);
        setPlayingWordId(null);
      }
    };
    speakAt(0);
  };

  const isReviewSession = reviewDeck !== null;
  const retryUntilCorrect = mode === "choice" || mode === "blank" || isReviewSession;
  const sourceGroupId = (currentItem: VocabularyItem) =>
    isReviewSession
      ? progress.reviewWords.find((word) => word.id === currentItem.id)?.groupId || "review"
      : selectedGroup.id;
  const recordResult = (currentItem: VocabularyItem, correct: boolean) => {
    onWordResult(sourceGroupId(currentItem), currentItem, correct, isReviewSession);
    if (firstAttempts[currentItem.id] !== undefined) return firstAttempts;
    const nextAttempts = { ...firstAttempts, [currentItem.id]: correct };
    setFirstAttempts((current) =>
      current[currentItem.id] !== undefined
        ? current
        : { ...current, [currentItem.id]: correct },
    );
    return nextAttempts;
  };
  const finishSession = (attempts = firstAttempts) => {
    if (!isReviewSession) onGroupComplete(selectedGroup.id, Object.values(attempts));
    setDone(true);
  };
  const resetSession = (
    deckSize = deck.length,
    randomizeOrder = false,
  ) => {
    setIndex(0);
    const order = Array.from({ length: deckSize }, (_, position) => position);
    setPracticeQueue(randomizeOrder ? shuffled(order) : order);
    setCompletedCount(0);
    setRevealed(false);
    setSelected("");
    setMatched([]);
    setMatchSelection(null);
    setBlank("");
    setUsedLetterIds([]);
    setFirstAttempts({});
    setDone(false);
  };
  const next = (rating: PracticeRating = "good", attempts = firstAttempts) => {
    if (item) {
      onUpdate(scheduleReview(item, rating));
    }
    if (retryUntilCorrect) {
      if (rating === "again") {
        const currentDeckIndex = practiceQueue[index] ?? index;
        setPracticeQueue([...practiceQueue, currentDeckIndex]);
      } else {
        setCompletedCount(completedCount + 1);
      }
      if (rating !== "again" && index >= practiceQueue.length - 1) {
        finishSession(attempts);
      } else {
        setIndex(index + 1);
        setSelected("");
        setBlank("");
        setUsedLetterIds([]);
      }
    } else if (index >= Math.min(deck.length, 10) - 1) {
      finishSession(attempts);
    } else {
      setIndex(index + 1);
      setRevealed(false);
      setSelected("");
      setBlank("");
      setUsedLetterIds([]);
    }
  };
  if (!started && !hasSelectedGroup)
    return (
      <section className="page practice">
        <div className="page-heading">
          <div>
            <span className="kicker">BUILD YOUR MEMORY</span>
            <h1>Practice</h1>
          </div>
        </div>
        <div className="stats">
          <button
            type="button"
            className="review-stat"
            disabled={progress.reviewWords.length === 0}
            aria-label={`${progress.reviewWords.length} ${progress.reviewWords.length === 1 ? "word" : "words"} to review, Practice missed words`}
            onClick={() => {
              const missed = progress.reviewWords.map((word) => word.item);
              setReviewDeck(missed);
              setSelectedGroupId("");
            }}
          >
            <Brain size={22} aria-hidden="true" />
            <span className="review-stat-copy">
              <b>{progress.reviewWords.length}</b>
              <span>Words to review</span>
              <small>Practice missed words</small>
            </span>
            <span className="review-stat-arrow" aria-hidden="true">→</span>
          </button>
        </div>
        <div className="setup">
          <h2>Choose a word group</h2>
          <div className="practice-group-grid">
            {groupSections.map((section) => (
              <div className="practice-group-section" key={section.id}>
                {section.groups.map((group) => (
                  <button
                    key={group.id}
                    className={selectedGroupId === group.id && reviewDeck === null ? "selected" : ""}
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      setReviewDeck(null);
                    }}
                  >
                    <BookOpen size={19} />
                    <span className="group-copy">
                      <span>{group.title}</span>
                      <GroupLevel progress={progress.groups[group.id]} />
                    </span>
                    <small>{group.items.length} items</small>
                    <span className="group-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  if (!started)
    return (
      <section className="page practice practice-preview">
        <div className="preview-heading">
          <button
            type="button"
            className="icon-button"
            aria-label="Back to word groups"
            onClick={() => {
              stopListPlayback();
              setSelectedGroupId("");
              setReviewDeck(null);
            }}
          >
            <ChevronLeft />
          </button>
          <div>
            <h1>{selectedGroup.title}</h1>
          </div>
        </div>
        <div className="preview-practice-options">
          <h2>Choose your practice</h2>
          <div className="mode-grid" role="group" aria-label="Choose your practice">
            {(
              [
                ["flashcard", "Flashcards", BookOpen],
                ["choice", "Multiple choice", Check],
                ["matching", "Matching", Sparkles],
                ["blank", "Fill in the blank", Brain],
              ] as const
            ).map(([id, label, Icon]) => (
              <button key={id} className={mode === id ? "selected" : ""} onClick={() => setMode(id)}>
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="practice-preview-actions">
          <button
            type="button"
            className={`play-all-button ${listPlaying ? "playing" : ""}`}
            aria-label={listPlaying ? "Stop playing all words" : "Play all words"}
            onClick={playAllWords}
          >
            {listPlaying ? <X size={20} /> : <Play size={20} fill="currentColor" />}
          </button>
          <button
            type="button"
            className="primary start"
            aria-label="Start practice"
            onClick={() => {
              stopListPlayback();
              resetSession(deck.length, true);
              setStarted(true);
            }}
          >
            Practice
          </button>
        </div>
        <div className="practice-word-list">
          {deck.map((word) => (
            <div
              className={`practice-word-row ${playingWordId === word.id ? "playing" : ""}`}
              key={word.id}
              data-practice-word={word.id}
              aria-current={playingWordId === word.id ? "true" : undefined}
            >
              <div>
                <b>{word.finnish}</b>
                <span>{word.english}</span>
              </div>
              <SpeakButton text={word.finnish} />
            </div>
          ))}
        </div>
      </section>
    );
  if (done)
    return (
      <section className="page">
        <div className="complete">
          <div>🎉</div>
          <h1>Hienoa!</h1>
          <p>You finished today’s practice.</p>
          <button
            className="primary"
            onClick={() => {
              setStarted(false);
              setReviewDeck(null);
              setDone(false);
              setIndex(0);
            }}
          >
            Practice again
          </button>
        </div>
      </section>
    );
  return (
    <section className="page practice-session">
      <div className="session-head">
        <button
          className="icon-button"
          onClick={() => {
            setStarted(false);
            setReviewDeck(null);
          }}
          aria-label="Close practice"
        >
          <X />
        </button>
        <div>
          <b className="practice-group-name">{selectedGroup.title}</b>
          <span>
            {retryUntilCorrect ? completedCount : index + 1} of {deck.length}
          </span>
          <i>
            <b
              style={{
                width: `${(
                  ((retryUntilCorrect ? completedCount : index + 1) /
                    deck.length) *
                  100
                ).toFixed(0)}%`,
              }}
            />
          </i>
        </div>
      </div>
      {mode === "flashcard" && (
        <div className="flashcard">
          <span className="label">FINNISH</span>
          <button
            type="button"
            className="flashcard-face"
            data-testid="flashcard-face"
            onClick={() => setRevealed(!revealed)}
            aria-label={revealed ? "Show Finnish" : "Show translation"}
          >
            <h1 className={flashcardWordClass(item.finnish)}>{item.finnish}</h1>
            {revealed && (
              <span className="flashcard-translation">{item.english}</span>
            )}
          </button>
          <SpeakButton text={item.finnish} />
          <div className="knowledge-actions">
            <button
              type="button"
              className="dont-know"
              aria-label="Don't know"
              onClick={() => {
                const attempts = recordResult(item, false);
                next("again", attempts);
              }}
            >
              ✕
            </button>
            <button
              type="button"
              className="know"
              aria-label="Know"
              onClick={() => {
                const attempts = recordResult(item, true);
                next("good", attempts);
              }}
            >
              ✓
            </button>
          </div>
        </div>
      )}
      {mode === "choice" && (
        <div className="quiz choice-quiz">
          <span className="label">WHAT DOES IT MEAN?</span>
          <h1>{item.finnish}</h1>
          <SpeakButton text={item.finnish} />
          <div className="choices">
            {choices.map((c) => (
              <button
                key={c}
                data-testid="multiple-choice-option"
                className={
                  selected
                    ? c === item.english
                      ? "correct"
                      : c === selected
                        ? "wrong"
                        : ""
                    : ""
                }
                disabled={Boolean(selected)}
                onClick={() => {
                  setSelected(c);
                  const correct = c === item.english;
                  recordResult(item, correct);
                  ttsService.speak(correct ? "oikein" : "väärin");
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="quiz-action">
            {selected && (
              <button
                className="primary"
                onClick={() => next(selected === item.english ? "good" : "again")}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}
      {mode === "blank" && (
        <div className="quiz blank-quiz">
          <span className="label">TRANSLATE INTO FINNISH</span>
          <h2 className="blank-question">{item.english}</h2>
          <div className="blank-answer-row" data-testid="blank-answer-row">
            <div className="live-blank" data-testid="live-blank" style={{ whiteSpace: "pre-wrap" }}>
              <h2>{liveBlank(item.finnish, selected ? item.finnish : blank)}</h2>
            </div>
            {selected ? (
              <SpeakButton text={item.finnish} />
            ) : (
              <button
                type="button"
                className="blank-delete"
                aria-label="Delete last letter"
                disabled={usedLetterIds.length === 0}
                onClick={() => {
                  setUsedLetterIds((current) => current.slice(0, -1));
                  setBlank((current) => Array.from(current).slice(0, -1).join(""));
                }}
              >
                <X size={19} />
              </button>
            )}
          </div>
          <div className="letter-bank" aria-label="Available letters">
            {letterTiles.map((tile, position) => {
              const used = usedLetterIds.includes(tile.id);
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={used ? "used" : ""}
                  aria-label={`Choose letter ${tile.letter}, tile ${position + 1}`}
                  disabled={used || Boolean(selected)}
                  onClick={() => {
                    setUsedLetterIds((current) => [...current, tile.id]);
                    setBlank((current) => current + tile.letter);
                  }}
                >
                  {tile.letter}
                </button>
              );
            })}
          </div>
          {!selected && <form
            onSubmit={(e) => {
              e.preventDefault();
              ttsService.speak(item.finnish);
              const correct = lettersOnly(blank) === lettersOnly(item.finnish);
              recordResult(item, correct);
              setSelected(correct ? "correct" : "wrong");
            }}
          >
            <button className="primary" disabled={usedLetterIds.length !== letterTiles.length}>
              Check answer
            </button>
          </form>}
          {selected && (
            <div className={`feedback ${selected}`}>
              <b>{selected === "correct" ? "Correct!" : "Not quite"}</b>
              <p>{item.exampleFinnish}</p>
              <button
                className="primary"
                onClick={() => next(selected === "correct" ? "good" : "again")}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}
      {mode === "matching" && (
        <div className="quiz matching-quiz" role="region" aria-label="Match the pairs">
          <div className="match-grid">
            {[matchColumns.finnish, matchColumns.english].map(
              (column, columnIndex) => (
                <div className="match-column" key={columnIndex}>
                  {column.map((x) => (
                <button
                  key={x.key}
                  data-testid={`match-${x.side}`}
                  data-match-id={x.id}
                  disabled={matched.includes(x.id)}
                  className={`${matched.includes(x.id) ? "matched" : ""} ${
                    matchSelection?.key === x.key ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (x.side === "fi") ttsService.speak(x.text);
                    if (!matchSelection || matchSelection.side === x.side) {
                      setMatchSelection(
                        matchSelection?.key === x.key ? null : x,
                      );
                    } else if (matchSelection.id === x.id) {
                      const matchedItem = deck.find((entry) => entry.id === x.id);
                      if (matchedItem) recordResult(matchedItem, true);
                      setMatched([...matched, x.id]);
                      setMatchSelection(null);
                    } else {
                      const firstItem = deck.find((entry) => entry.id === matchSelection.id);
                      const secondItem = deck.find((entry) => entry.id === x.id);
                      if (firstItem) recordResult(firstItem, false);
                      if (secondItem) recordResult(secondItem, false);
                      setMatchSelection(null);
                    }
                  }}
                >
                  {x.text}
                </button>
                  ))}
                </div>
              ),
            )}
          </div>
          {matched.length >= deck.length && (
            <button className="primary" onClick={() => finishSession()}>
              Great job! 🎉
            </button>
          )}
        </div>
      )}
    </section>
  );
}
export default App;
