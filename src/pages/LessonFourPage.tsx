import { CSSProperties, ReactNode, useState } from "react";
import { Check, ChevronRight, MessageCircle, Volume2 } from "lucide-react";
import { ttsService } from "../services/ttsService";

type Step = "start" | "spoken" | "harjoitus" | "negative" | "conjugation" | "dialogues" | "translation" | "homework" | "check";
const steps: { id: Step; label: string }[] = [
  { id: "start", label: "Start" }, { id: "spoken", label: "Spoken" }, { id: "harjoitus", label: "Harjoitus" },
  { id: "negative", label: "Negative" }, { id: "conjugation", label: "Conjugation" }, { id: "dialogues", label: "Dialogues" },
  { id: "translation", label: "Translation" }, { id: "homework", label: "Homework" }, { id: "check", label: "Check" },
];

const spokenNumbers = [
  ["yksi", "yks", "1"], ["kaksi", "kaks", "2"], ["kolme", "kolme/kolmee", "3"], ["neljä", "neljä", "4"],
  ["viisi", "viis", "5"], ["kuusi", "kuus", "6"], ["seitsemän", "seittemän/seiska", "7"], ["kahdeksan", "kaheksan/kasi", "8"],
  ["yhdeksän", "yheksän/ysi", "9"], ["kymmenen", "kymppi", "10"], ["yksitoista", "ykstoista", "11"], ["kaksitoista", "kakstoista", "12"],
  ["kaksikymmentä", "kakskyt/kakskymmentä", "20"], ["kaksikymmentäyksi", "kakskytyks", "21"], ["sata", "satku", "100"], ["tuhat", "tonni", "1000"],
];
const writtenDialogue = [
  ["Myyjä", "Hei."], ["Pedro", "Hei. Mitä jäätelö maksaa?"],
  ["Myyjä", "Yksi pallo maksaa 3 euroa ja kaksi palloa 5 euroa."], ["Pedro", "Okei. Minä otan sitten kaksi palloa suklaata."],
  ["Myyjä", "Okei. Entä sinulle?"], ["Alex", "Minäkin otan kaksi palloa: vaniljaa ja mansikkaa."],
  ["Myyjä", "Selvä. Tuleeko muuta?"], ["Pedro", "Ei kiitos."],
  ["Myyjä", "Tässä. 10 euroa yhteensä. Tuleeko nämä samasta?"], ["Alex", "Kyllä tulee. Minä maksan nämä. Kortilla, kiitos."],
  ["Myyjä", "Kiitos. Tarvitsetko kuittia?"], ["Alex", "Ei kiitos."],
];
const spokenDialogue = [
  ["Myyjä", "Hei."], ["Pedro", "Hei. Mitä jätski maksaa?"],
  ["Myyjä", "Yks pallo maksaa 3 euroo ja kaks palloo 5 euroo."], ["Pedro", "Okei. No mä otan sit kaks palloo suklaata."],
  ["Myyjä", "Okei. Entä sulle?"], ["Alex", "Mäkin otan kaks palloo: vaniljaa ja mansikkaa."],
  ["Myyjä", "Selvä. Tuleeks muuta?"], ["Pedro", "Ei kiitos."],
  ["Myyjä", "Tässä. 10 euroa yhteensä. Tuleeks nää samasta?"], ["Alex", "Joo tulee. Mä maksan nää. Kortilla, kiitos."],
  ["Myyjä", "Kiitos. Tarviitko kuittia?"], ["Alex", "Ei kiitti."],
];
const spokenDiffs = [
  ["jäätelö", "jätski"], ["Yksi", "Yks"], ["euroa", "euroo"], ["palloa", "palloo"], ["Minä", "Mä"], ["sitten", "sit"],
  ["sinulle", "sulle"], ["Minäkin", "Mäkin"], ["Tuleeko", "Tuleeks"], ["nämä", "nää"], ["Kyllä", "Joo"], ["Tarvitsetko", "Tarviitko"], ["kiitos", "kiitti"],
];

const harjoitus12 = [
  ["Hän ___ kotoisin Saksasta", "olla", "on"], ["He eivät ___ englantia", "puhua", "puhu"],
  ["___ sinä Turussa?", "asua", "Asutko"], ["Milloin kurssi ___", "alkaa", "alkaa"],
  ["___ te saunaa?", "rakastaa", "Rakastatteko"], ["Illalla me ___ usein televisiota", "katsoa", "katsomme"],
  ["Mikä sinun sukunimi ___?", "olla", "on"], ["He ___ paljon ruokaa viikonloppuna", "ostaa", "ostavat"],
  ["Miksi sinä et ___?", "tanssia", "tanssi"], ["Hän ei ___ usein", "matkustaa", "matkusta"],
];
const harjoitus14 = [
  ["Minä asun Helsingissä.", "Minä en asu Helsingissä."], ["Me menemme bussipysäkille.", "Me emme mene bussipysäkille."],
  ["Elina puhuu espanjaa.", "Elina ei puhu espanjaa."], ["Sinä olet venäläinen.", "Sinä et ole venäläinen."],
  ["Giuseppe ja Manuela ostavat jäätelöä.", "Giuseppe ja Manuela eivät osta jäätelöä."],
  ["Te istutte puistossa.", "Te ette istu puistossa."], ["Jäätelö maksaa 3 euroa.", "Jäätelö ei maksa 3 euroa."],
];

