/** Target vocabulary for each teaching date, selected from the assigned word tables,
 * phrases and exercises in courseCatalog. Grammar forms and incidental example words
 * are not expanded into separate vocabulary entries. Test 1 is a cumulative review.
 */
type Entry = { fi: string; th: string; category?: string };
const group = (category: string, text: string): Entry[] => text.trim().split('\n').filter(Boolean).map(line => {
  const [fi, ...meaning] = line.split('|');
  return { fi: fi.trim(), th: meaning.join('|').trim(), category };
});
const unique = (...groups: Entry[][]): Entry[] => [...new Map(groups.flat().map(entry => [entry.fi, entry])).values()];

const lessonOnePhrases = group('สำนวน หน้า 12–13', `
Hyvää huomenta!|สวัสดีตอนเช้า
Huomenta!|อรุณสวัสดิ์ (รูปย่อ)
Päivää!|สวัสดีตอนกลางวัน
Hyvää päivää!|สวัสดีตอนกลางวัน
Hyvää iltaa!|สวัสดีตอนเย็น
Hyvää yötä!|ราตรีสวัสดิ์
Nuku hyvin!|นอนหลับฝันดี
Hei!|สวัสดี
Moi!|สวัสดี (กันเอง)
Terve!|สวัสดี
Moi moi!|บ๊ายบาย
Nähdään!|แล้วพบกัน
Hei hei!|ลาก่อน
Heippa!|บ๊ายบาย
Nähdään huomenna!|เจอกันพรุ่งนี้
Moikka!|สวัสดี / ลาก่อน (กันเอง)
Hauska tutustua!|ยินดีที่ได้รู้จัก
Tässä on…|นี่คือ…
Kiitos samoin!|ขอบคุณ เช่นกัน
Näkemiin!|ลาก่อน (สุภาพ)
Tervetuloa!|ยินดีต้อนรับ
Joo.|ใช่ / ได้ (กันเอง)
Ei.|ไม่ / ไม่ใช่
Kyllä.|ใช่
Ole hyvä!|เชิญ / นี่ครับค่ะ / ไม่เป็นไร (ใช้เมื่อตอบรับคำขอบคุณ)
Ei kestä!|ไม่เป็นไร (ตอบรับคำขอบคุณ)
Kiitos!|ขอบคุณ
Anteeksi!|ขอโทษ / ขออนุญาต
Ei se mitään!|ไม่เป็นไร
Kippis!|ชนแก้ว!
Skool!|ชนแก้ว!
Hyvää ruokahalua!|ขอให้รับประทานอาหารให้อร่อย
Kiitos ruoasta!|ขอบคุณสำหรับอาหาร
Kiitos, oli hyvää.|ขอบคุณ อร่อยมาก
`);

const alphabetNames = group('ชื่ออักษร หน้า 14', `
aa|ชื่ออักษร A
bee|ชื่ออักษร B
see|ชื่ออักษร C
dee|ชื่ออักษร D
ee|ชื่ออักษร E
äf|ชื่ออักษร F
gee|ชื่ออักษร G
hoo|ชื่ออักษร H
ii|ชื่ออักษร I
jii|ชื่ออักษร J
koo|ชื่ออักษร K
äl|ชื่ออักษร L
äm|ชื่ออักษร M
än|ชื่ออักษร N
oo|ชื่ออักษร O
pee|ชื่ออักษร P
kuu|ชื่ออักษร Q; ดวงจันทร์ / เดือน (คำนาม)
är|ชื่ออักษร R
äs|ชื่ออักษร S
tee|ชา / ทำ! (ตามบริบท)
uu|ชื่ออักษร U
vee|ชื่ออักษร V
kaksois-vee|ชื่ออักษร W: วีคู่
äks|ชื่ออักษร X
yy|ชื่ออักษร Y
tseta|ชื่ออักษร Z
ruotsalainen oo|ชื่ออักษร Å: โอแบบสวีเดน
ää|ชื่ออักษร Ä
öö|ชื่ออักษร Ö
`);

