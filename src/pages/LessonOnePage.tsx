import { useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  Headphones,
  Languages,
  Volume2,
} from "lucide-react";
import { ttsService } from "../services/ttsService";

const alphabet = [
  ["A", "aa"],
  ["B", "bee"],
  ["C", "see"],
  ["D", "dee"],
  ["E", "ee"],
  ["F", "äf"],
  ["G", "gee"],
  ["H", "hoo"],
  ["I", "ii"],
  ["J", "jii"],
  ["K", "koo"],
  ["L", "äl"],
  ["M", "äm"],
  ["N", "än"],
  ["O", "oo"],
  ["P", "pee"],
  ["Q", "kuu"],
  ["R", "är"],
  ["S", "äs"],
  ["T", "tee"],
  ["U", "uu"],
  ["V", "vee"],
  ["W", "kaksois-vee"],
  ["X", "äks"],
  ["Y", "yy"],
  ["Z", "tseta"],
  ["Å", "ruotsalainen oo"],
  ["Ä", "ää"],
  ["Ö", "öö"],
];
export const phrases = [
  ["Hyvää huomenta!", "Good morning!"],
  ["Huomenta!", "Morning!"],
  ["Päivää!", "Hello! / Good afternoon!"],
  ["Hyvää päivää!", "Good day!"],
  ["Hyvää iltaa!", "Good evening!"],
  ["Hyvää yötä!", "Good night!"],
  ["Nuku hyvin!", "Sleep well!"],
  ["Hei!", "Hi!"],
  ["Moi!", "Hi!"],
  ["Terve!", "Hello!"],
  ["Moi moi!", "Bye!"],
  ["Nähdään!", "See you!"],
  ["Hei hei!", "Bye!"],
  ["Heippa!", "Bye! / See you!"],
  ["Nähdään huomenna!", "See you tomorrow!"],
  ["Moikka!", "Hi! / Bye!"],
  ["Hauska tutustua!", "Nice to meet you!"],
  ["Tässä on Tiina.", "This is Tiina."],
  ["Kiitos samoin!", "Thank you, likewise!"],
  ["Näkemiin!", "Goodbye!"],
  ["Tervetuloa!", "Welcome!"],
  ["Joo.", "Yes."],
  ["Ei.", "No."],
  ["Kyllä.", "Yes."],
  ["Ole hyvä!", "Here you are! / You’re welcome!"],
  ["Ei kestä!", "You’re welcome!"],
  ["Kiitos!", "Thank you!"],
  ["Anteeksi!", "Sorry! / Excuse me!"],
  ["Ei se mitään!", "Never mind!"],
  ["Kippis!", "Cheers!"],
  ["Skool!", "Cheers!"],
  ["Hyvää ruokahalua!", "Enjoy your meal!"],
  ["Kiitos ruoasta!", "Thank you for the meal!"],
  ["Kiitos, oli hyvää.", "Thank you, it was good."],
];
export const bookVocabulary = [
  ["Hei!", "Hi!"],
  ["ja", "and"],
  ["Tervetuloa!", "Welcome!"],
  ["Anteeksi!", "Sorry! / Excuse me!"],
  ["onko", "is …?"],
  ["täällä", "here"],
  ["suomen kurssi", "Finnish course"],
  ["joo", "yes"],
  ["olla", "to be"],
  ["tämä", "this"],
  ["paikka", "place"],
  ["vapaa", "free / vacant"],
  ["kiva", "nice"],
  ["minä", "I"],
  ["kuka", "who"],
  ["sinä", "you"],
  ["Hauska tutustua!", "Nice to meet you!"],
  ["Kiitos samoin!", "Thank you, likewise!"],
  ["Moi!", "Hi!"],
  ["Mitä kuuluu?", "How are you?"],
  ["Terve!", "Hello!"],
  ["Kiitos!", "Thank you!"],
  ["Minulle kuuluu hyvää.", "I’m doing well."],
  ["Entä sinulle?", "And you?"],
  ["Ihan hyvää, kiitos.", "Quite well, thank you."],
  ["tässä", "here"],
  ["minun", "my"],
  ["nimi", "name"],
  ["opettaja", "teacher"],
  ["Miten se kirjoitetaan?", "How is it spelled?"],
  ["etunimi", "first name"],
  ["sukunimi", "last name"],
  ["okei", "okay"],
  ["kurssipäivä", "course day"],
  ["maanantai", "Monday"],
  ["keskiviikko", "Wednesday"],
  ["torstai", "Thursday"],
  ["kello", "clock / time"],
];
const twisters = [
  ["Hämärä mäkärä kämisi mähässä.", "Focus: ä and rhythm"],
  [
    "Tuulan ja Tuulin tuulinen tuuli tuulee talvella täällä ja tuolla.",
    "Focus: long vowels",
  ],
  ["Höyhen löytyi yöllä työpöydältä.", "Focus: ö, y and vowel harmony"],
];
const pronouns = [
  ["minä", "olen", "I am"],
  ["sinä", "olet", "you are"],
  ["hän / se", "on", "he, she / it is"],
  ["me", "olemme", "we are"],
  ["te", "olette", "you are"],
  ["he / ne", "ovat", "they are"],
];
const spoken = [
  ["Minä menen", "Mä meen", "I go"],
  ["Haluatko sinä?", "Haluuksä?", "Do you want?"],
  ["Ehditkö sinä?", "Ehitksä?", "Do you have time?"],
  ["kaksikymmentäyksi", "kakskytyks", "twenty-one"],
];
const days = [
  ["maanantai", "Monday"],
  ["tiistai", "Tuesday"],
  ["keskiviikko", "Wednesday"],
  ["torstai", "Thursday"],
  ["perjantai", "Friday"],
  ["lauantai", "Saturday"],
  ["sunnuntai", "Sunday"],
];
const smallTalk = [
  {
    title: "Introducing yourself",
    lines: [
      ["Olen…", "I am…", "Standard"],
      ["Minun nimi on…", "My name is…", "Standard"],
      ["Mun nimi on…", "My name is…", "Spoken"],
    ],
  },
  {
    title: "Asking a name",
    lines: [
      ["Mikä sinun nimi on?", "What’s your name?", "Standard"],
      ["Mikä sun nimi on?", "Same meaning", "Spoken"],
    ],
  },
  {
    title: "Meeting someone",
    lines: [
      ["Hauska tutustua!", "Nice to meet you!", "Standard"],
      ["Kiitos, samoin!", "Thank you, likewise!", "Reply"],
    ],
  },
  {
    title: "How are you? — standard",
    lines: [
      ["Mitä sinulle kuuluu?", "How are you?", "Standard"],
      ["Kiitos! Minulle kuuluu hyvää.", "Thank you! I’m doing well.", "Reply"],
      ["Entä sinulle?", "And you?", "Standard"],
    ],
  },
  {
    title: "How are you? — spoken",
    lines: [
      ["Mitä kuuluu?", "How are you?", "Spoken"],
      ["Hyvää, kiitti!", "Good, thanks!", "Reply"],
      ["Ihanaa!", "Wonderful!", "Reply"],
      ["Mitäs tässä", "Nothing special.", "Reply"],
    ],
  },
  {
    title: "Going well",
    lines: [
      ["Miten menee?", "How’s it going?", "Spoken"],
      ["Hyvin!", "Well!", "Reply"],
      ["Kaikki on ok.", "Everything is okay.", "Reply"],
    ],
  },
];
const soundConfusers: Record<string, string[]> = {
  A: ["Ä", "E"],
  Ä: ["A", "Ö"],
  O: ["Ö", "U"],
  Ö: ["O", "Y"],
  U: ["Y", "O"],
  Y: ["U", "I"],
  B: ["P", "V"],
  C: ["S", "K"],
  D: ["T", "B"],
  E: ["I", "Ä"],
  F: ["V", "S"],
  G: ["K", "J"],
  H: ["K", "J"],
  I: ["J", "E"],
  J: ["G", "I"],
  K: ["G", "H"],
  L: ["R", "N"],
  M: ["N", "L"],
  N: ["M", "L"],
  P: ["B", "T"],
  Q: ["K", "C"],
  R: ["L", "S"],
  S: ["C", "Z"],
  T: ["D", "P"],
  V: ["W", "F"],
  W: ["V", "U"],
  X: ["S", "Z"],
  Z: ["S", "C"],
  Å: ["O", "A"],
};
const shuffle = <T,>(items: T[]) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const makeSoundRounds = () =>
  shuffle(
    alphabet.map(([letter, sound]) => {
      const preferred = soundConfusers[letter] || [];
      const fillers = shuffle(
        alphabet
          .map(([candidate]) => candidate)
          .filter(
            (candidate) =>
              candidate !== letter && !preferred.includes(candidate),
          ),
      );
      return {
        letter,
        sound,
        choices: shuffle([letter, ...preferred, ...fillers].slice(0, 3)),
      };
    }),
  );
