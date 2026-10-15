import { useMemo, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { LessonId } from '../data/courseCatalog';
import { getLessonVocabulary } from '../data/lessonVocabulary';
import { ttsService } from '../services/ttsService';

export function LessonVocab({ lessonId }: { lessonId: LessonId }) {
  const entries = useMemo(() => getLessonVocabulary(lessonId), [lessonId]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const search = query.trim().normalize('NFC').toLocaleLowerCase('fi');
  const filtered = entries.filter(entry => `${entry.fi} ${entry.th} ${entry.category ?? ''}`.normalize('NFC').toLocaleLowerCase('fi').includes(search));
  return <section className="lesson-vocab" aria-label="คำศัพท์ประจำบท">
    <h2>Vocab · คำศัพท์ประจำบท</h2>
    <p>รวมคำศัพท์และสำนวนจากเนื้อหา บทอ่าน แบบฝึกหัด และการบ้าน เรียงตามตัวอักษรฟินแลนด์ คำที่มีหลายรูปอาจแสดงทั้งรูปพื้นฐานและรูปที่ใช้ในบท</p>
    <label className="vocab-search">ค้นหาคำศัพท์ (ฟินแลนด์ / ไทย)
      <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="เช่น sää หรือ อากาศ" />
    </label>
    <p role="status">แสดง {filtered.length} จาก {entries.length} รายการ</p>
    {error && <p role="alert">เล่นเสียงไม่ได้ในอุปกรณ์นี้ กรุณาลองอีกครั้งหรือตรวจสอบเสียงอ่านของเบราว์เซอร์</p>}
    {filtered.length === 0 && <p>ไม่พบคำศัพท์ ลองค้นด้วยคำสั้นลงหรือล้างช่องค้นหา</p>}
    <div className="vocab-grid">{filtered.map(entry => <article key={entry.fi}>
      <div className="vocab-word"><h3 lang="fi">{entry.fi}</h3><button type="button" className="finnish-speak" aria-label={`Listen to ${entry.fi}`} onClick={() => {
        setError(false);
        if (!ttsService.speak(entry.fi, undefined, () => setError(true))) setError(true);
      }}><Volume2 size={18} aria-hidden="true" /></button></div>
      <p lang="th">{entry.th}</p>{entry.category && <small>{entry.category}</small>}
    </article>)}</div>
    <p className="vocab-note">ปุ่มลำโพงใช้เสียงสังเคราะห์ภาษาฟินแลนด์ คำแปลไทยเป็นคำอธิบายประกอบการเรียน</p>
  </section>;
}