const lessonTwoReading = group('Hei ja tervetuloa · คำศัพท์บทอ่าน', `
Hei!|สวัสดี
ja|และ
Tervetuloa!|ยินดีต้อนรับ
Anteeksi!|ขอโทษ / ขออนุญาต
onko|เป็นหรือไม่ / อยู่หรือไม่
täällä|ที่นี่ / แถวนี้
suomen kurssi|คอร์สภาษาฟินแลนด์
joo|ใช่ (ภาษาพูด)
olla|เป็น / อยู่ / คือ
tämä|นี้ / สิ่งนี้
paikka|สถานที่ / ที่นั่ง
vapaa|ว่าง / อิสระ
kiva|ดี / น่ารัก / น่าสนุก
minä|ฉัน
kuka|ใคร
sinä|คุณ (คนเดียว)
Hauska tutustua!|ยินดีที่ได้รู้จัก
Kiitos samoin!|ขอบคุณ เช่นกัน
Moi!|สวัสดี (กันเอง)
Mitä kuuluu?|สบายดีไหม
Terve!|สวัสดี
Kiitos!|ขอบคุณ
Minulle kuuluu hyvää.|ฉันสบายดี
Entä sinulle?|แล้วคุณล่ะ
Ihan hyvää, kiitos.|สบายดี ขอบคุณ
tässä|ตรงนี้ / นี่
minun|minä รูปแสดงความเป็นเจ้าของ: ของฉัน
nimi|ชื่อ
opettaja|ครู
Miten se kirjoitetaan?|สะกดอย่างไร
etunimi|ชื่อจริง
sukunimi|นามสกุล
okei|โอเค / ตกลง
kurssipäivä|วันที่มีเรียน
maanantai|วันจันทร์
keskiviikko|วันพุธ
torstai|วันพฤหัสบดี
kello|นาฬิกา / เวลา…โมง
`);

const personalPronouns = group('สรรพนามและกริยา หน้า 16', `
minä|ฉัน
sinä|คุณ (คนเดียว)
hän|เขา / เธอ (บุคคลที่สาม ไม่แบ่งเพศ)
se|มัน / สิ่งนั้น; เขาหรือเธอในภาษาพูด
me|พวกเรา
te|พวกคุณ / คุณในคำพูดสุภาพ
he|พวกเขา
ne|พวกมัน / สิ่งเหล่านั้น; พวกเขาในภาษาพูด
olla|เป็น / อยู่ / คือ
`);

const weekdays = group('วันและเวลา หน้า 14 และแบบฝึก 17', `
maanantai|วันจันทร์
tiistai|วันอังคาร
keskiviikko|วันพุธ
torstai|วันพฤหัสบดี
perjantai|วันศุกร์
lauantai|วันเสาร์
sunnuntai|วันอาทิตย์
viikonloppu|ช่วงสุดสัปดาห์
päivä|วัน
tänään|วันนี้
eilen|เมื่อวาน
huomenna|พรุ่งนี้
toissapäivänä|เมื่อวานซืน
ylihuomenna|มะรืนนี้
Mikä päivä tänään on?|วันนี้วันอะไร
Milloin kurssi on?|คอร์สเรียนมีเมื่อไร
`);

