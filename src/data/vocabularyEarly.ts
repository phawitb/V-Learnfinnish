/** Vocabulary audited against the early lesson pages, teacher worksheets and book pp. 11–53.
 * Entries include lemmas, meaningful inflections, spoken variants and useful phrases.
 * Proper personal names and individual phone numbers are not vocabulary entries.
 */
type Entry = { fi: string; th: string; category?: string };
const group = (category: string, text: string): Entry[] => text.trim().split('\n').filter(Boolean).map(line => {
  const [fi, ...meaning] = line.split('|');
  return { fi: fi.trim(), th: meaning.join('|').trim(), category };
});
const unique = (...groups: Entry[][]): Entry[] => [...new Map(groups.flat().map(entry => [entry.fi, entry])).values()];

const greetings = group('คำทักทายและสำนวน', `
Hei!|สวัสดี
Moi!|สวัสดี (กันเอง)
Terve!|สวัสดี
Moikka!|สวัสดี / ลาก่อน (กันเอง)
Hyvää huomenta!|สวัสดีตอนเช้า
Huomenta!|อรุณสวัสดิ์ (รูปย่อ)
Päivää!|สวัสดีตอนกลางวัน
Hyvää päivää!|สวัสดีตอนกลางวัน
Hyvää iltaa!|สวัสดีตอนเย็น
Hyvää yötä!|ราตรีสวัสดิ์
Nuku hyvin!|นอนหลับฝันดี
Moi moi!|บ๊ายบาย
Hei hei!|ลาก่อน
Heippa!|บ๊ายบาย
Nähdään!|แล้วพบกัน
Nähdään huomenna!|เจอกันพรุ่งนี้
Näkemiin!|ลาก่อน (สุภาพ)
Tervetuloa!|ยินดีต้อนรับ
Hauska tutustua!|ยินดีที่ได้รู้จัก
Kiitos samoin!|ขอบคุณ เช่นกัน
Kiitos!|ขอบคุณ
Kiitti!|ขอบคุณ (ภาษาพูด)
Ole hyvä!|เชิญ / นี่ครับค่ะ / ไม่เป็นไร (ใช้เมื่อตอบรับคำขอบคุณ)
Ei kestä!|ไม่เป็นไร (ตอบรับคำขอบคุณ)
Anteeksi!|ขอโทษ / ขออนุญาต
Ei se mitään!|ไม่เป็นไร
Kippis!|ชนแก้ว!
Skool!|ชนแก้ว!
Hyvää ruokahalua!|ขอให้รับประทานอาหารให้อร่อย
Kiitos ruoasta!|ขอบคุณสำหรับอาหาร
Kiitos, oli hyvää.|ขอบคุณ อร่อยมาก
Joo.|ใช่ / ได้ (กันเอง)
Kyllä.|ใช่
Ei.|ไม่ / ไม่ใช่
Mitä kuuluu?|สบายดีไหม
Mitä sinulle kuuluu?|คุณสบายดีไหม
Minulle kuuluu hyvää.|ฉันสบายดี
Kiitos, minulle kuuluu hyvää.|ขอบคุณ ฉันสบายดี
Entä sinulle?|แล้วคุณล่ะ
Ihan hyvää, kiitos.|สบายดี ขอบคุณ
Hyvää, kiitti!|สบายดี ขอบใจ (ภาษาพูด)
Miten menee?|เป็นอย่างไรบ้าง
Hyvin!|ดี
Kaikki on ok.|ทุกอย่างเรียบร้อยดี
Ihanaa!|วิเศษมาก
Mitäs tässä|ก็เรื่อย ๆ ไม่มีอะไรพิเศษ
`);
const introduction = group('การแนะนำตัวและห้องเรียน', `
minä|ฉัน
sinä|คุณ (คนเดียว)
hän|เขา / เธอ (บุคคลที่สาม ไม่แบ่งเพศ)
se|มัน / สิ่งนั้น; เขาหรือเธอในภาษาพูด
me|พวกเรา
te|พวกคุณ / คุณในคำพูดสุภาพ
he|พวกเขา
ne|พวกมัน / สิ่งเหล่านั้น; พวกเขาในภาษาพูด
olla|เป็น / อยู่ / คือ
olen|ฉันเป็น / อยู่
 olet|คุณเป็น / อยู่
on|เขาเป็น / อยู่; คือ
olemme|พวกเราเป็น / อยู่
 olette|พวกคุณเป็น / อยู่
ovat|พวกเขาเป็น / อยู่
minun|minä รูปแสดงความเป็นเจ้าของ: ของฉัน
sinun|ของคุณ
nimi|ชื่อ
nimeni|ชื่อของฉัน
etunimi|ชื่อจริง
sukunimi|นามสกุล
opettaja|ครู
opettajan|ของครู
opiskelija|นักเรียน / นักศึกษา
kurssi|หลักสูตร / คอร์ส
suomen kurssi|คอร์สภาษาฟินแลนด์
suomen kurssilla|ในคอร์สภาษาฟินแลนด์
kurssilla|ที่คอร์ส / อยู่ในชั้นเรียน
kurssille|ไปยังคอร์ส / ไปเข้าชั้นเรียน
kurssipäivä|วันที่มีเรียน
kurssipäivät|วันเรียนหลายวัน
paikka|สถานที่ / ที่นั่ง
vapaa|ว่าง / อิสระ
kiva|ดี / น่ารัก / น่าสนุก
hauska|สนุก / น่ายินดี
hyvä|ดี
hyvää|ดี (รูป partitive เช่น hyvää päivää)
tervetuloa|ยินดีต้อนรับ
anteeksi|ขอโทษ / ขออนุญาต
ja|และ
entä|แล้ว…ล่ะ
ihan|ค่อนข้าง / อย่างเต็มที่ (ขึ้นกับบริบท)
samoin|เช่นกัน
nyt|ตอนนี้
tämä|นี้ / สิ่งนี้
tässä|ตรงนี้ / นี่
 täällä|ที่นี่ / แถวนี้
kuka|ใคร
mitä|อะไร (รูป partitive)
miten|อย่างไร
onko|เป็นหรือไม่ / อยู่หรือไม่
kirjoittaa|เขียน
kirjoitetaan|เขียน / สะกด (รูปไม่ระบุผู้กระทำ)
Minä olen…|ฉันคือ…
Minun nimi on…|ฉันชื่อ…
Mikä sinun nimi on?|คุณชื่ออะไร
Kuka sinä olet?|คุณคือใคร
Miten se kirjoitetaan?|สะกดอย่างไร
Onko tämä paikka vapaa?|ที่นั่งนี้ว่างไหม
Onko täällä suomen kurssi?|ที่นี่มีคอร์สฟินแลนด์ใช่ไหม
Tässä on…|นี่คือ…
`);
const time = group('วันและเวลา', `
maanantai|วันจันทร์
tiistai|วันอังคาร
keskiviikko|วันพุธ
torstai|วันพฤหัสบดี
perjantai|วันศุกร์
lauantai|วันเสาร์
sunnuntai|วันอาทิตย์
maanantaina|ในวันจันทร์
tiistaina|ในวันอังคาร
keskiviikkona|ในวันพุธ
torstaina|ในวันพฤหัสบดี
perjantaina|ในวันศุกร์
lauantaina|ในวันเสาร์
sunnuntaina|ในวันอาทิตย์
viikonloppu|ช่วงสุดสัปดาห์
viikonloppuna|ในช่วงสุดสัปดาห์
viikko|สัปดาห์
päivä|วัน
aika|เวลา
kello|นาฬิกา / เวลา…โมง
klo|คำย่อ kello ใช้ระบุเวลา
milloin|เมื่อไร
tänään|วันนี้
eilen|เมื่อวาน
huomenna|พรุ่งนี้
toissapäivänä|เมื่อวานซืน
ylihuomenna|มะรืนนี้
viime viikolla|สัปดาห์ที่แล้ว
tällä viikolla|สัปดาห์นี้
ensi viikolla|สัปดาห์หน้า
arkipäivä|วันธรรมดา
arkisin|ในวันธรรมดาเป็นประจำ
oli|เคยเป็น / อยู่ (อดีตของ on)
Mikä päivä tänään on?|วันนี้วันอะไร
Milloin kurssi on?|คอร์สเรียนมีเมื่อไร
Paljonko kello on?|กี่โมงแล้ว
Hyvää viikonloppua!|ขอให้มีความสุขในวันหยุดสุดสัปดาห์
`);
const sounds = group('เสียงและการออกเสียง', `
aakkoset|ตัวอักษร / พยัญชนะและสระทั้งหมด
kirjain|ตัวอักษร
ääntäminen|การออกเสียง
ääni|เสียง
vokaali|สระ
konsonantti|พยัญชนะ
lyhyt|สั้น
pitkä|ยาว
lyhyt vokaali|สระเสียงสั้น
pitkä vokaali|สระเสียงยาว
kaksois-vee|ชื่ออักษร W: วีคู่
ruotsalainen oo|ชื่ออักษร Å: โอแบบสวีเดน
tuli|ไฟ
tuuli|ลม
tyyli|รูปแบบ / สไตล์
mato|หนอน
matto|พรม
äiti|แม่
yö|กลางคืน
hämärä|สลัว / ความมืดสลัว
mäkärä|ริ้น
höyhen|ขนนก
löytyä|ถูกพบ / หาเจอ
löytyi|ถูกพบแล้ว (อดีต)
yöllä|ตอนกลางคืน
työpöytä|โต๊ะทำงาน
työpöydältä|จากบนโต๊ะทำงาน
tuulinen|มีลมแรง
tuulla|มีลมพัด
tuulee|ลมพัด
talvella|ในฤดูหนาว
tuolla|ตรงโน้น
sisu|ความมุ่งมั่น อดทน ไม่ยอมแพ้
`);
const spokenBasics = group('ภาษาพูดเบื้องต้น', `
mä|ฉัน (ภาษาพูดของ minä)
sä|คุณ (ภาษาพูดของ sinä)
mun|ของฉัน (ภาษาพูดของ minun)
sun|ของคุณ (ภาษาพูดของ sinun)
mä oon|ฉันเป็น / อยู่ (ภาษาพูด)
sä oot|คุณเป็น / อยู่ (ภาษาพูด)
se on|เขา / เธอ / มันเป็นหรืออยู่ (ภาษาพูด)
me ollaan|พวกเราเป็น / อยู่ (ภาษาพูด)
te ootte|พวกคุณเป็น / อยู่ (ภาษาพูด)
ne on|พวกเขาเป็น / อยู่ (ภาษาพูด)
mä meen|ฉันไป (ภาษาพูดของ minä menen)
Minä menen|ฉันไป
Haluatko sinä?|คุณต้องการไหม
Haluuksä?|คุณอยากได้ไหม (ภาษาพูด)
Ehditkö sinä?|คุณมีเวลาพอไหม
Ehitksä?|คุณมีเวลาพอไหม (ภาษาพูด)
Mun nimi on…|ฉันชื่อ… (ภาษาพูด)
Mikä sun nimi on?|คุณชื่ออะไร (ภาษาพูด)
`);
const numbers = group('ตัวเลขและคณิตศาสตร์', `
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
kaksikymmentäneljä|ยี่สิบสี่ (24)
kaksikymmentäseitsemän|ยี่สิบเจ็ด (27)
kaksikymmentäkahdeksan|ยี่สิบแปด (28)
kolmekymmentä|สามสิบ (30)
neljäkymmentä|สี่สิบ (40)
neljäkymmentäkaksi|สี่สิบสอง (42)
neljäkymmentäneljä|สี่สิบสี่ (44)
viisikymmentä|ห้าสิบ (50)
kuusikymmentä|หกสิบ (60)
seitsemänkymmentä|เจ็ดสิบ (70)
seitsemänkymmentäkaksi|เจ็ดสิบสอง (72)
kahdeksankymmentä|แปดสิบ (80)
yhdeksänkymmentä|เก้าสิบ (90)
sata|หนึ่งร้อย (100)
kaksisataa|สองร้อย (200)
tuhat|หนึ่งพัน (1,000)
kaksituhatta|สองพัน (2,000)
miljoona|หนึ่งล้าน
miljardi|หนึ่งพันล้าน
biljoona|หนึ่งล้านล้าน
numero|ตัวเลข / หมายเลข
numerot|ตัวเลขหลายตัว
plus|บวก
miinus|ลบ / เครื่องหมายลบ
kertaa|คูณ; ครั้ง (ตามบริบท)
jaettuna|หารด้วย
Mitä on…?|…ได้เท่าไร (ถามผลคำนวณ)
Se on…|คำตอบคือ… / มันคือ…
`);
const lessonTwoTopics = group('ชีวิตประจำวันและแบบฝึกหัด', `
aste|องศา
astetta|องศา (รูปหลังจำนวน เช่น 14 astetta)
lämpötila|อุณหภูมิ
lämpötilat|อุณหภูมิหลายค่า
Kuinka monta astetta?|กี่องศา
kuinka|อย่างไร / เท่าไร
monta|หลาย / กี่ (เมื่อใช้กับคำถาม)
vanha|เก่า / อายุ…ปี
vuosi|ปี
vuotta|ปี (รูปหลังจำนวน)
Kuinka vanha sinä olet?|คุณอายุเท่าไร
matematiikka|คณิตศาสตร์
äidinkieli|ภาษาแม่ / วิชาภาษาแม่
kemia|เคมี
fysiikka|ฟิสิกส์
englanti|ภาษาอังกฤษ
historia|ประวัติศาสตร์
ruotsi|ภาษาสวีเดน
musiikki|ดนตรี
biologia|ชีววิทยา
ranska|ภาษาฝรั่งเศส
liikunta|พลศึกษา / การออกกำลังกาย
lukujärjestys|ตารางเรียน
minulla on|ฉันมี
punainen|สีแดง
paita|เสื้อ
poika|เด็กผู้ชาย
missä|อยู่ที่ไหน
bussi|รถบัส
bussilla|ด้วยรถบัส
koulu|โรงเรียน
kouluun|ไปโรงเรียน
leipä|ขนมปัง
leipää|ขนมปัง (รูป partitive เช่น kaksi leipää)
sataa|ฝน / หิมะตก (กริยา)
vesi|น้ำ
vettä|น้ำ (รูป partitive)
sataa vettä|ฝนตก
perhe|ครอบครัว
tule|มา! (คำสั่ง)
tänne|มาที่นี่
syntyä|เกิด
syntynyt|เกิดแล้ว / ผู้เกิด (รูปใช้บอกวันเกิด)
kevät|ฤดูใบไม้ผลิ
keväällä|ในฤดูใบไม้ผลิ
käsi|มือ / แขน
kipeä|เจ็บ / ป่วย
iloinen|มีความสุข / ร่าเริง
kääntyä|เลี้ยว
käänny|เลี้ยว! (คำสั่ง)
vasemmalle|ไปทางซ้าย
seuraava|ถัดไป
asiakas|ลูกค้า
tykkään|ฉันชอบ
kahvista|จากกาแฟ / กาแฟหลัง tykkään
hammastahna|ยาสีฟัน
hammastahnaa|ยาสีฟัน (รูป partitive)
tarvitsen|ฉันต้องการ
meneekö|ไปหรือไม่
ruusu|ดอกกุหลาบ
ruusuja|ดอกกุหลาบหลายดอก (partitive พหูพจน์)
Oletko ok?|คุณโอเคไหม
Minulla on punainen paita.|ฉันมีเสื้อสีแดง
Missä poika on?|เด็กผู้ชายอยู่ที่ไหน
Bussilla kouluun!|ไปโรงเรียนด้วยรถบัส
Ostan kaksi leipää.|ฉันซื้อขนมปังสองก้อน
Maanantaina sataa vettä.|วันจันทร์ฝนตก
Tässä on minun perhe.|นี่คือครอบครัวของฉัน
Tule tänne!|มานี่
Minä olen syntynyt keväällä.|ฉันเกิดในฤดูใบไม้ผลิ
Minulla on käsi kipeä.|ฉันเจ็บมือ
Minä olen iloinen.|ฉันมีความสุข
Käänny vasemmalle.|เลี้ยวซ้าย
Seuraava asiakas.|ลูกค้าคิวถัดไป
Minä tykkään kahvista.|ฉันชอบกาแฟ
Tarvitsen hammastahnaa.|ฉันต้องการยาสีฟัน
Meneekö tämä bussi Ouluun?|รถบัสคันนี้ไป Oulu ไหม
`);
const pronunciationPairs = group('คำฝึกเสียงจาก Pronunciation', `
alta|จากใต้
 aalto|คลื่น
puro|ลำธาร
puuro|โจ๊ก / ข้าวต้มธัญพืช
eli|หรือกล่าวอีกอย่างว่า
kivi|หิน
kiivi|กีวี
 tällä|ด้วยสิ่งนี้ / บนสิ่งนี้
 tölli|กระท่อม
Töölö|ชื่อย่านเตอเลอในเฮลซิงกิ
tylli|ผ้าทูลล์
kukka|ดอกไม้
rapu|กั้ง / สัตว์จำพวกกุ้ง
rappu|ขั้นบันได
lama|ภาวะถดถอย
lammas|แกะ
moni|หลายคน / หลายสิ่ง
monni|ปลาดุก
kenkä|รองเท้า
kengät|รองเท้าหลายข้าง
kisa|การแข่งขัน
kissa|แมว
tulli|ศุลกากร
pora|สว่าน
porras|ขั้นบันได
vene|เรือ
latva|ยอดไม้
hullu|บ้า
tyhmä|โง่
jatko|การต่อ / ส่วนต่อ
myyjä|ผู้ขาย
digitaalinen|ดิจิทัล
banaani|กล้วย
Coca-cola|โคคา-โคลา
fakta|ข้อเท็จจริง
gorilla|กอริลลา
wc|ห้องน้ำ
xylitol|ไซลิทอล
pizza|พิซซ่า
aqua|น้ำ (คำต่างประเทศในตัวอย่างอักษร q)
kala|ปลา
kalaa|ปลา (partitive)
taka|ด้านหลัง (ส่วนคำ)
takaa|จากข้างหลัง
avaa|เปิด! / เขาเปิด (ตามบริบท)
aava|กว้างใหญ่โล่ง
tee|ชา / ทำ! (ตามบริบท)
etu|ประโยชน์ / ข้อได้เปรียบ
virhe|ข้อผิดพลาด
virheen|ของข้อผิดพลาด / ข้อผิดพลาดรูปกรรม
kota|กระโจม
koota|รวบรวม
rokko|โรคที่มีผื่นตุ่ม
rokkoon|เข้าสู่โรคผื่นตุ่ม (รูปใช้ฝึกเสียง)
hoopo|เซ่อ / งี่เง่า
tili|บัญชี
tiili|อิฐ
suksi|สกีหนึ่งข้าง
suksii|เล่นสกี / เคลื่อนด้วยสกี (กริยา)
piirre|ลักษณะเด่น
tältä|จากสิ่งนี้
täältä|จากที่นี่
älli|ไหวพริบ (ภาษาพูด)
ääliö|คนโง่
kesä|ฤดูร้อน
kesää|ฤดูร้อน (partitive)
tyttö|เด็กผู้หญิง
tyttöön|ไปยังเด็กผู้หญิง / กับเด็กผู้หญิงตามกริยา
örinä|เสียงคำรามต่ำ ๆ
insinöörinä|ในฐานะวิศวกร
kaiku|เสียงสะท้อน
kaikuu|ก้อง / สะท้อน (กริยา)
kylä|หมู่บ้าน
kyllä|ใช่ / แน่นอน
kynä|ปากกา / ดินสอ
kyynel|น้ำตาหนึ่งหยด
täky|เหยื่อล่อ
täkyyn|ไปยังเหยื่อล่อ
takka|เตาผิง
kyky|ความสามารถ
kyykky|การย่อตัว / ท่านั่งยอง
palkoja|ฝักหลายฝัก (partitive)
palkkoja|ค่าจ้างหลายรายการ (partitive)
ämmä|หญิงแก่ (คำไม่สุภาพในแบบฝึกเสียง)
saame|ภาษาซามี
saamme|พวกเราได้ / ได้รับ
salomme|ป่าดงของพวกเรา
kasi|เลขแปด (ภาษาพูด)
kassi|ถุง / กระเป๋า
tusina|หนึ่งโหล
tussina|ในฐานะปากกาเมจิก (รูปใช้ฝึกเสียง)
kursi|เย็บปะแล้ว (อดีตของ kursia)
kurssi|หลักสูตร
toppi|เสื้อกล้าม / เสื้อท็อป
tupoja|ห้องกระท่อมหลายห้อง (partitive)
tuppoja|ก้อนกระจุกหลายก้อน (partitive)
tylpän|ของสิ่งที่ทู่
tylppään|ไปยังสิ่งที่ทู่
jeni|เยน (เงินญี่ปุ่น)
tyyny|หมอน
tyynny|สงบลง! (คำสั่ง)
sanan|ของคำหนึ่งคำ / คำรูปกรรม
olut|เบียร์
ollut|เคยเป็น / เคยอยู่
saarella|บนเกาะ
kutu|ไข่ปลา / การวางไข่
kuttu|แพะตัวเมีย
myyty|ขายแล้ว
myytti|ตำนาน
laitetta|อุปกรณ์ (partitive)
laitteetta|โดยไม่มีอุปกรณ์
sänky|เตียง
sängyn|ของเตียง
hankeen|เข้าไปในกองหิมะ
hangen|ของกองหิมะ
tanko|แท่ง / ราว
tangon|ของแท่ง / ของจังหวะแทงโก
murea|นุ่ม (อาหาร)
porasi|เขาเจาะแล้ว / สว่านของคุณ (ตามบริบท)
vajavainen|ไม่สมบูรณ์
venevaja|โรงเก็บเรือ
vääntävät|พวกเขาบิด
hieno|ดีงาม / ละเอียด
hahmo|ตัวละคร / รูปร่าง
tahtoa|ต้องการ
joku|ใครบางคน
ehjä|ไม่ชำรุด / สมบูรณ์
jakaja|ผู้แจก / ตัวหาร
kadun|ของถนน
pöydällä|บนโต๊ะ
viihde|ความบันเทิง
`);

