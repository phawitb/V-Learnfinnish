import { useState } from 'react';
import { useLanguage } from '../i18n/Language';
import { LessonVocab } from './LessonVocab';
import { testTwoPages, testTwoScope, testTwoSource } from '../data/testTwoScope';
import { grammarSections, grammarQuestions } from '../data/testTwoGrammar';
import { readingSections, readingQuestions } from '../data/testTwoReading';
import { topicSections, topicQuestions } from '../data/testTwoTopics';
import type { Bilingual, StudySection } from '../data/testTwoTypes';
import './TestTwoPage.css';

const tabs = ['Start', 'Reading', 'Topics', 'Grammar', 'Vocab', 'Practice', 'Sources'] as const;
type Tab = typeof tabs[number];
const questions = [...readingQuestions, ...topicQuestions, ...grammarQuestions];
export const testTwoStorageKey = 'sisu:test2:v1';
type Progress = { drafts: Record<string,string>; done: string[] };
function load(): Progress {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(testTwoStorageKey) ?? 'null');
    if (!value || typeof value !== 'object') return {drafts:{},done:[]};
    const v = value as Partial<Progress>;
    return {drafts: Object.fromEntries(Object.entries(v.drafts ?? {}).filter(([,s])=>typeof s==='string')), done:Array.isArray(v.done)?v.done.filter(x=>typeof x==='string'):[]};
  } catch { return {drafts:{},done:[]}; }
}
export function TestTwoPage() {
  const { language } = useLanguage();
  const t = (th:string,en:string)=>language==='th'?th:en;
  const text = (value:string|Bilingual)=>typeof value==='string'?value:value[language];
  const topicLabels: Record<string, [string,string]> = { reading:['บทอ่าน','Reading'], Adjectives:['คำคุณศัพท์','Adjectives'], Weather:['สภาพอากาศ','Weather'], Time:['ฤดูกาลและเวลา','Seasons and time'], Phrases:['วลี','Phrases'], Verbs:['คำกริยา','Verbs'], Clothes:['เสื้อผ้า','Clothes'], kpt:['กฎ k–p–t','Consonant gradation'], genitive:['Genitive','Genitive'], plural:['พหูพจน์ -t','Plural -t'], 'verb-kpt':['การผันกริยาและ k–p–t','Verbs and consonant gradation'], 'partitive-forms':['วิธีสร้าง Partitive','Forming the partitive'], 'partitive-uses':['วิธีใช้ Partitive','Using the partitive'], possession:['Minulla on','Minulla on'], kanssa:['Genitive + kanssa','Genitive + kanssa'], like:['Pitää + -sta/-stä','Pitää + -sta/-stä'] };
  const topicLabel = (key:string)=>topicLabels[key]?t(...topicLabels[key]):key;
  const [tab,setTab] = useState<Tab>('Start');
  const [progress,setProgress] = useState(load);
  const [saveError,setSaveError] = useState(false);
  const [filter,setFilter] = useState('all');
  const [shown,setShown] = useState<string[]>([]);
  function save(next:Progress) {
    setProgress(next);
    try {localStorage.setItem(testTwoStorageKey,JSON.stringify(next));setSaveError(false);} catch {setSaveError(true);}
  }
  function toggleDone(id:string) {save({...progress,done:progress.done.includes(id)?progress.done.filter(x=>x!==id):[...progress.done,id]});}
  function sectionList(sections:StudySection[]) {return <>
    <nav className="test2-jump" aria-label={t('หัวข้อในหน้านี้','On this page')}>{sections.map(s=><a key={s.id} href={`#test2-${s.id}`}>{text(s.title)}</a>)}</nav>
    {sections.map(s=><article id={`test2-${s.id}`} className="test2-section" key={s.id}>
      <p className="test2-source">Suomen mestari 1 · {t('หน้า','pages')} {s.pages.join(', ')}</p>
      <h2>{text(s.title)}</h2><p>{text(s.intro)}</p>
      {s.notes.length>0 && <ul className="test2-notes">{s.notes.map((note,i)=><li key={i}>{text(note)}</li>)}</ul>}
      {s.tables.map((table,i)=><div className="test2-table-block" key={i}><h3>{text(table.title)}</h3><div className="test2-table-scroll" tabIndex={0} role="region" aria-label={text(table.title)}><table><thead><tr>{table.columns.map((c,j)=><th scope="col" key={j}>{text(c)}</th>)}</tr></thead><tbody>{table.rows.map((row,j)=><tr key={j}>{row.map((cell,k)=><td key={k}>{text(cell)}</td>)}</tr>)}</tbody></table></div></div>)}
      <label className="test2-complete"><input type="checkbox" checked={progress.done.includes(s.id)} onChange={()=>toggleDone(s.id)}/>{t('ทบทวนหัวข้อนี้แล้ว','I have reviewed this topic')}</label>
    </article>)}
  </>;}
  const sections=[...readingSections,...topicSections,...grammarSections];
  const filtered=filter==='all'?questions:questions.filter(q=>q.topic===filter);
  return <div className="page lesson-page lesson-three lesson-five test2-page">
    <div className="lesson-hero"><div><span className="kicker">EXAM REVIEW</span><h1>Tiistaina 3. marraskuuta TEST 2</h1></div></div>
    <div className="test2-banner"><span>TEST 2 · 03.11</span><h2>{t('ทบทวนเฉพาะขอบเขตสอบ','Review the exam syllabus')}</h2><p>{t('15 หัวข้อจาก Moodle พร้อมคำอธิบาย ตัวอย่าง และเฉลยแบบฝึก อ่านตามลำดับหรือเลือกหัวข้อที่ต้องการทบทวน','15 syllabus items from Moodle, with explanations, examples and worked practice. Read in order or choose a topic to review.')}</p><p>{t('ทบทวนแล้ว','Reviewed')} {sections.filter(s=>progress.done.includes(s.id)).length} / {sections.length} · {t('เขียนคำตอบแล้ว','Answers drafted')} {questions.filter(q=>progress.drafts[q.id]?.trim()).length} / {questions.length}</p></div>
    <div className="lesson-tabs" role="tablist" aria-label="Test 2 review">{tabs.map(name=><button type="button" role="tab" className={tab===name?'active':''} id={`test2-tab-${name}`} aria-controls="test2-panel" aria-selected={tab===name} key={name} onClick={()=>setTab(name)}>{name}</button>)}</div>
    {saveError && <p role="alert">{t('บันทึกลงอุปกรณ์ไม่ได้ คำตอบยังอยู่ในหน้านี้ กรุณาคัดลอกไว้ก่อนออก','Unable to save on this device. Your answers remain on this page; copy them before leaving.')}</p>}
    <section className="lesson-panel" id="test2-panel" role="tabpanel" aria-labelledby={`test2-tab-${tab}`}>
      {tab==='Start' && <>
        <h2>{t('ขอบเขต TEST 2 จากผู้สอน','The instructor’s TEST 2 syllabus')}</h2>
        <p>{t('ตรวจจาก Moodle วันที่ 26 ตุลาคม 2026 รายการด้านล่างคือเนื้อหาที่ผู้สอนระบุ ไม่ใช่ข้อสอบจริงหรือการคาดเดารูปแบบข้อสอบ','Checked in Moodle on 26 October 2026. The list below is the instructor’s stated scope, not actual exam questions or a prediction of the test format.')}</p>
        <ol className="test2-scope">{testTwoScope.map((item,i)=><li key={i}><button type="button" onClick={()=>setTab(item.tab as Tab)}><strong>{text(item.title)}</strong><span>{t('หน้า','Pages')} {item.pages.join(', ')} → {item.tab}</span></button></li>)}</ol>
        <p>{t('Moodle มีประกาศให้สอบ TEST 1 ย้อนหลังด้วย แต่ส่วนนี้รวมเฉพาะ TEST 2 จึงไม่เพิ่มขอบเขต TEST 1 เข้ามา','Moodle also mentions a TEST 1 make-up opportunity. This guide covers TEST 2 only and does not add the TEST 1 syllabus.')}</p>
        <h3>{t('วิธีใช้บทนี้ให้ครบรอบ','How to work through this guide')}</h3>
        <ol><li>{t('Reading: อ่านความหมายและฝึกโยงรูปที่พบในข้อความกลับไปหาคำศัพท์รูปพื้นฐาน','Reading: understand the texts and connect inflected forms to their dictionary words.')}</li><li>{t('Topics และ Vocab: ท่องคำศัพท์ตามหน้าที่ระบุ ฝึกพูดวลีและแต่งประโยคของตัวเอง','Topics and Vocab: learn the specified page vocabulary, say the phrases and make your own sentences.')}</li><li>{t('Grammar: ดูรูปตั้งต้น เลือกคำลงท้าย แล้วตรวจ k–p–t และสระทุกครั้ง','Grammar: identify the base form, choose the ending, then check consonant gradation and vowels.')}</li><li>{t('Practice: ลองเขียนคำตอบก่อนเปิดเฉลย เปรียบเทียบเหตุผล ไม่ใช่จำเฉพาะคำตอบ','Practice: write an answer before revealing the solution. Compare the reasoning instead of memorising only the answer.')}</li></ol>
        <a href={testTwoSource} target="_blank" rel="noreferrer">Moodle · Tiistaina 3. marraskuuta TEST 2 ↗</a>
      </>}
      {tab==='Reading' && sectionList(readingSections)}
      {tab==='Topics' && sectionList(topicSections)}
      {tab==='Grammar' && sectionList(grammarSections)}
      {tab==='Vocab' && <LessonVocab lessonId="test2"/>}
      {tab==='Practice' && <><h2>{t('แบบฝึกทบทวนพร้อมเฉลยละเอียด','Review practice with worked answers')}</h2><p>{t('แบบฝึกแต่งขึ้นเพื่อทบทวนหัวข้อในขอบเขตสอบ ไม่ใช่ข้อสอบจริง คำตอบเขียนอิสระให้เทียบกับตัวอย่างและเหตุผลด้วยตนเอง คำตอบจะบันทึกในอุปกรณ์นี้','These original exercises review the syllabus; they are not actual exam questions. Compare free-text answers with the model answer and explanation. Drafts are saved on this device.')}</p>
        <label className="test2-filter">{t('เลือกหัวข้อฝึก','Choose a practice topic')} <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">{t('ทุกหัวข้อ','All topics')}</option>{[...new Set(questions.map(q=>q.topic))].map(topic=><option key={topic} value={topic}>{topicLabel(topic)}</option>)}</select></label>
        <p>{filtered.length} {t('ข้อ','exercises')}</p><button type="button" onClick={()=>setShown(filtered.every(q=>shown.includes(q.id))?shown.filter(id=>!filtered.some(q=>q.id===id)):[...new Set([...shown,...filtered.map(q=>q.id)])])}>{filtered.every(q=>shown.includes(q.id))?t('ซ่อนเฉลยชุดนี้','Hide these answers'):t('เปิดเฉลยชุดนี้','Reveal these answers')}</button>
        {filtered.map((q,i)=><article className="test2-question" key={q.id}><p className="test2-source">{topicLabel(q.topic)}</p><label htmlFor={`test2-answer-${q.id}`}><strong>{i+1}. {text(q.prompt)}</strong></label><textarea id={`test2-answer-${q.id}`} rows={2} value={progress.drafts[q.id]??''} onChange={e=>save({...progress,drafts:{...progress.drafts,[q.id]:e.target.value}})} placeholder={t('เขียนคำตอบภาษาฟินแลนด์…','Write your Finnish answer…')}/><button type="button" aria-expanded={shown.includes(q.id)} onClick={()=>setShown(shown.includes(q.id)?shown.filter(id=>id!==q.id):[...shown,q.id])}>{shown.includes(q.id)?t('ซ่อนเฉลย','Hide answer'):t('ดูเฉลยและเหตุผล','Show answer and explanation')}</button>{shown.includes(q.id)&&<div className="test2-solution"><strong lang="fi">{q.answer}</strong><p>{text(q.explanation)}</p></div>}</article>)}
      </>}
      {tab==='Sources' && <><h2>{t('แหล่งอ้างอิงและหน้าหนังสือ','Sources and textbook pages')}</h2><p><a href={testTwoSource} target="_blank" rel="noreferrer">Moodle TEST 2 · 626698 ↗</a> · 26.10.2026</p><p>{t('ขอบเขตสอบยึดรายการของผู้สอน ส่วนคำอธิบายไทย/อังกฤษและแบบฝึกทบทวนจัดทำเพิ่มจากหน้าหนังสือที่ระบุ เลขหน้าด้านล่างเป็นเลขที่พิมพ์ในหนังสือ เปิดภาพเพื่อเทียบกับต้นฉบับได้','The scope follows the instructor’s list. Thai/English explanations and review exercises were prepared from the specified textbook pages. Numbers below are printed page numbers; open an image to compare with the original.')}</p><div className="test2-source-grid">{testTwoPages.map(p=><a key={p} href={`/test2/book-${p}.jpg`} target="_blank" rel="noreferrer">{t('หน้า','Page')} {p} ↗</a>)}</div></>}
    </section>
  </div>;
}