const negativeRule = [
  ["minä", "en", "en puhu"], ["sinä", "et", "et puhu"], ["hän", "ei", "ei puhu"],
  ["me", "emme", "emme puhu"], ["te", "ette", "ette puhu"], ["he", "eivät", "eivät puhu"],
];

const newVerbs = [
  ["asua", "to live / อาศัยอยู่", "asun, asut, asuu, asumme, asutte, asuvat"],
  ["nauraa", "to laugh / หัวเราะ", "nauran, naurat, nauraa, nauramme, nauratte, nauravat"],
  ["säästää", "to save / เก็บออม", "säästän, säästät, säästää, säästämme, säästätte, säästävät"],
  ["ostaa", "to buy / ซื้อ", "ostan, ostat, ostaa, ostamme, ostatte, ostavat"],
  ["katsoa", "to watch / ดู", "katson, katsot, katsoo, katsomme, katsotte, katsovat"],
  ["istua", "to sit / นั่ง", "istun, istut, istuu, istumme, istutte, istuvat"],
  ["rakastaa", "to love / รัก", "rakastan, rakastat, rakastaa, rakastamme, rakastatte, rakastavat"],
  ["tanssia", "to dance / เต้นรำ", "tanssin, tanssit, tanssii, tanssimme, tanssitte, tanssivat"],
  ["matkustaa", "to travel / เดินทาง", "matkustan, matkustat, matkustaa, matkustamme, matkustatte, matkustavat"],
  ["alkaa", "to begin / เริ่มต้น", "alkaa (impersonal)"],
  ["etsiä", "to seek / ค้นหา", "etsin, etsit, etsii, etsimme, etsitte, etsivät"],
  ["laulaa", "to sing / ร้องเพลง", "laulan, laulat, laulaa, laulamme, laulatte, laulavat"],
  ["seisoa", "to stand / ยืน", "seison, seisot, seisoo, seisomme, seisotte, seisovat"],
  ["maksaa", "to pay / จ่าย", "maksan, maksat, maksaa, maksamme, maksatte, maksavat"],
];
const conjugation30 = [
  ["Minä olen kurssilla.", "olla"], ["Hän asuu Suomessa.", "asua"], ["Me emme puhu ruotsia.", "puhua"],
  ["Sinä naurat paljon.", "nauraa"], ["Te säästätte rahaa.", "säästää"], ["Te ette osta paljon ruokaa.", "ostaa"],
  ["Minä en katso televisiota.", "katsoa"], ["Hän istuu tuolla.", "istua"], ["Sinä rakastat suomea.", "rakastaa"],
  ["Sinä kysyt jotakin.", "kysyä"], ["Hän ei puhu ranskaa.", "puhua"], ["Me ostamme kahvia.", "ostaa"],
  ["Te olette työssä.", "olla"], ["Me emme säästä rahaa.", "säästää"], ["Minä etsin ystävää.", "etsiä"],
  ["Tänään on torstai.", "olla"], ["Minä en tanssi tangoa.", "tanssia"], ["He maksavat kahvia.", "maksaa"],
  ["Huomenna on perjantai.", "olla"], ["He istuvat kotona.", "istua"], ["Te ette asu Saksassa.", "asua"],
  ["Hän ei puhu italiaa.", "puhua"], ["Sinä rakastat saunaa.", "rakastaa"], ["Me emme laula.", "laulaa"],
  ["Te katsotte paljon televisiota.", "katsoa"], ["Opettaja seisoo tuolla.", "seisoa"], ["Me emme tanssi salsaa.", "tanssia"],
  ["Hän kysyy paljon kurssilla.", "kysyä"], ["He eivät asu Unkarissa.", "asua"], ["Minä en rakasta karaokea.", "rakastaa"],
];

const pizzaDialogue = [
  ["Myyjä", "Päivää."], ["Asiakas", "Hyvää päivää. Mitä salamipizza maksaa?"],
  ["Myyjä", "Se maksaa 7 euroa."], ["Asiakas", "Ahaa. Entä mitä kinkkupizza maksaa?"],
  ["Myyjä", "Kinkkupizza maksaa 8 euroa."], ["Asiakas", "Selvä. Haluaisin 2 salamipizzaa, kiitos."],
  ["Myyjä", "Okei. Tuleeko muuta?"], ["Asiakas", "Ei kiitos."],
  ["Myyjä", "Se on 14 euroa, kiitos."], ["Asiakas", "Tässä, ole hyvä."],
  ["Myyjä", "Kiitos."], ["Asiakas", "Kiitos. Näkemiin."], ["Myyjä", "Näkemiin."],
];
const iceCreamDialogue = [
  ["Myyjä", "Hei!"], ["Asiakas", "Moi! Mitä jätski maksaa?"],
  ["Myyjä", "Yks pallo maksaa 3,50 ja kaks palloo 6 euroo."], ["Asiakas", "Okei. No yks pallo vaniljaa ja yks pallo lakritsia."],
  ["Myyjä", "Selvä. Tuleeks muuta?"], ["Asiakas", "Joo, yks kahvi, kiitos."],
  ["Myyjä", "8,50 yhteensä. Käteisellä vai kortilla?"], ["Asiakas", "Kortilla."],
  ["Myyjä", "Okei. Tässä ole hyvä."], ["Asiakas", "Kiitos."],
  ["Myyjä", "Okei. Tarviitko kuittia?"], ["Asiakas", "Ei kiitti."],
  ["Myyjä", "Kiitti. Moikka!"], ["Asiakas", "Kiitos, hei hei."],
];
const dialogueVocab = [
  ["salamipizza", "ซาลามิพิซซ่า"], ["kinkkupizza", "พิซซ่าแฮม (ham pizza)"], ["Haluaisin", "อยากได้ / I would like"],
  ["Tuleeko muuta?", "รับอย่างอื่นอีกไหม"], ["lakritsi", "ชะเอมเทศ (licorice)"], ["kahvi", "กาแฟ (coffee)"],
  ["käteisellä", "ด้วยเงินสด (with cash)"], ["käteisellä vai kortilla?", "เงินสดหรือบัตร?"],
];