const grammar = group('ไวยากรณ์และคำถาม', `
vokaaliharmonia|ความกลมกลืนของสระ
persoonapronomini|คำสรรพนามบุคคล
persoona|บุรุษของประธาน
verbi|คำกริยา
persoonataivutus|การผันคำตามบุรุษ
negatiivinen|ปฏิเสธ
positiivinen|บอกเล่า / ตอบรับ
lause|ประโยค
kysymys|คำถาม
kysymyssana|คำแสดงคำถาม
vastaus|คำตอบ
sanasto|คำศัพท์
yhdyssana|คำประสม
kirjakieli|ภาษาเขียนมาตรฐาน
puhekieli|ภาษาพูด
kieli|ภาษา / ลิ้น
kielikurssi|หลักสูตรภาษา
mikä|อะไร / สิ่งไหน (รูปพื้นฐาน)
mistä|จากที่ไหน
mihin|ไปที่ไหน
miksi|ทำไม
minkämaalainen|เป็นคนชาติอะไร
koska|เพราะว่า / เมื่อ (ขึ้นกับบริบท)
vai|หรือ (เสนอทางเลือกในคำถาม)
tai|หรือ (ทางเลือกทั่วไป)
mutta|แต่
myös|ด้วย / เช่นกัน
vähän|เล็กน้อย
paljon|มาก
kaikki|ทั้งหมด
kaikki jäätelöt|ไอศกรีมทั้งหมด
etsitte|พวกคุณค้นหา
opiskelet|คุณเรียน
opiskelen|ฉันเรียน
fysiikkaa|ฟิสิกส์ (partitive หลัง opiskella)
puhelin|โทรศัพท์
puhelinta|โทรศัพท์ (partitive)
bussipysäkki|ป้ายรถเมล์
bussipysäkkiä|ป้ายรถเมล์ (partitive หลัง etsiä)
bussipysäkille|ไปยังป้ายรถเมล์
bussilippu|ตั๋วรถเมล์
bussilipun|ตั๋วรถเมล์ (รูปกรรม)
pankkikortti|บัตรธนาคาร
puisto|สวนสาธารณะ
puistossa|ในสวนสาธารณะ
koti|บ้าน
kotona|ที่บ้าน
kotiin|ไปบ้าน
kotoisin|มีถิ่นกำเนิด / มาจาก
olla kotoisin|มาจาก / มีถิ่นกำเนิด
Mistä sinä olet kotoisin?|คุณมาจากที่ไหน
Minkämaalainen sinä olet?|คุณสัญชาติอะไร
Mitä kieltä sinä puhut?|คุณพูดภาษาอะไร
Missä te asutte?|พวกคุณอาศัยอยู่ที่ไหน
Mihin sinä menet?|คุณกำลังไปที่ไหน
Miksi et osta jäätelöä?|ทำไมคุณไม่ซื้อไอศกรีม
Oletko sinä opiskelija?|คุณเป็นนักศึกษาไหม
Etkö sinä puhu englantia?|คุณไม่พูดภาษาอังกฤษหรือ
Ooks sä suomalainen?|คุณเป็นคนฟินแลนด์ไหม (ภาษาพูด)
Asuuks se Suomessa?|เขาอยู่ฟินแลนด์ไหม (ภาษาพูด)
Eks sä puhu englantia?|คุณไม่พูดอังกฤษหรือ (ภาษาพูด)
maassa|ในประเทศ / บนพื้น (ตามบริบท)
tuoli|เก้าอี้
tuolissa|ในเก้าอี้ / บนเก้าอี้
kaappi|ตู้
kaapissa|ในตู้
auto|รถยนต์
autossa|ในรถยนต์
hyvässä|ในสิ่งที่ดี
kurssiko|คอร์สหรือ
kielikö|ภาษาหรือ
-ssa / -ssä|คำลงท้าย: ใน
-sta / -stä|คำลงท้าย: จาก
-lla / -llä|คำลงท้าย: ที่ / บน / ด้วย
-na / -nä|คำลงท้าย: ในฐานะ / ในวัน
-ko / -kö|คำลงท้ายทำคำถามใช่หรือไม่
-vat / -vät|คำลงท้ายกริยาของพวกเขา
-a / -ä|คำลงท้าย partitive แบบหนึ่ง
`);
const locations = group('ประเทศและเมือง', `
Suomi|ประเทศฟินแลนด์
Suomessa|ในประเทศฟินแลนด์
Suomesta|จากประเทศฟินแลนด์
Ruotsi|ประเทศสวีเดน
Ranska|ประเทศฝรั่งเศส
Ranskasta|จากประเทศฝรั่งเศส
Kreikka|ประเทศกรีซ
Kreikasta|จากประเทศกรีซ
Islanti|ประเทศไอซ์แลนด์
Islannista|จากประเทศไอซ์แลนด์
Egypti|ประเทศอียิปต์
Egyptistä|จากประเทศอียิปต์
Venäjä|ประเทศรัสเซีย
Venäjältä|จากประเทศรัสเซีย
Pakistan|ประเทศปากีสถาน
Pakistanista|จากประเทศปากีสถาน
Thaimaa|ประเทศไทย
Thaimaasta|จากประเทศไทย
Brasilia|ประเทศบราซิล
Brasiliasta|จากประเทศบราซิล
Etelä-Afrikka|ประเทศแอฟริกาใต้
Etelä-Afrikasta|จากประเทศแอฟริกาใต้
Japani|ประเทศญี่ปุ่น
Japanista|จากประเทศญี่ปุ่น
Italia|ประเทศอิตาลี
Italiasta|จากประเทศอิตาลี
Argentiina|ประเทศอาร์เจนตินา
Chile|ประเทศชิลี
Venezuela|ประเทศเวเนซุเอลา
Etelä-Amerikka|ทวีปอเมริกาใต้
Etelä-Amerikasta|จากทวีปอเมริกาใต้
Saksa|ประเทศเยอรมนี
Saksassa|ในประเทศเยอรมนี
Saksasta|จากประเทศเยอรมนี
Kiina|ประเทศจีน
Kiinasta|จากประเทศจีน
Sveitsi|ประเทศสวิตเซอร์แลนด์
Sveitsistä|จากประเทศสวิตเซอร์แลนด์
USA|สหรัฐอเมริกา
USA:sta|จากสหรัฐอเมริกา
Unkari|ประเทศฮังการี
Unkarista|จากประเทศฮังการี
Unkarissa|ในประเทศฮังการี
Kanada|ประเทศแคนาดา
Irlanti|ประเทศไอร์แลนด์
Irlannista|จากประเทศไอร์แลนด์
Hollanti|เนเธอร์แลนด์ (ชื่อที่ใช้ในแบบฝึก)
Vietnam|ประเทศเวียดนาม
Vietnamista|จากประเทศเวียดนาม
Irak|ประเทศอิรัก
Irakista|จากประเทศอิรัก
Kongo|ประเทศคองโก
Meksiko|ประเทศเม็กซิโก
Espanja|ประเทศสเปน
Portugali|ประเทศโปรตุเกส
Portugaliin|ไปยังประเทศโปรตุเกส
Helsinki|เมืองเฮลซิงกิ
Helsingissä|ในเฮลซิงกิ
Inari|เมืองอินารี
Joensuu|เมืองโยเอนซู
Kajaani|เมืองกายานี
Lappeenranta|เมืองลัปเปเอ็นรันตา
Oulu|เมืองโอวลุ
Oulussa|ในโอวลุ
Ouluun|ไปยังโอวลุ
Rovaniemi|เมืองโรวาเนียมิ
Tampere|เมืองตัมเปเร
Turku|เมืองตุรกุ
Turussa|ในตุรกุ
Vaasa|เมืองวาซา
Vaasassa|ในวาซา
Jyväskylä|เมืองยูแวสกูแล
Jyväskylässä|ในยูแวสกูแล
Kotka|เมืองกอตกา
Kotkassa|ในกอตกา
Kouvola|เมืองโกวโวลา
Kouvolassa|ในโกวโวลา
Mäntsälä|เมืองแมนต์แซแล
Mäntsälässä|ในแมนต์แซแล
Pori|เมืองปอรี
Porissa|ในปอรี
Ii|เมืองอี
Iissä|ในเมืองอี
Mikkeli|เมืองมิกเกลี
Mikkelissä|ในมิกเกลี
Bangkokista|จากกรุงเทพฯ
São Paulosta|จากเซาเปาโล
Pietarista|จากเซนต์ปีเตอร์สเบิร์ก
Johannesburgista|จากโยฮันเนสเบิร์ก
Tokiosta|จากโตเกียว
Roomasta|จากโรม
Kairossa|ในไคโร
Pariisissa|ในปารีส
Genevestä|จากเจนีวา
Pekingistä|จากปักกิ่ง
Miamista|จากไมแอมี
Budapestista|จากบูดาเปสต์
New Yorkissa|ในนิวยอร์ก
Dublinista|จากดับลิน
Amsterdamista|จากอัมสเตอร์ดัม
Tukholmaan|ไปสตอกโฮล์ม
Hanoista|จากฮานอย
Brazzavillestä|จากบราซซาวิล
`);
const nationalities = group('สัญชาติ', `
kansalaisuus|สัญชาติ
kotimaa|ประเทศบ้านเกิด
kotikaupunki|เมืองบ้านเกิด
maa|ประเทศ / แผ่นดิน
suomalainen|ชาวฟินแลนด์
ruotsalainen|ชาวสวีเดน
ranskalainen|ชาวฝรั่งเศส
kreikkalainen|ชาวกรีซ
islantilainen|ชาวไอซ์แลนด์
egyptiläinen|ชาวอียิปต์
venäläinen|ชาวรัสเซีย
pakistanilainen|ชาวปากีสถาน
thaimaalainen|ชาวไทย
brasilialainen|ชาวบราซิล
eteläafrikkalainen|ชาวแอฟริกาใต้
japanilainen|ชาวญี่ปุ่น
italialainen|ชาวอิตาลี
argentiinalainen|ชาวอาร์เจนตินา
chileläinen|ชาวชิลี
venezuelalainen|ชาวเวเนซุเอลา
saksalainen|ชาวเยอรมนี
kiinalainen|ชาวจีน
sveitsiläinen|ชาวสวิตเซอร์แลนด์
amerikkalainen|ชาวอเมริกัน
unkarilainen|ชาวฮังการี
kanadalainen|ชาวแคนาดา
hollantilainen|ชาวเนเธอร์แลนด์
vietnamilainen|ชาวเวียดนาม
irakilainen|ชาวอิรัก
kongolainen|ชาวคองโก
espanjalainen|ชาวสเปน
englantilainen|ชาวอังกฤษ
`);
const languages = group('ภาษาและรูปหลัง puhua', `
suomi|ภาษาฟินแลนด์
suomea|ภาษาฟินแลนด์ (partitive เช่น puhun suomea)
ruotsi|ภาษาสวีเดน
ruotsia|ภาษาสวีเดน (partitive)
englanti|ภาษาอังกฤษ
englantia|ภาษาอังกฤษ (partitive)
ranska|ภาษาฝรั่งเศส
ranskaa|ภาษาฝรั่งเศส (partitive)
kreikka|ภาษากรีก
kreikkaa|ภาษากรีก (partitive)
islanti|ภาษาไอซ์แลนด์
islantia|ภาษาไอซ์แลนด์ (partitive)
arabia|ภาษาอาหรับ
arabiaa|ภาษาอาหรับ (partitive)
venäjä|ภาษารัสเซีย
venäjää|ภาษารัสเซีย (partitive)
 urdu|ภาษาอูรดู
urdua|ภาษาอูรดู (partitive)
thai|ภาษาไทย
thaita|ภาษาไทย (partitive)
portugali|ภาษาโปรตุเกส
portugalia|ภาษาโปรตุเกส (partitive)
espanja|ภาษาสเปน
espanjaa|ภาษาสเปน (partitive)
saksa|ภาษาเยอรมัน
saksaa|ภาษาเยอรมัน (partitive)
italia|ภาษาอิตาลี
italiaa|ภาษาอิตาลี (partitive)
kiina|ภาษาจีน
kiinaa|ภาษาจีน (partitive)
japani|ภาษาญี่ปุ่น
japania|ภาษาญี่ปุ่น (partitive)
unkari|ภาษาฮังการี
unkaria|ภาษาฮังการี (partitive)
hollanti|ภาษาดัตช์
hollantia|ภาษาดัตช์ (partitive)
vietnam|ภาษาเวียดนาม
vietnamia|ภาษาเวียดนาม (partitive)
kurdi|ภาษาเคิร์ด
kurdia|ภาษาเคิร์ด (partitive)
lingala|ภาษาลิงกาลา
lingalaa|ภาษาลิงกาลา (partitive)
äidinkieli|ภาษาแม่
äidinkieleni|ภาษาแม่ของฉัน
kieltä|ภาษา (partitive)
kielitaito|ความสามารถทางภาษา
muu kielitaito|ภาษาอื่นที่พูดได้
`);
const food = group('อาหารและการซื้อของ', `
kahvi|กาแฟ
kahvia|กาแฟ (partitive)
maito|นม
maitoa|นม (partitive)
jäätelö|ไอศกรีม
jäätelöä|ไอศกรีม (partitive)
jäätelöt|ไอศกรีมหลายชิ้น
jäätelökioski|ซุ้มขายไอศกรีม
jäätelökioskilla|ที่ซุ้มขายไอศกรีม
suklaajäätelö|ไอศกรีมช็อกโกแลต
suklaajäätelöä|ไอศกรีมช็อกโกแลต (partitive)
suklaajäätelössä|ในไอศกรีมช็อกโกแลต
kakku|เค้ก
kakkua|เค้ก (partitive)
sokeri|น้ำตาล
sokeria|น้ำตาล (partitive)
keksi|บิสกิต / คุกกี้
keksiä|บิสกิต (partitive); คิดค้น (กริยา ขึ้นกับบริบท)
pulla|ขนมปังหวาน
pullaa|ขนมปังหวาน (partitive)
mehu|น้ำผลไม้
mehua|น้ำผลไม้ (partitive)
ruoka|อาหาร
ruokaa|อาหาร (partitive)
ruoasta|จากอาหาร / สำหรับอาหารในคำขอบคุณ
suklaa|ช็อกโกแลต
suklaata|ช็อกโกแลต (partitive)
vanilja|วานิลลา
vaniljaa|วานิลลา (partitive)
mansikka|สตรอว์เบอร์รี
mansikkaa|สตรอว์เบอร์รี (partitive)
lakritsi|ชะเอมเทศ
lakritsia|ชะเอมเทศ (partitive)
salamipizza|พิซซ่าซาลามิ
salamipizzaa|พิซซ่าซาลามิ (partitive)
kinkkupizza|พิซซ่าแฮม
pallo|ลูกบอล / ไอศกรีมหนึ่งสกู๊ป
palloa|สกู๊ป (partitive หลังจำนวน)
hinta|ราคา
raha|เงิน
rahaa|เงิน (partitive)
euro|ยูโร
euroa|ยูโร (รูปหลังจำนวน)
sentti|เซนต์
senttiä|เซนต์ (รูปหลังจำนวน)
snt|คำย่อเซนต์
halpa|ราคาถูก
kallis|ราคาแพง
käteinen|เงินสด
käteisellä|ด้วยเงินสด
seteli|ธนบัตร
kolikko|เหรียญ
kortti|บัตร
kortilla|ด้วยบัตร
kuitti|ใบเสร็จ
kuittia|ใบเสร็จ (partitive)
yhteensä|รวมทั้งหมด
samasta|จากอันเดียวกัน / จ่ายรวมกันในบริบทซื้อของ
muuta|อย่างอื่น (partitive)
selvä|ชัดเจน / เข้าใจแล้ว / ตกลง
ahaa|อ๋อ
okei|โอเค / ตกลง
sitten|จากนั้น / งั้น
sinulle|ให้คุณ / สำหรับคุณ
minäkin|ฉันด้วย
-kin|คำต่อท้าย: ด้วย / เช่นกัน
haluaisin|ฉันอยากได้ / อยากจะ (รูปสุภาพ)
otan|ฉันเอา / รับ
Mitä tämä maksaa?|สิ่งนี้ราคาเท่าไร
Mitä jäätelö maksaa?|ไอศกรีมราคาเท่าไร
Tuleeko muuta?|รับอย่างอื่นอีกไหม
Käteisellä vai kortilla?|จ่ายเงินสดหรือบัตร
Tarvitsetko kuittia?|ต้องการใบเสร็จไหม
Tuleeko nämä samasta?|จ่ายรวมกันไหม (รูปสนทนา)
Ei kiitos.|ไม่ ขอบคุณ
Kortilla, kiitos.|จ่ายด้วยบัตรครับ/ค่ะ
`);
const verbs: [string,string,string[]][] = [
 ['puhua','พูด',['puhun','puhut','puhuu','puhumme','puhutte','puhuvat']],
 ['kysyä','ถาม',['kysyn','kysyt','kysyy','kysymme','kysytte','kysyvät']],
 ['asua','อาศัยอยู่',['asun','asut','asuu','asumme','asutte','asuvat']],
 ['ostaa','ซื้อ',['ostan','ostat','ostaa','ostamme','ostatte','ostavat']],
 ['nauraa','หัวเราะ',['nauran','naurat','nauraa','nauramme','nauratte','nauravat']],
 ['säästää','เก็บออม',['säästän','säästät','säästää','säästämme','säästätte','säästävät']],
 ['katsoa','ดู',['katson','katsot','katsoo','katsomme','katsotte','katsovat']],
 ['istua','นั่ง',['istun','istut','istuu','istumme','istutte','istuvat']],
 ['rakastaa','รัก',['rakastan','rakastat','rakastaa','rakastamme','rakastatte','rakastavat']],
 ['tanssia','เต้นรำ',['tanssin','tanssit','tanssii','tanssimme','tanssitte','tanssivat']],
 ['matkustaa','เดินทาง',['matkustan','matkustat','matkustaa','matkustamme','matkustatte','matkustavat']],
 ['alkaa','เริ่ม',['alan','alat','alkaa','alamme','alatte','alkavat']],
 ['etsiä','ค้นหา',['etsin','etsit','etsii','etsimme','etsitte','etsivät']],
 ['laulaa','ร้องเพลง',['laulan','laulat','laulaa','laulamme','laulatte','laulavat']],
 ['seisoa','ยืน',['seison','seisot','seisoo','seisomme','seisotte','seisovat']],
 ['maksaa','จ่าย / มีราคา',['maksan','maksat','maksaa','maksamme','maksatte','maksavat']],
 ['mennä','ไป',['menen','menet','menee','menemme','menette','menevät']],
 ['ajaa','ขับรถ',['ajan','ajat','ajaa','ajamme','ajatte','ajavat']],
 ['itkeä','ร้องไห้',['itken','itket','itkee','itkemme','itkette','itkevät']],
 ['löytää','พบ',['löydän','löydät','löytää','löydämme','löydätte','löytävät']],
 ['sanoa','พูด / กล่าว',['sanon','sanot','sanoo','sanomme','sanotte','sanovat']],
 ['tutustua','ทำความรู้จัก',['tutustun','tutustut','tutustuu','tutustumme','tutustutte','tutustuvat']],
 ['tietää','รู้',['tiedän','tiedät','tietää','tiedämme','tiedätte','tietävät']],
];
const pronounThai = ['ฉัน','คุณ','เขา/เธอ','พวกเรา','พวกคุณ','พวกเขา'];
const verbEntries = verbs.flatMap(([fi,th,forms]) => {
  // Some infinitives equal the third-person form; retain both meanings in that one entry.
  return [{fi,th: forms.includes(fi) ? `${th} (รูปพื้นฐาน; รูปเขา/เธอ${th}ด้วย)` : th,category:'กริยา'},
    ...forms.filter(form => form!==fi).map(form => ({fi:form,th:`${pronounThai[forms.indexOf(form)]}${th}`,category:'รูปผันกริยา'}))];
});
const negatives = group('ประโยคปฏิเสธและรูปพูด', `
en|ไม่ (ประธานฉัน)
et|ไม่ (ประธานคุณ)
ei|ไม่ (ประธานเขา/เธอ/มัน)
emme|ไม่ (ประธานพวกเรา)
ette|ไม่ (ประธานพวกคุณ)
eivät|ไม่ (ประธานพวกเขา)
ole|รูปกริยา olla หลังคำปฏิเสธ
en ole|ฉันไม่ได้เป็น / ไม่ได้อยู่
et ole|คุณไม่ได้เป็น / ไม่ได้อยู่
ei ole|เขา/เธอ/มันไม่ได้เป็น / ไม่ได้อยู่
emme ole|พวกเราไม่ได้เป็น / ไม่ได้อยู่
ette ole|พวกคุณไม่ได้เป็น / ไม่ได้อยู่
eivät ole|พวกเขาไม่ได้เป็น / ไม่ได้อยู่
en puhu|ฉันไม่พูด
et puhu|คุณไม่พูด
ei puhu|เขา/เธอไม่พูด
emme puhu|พวกเราไม่พูด
ette puhu|พวกคุณไม่พูด
eivät puhu|พวกเขาไม่พูด
puhu|พูด! / รูปใช้หลังคำปฏิเสธ
kysy|ถาม! / รูปใช้หลังคำปฏิเสธ
asu|รูป asua หลังคำปฏิเสธ
osta|ซื้อ! / รูปใช้หลังคำปฏิเสธ
katso|ดู! / รูปใช้หลังคำปฏิเสธ
istu|นั่ง! / รูปใช้หลังคำปฏิเสธ
säästä|ประหยัด! / รูปใช้หลังคำปฏิเสธ
naura|หัวเราะ! / รูปใช้หลังคำปฏิเสธ
rakasta|รัก! / รูปใช้หลังคำปฏิเสธ
tanssi|การเต้นรำ / เต้น! / รูปกริยาหลังคำปฏิเสธ
matkusta|เดินทาง! / รูปใช้หลังคำปฏิเสธ
laula|ร้องเพลง! / รูปใช้หลังคำปฏิเสธ
mene|ไป! / รูปใช้หลังคำปฏิเสธ
maksa|ตับ (คำนาม); จ่าย! / รูปใช้หลังคำปฏิเสธ
mä en oo|ฉันไม่ได้เป็น / อยู่ (ภาษาพูด)
sä et oo|คุณไม่ได้เป็น / อยู่ (ภาษาพูด)
se ei oo|เขา/มันไม่ได้เป็น / อยู่ (ภาษาพูด)
me ei olla|พวกเราไม่ได้เป็น / อยู่ (ภาษาพูด)
te ette oo|พวกคุณไม่ได้เป็น / อยู่ (ภาษาพูด)
ne ei oo|พวกเขาไม่ได้เป็น / อยู่ (ภาษาพูด)
me puhutaan|พวกเราพูด (ภาษาพูด)
ne puhuu|พวกเขาพูด (ภาษาพูด)
me ei puhuta|พวกเราไม่พูด (ภาษาพูด)
ne ei puhu|พวกเขาไม่พูด (ภาษาพูด)
`);
const personal = group('ข้อมูลส่วนบุคคลและบทอ่าน', `
henkilötiedot|ข้อมูลส่วนบุคคล
ikä|อายุ
osoite|ที่อยู่
puhelinnumero|หมายเลขโทรศัพท์
mies|ผู้ชาย
nainen|ผู้หญิง
isä|พ่อ
ystävä|เพื่อน
ystävää|เพื่อน (partitive หลัง etsiä)
myös|ด้วย / เช่นกัน
vähän|เล็กน้อย
usein|บ่อย ๆ
joskus|บางครั้ง
illalla|ตอนเย็น
ilta|เวลาเย็น
kesä|ฤดูร้อน
televisio|โทรทัศน์
televisiota|โทรทัศน์ (partitive)
työ|งาน
työssä|ที่ทำงาน / กำลังทำงาน
töissä|ที่ทำงาน / ทำงาน (รูปใช้ทั่วไป)
tanssikurssi|คอร์สเต้นรำ
tanssikurssilla|อยู่ในคอร์สเต้นรำ
karaoke|คาราโอเกะ
karaokea|คาราโอเกะ (partitive)
tango|แทงโก
 tangoa|แทงโก (partitive)
salsa|ซัลซา
salsaa|ซัลซา (partitive)
sauna|ซาวน่า
saunaa|ซาวน่า (partitive)
jotakin|บางสิ่งบางอย่าง
oikeassa|ถูกต้อง / เป็นฝ่ายถูก
väärässä|ผิด / เป็นฝ่ายผิด
torni|หอคอย
Eiffel-torni|หอไอเฟล
Koivutie|ชื่อถนน Koivutie (ในแบบฝึกฟัง)
Viitanpolku|ชื่อถนน Viitanpolku (ในแบบฝึกฟัง)
Kaarlenkatu|ชื่อถนน Kaarlenkatu (ในแบบฝึกฟัง)
Puukuja|ชื่อถนน Puukuja (ในแบบฝึกฟัง)
`);
const spokenShop = group('คำย่อภาษาพูดในร้านค้า', `
jätski|ไอศกรีม (ภาษาพูดของ jäätelö)
kiska|ซุ้มขายของ (ภาษาพูดของ kioski)
kioski|ซุ้มขายของ
jätskikiskalla|ที่ซุ้มไอศกรีม (ภาษาพูด)
euroo|ยูโร (ภาษาพูดของ euroa)
palloo|สกู๊ป (ภาษาพูดของ palloa)
sit|แล้ว / งั้น (ภาษาพูดของ sitten)
sulle|ให้คุณ (ภาษาพูดของ sinulle)
mäkin|ฉันด้วย (ภาษาพูดของ minäkin)
tuleeks|รับ…ไหม / มาไหม (ภาษาพูดของ tuleeko)
nää|เหล่านี้ (ภาษาพูดของ nämä)
nämä|เหล่านี้
tarviitko|ต้องการไหม (ภาษาพูดของ tarvitsetko)
kiitti|ขอบคุณ (ภาษาพูด)
no|เอาล่ะ / งั้น (คำเสริมบทสนทนา)
joo|ใช่ (ภาษาพูด)
Tuleeks muuta?|รับอย่างอื่นอีกไหม (ภาษาพูด)
Tuleeks nää samasta?|จ่ายรวมกันไหม (ภาษาพูด)
Tarviitko kuittia?|ต้องการใบเสร็จไหม (ภาษาพูด)
kolme viiskyt|สามยูโรห้าสิบเซนต์ (การพูดราคา 3,50 €)
`);
const spokenNumbers = group('ตัวเลขภาษาพูด', `
yks|หนึ่ง (1)
kaks|สอง (2)
kolmee|สาม (รูปภาษาพูดตามบริบท)
viis|ห้า (5)
kuus|หก (6)
seittemän|เจ็ด (7)
seiska|เลขเจ็ด (ภาษาพูด)
kaheksan|แปด (8)
kasi|เลขแปด (ภาษาพูด)
yheksän|เก้า (9)
ysi|เลขเก้า (ภาษาพูด)
kymppi|เลขสิบ / สิบยูโร (ภาษาพูด)
ykstoist|สิบเอ็ด (11)
ykstoista|สิบเอ็ด (11; อีกแบบ)
kakstoist|สิบสอง (12)
kakstoista|สิบสอง (12; อีกแบบ)
kolmetoist|สิบสาม (13)
neljätoist|สิบสี่ (14)
viistoist|สิบห้า (15)
kuustoist|สิบหก (16)
seittemäntoist|สิบเจ็ด (17)
kaheksantoist|สิบแปด (18)
yheksäntoist|สิบเก้า (19)
kakskyt|ยี่สิบ (20)
kakskymmentä|ยี่สิบ (20; อีกแบบ)
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
satku|หนึ่งร้อย / หนึ่งร้อยยูโร (ภาษาพูด)
tonni|หนึ่งพัน / หนึ่งพันยูโร (ภาษาพูด); ตัน (หน่วยน้ำหนัก)
`);
const exerciseInstructions = group('คำสั่งในแบบฝึกหัด', `
harjoitus|แบบฝึกหัด
harjoitukset|แบบฝึกหัดหลายข้อ
kotitehtävä|การบ้าน
kuuntele|ฟัง! (คำสั่ง)
lue|อ่าน! (คำสั่ง)
kirjoita|เขียน! (คำสั่ง)
sano|พูด! (คำสั่ง)
katso|ดู! (คำสั่ง)
kysy|ถาม! (คำสั่ง)
yhdistä|จับคู่ / เชื่อม! (คำสั่ง)
valitse|เลือก! (คำสั่ง)
täydennä|เติมให้ครบ! (คำสั่ง)
taivuta|ผันคำ! (คำสั่ง)
vertaa|เปรียบเทียบ! (คำสั่ง)
esittele|แนะนำ! (คำสั่ง)
pari|คู่ / คู่ฝึก
parilta|จากคู่ฝึก
parille|ให้คู่ฝึก
malli|ตัวอย่าง / แบบ
sivu|หน้า
sivut|หลายหน้า
ratkaisu|คำตอบ / วิธีแก้
vastaukset|คำตอบหลายข้อ
`);

