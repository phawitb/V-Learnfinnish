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
const textsQuiz = [
  // ── text11 (p.11) ──
  ["'ขอโทษครับ ที่นี่มีคอร์สภาษาฟินแลนด์ใช่ไหม'", ["Anteeksi, onko täällä suomen kurssi?", "Missä suomen kurssi on?", "Mikä suomen kurssi on?"], "Anteeksi, onko täällä suomen kurssi?", "anteeksi = ขอโทษ, onko = ใช่ไหม (yes/no question)"],
  ["'ที่นั่งนี้ว่างไหม'", ["Missä paikka on?", "Onko tämä paikka vapaa?", "Tämä paikka on vapaa."], "Onko tämä paikka vapaa?", "paikka = ที่นั่ง, vapaa = ว่าง"],
  ["'คุณคือใคร'", ["Kuka sinä olet?", "Missä sinä olet?", "Mikä sinä olet?"], "Kuka sinä olet?", "kuka = ใคร ใช้ถามตัวตนบุคคล"],
  ["'ยินดีที่ได้รู้จัก'", ["Kiitos samoin!", "Hauska tutustua!", "Nähdään huomenna!"], "Hauska tutustua!", "hauska = สนุก/ยินดี, tutustua = ทำความรู้จัก"],
  ["'ขอบคุณ เช่นกัน'", ["Kiitos samoin!", "Hauska tutustua!", "Ei kestä!"], "Kiitos samoin!", "samoin = เช่นกัน; ใช้ตอบ Hauska tutustua!"],
  ["'สวัสดี Olga สบายดีไหม'", ["Mitä kuuluu?", "Missä sinä asut?", "Kuka sinä olet?"], "Mitä kuuluu?", "Moi Olga! Mitä kuuluu? = สวัสดี สบายดีไหม"],
  ["'ฉันสบายดี'", ["Olen hyvä.", "Minulle kuuluu hyvää.", "Kiitos hyvää."], "Minulle kuuluu hyvää.", "โครงสร้าง: Minulle kuuluu + adverb"],
  ["'แล้วคุณล่ะ'", ["Entä sinulle?", "Kiitos samoin!", "Mitä kuuluu?"], "Entä sinulle?", "entä = แล้ว…ล่ะ; sinulle = สำหรับคุณ"],
  ["'ค่อนข้างสบายดี ขอบคุณ'", ["Ihan hyvää, kiitos.", "Minulle kuuluu hyvää.", "Ei kestä!"], "Ihan hyvää, kiitos.", "ihan = ค่อนข้าง/พอสมควร"],
  ["'Alex นี่คือ Pedro'", ["Kuka Pedro on?", "Tässä on Pedro.", "Pedro on tässä."], "Tässä on Pedro.", "tässä on … = นี่คือ … ใช้แนะนำคน"],
  ["'ยินดีต้อนรับสู่คอร์สภาษาฟินแลนด์'", ["Tervetuloa suomen kurssille!", "Hei ja terve!", "Kiitos kurssista!"], "Tervetuloa suomen kurssille!", "tervetuloa = ยินดีต้อนรับ, kurssille = สู่คอร์ส"],
  ["'สะกดอย่างไร'", ["Miten se kirjoitetaan?", "Mikä sinun nimi on?", "Missä se on?"], "Miten se kirjoitetaan?", "kirjoitetaan = ถูกเขียน/สะกด"],
  ["etunimi แปลว่า", ["ชื่อต้น", "นามสกุล", "ชื่อเล่น"], "ชื่อต้น", "etunimi = ชื่อต้น, sukunimi = นามสกุล"],
  ["วันเรียนของคอร์สคือวันอะไรบ้าง", ["maanantai, keskiviikko, torstai", "tiistai, torstai, perjantai", "maanantai, tiistai, perjantai"], "maanantai, keskiviikko, torstai", "จันทร์ พุธ พฤหัสบดี เรียนเวลา kello 18–20"],
  // ── text29 (p.29) ──
  ["'คอร์สเลิกสองทุ่ม' — เลิกเวลาใด", ["kello 18", "kello 20", "kello 22"], "kello 20", "Kurssi loppuu kello 20."],
  ["'คุณเป็นคนชาติอะไร'", ["Minkämaalainen sinä olet?", "Mistä sinä olet?", "Kuka sinä olet?"], "Minkämaalainen sinä olet?", "minkämaalainen = สัญชาติอะไร"],
  ["'ผมเป็นชาวบราซิล'", ["Olen Brasiliasta.", "Olen brasilialainen.", "Puhun brasiliaa."], "Olen brasilialainen.", "สัญชาติ: brasilialainen ตัวเล็ก"],
  ["'ฉันเป็นชาวรัสเซีย'", ["Olen venäläinen.", "Olen Venäjältä.", "Puhun venäjää."], "Olen venäläinen.", "venäläinen = ชาวรัสเซีย"],
  ["'คุณมาจากไหน'", ["Missä sinä asut?", "Mihin sinä menet?", "Mistä sinä olet kotoisin?"], "Mistä sinä olet kotoisin?", "mistä = จากไหน, kotoisin = มีถิ่นฐาน"],
  ["'คุณพูดภาษาอะไร'", ["Mitä kieltä sinä puhut?", "Mikä kieli sinä on?", "Kuka puhuu?"], "Mitä kieltä sinä puhut?", "mitä kieltä = ภาษาอะไร (partitive)"],
  ["'ภาษาแม่ของผมคืออังกฤษ'", ["Puhun englantia.", "Minun äidinkieli on englanti.", "Olen englantilainen."], "Minun äidinkieli on englanti.", "äidinkieli = ภาษาแม่"],
  ["'ผมพูดสเปนได้นิดหน่อย'", ["Puhun myös vähän espanjaa.", "Puhun espanjaa hyvin.", "En puhu espanjaa."], "Puhun myös vähän espanjaa.", "myös = ด้วย, vähän = นิดหน่อย, espanjaa = สเปน (partitive)"],
  ["'ผมไม่พูดสเปน'", ["En puhu espanjaa.", "Ei puhu espanjaa.", "Emme puhu espanjaa."], "En puhu espanjaa.", "minä ปฏิเสธ = en + puhu (stem)"],
  ["'ที่บราซิลเราพูดภาษาโปรตุเกส'", ["Brasiliasta me puhun portugalia.", "Brasiliassa me puhumme portugalia.", "Brasiliassa me puhun portugalia."], "Brasiliassa me puhumme portugalia.", "-ssa = ใน; me puhumme = เราพูด; portugalia = โปรตุเกส (partitive)"],
  ["'คุณอาศัยอยู่ที่ไหน'", ["Missä sinä asut?", "Mistä sinä olet?", "Mihin sinä menet?"], "Missä sinä asut?", "missä = ที่ไหน, asut = อาศัยอยู่ (sinä)"],
  ["'ผมไม่ได้อยู่ Helsinki แต่อยู่ Espoo'", ["En asu Helsingissä ja Espoossa.", "En asu Helsingissä vaan Espoossa.", "Ei asu Helsingissä vaan Espoossa."], "En asu Helsingissä vaan Espoossa.", "ei…vaan = ไม่ได้…แต่; Helsingissä = ใน Helsinki"],
  ["'ฉันกลับบ้านด้วยรถเมล์สาย 75'", ["Menen kotiin bussilla 75.", "Menen kotiin bussissa 75.", "Menen kotiin bussista 75."], "Menen kotiin bussilla 75.", "พาหนะ + -lla/-llä: bussilla = โดยรถเมล์"],
  ["Alex กลับบ้านด้วยวิธีใด", ["bussilla", "autolla", "metrolla"], "autolla", "Alex ajaa autolla kotiin = ขับรถกลับบ้าน"],
  ["Pedro กลับบ้านด้วยวิธีใด", ["autolla", "bussilla ja metrolla", "bussilla 75"], "bussilla ja metrolla", "Pedro ขึ้นรถเมล์ก่อน แล้วต่อรถไฟใต้ดิน"],
  ["'บ๊ายบาย เจอกันพรุ่งนี้'", ["Moi moi, nähdään huomenna!", "Hei hei, näkemiin!", "Kiitos, hei!"], "Moi moi, nähdään huomenna!", "moi moi = บ๊ายบาย, nähdään huomenna = เจอกันพรุ่งนี้"],
  // ── introductions (p.31) ──
  ["Pedro พูดภาษาอะไร", ["espanjaa", "portugalia", "englantia"], "portugalia", "Puhun portugalia. ไม่ใช่สเปน แม้จะเป็นชาวบราซิล"],
  ["Olga มาจากเมืองอะไร", ["Moskovasta", "Helsingistä", "Pietarista (St Petersburg)"], "Pietarista (St Petersburg)", "Olen kotoisin Pietarista Venäjältä."],
  ["Olga ไม่พูดภาษาอะไร", ["venäjää", "suomea", "englantia"], "englantia", "En puhu englantia."],
  ["Alex มีภาษาแม่คือ", ["espanja", "suomi", "englanti"], "englanti", "Minun äidinkieleni on englanti."],
  // ── countries table (p.31) ──
  ["สัญชาติของ Suomi คือ", ["suomalainen", "ranskalainen", "venäläinen"], "suomalainen", "Suomi → suomalainen"],
  ["สัญชาติของ Ranska คือ", ["kreikkalainen", "ranskalainen", "egyptiläinen"], "ranskalainen", "Ranska → ranskalainen"],
  ["สัญชาติของ Kreikka คือ", ["kreikkalainen", "islantilainen", "ranskalainen"], "kreikkalainen", "Kreikka → kreikkalainen"],
  ["สัญชาติของ Islanti คือ", ["egyptiläinen", "islantilainen", "pakistanilainen"], "islantilainen", "Islanti → islantilainen"],
  ["สัญชาติของ Egypti คือ", ["pakistanilainen", "venäläinen", "egyptiläinen"], "egyptiläinen", "Egypti → egyptiläinen (-läinen เพราะสระหน้า)"],
  ["ภาษาของ Egypti คือ", ["egypti", "arabia", "urdu"], "arabia", "Egypti พูดอาหรับ: Puhun arabiaa."],
  ["'ฉันมาจากรัสเซีย' ใช้รูปพิเศษว่า", ["Venäjästä", "Venäjältä", "Venäjässä"], "Venäjältä", "Venäjä เป็นข้อยกเว้น ไม่ใช้ -sta แต่ใช้ -ltä"],
  ["ภาษาของ Pakistan คือ", ["pakistan", "hindi", "urdu"], "urdu", "Pakistan → pakistanilainen → Puhun urdua."],
  ["'ฉันเป็นชาวไทย' คือ", ["Olen thailainen.", "Olen Thaimaa.", "Olen thaimaalainen."], "Olen thaimaalainen.", "Thaimaa → thaimaalainen"],
  ["'ฉันพูดภาษาฟินแลนด์' คือ", ["Puhun suomea.", "Puhun suomi.", "Puhun suomia."], "Puhun suomea.", "suomi → suomea (partitive)"],
  ["'ฉันพูดภาษาฝรั่งเศส' คือ", ["Puhun ranska.", "Puhun ranskaa.", "Puhun ranskan."], "Puhun ranskaa.", "ranska → ranskaa (partitive)"],
  ["'ฉันมาจากฟินแลนด์' คือ", ["Suomessa", "Suomesta", "Suomelta"], "Suomesta", "Olen kotoisin Suomesta. (-sta)"],
  ["'ฉันมาจากอิสแลนด์' คือ", ["Islantista", "Islannista", "Islannilta"], "Islannista", "Islanti → Islannista"],
  ["'ฉันมาจากไทย' คือ", ["Thaimaalta", "Thaimaasta", "Thaimaassa"], "Thaimaasta", "Thaimaa → Thaimaasta (-sta)"],
  // ── text33 kiosk (p.33) ──
  ["'ไอศกรีมราคาเท่าไร' (ภาษาพูด)", ["Mitä jäätelö maksaa?", "Paljonko jätski on?", "Mitä jätski maksaa?"], "Mitä jätski maksaa?", "jätski = jäätelö ภาษาพูด; maksaa = มีราคา"],
  ["'รับอย่างอื่นอีกไหม' (ภาษาพูด)", ["Haluatko muuta?", "Tuleeks muuta?", "Onko muuta?"], "Tuleeks muuta?", "tuleeks = tuleeko (-ks ย่อ); muuta = อย่างอื่น"],
  ["'จ่ายรวมกันไหม'", ["Maksatteko yhdessä?", "Onko sama?", "Tuleeks nää samasta?"], "Tuleeks nää samasta?", "nää = nämä (พวกนี้), samasta = จากกองเดียวกัน"],
  ["'จ่ายด้วยบัตร' คือ", ["Kortti", "Kortilla", "Korttilla"], "Kortilla", "kortti → kortilla (-lla = ด้วย)"],
  ["'ต้องการใบเสร็จไหม'", ["Tarviitko kuittia?", "Haluatko kuittia?", "Onko kuitti?"], "Tarviitko kuittia?", "tarviitko = tarvitsetko (ภาษาพูด); kuittia (partitive)"],
  // ── spoken → written (p.33) ──
  ["jätski ภาษาเขียนคือ", ["juusto", "joki", "jäätelö"], "jäätelö", "jätski = ไอศกรีม (ภาษาพูด)"],
  ["kiska ภาษาเขียนคือ", ["kissa", "kioski", "kisko"], "kioski", "kiska = ซุ้มขายของ (ภาษาพูด)"],
  ["yks ภาษาเขียนคือ", ["kaksi", "yksi", "kolme"], "yksi", "yks = หนึ่ง (ย่อ)"],
  ["sit ภาษาเขียนคือ", ["sinä", "sitten", "silloin"], "sitten", "sit = จากนั้น/งั้น"],
  ["sulle ภาษาเขียนคือ", ["sille", "sinulle", "suuri"], "sinulle", "sulle = สำหรับคุณ"],
  ["mäkin ภาษาเขียนคือ", ["mekin", "minäkin", "mäkinen"], "minäkin", "mäkin = ฉันก็"],
  ["nää ภาษาเขียนคือ", ["ne", "nämä", "nuo"], "nämä", "nää = พวกนี้"],
  ["kiitti ภาษาเขียนคือ", ["kiva", "kiitos", "kieli"], "kiitos", "kiitti = ขอบคุณ"],
  // ── kiosk vocabulary ──
  ["pallo ในบริบทไอศกรีมแปลว่า", ["ลูก / สกู๊ป", "ฟุตบอล", "ถ้วย"], "ลูก / สกู๊ป", "Yks pallo = 1 สกู๊ป"],
  ["yhteensä แปลว่า", ["แยกกัน", "รวมทั้งหมด", "ถูกต้อง"], "รวมทั้งหมด", "10 euroa yhteensä = รวม 10 ยูโร"],
  ["selvä แปลว่า", ["แพง", "ตกลง / เข้าใจแล้ว", "ถูก"], "ตกลง / เข้าใจแล้ว", "Selvä = OK / ได้เลย"],
  ["Olga ไม่ซื้อ jäätelö เพราะอะไร", ["koska hän ei tykkää", "koska hän säästää rahaa", "koska ei ole rahaa"], "koska hän säästää rahaa", "Olga säästää rahaa = เก็บเงิน"],
] as const;