const translationEn = `Hello! My name is Anna. I am a student. I am 18 years old. I am a Finn, I am from Finland. I speak Finnish, Swedish and English. This is my week:
I work on Monday.
On Tuesday, I watch TV.
On Wednesday, I am in a dance class.
On Thursday, I often sit in the park. I love summer.
On Friday, I buy food. I do not buy much food. I save money.
On Saturday, I sing karaoke and laugh a lot.
I'm at home on Sunday. Sometimes I travel on weekends.`;
const translationFi = [
  "Päivää! Olen Anna (Minun nimi on Anna). Olen opiskelija. Olen 18 vuotta vanha. Olen suomalainen, olen kotoisin Suomesta. Puhun suomea, ruotsia ja englantia. Tämä on minun viikko:",
  "1. Olen töissä maanantaina.", "2. Katson televisiota tiistaina.", "3. Minä olen tanssikurssilla keskiviikkona.",
  "4. Minä istun usein puistossa torstaina. Rakastan kesää paljon.", "5. Perjantaina ostan ruokaa. Minä en osta paljon ruokaa. Minä säästän rahaa.",
  "6. Laulan karaokea ja nauran paljon lauantaina.", "7. Olen kotona sunnuntaina. Matkustan joskus viikonloppuna.",
];
const translationVocab = [
  ["töissä", "at work / ที่ทำงาน"], ["televisio", "TV / โทรทัศน์"], ["tanssikurssi", "dance class / คอร์สเต้นรำ"],
  ["usein", "often / บ่อยๆ"], ["kesä → kesää", "summer / ฤดูร้อน (partitive)"], ["ruoka → ruokaa", "food / อาหาร (partitive)"],
  ["paljon", "a lot / มาก"], ["karaoke → karaokea", "karaoke (partitive)"], ["kotona", "at home / ที่บ้าน"], ["joskus", "sometimes / บางครั้ง"],
];

const homeworkItems = [
  ["1", "Learn spoken numbers (page 34)", "เรียนรู้ตัวเลขภาษาพูด (หน้า 34)", ""],
  ["2", "Compare written vs spoken kiosk text (page 33)", "เปรียบเทียบภาษาเขียนกับภาษาพูดจากข้อความร้านไอศกรีม", ""],
  ["3", "Arrange dialogues (from materials)", "จัดเรียงบทสนทนา", ""],
  ["4", "Grammar exercises (from materials)", "แบบฝึกหัดไวยากรณ์", ""],
  ["5", "Watch video 17", "ดูวิดีโอ 17", "https://yle.fi/aihe/artikkeli/2016/06/14/finnish-phrases-suomen-kielen-fraaseja"],
  ["6", "Quizlet vocabulary", "ฝึกคำศัพท์ใน Quizlet", "https://quizlet.com/class/27345326/materials"],
  ["7", "Translate text to Finnish (from materials)", "แปลข้อความเป็นภาษาฟินแลนด์", ""],
];

