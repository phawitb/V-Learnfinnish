import { CSSProperties, ReactNode, useState } from "react";
import { Check, ChevronRight, MessageCircle, Volume2 } from "lucide-react";
import { ttsService } from "../services/ttsService";

type Step = "start" | "texts" | "phrases" | "days" | "numbers" | "pronouns" | "harmony" | "verbs" | "questions" | "check";

const steps: { id: Step; label: string }[] = [
  { id: "start", label: "Start" }, { id: "texts", label: "Texts" }, { id: "phrases", label: "Phrases" },
  { id: "days", label: "Days" }, { id: "numbers", label: "Numbers" }, { id: "pronouns", label: "Pronouns" },
  { id: "harmony", label: "Harmony" }, { id: "verbs", label: "Verbs" }, { id: "questions", label: "Questions" },
  { id: "check", label: "Check" },
];

const text11 = [
  ["Alex", "Anteeksi, onko täällä suomen kurssi?", "ขอโทษครับ ที่นี่มีคอร์สภาษาฟินแลนด์ใช่ไหม"],
  ["Olga", "Joo, on. Tämä on Suomi 1.", "ใช่ค่ะ นี่คือคอร์ส Finnish 1"],
  ["Alex", "Hyvä. Onko tämä paikka vapaa?", "ดีเลย ที่นั่งนี้ว่างไหม"], ["Olga", "On.", "ว่างค่ะ"],
  ["Alex", "Kiva. Hei, minä olen Alex. Kuka sinä olet?", "เยี่ยม สวัสดี ผมชื่อ Alex คุณคือใคร"],
  ["Olga", "Minä olen Olga. Hauska tutustua!", "ฉันชื่อ Olga ยินดีที่ได้รู้จัก"], ["Alex", "Kiitos samoin!", "ขอบคุณ เช่นกันครับ"],
  ["Pedro", "Moi Olga! Mitä kuuluu?", "สวัสดี Olga สบายดีไหม"],
  ["Olga", "Terve Pedro! Kiitos, minulle kuuluu hyvää. Entä sinulle?", "สวัสดี Pedro ขอบคุณ ฉันสบายดี แล้วคุณล่ะ"],
  ["Pedro", "Ihan hyvää, kiitos.", "ค่อนข้างสบายดี ขอบคุณ"], ["Olga", "Alex, tässä on Pedro.", "Alex นี่คือ Pedro"],
  ["Alex", "Hei Pedro. Minun nimi on Alex. Hauska tutustua!", "สวัสดี Pedro ผมชื่อ Alex ยินดีที่ได้รู้จัก"],
  ["Pedro", "Hauska tutustua!", "ยินดีที่ได้รู้จัก"],
  ["Opettaja", "Hei ja tervetuloa suomen kurssille! Tämä kurssi on Suomi 1 ja minä olen opettaja. Minun nimi on Päivi Koskela.", "สวัสดีและยินดีต้อนรับสู่คอร์สภาษาฟินแลนด์ คอร์สนี้คือ Finnish 1 และฉันเป็นครู ฉันชื่อ Päivi Koskela"],
  ["Alex", "Anteeksi, miten se kirjoitetaan?", "ขอโทษครับ สะกดอย่างไร"],
  ["Opettaja", "Minun etunimi kirjoitetaan P-Ä-I-V-I ja sukunimi K-O-S-K-E-L-A.", "ชื่อของฉันสะกด P-Ä-I-V-I และนามสกุล K-O-S-K-E-L-A"],
  ["Alex", "Okei, kiitos.", "โอเค ขอบคุณ"],
  ["Opettaja", "Kurssipäivät ovat maanantai, keskiviikko ja torstai. Kurssi on kello 18–20.", "วันเรียนคือวันจันทร์ พุธ และพฤหัสบดี เรียนเวลา 18–20 น."],
];