const phrasesQuiz = [
  ["'อรุณสวัสดิ์' คือ", ["Hyvää päivää!", "Hyvää huomenta! / Huomenta!", "Hyvää iltaa!"], "Hyvää huomenta! / Huomenta!", "huomenta = ตอนเช้า"],
  ["'สวัสดีตอนกลางวัน' คือ", ["Hyvää huomenta!", "Hyvää iltaa!", "Hyvää päivää! / Päivää!"], "Hyvää päivää! / Päivää!", "päivää = ตอนกลางวัน"],
  ["'สวัสดีตอนเย็น' คือ", ["Hyvää yötä!", "Hyvää päivää!", "Hyvää iltaa! / Iltaa!"], "Hyvää iltaa! / Iltaa!", "iltaa = ตอนเย็น"],
  ["'ราตรีสวัสดิ์ หลับให้สบายนะ' คือ", ["Hyvää iltaa!", "Hyvää yötä! Nuku hyvin!", "Nähdään huomenna!"], "Hyvää yötä! Nuku hyvin!", "yötä = กลางคืน, nuku hyvin = หลับฝันดี"],
  ["'สวัสดี' (ไม่เป็นทางการ) คือ", ["Hyvää päivää!", "Näkemiin!", "Hei! / Moi! / Terve!"], "Hei! / Moi! / Terve!", "ทั้ง 3 คำใช้ทักทายกันเอง"],
  ["'บ๊ายบาย' คือ", ["Näkemiin!", "Hei hei! / Moi moi! / Moikka! / Heippa!", "Tervetuloa!"], "Hei hei! / Moi moi! / Moikka! / Heippa!", "ใช้ลาแบบกันเอง"],
  ["'แล้วพบกัน / ลาก่อน' (เป็นทางการ) คือ", ["Moi moi!", "Heippa!", "Nähdään! / Näkemiin!"], "Nähdään! / Näkemiin!", "Näkemiin เป็นทางการกว่า Moi moi"],
  ["'พบกันพรุ่งนี้' คือ", ["Näkemiin!", "Hei hei!", "Nähdään huomenna!"], "Nähdään huomenna!", "huomenna = พรุ่งนี้"],
  ["'ยินดีที่ได้รู้จัก' คือ", ["Kiitos samoin!", "Tervetuloa!", "Hauska tutustua!"], "Hauska tutustua!", "ใช้เมื่อพบคนใหม่ครั้งแรก"],
  ["'นี่คือ Tiina' คือ", ["Kuka Tiina on?", "Tässä on Tiina.", "Tiina on tässä."], "Tässä on Tiina.", "tässä on … = นี่คือ … ใช้แนะนำคน"],
  ["'ขอบคุณ เช่นกัน' คือ", ["Ole hyvä!", "Ei kestä!", "Kiitos samoin!"], "Kiitos samoin!", "ตอบ Hauska tutustua!"],
  ["'ยินดีต้อนรับ' คือ", ["Hauska tutustua!", "Nähdään!", "Tervetuloa!"], "Tervetuloa!", "tervetuloa ใช้ต้อนรับ"],
  ["'ใช่' แบบเป็นทางการคือ", ["Joo.", "Kyllä.", "Ei."], "Kyllä.", "Joo = กันเอง, Kyllä = เป็นทางการ"],
  ["'เชิญ / ด้วยความยินดี' คือ", ["Kiitos!", "Ei kestä!", "Ole hyvä!"], "Ole hyvä!", "ใช้ตอบ Kiitos! หรือยื่นของให้"],
  ["'ขอบคุณ' คือ", ["Ole hyvä!", "Anteeksi!", "Kiitos!"], "Kiitos!", "คำที่ใช้บ่อยที่สุด"],
  ["'ไม่เป็นไร ด้วยความยินดี' (ตอบ Kiitos) คือ", ["Ei se mitään!", "Ole hyvä!", "Ei kestä!"], "Ei kestä!", "อีกรูปหนึ่งของ You're welcome"],
  ["'ขอโทษ / ขออนุญาต' คือ", ["Ei se mitään!", "Ole hyvä!", "Anteeksi!"], "Anteeksi!", "ใช้ได้ทั้ง sorry และ excuse me"],
  ["'ไม่เป็นไร' (ตอบ Anteeksi) คือ", ["Ei kestä!", "Ole hyvä!", "Ei se mitään!"], "Ei se mitään!", "ตอบเมื่อมีคนขอโทษ"],
  ["'ชนแก้ว' คือ", ["Hyvää ruokahalua!", "Kiitos!", "Kippis! / Skool!"], "Kippis! / Skool!", "ใช้เวลาดื่มฉลอง"],
  ["'ทานให้อร่อย' คือ", ["Kiitos ruoasta!", "Kippis!", "Hyvää ruokahalua!"], "Hyvää ruokahalua!", "ruokahalua = ความอยากอาหาร"],
  ["'ขอบคุณสำหรับอาหาร' คือ", ["Hyvää ruokahalua!", "Kiitos, oli hyvää.", "Kiitos ruoasta!"], "Kiitos ruoasta!", "ruoasta = จากอาหาร (-sta)"],
  ["'ขอบคุณ อร่อยมาก' คือ", ["Kiitos ruoasta!", "Hyvää ruokahalua!", "Kiitos, oli hyvää."], "Kiitos, oli hyvää.", "oli = เป็น (อดีต), hyvää = ดี"],
  ["ตอบ Kiitos! ได้ 2 แบบคือ", ["Kiitos samoin! / Anteeksi!", "Ei se mitään! / Nähdään!", "Ole hyvä! / Ei kestä!"], "Ole hyvä! / Ei kestä!", "ทั้งสองแปลว่า You're welcome"],
] as const;

