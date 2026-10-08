import { exercise20, exercise25, exercise25Passages, pluralWords } from '../data/lessonSixContent';
import { pluralExplanations, sentenceExplanations, verbExplanations } from '../data/lessonSixHomework';

export function LessonSixHomework() {
  return <section className="lesson5-book-section" aria-label="เฉลยการบ้านแบบละเอียด">
    <h3>เฉลยการบ้านแบบละเอียด</h3>
    <p>เปิดตรวจทีละแบบฝึกได้ที่นี่ รวมข้อที่หนังสือทำเป็นตัวอย่างให้แล้ว คำตอบอ้างอิงหน้า 331 ส่วนคำแปลและคำอธิบายไทยเพิ่มเติมเพื่อช่วยทำความเข้าใจ</p>
    <a href="/lesson6/book/page-331.jpg" target="_blank" rel="noreferrer">ตรวจเฉลยต้นฉบับหน้า 331</a>
    <details className="lesson5-book-source">
      <summary>เปิดเฉลยละเอียด · แบบฝึก 19</summary>
      <h4>Harjoitus 19 · หน้า 78 · ครบ 8 ข้อ</h4>
      <p>Yksikkö = เอกพจน์ · Monikko = พหูพจน์ ในแบบฝึกนี้ใช้พหูพจน์ -t โดยเลือกฐานคำให้ถูกก่อนเติม t หากมีคำคุณศัพท์ขยายคำนาม ต้องเปลี่ยนทั้งสองคำให้สอดคล้องกัน</p>
      {pluralWords.map(([singular, answer, th, rule], i) => <article className="lesson5-exercise" key={singular}>
        <h4>19 · ข้อ {i + 1} — {answer}</h4>
        <p lang="fi"><b>{singular} → {answer}</b></p><p>ความหมาย: {th}</p>
        <p><b>วิธีทำ:</b> {pluralExplanations[i]}</p><p><b>จำสั้น ๆ:</b> {rule}</p>
      </article>)}
    </details>
    <details className="lesson5-book-source">
      <summary>เปิดเฉลยละเอียด · แบบฝึก 20</summary>
      <h4>Harjoitus 20 · หน้า 79 · ครบ 8 ข้อ</h4>
      <p>เลือกคำจากความหมายของประโยค แล้วดูรูปกริยาเพื่อเลือกเอกพจน์หรือพหูพจน์: on / ei / loppuu / tulee ใช้กับเอกพจน์ในโจทย์นี้ ส่วน ovat / eivät / maksavat ใช้กับพหูพจน์</p>
      {exercise20.map(([prompt, answer, th], i) => <article className="lesson5-exercise" key={prompt}>
        <h4>20 · ข้อ {i + 1} — {answer}</h4><p lang="fi">โจทย์: {prompt}</p>
        <p lang="fi"><b>{prompt.replace('___', answer)}</b></p><p>แปล: {th}</p>
        <p><b>เหตุผล:</b> {sentenceExplanations[i]}</p>
      </article>)}
    </details>
    <details className="lesson5-book-source">
      <summary>เปิดเฉลยละเอียด · แบบฝึก 25</summary>
      <h4>Harjoitus 25 · หน้า 82–83 · ครบ 19 ข้อ</h4>
      <p>เลือกกริยาจากความหมาย → ระบุประธาน → เลือกฐานรูปแข็งหรือรูปอ่อน → เติมปัจจัยบุคคล สำหรับกริยาแบบที่ใช้ในโจทย์นี้ รูป minä, sinä, me, te ใช้รูปอ่อนเมื่อมีการสลับพยัญชนะ ส่วน hän, he ในประโยคบอกเล่าใช้รูปแข็ง</p>
      <p>ปฏิเสธใช้ en / et / ei / emme / ette / eivät + รูปกริยาปฏิเสธ เช่น en nuku, emme löydä โดยไม่ใส่ปัจจัยบุคคลซ้ำที่กริยาหลัก</p>
      {exercise25.map(([answer, rule, th], i) => <article className="lesson5-exercise" key={i}>
        <h4>25 · ข้อ {i + 1} — {answer}</h4>
        <p lang="fi"><b>{verbExplanations[i][0]}</b></p><p>ความหมายส่วนที่เติม: {th}</p>
        <p><b>วิธีผันและเหตุผล:</b> {verbExplanations[i][1]}</p><p><b>จำสั้น ๆ:</b> {rule}</p>
      </article>)}
      <h4>เรื่องเต็มเมื่อเติมคำตอบแล้ว</h4>
      {exercise25Passages.map((passage, i) => <p className="lesson5-exercise" lang="fi" key={i}>{passage.replace(/(\d+)\. ___(?: \(NEG\.\))?/g, (_, number: string) => exercise25[Number(number) - 1][0])}</p>)}
    </details>
    <div className="lesson-tip"><b>การบ้าน Quizlet</b><p>งานนี้ให้ทบทวนคำศัพท์ 3 ชุด จึงไม่มีเฉลยตายตัวแบบข้อ 19, 20 และ 25 กด “ทบทวนคำศัพท์” ด้านบนเพื่อดูศัพท์ฟินแลนด์พร้อมความหมายไทยและอังกฤษครบทั้ง Weather, Seasons and months และ Adjectives</p></div>
  </section>;
}