const writtenNumbers = group('ตัวเลข หน้า 15', `
nolla|ศูนย์ (0)
yksi|หนึ่ง (1)
kaksi|สอง (2)
kolme|สาม (3)
neljä|สี่ (4)
viisi|ห้า (5)
kuusi|หก (6)
seitsemän|เจ็ด (7)
kahdeksan|แปด (8)
yhdeksän|เก้า (9)
kymmenen|สิบ (10)
yksitoista|สิบเอ็ด (11)
kaksitoista|สิบสอง (12)
kolmetoista|สิบสาม (13)
neljätoista|สิบสี่ (14)
viisitoista|สิบห้า (15)
kuusitoista|สิบหก (16)
seitsemäntoista|สิบเจ็ด (17)
kahdeksantoista|สิบแปด (18)
yhdeksäntoista|สิบเก้า (19)
kaksikymmentä|ยี่สิบ (20)
kaksikymmentäyksi|ยี่สิบเอ็ด (21)
kaksikymmentäkaksi|ยี่สิบสอง (22)
kaksikymmentäkolme|ยี่สิบสาม (23)
kolmekymmentä|สามสิบ (30)
neljäkymmentä|สี่สิบ (40)
viisikymmentä|ห้าสิบ (50)
kuusikymmentä|หกสิบ (60)
seitsemänkymmentä|เจ็ดสิบ (70)
kahdeksankymmentä|แปดสิบ (80)
yhdeksänkymmentä|เก้าสิบ (90)
sata|หนึ่งร้อย (100)
satayksi|หนึ่งร้อยหนึ่ง (101)
kaksisataa|สองร้อย (200)
kolmesataa|สามร้อย (300)
tuhat|หนึ่งพัน (1,000)
kaksituhatta|สองพัน (2,000)
viisisataatuhatta|ห้าแสน (500,000)
miljoona|หนึ่งล้าน
kaksi miljoonaa|สองล้าน (2,000,000)
miljardi|หนึ่งพันล้าน
viisi miljardia|ห้าพันล้าน (5,000,000,000)
`);

const numberPractice = group('คำศัพท์ประกอบตัวเลข', `
plus|บวก
miinus|ลบ / เครื่องหมายลบ
kertaa|คูณ; ครั้ง (ตามบริบท)
jaettuna|หารด้วย
aste|องศา
Kuinka vanha sinä olet?|คุณอายุเท่าไร
`);

const questionWords = group('คำถาม หน้า 38–39', `
kuka|ใคร
mikä|อะไร / สิ่งไหน (รูปพื้นฐาน)
mitä|อะไร (รูป partitive)
milloin|เมื่อไร
minkämaalainen|เป็นคนชาติอะไร
missä|อยู่ที่ไหน
mistä|จากที่ไหน
mihin|ไปที่ไหน
miksi|ทำไม
kuinka|อย่างไร / เท่าไร
koska|เพราะว่า / เมื่อ (ขึ้นกับบริบท)
vai|หรือ (เสนอทางเลือกในคำถาม)
tai|หรือ (ทางเลือกทั่วไป)
`);

const lessonThreeVerbs = group('กริยาที่ฝึก หน้า 37 และการบ้าน', `
puhua|พูด
kysyä|ถาม
asua|อาศัยอยู่
ostaa|ซื้อ
nauraa|หัวเราะ
säästää|เก็บออม
katsoa|ดู
istua|นั่ง
rakastaa|รัก
tanssia|เต้นรำ
matkustaa|เดินทาง
alkaa|เริ่ม
etsiä|ค้นหา
laulaa|ร้องเพลง
mennä|ไป
ajaa|ขับรถ
itkeä|ร้องไห้
löytää|พบ
sanoa|พูด / กล่าว
tutustua|ทำความรู้จัก
tietää|รู้
maksaa|จ่าย / มีราคา
`);

const countries = group('ประเทศ หน้า 31 และการแนะนำตัว', `
Suomi|ประเทศฟินแลนด์
Ranska|ประเทศฝรั่งเศส
Kreikka|ประเทศกรีซ
Islanti|ประเทศไอซ์แลนด์
Egypti|ประเทศอียิปต์
Venäjä|ประเทศรัสเซีย
Pakistan|ประเทศปากีสถาน
Brasilia|ประเทศบราซิล
Etelä-Afrikka|ประเทศแอฟริกาใต้
Sveitsi|ประเทศสวิตเซอร์แลนด์
Thaimaa|ประเทศไทย
`);

const nationalities = group('สัญชาติ หน้า 31 และการแนะนำตัว', `
suomalainen|ชาวฟินแลนด์
ranskalainen|ชาวฝรั่งเศส
kreikkalainen|ชาวกรีซ
islantilainen|ชาวไอซ์แลนด์
egyptiläinen|ชาวอียิปต์
venäläinen|ชาวรัสเซีย
pakistanilainen|ชาวปากีสถาน
brasilialainen|ชาวบราซิล
eteläafrikkalainen|ชาวแอฟริกาใต้
sveitsiläinen|ชาวสวิตเซอร์แลนด์
thaimaalainen|ชาวไทย
`);