const daysQuiz = [
  ["'วันจันทร์' คือ", ["tiistai", "maanantai", "keskiviikko"], "maanantai", "ma = ตัวย่อ"],
  ["'วันอังคาร' คือ", ["torstai", "tiistai", "perjantai"], "tiistai", "ti = ตัวย่อ"],
  ["'วันพุธ' คือ", ["torstai", "perjantai", "keskiviikko"], "keskiviikko", "ke = ตัวย่อ; วันกลางสัปดาห์"],
  ["'วันพฤหัสบดี' คือ", ["tiistai", "perjantai", "torstai"], "torstai", "to = ตัวย่อ"],
  ["'วันศุกร์' คือ", ["lauantai", "perjantai", "torstai"], "perjantai", "pe = ตัวย่อ"],
  ["'วันเสาร์' คือ", ["sunnuntai", "perjantai", "lauantai"], "lauantai", "la = ตัวย่อ"],
  ["'วันอาทิตย์' คือ", ["lauantai", "sunnuntai", "maanantai"], "sunnuntai", "su = ตัวย่อ"],
  ["'สุดสัปดาห์' คือ", ["arkipäivä", "viikonloppu", "viikko"], "viikonloppu", "viikonloppu = la ja su"],
  ["'ในวันจันทร์' (Milloin?) ใช้รูปใด", ["maanantai", "maanantaissa", "maanantaina"], "maanantaina", "-na ใช้ตอบ Milloin?"],
  ["'ในวันพุธ' ใช้รูปใด", ["keskiviikko", "keskiviikossa", "keskiviikkona"], "keskiviikkona", "keskiviikko → keskiviikkona (-na)"],
  ["'ในวันหยุดสุดสัปดาห์' ใช้รูปใด", ["viikonloppu", "viikonloppussa", "viikonloppuna"], "viikonloppuna", "viikonloppu → viikonloppuna (-na)"],
  ["'เมื่อวานซืน' คือ", ["eilen", "ylihuomenna", "toissapäivänä"], "toissapäivänä", "สองวันก่อน"],
  ["'เมื่อวาน' คือ", ["toissapäivänä", "eilen", "tänään"], "eilen", "eilen = yesterday"],
  ["'วันนี้' คือ", ["eilen", "tänään", "huomenna"], "tänään", "tänään = today"],
  ["'พรุ่งนี้' คือ", ["ylihuomenna", "huomenna", "tänään"], "huomenna", "huomenna = tomorrow"],
  ["'มะรืน' คือ", ["huomenna", "toissapäivänä", "ylihuomenna"], "ylihuomenna", "yli = เกิน + huomenna → มะรืน"],
  ["ถาม 'วันนี้วันอะไร' ใช้", ["Milloin tänään on?", "Missä päivä on?", "Mikä päivä tänään on?"], "Mikä päivä tänään on?", "ตอบรูปพื้นฐาน: Tänään on maanantai."],
  ["ถาม 'คอร์สเรียนวันไหน' ใช้", ["Mikä kurssi on?", "Milloin kurssi on?", "Missä kurssi on?"], "Milloin kurssi on?", "ตอบรูป -na: Kurssi on maanantaina."],
  ["ตอบ 'Mikä päivä tänään on?' ใช้รูปใด", ["รูป -na เช่น maanantaina", "รูปพื้นฐาน เช่น maanantai", "รูป -ssa เช่น maanantaissa"], "รูปพื้นฐาน เช่น maanantai", "ถาม 'วันอะไร' → รูปพื้นฐาน; ถาม 'เมื่อไร' → รูป -na/-nä"],
] as const;

const numbersQuiz = [
  ["0 คือ", ["yksi", "nolla", "kaksi"], "nolla", "nolla = ศูนย์"],
  ["1 คือ", ["kaksi", "yksi", "kolme"], "yksi", "yksi = หนึ่ง"],
  ["2 คือ", ["kolme", "kaksi", "yksi"], "kaksi", "kaksi = สอง"],
  ["3 คือ", ["neljä", "kaksi", "kolme"], "kolme", "kolme = สาม"],
  ["4 คือ", ["viisi", "neljä", "kolme"], "neljä", "neljä = สี่"],
  ["5 คือ", ["kuusi", "neljä", "viisi"], "viisi", "viisi = ห้า"],
  ["6 คือ", ["seitsemän", "viisi", "kuusi"], "kuusi", "kuusi = หก"],
  ["7 คือ", ["kahdeksan", "kuusi", "seitsemän"], "seitsemän", "seitsemän = เจ็ด"],
  ["8 คือ", ["yhdeksän", "seitsemän", "kahdeksan"], "kahdeksan", "kahdeksan = แปด"],
  ["9 คือ", ["kymmenen", "kahdeksan", "yhdeksän"], "yhdeksän", "yhdeksän = เก้า"],
  ["10 คือ", ["yksitoista", "yhdeksän", "kymmenen"], "kymmenen", "kymmenen = สิบ"],
  ["11 คือ", ["kaksitoista", "yksitoista", "kymmenen"], "yksitoista", "1 + toista = 11"],
  ["15 คือ", ["kuusitoista", "viisitoista", "neljätoista"], "viisitoista", "5 + toista = 15"],
  ["19 คือ", ["kahdeksantoista", "kaksikymmentä", "yhdeksäntoista"], "yhdeksäntoista", "9 + toista = 19"],
  ["20 คือ", ["kolmekymmentä", "kaksitoista", "kaksikymmentä"], "kaksikymmentä", "kaksi + kymmentä = สองสิบ"],
  ["21 คือ", ["kaksikymmentäkaksi", "kolmekymmentäyksi", "kaksikymmentäyksi"], "kaksikymmentäyksi", "20 + 1 เขียนติดกัน"],
  ["23 คือ", ["kolmekymmentäkaksi", "kaksikymmentäkolme", "kaksitoistakolme"], "kaksikymmentäkolme", "20 + 3 เขียนติดกัน"],
  ["50 คือ", ["neljäkymmentä", "kuusikymmentä", "viisikymmentä"], "viisikymmentä", "viisi + kymmentä = ห้าสิบ"],
  ["100 คือ", ["sataa", "tuhat", "sata"], "sata", "sata = ร้อย (ไม่ต้องเติม yksi)"],
  ["200 คือ", ["satakaksi", "kaksisataa", "kaksi sata"], "kaksisataa", "ตั้งแต่ 200 ใช้ partitive: sataa"],
  ["1,000 คือ", ["tuhatta", "miljoona", "tuhat"], "tuhat", "tuhat = หนึ่งพัน"],
  ["2,000 คือ", ["kaksi tuhat", "tuhat kaksi", "kaksituhatta"], "kaksituhatta", "partitive ของ tuhat → tuhatta"],
  ["1,000,000 คือ", ["miljardi", "biljoona", "miljoona"], "miljoona", "miljoona = ล้าน"],
  ["2,000,000 คือ", ["kaksimiljoonaa", "kaksi miljoonaa", "miljoona kaksi"], "kaksi miljoonaa", "ตั้งแต่ล้านเขียนแยก + partitive"],
  ["1,000,000,000 คือ", ["miljoona", "biljoona", "miljardi"], "miljardi", "miljardi = พันล้าน"],
  ["เลข 11–19 ใช้หลักอะไร", ["เลข + kymmentä", "เลข + sataa", "เลข + toista"], "เลข + toista", "เช่น yksitoista, kaksitoista"],
  ["เลขหลักสิบ (20,30..) ใช้หลักอะไร", ["เลข + toista", "เลข + kymmentä", "เลข + sataa"], "เลข + kymmentä", "เช่น kaksikymmentä, kolmekymmentä"],
  ["ถามอายุว่าอย่างไร", ["Mikä sinun ikä on?", "Kuinka vanha sinä olet?", "Montako vuotta?"], "Kuinka vanha sinä olet?", "ตอบ: Olen 23 vuotta vanha."],
] as const;

