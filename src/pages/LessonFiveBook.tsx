import { type ReactNode, useState } from 'react';
import {
  adjectivePairs, bookWeather, exercise9A, exercise9B, exercise9Bank,
  exercise12, exercise12Bank, exercise23, kptVerbs, weatherDialogues, weekdays,
} from '../data/lessonFiveBook';

type Speech = (text: string) => ReactNode;
type Draft = (id: string, label: string) => ReactNode;

export function BookSource({ page, open = false }: { page: number; open?: boolean }) {
  return <details className="lesson5-book-source" open={open}>
    <summary>ดูหน้าหนังสือ {page} · เลขหน้าที่พิมพ์ในเล่ม</summary>
    <img className="lesson5-source-image" src={`/lesson5/book/page-${page}.jpg`} alt={`Suomen mestari 1 — sivu ${page} ตามเลขหน้าที่พิมพ์ในหนังสือ`} loading="lazy" />
    <a href={`/lesson5/book/page-${page}.jpg`} target="_blank" rel="noreferrer">เปิดภาพหน้า {page} ขนาดเต็ม</a>
  </details>;
}

export function BookVocabulary({ section, speak }: { section: 'Seasons' | 'Weather' | 'Adjectives'; speak: Speech }) {
  if (section === 'Adjectives') return <section className="lesson5-book-section">
    <h3>หน้า 60 · Millainen? — คู่คำตามหนังสือ</h3>
    <p>รายการครบตามภาพในหนังสือ 10 คู่ (iso และ suuri มีความหมายว่า “ใหญ่” เหมือนกัน) ส่วน paljon / vähän เป็นคำบอกปริมาณ</p>
    <div className="lesson5-vocabulary">{adjectivePairs.map(([left, thLeft, right, thRight]) => <article key={left}>{speak(left)}<p>{thLeft}</p><span aria-hidden="true">↕</span>{speak(right)}<p>{thRight}</p></article>)}</div>
    <BookSource page={60} />
  </section>;
  if (section === 'Weather') return <section className="lesson5-book-section">
    <h3>หน้า 61 · ประโยคจากหนังสือครบทั้งหน้า</h3>
    <p>ตารางด้านล่างถอดประโยคจากหน้า 61 โดยตรง รวมตัวอย่างอุณหภูมิและคำที่ไม่ได้อยู่ใน Quizlet</p>
    <div className="lesson5-vocabulary">{bookWeather.map(([fi, th]) => <article key={fi}>{speak(fi)}<p>{th}</p></article>)}</div>
    <h4>บทสนทนาใต้ภาพ</h4>
    {weatherDialogues.map((dialogue, i) => <article className="lesson5-exercise" key={i}>{dialogue.map(([fi, th]) => <div key={fi}>{speak(fi)}<p>{th}</p></div>)}</article>)}
    <p><b>คำช่วยเข้าใจ:</b> kamala = แย่มาก, ihanaa = ดีจัง, tosi = มาก / จริง ๆ; onpa เพิ่มน้ำเสียงอุทาน เช่น “ช่าง…จัง”</p>
    <BookSource page={61} />
  </section>;
  return <section className="lesson5-book-section">
    <h3>หน้า 62 · เพิ่มเติมจากตารางในหนังสือ</h3>
    <p>คำศัพท์ฤดู 4 ฤดู เดือน 12 เดือน และช่วงเวลา 7 ช่วงอยู่ในรายการด้านบนครบแล้ว หนังสือยังมีตารางวันในสัปดาห์และบทสนทนาเรื่องวันเกิดดังนี้</p>
    <h4>Viikonpäivät — วันในสัปดาห์</h4>
    <div className="lesson5-vocabulary">{weekdays.map(([day, when, th]) => <article key={day}>{speak(day)}<p>{th}</p>{speak(when)}<p>ใน{th}</p></article>)}</div>
    <div className="lesson-tip"><b>ตอบ Milloin? ให้เหมาะกับหน่วยเวลา</b><p>ฤดูและช่วงเวลาใช้ -lla/-llä เช่น kesällä, yöllä; เดือนใช้ -ssa เช่น kesäkuussa; วันในสัปดาห์ใช้ -na เช่น maanantaina</p></div>
    <h4>วันเกิดอยู่ในเดือนไหน?</h4>
    {speak('Milloin sinun syntymäpäivä on?')}<p>วันเกิดของคุณเมื่อไร?</p>
    {speak('Minun syntymäpäivä on toukokuussa.')}<p>วันเกิดของฉันอยู่ในเดือนพฤษภาคม</p>
    <p>คำว่า syntymäpäivä = วันเกิด; รูปประโยคด้านบนเก็บตามหนังสือ ลองเปลี่ยน toukokuussa เป็นเดือนเกิดของตัวเอง</p>
    <BookSource page={62} />
  </section>;
}