const languages = group('ภาษา หน้า 31 และการแนะนำตัว', `
suomi|ภาษาฟินแลนด์
ranska|ภาษาฝรั่งเศส
kreikka|ภาษากรีก
islanti|ภาษาไอซ์แลนด์
arabia|ภาษาอาหรับ
venäjä|ภาษารัสเซีย
urdu|ภาษาอูรดู
portugali|ภาษาโปรตุเกส
englanti|ภาษาอังกฤษ
espanja|ภาษาสเปน
thai|ภาษาไทย
`);

const introductions = group('ข้อมูลส่วนบุคคลและการแนะนำตัว', `
maa|ประเทศ / แผ่นดิน
kansalaisuus|สัญชาติ
kieli|ภาษา / ลิ้น
äidinkieli|ภาษาแม่ / วิชาภาษาแม่
etunimi|ชื่อจริง
sukunimi|นามสกุล
olla kotoisin|มาจาก / มีถิ่นกำเนิด
Mistä sinä olet kotoisin?|คุณมาจากที่ไหน
Minkämaalainen sinä olet?|คุณสัญชาติอะไร
Mitä kieltä sinä puhut?|คุณพูดภาษาอะไร
ikä|อายุ
osoite|ที่อยู่
puhelinnumero|หมายเลขโทรศัพท์
kännykkä|โทรศัพท์มือถือ
soittaa|โทร / โทรหา
`);

const kioskVocabulary = group('ซุ้มไอศกรีม หน้า 33–34 และบทสนทนา', `
myyjä|ผู้ขาย
asiakas|ลูกค้า
jäätelö|ไอศกรีม
jäätelökioski|ซุ้มขายไอศกรีม
jätski|ไอศกรีม (ภาษาพูดของ jäätelö)
kiska|ซุ้มขายของ (ภาษาพูดของ kioski)
pallo|ลูกบอล / ไอศกรีมหนึ่งสกู๊ป
suklaa|ช็อกโกแลต
suklaajäätelö|ไอศกรีมช็อกโกแลต
vanilja|วานิลลา
mansikka|สตรอว์เบอร์รี
salamipizza|พิซซ่าซาลามิ
kinkkupizza|พิซซ่าแฮม
hinta|ราคา
raha|เงิน
euro|ยูโร
sentti|เซนต์
halpa|ราคาถูก
kallis|ราคาแพง
käteinen|เงินสด
seteli|ธนบัตร
kolikko|เหรียญ
kortti|บัตร
kuitti|ใบเสร็จ
yhteensä|รวมทั้งหมด
haluaisin|ฉันอยากได้ / อยากจะ (รูปสุภาพ)
otan|ฉันเอา / รับ
selvä|ชัดเจน / เข้าใจแล้ว / ตกลง
sitten|จากนั้น / งั้น
sinulle|ให้คุณ / สำหรับคุณ
minäkin|ฉันด้วย
sit|แล้ว / งั้น (ภาษาพูดของ sitten)
sulle|ให้คุณ (ภาษาพูดของ sinulle)
mäkin|ฉันด้วย (ภาษาพูดของ minäkin)
nämä|เหล่านี้
nää|เหล่านี้ (ภาษาพูดของ nämä)
kiitti|ขอบคุณ (ภาษาพูด)
euroo|ยูโร (ภาษาพูดของ euroa)
palloo|สกู๊ป (ภาษาพูดของ palloa)
Mitä tämä maksaa?|สิ่งนี้ราคาเท่าไร
Mitä jäätelö maksaa?|ไอศกรีมราคาเท่าไร
Tuleeko muuta?|รับอย่างอื่นอีกไหม
Tuleeks muuta?|รับอย่างอื่นอีกไหม (ภาษาพูด)
Tuleeko nämä samasta?|จ่ายรวมกันไหม (รูปสนทนา)
Tuleeks nää samasta?|จ่ายรวมกันไหม (ภาษาพูด)
Tarvitsetko kuittia?|ต้องการใบเสร็จไหม
Tarviitko kuittia?|ต้องการใบเสร็จไหม (ภาษาพูด)
Käteisellä vai kortilla?|จ่ายเงินสดหรือบัตร
Ei kiitos.|ไม่ ขอบคุณ
Kortilla, kiitos.|จ่ายด้วยบัตรครับ/ค่ะ
kolme viiskyt|สามยูโรห้าสิบเซนต์ (การพูดราคา 3,50 €)
`);