const pronounsQuiz = [
  ["minä + olla ภาษาเขียนคือ", ["olet", "on", "olen"], "olen", "minä olen = ฉันเป็น/อยู่"],
  ["sinä + olla ภาษาเขียนคือ", ["olen", "olet", "on"], "olet", "sinä olet = คุณเป็น/อยู่"],
  ["hän / se + olla ภาษาเขียนคือ", ["olen", "on", "ovat"], "on", "hän on = เขา/เธอเป็น"],
  ["me + olla ภาษาเขียนคือ", ["olette", "olemme", "ovat"], "olemme", "me olemme = พวกเราเป็น"],
  ["te + olla ภาษาเขียนคือ", ["olemme", "olette", "ovat"], "olette", "te olette = พวกคุณเป็น"],
  ["he / ne + olla ภาษาเขียนคือ", ["olemme", "ovat", "on"], "ovat", "he ovat = พวกเขาเป็น"],
  ["minä olen ภาษาพูดคือ", ["sä oot", "mä oon", "me ollaan"], "mä oon", "minä → mä, olen → oon"],
  ["sinä olet ภาษาพูดคือ", ["mä oon", "se on", "sä oot"], "sä oot", "sinä → sä, olet → oot"],
  ["hän on ภาษาพูดคือ", ["ne on", "mä oon", "se on"], "se on", "ภาษาพูดใช้ se แทน hän"],
  ["me olemme ภาษาพูดคือ", ["me ootte", "ne on", "me ollaan"], "me ollaan", "ภาษาพูดใช้ me ollaan"],
  ["te olette ภาษาพูดคือ", ["me ollaan", "te ootte", "ne on"], "te ootte", "olette → ootte"],
  ["he ovat ภาษาพูดคือ", ["ne ovat", "se on", "ne on"], "ne on", "ภาษาพูด: he → ne และใช้ on แทน ovat"],
  ["hän ใช้กับอะไรในภาษาเขียน", ["สัตว์/สิ่งของ", "คน", "ทุกอย่าง"], "คน", "เขียน: hän = คน, se = สิ่งของ; พูดใช้ se กับทุกอย่าง"],
  ["Te ตัวใหญ่ใช้เมื่อไร", ["พูดกับกลุ่มคน", "ไม่ต่างกัน", "พูดสุภาพกับคนเดียว"], "พูดสุภาพกับคนเดียว", "Te + olette ใช้กริยารูป te แต่เน้นสุภาพ"],
  ["'ฉันเป็นนักเรียน' คือ", ["Sinä olen opiskelija.", "Minä olet opiskelija.", "Minä olen opiskelija."], "Minä olen opiskelija.", "minä + olen + คำนาม"],
  ["'พวกเราอยู่ในฟินแลนด์' คือ", ["Me ovat Suomessa.", "Te olemme Suomessa.", "Me olemme Suomessa."], "Me olemme Suomessa.", "me + olemme; Suomessa = ในฟินแลนด์"],
] as const;

const harmonyQuiz = [
  ["สระหลัง (back vowels) คือ", ["ä, ö, y", "a, o, u", "i, e"], "a, o, u", "a, o, u อยู่ด้วยกันและเลือก suffix ฝั่ง a/o/u"],
  ["สระกลาง (neutral vowels) คือ", ["a, o, u", "ä, ö, y", "i, e"], "i, e", "i, e อยู่กับทุกกลุ่มได้"],
  ["สระหน้า (front vowels) คือ", ["a, o, u", "i, e", "ä, ö, y"], "ä, ö, y", "ä, ö, y ไม่อยู่กับ a, o, u ในคำเดี่ยว"],
  ["คำที่มีแค่ i/e เลือก suffix ฝั่งใด", ["สระหลัง (a/o/u)", "ใช้ได้ทั้งสอง", "สระหน้า (ä/ö/y)"], "สระหน้า (ä/ö/y)", "เช่น kieli → kielikö ไม่ใช่ kieliko"],
  ["auto + ssa/ssä ได้", ["autossä", "autössa", "autossa"], "autossa", "auto มี a, o (สระหลัง) → -ssa"],
  ["hyvä + ssa/ssä ได้", ["hyvassa", "hyvässä", "hyvassä"], "hyvässä", "hyvä มี y, ä (สระหน้า) → -ssä"],
  ["kurssi + ko/kö ได้", ["kurssikö", "kurssikoo", "kurssiko"], "kurssiko", "kurssi มี u (สระหลัง) แม้ลงท้าย i → -ko"],
  ["kieli + ko/kö ได้", ["kieliko", "kielikoo", "kielikö"], "kielikö", "kieli มีเฉพาะ i, e → ใช้ -kö (ฝั่งหน้า)"],
  ["tuoli + ssa/ssä ได้", ["tuolissä", "tuolessa", "tuolissa"], "tuolissa", "tuoli มี u, o (สระหลัง) → -ssa"],
  ["คำประสม ดู suffix จากส่วนใด", ["ส่วนหน้า", "ส่วนท้าย", "ดูทั้งคำ"], "ส่วนท้าย", "คำประสมดูเฉพาะส่วนประกอบสุดท้าย"],
  ["suklaajäätelö + ssa/ssä ได้", ["suklaajäätelössa", "suklaajäätelossa", "suklaajäätelössä"], "suklaajäätelössä", "ส่วนท้าย jäätelö มี ä/ö → -ssä"],
  ["jäätelökioski + lla/llä ได้", ["jäätelökioskillä", "jäätelökioskilta", "jäätelökioskilla"], "jäätelökioskilla", "ส่วนท้าย kioski มี o → -lla"],
  ["-ssa/-ssä ใช้บอก", ["จาก", "ที่/ด้วย", "ใน"], "ใน", "-ssa/-ssä = อยู่ใน"],
  ["-sta/-stä ใช้บอก", ["ใน", "จาก", "ไปที่"], "จาก", "-sta/-stä = จาก"],
  ["-lla/-llä ใช้บอก", ["ใน", "จาก", "ที่ / ด้วย"], "ที่ / ด้วย", "-lla/-llä = ที่/บน/ด้วย"],
  ["-na/-nä ใช้บอก", ["ใน", "จาก", "ในฐานะ / ในวัน"], "ในฐานะ / ในวัน", "เช่น maanantaina = ในวันจันทร์"],
  ["-ko/-kö ใช้ทำ", ["ปฏิเสธ", "คำถาม yes/no", "อดีตกาล"], "คำถาม yes/no", "เติม -ko/-kö ที่กริยาเพื่อสร้างคำถาม"],
  ["-vat/-vät ใช้กับ", ["me (พวกเรา)", "te (พวกคุณ)", "he/ne (พวกเขา)"], "he/ne (พวกเขา)", "he puhuvat / he kysyvät"],
] as const;

const verbsQuiz = [
  ["minä + puhua คือ", ["puhut", "puhuu", "puhun"], "puhun", "minä ใช้ -n"],
  ["sinä + puhua คือ", ["puhun", "puhut", "puhuu"], "puhut", "sinä ใช้ -t"],
  ["hän + puhua คือ", ["puhut", "puhun", "puhuu"], "puhuu", "hän ยืดสระท้าย: puhu → puhuu"],
  ["me + puhua คือ", ["puhutte", "puhumme", "puhuvat"], "puhumme", "me ใช้ -mme"],
  ["te + puhua คือ", ["puhumme", "puhuvat", "puhutte"], "puhutte", "te ใช้ -tte"],
  ["he + puhua คือ", ["puhumme", "puhutte", "puhuvat"], "puhuvat", "he ใช้ -vat (สระหลัง)"],
  ["minä + kysyä คือ", ["kysyt", "kysyy", "kysyn"], "kysyn", "minä ใช้ -n"],
  ["hän + kysyä คือ", ["kysyn", "kysyt", "kysyy"], "kysyy", "hän ยืดสระท้าย: kysy → kysyy"],
  ["he + kysyä คือ", ["kysymme", "kysytte", "kysyvät"], "kysyvät", "he ใช้ -vät (สระหน้าเพราะ y)"],
  ["Te (สุภาพ) + puhua คือ", ["puhuvat", "puhumme", "puhutte"], "puhutte", "Te สุภาพใช้ -tte เหมือน te"],
  ["ภาษาพูดของ me puhumme คือ", ["me puhuu", "ne puhuu", "me puhutaan"], "me puhutaan", "ภาษาพูด me ใช้รูป passiivin"],
  ["ภาษาพูดของ he puhuvat คือ", ["ne puhutaan", "se puhuu", "ne puhuu"], "ne puhuu", "ภาษาพูด he → ne ใช้รูปเอกพจน์"],
  ["ปฏิเสธ minä + puhua คือ", ["ei puhu", "et puhu", "en puhu"], "en puhu", "minä → en"],
  ["ปฏิเสธ sinä + puhua คือ", ["en puhu", "et puhu", "ei puhu"], "et puhu", "sinä → et"],
  ["ปฏิเสธ hän + puhua คือ", ["en puhu", "ei puhu", "et puhu"], "ei puhu", "hän → ei"],
  ["ปฏิเสธ me + puhua คือ", ["ette puhu", "eivät puhu", "emme puhu"], "emme puhu", "me → emme"],
  ["ปฏิเสธ te + puhua คือ", ["emme puhu", "ette puhu", "eivät puhu"], "ette puhu", "te → ette"],
  ["ปฏิเสธ he + puhua คือ", ["emme puhu", "ette puhu", "eivät puhu"], "eivät puhu", "he → eivät"],
  ["กริยาหลักในปฏิเสธใช้รูปใด", ["infinitive", "รูป minä", "รูป stem (ไม่มี personal ending)"], "รูป stem (ไม่มี personal ending)", "et puhu ✓ ไม่ใช่ et puhun ✗"],
  ["ปฏิเสธ minä + puhua ภาษาพูดคือ", ["en puhu mä", "mä ei puhu", "mä en puhu"], "mä en puhu", "mä + en + puhu"],
  ["ปฏิเสธ me + puhua ภาษาพูดคือ", ["me emme puhu", "me en puhu", "me ei puhuta"], "me ei puhuta", "ภาษาพูด: me ei puhuta"],
  ["ปฏิเสธ he + puhua ภาษาพูดคือ", ["ne eivät puhu", "se ei puhu", "ne ei puhu"], "ne ei puhu", "ภาษาพูด: ne ei puhu"],
  ["สูตรสร้างประโยคปฏิเสธ", ["เติม ei + infinitive", "เติม en + กริยารูป minä", "ตัด -a/-ä จาก inf → stem → en/et/ei… + stem"], "ตัด -a/-ä จาก inf → stem → en/et/ei… + stem", "puhua → puhu (stem) → en puhu"],
] as const;