const alphabetNames = group('ชื่ออักษร', `
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
tee|ชื่ออักษร T; ชา / ทำ! (ตามบริบท)
uu|ชื่ออักษร U
vee|ชื่ออักษร V
kaksois-vee|ชื่ออักษร W
äks|ชื่ออักษร X
yy|ชื่ออักษร Y
tseta|ชื่ออักษร Z
ruotsalainen oo|ชื่ออักษร Å
ää|ชื่ออักษร Ä
öö|ชื่ออักษร Ö
`);
// Numbers in arithmetic and listening are compositional; include the complete 0–100 range.
const units = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
const numberRange: Entry[] = Array.from({length:101},(_,n)=>({
  fi:n<10 ? units[n] : n===10 ? 'kymmenen' : n<20 ? `${units[n-10]}toista` : n===100 ? 'sata' : `${units[Math.floor(n/10)]}kymmentä${n%10 ? units[n%10] : ''}`,
  th:`จำนวน ${n}`,category:'ตัวเลข 0–100',
}));
const lesson1 = unique(alphabetNames, greetings, introduction, time, sounds, spokenBasics,
  locations.filter(e => ['Suomi','Ruotsi','Saksa'].includes(e.fi)),
  spokenNumbers.filter(e => e.fi==='kakskytyks'));