const spokenNumbers = group('ตัวเลขภาษาพูด หน้า 34', `
yks|หนึ่ง (1)
kaks|สอง (2)
kolme|สาม (3)
neljä|สี่ (4)
viis|ห้า (5)
kuus|หก (6)
seittemän|เจ็ด (7)
kaheksan|แปด (8)
yheksän|เก้า (9)
kymmenen|สิบ (10)
ykstoist|สิบเอ็ด (11)
kakstoist|สิบสอง (12)
kolmetoist|สิบสาม (13)
neljätoist|สิบสี่ (14)
viistoist|สิบห้า (15)
kuustoist|สิบหก (16)
seittemäntoist|สิบเจ็ด (17)
kaheksantoist|สิบแปด (18)
yheksäntoist|สิบเก้า (19)
kakskyt|ยี่สิบ (20)
kakskytyks|ยี่สิบเอ็ด (21)
kakskytkaks|ยี่สิบสอง (22)
kakskytkolme|ยี่สิบสาม (23)
kakskytneljä|ยี่สิบสี่ (24)
kakskytviis|ยี่สิบห้า (25)
kakskytkuus|ยี่สิบหก (26)
kakskytseittemän|ยี่สิบเจ็ด (27)
kakskytkaheksan|ยี่สิบแปด (28)
kakskytyheksän|ยี่สิบเก้า (29)
kolkyt|สามสิบ (30)
kolkytyks|สามสิบเอ็ด (31)
nelkyt|สี่สิบ (40)
viiskyt|ห้าสิบ (50)
kuuskyt|หกสิบ (60)
seiskyt|เจ็ดสิบ (70)
kaheksankyt|แปดสิบ (80)
yheksänkyt|เก้าสิบ (90)
sata|หนึ่งร้อย (100)
`);

const lessonFourVerbs = group('กริยาที่ทบทวนในชั้นเรียนและการบ้าน', `
asua|อาศัยอยู่
nauraa|หัวเราะ
säästää|เก็บออม
ostaa|ซื้อ
katsoa|ดู
istua|นั่ง
rakastaa|รัก
tanssia|เต้นรำ
matkustaa|เดินทาง
alkaa|เริ่ม
etsiä|ค้นหา
laulaa|ร้องเพลง
seisoa|ยืน
maksaa|จ่าย / มีราคา
`);

// 08.09: alphabet and assigned phrases, pages 12–14.
const lesson1 = unique(alphabetNames, lessonOnePhrases);
// 10.09: page 11 reading vocabulary, pronouns, numbers and weekdays.
const lesson2 = unique(lessonTwoReading, personalPronouns, weekdays, writtenNumbers, numberPractice);
// 15.09: explicitly reassigned weekdays, questions, verbs, introductions and listening words.
const lesson3 = unique(weekdays.filter(entry => ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'].includes(entry.fi)),
  questionWords, lessonThreeVerbs, countries, nationalities, languages, introductions);
// 22.09: kiosk dialogues, page 34 spoken numbers, and the assigned verb revision.
const lesson4 = unique(kioskVocabulary, spokenNumbers, lessonFourVerbs);

export const vocabularyEarly: Record<string, Entry[]> = {
  '1': lesson1,
  '2': lesson2,
  '3': lesson3,
  '4': lesson4,
  test1: unique(lesson1, lesson2, lesson3, lesson4),
};
