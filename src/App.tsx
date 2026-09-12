import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  History,
  Search,
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

type Page = "dictionary" | "lesson" | "favorites" | "history" | "practice";
type Mode = "flashcard" | "choice" | "matching" | "blank";
const nav = [
  { id: "dictionary", label: "Dictionary", icon: Search },
  { id: "lesson", label: "Lesson 1", icon: BookOpen },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "history", label: "History", icon: Clock3 },
  { id: "practice", label: "Practice", icon: Brain },
] as const;
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

function App() {
  const [page, setPage] = useState<Page>("dictionary"),
    [query, setQuery] = useState(""),
    [direction, setDirection] = useState<Direction>("auto"),
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
  const [filter, setFilter] = useState("");
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
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const r = await translationService.translate(query.trim(), direction);
      setResult(r);
      saveHist([
        {
          id: crypto.randomUUID(),
          result: r,
          createdAt: new Date().toISOString(),
        },
        ...history,
      ]);
    } catch {
      setError(
        "Sorry, I couldn't translate that. Please make sure Ollama is running and try again.",
      );
    } finally {
      setLoading(false);
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
  const activeFav =
    result && favorites.some((x) => x.finnish === result.finnish);
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span>Sisu</span>
        </div>
        <p className="eyebrow">FINNISH, EVERY DAY</p>
        <nav>
          {nav.map((n) => (
            <button
              key={n.id}
              className={page === n.id ? "active" : ""}
              onClick={() => setPage(n.id)}
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
          <div className="brand">
            <span className="brand-mark">S</span>
            <span>Sisu</span>
          </div>
          <span className="streak">3 day streak</span>
        </header>
        {page === "dictionary" && (
          <section className={`page dictionary ${searchFocused ? "search-focused" : ""}`}>
            <div className="hero">
              <span className="kicker">YOUR FINNISH COMPANION</span>
              <h1>
                Understand Finnish.
                <br />
                <em>One word at a time.</em>
              </h1>
              <p>
                Translate naturally, hear how it sounds, and remember what
                matters.
              </p>
            </div>
            <form className="search-card" onSubmit={submit}>
              <div className="search-line">
                <Search />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search Finnish or English..."
                  aria-label="Search Finnish or English"
                />
                <button
                  type="button"
                  className="clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="search-foot">
                <label>
                  <ArrowLeftRight size={16} />
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as Direction)}
                    aria-label="Translation direction"
                  >
                    <option value="auto">Auto detect</option>
                    <option value="fi-en">Finnish → English</option>
                    <option value="en-fi">English → Finnish</option>
                  </select>
                  <ChevronDown size={14} />
                </label>
                <button className="primary" disabled={loading}>
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
              <div className="error-card">
                <p>{error}</p>
                <button onClick={() => submit()}>Try again</button>
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
          </section>
        )}
        {page === "lesson" && <LessonOnePage />}
        {page === "favorites" && (
          <ListPage
            title="Favorites"
            subtitle="The words you want to keep close."
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
        {page === "history" && (
          <ListPage
            title="History"
            subtitle="Pick up where you left off."
            items={history.map((h) => ({
              ...toVocab(h.result),
              id: h.id,
              createdAt: h.createdAt,
            }))}
            filter={filter}
            setFilter={setFilter}
            empty={
              <Empty
                icon={History}
                title="Your history is quiet"
                body="Your recent searches will appear here."
              />
            }
            onOpen={(r) => reopen(r)}
            onRemove={(id) => saveHist(history.filter((x) => x.id !== id))}
            clearAll={() => saveHist([])}
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
      </main>
      <nav className="bottom-nav">
        {nav.map((n) => (
          <button
            key={n.id}
            className={page === n.id ? "active" : ""}
            onClick={() => setPage(n.id)}
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
  subtitle,
  items,
  filter,
  setFilter,
  empty,
  onOpen,
  onRemove,
  clearAll,
}: {
  title: string;
  subtitle: string;
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
          <p>{subtitle}</p>
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
    [selectedGroupId, setSelectedGroupId] = useState("vocab-1"),
    [reviewDeck, setReviewDeck] = useState<VocabularyItem[] | null>(null),
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
    [firstAttempts, setFirstAttempts] = useState<Record<string, boolean>>({}),
    [done, setDone] = useState(false);
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
    groups = useMemo(
      () => [
        ...chunkGroups("Favorites", "favorites", items),
        ...chunkGroups("Vocab — Page 12", "vocab", vocabItems),
        ...chunkGroups("Useful Phrases — Pages 12–13", "phrases", phraseItems),
        ...chunkGroups("Numbers", "numbers", numberItems),
        ...chunkGroups("Colors", "colors", colorItems),
      ],
      [colorItems, items, numberItems, phraseItems, vocabItems],
    ),
    regularGroup = groups.find((group) => group.id === selectedGroupId) || groups[0],
    selectedGroup = reviewDeck
      ? { id: "review", title: "Words to review", items: reviewDeck }
      : regularGroup,
    deck = selectedGroup.items,
    item = deck[(practiceQueue[index] ?? index) % deck.length],
    due = items.filter((x) => new Date(x.nextReviewAt) <= new Date()).length;
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
    const orderedEntries = practiceQueue.length
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
  }, [deck, practiceQueue]);

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
      }
    } else if (index >= Math.min(deck.length, 10) - 1) {
      finishSession(attempts);
    } else {
      setIndex(index + 1);
      setRevealed(false);
      setSelected("");
      setBlank("");
    }
  };
  if (!started)
    return (
      <section className="page practice">
        <div className="page-heading">
          <div>
            <span className="kicker">BUILD YOUR MEMORY</span>
            <h1>Practice</h1>
            <p>A few focused minutes make Finnish stick.</p>
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
              resetSession(missed.length, true);
              setStarted(true);
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
          <div>
            <b>{due}</b>
            <span>Due today</span>
          </div>
          <div>
            <b>{items.filter((x) => x.mastered).length}</b>
            <span>Mastered</span>
          </div>
        </div>
        <div className="setup">
          <h2>Choose your practice</h2>
          <div className="mode-grid">
            {(
              [
                ["flashcard", "Flashcards", BookOpen],
                ["choice", "Multiple choice", Check],
                ["matching", "Matching", Sparkles],
                ["blank", "Fill in the blank", Brain],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                className={mode === id ? "selected" : ""}
                onClick={() => {
                  setMode(id);
                  resetSession();
                }}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <h2>Choose a word group</h2>
          <div className="practice-group-grid">
            {groups.map((group) => (
              <button
                key={group.id}
                className={selectedGroup.id === group.id ? "selected" : ""}
                onClick={() => {
                  setSelectedGroupId(group.id);
                  setReviewDeck(null);
                  resetSession(group.items.length, true);
                  setStarted(true);
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
            <h1>{item.finnish}</h1>
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
        <div className="quiz">
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
          {selected && (
            <button
              className="primary"
              onClick={() => next(selected === item.english ? "good" : "again")}
            >
              Continue
            </button>
          )}
        </div>
      )}
      {mode === "blank" && (
        <div className="quiz">
          <span className="label">COMPLETE THE SENTENCE</span>
          <label
            htmlFor="blank-answer"
            className="live-blank"
            data-testid="live-blank"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <h2>{liveBlank(item.finnish, blank)}</h2>
          </label>
          <SpeakButton text={item.finnish} />
          <p className="hint">Hint: {item.english}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ttsService.speak(item.finnish);
              const correct = lettersOnly(blank) === lettersOnly(item.finnish);
              recordResult(item, correct);
              setSelected(correct ? "correct" : "wrong");
            }}
          >
            <input
              id="blank-answer"
              className="blank-input"
              value={blank}
              onChange={(e) => setBlank(e.target.value)}
              autoFocus
              placeholder="Type the missing word..."
            />
            <button className="primary">Check answer</button>
          </form>
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
        <div className="quiz">
          <span className="label">MATCH THE PAIRS</span>
          <h2>Connect Finnish with English</h2>
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
