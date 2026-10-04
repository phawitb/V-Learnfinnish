// Page numbers below are the printed sivu numbers, visually verified in the supplied scan.
export const bookPages = [
  { printed: 60, filePage: 59, title: 'Millainen? — คำคุณศัพท์' },
  { printed: 61, filePage: 60, title: 'Sää — สภาพอากาศ' },
  { printed: 62, filePage: 61, title: 'ฤดู เดือน ช่วงเวลา และวันในสัปดาห์' },
  { printed: 73, filePage: 72, title: 'Harjoitus 9 A–B' },
  { printed: 75, filePage: 74, title: 'Harjoitus 12' },
  { printed: 81, filePage: 80, title: 'Harjoitus 23' },
  { printed: 331, filePage: 330, title: 'เฉลย Harjoitus 9, 12, 23' },
];
export const adjectivePairs = [
  ['hyvä', 'ดี', 'huono', 'ไม่ดี / แย่'], ['kuuma', 'ร้อน', 'kylmä', 'เย็น / หนาว'],
  ['vaikea', 'ยาก', 'helppo', 'ง่าย'], ['pieni', 'เล็ก', 'iso / suuri', 'ใหญ่'],
  ['uusi', 'ใหม่', 'vanha', 'เก่า / แก่'], ['kaunis', 'สวย', 'ruma', 'น่าเกลียด'],
  ['lämmin', 'อบอุ่น', 'viileä', 'เย็นสบาย / เย็นนิด ๆ'], ['valoisa', 'สว่าง', 'pimeä', 'มืด'],
  ['lyhyt', 'สั้น', 'pitkä', 'ยาว / สูง'], ['paljon', 'มาก', 'vähän', 'น้อย'],
];
export const bookWeather = [
  ['Millainen sää/ilma tänään on?', 'วันนี้สภาพอากาศเป็นอย่างไร?'],
  ['On kaunis/hyvä ilma.', 'อากาศดี'], ['On huono ilma.', 'อากาศไม่ดี'],
  ['Kuinka monta astetta ulkona on?', 'ข้างนอกอุณหภูมิกี่องศา?'],
  ['On +30 astetta. On kuuma. On helle.', '30 องศาเหนือศูนย์ อากาศร้อน / ร้อนจัด'],
  ['On +20 astetta. On lämmin.', '20 องศาเหนือศูนย์ อากาศอบอุ่น'],
  ['On +2 astetta. On viileä.', '2 องศาเหนือศูนย์ อากาศเย็น — คำบรรยายตามตัวอย่างในหนังสือ'],
  ['On -15 astetta. On kylmä. On pakkasta.', '15 องศาต่ำกว่าศูนย์ อากาศหนาวและต่ำกว่าจุดเยือกแข็ง'],
  ['Aurinko paistaa. On aurinkoista.', 'พระอาทิตย์ส่องแสง / มีแดด'],
  ['On pilvistä.', 'มีเมฆมาก'], ['On puolipilvistä.', 'มีเมฆบางส่วน'],
  ['On sumuista.', 'มีหมอก'], ['Sataa. On sateista.', 'ฝนตก / อากาศมีฝน'],
  ['Sataa räntää.', 'ฝนปนหิมะตก'], ['Sataa lunta.', 'หิมะตก'],
  ['Tuulee. On tuulista. On myrsky.', 'ลมพัด / มีลม / มีพายุ (ความแรงต่างกัน)'],
  ['On ukkonen.', 'มีพายุฝนฟ้าคะนอง'],
];
export const weatherDialogues = [
  [['Uh, onpa kamala ilma tänään!', 'เฮ้อ วันนี้อากาศแย่จัง!'], ['No niin on!', 'นั่นสิ เป็นอย่างนั้นจริง ๆ!']],
  [['Ihanaa, että aurinko paistaa!', 'ดีจังที่พระอาทิตย์ส่องแสง!'], ['Joo, ja on tosi lämmin!', 'ใช่ แล้วก็อุ่นมากเลย!']],
];
export const weekdays = [
  ['maanantai', 'maanantaina', 'วันจันทร์'], ['tiistai', 'tiistaina', 'วันอังคาร'],
  ['keskiviikko', 'keskiviikkona', 'วันพุธ'], ['torstai', 'torstaina', 'วันพฤหัสบดี'],
  ['perjantai', 'perjantaina', 'วันศุกร์'], ['lauantai', 'lauantaina', 'วันเสาร์'], ['sunnuntai', 'sunnuntaina', 'วันอาทิตย์'],
];
export const exercise9Bank = ['ruma', 'lämmin', 'vanha', 'vaikea', 'valoisa', 'iso', 'kaunis', 'uusi', 'helppo', 'lyhyt', 'huono', 'viileä', 'pieni', 'pimeä', 'hyvä', 'paljon', 'vähän', 'pitkä'];
export const exercise9A = [
  ['ruma', 'kaunis', 'น่าเกลียด ↔ สวย'], ['uusi', 'vanha', 'ใหม่ ↔ เก่า'], ['hyvä', 'huono', 'ดี ↔ ไม่ดี'],
  ['lämmin', 'viileä', 'อบอุ่น ↔ เย็นสบาย'], ['helppo', 'vaikea', 'ง่าย ↔ ยาก'], ['paljon', 'vähän', 'มาก ↔ น้อย'],
  ['lyhyt', 'pitkä', 'สั้น ↔ ยาว'], ['valoisa', 'pimeä', 'สว่าง ↔ มืด'], ['iso', 'pieni', 'ใหญ่ ↔ เล็ก'],
];
export const exercise9B = [
  { prompt: 'Saunassa on ___.', th: 'ในซาวน่าอากาศ…', answer: 'kuuma', note: 'ตัวอย่างที่หนังสือเติมไว้ให้: kuuma = ร้อน' },
  { prompt: 'Kesällä Suomessa yö on ___.', th: 'ในฤดูร้อน กลางคืนในฟินแลนด์…', answer: 'valoisa / lämmin / kaunis', note: 'ท้ายเล่มยอมรับ 3 คำ: สว่าง / อบอุ่น / สวย เลือกคำใดคำหนึ่งที่อธิบายประโยคนี้ได้' },
  { prompt: 'Tänään on +25 astetta ja aurinko paistaa. On ___ ilma!', th: 'วันนี้ 25 องศาและพระอาทิตย์ส่องแสง อากาศ…!', answer: 'kaunis / lämmin / hyvä', note: 'ท้ายเล่มยอมรับ kaunis, lämmin หรือ hyvä: อากาศดี / อุ่น / ดี' },
  { prompt: 'Ulkona sataa ja tuulee. On ___ ilma.', th: 'ข้างนอกฝนตกและลมพัด อากาศ…', answer: 'huono', note: 'huono ilma = อากาศไม่ดี' },
  { prompt: 'Voitko auttaa minua? Harjoitus on vähän ___.', th: 'ช่วยฉันได้ไหม? แบบฝึกนี้…นิดหน่อย', answer: 'vaikea', note: 'vähän vaikea = ยากนิดหน่อย; Voitko auttaa minua? = ช่วยฉันได้ไหม?' },
  { prompt: 'Meidän koti on ___.', th: 'บ้านของพวกเรา…', answer: 'kiva', note: 'เฉลยท้ายเล่มให้ kiva = ดี / น่าอยู่ / น่ารัก เป็นคำที่เพิ่มจากรายการหน้า 60 ประโยคนี้เป็นปลายเปิด จึงอาจใช้คำบรรยายบ้านอื่นที่เหมาะสมได้' },
  { prompt: 'Suomessa Helsinki on ___ kaupunki ja Ähtäri on ___ kaupunki.', th: 'ในฟินแลนด์ เฮลซิงกิเป็นเมือง… และแอห์แตริเป็นเมือง…', answer: 'iso, pieni', note: 'เติมตามลำดับ: iso = ใหญ่, pieni = เล็ก' },
  { prompt: 'Vokaali a on ___ ja aa on ___.', th: 'สระ a เป็นเสียง… ส่วน aa เป็นเสียง…', answer: 'lyhyt, pitkä', note: 'a = สระสั้น; aa = สระยาว การเขียนสระซ้ำเปลี่ยนความยาวเสียง ไม่ใช่การเน้นเสียง' },
];
export const exercise12Bank = [
  'Sataa.', 'Aurinko paistaa.', 'Tuulee.', 'On ukkonen.', 'Sataa lunta.',
  'On kuuma.', 'On huono ilma.', 'On puolipilvistä.', 'On pakkasta.', 'On kylmä.', 'On kaunis ilma.', 'On viileä.',
];
export const exercise12 = [
  { picture: 'คนพักบนชายหาด มีพระอาทิตย์', answer: 'Aurinko paistaa. On kuuma. On kaunis ilma.', th: 'พระอาทิตย์ส่องแสง อากาศร้อน อากาศดี', note: 'Aurinko paistaa. เป็นตัวอย่างที่เติมไว้แล้วในภาพ 1 ให้เติมอีกสองประโยคด้วย' },
  { picture: 'เด็กกับกระท่อมหิมะ มีเกล็ดหิมะตก', answer: 'Sataa lunta. On pakkasta. On kylmä.', th: 'หิมะตก อุณหภูมิต่ำกว่าศูนย์ อากาศหนาว', note: 'ภาพนี้มีหิมะกำลังตก จึงใช้ Sataa lunta. ได้' },
  { picture: 'คนถือร่มใต้ฝนและฟ้าแลบ', answer: 'Sataa. On ukkonen. On huono ilma.', th: 'ฝนตก มีพายุฟ้าคะนอง อากาศไม่ดี', note: 'ukkonen = พายุฝนฟ้าคะนอง ใช้คู่กับ On' },
  { picture: 'คนพันผ้าพันคอ ลมพัดใบไม้ มีแดดกับเมฆ', answer: 'Tuulee. On puolipilvistä. On viileä.', th: 'ลมพัด มีเมฆบางส่วน อากาศเย็น', note: 'ใช้ viileä ตามรูปคำที่โจทย์และเฉลยพิมพ์ไว้; puolipilvistä คือมีเมฆบางส่วน' },
];
export const exercise23 = [
  { question: 'Mitä Paula tekee viikonloppuna?', th: 'Paula ทำอะไรในช่วงสุดสัปดาห์?', verbs: 'soittaa pianoa / lähteä matkalle', picture: 'Paula ลากกระเป๋าเดินทาง', answers: ['Viikonloppuna Paula ei soita pianoa.', 'Viikonloppuna Paula lähtee matkalle.'], meaning: 'ช่วงสุดสัปดาห์ Paula ไม่เล่นเปียโน แต่เธอออกเดินทาง', note: 'Paula = hän: ei + soita (tt → t) ส่วนบอกเล่า lähtee ยังคง ht ในรูป hän; matkalle = ออกเดินทาง' },
  { question: 'Mitä lapset tekevät koulussa?', th: 'เด็ก ๆ ทำอะไรที่โรงเรียน?', verbs: 'kirjoittaa / nukkua', picture: 'เด็กนั่งเขียนหนังสือที่โต๊ะเรียน', answers: ['Koulussa lapset kirjoittavat.', 'Koulussa lapset eivät nuku.'], meaning: 'ที่โรงเรียนเด็ก ๆ เขียนหนังสือ พวกเขาไม่ได้นอน', note: 'lapset = he: kirjoittavat ใช้ tt; ปฏิเสธ eivät nuku ใช้ kk → k' },
  { question: 'Mitä sinä teet illalla?', th: 'คุณทำอะไรในตอนเย็น?', verbs: 'lukea kirjaa / kylpeä', picture: 'คนกำลังแช่น้ำในอ่าง', answers: ['Illalla minä en lue kirjaa.', 'Illalla minä kylven.'], meaning: 'ตอนเย็นฉันไม่อ่านหนังสือ ฉันอาบน้ำแช่อ่าง', note: 'ถาม sinä แต่ตอบ minä: en lue (k หายไป), kylven (p → v); kirjaa = หนังสือ รูป partitive' },
  { question: 'Mitä te teette mökillä?', th: 'พวกคุณทำอะไรที่บ้านพักตากอากาศ?', verbs: 'kirjoittaa sähköpostia / onkia', picture: 'คนสองคนกำลังตกปลา', answers: ['Mökillä me emme kirjoita sähköpostia.', 'Mökillä me ongimme.'], meaning: 'ที่บ้านพักตากอากาศพวกเราไม่เขียนอีเมล พวกเราตกปลา', note: 'ถาม te แต่ตอบ me: emme kirjoita (tt → t), ongimme (nk → ng); sähköpostia = อีเมล รูป partitive' },
];
export const kptVerbs = [
  ['hiihtää', 'hiihdän', 'emme hiihdä', 'ht → hd · เล่นสกี'], ['yöpyä', 'yövyn', 'yövymme', 'p → v · พักค้างคืน'],
  ['soittaa', 'soitan', 'ei soita', 'tt → t · เล่นเครื่องดนตรี / โทร'], ['lähteä', 'lähden', 'hän lähtee', 'ht → hd ในรูป minä; hän คง ht · ออกเดินทาง'],
  ['kirjoittaa', 'kirjoitan', 'kirjoittavat / emme kirjoita', 'tt → t ในรูปอ่อน · เขียน'], ['nukkua', 'nukun', 'eivät nuku', 'kk → k · นอน'],
  ['lukea', 'luen', 'en lue', 'k หายไป · อ่าน'], ['kylpeä', 'kylven', 'kylven', 'p → v · อาบน้ำแช่อ่าง'],
  ['onkia', 'ongin', 'ongimme', 'nk → ng · ตกปลา'],
];