const text29 = [
  ["Kertoja", "Kurssi loppuu kello 20. Muut opiskelijat menevät kotiin, mutta Alex, Olga ja Pedro menevät kioskille.", "คอร์สเลิกสองทุ่ม นักเรียนคนอื่นกลับบ้าน แต่ Alex, Olga และ Pedro ไปที่ซุ้มขายของ"],
  ["Kertoja", "Alex ja Pedro ostavat jäätelöä. Jäätelö maksaa 3 euroa. Olga ei osta jäätelöä, koska hän säästää rahaa.", "Alex และ Pedro ซื้อไอศกรีม ราคา 3 ยูโร Olga ไม่ซื้อเพราะเธอเก็บเงิน"],
  ["Kertoja", "Sitten he istuvat puistossa ja puhuvat ja nauravat.", "จากนั้นพวกเขานั่งในสวน พูดคุยและหัวเราะ"],
  ["Olga", "Pedro, minkämaalainen sinä olet?", "Pedro คุณเป็นคนชาติอะไร"], ["Pedro", "Minä olen brasilialainen. Entä sinä?", "ผมเป็นชาวบราซิล แล้วคุณล่ะ"],
  ["Olga", "Minä olen venäläinen. Entä Alex, mistä sinä olet kotoisin?", "ฉันเป็นชาวรัสเซีย แล้ว Alex คุณมาจากไหน"],
  ["Alex", "Minä olen kotoisin Johannesburgista, Etelä-Afrikasta.", "ผมมาจาก Johannesburg ประเทศแอฟริกาใต้"],
  ["Olga", "Ai jaa, mitä kieltä sinä puhut?", "อ๋อ แล้วคุณพูดภาษาอะไร"],
  ["Alex", "Minun äidinkieli on englanti, mutta puhun myös vähän espanjaa. Pedro, onko sinun äidinkieli espanja?", "ภาษาแม่ของผมคืออังกฤษ แต่ผมพูดสเปนได้นิดหน่อย Pedro ภาษาแม่ของคุณคือสเปนใช่ไหม"],
  ["Pedro", "Ei, minä en puhu espanjaa. Brasiliassa me puhumme portugalia.", "ไม่ ผมไม่พูดสเปน ที่บราซิลเราพูดภาษาโปรตุเกส"],
  ["Alex", "Ai niin, totta!", "อ๋อจริงด้วย"],
  ["Kertoja", "Sitten Alex ajaa autolla kotiin. Pedro ja Olga menevät bussipysäkille.", "จากนั้น Alex ขับรถกลับบ้าน ส่วน Pedro และ Olga ไปป้ายรถเมล์"],
  ["Pedro", "Missä sinä asut?", "คุณอาศัยอยู่ที่ไหน"], ["Olga", "Asun Puistolassa. Se on Pohjois-Helsingissä. Menen kotiin bussilla 75.", "ฉันอยู่ Puistola ทางเหนือของ Helsinki ฉันกลับบ้านด้วยรถเมล์สาย 75"],
  ["Pedro", "Minä en asu Helsingissä vaan Espoossa. Menen kotiin ensin bussilla ja sitten metrolla.", "ผมไม่ได้อยู่ Helsinki แต่อยู่ Espoo ผมกลับบ้านด้วยรถเมล์ก่อน แล้วต่อรถไฟใต้ดิน"],
  ["Olga", "Hei, nyt minun bussi tulee! Moi moi, nähdään huomenna!", "รถของฉันมาแล้ว บ๊ายบาย เจอกันพรุ่งนี้"], ["Pedro", "Nähdään, moikka!", "แล้วเจอกัน บ๊ายบาย"],
];

const introductions = [
  ["Pedro", "Minä olen Pedro. Olen brasilialainen. Olen kotoisin São Paulosta Brasiliasta. Puhun portugalia.", "ผมชื่อ Pedro เป็นชาวบราซิล มาจาก São Paulo ประเทศบราซิล และพูดภาษาโปรตุเกส"],
  ["Olga", "Minun nimeni on Olga. Olen venäläinen. Olen kotoisin Pietarista Venäjältä. Puhun venäjää. En puhu englantia.", "ฉันชื่อ Olga เป็นชาวรัสเซีย มาจาก St Petersburg ประเทศรัสเซีย พูดรัสเซีย และไม่พูดอังกฤษ"],
  ["Alex", "Minä olen Alex. Olen eteläafrikkalainen. Olen kotoisin Johannesburgista, Etelä-Afrikasta. Minun äidinkieleni on englanti. Puhun myös vähän espanjaa.", "ผมชื่อ Alex เป็นชาวแอฟริกาใต้ มาจาก Johannesburg ภาษาแม่คืออังกฤษ และพูดสเปนได้นิดหน่อย"],
];
const countries = [
  ["Suomi", "suomalainen", "suomi", "Suomesta", "Puhun suomea."],
  ["Ranska", "ranskalainen", "ranska", "Ranskasta", "Puhun ranskaa."],
  ["Kreikka", "kreikkalainen", "kreikka", "Kreikasta", "Puhun kreikkaa."],
  ["Islanti", "islantilainen", "islanti", "Islannista", "Puhun islantia."],
  ["Egypti", "egyptiläinen", "arabia", "Egyptistä", "Puhun arabiaa."],
  ["Venäjä", "venäläinen", "venäjä", "Venäjältä", "Puhun venäjää."],
  ["Pakistan", "pakistanilainen", "urdu", "Pakistanista", "Puhun urdua."],
  ["Thaimaa", "thaimaalainen", "thai", "Thaimaasta", "Puhun thaita."],
];