const quiz = [
  // Spoken numbers (6)
  ["ภาษาพูดของ yksi คือ?", ["yks", "yksi", "ykstoista"], "yks", "yksi → yks ตัด -i ออก"],
  ["ภาษาพูดของ kymmenen คือ?", ["kymppi", "kymmentä", "kymmenen"], "kymppi", "kymmenen → kymppi ในภาษาพูด"],
  ["ภาษาพูดของ tuhat คือ?", ["tonni", "tuhat", "satku"], "tonni", "tuhat → tonni ในภาษาพูด"],
  ["ภาษาพูดของ sata คือ?", ["satku", "sata", "tonni"], "satku", "sata → satku ในภาษาพูด"],
  ["ภาษาพูดของ seitsemän คือ?", ["seittemän/seiska", "seitsemän", "seiska/seittemä"], "seittemän/seiska", "seitsemän → seittemän หรือ seiska"],
  ["ภาษาพูดของ kaksikymmentäyksi คือ?", ["kakskytyks", "kakskytyksi", "kakskymmentäyks"], "kakskytyks", "ย่อทุกส่วน: kaksi→kaks, kymmentä→kyt, yksi→yks"],
  // Written vs spoken (5)
  ["ภาษาเขียนของ jätski คือ?", ["jäätelö", "jätskö", "jäätelä"], "jäätelö", "jätski = jäätelö (ไอศกรีม) ภาษาพูด"],
  ["ภาษาเขียนของ mä คือ?", ["minä", "sinä", "hän"], "minä", "mä = minä ในภาษาพูด"],
  ["ภาษาเขียนของ nää คือ?", ["nämä", "ne", "nuo"], "nämä", "nää = nämä (พวกนี้)"],
  ["Tuleeks เป็นภาษาพูดของ?", ["Tuleeko", "Tuletko", "Tuletteko"], "Tuleeko", "Tuleeko → Tuleeks (-ko → -ks)"],
  ["ภาษาเขียนของ sulle คือ?", ["sinulle", "hänelle", "meille"], "sinulle", "sulle = sinulle (สำหรับคุณ)"],
  // Negative sentences (5)
  ["กริยาปฏิเสธของ me คือ?", ["emme", "ette", "eivät"], "emme", "me + emme + verb stem"],
  ["ประโยคปฏิเสธ: Elina ___ espanjaa.", ["ei puhu", "ei puhuu", "eivät puhu"], "ei puhu", "hän → ei + puhu (stem ไม่ใช่ puhuu)"],
  ["ประโยคปฏิเสธ: Te ___ puistossa.", ["ette istu", "ei istu", "emme istu"], "ette istu", "te → ette + verb stem"],
  ["ประโยคปฏิเสธ: Giuseppe ja Manuela ___ jäätelöä.", ["eivät osta", "ei osta", "emme osta"], "eivät osta", "he → eivät + osta"],
  ["ประโยคปฏิเสธ: Sinä ___ venäläinen.", ["et ole", "ei ole", "en ole"], "et ole", "sinä → et + ole"],
  // Verb conjugation (6)
  ["hän + asua = ?", ["asuu", "asut", "asuvat"], "asuu", "hän ยืดสระท้าย: asu → asuu"],
  ["te + säästää = ?", ["säästätte", "säästämme", "säästävät"], "säästätte", "te + -tte: säästätte"],
  ["he + istua = ?", ["istuvat", "istutte", "istumme"], "istuvat", "he + -vat: istuvat"],
  ["minä + etsiä = ?", ["etsin", "etsit", "etsii"], "etsin", "minä + -n: etsin"],
  ["me + laulaa = ?", ["laulamme", "laulatte", "laulavat"], "laulamme", "me + -mme: laulamme"],
  ["hän + tanssia = ?", ["tanssii", "tanssin", "tanssivat"], "tanssii", "hän ยืดสระท้าย: tanssi → tanssii"],
  // Dialogue vocab (4)
  ["kinkkupizza แปลว่า?", ["พิซซ่าแฮม", "พิซซ่าซาลามิ", "พิซซ่าผัก"], "พิซซ่าแฮม", "kinkku = แฮม (ham)"],
  ["Haluaisin แปลว่า?", ["อยากได้ / I would like", "ฉันรัก", "ฉันมี"], "อยากได้ / I would like", "Haluaisin = I would like (สุภาพ)"],
  ["käteisellä vai kortilla? แปลว่า?", ["เงินสดหรือบัตร?", "เดบิตหรือเครดิต?", "จ่ายรวมไหม?"], "เงินสดหรือบัตร?", "käteisellä = ด้วยเงินสด, kortilla = ด้วยบัตร"],
  ["lakritsi แปลว่า?", ["ชะเอมเทศ (licorice)", "ช็อกโกแลต", "วานิลลา"], "ชะเอมเทศ (licorice)", "lakritsi = licorice / ชะเอมเทศ"],
  // Translation content (5)
  ["'ฉันอยู่ที่ทำงานวันจันทร์' คือ?", ["Olen töissä maanantaina.", "Olen työssä maanantai.", "Menen töihin maanantaina."], "Olen töissä maanantaina.", "töissä = at work, maanantaina = on Monday"],
  ["'ฉันดูโทรทัศน์วันอังคาร' คือ?", ["Katson televisiota tiistaina.", "Katsomme televisiota tiistaina.", "Katson televisiota tiistai."], "Katson televisiota tiistaina.", "katson = I watch, televisiota = TV (partitive)"],
  ["'ฉันรักฤดูร้อนมาก' คือ?", ["Rakastan kesää paljon.", "Rakastaa kesä paljon.", "Rakastan kesää vähän."], "Rakastan kesää paljon.", "kesää = summer (partitive), paljon = a lot"],
  ["'ฉันเก็บเงิน' คือ?", ["Minä säästän rahaa.", "Minä ostan rahaa.", "Minä etsin rahaa."], "Minä säästän rahaa.", "säästän = I save, rahaa = money (partitive)"],
  ["'ฉันเดินทางบางครั้งในวันหยุดสุดสัปดาห์' คือ?", ["Matkustan joskus viikonloppuna.", "Matkustan usein viikonloppuna.", "Matkustaa joskus viikonloppuna."], "Matkustan joskus viikonloppuna.", "joskus = sometimes, viikonloppuna = on weekends"],
] as const;