const questions = [
  {
    category: "Alphabet & sounds",
    prompt: "How many letters are in the Finnish alphabet used in this lesson?",
    choices: ["26", "29", "32"],
    correct: "29",
    explain: "Finnish uses 29 letters, including Å, Ä and Ö.",
  },
  {
    category: "Alphabet & sounds",
    prompt: "How is the letter W named in Finnish?",
    choices: ["wee", "kaksois-vee", "tupla-uu"],
    correct: "kaksois-vee",
    explain: "Kaksois-vee literally means double V.",
  },
  {
    category: "Alphabet & sounds",
    prompt: "Which word means “wind”?",
    choices: ["tuli", "tuuli", "tyyli"],
    correct: "tuuli",
    explain: "A double vowel is held longer: tuli = fire, tuuli = wind.",
  },
  {
    category: "Alphabet & sounds",
    prompt: "Which word means “carpet”?",
    choices: ["mato", "matto", "maatto"],
    correct: "matto",
    explain:
      "The long consonant changes the meaning: mato = worm, matto = carpet.",
  },
  {
    category: "Alphabet & sounds",
    prompt: "Which letter begins the word “äiti” (mother)?",
    choices: ["A", "Ä", "Ö"],
    correct: "Ä",
    explain: "Ä is a separate Finnish letter, pronounced like a in “cat”.",
  },
  {
    category: "Alphabet & sounds",
    prompt: "Which set contains only front vowels?",
    choices: ["a, o, u", "ä, ö, y", "e, i, o"],
    correct: "ä, ö, y",
    explain: "The front vowels are ä, ö and y. Back vowels are a, o and u.",
  },
  {
    category: "Greetings & phrases",
    prompt: "What does “Huomenta!” mean?",
    choices: ["Morning!", "Good night!", "Welcome!"],
    correct: "Morning!",
    explain: "Huomenta is the short, common form of Hyvää huomenta.",
  },
  {
    category: "Greetings & phrases",
    prompt: "Choose “Nice to meet you!”",
    choices: ["Hauska tutustua!", "Nähdään huomenna!", "Ei se mitään!"],
    correct: "Hauska tutustua!",
    explain: "A natural reply is Kiitos samoin, thank you, likewise.",
  },
  {
    category: "Greetings & phrases",
    prompt: "How do you reply to “Hauska tutustua!”?",
    choices: ["Kiitos samoin!", "Hyvää yötä!", "Anteeksi!"],
    correct: "Kiitos samoin!",
    explain: "Kiitos samoin means thank you, likewise.",
  },
  {
    category: "Greetings & phrases",
    prompt: "What does “Mitä kuuluu?” ask?",
    choices: ["What is your name?", "How are you?", "Where do you live?"],
    correct: "How are you?",
    explain: "A simple answer is Hyvää, kiitos.",
  },
  {
    category: "Introductions",
    prompt: "Complete: Minä ___ opiskelija.",
    choices: ["olen", "olet", "on"],
    correct: "olen",
    explain: "Minä olen means I am.",
  },
  {
    category: "Introductions",
    prompt: "Complete: Te ___ nyt kurssilla.",
    choices: ["olemme", "olette", "ovat"],
    correct: "olette",
    explain: "Te olette means you are, plural or formal.",
  },
  {
    category: "Introductions",
    prompt: "Which form goes with “he / ne”?",
    choices: ["on", "olemme", "ovat"],
    correct: "ovat",
    explain:
      "He ovat = they are, for people. Ne ovat is common for things and in speech.",
  },
  {
    category: "Introductions",
    prompt: "What does “Minun nimi on Olga” mean?",
    choices: ["My name is Olga", "Her name is Olga", "I know Olga"],
    correct: "My name is Olga",
    explain: "In everyday speech you also hear Mun nimi on Olga.",
  },
  {
    category: "Spoken Finnish",
    prompt: "Which is the spoken version of “Minä menen”?",
    choices: ["Mä meen", "Mun menen", "Mä olen"],
    correct: "Mä meen",
    explain: "Mä is spoken minä, and meen is spoken menen.",
  },
  {
    category: "Spoken Finnish",
    prompt: "Which spoken phrase means “Do you want?”",
    choices: ["Ehitksä?", "Haluuksä?", "Mitä kuuluu?"],
    correct: "Haluuksä?",
    explain: "Haluuksä is the spoken form of Haluatko sinä?",
  },
  {
    category: "Days & countries",
    prompt: "Which Finnish day is Thursday?",
    choices: ["tiistai", "torstai", "lauantai"],
    correct: "torstai",
    explain: "Torstai is Thursday. The course homework is for torstai.",
  },
  {
    category: "Days & countries",
    prompt: "What does “tänään” mean?",
    choices: ["yesterday", "today", "tomorrow"],
    correct: "today",
    explain: "Eilen = yesterday, tänään = today, huomenna = tomorrow.",
  },
  {
    category: "Days & countries",
    prompt: "What is Finland in Finnish?",
    choices: ["Ruotsi", "Suomi", "Saksa"],
    correct: "Suomi",
    explain: "Suomi is Finland. Ruotsi is Sweden and Saksa is Germany.",
  },
  {
    category: "Culture",
    prompt: "What is “sisu”?",
    choices: ["A greeting", "Willpower and determination", "A Finnish meal"],
    correct: "Willpower and determination",
    explain:
      "Sisu describes determination and perseverance, especially when things are difficult.",
  },
];
type Step = "intro" | "alphabet" | "phrases" | "basics" | "tongue" | "check";
const steps: { id: Step; label: string }[] = [
  { id: "intro", label: "Start" },
  { id: "alphabet", label: "Sounds" },
  { id: "phrases", label: "Phrases" },
  { id: "basics", label: "Basics" },
  { id: "tongue", label: "Speak" },
  { id: "check", label: "Check" },
];
const FinnishText = ({
  text,
  children,
}: {
  text: string;
  children?: ReactNode;
}) => (
  <button
    type="button"
    className="finnish-speak"
    onClick={() => ttsService.speak(text)}
    aria-label={`Listen to ${text}`}
  >
    {children ?? text}
    <Volume2 size={13} />
  </button>
);
const SmallTalkSection = () => (
  <section className="small-talk-section">
    <div className="small-talk-title">
      <span className="kicker">ESITTÄYTYMINEN JA KUULUMISET</span>
      <h3>Introductions &amp; small talk</h3>
      <p>
        Listen to the standard and spoken forms, then practise both sides of
        each conversation.
      </p>
    </div>
    <div className="small-talk-grid">
      {smallTalk.map((group) => (
        <article key={group.title}>
          <h4>{group.title}</h4>
          {group.lines.map(([fi, en, kind]) => (
            <div className="talk-line" key={fi}>
              <span className={`talk-kind ${kind.toLowerCase()}`}>{kind}</span>
              <FinnishText text={fi} />
              <span className="talk-translation">{en}</span>
            </div>
          ))}
        </article>
      ))}
    </div>
  </section>
);