const text33 = [
  ["Myyjä", "Hei.", "สวัสดี"], ["Pedro", "Hei. Mitä jätski maksaa?", "สวัสดี ไอศกรีมราคาเท่าไร"],
  ["Myyjä", "Yks pallo maksaa 3 euroo ja kaks palloo 5 euroo.", "หนึ่งลูก 3 ยูโร สองลูก 5 ยูโร"],
  ["Pedro", "Okei. No mä otan sit kaks palloo suklaata.", "โอเค งั้นผมเอาช็อกโกแลตสองลูก"], ["Myyjä", "Okei. Entä sulle?", "โอเค แล้วคุณล่ะ"],
  ["Alex", "Mäkin otan kaks palloo: vaniljaa ja mansikkaa.", "ผมก็เอาสองลูก วานิลลาและสตรอว์เบอร์รี"],
  ["Myyjä", "Selvä. Tuleeks muuta?", "ได้เลย รับอย่างอื่นอีกไหม"], ["Pedro", "Ei kiitos.", "ไม่ครับ ขอบคุณ"],
  ["Myyjä", "Tässä. 10 euroa yhteensä. Tuleeks nää samasta?", "นี่ค่ะ รวม 10 ยูโร จ่ายรวมกันไหม"],
  ["Alex", "Joo tulee. Mä maksan nää. Kortilla, kiitos.", "ครับ ผมจ่ายทั้งหมด จ่ายด้วยบัตรครับ"],
  ["Myyjä", "Kiitos. Tarviitko kuittia?", "ขอบคุณ ต้องการใบเสร็จไหม"], ["Alex", "Ei kiitti.", "ไม่ครับ ขอบคุณ"],
  ["Myyjä", "Selvä.", "ได้ค่ะ"], ["Alex", "Kiitti, moi!", "ขอบคุณ บ๊ายบาย"], ["Myyjä", "Kiitos, moi moi!", "ขอบคุณ บ๊ายบาย"],
];
const kioskVocabulary = [
  ["jätski (puhekieli)", "jäätelö", "ไอศกรีม"], ["kiska (puhekieli)", "kioski", "ซุ้มขายของ"],
  ["pallo", "—", "ลูก / หนึ่งสกู๊ป"], ["ottaa", "otan", "เอา / รับ"], ["suklaa", "suklaata", "ช็อกโกแลต"],
  ["vanilja", "vaniljaa", "วานิลลา"], ["mansikka", "mansikkaa", "สตรอว์เบอร์รี"], ["selvä", "—", "ตกลง / เข้าใจแล้ว"],
  ["yhteensä", "—", "รวมทั้งหมด"], ["samasta", "—", "รวมบิลเดียวกัน / จากกองเดียวกัน"], ["kortti", "kortilla", "บัตร / ด้วยบัตร"],
  ["kuitti", "kuittia", "ใบเสร็จ"], ["muu", "muuta", "สิ่งอื่น"], ["maksaa", "maksaa", "มีราคา / จ่าย"],
];

const phrases = [
  ["Hyvää huomenta! / Huomenta!", "อรุณสวัสดิ์ / หวัดดีตอนเช้า"], ["Hyvää päivää! / Päivää!", "สวัสดีตอนกลางวัน"],
  ["Hyvää iltaa! / Iltaa!", "สวัสดีตอนเย็น"], ["Hyvää yötä! Nuku hyvin!", "ราตรีสวัสดิ์ หลับให้สบายนะ"],
  ["Hei! / Moi! / Terve!", "สวัสดี"], ["Hei hei! / Moi moi! / Moikka! / Heippa!", "บ๊ายบาย"],
  ["Nähdään! / Näkemiin!", "แล้วพบกัน / ลาก่อน"], ["Nähdään huomenna!", "พบกันพรุ่งนี้"],
  ["Hauska tutustua!", "ยินดีที่ได้รู้จัก"], ["Tässä on Tiina.", "นี่คือ Tiina"], ["Kiitos samoin!", "ขอบคุณ เช่นกัน"],
  ["Tervetuloa!", "ยินดีต้อนรับ"], ["Joo. / Kyllä. / Ei.", "ใช่ (กันเอง) / ใช่ / ไม่"],
  ["Ole hyvä!", "เชิญ / นี่ค่ะ / ด้วยความยินดี"], ["Kiitos!", "ขอบคุณ"], ["Ei kestä!", "ไม่เป็นไร ด้วยความยินดี"],
  ["Anteeksi!", "ขอโทษ / ขออนุญาต"], ["Ei se mitään!", "ไม่เป็นไร"], ["Kippis! / Skool!", "ชนแก้ว"],
  ["Hyvää ruokahalua!", "ทานให้อร่อย"], ["Kiitos ruoasta!", "ขอบคุณสำหรับอาหาร"], ["Kiitos, oli hyvää.", "ขอบคุณ อร่อยมาก"],
];

