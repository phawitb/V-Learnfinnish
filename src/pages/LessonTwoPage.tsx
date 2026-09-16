import { useState, type ReactNode } from "react";
import { CalendarDays, Check, ChevronRight, Hash, MessageCircle, Volume2 } from "lucide-react";
import { ttsService } from "../services/ttsService";

type Step = "start" | "olla" | "time" | "numbers" | "sentences" | "check";
const steps: { id: Step; label: string }[] = [
  { id: "start", label: "Start" }, { id: "olla", label: "Olla" },
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
  { title: "11–19 · เติม -toista", rows: [["11", "yksitoista"], ["12", "kaksitoista"], ["13", "kolmetoista"], ["19", "yhdeksäntoista"]] },
  { title: "หลักสิบ · เติม -kymmentä", rows: [["20", "kaksikymmentä"], ["30", "kolmekymmentä"], ["50", "viisikymmentä"], ["90", "yhdeksänkymmentä"]] },
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
    <div className="lesson-hero"><div><span className="kicker">LESSON 2 · KAPPALE 2</span><h1>Suomea joka päivä</h1><p>ภาษาฟินแลนด์ที่ใช้ได้จริงในทุกวัน</p></div><div className="lesson-progress"><b>{progress}%</b><span>complete</span><i><em style={{ width: `${progress}%` }} /></i></div></div>
    <div className="lesson-tabs" role="tablist">{steps.map((s, i) => <button role="tab" aria-selected={step === s.id} className={step === s.id ? "active" : completed.includes(s.id) ? "done" : ""} onClick={() => setStep(s.id)} key={s.id}><span>{completed.includes(s.id) ? <Check size={14} /> : i + 1}</span>{s.label}</button>)}</div>
    {step === "start" && <div className="lesson-panel intro-panel"><div className="lesson-number">02</div><span className="kicker">EVERYDAY FINNISH</span><h2>สร้างประโยคและพูดเรื่องชีวิตประจำวัน</h2><p>เรียนกริยา olla วัน เวลา ตัวเลข และประโยคสำเร็จรูปที่พบได้บ่อย พร้อมฟังเสียงภาษาฟินแลนด์ได้ทุกตัวอย่าง</p><div className="objectives"><div><span>01</span><p><b>ผันกริยา olla</b>ใช้ทั้งภาษาเขียนและภาษาพูด</p></div><div><span>02</span><p><b>บอกวันและเวลา</b>ใช้รูป -na/-nä อย่างถูกต้อง</p></div><div><span>03</span><p><b>สื่อสารในชีวิตจริง</b>ฝึกตัวเลขและ 20 ประโยคสำคัญ</p></div></div><button className="primary lesson-next" onClick={() => go("olla")}>เริ่มเรียนกริยา olla <ChevronRight /></button></div>}
    {step === "olla" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">VERBI · PUHEKIELI</span><h2>Olla — เป็น อยู่ คือ</h2><p>กริยาภาษาฟินแลนด์เปลี่ยนรูปตามประธาน ภาษาพูดมีรูปที่ใช้บ่อยต่างจากภาษาเขียน</p></div><MessageCircle /></div><div className="lesson-table lesson2-table"><div className="table-head"><b>ประธาน</b><b>ภาษาเขียน</b><b>ภาษาพูด</b><b>ความหมาย</b></div>{olla.map(([p, standard, spoken, th]) => <div key={p}><Finnish text={`${p} ${standard}`}>{p}</Finnish><Finnish text={standard} /><Finnish text={spoken} /><span>{th}</span></div>)}</div><div className="lesson-tip"><b>จำง่าย</b><p><strong>hän</strong> ใช้กับคนในภาษาเขียน แต่ภาษาพูดมักใช้ <strong>se</strong> ส่วนพหูพจน์มักใช้ <strong>ne on</strong></p></div><button className="primary lesson-next" onClick={() => go("time")}>ต่อไป: วันและเวลา <ChevronRight /></button></div>}
    {step === "time" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">VIIKONPÄIVÄT · AIKA</span><h2>วันและเวลา</h2><p>เมื่อต้องการพูด “ในวัน…” ให้เปลี่ยนชื่อวันเป็นรูป -na/-nä</p></div><CalendarDays /></div><div className="day-grid">{days.map(([base, form, th]) => <article key={base}><Finnish text={form} /><Finnish text={base} /><p>{th}</p></article>)}</div><h3 className="subhead">เส้นเวลา</h3><div className="timeline-grid">{timeline.map(([fi, th]) => <div key={fi}><Finnish text={fi} /><span>{th}</span></div>)}</div><div className="useful-grid compact"><article><Finnish text="viime viikolla" /><span>สัปดาห์ที่แล้ว</span></article><article><Finnish text="tällä viikolla" /><span>สัปดาห์นี้</span></article><article><Finnish text="ensi viikolla" /><span>สัปดาห์หน้า</span></article><article><Finnish text="arkisin" /><span>ในวันธรรมดา</span></article></div><button className="primary lesson-next" onClick={() => go("numbers")}>ต่อไป: ตัวเลข <ChevronRight /></button></div>}
    {step === "numbers" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">NUMEROT</span><h2>ตัวเลขภาษาฟินแลนด์</h2><p>มองหาชิ้นส่วนซ้ำ: -toista สำหรับ 11–19 และ -kymmentä สำหรับหลักสิบ</p></div><Hash /></div><div className="number-sections">{numberGroups.map(group => <section key={group.title}><h3>{group.title}</h3><div>{group.rows.map(([n, fi]) => <article key={n}><span>{n}</span><Finnish text={fi} /></article>)}</div></section>)}</div><button className="primary lesson-next" onClick={() => go("sentences")}>ต่อไป: ประโยคใช้จริง <ChevronRight /></button></div>}
    {step === "sentences" && <div className="lesson-panel"><div className="lesson-title"><div><span className="kicker">ARKIPÄIVÄN SUOMEA</span><h2>คำทักทายและประโยคใช้จริง</h2><p>กดฟัง แล้วพูดตามทั้งประโยค</p></div><MessageCircle /></div><h3 className="subhead">คำทักทายพื้นฐาน</h3><div className="useful-grid">{basics.map(([fi, th]) => <article key={fi}><Finnish text={fi} /><span>{th}</span></article>)}</div><h3 className="subhead">20 ประโยคสำหรับชีวิตประจำวัน</h3><div className="sentence-list">{sentences.map(([fi, th], i) => <article key={fi}><b>{i + 1}</b><div><Finnish text={fi} /><span>{th}</span></div></article>)}</div><button className="primary lesson-next" onClick={() => go("check")}>ทำแบบทดสอบ <ChevronRight /></button></div>}
    {step === "check" && <div className="lesson-panel quiz-panel"><span className="kicker">KNOWLEDGE CHECK</span><h2>ทบทวน Lesson 2</h2>{finished ? <div className="lesson-result"><span>✓</span><div><p>จบบทเรียนแล้ว</p><b>{score} / {questions.length}</b><p>{score >= 5 ? "Hienoa! ทำได้ยอดเยี่ยม" : "Hyvä yritys! ลองทบทวนอีกครั้ง"}</p></div></div> : <><p>คำถาม {index + 1} จาก {questions.length}</p><h3>{question.prompt}</h3><div className="lesson-answers">{question.choices.map(choice => <button key={choice} disabled={!!answer} className={answer ? choice === question.correct ? "correct" : choice === answer ? "wrong" : "" : ""} onClick={() => { setAnswer(choice); if (choice === question.correct) setScore(score + 1); }}>{choice}</button>)}</div>{answer && <><div className="lesson-tip"><b>{answer === question.correct ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{question.explain}</p></div><button className="primary lesson-next" onClick={() => { if (index === questions.length - 1) { setFinished(true); finish("check"); } else { setIndex(index + 1); setAnswer(""); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } }}>คำถามถัดไป <ChevronRight /></button></>}</>}</div>}
  </section>;
}
