import { listeningAllCourse, type AllCourseListeningItem, type AllCourseAudioClip } from '../data/listeningAllCourse';
import { listeningItems as afterTestTwoItems } from '../data/afterTestTwoListening';
import './TestTwoPage.css';

type Group = { label: string; items: AllCourseListeningItem[] };

function groupByLesson(items: AllCourseListeningItem[]): Group[] {
  const groups: Group[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.label === item.lessonLabel) last.items.push(item);
    else groups.push({ label: item.lessonLabel, items: [item] });
  }
  return groups;
}

function slug(label: string) {
  return 'lsn-' + label.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

function renderAudioClip(clip: AllCourseAudioClip) {
  return <div className="test2-audio-item" key={clip.src}>
    <p>{clip.label}</p>
    <audio controls preload="none" src={clip.src}>เบราว์เซอร์นี้ไม่รองรับการเล่นเสียง</audio>
    {clip.transcriptNote && <p className="test2-notes-inline">{clip.transcriptNote}</p>}
    {clip.transcript ? (
      <div className="test2-transcript">
        <p lang="fi">{clip.transcript}</p>
        {clip.transcriptTh && <p className="test2-transcript-th" lang="th">{clip.transcriptTh}</p>}
        {clip.transcriptKind && (
          <p className="test2-transcript-th" style={{ fontSize: '.8rem', opacity: 0.75 }}>
            {clip.transcriptKind === 'official'
              ? 'ที่มา: เฉลย/บทถอดเสียงทางการจาก Moodle หรือหนังสือ'
              : clip.transcriptKind === 'whisper'
              ? 'ที่มา: ถอดเสียงอัตโนมัติด้วย Whisper (AI) ในเครื่อง ไม่ใช่บทถอดเสียงทางการ อาจมีคำคลาดเคลื่อน โดยเฉพาะชื่อเฉพาะและตัวเลข'
              : 'ที่มา: เรียบเรียงจากเนื้อหาบทเรียน ยังไม่ได้เทียบกับบทถอดเสียง Moodle ทางการ'}
          </p>
        )}
      </div>
    ) : (
      <p className="test2-transcript-missing">ไม่มีบทถอดเสียงทางการจาก Moodle สำหรับคลิปนี้ (ฟังจากไฟล์เสียงล้วน ๆ)</p>
    )}
  </div>;
}

export function ListeningPage() {
  const groups = groupByLesson(listeningAllCourse);
  const allLabels = [...groups.map(g => g.label), 'After Test 2 · 05.11–19.11'];

  return <div className="page lesson-page lesson-three lesson-five test2-page">
    <div className="lesson-hero"><div><span className="kicker">LISTENING</span><h1>การฟังทั้งคอร์ส</h1></div></div>
    <div className="test2-banner">
      <span>LISTENING · รวมทุกบท</span>
      <h2>รวบรวมแบบฝึกฟังจากทุกบทเรียน ตั้งแต่บทแรกถึง After Test 2</h2>
      <p>ไฟล์เสียงและบทถอดเสียงนำมาจากหน้าแต่ละบทเรียนเดิม จัดเรียงตามลำดับวันเรียน บทที่มีเฉลย/บทถอดเสียงทางการจาก Moodle หรือหนังสือจะระบุที่มาไว้ใต้บทถอดเสียง ส่วนคลิปที่ไม่มีบทถอดเสียงจริงจะแจ้งไว้ชัดเจนแทนการแต่งขึ้นเอง</p>
    </div>
    <nav className="test2-jump" aria-label="ไปยังบทเรียน">
      {allLabels.map(label => <a key={label} href={`#${slug(label)}`}>{label}</a>)}
    </nav>

    {groups.map(group => <article className="test2-section" id={slug(group.label)} key={group.label}>
      <h2>{group.label}</h2>
      {group.items.map(item => <div key={item.id} style={{ marginTop: 18 }}>
        {item.pages && item.pages.length > 0 && <p className="test2-source">Suomen mestari 1 · หน้า {item.pages.join(', ')}</p>}
        <h3>{item.exercise}</h3>
        <p><strong>งาน:</strong> {item.task}</p>
        {item.focus && <p><strong>จุดที่ควรฝึก:</strong> {item.focus}</p>}
        {item.audio && item.audio.length > 0 ? (
          <div className="test2-audio-list">{item.audio.map(clip => renderAudioClip(clip))}</div>
        ) : (
          <p className="test2-notes-inline">{item.noAudioNote ?? 'ไม่มีไฟล์เสียงแยกสำหรับแบบฝึกนี้'}</p>
        )}
      </div>)}
    </article>)}

    <article className="test2-section" id={slug('After Test 2 · 05.11–19.11')}>
      <h2>After Test 2 · 05.11–19.11</h2>
      <p className="test2-source">Suomen mestari 1 · แบบฝึกฟังจากหนังสือหลัง Test 2</p>
      {afterTestTwoItems.map(item => <div key={item.id} style={{ marginTop: 18 }}>
        <p className="test2-source">Suomen mestari 1 · หน้า {item.pages.join(', ')}</p>
        <h3>{item.exercise}</h3>
        <p><strong>งาน:</strong> {item.task}</p>
        <p><strong>จุดที่ควรฝึก:</strong> {item.focus}</p>
        {item.audio && item.audio.length > 0 ? (
          <div className="test2-audio-list">
            {item.audio.map(clip => <div className="test2-audio-item" key={clip.src}>
              <p>{clip.label}</p>
              <audio controls preload="none" src={clip.src}>เบราว์เซอร์นี้ไม่รองรับการเล่นเสียง</audio>
              {clip.transcript ? (
                <div className="test2-transcript">
                  <p lang="fi">{clip.transcript}</p>
                  {clip.transcriptTh && <p className="test2-transcript-th" lang="th">{clip.transcriptTh}</p>}
                </div>
              ) : (
                <p className="test2-transcript-missing">ไม่มีบทถอดเสียงทางการจาก Moodle สำหรับคลิปนี้ (ฟังจากไฟล์เสียงล้วน ๆ)</p>
              )}
            </div>)}
          </div>
        ) : (
          <p className="test2-notes-inline">ไม่มีไฟล์เสียงแยกใน Moodle สำหรับแบบฝึกนี้ (ฟังจาก CD/แผ่นเสียงของหนังสือ)</p>
        )}
      </div>)}
    </article>
  </div>;
}