const days = [["maanantai", "ma", "maanantaina", "วันจันทร์"], ["tiistai", "ti", "tiistaina", "วันอังคาร"], ["keskiviikko", "ke", "keskiviikkona", "วันพุธ"], ["torstai", "to", "torstaina", "วันพฤหัสบดี"], ["perjantai", "pe", "perjantaina", "วันศุกร์"], ["lauantai", "la", "lauantaina", "วันเสาร์"], ["sunnuntai", "su", "sunnuntaina", "วันอาทิตย์"], ["viikonloppu", "la ja su", "viikonloppuna", "สุดสัปดาห์"]];
const timeline = [["toissapäivänä", "เมื่อวานซืน"], ["eilen", "เมื่อวาน"], ["tänään", "วันนี้"], ["huomenna", "พรุ่งนี้"], ["ylihuomenna", "มะรืน"]];
const numbers = [
  ["0", "nolla"], ["1", "yksi"], ["2", "kaksi"], ["3", "kolme"], ["4", "neljä"], ["5", "viisi"], ["6", "kuusi"], ["7", "seitsemän"], ["8", "kahdeksan"], ["9", "yhdeksän"], ["10", "kymmenen"],
  ["11", "yksitoista"], ["12", "kaksitoista"], ["13", "kolmetoista"], ["14", "neljätoista"], ["15", "viisitoista"], ["16", "kuusitoista"], ["17", "seitsemäntoista"], ["18", "kahdeksantoista"], ["19", "yhdeksäntoista"], ["20", "kaksikymmentä"],
  ["21", "kaksikymmentäyksi"], ["22", "kaksikymmentäkaksi"], ["23", "kaksikymmentäkolme"], ["30", "kolmekymmentä"], ["40", "neljäkymmentä"], ["50", "viisikymmentä"], ["60", "kuusikymmentä"], ["70", "seitsemänkymmentä"], ["80", "kahdeksankymmentä"], ["90", "yhdeksänkymmentä"],
  ["100", "sata"], ["101", "satayksi"], ["200", "kaksisataa"], ["300", "kolmesataa"], ["1 000", "tuhat"], ["2 000", "kaksituhatta"], ["500 000", "viisisataatuhatta"], ["1 000 000", "miljoona"], ["2 000 000", "kaksi miljoonaa"], ["1 000 000 000", "miljardi"], ["5 000 000 000", "viisi miljardia"],
];
const olla = [["minä", "olen", "mä oon", "ฉัน"], ["sinä", "olet", "sä oot", "คุณ"], ["hän / se", "on", "se on", "เขา/เธอ"], ["me", "olemme", "me ollaan", "พวกเรา"], ["te", "olette", "te ootte", "พวกคุณ"], ["he / ne", "ovat", "ne on", "พวกเขา"]];
const conjugation = [["minä", "puhun", "kysyn", "-n"], ["sinä", "puhut", "kysyt", "-t"], ["hän / se", "puhuu", "kysyy", "ยืดสระท้าย"], ["me", "puhumme", "kysymme", "-mme"], ["te", "puhutte", "kysytte", "-tte"], ["he / ne", "puhuvat", "kysyvät", "-vat/-vät"], ["Te (สุภาพ)", "puhutte", "kysytte", "-tte"]];
const negatives = [["minä", "en", "en puhu", "mä en puhu"], ["sinä", "et", "et puhu", "sä et puhu"], ["hän", "ei", "ei puhu", "se ei puhu"], ["me", "emme", "emme puhu", "me ei puhuta"], ["te", "ette", "ette puhu", "te ette puhu"], ["he", "eivät", "eivät puhu", "ne ei puhu"]];
const questionWords = [["kuka", "ใคร", "Kuka sinä olet?", "Minä olen Olga."], ["mikä", "อะไร (ใช้กับ olla)", "Mikä päivä tänään on?", "Tänään on maanantai."], ["mitä", "อะไร (กริยาอื่น)", "Mitä kieltä sinä puhut?", "Minä puhun italiaa."], ["milloin", "เมื่อไร", "Milloin kurssi on?", "Kurssi on maanantaina."], ["minkämaalainen", "คนชาติอะไร", "Minkämaalainen Pedro on?", "Hän on brasilialainen."], ["missä", "ที่ไหน", "Missä te asutte?", "Me asumme Suomessa."], ["mistä", "จากไหน", "Mistä sinä olet kotoisin?", "Olen kotoisin Brasiliasta."], ["mihin", "ไปที่ไหน", "Mihin sinä menet?", "Minä menen kotiin."], ["miksi", "ทำไม", "Miksi et osta jäätelöä?", "Koska minä säästän rahaa."], ["kuinka", "อย่างไร/เท่าไร", "Kuinka vanha sinä olet?", "Minä olen 23 vuotta vanha."]];
const quiz = [
  ["‘ที่นี่มีคอร์สภาษาฟินแลนด์ใช่ไหม’ คือข้อใด", ["Onko täällä suomen kurssi?", "Missä suomen kurssi on?", "Mikä suomen kurssi?"], "Onko täällä suomen kurssi?", "คำถาม yes/no เติม -ko ที่กริยา on → onko"],
  ["‘ในวันพุธ’ ใช้รูปใด", ["keskiviikko", "keskiviikkona", "keskiviikossa"], "keskiviikkona", "วันในความหมายว่า ‘ในวัน…’ ใช้ -na/-nä"],
  ["23 เขียนอย่างไร", ["kaksitoistakolme", "kaksikymmentäkolme", "kolmekymmentäkaksi"], "kaksikymmentäkolme", "20 + 3 ต่อกันเป็น yksiคำ"],
  ["รูปภาษาพูดของ me olemme", ["me ootte", "me ollaan", "ne on"], "me ollaan", "ภาษาพูดใช้ me ollaan"],
  ["คำมีเฉพาะ i/e เช่น kieli เลือกคำลงท้ายฝั่งใด", ["ä/ö/y", "a/o/u", "ใช้ไม่ได้"], "ä/ö/y", "สระกลาง i/e ไม่กำหนดฝั่ง จึงใช้ suffix ฝั่งสระหน้า"],
  ["he + kysyä", ["kysyvät", "kysymme", "kysytte"], "kysyvät", "he ใช้ -vat/-vät และ kysyä มีสระหน้า จึงเป็น -vät"],
  ["ปฏิเสธ me + puhua", ["emme puhu", "ei puhu", "ette puhu"], "emme puhu", "กริยาปฏิเสธของ me คือ emme และกริยาหลักเป็น puhu"],
  ["เปลี่ยน Sinä olet suomalainen. เป็นคำถาม", ["Oletko sinä suomalainen?", "Oletkö sinä suomalainen?", "Onko sinä suomalainen?"], "Oletko sinä suomalainen?", "ย้ายกริยาไว้หน้าและเติม -ko ตาม vowel harmony"],
  ["ถาม ‘จากที่ไหน’", ["missä", "mistä", "mihin"], "mistä", "missä=ที่ไหน, mistä=จากไหน, mihin=ไปไหน"],
  ["ตอบปฏิเสธ Puhutteko englantia?", ["Ette.", "Emme.", "Eivät."], "Emme.", "ผู้ตอบคือ me จึงตอบ Emme."],
] as const;