const lesson2 = unique(numberRange, greetings, introduction, time, spokenBasics, numbers, lessonTwoTopics,
  pronunciationPairs, sounds, exerciseInstructions,
  locations.filter(e => ['Suomi','Suomessa','Helsinki','Helsingissä','Inari','Joensuu','Kajaani','Lappeenranta','Oulu','Ouluun','Rovaniemi','Tampere','Turku','Vaasa'].includes(e.fi)),
  food.filter(e => ['kahvi','kahvia','ruoka','ruokaa'].includes(e.fi)),
  verbEntries.filter(e => ['ostaa','ostan','maksaa','olla'].includes(e.fi)));
const lesson3 = unique(numberRange, introduction, time, numbers, grammar, locations, nationalities, languages,
  food, verbEntries, negatives, spokenBasics, personal, exerciseInstructions);
const lesson4 = unique(numberRange, introduction, greetings, time, numbers, grammar, locations, nationalities,
  languages, food, verbEntries, negatives, spokenBasics, personal, spokenShop, spokenNumbers, exerciseInstructions);

export const vocabularyEarly: Record<string, Entry[]> = {
  '1': lesson1,
  '2': lesson2,
  '3': lesson3,
  '4': lesson4,
  test1: unique(lesson1, lesson2, lesson3, lesson4),
};