const questionsQuiz = [
  ["คำถาม 'ใคร' คือ", ["mikä", "missä", "kuka"], "kuka", "Kuka sinä olet? = คุณคือใคร"],
  ["คำถาม 'อะไร' คู่กับ olla คือ", ["mitä", "kuka", "mikä"], "mikä", "Mikä päivä tänään on?"],
  ["คำถาม 'อะไร' คู่กับกริยาอื่น คือ", ["mikä", "mitä", "missä"], "mitä", "Mitä kieltä sinä puhut?"],
  ["คำถาม 'เมื่อไร' คือ", ["missä", "miksi", "milloin"], "milloin", "Milloin kurssi on?"],
  ["คำถาม 'สัญชาติอะไร' คือ", ["mistä", "kuka", "minkämaalainen"], "minkämaalainen", "Minkämaalainen Pedro on?"],
  ["คำถาม 'ที่ไหน' (อยู่) คือ", ["mistä", "missä", "mihin"], "missä", "Missä te asutte?"],
  ["คำถาม 'จากไหน' คือ", ["missä", "mihin", "mistä"], "mistä", "Mistä sinä olet kotoisin?"],
  ["คำถาม 'ไปไหน' คือ", ["missä", "mistä", "mihin"], "mihin", "Mihin sinä menet?"],
  ["คำถาม 'ทำไม' คือ", ["mitä", "miksi", "milloin"], "miksi", "Miksi et osta jäätelöä? → Koska…"],
  ["คำถาม 'อย่างไร/เท่าไร' คือ", ["mikä", "kuinka", "missä"], "kuinka", "Kuinka vanha sinä olet?"],
  ["เปลี่ยน 'Sinä olet suomalainen.' เป็นคำถาม", ["Oletkö sinä suomalainen?", "Oletko sinä suomalainen?", "Onko sinä suomalainen?"], "Oletko sinä suomalainen?", "olet มี o → -ko"],
  ["เปลี่ยน 'Hän asuu Suomessa.' เป็นคำถาม", ["Asuukö hän Suomessa?", "Asunko hän Suomessa?", "Asuuko hän Suomessa?"], "Asuuko hän Suomessa?", "asuu มี u → -ko"],
  ["เปลี่ยน 'Sinä et puhu englantia.' เป็นคำถาม", ["Etko sinä puhu englantia?", "Etkö sinä puhu englantia?", "Eikö sinä puhu englantia?"], "Etkö sinä puhu englantia?", "et มี e → -kö (สระกลาง→หน้า)"],
  ["ภาษาพูด -ko/-kö มักย่อเป็น", ["-k", "-kos", "-ks"], "-ks", "เช่น Ooks sä suomalainen?"],
  ["ตอบรับ Asutko sinä Helsingissä?", ["Olen.", "Kyllä.", "Asun."], "Asun.", "ตอบด้วยกริยาเดียวกันผันตามผู้ตอบ"],
  ["ตอบปฏิเสธ Asutko sinä Helsingissä?", ["Ei.", "Emme.", "En."], "En.", "ผู้ตอบ minä → En."],
  ["ตอบรับ Puhutteko englantia? (เราตอบ)", ["Puhutte.", "Puhun.", "Puhumme."], "Puhumme.", "ผู้ตอบ me → Puhumme."],
  ["ตอบปฏิเสธ Puhutteko englantia? (เราตอบ)", ["Ette.", "Eivät.", "Emme."], "Emme.", "ผู้ตอบ me → Emme."],
  ["ตอบรับ Puhuuko hän suomea?", ["Puhun.", "Puhut.", "Puhuu."], "Puhuu.", "ถาม hän → ตอบรูป hän: Puhuu."],
  ["ตอบปฏิเสธ Puhuuko hän suomea?", ["En.", "Emme.", "Ei."], "Ei.", "hän → Ei."],
  ["vai กับ tai ต่างกันอย่างไร", ["ใช้แทนกันได้", "tai ใช้ในคำถาม", "vai ใช้ในคำถาม, tai ใช้ในบอกเล่า"], "vai ใช้ในคำถาม, tai ใช้ในบอกเล่า", "vai: -vat vai -vät?; tai: kahvia tai teetä"],
  ["คำถามฟินแลนด์ลงเสียงท้ายอย่างไร", ["เสียงขึ้นสูง (rising)", "เสียงคงที่", "เสียงลงต่ำ (falling)"], "เสียงลงต่ำ (falling)", "ทั้งบอกเล่าและคำถามใช้ falling intonation"],
  ["ลำดับหลักของคำถามเฉพาะคือ", ["subject + verb + question word", "verb + question word + subject", "question word + subject + verb"], "question word + subject + verb", "Kuka sinä olet? / Mitä kieltä te puhutte?"],
] as const;