export function BookExercises({ speak, draft }: { speak: Speech; draft: Draft }) {
  const [exercise, setExercise] = useState<9 | 12 | 23>(9);
  return <section>
    <span className="kicker">SUOMEN MESTARI 1 · KAPPALE 3</span>
    <h2>แบบฝึกจากหนังสือ</h2>
    <p>เลขหน้าในบทเรียนนี้คือเลข “sivu” ที่พิมพ์บนหน้าหนังสือ ไม่ใช่ลำดับหน้าไฟล์ PDF โจทย์จากหน้า 73, 75, 81 และเฉลยตรวจจากหน้า 331 คำแปลและคำอธิบายไทยเป็นส่วนเสริม</p>
    <nav className="lesson5-options" aria-label="เลือกแบบฝึกจากหนังสือ">
      {([[9, 73], [12, 75], [23, 81]] as const).map(([id, page]) => <button type="button" key={id} aria-pressed={exercise === id} className={exercise === id ? 'active' : ''} onClick={() => setExercise(id)}>{id} · หน้า {page}</button>)}
    </nav>

    {exercise === 9 && <section aria-label="Harjoitus 9">
      <h3>Harjoitus 9 · sivu 73</h3>
      <p><b>Millainen?</b> — เป็นอย่างไร?</p>
      <BookSource page={73} />
      <h4>A. Etsi vastakohdat. — หาคำตรงข้าม</h4>
      <p>คำในกรอบตามต้นฉบับ: {exercise9Bank.join(' · ')}</p>
      <p>ตัวอย่างที่หนังสือให้: <b lang="fi">ruma ↔ kaunis</b> จับคู่ที่เหลือให้ครบทั้งหมด 9 คู่ การสลับซ้าย–ขวายังคงเป็นคู่คำเดียวกัน</p>
      {exercise9A.map(([left, right, th], i) => <article className="lesson5-exercise" key={left}>
        <h4>9A · คู่ {i + 1}</h4>
        {i === 0 ? <p lang="fi">ruma ↔ kaunis (ตัวอย่าง)</p> : <><p lang="fi">{left} ↔ ___</p>{draft(`book-9a-${i}`, `คำตอบ 9A คู่ ${i + 1}`)}</>}
        <details><summary>เฉลยท้ายเล่ม · คู่ {i + 1}</summary>{speak(`${left} — ${right}`)}<p>{th}</p></details>
      </article>)}
      <h4>B. Kirjoita adjektiivit. — เติมคำคุณศัพท์</h4>
      <p>ครบ 8 ข้อ ข้อ 1 เป็นตัวอย่าง บางข้อมีหลายคำตอบตามเฉลยท้ายเล่ม</p>
      {exercise9B.map(({ prompt, th, answer, note }, i) => <article className="lesson5-exercise" key={prompt}>
        <h4>9B · ข้อ {i + 1}</h4>{speak(prompt)}<p>{th}</p>
        {i === 0 ? <p>ตัวอย่างในหนังสือ: <b lang="fi">kuuma</b></p> : draft(`book-9b-${i}`, `คำตอบ 9B ข้อ ${i + 1}`)}
        <details><summary>เฉลยท้ายเล่ม · 9B ข้อ {i + 1}</summary>{speak(answer)}<p>{note}</p></details>
      </article>)}
    </section>}

    {exercise === 12 && <section aria-label="Harjoitus 12">
      <h3>Harjoitus 12 · sivu 75</h3>
      <p><b>Yhdistä kuvat ja lauseet.</b> — จับคู่ภาพกับประโยค แต่ละภาพใช้ 3 ประโยค รวม 12 ประโยค</p>
      <p>แบบฝึกนี้มีภาพวาด 4 ภาพ ต่างจากไฟล์ภาพถ่าย 6 ภาพของผู้สอนในแท็บ Pictures</p>
      <BookSource page={75} open />
      <p>หน้าเดียวกันมี Harjoitus 13 อยู่ด้านล่าง แต่งานใน Moodle ระบุให้ทำ Harjoitus 12</p>
      <div className="lesson-tip"><b>ประโยคในกรอบ</b><div className="lesson3-chip-grid">{exercise12Bank.map(sentence => <span key={sentence}>{speak(sentence)}</span>)}</div></div>
      {exercise12.map(({ picture, answer, th, note }, i) => <article className="lesson5-exercise" key={picture}>
        <h4>ภาพ {i + 1} · {picture}</h4>
        {draft(`book-12-${i}`, `คำตอบ 12 ภาพ ${i + 1}`)}
        <details><summary>เฉลยท้ายเล่ม · ภาพ {i + 1}</summary>{speak(answer)}<p>{th}</p><p>{note}</p></details>
      </article>)}
    </section>}

    {exercise === 23 && <section aria-label="Harjoitus 23">
      <h3>Harjoitus 23 · sivu 81</h3>
      <p><b>K-p-t-verbit. Katso kuvaa ja kirjoita, mitä he tekevät ja eivät tee.</b></p>
      <p>กริยาที่เปลี่ยนพยัญชนะ k–p–t: ดูภาพแล้วเขียนว่าบุคคลทำอะไรและไม่ทำอะไร ใช้กริยาทั้งสองคำในแต่ละข้อ</p>
      <BookSource page={81} open />
      <article className="lesson5-exercise"><h4>Malli — ตัวอย่าง</h4>
        {speak('Mitä te teette lomalla?')}<p>พวกคุณทำอะไรในวันหยุด? กริยา: hiihtää / yöpyä hotellissa</p>
        {speak('Lomalla me emme hiihdä.')}<p>ในวันหยุดพวกเราไม่เล่นสกี</p>
        {speak('Lomalla me yövymme hotellissa.')}<p>ในวันหยุดพวกเราพักค้างคืนที่โรงแรม</p>
      </article>
      {exercise23.map(({ question, th, verbs, picture, answers, meaning, note }, i) => <article className="lesson5-exercise" key={question}>
        <h4>ข้อ {i + 1} · {question}</h4><p>{th}</p><p>ภาพ: {picture}</p><p lang="fi">{verbs}</p>
        {draft(`book-23-${i}`, `คำตอบ 23 ข้อ ${i + 1}`)}
        <details><summary>เฉลยท้ายเล่ม · ข้อ {i + 1}</summary>{answers.map(answer => <p key={answer}>{speak(answer)}</p>)}<p>{meaning}</p><p>{note}</p></details>
      </article>)}
      <div className="lesson-tip"><b>เปลี่ยนผู้พูดให้ถูก</b><p>คำถาม sinä → คำตอบ minä; คำถาม te → คำตอบ me ส่วน Paula และ lapset ใช้บุคคลตามโจทย์เดิม</p><p>ประโยคปฏิเสธใช้ en / et / ei / emme / ette / eivät + รูปกริยาปฏิเสธ: minä en lue, me emme kirjoita, he eivät nuku รูป hän/he ในประโยคบอกเล่าของกริยากลุ่มนี้คงพยัญชนะรูปแข็ง เช่น kirjoittavat แต่รูปปฏิเสธใช้ kirjoita</p></div>
      <h4>K–p–t ที่ใช้ในแบบฝึกนี้</h4>
      <div className="lesson5-vocabulary">{kptVerbs.map(([base, first, example, note]) => <article key={base}>{speak(base)}<p lang="fi">minä {first}</p>{speak(example)}<p>{note}</p></article>)}</div>
      <h4>เชิงอรรถในหนังสือ: tehdä — ทำ</h4>
      {speak('minä teen, sinä teet, hän tekee, me teemme, te teette, he tekevät')}<p>รูปคำถามในโจทย์: Mitä sinä teet? / Mitä te teette? / Mitä Paula tekee? / Mitä lapset tekevät?</p>
    </section>}
    <div className="lesson-tip"><b>ตรวจด้วยเฉลยท้ายเล่ม หน้า 331</b><p>แบบฝึก 9B ข้อ 2–3 มีหลายคำตอบ และข้อ 6 ให้ kiva เป็นตัวอย่าง อย่าใช้การเทียบตัวอักษรเพียงอย่างเดียวตัดสินคำตอบปลายเปิด</p></div>
    <BookSource page={331} />
  </section>;
}