function Finnish({ text, children }: { text: string; children?: ReactNode }) { return <button type="button" className="finnish-speak" onClick={() => ttsService.speak(text)} aria-label={`Listen to ${text}`}>{children ?? text}<Volume2 size={13} /></button>; }
function Grid({ items }: { items: string[] }) { return <div className="lesson3-chip-grid">{items.map(item => <Finnish key={item} text={item} />)}</div>; }
function Table({ headers, rows, audioColumns }: { headers: string[]; rows: string[][]; audioColumns: number[] }) { return <div className="lesson3-table" style={{ "--columns": headers.length } as CSSProperties}><div className="table-head">{headers.map(h => <b key={h}>{h}</b>)}</div>{rows.map((row, i) => <div key={`${row[0]}-${i}`}>{row.map((cell, j) => audioColumns.includes(j) ? <Finnish key={j} text={cell} /> : <span key={j}>{cell}</span>)}</div>)}</div>; }
function Reveal({ label, children }: { label: string; children: ReactNode }) { const [open, setOpen] = useState(false); return <div className="lesson-tip" style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}><b>{open ? "▼" : "▶"} {label}</b>{open && <div style={{ marginTop: 8 }}>{children}</div>}</div>; }

export function LessonFourPage() {
  const [step, setStep] = useState<Step>("start");
  const [completed, setCompleted] = useState<Step[]>(() => { try { return JSON.parse(localStorage.getItem("sisu:lesson4:v1") || "[]"); } catch { return []; } });
  const [index, setIndex] = useState(0), [answer, setAnswer] = useState(""), [score, setScore] = useState(0), [finished, setFinished] = useState(false);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const finish = (id: Step) => { const next = [...new Set([...completed, id])]; setCompleted(next); localStorage.setItem("sisu:lesson4:v1", JSON.stringify(next)); };
  const go = (id: Step) => { finish(step); setStep(id); setRevealed({}); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); };
  const q = quiz[index], progress = Math.round(completed.length / steps.length * 100);
  const title = (kicker: string, heading: string, body: string) => <div className="lesson-title"><div><span className="kicker">{kicker}</span><h2>{heading}</h2><p>{body}</p></div><MessageCircle /></div>;
  const reveal = (i: number) => setRevealed(r => ({ ...r, [i]: !r[i] }));
  return <section className="page lesson-page lesson-three">
    <div className="lesson-hero"><div><span className="kicker">LESSON 4 · KAPPALE 2 JATKUU</span><h1>Puhekieli ja harjoitukset</h1><p>ภาษาพูด ตัวเลข ประโยคปฏิเสธ การผันกริยา และบทสนทนา</p></div><div className="lesson-progress"><b>{progress}%</b><span>complete</span><i><em style={{ width: `${progress}%` }} /></i></div></div>
    <div className="lesson-tabs" role="tablist">{steps.map((s, i) => <button role="tab" aria-selected={step === s.id} className={step === s.id ? "active" : completed.includes(s.id) ? "done" : ""} onClick={() => setStep(s.id)} key={s.id}><span>{completed.includes(s.id) ? <Check size={14} /> : i + 1}</span>{s.label}</button>)}</div>

    {step === "start" && <div className="lesson-panel intro-panel"><div className="lesson-number">04</div><span className="kicker">SPOKEN FINNISH &amp; PRACTICE</span><h2>ภาษาพูด ไวยากรณ์ และแบบฝึกหัดครบชุด</h2><p>ตัวเลขภาษาพูด · เปรียบเทียบภาษาเขียนกับพูด · ประโยคปฏิเสธ · การผันกริยาใหม่ 14 ตัว · บทสนทนาซื้อของ · แปลไทย-ฟินแลนด์</p><div className="objectives"><div><span>01</span><p><b>ตัวเลขภาษาพูด</b>รู้จักตัวเลขแบบย่อที่คนฟินแลนด์ใช้จริง</p></div><div><span>02</span><p><b>ผันกริยา 30 ประโยค</b>ฝึกกริยาใหม่ทั้งบอกเล่าและปฏิเสธ</p></div><div><span>03</span><p><b>บทสนทนาและแปล</b>สั่งพิซซ่า ซื้อไอศกรีม และแปลเรื่อง Anna</p></div></div><div className="lesson-tip"><b>Test 1 — วันอังคาร 29.09</b><p>เตรียมสอบ Test 1 ทบทวนเนื้อหาจาก Lesson 1-4 ทั้งหมด</p></div><button className="primary lesson-next" onClick={() => go("spoken")}>เริ่มจากตัวเลขภาษาพูด <ChevronRight /></button></div>}

    {step === "spoken" && <div className="lesson-panel">{title("PUHEKIELEN NUMEROT", "ตัวเลขภาษาพูด (sivu 34)", "ตัวเลขในภาษาพูดมักย่อให้สั้นลง คนฟินแลนด์ใช้ในชีวิตประจำวัน")}
      <Table headers={["ภาษาเขียน", "ภาษาพูด", "ตัวเลข"]} rows={spokenNumbers} audioColumns={[0, 1]} />
      <div className="lesson-tip"><b>หลักการย่อ</b><p>ตัดสระหรือพยัญชนะท้าย (yksi→yks, viisi→viis) หรือแทนด้วยคำเรียกทั่วไป (kymmenen→kymppi, sata→satku, tuhat→tonni)</p></div>

      <h3>Jätskikiskalla — เปรียบเทียบภาษาเขียนกับภาษาพูด</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div><h4>ภาษาเขียน (Kirjakieli)</h4>{writtenDialogue.map(([who, line], i) => <div key={`w${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
        <div><h4>ภาษาพูด (Puhekieli)</h4>{spokenDialogue.map(([who, line], i) => <div key={`s${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
      </div>

      <h3>ความแตกต่างสำคัญ</h3>
      <div className="lesson3-table" style={{ "--columns": 2 } as CSSProperties}><div className="table-head"><b>ภาษาเขียน</b><b>ภาษาพูด</b></div>{spokenDiffs.map(([w, s], i) => <div key={i}><Finnish text={w} /><Finnish text={s} /></div>)}</div>
      <button className="primary lesson-next" onClick={() => go("harjoitus")}>ต่อไป: แบบฝึกหัดจากหนังสือ <ChevronRight /></button></div>}

    {step === "harjoitus" && <div className="lesson-panel">{title("HARJOITUKSET", "แบบฝึกหัดจากหนังสือ", "Harjoitus 12 (sivu 45) เติมกริยา และ Harjoitus 14 (sivu 46) ประโยคปฏิเสธ")}
      <h3>Harjoitus 12, sivu 45 — เติมกริยาที่ถูกต้อง</h3>
      {harjoitus12.map(([sentence, hint, ans], i) => <div key={`h12-${i}`} style={{ marginBottom: 8 }}>
        <p><b>{i + 1}.</b> {sentence} <span style={{ color: "#888" }}>({hint})</span></p>
        <button type="button" className={`finnish-speak ${revealed[i] ? "" : ""}`} onClick={() => reveal(i)} style={{ cursor: "pointer" }}>{revealed[i] ? <><b style={{ color: "var(--color-success)" }}>{ans}</b></> : "แสดงคำตอบ"}</button>
      </div>)}

      <h3 style={{ marginTop: 32 }}>Harjoitus 14, sivu 46 — เปลี่ยนเป็นประโยคปฏิเสธ</h3>
      {harjoitus14.map(([pos, neg], i) => <div key={`h14-${i}`} style={{ marginBottom: 8 }}>
        <p><b>{i + 1}.</b> <Finnish text={pos} /></p>
        <button type="button" className="finnish-speak" onClick={() => reveal(100 + i)} style={{ cursor: "pointer" }}>{revealed[100 + i] ? <><b style={{ color: "var(--color-success)" }}>→ </b><Finnish text={neg} /></> : "แสดงคำตอบ"}</button>
      </div>)}
      <button className="primary lesson-next" onClick={() => go("negative")}>ต่อไป: กฎประโยคปฏิเสธ <ChevronRight /></button></div>}

    {step === "negative" && <div className="lesson-panel">{title("NEGATIIVINEN LAUSE", "ประโยคปฏิเสธ — Grammar Exercises", "Subject + negative verb (en/et/ei/emme/ette/eivät) + verb stem")}
      <div className="formula"><b>Subject</b><span>+</span><b>en / et / ei / emme / ette / eivät</b><span>+</span><b>verb stem</b></div>
      <Table headers={["ประธาน", "กริยาปฏิเสธ", "ตัวอย่าง"]} rows={negativeRule} audioColumns={[0, 2]} />
      <div className="lesson-tip"><b>กฎสำคัญ</b><p>กริยาหลักในประโยคปฏิเสธใช้รูป stem เท่านั้น: <strong>en puhu</strong> (ไม่ใช่ en puhun), <strong>ei asu</strong> (ไม่ใช่ ei asuu)</p></div>

      <h3>Harjoitus 1 — ฝึกเปลี่ยนเป็นปฏิเสธ</h3>
      {harjoitus14.map(([pos, neg], i) => <div key={`neg-${i}`} style={{ marginBottom: 8 }}>
        <p><b>{i + 1}.</b> <Finnish text={pos} /></p>
        <button type="button" className="finnish-speak" onClick={() => reveal(200 + i)} style={{ cursor: "pointer" }}>{revealed[200 + i] ? <><b style={{ color: "var(--color-success)" }}>→ </b><Finnish text={neg} /></> : "แสดงคำตอบ"}</button>
      </div>)}
      <button className="primary lesson-next" onClick={() => go("conjugation")}>ต่อไป: ผันกริยา 30 ประโยค <ChevronRight /></button></div>}

    {step === "conjugation" && <div className="lesson-panel">{title("VERBIN TAIVUTUS", "การผันกริยา — 14 กริยาใหม่", "ฝึก 30 ประโยคครอบคลุมทุกกริยาที่เรียนในบทนี้")}
      <h3>กริยาใหม่ทั้งหมด</h3>
      <div className="lesson3-table" style={{ "--columns": 3 } as CSSProperties}><div className="table-head"><b>กริยา</b><b>ความหมาย</b><b>การผัน</b></div>{newVerbs.map(([verb, meaning, forms], i) => <div key={i}><Finnish text={verb} /><span>{meaning}</span><span style={{ fontSize: "0.85em" }}>{forms}</span></div>)}</div>

      <h3 style={{ marginTop: 24 }}>30 ประโยคฝึกผันกริยา</h3>
      {conjugation30.map(([sentence, verb], i) => <div key={`c-${i}`} style={{ marginBottom: 6 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <b>{i + 1}.</b>
          <span style={{ color: "#888" }}>({verb})</span>
          <button type="button" className="finnish-speak" onClick={() => reveal(300 + i)} style={{ cursor: "pointer" }}>{revealed[300 + i] ? <Finnish text={sentence} /> : "แสดงคำตอบ"}</button>
        </span>
      </div>)}
      <div className="lesson-tip"><b>เคล็ดลับ</b><p>หาประธาน → เลือก suffix → ถ้าปฏิเสธใช้ en/et/ei/emme/ette/eivät + stem</p></div>
      <button className="primary lesson-next" onClick={() => go("dialogues")}>ต่อไป: บทสนทนา <ChevronRight /></button></div>}

    {step === "dialogues" && <div className="lesson-panel">{title("DIALOGIT", "บทสนทนาซื้อของ", "ฝึกบทสนทนาจริง: สั่งพิซซ่าและซื้อไอศกรีม")}
      <h3>Dialogue 1 — Pizza ordering (Harjoitus 4)</h3>
      <div className="intro-people">{pizzaDialogue.map(([who, line], i) => <div key={`p-${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
      <div className="lesson-tip"><b>คำศัพท์ Pizza</b><p><b>salamipizza</b> = ซาลามิพิซซ่า · <b>kinkkupizza</b> = พิซซ่าแฮม · <b>Haluaisin</b> = อยากได้ · <b>Tuleeko muuta?</b> = รับอย่างอื่นอีกไหม</p></div>

      <h3 style={{ marginTop: 24 }}>Dialogue 2 — Ice cream kiosk (Harjoitus 19)</h3>
      <div className="intro-people">{iceCreamDialogue.map(([who, line], i) => <div key={`ic-${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
      <div className="lesson-tip"><b>คำศัพท์ Jätskikiski</b><p><b>lakritsi</b> = ชะเอมเทศ · <b>kahvi</b> = กาแฟ · <b>käteisellä</b> = ด้วยเงินสด · <b>käteisellä vai kortilla?</b> = เงินสดหรือบัตร?</p></div>

      <h3 style={{ marginTop: 24 }}>คำศัพท์จากบทสนทนา</h3>
      <Table headers={["คำศัพท์", "ความหมาย"]} rows={dialogueVocab} audioColumns={[0]} />
      <button className="primary lesson-next" onClick={() => go("translation")}>ต่อไป: แปลเป็นฟินแลนด์ <ChevronRight /></button></div>}

    {step === "translation" && <div className="lesson-panel">{title("KÄÄNNÖS", "แปลภาษาอังกฤษเป็นฟินแลนด์", "อ่านข้อความภาษาอังกฤษ ลองแปลเอง แล้วเปิดดูเฉลย")}
      <div style={{ background: "var(--color-surface)", padding: 16, borderRadius: 12, whiteSpace: "pre-line", marginBottom: 16 }}>{translationEn}</div>

      <Reveal label="เปิดดูคำแปลภาษาฟินแลนด์">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{translationFi.map((line, i) => <Finnish key={i} text={line} />)}</div>
      </Reveal>

      <h3 style={{ marginTop: 24 }}>คำศัพท์ใหม่จากบทแปล</h3>
      <Table headers={["คำศัพท์", "ความหมาย"]} rows={translationVocab} audioColumns={[0]} />
      <button className="primary lesson-next" onClick={() => go("homework")}>ต่อไป: การบ้าน <ChevronRight /></button></div>}

    {step === "homework" && <div className="lesson-panel">{title("KOTITEHTÄVÄ", "การบ้าน Lesson 4", "ทำให้ครบทุกข้อก่อนสอบ Test 1")}
      <div className="lesson-tip"><b>Test 1 — วันอังคาร 29.09</b><p>เตรียมตัวสอบ ทบทวนเนื้อหาจาก Lesson 1-4 ทั้งหมด</p></div>

      {/* 1. Spoken numbers */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>1.</b> Learn spoken numbers (page 34)</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>เรียนรู้ตัวเลขภาษาพูด (หน้า 34)</p>
        <Reveal label="ดูตัวเลขภาษาพูดทั้งหมด">
          <Table headers={["ภาษาเขียน", "ภาษาพูด", "ตัวเลข"]} rows={spokenNumbers} audioColumns={[0, 1]} />
        </Reveal>
      </div>

      {/* 2. Written vs spoken kiosk text */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>2.</b> Compare written vs spoken kiosk text (page 33)</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>เปรียบเทียบภาษาเขียนกับภาษาพูดจากข้อความร้านไอศกรีม</p>
        <Reveal label="ดูบทสนทนาภาษาเขียน (Kirjakieli)">
          <div>{writtenDialogue.map(([who, line], i) => <div key={`hw-w${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
        </Reveal>
        <Reveal label="ดูบทสนทนาภาษาพูด (Puhekieli)">
          <div>{spokenDialogue.map(([who, line], i) => <div key={`hw-s${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
        </Reveal>
        <Reveal label="ดูความแตกต่างสำคัญ">
          <div className="lesson3-table" style={{ "--columns": 2 } as CSSProperties}><div className="table-head"><b>ภาษาเขียน</b><b>ภาษาพูด</b></div>{spokenDiffs.map(([w, s], i) => <div key={i}><Finnish text={w} /><Finnish text={s} /></div>)}</div>
        </Reveal>
      </div>

      {/* 3. Arrange dialogues */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>3.</b> Arrange dialogues (from materials)</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>จัดเรียงบทสนทนา</p>
        <Reveal label="ดูคำตอบ: Pizza dialogue">
          <div>{pizzaDialogue.map(([who, line], i) => <div key={`hw-p${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
        </Reveal>
        <Reveal label="ดูคำตอบ: Ice cream kiosk dialogue">
          <div>{iceCreamDialogue.map(([who, line], i) => <div key={`hw-ic${i}`} style={{ marginBottom: 4 }}><b>{who}:</b> <Finnish text={line} /></div>)}</div>
        </Reveal>
      </div>

      {/* 4. Grammar exercises */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>4.</b> Grammar exercises (from materials)</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>แบบฝึกหัดไวยากรณ์</p>
        <Reveal label="ดูคำตอบ: Harjoitus 12 — เติมกริยา">
          <div>{harjoitus12.map(([sentence, hint, ans], i) => <div key={`hw-h12-${i}`} style={{ marginBottom: 6 }}><b>{i + 1}.</b> {sentence} <span style={{ color: "#888" }}>({hint})</span> <b style={{ color: "var(--color-success)" }}>→ {ans}</b></div>)}</div>
        </Reveal>
        <Reveal label="ดูคำตอบ: Harjoitus 14 — ประโยคปฏิเสธ">
          <div>{harjoitus14.map(([pos, neg], i) => <div key={`hw-h14-${i}`} style={{ marginBottom: 6 }}><b>{i + 1}.</b> <Finnish text={pos} /> <b style={{ color: "var(--color-success)" }}>→</b> <Finnish text={neg} /></div>)}</div>
        </Reveal>
      </div>

      {/* 5. Watch video 17 */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>5.</b> Watch video 17</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>ดูวิดีโอ 17</p>
        <a href="https://yle.fi/aihe/artikkeli/2016/06/14/finnish-phrases-suomen-kielen-fraaseja" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontSize: "0.9em" }}>yle.fi — Finnish phrases</a>
      </div>

      {/* 6. Quizlet */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>6.</b> Quizlet vocabulary</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>ฝึกคำศัพท์ใน Quizlet</p>
        <a href="https://quizlet.com/class/27345326/materials" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontSize: "0.9em" }}>quizlet.com — Class materials</a>
      </div>

      {/* 7. Translation */}
      <div style={{ marginBottom: 24, padding: 16, background: "var(--color-surface)", borderRadius: 12 }}>
        <p><b>7.</b> Translate text to Finnish (from materials)</p>
        <p style={{ color: "#888", fontSize: "0.9em" }}>แปลข้อความเป็นภาษาฟินแลนด์</p>
        <Reveal label="ดูข้อความภาษาอังกฤษ">
          <div style={{ whiteSpace: "pre-line", marginBottom: 8 }}>{translationEn}</div>
        </Reveal>
        <Reveal label="ดูคำตอบ: คำแปลภาษาฟินแลนด์">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{translationFi.map((line, i) => <Finnish key={i} text={line} />)}</div>
        </Reveal>
        <Reveal label="ดูคำศัพท์ใหม่จากบทแปล">
          <Table headers={["คำศัพท์", "ความหมาย"]} rows={translationVocab} audioColumns={[0]} />
        </Reveal>
      </div>

      <button className="primary lesson-next" onClick={() => go("check")}>ทำแบบทดสอบ {quiz.length} ข้อ <ChevronRight /></button></div>}

    {step === "check" && <div className="lesson-panel quiz-panel"><span className="kicker">KNOWLEDGE CHECK</span><h2>ทบทวน Lesson 4</h2>{finished ? <div className="lesson-result"><span>✓</span><div><p>จบบทเรียนแล้ว</p><b>{score} / {quiz.length}</b><p>{score >= Math.round(quiz.length * 0.8) ? "Hienoa! พร้อมสอบ Test 1" : "Hyvä yritys! กลับไปทบทวนจุดที่ยังสับสนได้"}</p></div></div> : <><p>คำถาม {index + 1} จาก {quiz.length}</p><h3>{q[0]}</h3><div className="lesson-answers">{q[1].map(choice => <button key={choice} disabled={!!answer} className={answer ? choice === q[2] ? "correct" : choice === answer ? "wrong" : "" : ""} onClick={() => { setAnswer(choice); if (choice === q[2]) setScore(s => s + 1); }}>{choice}</button>)}</div>{answer && <><div className="lesson-tip"><b>{answer === q[2] ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{q[3]}</p></div><button className="primary lesson-next" onClick={() => { if (index === quiz.length - 1) { setFinished(true); finish("check"); } else { setIndex(i => i + 1); setAnswer(""); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } }}>คำถามถัดไป <ChevronRight /></button></>}</>}</div>}
  </section>;
}