function SectionQuiz({ items }: { items: readonly (readonly [string, readonly string[], string, string])[] }) {
  const [idx, setIdx] = useState(0), [ans, setAns] = useState(""), [sc, setSc] = useState(0), [done, setDone] = useState(false);
  const cur = items[idx];
  return <div className="section-quiz-wrap"><h3 className="section-quiz-heading">ทบทวนก่อนไปต่อ</h3>
    {done ? <div className="lesson-result"><span>✓</span><div><p>ทำครบแล้ว</p><b>{sc} / {items.length}</b><p>{sc >= Math.round(items.length * 0.8) ? "เข้าใจดีแล้ว ไปหมวดถัดไปได้เลย!" : "ลองทบทวนเนื้อหาด้านบนอีกครั้ง"}</p></div></div>
      : <><p className="section-quiz-progress">{idx + 1} / {items.length}</p><h4>{cur[0]}</h4><div className="lesson-answers">{cur[1].map(c => <button key={c} disabled={!!ans} className={ans ? c === cur[2] ? "correct" : c === ans ? "wrong" : "" : ""} onClick={() => { setAns(c); if (c === cur[2]) setSc(s => s + 1); }}>{c}</button>)}</div>
        {ans && <><div className="lesson-tip"><b>{ans === cur[2] ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{cur[3]}</p></div><button className="primary lesson-next" onClick={() => { if (idx === items.length - 1) setDone(true); else { setIdx(i => i + 1); setAns(""); } }}>ข้อถัดไป <ChevronRight /></button></>}</>}
  </div>;
}

const quiz = [
  // ── Alphabet & Sounds (Lesson 1) ──
  ["ตัวอักษรภาษาฟินแลนด์มีกี่ตัว?", ["26", "29", "32"], "29", "Finnish ใช้ 29 ตัว รวม Å, Ä และ Ö"],
  ["ตัว W เรียกว่าอะไรในภาษาฟินแลนด์?", ["wee", "kaksois-vee", "tupla-uu"], "kaksois-vee", "kaksois-vee แปลว่า double V"],
  ["tuuli แปลว่าอะไร?", ["ไฟ", "ลม", "สไตล์"], "ลม", "สระคู่ยาวขึ้น: tuli = ไฟ, tuuli = ลม"],
  ["matto แปลว่าอะไร?", ["หนอน", "พรม", "ด้าม"], "พรม", "พยัญชนะคู่เปลี่ยนความหมาย: mato = หนอน, matto = พรม"],
  ["กลุ่มสระหน้า (front vowels) คือชุดใด?", ["a, o, u", "ä, ö, y", "e, i, o"], "ä, ö, y", "สระหน้า: ä, ö, y · สระหลัง: a, o, u · สระกลาง: i, e"],
  ["การเน้นเสียง (stress) ในภาษาฟินแลนด์อยู่พยางค์ไหน?", ["พยางค์แรก", "พยางค์สุดท้าย", "พยางค์ที่สอง"], "พยางค์แรก", "Finnish stress ตกที่พยางค์แรกเสมอ"],
  // ── Phrases & Greetings (Lesson 1) ──
  ["Huomenta! แปลว่าอะไร?", ["อรุณสวัสดิ์", "ราตรีสวัสดิ์", "ยินดีต้อนรับ"], "อรุณสวัสดิ์", "Huomenta เป็นรูปสั้นของ Hyvää huomenta"],
  ["Hauska tutustua! แปลว่าอะไร?", ["ยินดีที่ได้รู้จัก", "เจอกันพรุ่งนี้", "ไม่เป็นไร"], "ยินดีที่ได้รู้จัก", "ตอบด้วย Kiitos samoin!"],
  ["ตอบ Hauska tutustua! ว่าอย่างไร?", ["Kiitos samoin!", "Hyvää yötä!", "Anteeksi!"], "Kiitos samoin!", "Kiitos samoin = ขอบคุณ เช่นกัน"],
  ["Mitä kuuluu? ถามเรื่องอะไร?", ["ชื่ออะไร", "สบายดีไหม", "อาศัยอยู่ที่ไหน"], "สบายดีไหม", "ตอบง่าย ๆ ว่า Hyvää, kiitos."],
  ["Ei kestä! แปลว่าอะไร?", ["ไม่เป็นไร (ด้วยความยินดี)", "ขอโทษ", "ขอบคุณ"], "ไม่เป็นไร (ด้วยความยินดี)", "ใช้ตอบ Kiitos! เหมือน You’re welcome"],
  ["Ei se mitään! ใช้ตอบประโยคใด?", ["Kiitos!", "Anteeksi!", "Hauska tutustua!"], "Anteeksi!", "Anteeksi = ขอโทษ → Ei se mitään = ไม่เป็นไร"],
  ["Hyvää ruokahalua! แปลว่าอะไร?", ["ทานให้อร่อย", "ชนแก้ว", "ขอบคุณสำหรับอาหาร"], "ทานให้อร่อย", "ruokahalua = ความอยากอาหาร; Kiitos ruoasta = ขอบคุณสำหรับอาหาร"],
  ["Nähdään huomenna! แปลว่าอะไร?", ["แล้วเจอกัน", "เจอกันพรุ่งนี้", "บ๊ายบาย"], "เจอกันพรุ่งนี้", "Nähdään = แล้วเจอกัน, huomenna = พรุ่งนี้"],
  ["Tervetuloa! แปลว่าอะไร?", ["ยินดีต้อนรับ", "ลาก่อน", "ขอบคุณ"], "ยินดีต้อนรับ", "Tervetuloa ใช้ต้อนรับผู้มาเยือน"],
  // ── Pronouns & Olla (Lesson 1, 2, 3) ──
  ["เติม: Minä ___ opiskelija.", ["olen", "olet", "on"], "olen", "Minä olen = ฉันเป็น"],
  ["เติม: Te ___ nyt kurssilla.", ["olemme", "olette", "ovat"], "olette", "Te olette = พวกคุณเป็น/อยู่"],
  ["he / ne ใช้ olla รูปใด?", ["on", "olemme", "ovat"], "ovat", "He ovat = พวกเขาเป็น"],
  ["รูปภาษาพูดของ me olemme คือ?", ["me ootte", "me ollaan", "ne on"], "me ollaan", "ภาษาพูดใช้ me ollaan"],
  ["รูปภาษาพูดของ minä olen คือ?", ["mä oon", "sä oot", "ne on"], "mä oon", "minä → mä, olen → oon"],
  ["ภาษาพูดใช้ se แทนสรรพนามใด?", ["minä", "sinä", "hän"], "hän", "ในภาษาพูด hän → se, he → ne"],
  // ── Vowel Harmony (Lesson 3) ──
  ["คำที่มีแค่ i/e เช่น kieli เลือก suffix ฝั่งใด?", ["ä/ö/y (สระหน้า)", "a/o/u (สระหลัง)", "ใช้ได้ทั้งสองฝั่ง"], "ä/ö/y (สระหน้า)", "สระกลาง i/e ล้วน ให้ใช้ suffix ฝั่งสระหน้า"],
  ["kurssi + ko/kö ได้คำใด?", ["kurssiko", "kurssikö", "kurssi-ko"], "kurssiko", "kurssi มี u ซึ่งเป็นสระหลัง จึงใช้ -ko"],
  ["คำประสม suklaajäätelö + ssa/ssä ได้คำใด?", ["suklaajäätelössä", "suklaajäätelössa", "suklaajäätelossa"], "suklaajäätelössä", "ดูส่วนท้าย jäätelö มี ä/ö จึงใช้ -ssä"],
  ["คำประสม jäätelökioski + lla/llä ได้คำใด?", ["jäätelökioskilla", "jäätelökioskillä", "jäätelökioskillla"], "jäätelökioskilla", "ดูส่วนท้าย kioski มี o จึงใช้ -lla"],
  ["’ใน Jyväskylä’ คือ?", ["Jyväskylässä", "Jyväskylassa", "Jyväskylästa"], "Jyväskylässä", "มี y/ä จึงใช้ -ssä"],
  ["คู่ suffix -sta/-stä ใช้บอกอะไร?", ["จาก", "ใน", "ที่/ด้วย"], "จาก", "-ssa/-ssä = ใน, -sta/-stä = จาก, -lla/-llä = ที่/ด้วย"],
  // ── Verb Conjugation (Lesson 3) ──
  ["he + puhua รูปภาษาเขียนคือ?", ["puhuvat", "puhumme", "puhutte"], "puhuvat", "he ใช้ -vat/-vät"],
  ["he + kysyä รูปภาษาเขียนคือ?", ["kysyvät", "kysymme", "kysytte"], "kysyvät", "kysyä มีสระหน้า จึงเป็น -vät"],
  ["hän + puhua ผันอย่างไร?", ["puhuu", "puhun", "puhut"], "puhuu", "hän ยืดสระท้ายของรากคำ: puhu → puhuu"],
  ["Te (สุภาพ) + puhua ผันอย่างไร?", ["puhutte", "puhuvat", "puhumme"], "puhutte", "Te สุภาพใช้ -tte เหมือน te"],
  ["ภาษาพูดของ me puhumme คือ?", ["me puhutaan", "me puhuu", "ne puhuu"], "me puhutaan", "ภาษาพูดของ me ใช้รูป passiivin: me puhutaan"],
  ["ภาษาพูดของ he puhuvat คือ?", ["ne puhuu", "ne puhutaan", "se puhuu"], "ne puhuu", "ภาษาพูด he → ne และใช้รูปบุรุษที่ 3 เอกพจน์"],
  // ── Negative Sentences (Lesson 3) ──
  ["ปฏิเสธ me + puhua คือ?", ["emme puhu", "ei puhu", "ette puhu"], "emme puhu", "กริยาปฏิเสธของ me คือ emme"],
  ["ปฏิเสธ hän + puhua คือ?", ["ei puhu", "en puhu", "et puhu"], "ei puhu", "กริยาปฏิเสธของ hän คือ ei"],
  ["ปฏิเสธ he + puhua คือ?", ["eivät puhu", "emme puhu", "ette puhu"], "eivät puhu", "กริยาปฏิเสธของ he คือ eivät"],
  ["ปฏิเสธ sinä + puhua ภาษาเขียนคือ?", ["et puhu", "ei puhu", "en puhu"], "et puhu", "กริยาปฏิเสธของ sinä คือ et"],
  ["กริยาหลักในปฏิเสธใช้รูปใด?", ["รูป stem (ไม่มี personal ending)", "รูปเดียวกับ minä", "infinitive"], "รูป stem (ไม่มี personal ending)", "เช่น et puhu ไม่ใช่ et puhun, ei asu ไม่ใช่ ei asuu"],
  // ── Yes/No Questions (Lesson 3) ──
  ["เปลี่ยน ‘Sinä olet suomalainen.’ เป็นคำถาม", ["Oletko sinä suomalainen?", "Oletkö sinä suomalainen?", "Onko sinä suomalainen?"], "Oletko sinä suomalainen?", "ย้ายกริยาไว้หน้าและเติม -ko; olet มี o (สระหลัง) จึงใช้ -ko"],
  ["เปลี่ยน ‘Hän asuu Suomessa.’ เป็นคำถาม", ["Asuuko hän Suomessa?", "Asuukö hän Suomessa?", "Asunko hän Suomessa?"], "Asuuko hän Suomessa?", "ย้ายกริยา asuu ไว้หน้าและเติม -ko; asuu มี u จึงใช้ -ko"],
  ["ภาษาพูด -ko/-kö มักย่อเป็นอะไร?", ["-ks", "-k", "-kos"], "-ks", "เช่น Ooks sä suomalainen? Asuuks se Suomessa?"],
  ["ตอบรับ Asutko sinä Helsingissä? ว่าอย่างไร?", ["Asun.", "Olen.", "Kyllä."], "Asun.", "ตอบด้วยการทวนกริยาที่ผันตามผู้ตอบ"],
  ["ตอบปฏิเสธ Puhutteko englantia?", ["Emme.", "Ette.", "Eivät."], "Emme.", "ผู้ตอบคือ me จึงตอบ Emme."],
  ["vai กับ tai ต่างกันอย่างไร?", ["vai ใช้ในคำถาม, tai ใช้ในบอกเล่า", "vai ใช้ในบอกเล่า, tai ใช้ในคำถาม", "ใช้แทนกันได้"], "vai ใช้ในคำถาม, tai ใช้ในบอกเล่า", "vai = หรือ (เลือก A หรือ B ในคำถาม), tai = หรือ (ในบอกเล่า)"],
  // ── Question Words (Lesson 3) ──
  ["คำถาม ‘ใคร’ ใช้คำใด?", ["kuka", "mikä", "missä"], "kuka", "Kuka sinä olet? = คุณคือใคร"],
  ["mikä กับ mitä ต่างกันอย่างไร?", ["mikä คู่กับ olla, mitä คู่กับกริยาอื่น", "ใช้แทนกันได้", "mikä ถามคน, mitä ถามของ"], "mikä คู่กับ olla, mitä คู่กับกริยาอื่น", "Mikä tämä on? vs Mitä sinä opiskelet?"],
  ["ถาม ‘เมื่อไร’ ใช้คำใด?", ["milloin", "missä", "miksi"], "milloin", "Milloin kurssi on? = คอร์สเมื่อไร"],
  ["ถาม ‘จากที่ไหน’ ใช้คำใด?", ["mistä", "missä", "mihin"], "mistä", "missä=ที่ไหน, mistä=จากไหน, mihin=ไปไหน"],
  ["ถาม ‘ไปที่ไหน’ ใช้คำใด?", ["mihin", "missä", "mistä"], "mihin", "Mihin sinä menet? = คุณไปไหน"],
  ["ถาม ‘ทำไม’ ใช้คำใด?", ["miksi", "mitä", "milloin"], "miksi", "Miksi et osta jäätelöä? = ทำไมไม่ซื้อไอศกรีม; ตอบด้วย Koska…"],
  ["ถาม ‘สัญชาติอะไร’ ใช้คำใด?", ["minkämaalainen", "mistä", "kuka"], "minkämaalainen", "Minkämaalainen Pedro on? = Pedro สัญชาติอะไร"],
  ["ถาม ‘อย่างไร/เท่าไร’ ใช้คำใด?", ["kuinka", "mikä", "missä"], "kuinka", "Kuinka vanha sinä olet? = คุณอายุเท่าไร"],
  // ── Days & Time (Lesson 2, 3) ──
  ["’ในวันพุธ’ ใช้รูปใด?", ["keskiviikkona", "keskiviikko", "keskiviikossa"], "keskiviikkona", "วันในความหมาย ‘ในวัน…’ ใช้ -na/-nä"],
  ["torstai คือวันอะไร?", ["วันพุธ", "วันพฤหัสบดี", "วันเสาร์"], "วันพฤหัสบดี", "torstai = Thursday"],
  ["ylihuomenna แปลว่าอะไร?", ["เมื่อวานซืน", "พรุ่งนี้", "มะรืน"], "มะรืน", "huomenna = พรุ่งนี้, ylihuomenna = มะรืน"],
  ["toissapäivänä แปลว่าอะไร?", ["เมื่อวานซืน", "สัปดาห์ที่แล้ว", "มะรืน"], "เมื่อวานซืน", "toissapäivänä = วันก่อนเมื่อวาน"],
  ["viime viikolla แปลว่าอะไร?", ["สัปดาห์ที่แล้ว", "สัปดาห์นี้", "สัปดาห์หน้า"], "สัปดาห์ที่แล้ว", "viime = ที่แล้ว, tällä = นี้, ensi = หน้า"],
  ["Mikä päivä tänään on? เป็นคำถามชนิดใด?", ["ถามว่าวันนี้วันอะไร", "ถามว่าวันไหนมีคอร์ส", "ถามว่าเมื่อไร"], "ถามว่าวันนี้วันอะไร", "ตอบ: Tänään on maanantai. คำตอบใช้รูปพื้นฐานไม่เติม -na"],
  // ── Numbers (Lesson 2) ──
  ["20 ในภาษาฟินแลนด์คือ?", ["kaksitoista", "kaksikymmentä", "kaksisataa"], "kaksikymmentä", "สองสิบ = kaksi + kymmentä"],
  ["23 เขียนอย่างไร?", ["kaksitoistakolme", "kaksikymmentäkolme", "kolmekymmentäkaksi"], "kaksikymmentäkolme", "20 + 3 ต่อกันเป็นคำเดียว"],
  ["เลข 11–19 ใช้หลักอะไร?", ["เลข + toista", "เลข + kymmentä", "เลข + sataa"], "เลข + toista", "เช่น yksitoista = 11, kaksitoista = 12"],
  ["200 คือ?", ["kaksisataa", "satakaksi", "kaksi sataa"], "kaksisataa", "ตั้งแต่ 2 ร้อยใช้ partitive: kaksisataa"],
  ["2000 คือ?", ["kaksituhatta", "kaksi tuhatta", "tuhat kaksi"], "kaksituhatta", "partitive ของ tuhat คือ tuhatta"],
  ["Kuinka vanha sinä olet? ถามเรื่องอะไร?", ["อายุ", "ส่วนสูง", "น้ำหนัก"], "อายุ", "ตอบ: Olen 23 vuotta vanha. (vuotta = ปี รูป partitive)"],
  // ── Countries, Nationality, Language (Lesson 3 & Test 1) ──
  ["olla kotoisin ใช้คู่กับ case ใด?", ["-sta/-stä (จาก)", "-ssa/-ssä (ใน)", "-lla/-llä (ที่)"], "-sta/-stä (จาก)", "Olen kotoisin Suomesta. = ฉันมาจากฟินแลนด์"],
  ["Venäjä (รัสเซีย) เป็นข้อยกเว้น ใช้อะไรแทน -sta/-stä?", ["Venäjältä", "Venäjästä", "Venäjässä"], "Venäjältä", "Venäjä ใช้ Venäjältä แทนที่จะเป็น Venäjästä"],
  ["คำต่อท้ายสัญชาติมักลงท้ายว่าอะไร?", ["-lainen/-läinen", "-nen/-nen", "-ssa/-ssä"], "-lainen/-läinen", "suomalainen, thaimaalainen, brasilialainen"],
  ["ชื่อประเทศขึ้นต้นตัวใหญ่ แล้วสัญชาติล่ะ?", ["ตัวเล็ก", "ตัวใหญ่", "แล้วแต่"], "ตัวเล็ก", "Suomi (ประเทศ) vs suomalainen (สัญชาติ ตัวเล็ก)"],
  ["’ฉันพูดภาษาไทย’ คือ?", ["Puhun thaita.", "Puhun thai.", "Puhun thaia."], "Puhun thaita.", "ภาษาหลัง puhua ใช้ partitive: thaita, suomea, venäjää"],
  ["Minun äidinkieleni on englanti. แปลว่า?", ["ภาษาแม่ของฉันคืออังกฤษ", "ฉันพูดอังกฤษ", "ฉันเรียนอังกฤษ"], "ภาษาแม่ของฉันคืออังกฤษ", "äidinkieli = ภาษาแม่; äidinkieleni = ภาษาแม่ของฉัน"],
  // ── Dialogues & Book Content (Test 1) ──
  ["’ที่นี่มีคอร์สภาษาฟินแลนด์ไหม’ คือ?", ["Onko täällä suomen kurssi?", "Missä suomen kurssi on?", "Mikä suomen kurssi?"], "Onko täällä suomen kurssi?", "yes/no question: เติม -ko ที่กริยา on → onko"],
  ["’ที่นั่งนี้ว่างไหม’ คือ?", ["Onko tämä paikka vapaa?", "Missä paikka on?", "Tämä paikka on vapaa."], "Onko tämä paikka vapaa?", "onko + tämä paikka + vapaa? คำถาม yes/no"],
  ["’สะกดอย่างไร’ คือ?", ["Miten se kirjoitetaan?", "Mikä sinun nimi on?", "Missä se on?"], "Miten se kirjoitetaan?", "Alex ถามครูว่าสะกดชื่อยังไง"],
  ["Olga ไม่ซื้อไอศกรีมเพราะอะไร?", ["เธอเก็บเงิน (säästää rahaa)", "เธอไม่ชอบ", "เธอไม่มีเงิน"], "เธอเก็บเงิน (säästää rahaa)", "Olga ei osta jäätelöä, koska hän säästää rahaa."],
  ["Pedro มาจากประเทศอะไร?", ["Brasilia", "Venäjä", "Etelä-Afrikka"], "Brasilia", "Pedro on brasilialainen, kotoisin São Paulosta Brasiliasta"],
  // ── Spoken Language / Kiosk (Test 1 p.33) ──
  ["jätski เป็นภาษาพูดของคำใด?", ["jäätelö", "juusto", "joki"], "jäätelö", "jätski (พูด) = jäätelö (เขียน) = ไอศกรีม"],
  ["mä เป็นภาษาพูดของสรรพนามใด?", ["minä", "sinä", "hän"], "minä", "minä → mä, sinä → sä"],
  ["kiitti เป็นภาษาพูดของคำใด?", ["kiitos", "kiva", "kieli"], "kiitos", "kiitti = kiitos = ขอบคุณ"],
  ["Tuleeks muuta? แปลว่าอะไร?", ["รับอย่างอื่นอีกไหม", "มารึยัง", "ใช่ไหม"], "รับอย่างอื่นอีกไหม", "tuleeks = tuleeko + ks; muuta = อย่างอื่น"],
  // ── Grammar from Dialogues ──
  ["Minulle kuuluu hyvää. แปลว่า?", ["ฉันสบายดี", "ฉันเรียนเก่ง", "ฉันชอบ"], "ฉันสบายดี", "ตอบคำถาม Mitä sinulle kuuluu? / Mitä kuuluu?"],
  ["’ไม่ได้…แต่…’ ใช้โครงสร้างใด?", ["ei … vaan …", "ei … ja …", "ei … tai …"], "ei … vaan …", "En asu Helsingissä vaan Espoossa. = ไม่ได้อยู่ Helsinki แต่อยู่ Espoo"],
  ["’โดยรถเมล์’ ใช้คำใด?", ["bussilla", "bussissa", "bussista"], "bussilla", "พาหนะ + -lla/-llä: bussilla, metrolla, autolla"],
  // ── Intonation ──
  ["คำถามภาษาฟินแลนด์ลงเสียงท้ายประโยคอย่างไร?", ["เสียงลงต่ำ (falling)", "เสียงขึ้นสูง (rising)", "เสียงคงที่"], "เสียงลงต่ำ (falling)", "ทั้งประโยคบอกเล่าและคำถามลงเสียงต่ำท้ายประโยค ไม่ตวัดสูงแบบอังกฤษ"],
  // ── Culture ──
  ["sisu หมายถึงอะไร?", ["ความมุ่งมั่น อดทน ไม่ยอมแพ้", "คำทักทาย", "อาหารฟินแลนด์"], "ความมุ่งมั่น อดทน ไม่ยอมแพ้", "sisu = willpower and determination โดยเฉพาะเมื่อเผชิญความยากลำบาก"],
  // ── Written vs Spoken Summary (Lesson 1) ──
  ["Haluatko sinä? ภาษาพูดคือ?", ["Haluuksä?", "Haluutko sä?", "Haluatko sä?"], "Haluuksä?", "Haluatko sinä? → Haluuksä? (ย่อรวมกริยา+สรรพนาม)"],
  ["kaksikymmentäyksi ภาษาพูดอาจย่อเป็น?", ["kakskytyks", "kaksikymmentyks", "kakskymmentä"], "kakskytyks", "ภาษาพูดย่อตัวเลขให้สั้นลง"],
  // ── Mixed Application ──
  ["’Suomi’ ในภาษาอังกฤษคือประเทศอะไร?", ["Finland", "Sweden", "Germany"], "Finland", "Suomi = Finland, Ruotsi = Sweden, Saksa = Germany"],
  ["ตอบรับ Oletko opiskelija? ว่าอย่างไร?", ["Olen.", "Kyllä olen.", "ทั้งสองข้อถูก"], "ทั้งสองข้อถูก", "ตอบสั้นด้วยกริยา Olen. หรือ Kyllä olen. ก็ได้"],
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
      <SectionQuiz items={textsQuiz} />
      <button className="primary lesson-next" onClick={() => go("phrases")}>ต่อไป: วลี <ChevronRight /></button></div>}
    {step === "phrases" && <div className="lesson-panel">{title("BOOK PAGES 12–13", "Fraasit · วลีสำคัญ", "จำทั้งสถานการณ์และระดับความเป็นทางการ คำสั้นมักใช้กันเอง")}
      <div className="useful-grid">{phrases.map(([fi, th]) => <article key={fi}><Finnish text={fi} /><span>{th}</span></article>)}</div>
      <div className="lesson-tip"><b>คู่ตอบที่ควรจำ</b><p>Hauska tutustua! → Kiitos samoin! · Kiitos! → Ole hyvä! / Ei kestä! · Anteeksi! → Ei se mitään!</p></div>
      <SectionQuiz items={phrasesQuiz} />
      <button className="primary lesson-next" onClick={() => go("days")}>ต่อไป: วัน <ChevronRight /></button></div>}
    {step === "days" && <div className="lesson-panel">{title("BOOK PAGE 14", "Viikonpäivät · วันในสัปดาห์", "คำตอบ Mikä päivä tänään on? ใช้รูปพื้นฐาน แต่คำตอบ Milloin? ใช้ -na/-nä")}
      <Table headers={["วัน", "ตัวย่อ", "เมื่อไร / ในวัน…", "ไทย"]} rows={days} audio={[0, 2]} />
      <div className="timeline-grid">{timeline.map(([fi, th]) => <div key={fi}><Finnish text={fi} /><span>{th}</span></div>)}</div>
      <div className="answer-pairs"><article><Finnish text="Mikä päivä tänään on?" /><p>Tänään on maanantai. = วันนี้คือวันจันทร์</p></article><article><Finnish text="Milloin kurssi on?" /><p>Kurssi on maanantaina. = คอร์สเรียนวันจันทร์</p></article></div>
      <SectionQuiz items={daysQuiz} />
      <button className="primary lesson-next" onClick={() => go("numbers")}>ต่อไป: ตัวเลข <ChevronRight /></button></div>}
    {step === "numbers" && <div className="lesson-panel">{title("BOOK PAGE 15", "Numerot · ตัวเลข", "เลขฟินแลนด์เขียนส่วนประกอบติดกัน ยกเว้นจำนวนที่ใช้ล้านและพันล้าน")}
      <div className="test1-number-grid">{numbers.map(([n, fi]) => <article key={n}><b>{n}</b><Finnish text={fi} /></article>)}</div>
      <div className="lesson-tip"><b>สูตรออกสอบ</b><p>11–19 = เลข + toista · 20, 30… = เลข + kymmentä · 21 = kaksikymmentäyksi · ตั้งแต่ 2 ร้อย/พัน/ล้านใช้รูป partitive เช่น kaksisataa, kaksituhatta, kaksi miljoonaa</p></div><div className="answer-pairs"><article><Finnish text="Kuinka vanha sinä olet?" /><p>ถามอายุ: คุณอายุเท่าไร</p></article><article><Finnish text="Olen 23 vuotta vanha." /><p>ฉันอายุ 23 ปี; vuotta เป็น partitive</p></article></div>
      <SectionQuiz items={numbersQuiz} />
      <button className="primary lesson-next" onClick={() => go("pronouns")}>ต่อไป: สรรพนามและ olla <ChevronRight /></button></div>}
    {step === "pronouns" && <div className="lesson-panel">{title("BOOK PAGE 16", "Persoonapronominit ja olla-verbi", "olla หมายถึง เป็น / อยู่ / คือ และต้องผันให้ตรงกับประธาน")}
      <Table headers={["สรรพนาม", "ภาษาเขียน", "ภาษาพูด", "ความหมาย"]} rows={olla} audio={[0, 1, 2]} />
      <div className="lesson-tip"><b>จุดสำคัญ</b><p>hän ใช้กับคนในภาษาเขียน แต่ภาษาพูดมักใช้ se · he เปลี่ยนเป็น ne · รูปสุภาพ Te ใช้กริยา olette และเขียนตัวใหญ่เมื่อต้องการเน้นความสุภาพ</p></div><div className="answer-pairs"><article><Finnish text="Minä olen opiskelija." /><p>ฉันเป็นนักเรียน</p></article><article><Finnish text="Me olemme Suomessa." /><p>พวกเราอยู่ในฟินแลนด์</p></article></div>
      <SectionQuiz items={pronounsQuiz} />
      <button className="primary lesson-next" onClick={() => go("harmony")}>ต่อไป: vowel harmony <ChevronRight /></button></div>}
    {step === "harmony" && <div className="lesson-panel">{title("BOOK PAGE 17", "Vokaaliharmonia · Vowel harmony", "ดูสระในคำเพื่อเลือก suffix คู่ a/ä, o/ö และ u/y")}
      <div className="vowel-groups"><article className="back"><b>a · o · u</b><span>สระหลัง</span><p>auto, tutustua, hauska → -ssa, -vat, -ko</p></article><article className="neutral"><b>i · e</b><span>สระกลาง</span><p>อยู่ร่วมได้ทั้งสองฝั่ง; ถ้ามีแค่ i/e ให้เลือก suffix ฝั่งสระหน้า</p></article><article className="front"><b>ä · ö · y</b><span>สระหน้า</span><p>hyvä, säästää, yö → -ssä, -vät, -kö</p></article></div>
      <div className="example-flow"><article><Finnish text="auto" /><span>+ ssa →</span><Finnish text="autossa" /></article><article><Finnish text="hyvä" /><span>+ ssä →</span><Finnish text="hyvässä" /></article><article><Finnish text="kurssi" /><span>+ ko →</span><Finnish text="kurssiko" /></article><article><Finnish text="kieli" /><span>+ kö →</span><Finnish text="kielikö" /></article></div>
      <h3>คำประสม: ดูเฉพาะส่วนท้ายของคำ</h3><div className="answer-pairs"><article><Finnish text="suklaajäätelössä" /><p>suklaa + jäätelö + ssä: ส่วนท้าย jäätelö มี ä/ö</p></article><article><Finnish text="jäätelökioskilla" /><p>jäätelö + kioski + lla: ส่วนท้าย kioski มี o จึงใช้ -lla</p></article></div>
      <SectionQuiz items={harmonyQuiz} />
      <button className="primary lesson-next" onClick={() => go("verbs")}>ต่อไป: การผันกริยา <ChevronRight /></button></div>}
    {step === "verbs" && <div className="lesson-panel">{title("BOOK PAGE 37", "Verbin persoonataivutus", "ตัด -a/-ä จาก infinitive แบบ puhua/kysyä แล้วเติม personal ending")}
      <Table headers={["ประธาน", "puhua", "kysyä", "คำลงท้าย"]} rows={conjugation} audio={[0, 1, 2]} />
      <div className="lesson-tip"><b>ภาษาพูด</b><p>mä puhun · sä puhut · se puhuu · me puhutaan · te puhutte · ne puhuu — ภาษาพูดของ me และ ne ไม่ได้ตามตารางภาษาเขียนตรง ๆ</p></div>
      <h3>Negatiivinen lause · ประโยคปฏิเสธ</h3><p>ผันกริยาปฏิเสธ en/et/ei/emme/ette/eivät แล้วใช้กริยาหลักรูป stem ที่ไม่มี personal ending</p><Table headers={["ประธาน", "กริยาปฏิเสธ", "ภาษาเขียน", "ภาษาพูด"]} rows={negatives} audio={[0, 1, 2, 3]} />
      <div className="formula"><b>minä puhun</b><span>→</span><b>minä en puhu</b></div>
      <SectionQuiz items={verbsQuiz} />
      <button className="primary lesson-next" onClick={() => go("questions")}>ต่อไป: คำถาม <ChevronRight /></button></div>}
    {step === "questions" && <div className="lesson-panel">{title("BOOK PAGES 38–39", "Kysymys · การสร้างคำถาม", "มี special questions ที่ขึ้นต้นด้วยคำถาม และ yes/no questions ที่เติม -ko/-kö")}
      <h3>1. Special question · คำถามเฉพาะ</h3><p>ลำดับหลักคือ <b>question word + subject + verb</b>: Kuka sinä olet? / Mitä kieltä te puhutte?</p><Table headers={["คำถาม", "ความหมาย", "ตัวอย่าง", "คำตอบ"]} rows={questionWords} audio={[0, 2, 3]} />
      <h3>2. Yes / no question · ko/kö-kysymys</h3><div className="transform-list"><article><Finnish text="Sinä olet suomalainen." /><span>→</span><Finnish text="Oletko sinä suomalainen?" /></article><article><Finnish text="Hän asuu Suomessa." /><span>→</span><Finnish text="Asuuko hän Suomessa?" /></article><article><Finnish text="Sinä et puhu englantia." /><span>→</span><Finnish text="Etkö sinä puhu englantia?" /></article></div>
      <div className="lesson-tip"><b>วิธีตอบสั้น</b><p>ตอบด้วยกริยาที่ผันตามผู้ตอบ: Asutko sinä Helsingissä? → Asun. / En. · Puhutteko englantia? → Puhumme. / Emme. ห้ามตอบ pelkkä kyllä ถ้าข้อสอบต้องการรูปกริยา</p></div>
      <h3>ภาษาพูดและ intonation</h3><div className="lesson3-chip-grid"><Finnish text="Ooks sä suomalainen?" /><Finnish text="Asuuks se Suomessa?" /><Finnish text="Eks sä puhu englantia?" /></div><p><b>คำถามฟินแลนด์ลงเสียงต่ำท้ายประโยค</b> เช่นเดียวกับประโยคบอกเล่า ไม่ยกเสียงท้ายแบบภาษาอังกฤษ</p>
      <SectionQuiz items={questionsQuiz} />
      <button className="primary lesson-next" onClick={() => go("check")}>ทำแบบทดสอบ <ChevronRight /></button></div>}
    {step === "check" && <div className="lesson-panel quiz-panel"><span className="kicker">TEST 1 · KNOWLEDGE CHECK</span><h2>ลองทำก่อนเข้าสอบ</h2>{finished ? <div className="lesson-result"><span>✓</span><div><p>จบบททบทวนแล้ว</p><b>{score} / {quiz.length}</b><p>{score >= Math.round(quiz.length * 0.8) ? "Hienoa! พร้อมสำหรับ Test 1" : "ทบทวนแท็บที่ยังไม่มั่นใจแล้วลองใหม่"}</p></div></div> : <><p>คำถาม {index + 1} จาก {quiz.length}</p><h3>{q[0]}</h3><div className="lesson-answers">{q[1].map(choice => <button key={choice} disabled={!!answer} className={answer ? choice === q[2] ? "correct" : choice === answer ? "wrong" : "" : ""} onClick={() => { setAnswer(choice); if (choice === q[2]) setScore(s => s + 1); }}>{choice}</button>)}</div>{answer && <><div className="lesson-tip"><b>{answer === q[2] ? "Oikein! ถูกต้อง" : "ยังไม่ถูก"}</b><p>{q[3]}</p></div><button className="primary lesson-next" onClick={() => { if (index === quiz.length - 1) { setFinished(true); finish("check"); } else { setIndex(i => i + 1); setAnswer(""); window.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); } }}>คำถามถัดไป <ChevronRight /></button></>}</>}</div>}
  </section>;
}
