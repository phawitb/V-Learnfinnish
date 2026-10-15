import { LessonVocab } from "./LessonVocab";
import { useState, type ReactNode } from "react";
import { CalendarDays, Check, ChevronRight, Hash, MessageCircle, Volume2 } from "lucide-react";
import { ttsService } from "../services/ttsService";

type Step = "vocab" | "book" | "start" | "olla" | "time" | "numbers" | "sentences" | "check";
const steps: { id: Step; label: string }[] = [
  { id: "start", label: "Start" }, { id: "vocab", label: "Vocab" }, { id: "book", label: "Moodle & homework" }, { id: "olla", label: "Olla" },
  { id: "time", label: "Time" }, { id: "numbers", label: "Numbers" },
  { id: "sentences", label: "Sentences" }, { id: "check", label: "Check" },
];
const olla = [
  ["Minä", "olen", "mä oon", "ฉัน เป็น/อยู่/คือ"], ["Sinä", "olet", "sä oot", "คุณ เป็น/อยู่/คือ"],
  ["Hän / Se", "on", "se on", "เขา/หล่อน / มัน"], ["Me", "olemme", "me ollaan", "พวกเรา เป็น/อยู่/คือ"],
  ["Te", "olette", "te ootte", "พวกคุณ เป็น/อยู่/คือ"], ["He / Ne", "ovat", "ne on", "พวกเขา / พวกมัน"],
];
const days = [
  ["maanantai", "maanantaina", "วันจันทร์"], ["tiistai", "tiistaina", "วันอังคาร"],
  ["keskiviikko", "keskiviikkona", "วันพุธ"], ["torstai", "torstaina", "วันพฤหัสบดี"],
  ["perjantai", "perjantaina", "วันศุกร์"], ["lauantai", "lauantaina", "วันเสาร์"],
  ["sunnuntai", "sunnuntaina", "วันอาทิตย์"], ["viikonloppu", "viikonloppuna", "ช่วงวันหยุดสุดสัปดาห์"],
];
const timeline = [["toissapäivänä", "เมื่อวานซืน"], ["eilen", "เมื่อวาน"], ["tänään", "วันนี้"], ["huomenna", "พรุ่งนี้"], ["ylihuomenna", "มะรืนนี้"]];
const numberGroups = [
  { title: "0–10", rows: [["0", "nolla"], ["1", "yksi"], ["2", "kaksi"], ["3", "kolme"], ["4", "neljä"], ["5", "viisi"], ["6", "kuusi"], ["7", "seitsemän"], ["8", "kahdeksan"], ["9", "yhdeksän"], ["10", "kymmenen"]] },
  { title: "11–19 · เติม -toista", rows: [["11", "yksitoista"], ["12", "kaksitoista"], ["13", "kolmetoista"], ["14", "neljätoista"], ["15", "viisitoista"], ["16", "kuusitoista"], ["17", "seitsemäntoista"], ["18", "kahdeksantoista"], ["19", "yhdeksäntoista"]] },
  { title: "หลักสิบ · เติม -kymmentä", rows: [["20", "kaksikymmentä"], ["30", "kolmekymmentä"], ["40", "neljäkymmentä"], ["50", "viisikymmentä"], ["60", "kuusikymmentä"], ["70", "seitsemänkymmentä"], ["80", "kahdeksankymmentä"], ["90", "yhdeksänkymmentä"]] },
  { title: "จำนวนมาก", rows: [["100", "sata"], ["200", "kaksisataa"], ["1,000", "tuhat"], ["2,000", "kaksituhatta"], ["1 ล้าน", "miljoona"], ["1 พันล้าน", "miljardi"], ["1 ล้านล้าน", "biljoona"]] },
];
const sentences = [
  ["Kuka sinä olet?", "คุณคือใคร?"], ["Oletko ok?", "คุณโอเคไหม?"], ["Minulla on punainen paita.", "ฉันมีเสื้อสีแดง"], ["Missä poika on?", "เด็กผู้ชายอยู่ที่ไหน?"],
  ["Bussilla kouluun!", "ไปโรงเรียนด้วยรถบัส!"], ["Paljonko kello on?", "กี่โมงแล้ว?"], ["Ostan kaksi leipää.", "ฉันซื้อขนมปังสองก้อน"], ["Maanantaina sataa vettä.", "ในวันจันทร์ฝนตก"],
  ["Tässä on minun perhe.", "นี่คือครอบครัวของฉัน"], ["Tule tänne!", "มานี่!"], ["Moi, mitä kuuluu?", "สวัสดี สบายดีไหม?"], ["Minä olen syntynyt keväällä.", "ฉันเกิดในฤดูใบไม้ผลิ"],
  ["Minulla on käsi kipeä.", "ฉันเจ็บมือ"], ["Minä olen iloinen.", "ฉันมีความสุข / ฉันดีใจ"], ["Käänny vasemmalle.", "เลี้ยวซ้าย"], ["Seuraava asiakas.", "ลูกค้าคิวถัดไป"],
  ["Mitä tämä maksaa?", "สิ่งนี้ราคาเท่าไหร่?"], ["Minä tykkään kahvista.", "ฉันชอบกาแฟ"], ["Tarvitsen hammastahnaa.", "ฉันต้องการยาสีฟัน"], ["Meneekö tämä bussi Ouluun?", "รถบัสคันนี้ไปเมือง Oulu หรือเปล่า?"],
];
const basics = [["Hei / Moi / Terve!", "สวัสดี"], ["Tervetuloa!", "ยินดีต้อนรับ"], ["Anteeksi", "ขอโทษ / ขออนุญาต"], ["Mitä kuuluu?", "สบายดีไหม?"], ["Kiitos, minulle kuuluu hyvää.", "ขอบคุณ ฉันสบายดี"], ["Entä sinulle?", "แล้วคุณล่ะ?"], ["Hauska tutustua!", "ยินดีที่ได้รู้จัก"], ["Kiitos samoin!", "ขอบคุณเช่นกัน"], ["Miten se kirjoitetaan?", "สะกดอย่างไร?"]];
const questions = [
  { prompt: "เติมประโยค: Me ___ Suomessa.", choices: ["olemme", "olette", "ovat"], correct: "olemme", explain: "Me olemme = พวกเราเป็น/อยู่" },
  { prompt: "ภาษาพูดของ ‘Minä olen’ คือข้อใด?", choices: ["mä oon", "sä oot", "ne on"], correct: "mä oon", explain: "ในภาษาพูด minä → mä และ olen → oon" },
  { prompt: "‘ในวันพุธ’ พูดว่าอย่างไร?", choices: ["keskiviikko", "keskiviikkona", "keskiviikolla"], correct: "keskiviikkona", explain: "เติม -na/-nä เพื่อบอกว่าในวันนั้น" },
  { prompt: "ylihuomenna หมายถึงอะไร?", choices: ["เมื่อวานซืน", "พรุ่งนี้", "มะรืนนี้"], correct: "มะรืนนี้", explain: "huomenna = พรุ่งนี้, ylihuomenna = มะรืนนี้" },
  { prompt: "20 ในภาษาฟินแลนด์คือข้อใด?", choices: ["kaksitoista", "kaksikymmentä", "kaksisataa"], correct: "kaksikymmentä", explain: "สองสิบ = kaksi + kymmentä" },
  { prompt: "ประโยคใดใช้ถามราคา?", choices: ["Paljonko kello on?", "Mitä tämä maksaa?", "Missä poika on?"], correct: "Mitä tämä maksaa?", explain: "แปลว่า สิ่งนี้ราคาเท่าไหร่?" },
];
function Finnish({ text, children }: { text: string; children?: ReactNode }) { return <button type="button" className="finnish-speak" onClick={() => ttsService.speak(text)} aria-label={`Listen to ${text}`}>{children ?? text}<Volume2 size={13} /></button>; }

