import { useState } from 'react';
import { LessonVocab } from './LessonVocab';
import { afterTestTwoPages, afterTestTwoScope, afterTestTwoSections } from '../data/afterTestTwoScope';
import { grammarSections } from '../data/afterTestTwoGrammar';
import { listeningItems } from '../data/afterTestTwoListening';
import type { ThaiSection } from '../data/afterTestTwoTypes';
import './TestTwoPage.css';

const tabs = ['Start', 'Grammar', 'Listening', 'Vocab', 'Sources'] as const;
type Tab = typeof tabs[number];
export const afterTestTwoStorageKey = 'sisu:afterTest2:v1';

function load(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(afterTestTwoStorageKey) ?? 'null');
    return Array.isArray(value) ? value.filter(x => typeof x === 'string') : [];
  } catch { return []; }
}

export function AfterTestTwoPage() {
  const [tab, setTab] = useState<Tab>('Start');
  const [done, setDone] = useState<string[]>(load);
  const [saveError, setSaveError] = useState(false);

  function toggleDone(id: string) {
    const next = done.includes(id) ? done.filter(x => x !== id) : [...done, id];
    setDone(next);
    try { localStorage.setItem(afterTestTwoStorageKey, JSON.stringify(next)); setSaveError(false); } catch { setSaveError(true); }
  }

  function sectionList(sections: ThaiSection[]) {
    return <>
      <nav className="test2-jump" aria-label="หัวข้อในหน้านี้">{sections.map(s => <a key={s.id} href={`#at2-${s.id}`}>{s.title}</a>)}</nav>
      {sections.map(s => <article id={`at2-${s.id}`} className="test2-section" key={s.id}>
        <p className="test2-source">Suomen mestari 1 · หน้า {s.pages.join(', ')}</p>
        <h2>{s.title}</h2><p>{s.intro}</p>
        {s.notes.length > 0 && <ul className="test2-notes">{s.notes.map((note, i) => <li key={i}>{note}</li>)}</ul>}
        {s.tables.map((table, i) => <div className="test2-table-block" key={i}><h3>{table.title}</h3><div className="test2-table-scroll" tabIndex={0} role="region" aria-label={table.title}><table><thead><tr>{table.columns.map((c, j) => <th scope="col" key={j}>{c}</th>)}</tr></thead><tbody>{table.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody></table></div></div>)}
        <label className="test2-complete"><input type="checkbox" checked={done.includes(s.id)} onChange={() => toggleDone(s.id)} />ทบทวนหัวข้อนี้แล้ว</label>
      </article>)}
    </>;
  }

  return <div className="page lesson-page lesson-three lesson-five test2-page">
    <div className="lesson-hero"><div><span className="kicker">AFTER TEST 2</span><h1>Torstaina 5. – Torstaina 19. marraskuuta</h1></div></div>
    <div className="test2-banner"><span>AFTER TEST 2 · 05.11–19.11</span><h2>สรุปไวยากรณ์ การฟัง และคำศัพท์หลัง TEST 2</h2><p>รวมเนื้อหาจากทุกคาบเรียนใน Moodle ระหว่างวันพฤหัสบดีที่ 5 ถึงวันพฤหัสบดีที่ 19 พฤศจิกายน พร้อมคำอธิบาย ตัวอย่าง และแบบฝึกฟังจากหนังสือ</p><p>ทบทวนแล้ว {grammarSections.filter(s => done.includes(s.id)).length} / {grammarSections.length} หัวข้อ</p></div>
    <div className="lesson-tabs" role="tablist" aria-label="After Test 2">{tabs.map(name => <button type="button" role="tab" className={tab === name ? 'active' : ''} id={`at2-tab-${name}`} aria-controls="at2-panel" aria-selected={tab === name} key={name} onClick={() => setTab(name)}>{name}</button>)}</div>
    {saveError && <p role="alert">บันทึกลงอุปกรณ์ไม่ได้ ความคืบหน้าจะไม่ถูกจดจำในอุปกรณ์นี้</p>}
    <section className="lesson-panel" id="at2-panel" role="tabpanel" aria-labelledby={`at2-tab-${tab}`}>
      {tab === 'Start' && <>
        <h2>ขอบเขตเนื้อหาจาก Moodle</h2>
        <p>รวบรวมจากประกาศของผู้สอนในคาบเรียนวันที่ 5, 10, 12, 17 และ 19 พฤศจิกายน รายการด้านล่างคือเนื้อหาที่สอนจริงในช่วงนี้ ไม่ใช่ข้อสอบหรือการคาดเดา</p>
        <ol className="test2-scope">{afterTestTwoScope.map((item, i) => <li key={i}><button type="button" onClick={() => setTab(item.tab as Tab)}><strong>{item.title}</strong><span>หน้า {item.pages.join(', ')} → {item.tab}</span></button></li>)}</ol>
        <h3>คาบเรียนที่รวมอยู่ในสรุปนี้</h3>
        <ul>{afterTestTwoSections.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></li>)}</ul>
      </>}
      {tab === 'Grammar' && sectionList(grammarSections)}
      {tab === 'Listening' && <>
        <h2>แบบฝึกฟังจากหนังสือ</h2>
        <p>แบบฝึกฟังที่ Moodle ระบุไว้ชัดเจนว่าเป็นแบบฝึกฟัง (มีไฟล์เสียงหรือสัญลักษณ์หูฟังในหนังสือ) เลขหน้าด้านล่างเป็นเลขหน้าที่พิมพ์ในหนังสือ</p>
        {listeningItems.map(item => <article className="test2-section" key={item.id}>
          <p className="test2-source">Suomen mestari 1 · หน้า {item.pages.join(', ')}</p>
          <h2>{item.exercise}</h2>
          <p><strong>งาน:</strong> {item.task}</p>
          <p><strong>จุดที่ควรฝึก:</strong> {item.focus}</p>
          {item.audio && item.audio.length > 0 ? (
            <div className="test2-audio-list">
              {item.audio.map(clip => (
                <div className="test2-audio-item" key={clip.src}>
                  <p>{clip.label}</p>
                  <audio controls preload="none" src={clip.src}>
                    เบราว์เซอร์นี้ไม่รองรับการเล่นเสียง
                  </audio>
                  {clip.transcript ? (
                    <div className="test2-transcript">
                      <p lang="fi">{clip.transcript}</p>
                      {clip.transcriptTh && <p className="test2-transcript-th" lang="th">{clip.transcriptTh}</p>}
                    </div>
                  ) : (
                    <p className="test2-transcript-missing">ไม่มีบทถอดเสียงทางการจาก Moodle สำหรับคลิปนี้ (ฟังจากไฟล์เสียงล้วน ๆ)</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="test2-notes-inline">ไม่มีไฟล์เสียงแยกใน Moodle สำหรับแบบฝึกนี้ (ฟังจาก CD/แผ่นเสียงของหนังสือ)</p>
          )}
        </article>)}
      </>}
      {tab === 'Vocab' && <LessonVocab lessonId="afterTest2" />}
      {tab === 'Sources' && <>
        <h2>แหล่งอ้างอิงและหน้าหนังสือ</h2>
        <p>{afterTestTwoSections.map((s, i) => <span key={s.url}>{i > 0 && ' · '}<a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></span>)}</p>
        <p>เลขหน้าด้านล่างเป็นเลขหน้าที่พิมพ์ในหนังสือ (ไม่ใช่เลขหน้าไฟล์ PDF) เปิดภาพเพื่อเทียบกับต้นฉบับได้</p>
        <div className="test2-source-grid">{afterTestTwoPages.map(p => <a key={p} href={`/afterTest2/book-${p}.jpg`} target="_blank" rel="noreferrer">หน้า {p} ↗</a>)}</div>
      </>}
    </section>
  </div>;
}
