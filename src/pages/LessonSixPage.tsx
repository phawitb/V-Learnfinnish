import { useState } from 'react';
import { Check, ChevronRight, Volume2 } from 'lucide-react';
import { ttsService } from '../services/ttsService';
import vocabulary from '../data/lessonFiveVocabulary.json';
import { bookWeather, weatherDialogues } from '../data/lessonFiveBook';
import { quizletSources } from '../data/lessonFiveContent';
import {
  bookPages, exercise20, exercise20Bank, exercise25, exercise25Banks, exercise25Passages,
  files, homework, listening, moodleSource, originalInstructions, pluralWords,
  timeMarkers, translations, verbPhrases, weatherCities,
} from '../data/lessonSixContent';

const steps = ['Start', 'Weather', 'Listening', 'Speaking', 'Time & verbs', 'Translation', 'Plural', 'Verbs', 'Vocabulary', 'Homework', 'Files'] as const;
type Step = typeof steps[number];
const storageKey = 'sisu:lesson6:v1';
type SavedWork = { completed: string[]; tasks: string[]; drafts: Record<string, string> };
function loadWork(): SavedWork {
  const empty: SavedWork = { completed: [], tasks: [], drafts: {} };
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!value || typeof value !== 'object') return empty;
    const data = value as Partial<SavedWork>;
    return {
      completed: Array.isArray(data.completed) ? data.completed.filter(s => steps.includes(s as Step)) : [],
      tasks: Array.isArray(data.tasks) ? data.tasks.filter(s => homework.includes(s)) : [],
      drafts: data.drafts && typeof data.drafts === 'object' && !Array.isArray(data.drafts)
        ? Object.fromEntries(Object.entries(data.drafts).filter(([, v]) => typeof v === 'string')) : {},
    };
  } catch { return empty; }
}
function Speak({ text }: { text: string }) {
  const [error, setError] = useState(false);
  return <><button type="button" className="finnish-speak" lang="fi" aria-label={`Listen to ${text}`} onClick={() => {
    setError(false);
    if (!ttsService.speak(text, undefined, () => setError(true))) setError(true);
  }}>{text}<Volume2 size={13} /></button>{error && <small role="status">ไม่พบเสียงฟินแลนด์ กรุณาตรวจการตั้งค่าเสียง</small>}</>;
}
function BookPage({ page, open = false }: { page: number; open?: boolean }) {
  return <details className="lesson5-book-source" open={open}>
    <summary>ดูหน้าหนังสือ {page} · เลขหน้าที่พิมพ์ในเล่ม</summary>
    <img className="lesson5-source-image" src={`/lesson6/book/page-${page}.jpg`} alt={`Suomen mestari 1 — sivu ${page}`} loading="lazy" />
    <a href={`/lesson6/book/page-${page}.jpg`} target="_blank" rel="noreferrer">เปิดภาพหน้า {page} ขนาดเต็ม</a>
  </details>;
}
export function LessonSixPage() {
  const [step, setStep] = useState<Step>('Start');
  const [work, setWork] = useState(loadWork);
  const [saveError, setSaveError] = useState(false);
  const [vocab, setVocab] = useState<'weather' | 'seasons' | 'adjectives'>('weather');
  const [verb, setVerb] = useState(0);
  const [time, setTime] = useState(0);
  function save(next: SavedWork) {
    setWork(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setSaveError(false); }
    catch { setSaveError(true); }
  }
  function go(next: Step) { setStep(next); window.scrollTo?.({ top: 0, behavior: 'auto' }); }
  const draft = (id: string, label: string) => <label className="lesson5-draft">{label}<textarea
    value={work.drafts[id] || ''} onChange={e => save({ ...work, drafts: { ...work.drafts, [id]: e.target.value } })}
    rows={2} placeholder="เขียนคำตอบภาษาฟินแลนด์…" /></label>;
  const progress = Math.round(work.completed.length / steps.length * 100);
  return <section className="page lesson-page lesson-three lesson-five lesson-six">
    <div className="lesson-hero"><div><span className="kicker">LESSON 06 · 06.10.2026</span><h1>Tiistaina 6. lokakuuta</h1><p>อากาศ กริยากับเวลา และพหูพจน์ — บทเรียนวันอังคารที่ 6 ตุลาคม</p></div>
      <div className="lesson-progress"><b>{progress}%</b><span>complete</span><i><em style={{ width: `${progress}%` }} /></i></div></div>
    <div className="lesson-tabs" role="tablist" aria-label="Lesson 6 sections">{steps.map((s, i) => <button
      type="button" role="tab" id={`lesson6-tab-${i}`} aria-controls="lesson6-panel" aria-selected={s === step}
      key={s} className={s === step ? 'active' : work.completed.includes(s) ? 'done' : ''} onClick={() => go(s)}>
      <span>{work.completed.includes(s) ? <Check size={14} /> : i + 1}</span>{s}</button>)}</div>
    {saveError && <p role="alert">บันทึกในอุปกรณ์ไม่ได้ คำตอบยังอยู่ในหน้านี้ กรุณาคัดลอกก่อนปิดบทเรียน</p>}
    <div className="lesson-panel" role="tabpanel" id="lesson6-panel" aria-labelledby={`lesson6-tab-${steps.indexOf(step)}`}>
      {step === 'Start' && <>
        <span className="kicker">SÄÄ · AIKA · T-MONIKKO</span><h2>เนื้อหาครบตามบทเรียนใน Moodle</h2>
        <p>เรียนเรื่องอากาศหน้า 61 → ฟังแบบฝึก 13 หน้า 75 → สนทนาจากแผนที่ในแบบฝึก 14 หน้า 76 → ฝึกกริยากับเวลาและแปลประโยคจากเอกสารเสริมทั้งสองไฟล์</p>
        <div className="objectives"><div><span>01</span><p><b>ฟังและพูดเรื่องอากาศ</b>ฟังไฟล์เสียงต้นฉบับ จับชื่อเมืองและอุณหภูมิ แล้วถาม–ตอบจากแผนที่</p></div><div><span>02</span><p><b>สร้างประโยค</b>23 วลีกริยา · 21 คำบอกเวลา · โจทย์แปล 10 ประโยคพร้อมเฉลยผู้สอน</p></div><div><span>03</span><p><b>ทำการบ้านและตรวจ</b>แบบฝึก 19, 20 และ 25 ครบทุกข้อ พร้อมเฉลยหน้า 331 และคำศัพท์ Quizlet 3 ชุด</p></div></div>
        <div className="lesson-tip"><b>วิธีใช้</b><p>คำตอบร่าง เช็กลิสต์การบ้าน และความคืบหน้าบันทึกในอุปกรณ์นี้ กด “ทำส่วนนี้เสร็จแล้ว” เมื่อเรียนจบแต่ละส่วน ลองตอบก่อนเปิดเฉลย</p><p>ปุ่มลำโพงเป็นเสียงสังเคราะห์ ส่วน Listening ใช้ไฟล์เสียงจริงจาก Moodle คำอธิบายภาษาไทยและตัวอย่างฝึกพูดเป็นส่วนเสริม เฉลยจากผู้สอนและท้ายเล่มมีป้ายระบุแหล่งที่มา</p></div>
        <h3>During the lesson — คำสั่งต้นฉบับ</h3><ul>{originalInstructions.during.map(s => <li key={s}>{s}</li>)}</ul>
        <h3>Homework — คำสั่งต้นฉบับ</h3><ol>{originalInstructions.homework.map(s => <li key={s}>{s}</li>)}</ol>
        <a href={moodleSource} target="_blank" rel="noreferrer">เปิด Tiistaina 6. lokakuuta ใน Moodle</a>
      </>}
      {step === 'Weather' && <>
        <h2>Sää · sivu 61</h2><p>ประโยคอากาศ อุณหภูมิ และบทสนทนาครบทั้งหน้า</p>
        <div className="lesson5-vocabulary">{bookWeather.map(([fi, th]) => <article key={fi}><Speak text={fi} /><p>{th}</p></article>)}</div>
        <h3>บทสนทนา</h3>{weatherDialogues.map((dialogue, i) => <article className="lesson5-exercise" key={i}>{dialogue.map(([fi, th]) => <div key={fi}><Speak text={fi} /><p>{th}</p></div>)}</article>)}
        <div className="lesson-tip"><b>ใช้ on หรือใช้กริยาโดยตรง</b><p>On pilvistä. = มีเมฆ · Sataa. = ฝนตก · Tuulee. = ลมพัด · Aurinko paistaa. = พระอาทิตย์ส่องแสง</p><p>ปฏิเสธ: Ei ole kylmä. / Ei sada. / Ei tuule. · +1 °C: yksi aste lämmintä · +20 °C: kaksikymmentä astetta lämmintä · −5 °C: viisi astetta pakkasta</p></div>
        <BookPage page={61} />
      </>}
      {step === 'Listening' && <>
        <h2>Harjoitus 13 · sivu 75</h2><p><b>Kuuntele ja kirjoita kaupunki.</b> — ฟังแล้วเขียนชื่อเมืองให้ตรงกับสัญลักษณ์อากาศและอุณหภูมิ ทั้งหมด 5 ข้อ</p>
        <audio controls preload="metadata" src="/lesson6/harjoitus-13.mp3" aria-label="Harjoitus 13 sivu 75">เบราว์เซอร์นี้ไม่รองรับเสียง</audio>
        <a href="/lesson6/harjoitus-13.mp3" download>ดาวน์โหลดเสียงแบบฝึก 13</a>
        <p>เมืองในแผนที่: Rovaniemi · Oulu · Tampere · Turku · Lappeenranta</p>
        <BookPage page={75} />
        {listening.map(([hint, answer], i) => <article className="lesson5-exercise" key={answer}><h3>ข้อ {i + 1}</h3><p>{hint}</p>{draft(`13-${i}`, `คำตอบ 13 ข้อ ${i + 1}`)}<details><summary>เฉลยท้ายเล่ม · ข้อ {i + 1}</summary><Speak text={answer} /></details></article>)}
        <BookPage page={331} />
      </>}
      {step === 'Speaking' && <>
        <h2>Harjoitus 14 · sivu 76</h2><p><b>Kysy parilta.</b> — ถามคู่สนทนาเกี่ยวกับอากาศของแต่ละเมือง ใช้แผนที่ตามหนังสือ ไม่ใช่พยากรณ์อากาศปัจจุบัน</p>
        <article className="lesson5-exercise"><h3>Malli — ตัวอย่างจากหนังสือ</h3><Speak text="Millainen sää Tokiossa on?" /><p>ที่โตเกียวอากาศเป็นอย่างไร?</p><Speak text="Siellä on hyvä ilma. On puolipilvistä ja tuulista. On lämmin. On +20 astetta." /><p>ที่นั่นอากาศดี มีเมฆบางส่วนและมีลม อากาศอบอุ่น 20 องศา</p></article>
        <BookPage page={76} open />
        <p>ลองถามและตอบให้ครบ 16 เมือง รวมโตเกียว ตัวอย่างต่อไปนี้เรียบเรียงจากสัญลักษณ์บนแผนที่ จึงมีสำนวนอื่นที่ถูกต้องได้</p>
        {weatherCities.map(([city, where, temperature, model, th]) => <article className="lesson5-exercise" key={city}><h3>{city} · {temperature} °C</h3><Speak text={`Millainen sää ${where} on?`} />{draft(`14-${city}`, `คำตอบ 14 · ${city}`)}<details><summary>ตัวอย่างคำตอบ · {city}</summary><Speak text={`${model} On ${temperature} astetta.`} /><p>{th} อุณหภูมิ {temperature} องศา</p></details></article>)}
      </>}
      {step === 'Time & verbs' && <>
        <h2>Verbit ja aika — กริยากับเวลา</h2><p>รายการครบจากไฟล์ Verbs and time markers: 23 วลีกริยา และคำบอกเวลา 21 คำ รูป minä และคำแปลไทยเพิ่มไว้ช่วยฝึก</p>
        <a href="/lesson6/verbs-and-time-markers.pdf" target="_blank" rel="noreferrer">เปิดเอกสาร Verbit ja aika ต้นฉบับ</a>
        <h3>วลีกริยา</h3><div className="lesson5-vocabulary">{verbPhrases.map(([fi, en, th, first]) => <article key={fi}><Speak text={fi} /><p>{th}</p><small>{en}</small><p><Speak text={`Minä ${first}.`} /></p></article>)}</div>
        <h3>Milloin? — เมื่อไร?</h3><div className="lesson5-vocabulary">{timeMarkers.map(([fi, th]) => <article key={fi}><Speak text={fi} /><p>{th}</p></article>)}</div>
        <h3>ลองประกอบประโยค</h3><p>กิจกรรมเสริม: เลือกเวลาและกริยา แล้วอ่านประโยคในรูป “ฉัน”</p>
        <div className="lesson6-builder"><label>คำบอกเวลา<select value={time} onChange={e => setTime(Number(e.target.value))}>{timeMarkers.map(([fi], i) => <option key={fi} value={i}>{fi}</option>)}</select></label><label>วลีกริยา<select value={verb} onChange={e => setVerb(Number(e.target.value))}>{verbPhrases.map(([fi], i) => <option key={fi} value={i}>{fi}</option>)}</select></label></div>
        <Speak text={`${timeMarkers[time][0]} minä ${verbPhrases[verb][3]}.`} />
        <div className="lesson-tip"><b>ระวัง k–p–t เมื่อผันกริยา</b><p>soittaa → soitan · lukea → luen · lähettää → lähetän · lähteä → lähden · hiihtää → hiihdän · piirtää → piirrän · nukkua → nukun · oppia → opin · leipoa → leivon</p><p>เวลาอนาคตใช้รูปกริยาปัจจุบันร่วมกับคำบอกเวลาได้ เช่น Huomenna minä ostan ruokaa. = พรุ่งนี้ฉันจะซื้ออาหาร</p></div>
        {draft('time-own', 'แต่งประโยคของตัวเอง 3 ประโยค')}
      </>}
      {step === 'Translation' && <>
        <h2>Translation — seasons &amp; weather</h2><p>คำสั่งต้นฉบับ: Translate the following sentences into Finnish. Your classmate will check your answers.</p><p>เอกสารมีใบงานสำหรับคู่ A และ B คนละ 5 ข้อ เฉลยของแต่ละชุดอยู่ในใบงานของอีกคน รวมด้านล่างครบ 10 ข้อแล้ว ลองตอบก่อนเปิดเฉลย</p>
        <a href="/lesson6/translation-seasons-weather.docx" download>ดาวน์โหลดใบงานแปลต้นฉบับ</a>
        {(['A', 'B'] as const).map(group => <section key={group}><h3>ชุด {group} · 5 ประโยค</h3>{translations.filter(row => row[0] === group).map(([, en, th, fi, note], i) => <article className="lesson5-exercise" key={en}><h4>{group}{i + 1}. {en}</h4><p>{th}</p>{draft(`translation-${group}-${i}`, `คำตอบแปล ${group}${i + 1}`)}<details><summary>เฉลยผู้สอน · {group}{i + 1}</summary><Speak text={fi} /><p>{note}</p></details></article>)}</section>)}
      </>}
      {step === 'Plural' && <>
        <h2>T-monikko — พหูพจน์ -t</h2><div className="lesson-tip"><b>เปลี่ยนทั้งคำคุณศัพท์และคำนาม</b><p>รูปพหูพจน์นี้ลงท้าย -t และอาจมี k–p–t เปลี่ยนด้วย: asunto → asunnot, koti → kodit, vapaa paikka → vapaat paikat, valoisa ilta → valoisat illat ไม่ใช่เติม t หลังรูปเดิมได้ทุกคำ</p><p>เทียบกริยา: ystävä on / ystävät ovat · ystävä ei puhu / ystävät eivät puhu</p></div>
        <h3>Harjoitus 19 · sivu 78</h3><p><b>Kirjoita t-monikko.</b> — เปลี่ยนคำเอกพจน์เป็นพหูพจน์ รวม 8 ข้อ (ข้อแรกเป็นตัวอย่าง)</p><BookPage page={78} />
        {pluralWords.map(([singular, plural, th, note], i) => <article className="lesson5-exercise" key={singular}><h4>{i + 1}. {singular}</h4><p>{th}</p>{i === 0 ? <p lang="fi">kurssi → kurssit (ตัวอย่าง)</p> : draft(`19-${i}`, `คำตอบ 19 ข้อ ${i + 1}`)}<details><summary>เฉลยท้ายเล่ม · 19 ข้อ {i + 1}</summary><Speak text={plural} /><p>{note}</p></details></article>)}
        <h3>Harjoitus 20 · sivu 79</h3><p><b>Valitse sana ja kirjoita se lauseeseen. Yksikkö vai monikko?</b> — เลือกคำแล้วเติมรูปเอกพจน์หรือพหูพจน์</p><p>คำในกรอบ: {exercise20Bank.join(' · ')}</p><BookPage page={79} />
        {exercise20.map(([prompt, answer, th, note], i) => <article className="lesson5-exercise" key={prompt}><h4>{i + 1}. {prompt}</h4>{i === 0 ? <p lang="fi">Opiskelijat ovat kurssilla. (ตัวอย่าง)</p> : draft(`20-${i}`, `คำตอบ 20 ข้อ ${i + 1}`)}<details><summary>เฉลยท้ายเล่ม · 20 ข้อ {i + 1}</summary><Speak text={prompt.replace('___', answer)} /><p>{th}</p><p>{note}</p></details></article>)}
        <BookPage page={331} />
      </>}
      {step === 'Verbs' && <>
        <h2>Harjoitus 25 · sivut 82–83</h2><p><b>Valitse verbi ja kirjoita oikea persoona. Muista myös k-p-t!</b> — เลือกกริยาแล้วผันให้ตรงประธาน ระวังการเปลี่ยน k–p–t รวม 19 ช่อง โดยข้อ 1 เป็นตัวอย่าง</p>
        <div className="lesson-tip"><b>ก่อนเริ่ม</b><p>Pekka ja minä = me · Elise ja Fabian = he · Pekka / Elise = hän · NEG. หมายถึงประโยคปฏิเสธ เช่น en nuku และ emme löydä ต้องใส่กริยาปฏิเสธด้วย</p><p>minä -n · sinä -t · hän มักยืดสระท้าย · me -mme · te -tte · he -vat/-vät ส่วนข้อ 8 เป็นคำถาม te จึงใช้ -tteko</p></div>
        {[0, 1, 2].map(group => {
          const start = [0, 8, 14][group]; const end = [8, 14, 19][group];
          return <section key={group}><h3>{group === 0 ? 'หน้า 82 · ข้อ 1–8' : group === 1 ? 'หน้า 83 · ข้อ 9–14' : 'หน้า 83 · ข้อ 15–19'}</h3>
            <p>กริยาในกรอบ: {exercise25Banks[group].join(' · ')}</p><article className="lesson5-exercise"><p lang="fi">{exercise25Passages[group]}</p></article>
            {exercise25.slice(start, end).map(([answer, note, th], offset) => { const i = start + offset; return <article className="lesson5-exercise" key={i}><h4>ข้อ {i + 1}</h4>{i === 0 ? <p lang="fi">lähdemme (ตัวอย่าง)</p> : draft(`25-${i}`, `คำตอบ 25 ข้อ ${i + 1}`)}<details><summary>เฉลยท้ายเล่ม · 25 ข้อ {i + 1}</summary><Speak text={answer} /><p>{note}</p><p>{th}</p></details></article>; })}
          </section>;
        })}
        <BookPage page={82} /><BookPage page={83} /><BookPage page={331} />
      </>}
      {step === 'Vocabulary' && <>
        <h2>Quizlet — ทบทวนคำศัพท์ 3 ชุด</h2><p>ใช้ชุดเดียวกับ Lesson 5 ตามลิงก์ที่ผู้สอนให้ในบทเรียนนี้: Weather 30 รายการ · Seasons and months 27 รายการ · Adjectives 22 รายการ (ต้นฉบับมี kylmä ซ้ำ)</p>
        <div className="lesson5-options">{([['weather', 'Weather'], ['seasons', 'Seasons and months'], ['adjectives', 'Adjectives']] as const).map(([key, name]) => <button type="button" key={key} aria-pressed={vocab === key} className={vocab === key ? 'active' : ''} onClick={() => setVocab(key)}>{name}</button>)}</div>
        <div className="lesson5-vocabulary">{vocabulary[vocab].map((word, i) => <article key={`${word.fi}-${i}`}><Speak text={word.fi} /><p>{word.th}</p><small>{word.en}</small></article>)}</div>
        <h3>เปิดชุดต้นฉบับ</h3><ul>{quizletSources.slice(0, 3).map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>)}</ul>
      </>}
      {step === 'Homework' && <>
        <h2>Kotitehtävät — การบ้าน</h2><p>ครบทั้ง 3 งานตาม Moodle แยกเช็กลิสต์คำศัพท์เป็นรายชุดเพื่อช่วยติดตาม</p>
        <div className="lesson5-checklist">{homework.map(task => <label key={task}><input type="checkbox" checked={work.tasks.includes(task)} onChange={e => save({ ...work, tasks: e.target.checked ? [...work.tasks, task] : work.tasks.filter(t => t !== task) })} />{task}</label>)}</div>
        <div className="lesson5-options"><button type="button" onClick={() => go('Vocabulary')}>ทบทวนคำศัพท์</button><button type="button" onClick={() => go('Verbs')}>แบบฝึก 25</button><button type="button" onClick={() => go('Plural')}>แบบฝึก 19 และ 20</button></div>
        <h3>Homework — คำสั่งต้นฉบับ</h3><ol>{originalInstructions.homework.map(s => <li key={s}>{s}</li>)}</ol>
        <ul>{quizletSources.slice(0, 3).map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{name}</a></li>)}</ul>
      </>}
      {step === 'Files' && <>
        <h2>ไฟล์ต้นฉบับและแหล่งอ้างอิง</h2><p>ไฟล์แนบ Moodle ทั้ง 3 รายการ พร้อมภาพหน้าหนังสือที่ใช้ในบทเรียน เลขหน้าคือเลข sivu ที่พิมพ์ในเล่ม</p>
        <div className="lesson5-files">{files.map(([name, file, id]) => <article key={file}><a href={`/lesson6/${file}`} download>{name}</a><a href={`https://moodle.abo.fi/mod/resource/view.php?id=${id}`} target="_blank" rel="noreferrer">เปิดแหล่งที่มาใน Moodle · {name.split(' · ')[0]}</a></article>)}</div>
        <h3>Suomen mestari 1</h3><div className="lesson5-files">{bookPages.map(page => <article key={page}><a href={`/lesson6/book/page-${page}.jpg`} target="_blank" rel="noreferrer">หน้าหนังสือ {page}{page === 331 ? ' · เฉลยแบบฝึก 13, 19, 20, 25' : ''}</a><small>ลำดับหน้าไฟล์ PDF: {page - 1}</small></article>)}</div>
        <p>บางหน้ามีแบบฝึกอื่นติดมาด้วย ภาพเก็บเต็มหน้า ส่วนกิจกรรมใน Lesson 6 ยึดเฉพาะโจทย์ที่ผู้สอนมอบหมาย</p>
        <p><a href={moodleSource} target="_blank" rel="noreferrer">บทเรียนต้นฉบับใน Moodle</a> · <a href="/lesson6/sources.json" download>รายการแหล่งที่มาและไฟล์</a></p>
        <p>ตรวจหน้า Moodle วันที่ 8 ตุลาคม 2026 คำศัพท์ใช้ข้อมูลสามชุดที่ถอดไว้ใน Lesson 5 ซึ่งมีรหัส Quizlet ตรงกับลิงก์บทเรียนนี้ เฉลยแบบฝึก 14 เป็นตัวอย่างเรียบเรียง ส่วนแบบฝึก 13, 19, 20 และ 25 ตรวจจากหน้า 331 และคำแปล 10 ข้อตรวจจากเอกสารผู้สอน</p>
      </>}
      <div className="lesson5-footer"><button type="button" className="primary-button" disabled={work.completed.includes(step)} onClick={() => save({ ...work, completed: [...work.completed, step] })}><Check size={16} />{work.completed.includes(step) ? 'เรียนส่วนนี้แล้ว' : 'ทำส่วนนี้เสร็จแล้ว'}</button>{steps.indexOf(step) < steps.length - 1 && <button type="button" className="secondary-button" onClick={() => go(steps[steps.indexOf(step) + 1])}>ถัดไป<ChevronRight size={16} /></button>}</div>
    </div>
  </section>;
}