export function LessonTwoPage() {
  const [step, setStep] = useState<Step>("start");
  const [completed, setCompleted] = useState<Step[]>(() => { try { return JSON.parse(localStorage.getItem("sisu:lesson2:v1") || "[]"); } catch { return []; } });
  const [index, setIndex] = useState(0), [answer, setAnswer] = useState(""), [score, setScore] = useState(0), [finished, setFinished] = useState(false);
  const finish = (id: Step) => { const next = [...new Set([...completed, id])]; setCompleted(next); localStorage.setItem("sisu:lesson2:v1", JSON.stringify(next)); };
  const go = (id: Step) => { finish(step); setStep(id); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); };
  const progress = Math.round((completed.length / steps.length) * 100), question = questions[index];
  return <section className="page lesson-page lesson-two">
    <div className="lesson-hero"><div><span className="kicker">10.09.2026 · KAPPALE 1</span><h1>Thursday 10.09</h1><p>ภาษาฟินแลนด์ที่ใช้ได้จริงในทุกวัน</p></div><div className="lesson-progress"><b>{progress}%</b><span>complete</span><i><em style={{ width: `${progress}%` }} /></i></div></div>
    <div className="lesson-tabs" role="tablist">{steps.map((s, i) => <button role="tab" aria-selected={step === s.id} className={step === s.id ? "active" : completed.includes(s.id) ? "done" : ""} onClick={() => setStep(s.id)} key={s.id}><span>{completed.includes(s.id) ? <Check size={14} /> : i + 1}</span>{s.label}</button>)}</div>
    {step === "vocab" && <div className="lesson-panel"><LessonVocab lessonId={2} /><button type="button" className="primary lesson-next" disabled={completed.includes("vocab")} onClick={() => finish("vocab")}>{completed.includes("vocab") ? "เรียนส่วนนี้แล้ว" : "ทำส่วนนี้เสร็จแล้ว"}</button></div>}
      {step === "start" && <div className="lesson-panel intro-panel"><div className="lesson-number">02</div><span className="kicker">EVERYDAY FINNISH</span><h2>สร้างประโยคและพูดเรื่องชีวิตประจำวัน</h2><p>เรียนกริยา olla วัน เวลา ตัวเลข และประโยคสำเร็จรูปที่พบได้บ่อย พร้อมฟังเสียงภาษาฟินแลนด์ได้ทุกตัวอย่าง</p><div className="objectives"><div><span>01</span><p><b>ผันกริยา olla</b>ใช้ทั้งภาษาเขียนและภาษาพูด</p></div><div><span>02</span><p><b>บอกวันและเวลา</b>ใช้รูป -na/-nä อย่างถูกต้อง</p></div><div><span>03</span><p><b>สื่อสารในชีวิตจริง</b>ฝึกตัวเลขและ 20 ประโยคสำคัญ</p></div></div><button className="primary lesson-next" onClick={() => go("olla")}>เริ่มเรียนกริยา olla <ChevronRight /></button></div>}

    {step === "book" && <div className="lesson-panel">
      <h2>Thursday 10.09 · งานในชั้นเรียนและการบ้าน</h2>
      <p>เสียงสั้น–ยาว · สรรพนามและ olla หน้า 16 · อ่านหน้า 11 · ตัวเลขหน้า 15 · แบบฝึก 13 หน้า 24 และ 18–19 หน้า 26</p>
      <h3>เสียงสั้น–ยาวเปลี่ยนความหมาย</h3><p>ออกเสียงตัวซ้ำให้นานขึ้น: tuli = ไฟ, tuuli = ลม; mato = หนอน, matto = พรม การลงน้ำหนักอยู่พยางค์แรก แต่ความยาวต้องรักษาทุกพยางค์</p>
      <div className="useful-grid">{["tuli", "tuuli", "mato", "matto"].map(x => <Finnish key={x} text={x} />)}</div>
      {[11,15,16].map(page => <EarlyBookPage key={page} page={page} />)}
      <h3>อ่านหน้า 11 · Hei ja tervetuloa!</h3><p>Alex ถามว่าที่นี่เป็นคอร์สฟินแลนด์หรือไม่และที่นั่งว่างไหม Olga แนะนำตัว จากนั้น Pedro เข้ามาทักทาย ครู Päivi Koskela บอกชื่อและสะกดให้ฟัง ในเรื่องเรียนวันจันทร์ พุธ พฤหัส เวลา 18–20 น. ตารางนี้เป็นข้อมูลของตัวละครในหนังสือ</p><EarlyAnswers rows={[["Onko tämä paikka vapaa?", "On.", "ที่นั่งนี้ว่างไหม? — ว่าง"],["Kuka opettaja on?", "Opettaja on Päivi Koskela.", "ครูชื่อ Päivi Koskela"],["Milloin kurssi on tekstissä?", "Maanantaina, keskiviikkona ja torstaina kello kahdeksantoista–kaksikymmentä.", "ตารางเรียนในเรื่อง: จันทร์ พุธ พฤหัส 18–20 น."],["Miten se kirjoitetaan?", "P-Ä-I-V-I K-O-S-K-E-L-A", "ถามว่าสะกดอย่างไร ใช้ชื่ออักษรที่ฝึกในบทแรก"]]}/>
      <h3>Harjoitus 13 · หน้า 24 · คำนวณแล้วอ่านเป็นฟินแลนด์</h3>
      <p>plus = บวก · miinus = ลบ · kertaa = คูณ · on = เท่ากับ</p>
      <EarlyAnswers rows={[
        ["a. 15 + 4", "yhdeksäntoista", "19"], ["b. 2 × 10", "kaksikymmentä", "20"], ["c. 20 − 6", "neljätoista", "14"], ["d. 8 + 4", "kaksitoista", "12"], ["e. 19 − 17", "kaksi", "2"], ["f. 6 × 3", "kahdeksantoista", "18"], ["g. 14 − 5", "yhdeksän", "9"], ["h. 3 + 7", "kymmenen", "10"], ["i. 16 × 0", "nolla", "0"], ["j. 15 − 8", "seitsemän", "7"]]} />
      <EarlyBookPage page={24} />
      <h3>Harjoitus 18–19 · หน้า 26</h3><p>ดูรูปกริยาเพื่อหาประธาน: -n → minä, -t → sinä, -mme → me, -tte → te, -vat → he</p>
      <EarlyAnswers rows={[
        ["18.1–6 · เติมสรรพนาม", "Te; Hän; me; sinä; Minä; He", "Te olette / Hän on Pedro / Missä me olemme? / Kuka sinä olet? / Minä olen Laura / He ovat Helsingissä"],
        ["19.1–6 · เติม olla", "olet; olen; olemme; olette; on; ovat", "จับคู่ sinä–olet, minä–olen, me–olemme, te–olette, hän–on, he–ovat"]]} />
      <h3>การบ้าน Harjoitus 20 · หน้า 27</h3>
      <EarlyAnswers rows={[
        ["1. Kuka ___ olet? Minä ___ Kalle.", "sinä; olen", "คุณคือใคร? ฉันคือ Kalle"], ["2. Te ___ nyt suomen kurssilla.", "olette", "พวกคุณอยู่ในชั้นเรียนภาษาฟินแลนด์"], ["3. Opettajan nimi ___ Päivi.", "on", "ชื่อครูคือ Päivi; nimi เป็นเอกพจน์"], ["4. ___ ovat nyt Helsingissä.", "He", "พวกเขาอยู่ที่เฮลซิงกิ; he ใช้กับ ovat"], ["5. Kuinka vanha ___ on?", "hän", "เขาอายุเท่าไร?"], ["6. Missä ___ olette? Me ___ Suomessa.", "te; olemme", "พวกคุณอยู่ที่ไหน? พวกเราอยู่ฟินแลนด์"], ["7. Olga ja Alex ___ kurssilla.", "ovat", "สองคนเป็นพหูพจน์ จึงใช้ ovat"]]} />
      <EarlyBookPage page={27} />
      <h3>การบ้าน Harjoitus 17A–C · หน้า 25–26</h3>
      <EarlyAnswers rows={[
        ["17A · วันนี้เป็นวันจันทร์", "tiistai; keskiviikko; sunnuntai; lauantai", "พรุ่งนี้อังคาร / มะรืนพุธ / เมื่อวานอาทิตย์ / เมื่อวานซืนเสาร์"],
        ["17B · พรุ่งนี้เป็นวันอาทิตย์", "lauantai; maanantai; perjantai; torstai", "วันนี้เสาร์ / มะรืนจันทร์ / เมื่อวานศุกร์ / เมื่อวานซืนพฤหัสบดี"],
        ["17C.1 · musiikki", "perjantaina", "ดนตรีมีวันศุกร์"], ["17C.2 · biologia", "torstaina", "ชีววิทยามีวันพฤหัสบดี"], ["17C.3 · englanti", "maanantaina ja tiistaina", "ภาษาอังกฤษมีวันจันทร์และอังคาร"], ["17C.4 · historia", "keskiviikkona ja perjantaina", "ประวัติศาสตร์มีวันพุธและศุกร์"], ["17C.5 · matematiikka", "maanantaina, keskiviikkona ja torstaina", "คณิตศาสตร์มีวันจันทร์ พุธ และพฤหัสบดี; คำถาม Milloin ต้องตอบรูป -na"]]} />
      <EarlyBookPage page={25} /><EarlyBookPage page={26} />
      <h3>การบ้านฟัง Harjoitus 12 · หน้า 23</h3><p>ฟังอุณหภูมิของ Helsinki, Inari, Joensuu, Kajaani, Lappeenranta, Oulu, Rovaniemi, Tampere, Turku และ Vaasa แล้วกรอกตัวเลข หน่วย aste = องศา ไม่สามารถอ่านเฉลยจากแผนที่ได้ ต้องใช้เสียงต้นฉบับของแบบฝึกนี้</p>
      <EarlyBookPage page={23} /><audio controls preload="none" src="/audit-early/012_Kappale 1_Harjoitus 12_Lampotilat (1).mp3"/><EarlyAnswers rows={[["เฉลยอุณหภูมิ 1–10 จากไฟล์ครู", "+14; 0; +4; +5; +9; +3; +1; +16; +18; +11", "Helsinki +14, Inari 0, Joensuu +4, Kajaani +5, Lappeenranta +9, Oulu +3, Rovaniemi +1, Tampere +16, Turku +18, Vaasa +11 °C; 1 aste แต่จำนวนอื่นใช้ astetta"]]}/>
      <label>บันทึกคำตอบจากการฟัง<textarea aria-label="Harjoitus 12 page 23 listening notes" rows={5} style={{width:"100%"}} placeholder="Helsinki: … °C, Inari: … °C" /></label>
      <h3>Pronouns Homework · ไฟล์เพิ่มเติม</h3><EarlyAnswers rows={[["1–7 · เติม olla", "on; olet; olemme; olette; ovat; on; ovat", "Hän on 58 vuotta. Sinä olet ranskalainen. Me olemme Suomessa. Te olette kurssilla. He ovat Helsingissä. Se on nimi. Ne ovat ruusuja."]]}/>
<h3>Homework Numbers · ไฟล์เพิ่มเติม</h3><EarlyAnswers rows={[["8−6; 5+9; 13−1; 3×7; 10+12", "kaksi; neljätoista; kaksitoista; kaksikymmentäyksi; kaksikymmentäkaksi", "คำตอบ 2, 14, 12, 21, 22"],["42÷7; 17+7; 8×9; 44−16; 27÷9", "kuusi; kaksikymmentäneljä; seitsemänkymmentäkaksi; kaksikymmentäkahdeksan; kolme", "คำตอบ 6, 24, 72, 28, 3; jaettuna = หารด้วย"]]}/>
<h3>เสียงอ่านหน้า 11 และชุด Pronunciation</h3><p>Track 1-06 แนะนำเสียงสั้น–ยาวทุกกลุ่ม; 1-14 ฝึกคู่สระ; 1-22 ฝึกคู่พยัญชนะ ฟังแล้วอ่านแต่ละคอลัมน์ตามภาพ หยุดเสียงสั้นกว่าเมื่อสะกดตัวเดียว และค้างจังหวะเมื่อสะกดซ้ำ</p>{[1,2].map(n=><details className="lesson-tip" key={n}><summary>Pronunciation · หน้า {n}</summary><img src={`/audit-early/pronunciation-${n}.png`} alt={`แบบฝึกออกเสียงหน้า ${n}`} loading="lazy" style={{width:"100%"}}/></details>)}<audio controls preload="none" src="/audit-early/002_Kappale 1_Hei_ja_tervetuloa (5).mp3"/>{["1-06 Track 06.mp3","1-14 Track 14.mp3","1-22 Track 22.mp3"].map(file=><div key={file}><p>{file}</p><audio controls preload="none" src={`/audit-early/${file}`}/></div>)}
<div className="course-files">{["Pronunciation.pdf","Pronouns_Homework (3).docx","Homework_Numbers (1).pdf","Harjoitus 12, sivu 23_Answers (3).docx"].map(file=><a key={file} href={`/audit-early/${file}`} target="_blank" rel="noreferrer">{file}</a>)}</div>
    </div>}
    {step === "olla" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">VERBI · PUHEKIELI</span><h2>Olla — เป็น อยู่ คือ</h2><p>กริยาภาษาฟินแลนด์เปลี่ยนรูปตามประธาน ภาษาพูดมีรูปที่ใช้บ่อยต่างจากภาษาเขียน</p></div><MessageCircle /></div><div className="lesson-table lesson2-table"><div className="table-head"><b>ประธาน</b><b>ภาษาเขียน</b><b>ภาษาพูด</b><b>ความหมาย</b></div>{olla.map(([p, standard, spoken, th]) => <div key={p}><Finnish text={`${p} ${standard}`}>{p}</Finnish><Finnish text={standard} /><Finnish text={spoken} /><span>{th}</span></div>)}</div><div className="lesson-tip"><b>จำง่าย</b><p><strong>hän</strong> ใช้กับคนในภาษาเขียน แต่ภาษาพูดมักใช้ <strong>se</strong> ส่วนพหูพจน์มักใช้ <strong>ne on</strong></p></div><button className="primary lesson-next" onClick={() => go("time")}>ต่อไป: วันและเวลา <ChevronRight /></button></div>}
    {step === "time" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">VIIKONPÄIVÄT · AIKA</span><h2>วันและเวลา</h2><p>เมื่อต้องการพูด “ในวัน…” ให้เปลี่ยนชื่อวันเป็นรูป -na/-nä</p></div><CalendarDays /></div><div className="day-grid">{days.map(([base, form, th]) => <article key={base}><Finnish text={form} /><Finnish text={base} /><p>{th}</p></article>)}</div><h3 className="subhead">เส้นเวลา</h3><div className="timeline-grid">{timeline.map(([fi, th]) => <div key={fi}><Finnish text={fi} /><span>{th}</span></div>)}</div><div className="useful-grid compact"><article><Finnish text="viime viikolla" /><span>สัปดาห์ที่แล้ว</span></article><article><Finnish text="tällä viikolla" /><span>สัปดาห์นี้</span></article><article><Finnish text="ensi viikolla" /><span>สัปดาห์หน้า</span></article><article><Finnish text="arkisin" /><span>ในวันธรรมดา</span></article></div><button className="primary lesson-next" onClick={() => go("numbers")}>ต่อไป: ตัวเลข <ChevronRight /></button></div>}
    {step === "numbers" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">NUMEROT</span><h2>ตัวเลขภาษาฟินแลนด์</h2><p>มองหาชิ้นส่วนซ้ำ: -toista สำหรับ 11–19 และ -kymmentä สำหรับหลักสิบ</p></div><Hash /></div><div className="number-sections">{numberGroups.map(group => <section key={group.title}><h3>{group.title}</h3><div>{group.rows.map(([n, fi]) => <article key={n}><span>{n}</span><Finnish text={fi} /></article>)}</div></section>)}</div><button className="primary lesson-next" onClick={() => go("sentences")}>ต่อไป: ประโยคใช้จริง <ChevronRight /></button></div>}
    {step === "sentences" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">ARKIPÄIVÄN SUOMEA</span><h2>คำทักทายและประโยคใช้จริง</h2><p>กดฟัง แล้วพูดตามทั้งประโยค</p></div><MessageCircle /></div><h3 className="subhead">คำทักทายพื้นฐาน</h3><div className="useful-grid">{basics.map(([fi, th]) => <article key={fi}><Finnish text={fi} /><span>{th}</span></article>)}</div><h3 className="subhead">20 ประโยคสำหรับชีวิตประจำวัน</h3><div className="sentence-list">{sentences.map(([fi, th], i) => <article key={fi}><b>{i + 1}</b><div><Finnish text={fi} /><span>{th}</span></div></article>)}</div><button className="primary lesson-next" onClick={() => go("check")}>ทำแบบทดสอบ <ChevronRight /></button></div>}
    {step === "check" && <div className="lesson-panel quiz-panel"><span className="kicker">KNOWLEDGE CHECK</span><h2>ทบทวน Thursday 10.09</h2>{finished ? <div className="lesson-result"><span>✓</span><div><p>จบบทเรียนแล้ว</p><b>{score} / {questions.length}</b><p>{score >= 5 ? "Hienoa! ทำได้ยอดเยี่ยม" : "Hyvä yritys! ลองทบทวนอีกครั้ง"}</p></div></div> : <><p>คำถาม {index + 1} จาก {questions.length}</p><h3>{question.prompt}</h3><div className="lesson-answers">{question.choices.map(choice => <button key={choice} disabled={!!answer} className={answer ? choice === question.correct ? "correct" : choice === answer ? "wrong" : "" : ""} onClick={() => { setAnswer(choice); if (choice === question.correct) setScore(score + 1); }}>{choice}</button>)}</div>{answer && <><div className="lesson-tip"><b>{answer === question.correct ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{question.explain}</p></div><button className="primary lesson-next" onClick={() => { if (index === questions.length - 1) { setFinished(true); finish("check"); } else { setIndex(index + 1); setAnswer(""); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } }}>คำถามถัดไป <ChevronRight /></button></>}</>}</div>}
  </section>;
}

export function EarlyBookPage({page}: {page: number}) {
 const oldFiles: Record<number, string> = {23:"022",24:"023",25:"024",26:"025",27:"026"};
 const url = oldFiles[page] ? `/audit-early/book-${oldFiles[page]}.png` : `/audit-early/page-${page}.png`;
 return <details className="lesson-tip"><summary>เปิดต้นฉบับหนังสือ หน้า {page}</summary><a href={url} target="_blank" rel="noreferrer">เปิดภาพขนาดเต็ม</a><img src={url} alt={`Suomen mestari 1 หน้า ${page}`} loading="lazy" style={{width:"100%",height:"auto"}} /></details>;
}
export function EarlyAnswers({rows}: {rows: string[][]}) {
 return <div>{rows.map(([prompt,answer,note],i)=><details className="lesson-tip" key={`${prompt}-${i}`}><summary>{prompt} · กดดูเฉลย</summary><Finnish text={answer}/><p>{note}</p></details>)}</div>;
}