function Finnish({ text, children }: { text: string; children?: ReactNode }) { return <button type="button" className="finnish-speak" onClick={() => ttsService.speak(text)} aria-label={`Listen to ${text}`}>{children ?? text}<Volume2 size={13} /></button>; }
function Table({ headers, rows, audio = [] }: { headers: string[]; rows: string[][]; audio?: number[] }) { return <div className="lesson3-table" style={{ "--columns": headers.length } as CSSProperties}><div className="table-head">{headers.map(h => <b key={h}>{h}</b>)}</div>{rows.map((row, i) => <div key={`${row[0]}-${i}`}>{row.map((cell, j) => audio.includes(j) ? <Finnish key={j} text={cell} /> : <span key={j}>{cell}</span>)}</div>)}</div>; }
function Dialog({ title, page, rows }: { title: string; page: string; rows: string[][] }) { return <section className="test1-dialog"><div><span className="page-badge">หน้าหนังสือ {page}</span><h3>{title}</h3></div>{rows.map(([speaker, fi, th], i) => <article key={`${speaker}-${i}`}><b>{speaker}</b><div><Finnish text={fi} /><p>{th}</p></div></article>)}</section>; }

export function TestOnePage() {
  const [step, setStep] = useState<Step>("start");
  const [completed, setCompleted] = useState<Step[]>(() => { try { return JSON.parse(localStorage.getItem("sisu:test1:v1") || "[]"); } catch { return []; } });
  const [index, setIndex] = useState(0), [answer, setAnswer] = useState(""), [score, setScore] = useState(0), [finished, setFinished] = useState(false);
  const finish = (id: Step) => { const next = [...new Set([...completed, id])]; setCompleted(next); localStorage.setItem("sisu:test1:v1", JSON.stringify(next)); };
  const go = (id: Step) => { finish(step); setStep(id); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); };
  const progress = Math.round(completed.length / steps.length * 100), q = quiz[index];
  const title = (source: string, heading: string, body: string) => <div className="lesson-title"><div><span className="kicker">{source}</span><h2>{heading}</h2><p>{body}</p></div><MessageCircle /></div>;
  return <section className="page lesson-page test-one">
    <div className="lesson-hero"><div><span className="kicker">TEST 1 · COMPLETE REVIEW</span><h1>Test 1 · Kertaus</h1><p>ทบทวนครบทุกข้อความ คำศัพท์ และไวยากรณ์ที่กำหนดสอบ</p></div><div className="lesson-progress"><b>{progress}%</b><span>complete</span><i><em style={{ width: `${progress}%` }} /></i></div></div>
    <div className="lesson-tabs" role="tablist">{steps.map((s, i) => <button role="tab" aria-selected={step === s.id} className={step === s.id ? "active" : completed.includes(s.id) ? "done" : ""} onClick={() => setStep(s.id)} key={s.id}><span>{completed.includes(s.id) ? <Check size={14} /> : i + 1}</span>{s.label}</button>)}</div>
    {step === "start" && <div className="lesson-panel intro-panel"><div className="lesson-number">T1</div><span className="kicker">EXAM MAP</span><h2>เนื้อหาสอบ Test 1 ทั้งหมด</h2><p>อ้างอิงเลขหน้าที่พิมพ์ในหนังสือ: หน้าหนังสือ 11–17, 29, 31, 33 และ 37–39 (ตรงกับ PDF หน้า 10–16, 28, 30, 32 และ 36–38)</p><div className="objectives"><div><span>01</span><p><b>อ่านและเข้าใจ</b>บทสนทนา 4 หน้าและวลีทุกสถานการณ์</p></div><div><span>02</span><p><b>สร้างคำและประโยค</b>วัน ตัวเลข olla vowel harmony และการผันกริยา</p></div><div><span>03</span><p><b>ถามและตอบ</b>คำถาม yes/no, question words และคำตอบสั้น</p></div></div><div className="lesson-tip"><b>วิธีใช้บทนี้</b><p>กดข้อความฟินแลนด์เพื่อฟังเสียง อ่านคำแปล แล้วปิดคำแปลลองพูดเอง เมื่อจบแต่ละหมวดกดปุ่มถัดไปเพื่อบันทึกความคืบหน้า</p></div><button className="primary lesson-next" onClick={() => go("texts")}>เริ่มจากบทอ่าน <ChevronRight /></button></div>}
    {step === "texts" && <div className="lesson-panel">{title("BOOK PAGES 11 · 29 · 31 · 33", "บทอ่านที่ต้องรู้", "อ่านทุกบรรทัดและสังเกตรูปคำจริง โดยหน้า 33 เป็นภาษาพูด")}
      <Dialog title="Hei ja tervetuloa!" page="11" rows={text11} /><Dialog title="Minkämaalainen sinä olet?" page="29" rows={text29} />
      <Dialog title="แนะนำตัว: ประเทศ สัญชาติ ภาษา" page="31" rows={introductions} />
      <h3>หน้า 31 · Maa, kansalaisuus ja kieli</h3><Table headers={["ประเทศ", "สัญชาติ", "ภาษา", "มาจาก…", "พูดภาษา…"]} rows={countries} audio={[0, 1, 2, 3, 4]} />
      <div className="answer-pairs"><article><b>olla kotoisin + -sta/-stä</b><Finnish text="Olen kotoisin Suomesta." /><p>ใช้บอกว่ามาจากที่ใด; Venäjä เป็นข้อยกเว้นที่ใช้ Venäjältä</p></article><article><b>สัญชาติ + -lainen/-läinen</b><Finnish text="Olen thaimaalainen." /><p>ชื่อประเทศตัวใหญ่ แต่คำสัญชาติใช้ตัวเล็ก</p></article><article><b>puhua + a/ä (partitive)</b><Finnish text="Puhun urdua." /><p>ชื่อภาษาหลัง puhua ใช้ partitive: suomea, ranskaa, venäjää, thaita</p></article><article><b>äidinkieli</b><Finnish text="Minun äidinkieleni on thai." /><p>ภาษาแม่; รูปมาตรฐานคือ nimeni / äidinkieleni</p></article></div>
      <Dialog title="Jätskikiskalla" page="33" rows={text33} />
      <h3>หน้า 33 · Sanasto</h3><Table headers={["คำในบท", "รูปที่เกี่ยวข้อง", "ความหมาย"]} rows={kioskVocabulary} audio={[0, 1]} />
      <div className="lesson-tip"><b>ภาษาพูดหน้า 33</b><p>jätski = jäätelö · kiska = kioski · yks = yksi · kaks = kaksi · mä = minä · sit = sitten · sulle = sinulle · mäkin = minäkin · tuleeks = tuleeko · nää = nämä · tarviitko = tarvitsetko · kiitti = kiitos</p></div>
      <h3>ไวยากรณ์ที่ซ่อนอยู่ในบทอ่าน</h3><div className="answer-pairs"><article><b>minulle kuuluu + adverb</b><p>Minulle kuuluu hyvää. = ฉันสบายดี; kysymys คือ Mitä kuuluu?</p></article><article><b>ei … vaan …</b><p>Minä en asu Helsingissä vaan Espoossa. = ฉันไม่ได้อยู่ Helsinki แต่อยู่ Espoo</p></article><article><b>พาหนะ + -lla/-llä</b><p>bussilla, metrolla, autolla = โดยรถเมล์ รถไฟใต้ดิน รถยนต์</p></article><article><b>ภาษาเป็น partitive</b><p>puhua espanjaa / portugalia และ en puhu espanjaa ยังคงใช้ partitive</p></article></div>
      <button className="primary lesson-next" onClick={() => go("phrases")}>ต่อไป: วลี <ChevronRight /></button></div>}
    {step === "phrases" && <div className="lesson-panel">{title("BOOK PAGES 12–13", "Fraasit · วลีสำคัญ", "จำทั้งสถานการณ์และระดับความเป็นทางการ คำสั้นมักใช้กันเอง")}
      <div className="useful-grid">{phrases.map(([fi, th]) => <article key={fi}><Finnish text={fi} /><span>{th}</span></article>)}</div>
      <div className="lesson-tip"><b>คู่ตอบที่ควรจำ</b><p>Hauska tutustua! → Kiitos samoin! · Kiitos! → Ole hyvä! / Ei kestä! · Anteeksi! → Ei se mitään!</p></div><button className="primary lesson-next" onClick={() => go("days")}>ต่อไป: วัน <ChevronRight /></button></div>}
    {step === "days" && <div className="lesson-panel">{title("BOOK PAGE 14", "Viikonpäivät · วันในสัปดาห์", "คำตอบ Mikä päivä tänään on? ใช้รูปพื้นฐาน แต่คำตอบ Milloin? ใช้ -na/-nä")}
      <Table headers={["วัน", "ตัวย่อ", "เมื่อไร / ในวัน…", "ไทย"]} rows={days} audio={[0, 2]} />
      <div className="timeline-grid">{timeline.map(([fi, th]) => <div key={fi}><Finnish text={fi} /><span>{th}</span></div>)}</div>
      <div className="answer-pairs"><article><Finnish text="Mikä päivä tänään on?" /><p>Tänään on maanantai. = วันนี้คือวันจันทร์</p></article><article><Finnish text="Milloin kurssi on?" /><p>Kurssi on maanantaina. = คอร์สเรียนวันจันทร์</p></article></div><button className="primary lesson-next" onClick={() => go("numbers")}>ต่อไป: ตัวเลข <ChevronRight /></button></div>}
    {step === "numbers" && <div className="lesson-panel">{title("BOOK PAGE 15", "Numerot · ตัวเลข", "เลขฟินแลนด์เขียนส่วนประกอบติดกัน ยกเว้นจำนวนที่ใช้ล้านและพันล้าน")}
      <div className="test1-number-grid">{numbers.map(([n, fi]) => <article key={n}><b>{n}</b><Finnish text={fi} /></article>)}</div>
      <div className="lesson-tip"><b>สูตรออกสอบ</b><p>11–19 = เลข + toista · 20, 30… = เลข + kymmentä · 21 = kaksikymmentäyksi · ตั้งแต่ 2 ร้อย/พัน/ล้านใช้รูป partitive เช่น kaksisataa, kaksituhatta, kaksi miljoonaa</p></div><div className="answer-pairs"><article><Finnish text="Kuinka vanha sinä olet?" /><p>ถามอายุ: คุณอายุเท่าไร</p></article><article><Finnish text="Olen 23 vuotta vanha." /><p>ฉันอายุ 23 ปี; vuotta เป็น partitive</p></article></div><button className="primary lesson-next" onClick={() => go("pronouns")}>ต่อไป: สรรพนามและ olla <ChevronRight /></button></div>}
    {step === "pronouns" && <div className="lesson-panel">{title("BOOK PAGE 16", "Persoonapronominit ja olla-verbi", "olla หมายถึง เป็น / อยู่ / คือ และต้องผันให้ตรงกับประธาน")}
      <Table headers={["สรรพนาม", "ภาษาเขียน", "ภาษาพูด", "ความหมาย"]} rows={olla} audio={[0, 1, 2]} />
      <div className="lesson-tip"><b>จุดสำคัญ</b><p>hän ใช้กับคนในภาษาเขียน แต่ภาษาพูดมักใช้ se · he เปลี่ยนเป็น ne · รูปสุภาพ Te ใช้กริยา olette และเขียนตัวใหญ่เมื่อต้องการเน้นความสุภาพ</p></div><div className="answer-pairs"><article><Finnish text="Minä olen opiskelija." /><p>ฉันเป็นนักเรียน</p></article><article><Finnish text="Me olemme Suomessa." /><p>พวกเราอยู่ในฟินแลนด์</p></article></div><button className="primary lesson-next" onClick={() => go("harmony")}>ต่อไป: vowel harmony <ChevronRight /></button></div>}
    {step === "harmony" && <div className="lesson-panel">{title("BOOK PAGE 17", "Vokaaliharmonia · Vowel harmony", "ดูสระในคำเพื่อเลือก suffix คู่ a/ä, o/ö และ u/y")}
      <div className="vowel-groups"><article className="back"><b>a · o · u</b><span>สระหลัง</span><p>auto, tutustua, hauska → -ssa, -vat, -ko</p></article><article className="neutral"><b>i · e</b><span>สระกลาง</span><p>อยู่ร่วมได้ทั้งสองฝั่ง; ถ้ามีแค่ i/e ให้เลือก suffix ฝั่งสระหน้า</p></article><article className="front"><b>ä · ö · y</b><span>สระหน้า</span><p>hyvä, säästää, yö → -ssä, -vät, -kö</p></article></div>
      <div className="example-flow"><article><Finnish text="auto" /><span>+ ssa →</span><Finnish text="autossa" /></article><article><Finnish text="hyvä" /><span>+ ssä →</span><Finnish text="hyvässä" /></article><article><Finnish text="kurssi" /><span>+ ko →</span><Finnish text="kurssiko" /></article><article><Finnish text="kieli" /><span>+ kö →</span><Finnish text="kielikö" /></article></div>
      <h3>คำประสม: ดูเฉพาะส่วนท้ายของคำ</h3><div className="answer-pairs"><article><Finnish text="suklaajäätelössä" /><p>suklaa + jäätelö + ssä: ส่วนท้าย jäätelö มี ä/ö</p></article><article><Finnish text="jäätelökioskilla" /><p>jäätelö + kioski + lla: ส่วนท้าย kioski มี o จึงใช้ -lla</p></article></div><button className="primary lesson-next" onClick={() => go("verbs")}>ต่อไป: การผันกริยา <ChevronRight /></button></div>}
    {step === "verbs" && <div className="lesson-panel">{title("BOOK PAGE 37", "Verbin persoonataivutus", "ตัด -a/-ä จาก infinitive แบบ puhua/kysyä แล้วเติม personal ending")}
      <Table headers={["ประธาน", "puhua", "kysyä", "คำลงท้าย"]} rows={conjugation} audio={[0, 1, 2]} />
      <div className="lesson-tip"><b>ภาษาพูด</b><p>mä puhun · sä puhut · se puhuu · me puhutaan · te puhutte · ne puhuu — ภาษาพูดของ me และ ne ไม่ได้ตามตารางภาษาเขียนตรง ๆ</p></div>
      <h3>Negatiivinen lause · ประโยคปฏิเสธ</h3><p>ผันกริยาปฏิเสธ en/et/ei/emme/ette/eivät แล้วใช้กริยาหลักรูป stem ที่ไม่มี personal ending</p><Table headers={["ประธาน", "กริยาปฏิเสธ", "ภาษาเขียน", "ภาษาพูด"]} rows={negatives} audio={[0, 1, 2, 3]} />
      <div className="formula"><b>minä puhun</b><span>→</span><b>minä en puhu</b></div><button className="primary lesson-next" onClick={() => go("questions")}>ต่อไป: คำถาม <ChevronRight /></button></div>}
    {step === "questions" && <div className="lesson-panel">{title("BOOK PAGES 38–39", "Kysymys · การสร้างคำถาม", "มี special questions ที่ขึ้นต้นด้วยคำถาม และ yes/no questions ที่เติม -ko/-kö")}
      <h3>1. Special question · คำถามเฉพาะ</h3><p>ลำดับหลักคือ <b>question word + subject + verb</b>: Kuka sinä olet? / Mitä kieltä te puhutte?</p><Table headers={["คำถาม", "ความหมาย", "ตัวอย่าง", "คำตอบ"]} rows={questionWords} audio={[0, 2, 3]} />
      <h3>2. Yes / no question · ko/kö-kysymys</h3><div className="transform-list"><article><Finnish text="Sinä olet suomalainen." /><span>→</span><Finnish text="Oletko sinä suomalainen?" /></article><article><Finnish text="Hän asuu Suomessa." /><span>→</span><Finnish text="Asuuko hän Suomessa?" /></article><article><Finnish text="Sinä et puhu englantia." /><span>→</span><Finnish text="Etkö sinä puhu englantia?" /></article></div>
      <div className="lesson-tip"><b>วิธีตอบสั้น</b><p>ตอบด้วยกริยาที่ผันตามผู้ตอบ: Asutko sinä Helsingissä? → Asun. / En. · Puhutteko englantia? → Puhumme. / Emme. ห้ามตอบ pelkkä kyllä ถ้าข้อสอบต้องการรูปกริยา</p></div>
      <h3>ภาษาพูดและ intonation</h3><div className="lesson3-chip-grid"><Finnish text="Ooks sä suomalainen?" /><Finnish text="Asuuks se Suomessa?" /><Finnish text="Eks sä puhu englantia?" /></div><p><b>คำถามฟินแลนด์ลงเสียงต่ำท้ายประโยค</b> เช่นเดียวกับประโยคบอกเล่า ไม่ยกเสียงท้ายแบบภาษาอังกฤษ</p><button className="primary lesson-next" onClick={() => go("check")}>ทำแบบทดสอบ <ChevronRight /></button></div>}
    {step === "check" && <div className="lesson-panel quiz-panel"><span className="kicker">TEST 1 · KNOWLEDGE CHECK</span><h2>ลองทำก่อนเข้าสอบ</h2>{finished ? <div className="lesson-result"><span>✓</span><div><p>จบบททบทวนแล้ว</p><b>{score} / {quiz.length}</b><p>{score >= 8 ? "Hienoa! พร้อมสำหรับ Test 1" : "ทบทวนแท็บที่ยังไม่มั่นใจแล้วลองใหม่"}</p></div></div> : <><p>คำถาม {index + 1} จาก {quiz.length}</p><h3>{q[0]}</h3><div className="lesson-answers">{q[1].map(choice => <button key={choice} disabled={!!answer} className={answer ? choice === q[2] ? "correct" : choice === answer ? "wrong" : "" : ""} onClick={() => { setAnswer(choice); if (choice === q[2]) setScore(s => s + 1); }}>{choice}</button>)}</div>{answer && <><div className="lesson-tip"><b>{answer === q[2] ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{q[3]}</p></div><button className="primary lesson-next" onClick={() => { if (index === quiz.length - 1) { setFinished(true); finish("check"); } else { setIndex(i => i + 1); setAnswer(""); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } }}>คำถามถัดไป <ChevronRight /></button></>}</>}</div>}
  </section>;
}