export function LessonOnePage() {
  const [step, setStep] = useState<Step>("intro"),
    [flipped, setFlipped] = useState<number[]>([]),
    [answer, setAnswer] = useState(""),
    [quizIndex, setQuizIndex] = useState(0),
    [quizScore, setQuizScore] = useState(0),
    [quizFinished, setQuizFinished] = useState(false);
  const [soundRounds, setSoundRounds] = useState(makeSoundRounds),
    [soundRound, setSoundRound] = useState(0),
    [soundChoice, setSoundChoice] = useState(""),
    [soundScore, setSoundScore] = useState(0),
    [soundFinished, setSoundFinished] = useState(false),
    [soundWrong, setSoundWrong] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("sisu:lesson1:v1") || "[]");
    } catch {
      return [];
    }
  });
  const finish = (id: Step) => {
    const next = [...new Set([...completed, id])];
    setCompleted(next);
    localStorage.setItem("sisu:lesson1:v1", JSON.stringify(next));
  };
  const go = (id: Step) => {
    finish(step);
    setStep(id);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };
  const progress = Math.round((completed.length / steps.length) * 100),
    question = useMemo(() => questions[quizIndex], [quizIndex]),
    soundQuestion = soundRounds[soundRound];
  return (
    <section className="page lesson-page">
      <div className="lesson-hero">
        <div>
          <span className="kicker">LESSON 1 · KAPPALE 1</span>
          <h1>Tervetuloa Suomeen!</h1>
        </div>
        <div className="lesson-progress">
          <b>{progress}%</b>
          <span>complete</span>
          <i>
            <em style={{ width: `${progress}%` }} />
          </i>
        </div>
      </div>
      <div className="lesson-tabs" role="tablist">
        {steps.map((s, i) => (
          <button
            role="tab"
            aria-selected={step === s.id}
            className={
              step === s.id ? "active" : completed.includes(s.id) ? "done" : ""
            }
            onClick={() => setStep(s.id)}
            key={s.id}
          >
            <span>
              {completed.includes(s.id) ? <Check size={14} /> : i + 1}
            </span>
            {s.label}
          </button>
        ))}
      </div>
      {step === "intro" && (
        <div className="lesson-panel intro-panel">
          <div className="lesson-number">01</div>
          <span className="kicker">INTRODUCTION TO FINNISH</span>
          <h2>Your first Finnish lesson</h2>
          <p>
            Learn how Finnish letters sound, greet people naturally, and
            practise the vowels that make Finnish pronunciation distinctive.
          </p>
          <div className="objectives">
            <div>
              <span>01</span>
              <p>
                <b>Recognise the alphabet</b>Hear all 29 letters and repeat
                them.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>Use everyday phrases</b>Say hello, goodbye and thank you.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>Train your mouth</b>Practise long vowels, ä, ö and y.
              </p>
            </div>
          </div>
          <div className="course-files">
            <a href="/lesson1/suomen-mestari-1-kappale-1.pdf" target="_blank">
              <BookOpen />
              Chapter 1 PDF <ExternalLink size={15} />
            </a>
            <a href="/lesson1/lesson-1-2026.pptx" download>
              <Download />
              Lesson slides
            </a>
          </div>
          <button
            className="primary lesson-next"
            onClick={() => go("alphabet")}
          >
            Begin with the alphabet <ChevronRight />
          </button>
        </div>
      )}
      {step === "alphabet" && (
        <div className="lesson-panel">
          <div className="lesson-title">
            <div>
              <span className="kicker">SIVU 14 · PAGE 14</span>
              <h2>Aakkoset</h2>
              <p>
                Listen once. Then play it again and repeat each letter aloud.
              </p>
            </div>
            <Headphones />
          </div>
          <div className="audio-card">
            <div className="audio-art">
              <Volume2 />
            </div>
            <div>
              <b>Kappale 1: Aakkoset</b>
              <span>Finn Lectura · 1:37</span>
              <audio
                data-testid="alphabet-audio"
                controls
                preload="metadata"
                src="/lesson1/004-kappale-1-aakkoset.mp3"
              />
            </div>
          </div>
          <h3 className="subhead">Tap a letter to hear it</h3>
          <div className="alphabet-grid">
            {alphabet.map(([letter, sound]) => (
              <button
                key={letter}
                onClick={() => ttsService.speak(sound)}
                aria-label={`Listen to ${letter}`}
              >
                <b>{letter}</b>
                <span>[{sound}]</span>
              </button>
            ))}
          </div>
          <section className="sound-match">
            <div className="sound-match-head">
              <div>
                <span className="kicker">KUUNTELE JA VALITSE</span>
                <h3>Sound matching practice</h3>
                <p>
                  Complete all 29 letters. Every new round randomises the
                  questions and answer positions.
                </p>
              </div>
              {!soundFinished && (
                <b>
                  {soundRound + 1} / {soundRounds.length}
                </b>
              )}
            </div>
            {soundFinished ? (
              <div className="sound-finished">
                <span>🎧</span>
                <h4>
                  {soundScore >= 24
                    ? "Hienoa! Great listening."
                    : "Hyvä yritys! Practise once more."}
                </h4>
                <p>
                  You matched {soundScore} of {soundRounds.length} sounds.
                </p>
                {soundWrong.length > 0 && (
                  <div className="sound-review">
                    <b>Review these letters</b>
                    <div>
                      {soundWrong.map((letter) => (
                        <button
                          key={letter}
                          onClick={() =>
                            ttsService.speak(
                              alphabet.find(([item]) => item === letter)?.[1] ||
                                letter,
                            )
                          }
                        >
                          {letter}
                          <Volume2 size={14} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  className="primary"
                  onClick={() => {
                    setSoundRounds(makeSoundRounds());
                    setSoundRound(0);
                    setSoundChoice("");
                    setSoundScore(0);
                    setSoundWrong([]);
                    setSoundFinished(false);
                  }}
                >
                  Start a new random round
                </button>
              </div>
            ) : (
              <>
                <button
                  className="mystery-sound"
                  onClick={() => ttsService.speak(soundQuestion.sound)}
                  aria-label="Play mystery sound"
                >
                  <Volume2 />
                  <span>Play mystery sound</span>
                  <small>Listen as many times as you need</small>
                </button>
                <div className="sound-options">
                  {soundQuestion.choices.map((letter) => (
                    <button
                      key={letter}
                      disabled={!!soundChoice}
                      className={
                        soundChoice
                          ? letter === soundQuestion.letter
                            ? "correct"
                            : letter === soundChoice
                              ? "wrong"
                              : ""
                          : ""
                      }
                      onClick={() => {
                        setSoundChoice(letter);
                        if (letter === soundQuestion.letter)
                          setSoundScore(soundScore + 1);
                        else
                          setSoundWrong([...soundWrong, soundQuestion.letter]);
                      }}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
                {soundChoice && (
                  <p
                    className={`sound-feedback ${soundChoice === soundQuestion.letter ? "correct" : "wrong"}`}
                  >
                    {soundChoice === soundQuestion.letter
                      ? "Oikein! Correct."
                      : `Not quite — the sound was ${soundQuestion.letter}.`}
                  </p>
                )}
                <button
                  className="primary sound-next"
                  disabled={!soundChoice}
                  onClick={() => {
                    if (soundRound === soundRounds.length - 1)
                      setSoundFinished(true);
                    else {
                      setSoundRound(soundRound + 1);
                      setSoundChoice("");
                    }
                  }}
                >
                  Next sound <ChevronRight size={17} />
                </button>
              </>
            )}
          </section>
          <div className="lesson-tip">
            <b>Finnish tip</b>
            <p>
              Finnish is mostly pronounced as written. Double letters are held
              longer: <strong>tuli</strong> means fire, while{" "}
              <strong>tuuli</strong> means wind.
            </p>
          </div>
          <button className="primary lesson-next" onClick={() => go("phrases")}>
            Next: useful phrases <ChevronRight />
          </button>
        </div>
      )}
      {step === "phrases" && (
        <div className="lesson-panel">
          <div className="lesson-title">
            <div>
              <span className="kicker">SIVUT 12–13 · PAGES 12–13</span>
              <h2>Fraasit</h2>
              <p>
                Vocabulary and everyday expressions from the printed book pages.
                Use the speaker buttons to hear Finnish pronunciation.
              </p>
            </div>
            <Languages />
          </div>
          <section className="book-vocab">
            <h3>Book vocabulary</h3>
            <p className="book-vocab-note">Printed page 12 · Sanasto</p>
            <div className="book-vocab-grid">
              {bookVocabulary.map(([fi, en]) => (
                <div className="book-vocab-row" key={fi}>
                  <div>
                    <b>{fi}</b>
                    <span>{en}</span>
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => ttsService.speak(fi)}
                    aria-label={`Listen to ${fi}`}
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
          <h3 className="subhead">Useful phrases</h3>
          <p className="book-vocab-note">
            Printed pages 12–13 · Tap a card to reveal its meaning
          </p>
          <div className="phrase-grid">
            {phrases.map(([fi, en], i) => (
              <button
                key={fi}
                className={flipped.includes(i) ? "flipped" : ""}
                onClick={() =>
                  setFlipped(
                    flipped.includes(i)
                      ? flipped.filter((x) => x !== i)
                      : [...flipped, i],
                  )
                }
              >
                <span className="phrase-count">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <b>{fi}</b>
                {flipped.includes(i) ? (
                  <em>{en}</em>
                ) : (
                  <small>Tap to translate</small>
                )}
                <span
                  className="phrase-audio"
                  onClick={(e) => {
                    e.stopPropagation();
                    ttsService.speak(fi);
                  }}
                >
                  <Volume2 size={16} />
                </span>
              </button>
            ))}
          </div>
          <a
            className="source-link"
            href="https://quizlet.com/fi/844779421/finnish-1-kappale-1-b-fraasit-phrases-flash-cards"
            target="_blank"
            rel="noreferrer"
          >
            Continue in Quizlet <ExternalLink size={15} />
          </a>
          <button className="primary lesson-next" onClick={() => go("basics")}>
            Next: Finnish basics <ChevronRight />
          </button>
        </div>
      )}
      {step === "basics" && (
        <div className="lesson-panel">
          <div className="lesson-title">
            <div>
              <span className="kicker">LESSON SLIDES 2–27</span>
              <h2>Finnish basics</h2>
              <p>
                The grammar and conversation patterns introduced in class. Tap
                any blue Finnish text to hear it.
              </p>
            </div>
            <BookOpen />
          </div>
          <div className="basics-grid">
            <section>
              <h3>Why Finnish is approachable</h3>
              <ul>
                <li>No definite or indefinite articles</li>
                <li>No grammatical future tense</li>
                <li>Pronunciation closely follows spelling</li>
                <li>A regular plural marker appears in many forms</li>
              </ul>
              <p className="sisu-note">
                <FinnishText text="sisu" /> · willpower and determination when
                something is difficult
              </p>
            </section>
            <section>
              <h3>
                Pronouns + <FinnishText text="olla" />
              </h3>
              <div className="lesson-table">
                {pronouns.map(([p, v, en]) => (
                  <div key={p}>
                    <FinnishText text={p} />
                    <FinnishText text={v} />
                    <span>{en}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3>Written and spoken Finnish</h3>
              <div className="lesson-table spoken-table">
                <div>
                  <b>Standard</b>
                  <strong>Spoken</strong>
                  <span>Meaning</span>
                </div>
                {spoken.map(([standard, casual, en]) => (
                  <div key={standard}>
                    <FinnishText text={standard} />
                    <FinnishText text={casual} />
                    <span>{en}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h3>Length changes meaning</h3>
              <div className="minimal-pairs">
                <p>
                  <FinnishText text="lasi" /> glass <span>·</span>{" "}
                  <FinnishText text="lassi" /> a name
                </p>
                <p>
                  <FinnishText text="mato" /> worm <span>·</span>{" "}
                  <FinnishText text="matto" /> carpet
                </p>
                <p>
                  <FinnishText text="tuli" /> fire <span>·</span>{" "}
                  <FinnishText text="tuuli" /> wind
                </p>
              </div>
              <p>
                Hold double vowels and consonants longer. Finnish word stress
                normally falls on the first syllable.
              </p>
            </section>
            <section>
              <h3>Days of the week</h3>
              <div className="days-grid">
                {days.map(([fi, en]) => (
                  <div key={fi}>
                    <FinnishText text={fi} />
                    <span>{en}</span>
                  </div>
                ))}
              </div>
              <p>
                <FinnishText text="eilen" /> yesterday ·{" "}
                <FinnishText text="tänään" /> today ·{" "}
                <FinnishText text="huomenna" /> tomorrow
              </p>
            </section>
            <section>
              <h3>Names and countries</h3>
              <p>
                <b>Names:</b>{" "}
                <span className="speak-list">
                  {[
                    "Aino",
                    "Kaija",
                    "Eevi",
                    "Helmi",
                    "Alvar",
                    "Heikki",
                    "Jukka",
                    "Jyrki",
                  ].map((name) => (
                    <FinnishText key={name} text={name} />
                  ))}
                </span>
              </p>
              <p>
                <b>Countries:</b>{" "}
                <span className="speak-list">
                  {[
                    "Suomi",
                    "Ruotsi",
                    "Norja",
                    "Tanska",
                    "Viro",
                    "Ranska",
                    "Italia",
                    "Espanja",
                    "Englanti",
                    "Saksa",
                    "Kiina",
                    "Intia",
                    "Japani",
                    "Turkki",
                    "Yhdysvallat",
                  ].map((country) => (
                    <FinnishText key={country} text={country} />
                  ))}
                </span>
              </p>
              <div className="dialogue">
                <FinnishText text="Mikä sinun nimi on?" />
                <br />
                <FinnishText text="Minun nimi on Saija." />
                <br />
                <small>What is your name? My name is Saija.</small>
              </div>
            </section>
            <SmallTalkSection />
          </div>
          <button className="primary lesson-next" onClick={() => go("tongue")}>
            Next: speaking practice <ChevronRight />
          </button>
        </div>
      )}
      {step === "tongue" && (
        <div className="lesson-panel">
          <div className="lesson-title">
            <div>
              <span className="kicker">KIELIVOIMISTELUA</span>
              <h2>Tongue twisters</h2>
              <p>
                Start slowly. Keep every vowel clear, then increase your speed.
              </p>
            </div>
            <Volume2 />
          </div>
          <div className="twister-list">
            {twisters.map(([text, focus], i) => (
              <article key={text}>
                <span>0{i + 1}</span>
                <div>
                  <p>{text}</p>
                  <small>{focus}</small>
                </div>
                <button
                  className="icon-button"
                  onClick={() => ttsService.speak(text)}
                  aria-label={`Listen to tongue twister ${i + 1}`}
                >
                  <Volume2 />
                </button>
              </article>
            ))}
          </div>
          <a
            className="source-link"
            href="https://www.tongue-twister.net/fi.htm"
            target="_blank"
            rel="noreferrer"
          >
            More Finnish tongue twisters <ExternalLink size={15} />
          </a>
          <button className="primary lesson-next" onClick={() => go("check")}>
            Finish with a quick check <ChevronRight />
          </button>
        </div>
      )}
      {step === "check" && !quizFinished && (
        <div className="lesson-panel quiz-panel">
          <div className="quiz-meta">
            <span>{question.category}</span>
            <b>
              Question {quizIndex + 1} of {questions.length}
            </b>
          </div>
          <i className="quiz-progress">
            <em
              style={{
                width: `${((quizIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </i>
          <h2>{question.prompt}</h2>
          <div className="lesson-answers">
            {question.choices.map((x) => (
              <button
                disabled={!!answer}
                className={
                  answer
                    ? x === question.correct
                      ? "correct"
                      : x === answer
                        ? "wrong"
                        : ""
                    : ""
                }
                onClick={() => {
                  setAnswer(x);
                  if (x === question.correct) setQuizScore(quizScore + 1);
                }}
                key={x}
              >
                {x}
                {answer && x === question.correct ? <Check size={18} /> : null}
              </button>
            ))}
          </div>
          {answer && (
            <div className="lesson-result">
              <div>
                <b>
                  {answer === question.correct
                    ? "Oikein! Correct."
                    : "The correct answer is " + question.correct}
                </b>
                <p>{question.explain}</p>
              </div>
            </div>
          )}
          <button
            className="primary lesson-next"
            disabled={!answer}
            onClick={() => {
              if (quizIndex === questions.length - 1) {
                finish("check");
                setQuizFinished(true);
              } else {
                setQuizIndex(quizIndex + 1);
                setAnswer("");
              }
            }}
          >
            {quizIndex === questions.length - 1
              ? "See results"
              : "Next question"}{" "}
            <ChevronRight />
          </button>
        </div>
      )}
      {step === "check" && quizFinished && (
        <div className="lesson-panel quiz-summary">
          <div className="score-ring">
            <b>{quizScore}</b>
            <span>/ {questions.length}</span>
          </div>
          <span className="kicker">LESSON 1 COMPLETE</span>
          <h2>
            {quizScore >= 16
              ? "Hienoa työtä!"
              : quizScore >= 12
                ? "Hyvä! Keep practising."
                : "Review and try once more."}
          </h2>
          <p>
            You answered {quizScore} of {questions.length} questions correctly.
          </p>
          <div className="score-bands">
            <div>
              <b>Alphabet & sounds</b>
              <span>6 questions</span>
            </div>
            <div>
              <b>Greetings & phrases</b>
              <span>4 questions</span>
            </div>
            <div>
              <b>Grammar & speech</b>
              <span>6 questions</span>
            </div>
            <div>
              <b>Days & culture</b>
              <span>4 questions</span>
            </div>
          </div>
          <button
            className="primary"
            onClick={() => {
              setQuizIndex(0);
              setQuizScore(0);
              setAnswer("");
              setQuizFinished(false);
            }}
          >
            Try again
          </button>
        </div>
      )}
    </section>
  );
}
