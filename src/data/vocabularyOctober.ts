import lessonFiveVocabulary from './lessonFiveVocabulary.json';
import { vocabulary as lessonSevenVocabulary } from './lessonSevenVocabulary';
import { verbPhrases, timeMarkers, weatherCities } from './lessonSixContent';

type Word = { fi: string; th: string; category?: string };

// Headwords and the inflected forms actually used in the lessons are separate
// searchable entries. Semicolon-separated forms share a lexical Thai gloss;
// they are not presented as interchangeable grammatical forms.
const words = (category: string, text: string): Word[] => text.trim().split('\n').flatMap(line => {
  const [forms, th] = line.split('|');
  return forms.split(';').map(fi => ({ fi: fi.trim(), th, category }));
});
const unique = (...groups: Word[][]): Word[] => {
  const found = new Map<string, Word>();
  for (const word of groups.flat()) if (!found.has(word.fi)) found.set(word.fi, word);
  return [...found.values()];
};
const quizlet = (sets: (keyof typeof lessonFiveVocabulary)[]) => sets.flatMap(set =>
  lessonFiveVocabulary[set].map(({ fi, th }) => ({ fi, th, category: `Quizlet · ${set}` })));

const common = words('คำพื้นฐานและคำเชื่อม', `
minä|ฉัน
sinä|คุณ
hän|เขา / เธอ
me|พวกเรา
te|พวกคุณ / คุณ (สุภาพ)
he|พวกเขา
minun|ของฉัน
sinun|ของคุณ
hänen|ของเขา / ของเธอ
meidän|ของพวกเรา
teidän|ของพวกคุณ
heidän|ของพวกเขา
se|มัน / สิ่งนั้น
ne|พวกมัน / สิ่งเหล่านั้น
tämä|นี่ / สิ่งนี้
olla|เป็น / อยู่ / มี (ตามโครงสร้าง)
olen|ฉันเป็น / ฉันอยู่
olet|คุณเป็น / คุณอยู่
on|เป็น / อยู่ / มี (เอกพจน์)
olemme|พวกเราเป็น / พวกเราอยู่
olette|พวกคุณเป็น / พวกคุณอยู่
ovat|เป็น / อยู่ (พหูพจน์)
ole|รูปปฏิเสธของ olla เช่น ei ole = ไม่เป็น / ไม่มี
en|ไม่ (ประธาน minä)
et|ไม่ (ประธาน sinä)
ei|ไม่ (ประธาน hän หรือสิ่งเดียว)
emme|ไม่ (ประธาน me)
ette|ไม่ (ประธาน te)
eivät|ไม่ (ประธาน he หรือหลายสิ่ง)
ja|และ
mutta|แต่
tai|หรือ
että|ว่า / จน (เชื่อมประโยค)
koska|เพราะ / เมื่อ (ตามบริบท)
kun|เมื่อ
myös|ด้วย / เช่นกัน
nyt|ตอนนี้
jo|แล้ว
vielä|ยัง / อีก
aina|เสมอ
usein|บ่อย
joskus|บางครั้ง
vain|เพียง / เท่านั้น
paljon|มาก / จำนวนมาก
vähän|น้อย / เล็กน้อย
aika|เวลา; ค่อนข้าง (หน้าคำคุณศัพท์)
tosi|มาก / จริง ๆ
niin|อย่างนั้น / มากขนาดนั้น
kovin|มากนัก (เช่น ei kovin = ไม่ค่อย)
joka|ทุก (เช่น joka päivä)
monta|หลาย / กี่ (ในคำถาม)
pari|สอง / สองสาม; คู่ / คู่เรียน (ตามบริบท)
puoli|ครึ่ง
kuinka|อย่างไร / เท่าไร
montako|กี่
millainen|เป็นอย่างไร / แบบไหน
mitä|อะไร (รูป partitive)
mikä|อะไร (รูปพื้นฐาน)
kuka|ใคร
missä|ที่ไหน
milloin|เมื่อไร
miten|อย่างไร
miksi|ทำไม
kyllä|ใช่ / แน่นอน
joo|ใช่ (ภาษาพูด)
no|อืม / เอาล่ะ (คำขึ้นต้นบทสนทนา)
kiitos|ขอบคุณ
anteeksi|ขอโทษ
hyvin|ดี (คำขยายกริยา)
yksi|หนึ่ง
kaksi|สอง
kolme|สาม
neljä|สี่
viisi|ห้า
kuusi|หก
seitsemän|เจ็ด
kahdeksan|แปด
yhdeksän|เก้า
kymmenen|สิบ
nolla|ศูนย์
`);

const instructions = words('คำสั่งและไวยากรณ์', `
harjoitus;harjoitukset;harjoituksen|แบบฝึกหัด
sivu;sivulla;sivut|หน้า (หนังสือ)
kirjoittaa;kirjoita|เขียน; kirjoita = จงเขียน
lukea;lue|อ่าน; lue = จงอ่าน
kuunnella;kuuntele|ฟัง; kuuntele = จงฟัง
kysyä;kysy|ถาม; kysy = จงถาม
vastata;vastaa|ตอบ; vastaa = จงตอบ
valita;valitse|เลือก; valitse = จงเลือก
yhdistää;yhdistä|เชื่อม / จับคู่
kääntää;käännä|แปล
tarkistaa;tarkista|ตรวจ / ตรวจสอบ
muistaa;muista|จำ / อย่าลืม
sana;sanat;sanan|คำ / คำศัพท์
lause;lauseeseen;lauseet|ประโยค
teksti;tekstin|ข้อความ / บทอ่าน
kuva;kuvat|รูปภาพ
pari;parilta;parin|คู่ / คู่เรียน
vastaus;vastaukset|คำตอบ
malli|ตัวอย่าง
esimerkki|ตัวอย่าง
vastakohta;vastakohdat|คำตรงข้าม
ristikko;ristikkoon|ปริศนาอักษรไขว้ / ลงในตารางปริศนา
verbi;verbit|คำกริยา
adjektiivi;adjektiivit|คำคุณศัพท์
persoonapronomini;persoonapronominit|บุรุษสรรพนาม
persoona|บุคคลทางไวยากรณ์
oikea|ถูกต้อง
oikein|ถูก / อย่างถูกต้อง
väärin|ผิด
yksikkö|เอกพจน์
monikko;t-monikko|พหูพจน์; t-monikko = พหูพจน์ลงท้าย -t
genetiivi|รูป genitive / รูปแสดงเจ้าของ
partitiivi;partitiivissa|รูป partitive / ในรูป partitive
perusmuoto|รูปพื้นฐาน
kieli;kieltä|ภาษา
suomi;suomea;suomen|ภาษาฟินแลนด์
Suomi;Suomessa;Suomen|ประเทศฟินแลนด์ / ในฟินแลนด์ / ของฟินแลนด์
vokaali;vokaalia|สระ
konsonantti|พยัญชนะ
ääntäminen|การออกเสียง
`);

const weatherWords = words('อากาศและอุณหภูมิ', `
sää;sään|สภาพอากาศ
ilma;ilman|อากาศ / สภาพอากาศ
aurinko|พระอาทิตย์
paistaa;paista|ส่องแสง (paista ใช้หลัง ei)
aurinkoinen;aurinkoista|มีแดด
pilvi|เมฆ
pilvinen;pilvistä|มีเมฆมาก
puolipilvinen;puolipilvistä|มีเมฆบางส่วน
sumu|หมอก
sumuinen;sumuista|มีหมอก
sataa;sada|ฝนตก / หิมะตก (sada ใช้หลัง ei)
sateinen;sateista|มีฝน
vesi;vettä|น้ำ; ใน sataa vettä หมายถึงฝนตก
räntä;räntää|ฝนปนหิมะ
lumi;lunta|หิมะ
tuuli|ลม
tuulla;tuulee;tuule|ลมพัด (tuule ใช้หลัง ei)
tuulinen;tuulista|มีลม
myrsky|พายุ
ukkonen|พายุฝนฟ้าคะนอง
salamoida;salamoi|มีฟ้าแลบ
pakkanen;pakkasta|อากาศเยือกแข็ง / อุณหภูมิต่ำกว่าศูนย์
helle|อากาศร้อนจัด
pouta|สภาพอากาศที่ไม่มีฝน
aste;astetta;asteen|องศา
lämmin;lämmintä;lämpimän|อบอุ่น; lämmintä ใช้บอกอุณหภูมิเหนือศูนย์ด้วย
kuuma;kuumaa|ร้อน
kylmä;kylmää|หนาว / เย็น
viileä;viileää|เย็นสบาย / ค่อนข้างเย็น
ulkona|ข้างนอก
maassa|บนพื้นดิน
kovaa|แรง / อย่างแรง
kamala|แย่มาก / น่ากลัว
ihana;ihanaa|ดีเหลือเกิน / น่าชื่นใจ
onpa|ช่าง…จัง (on + คำเน้น -pa)
No niin on!|นั่นสิ เป็นอย่างนั้นจริง ๆ!
loskasää|อากาศที่มีหิมะละลายเละ
`);
const seasons = words('เวลา ฤดูกาล และวัน', `
vuodenaika;vuodenajat;vuodenaikaa|ฤดู / ฤดูกาล
talvi;talvella;talvea|ฤดูหนาว / ในฤดูหนาว
kevät;keväällä;kevättä|ฤดูใบไม้ผลิ / ในฤดูใบไม้ผลิ
kesä;kesällä;kesää;kesän|ฤดูร้อน / ในฤดูร้อน
syksy;syksyllä;syksyn|ฤดูใบไม้ร่วง / ในฤดูใบไม้ร่วง
kuukausi;kuukaudessa|เดือน / ในเดือน
tammikuu;tammikuussa|มกราคม / ในเดือนมกราคม
helmikuu;helmikuussa|กุมภาพันธ์ / ในเดือนกุมภาพันธ์
maaliskuu;maaliskuussa|มีนาคม / ในเดือนมีนาคม
huhtikuu;huhtikuussa|เมษายน / ในเดือนเมษายน
toukokuu;toukokuussa|พฤษภาคม / ในเดือนพฤษภาคม
kesäkuu;kesäkuussa|มิถุนายน / ในเดือนมิถุนายน
heinäkuu;heinäkuussa|กรกฎาคม / ในเดือนกรกฎาคม
elokuu;elokuussa|สิงหาคม / ในเดือนสิงหาคม
syyskuu;syyskuussa|กันยายน / ในเดือนกันยายน
lokakuu;lokakuussa|ตุลาคม / ในเดือนตุลาคม
marraskuu;marraskuussa|พฤศจิกายน / ในเดือนพฤศจิกายน
joulukuu;joulukuussa|ธันวาคม / ในเดือนธันวาคม
vuorokausi|หนึ่งวันเต็ม 24 ชั่วโมง
aamu;aamulla|ตอนเช้า / ในตอนเช้า
aamupäivä;aamupäivällä|ช่วงสาย / ก่อนเที่ยง
päivä;päivällä;päivässä;päivää|วัน / กลางวัน / ต่อวัน (ตามรูป)
iltapäivä;iltapäivällä|ตอนบ่าย / ในตอนบ่าย
ilta;illalla;illat|ตอนเย็น / ในตอนเย็น / หลายยามเย็น
yö;yöllä;yön|กลางคืน / ในตอนกลางคืน
tänään|วันนี้
huomenna|พรุ่งนี้
ylihuomenna|มะรืนนี้
viikko;viikossa|สัปดาห์ / ต่อสัปดาห์
viikonloppu;viikonloppuna|สุดสัปดาห์ / ในช่วงสุดสัปดาห์
maanantai;maanantaina|วันจันทร์ / ในวันจันทร์
tiistai;tiistaina|วันอังคาร / ในวันอังคาร
keskiviikko;keskiviikkona|วันพุธ / ในวันพุธ
torstai;torstaina|วันพฤหัสบดี / ในวันพฤหัสบดี
perjantai;perjantaina|วันศุกร์ / ในวันศุกร์
lauantai;lauantaina|วันเสาร์ / ในวันเสาร์
sunnuntai;sunnuntaina|วันอาทิตย์ / ในวันอาทิตย์
tunti;tuntia|ชั่วโมง
kello;klo|นาฬิกา / เวลา; klo เป็นตัวย่อของ kello
`);
const adjectives = words('คำคุณศัพท์ สี และปริมาณ', `
hyvä;hyvää;hyvän|ดี
huono;huonon|ไม่ดี / แย่
vaikea;vaikeaa;vaikean|ยาก
helppo;helpon|ง่าย
pieni;pienet|เล็ก
iso;isoa;ison|ใหญ่
suuri|ใหญ่
uusi;uuden|ใหม่
vanha;vanhaa;vanhan|เก่า / แก่
kaunis;kaunista|สวย
ruma|น่าเกลียด
valoisa;valoisaa;valoisat|สว่าง
pimeä;pimeää|มืด
lyhyt|สั้น
pitkä;pitkää;pitkät;pitkän|ยาว / สูง
kiva;kivan|ดี / น่าอยู่ / น่ารัก
mukava;mukavat|ใจดี / น่ารัก / เป็นมิตร
vapaa;vapaat|ว่าง / อิสระ
väri;värit|สี
punainen|สีแดง
keltainen|สีเหลือง
oranssi|สีส้ม
ruskea|สีน้ำตาล
sininen|สีน้ำเงิน / สีฟ้า
vihreä;vihreät|สีเขียว
harmaa|สีเทา
musta;mustaa|สีดำ
valkoinen|สีขาว
pinkki|สีชมพู
violetti;liila|สีม่วง
beige|สีเบจ
vaaleanpunainen|สีชมพูอ่อน
tummansininen|สีน้ำเงินเข้ม
tumma|สีเข้ม / มืด
vaalea|สีอ่อน / สว่าง
minkävärinen|สีอะไร
`);

const everyday = words('ชีวิตประจำวันและสถานที่', `
koti;kodin;kodit|บ้าน
kotona|ที่บ้าน
kotiin|กลับบ้าน / ไปบ้าน
kirja;kirjaa;kirjan|หนังสือ
ystävä;ystävät;ystävän|เพื่อน
koulu;koulussa|โรงเรียน / ที่โรงเรียน
lapsi;lapset|เด็ก / ลูก
ihminen;ihmiset|คน / ผู้คน
suomalainen;suomalaiset|ชาวฟินแลนด์ / เกี่ยวกับฟินแลนด์
maa;maat|ประเทศ / พื้นดิน
puisto;puistossa|สวนสาธารณะ / ในสวนสาธารณะ
kaupunki;kaupungin|เมือง
kurssi;kurssilla;kurssille;kurssin;kurssit|คอร์ส / ในคอร์ส / ไปเรียนคอร์ส
opettaja;opettajan;opettajat|ครู
opiskelija;opiskelijat|นักเรียน / นักศึกษา
asunto;asunnot|ที่พัก / อพาร์ตเมนต์
auto;autolla|รถยนต์ / โดยรถยนต์
bussi;bussilla|รถบัส / โดยรถบัส
televisio;televisiota|โทรทัศน์
sähköposti;sähköpostia;sähköpostin|อีเมล
piano;pianoa|เปียโน
ruoka;ruokaa|อาหาร
kahvi;kahvia|กาแฟ
pulla;pullaa|ขนมปังหวานฟินแลนด์
`);
const everydayVerbs = words('กริยาและรูปที่พบในแบบฝึก', `
tehdä;teen;teet;tekee;tekevät;teette|ทำ
soittaa;soitan;soita|โทร / เล่นเครื่องดนตรี
lukea;luen;lue|อ่าน
kirjoittaa;kirjoitan;kirjoittavat;kirjoita|เขียน
nukkua;nukun;nukkuu;nukkuvat;nuku|นอน
istua;istun;istuvat|นั่ง
katsoa;katson;katsovat|ดู
odottaa;odotan;odottavat|รอ
rakastaa;rakastan|รัก
puhua;puhun;puhuvat;puhu|พูด
mennä;menen;menevät|ไป
tulla;tulee|มา
auttaa|ช่วย
voida;voitko|สามารถ; voitko = คุณ…ได้ไหม
`);

const lessonFiveExtra = words('บทอ่าน ฤดูกาล และแบบฝึก 9 / 12 / 23', `
normaalisti|โดยปกติ
Etelä-Suomi;Etelä-Suomessa|ฟินแลนด์ตอนใต้ / ในฟินแลนด์ตอนใต้
hiihtää;hiihtävät;hiihdän;hiihdä|เล่นสกี
luistella;luistelevat|เล่นสเก็ต
puu;puut|ต้นไม้
kukka;kukat|ดอกไม้
kukkia;kukkivat|ผลิบาน
tulppaani;tulppaanit|ดอกทิวลิป
narsissi;narsissit|ดอกแดฟโฟดิล / นาร์ซิสซัส
kesäloma|วันหยุดฤดูร้อน
loma;lomalla|วันหยุด / ในวันหยุด
kesämökki;kesämökillä|บ้านพักฤดูร้อน / ที่บ้านพักฤดูร้อน
mökki;mökillä|บ้านพักตากอากาศ / ที่บ้านพัก
sauna;saunassa;saunaan|ซาวน่า / ในซาวน่า / ไปซาวน่า
uida;uivat;ui|ว่ายน้ำ
metsä;metsään|ป่า / เข้าไปในป่า
marja;marjat|ผลเบอร์รี
sieni;sienet|เห็ด
meri|ทะเล
matka;matkalle|การเดินทาง / ออกเดินทาง
lähteä;lähtee|ออกเดินทาง / ไปจาก
kylpeä;kylven|อาบน้ำแช่ในอ่าง
onkia;ongin;ongimme|ตกปลา
yöpyä;yövyn;yövymme|พักค้างคืน
Paula|Paula (ชื่อบุคคล)
takki|เสื้อแจ็กเก็ต
minua|ฉัน (รูป partitive เช่น auttaa minua)
Helsinki|เฮลซิงกิ (เมืองหลวงฟินแลนด์)
Ähtäri|แอห์แตริ (เมืองในฟินแลนด์)
kolmetoista|สิบสาม
kolmekymmentäneljä|สามสิบสี่
kaksikymmentäviisi|ยี่สิบห้า
kaksikymmentäseitsemän|ยี่สิบเจ็ด
yhdeksäntoista|สิบเก้า
`);

const lessonSixExtra = words('กริยา เวลา การเดินทาง และการบ้าน', `
olla töissä|อยู่ที่ทำงาน
työ;töissä|งาน / อยู่ที่ทำงาน
ostaa;ostan|ซื้อ
soittaa ystävälle|โทรหาเพื่อน
ystävälle|ถึงเพื่อน / หาเพื่อน
lähettää;lähetän|ส่ง
viesti;viestiä|ข้อความ
kahvila;kahvilassa|คาเฟ่ / ในคาเฟ่
tanssia;tanssin|เต้นรำ
laulaa;laulan|ร้องเพลง
matkustaa;matkustan|เดินทาง
lähteä;lähden;lähdemme|ออกเดินทาง
hiihtää;hiihdän|เล่นสกี
piirtää;piirrän|วาด
ottaa;otan|เอา / รับ / หยิบ
valokuva;valokuvia;valokuvaa|ภาพถ่าย
ottaa valokuvia|ถ่ายรูป
pitkään|นาน
ajaa;ajan;ajamme|ขับ / เดินทางโดยพาหนะ
keskusta;keskustaan|ใจกลางเมือง / ไปใจกลางเมือง
oppia;opin|เรียนรู้
leipoa;leivon|อบขนม
ystävän kanssa|กับเพื่อน
kanssa|กับ
puhelu;puhelut|สายโทรศัพท์ / การโทร
paikka;paikat|ที่ / สถานที่
työpaikka|ที่ทำงาน / งาน
Paula|Paula (ชื่อบุคคล)
pizza;pizzat|พิซซ่า
loppua;loppuu|จบ / สิ้นสุด
maksaa;maksavat|มีราคา / จ่าย
yhteensä|รวมกัน / ทั้งหมด
euro;euroa|ยูโร
kohta|อีกสักครู่ / เร็ว ๆ นี้
numero|หมายเลข
bussipysäkki;bussipysäkille|ป้ายรถบัส / ไปยังป้ายรถบัส
Helsingissä|ในเฮลซิงกิ
lentää;lennämme|บิน
lentokone;lentokoneessa;lentokoneella|เครื่องบิน / บนเครื่องบิน / โดยเครื่องบิน
saapua;saavumme|มาถึง
sanoa;sanovat|พูด / กล่าว
puhutteko|พวกคุณพูด…ไหม
katsoa;katsomme|ดู / พวกเราดู
postikortti;postikortit|โปสการ์ด
Suomeen|ไปฟินแลนด์
kioski;kioskille|ร้านคีออสก์ / ไปคีออสก์
kartta;kartan|แผนที่
yöpyä;yövymme|ค้างคืน
asua;asuvat|อาศัยอยู่
löytää;löydä|หาเจอ / พบ (löydä ใช้ในปฏิเสธ)
talo;taloa|บ้าน / อาคาร
heti|ทันที
siksi|ดังนั้น
kertoa;kertoo|บอก / เล่า
Ranska;Ranskaan|ฝรั่งเศส / ไปฝรั่งเศส
ranska;ranskaa|ภาษาฝรั่งเศส
Pariisi;Pariisiin;Pariisin|ปารีส / ไปปารีส / ของปารีส
Etelä-Pariisissa|ในปารีสตอนใต้
Pekka|Pekka (ชื่อบุคคล)
Elise;Elisen;Eliselle|Elise (ชื่อบุคคล; ของ Elise / ถึง Elise)
Fabian;Fabianin|Fabian (ชื่อบุคคล / ของ Fabian)
Tervetuloa!|ยินดีต้อนรับ!
Lappeenranta|ลัปเปนรันตา (เมืองในฟินแลนด์)
Oulu|โอลู (เมืองในฟินแลนด์)
Tampere|ตัมเปเร (เมืองในฟินแลนด์)
Rovaniemi|โรวาเนียมิ (เมืองในฟินแลนด์)
Turku|ตุรกุ (เมืองในฟินแลนด์)
siellä|ที่นั่น
`);
const cityNames: Record<string, string> = {
  Tokio: 'โตเกียว', Vancouver: 'แวนคูเวอร์', 'Los Angeles': 'ลอสแอนเจลิส',
  'New York': 'นิวยอร์ก', Nuuk: 'นูก', Berliini: 'เบอร์ลิน', Novosibirsk: 'โนโวซีบีร์สค์',
  Caracas: 'การากัส', Dakar: 'ดาการ์', Riad: 'ริยาด', Delhi: 'เดลี', Nairobi: 'ไนโรบี',
  Singapore: 'สิงคโปร์', Kapkaupunki: 'เคปทาวน์', 'Buenos Aires': 'บัวโนสไอเรส', Sydney: 'ซิดนีย์',
};
const cities = weatherCities.flatMap(([city, where]) => [
  { fi: city, th: cityNames[city], category: 'เมืองในแผนที่แบบฝึก 14' },
  { fi: where, th: `ใน${cityNames[city]}`, category: 'เมืองในแผนที่แบบฝึก 14' },
]);

const pedroReading = words('Pedro soittaa Mikolle · บทอ่านและคำสำคัญ', `
ystävä;ystävän;ystävät|เพื่อน
videopuhelu;videopuhelun|วิดีโอคอล
soittaa;soitan|โทร / เล่นเครื่องดนตรี
töissä|ที่ทำงาน / กำลังทำงาน
asua;asuu;asutteko;asumme|อาศัยอยู่
vasta|เพิ่ง / ยังแค่ / จนกระทั่ง (ตามบริบท)
puoli kahdeksan|เจ็ดโมงครึ่ง
Ai niin, totta.|อ้อ จริงด้วย
totta|จริง
ihan|ค่อนข้าง / ทีเดียว / อย่างเต็มที่ (ตามบริบท)
ihan hyvää|สบายดี
kuulua;kuuluu|เป็นอย่างไร (ใน Mitä kuuluu?); ได้ยิน / เป็นส่วนหนึ่งของ
Mitä kuuluu?|เป็นอย่างไรบ้าง
-kin|ด้วย / เช่นกัน (คำต่อท้าย)
tänäänkin|วันนี้ก็…ด้วย
kaatamalla|อย่างเทลงมา (ใน sataa kaatamalla = ฝนเทลงมา)
Aijaa!;Ai jaa!|อ้าว เหรอ!
täällä|ที่นี่
kesäyö;kesäyöt|คืนในฤดูร้อน
nauttia;nauti|เพลิดเพลิน / ใช้เวลาให้มีความสุข
sitten|จากนั้น / แล้ว
kuulemma|ได้ยินมาว่า / ตามที่เขาว่ากัน
muuta|อย่างอื่น / เรื่องอื่น
työpaikka|ที่ทำงาน / งาน
etsiä;etsin|หา
työ;töitä;töihin|งาน / หางาน (ใน etsiä töitä) / ไปทำงาน
Hieno juttu!|ดีมากเลย!
hieno|ดีเยี่ยม
juttu|เรื่อง / สิ่ง / ข่าว
sama;samalla|เดียวกัน / ใน…เดียวกัน
maanantaisin|ทุกวันจันทร์
keskiviikkoisin|ทุกวันพุธ
torstaisin|ทุกวันพฤหัสบดี
kerta;kertaa|ครั้ง
viikossa|ต่อสัปดาห์
Ohhoh!|โอ้โห!
kohta|อีกไม่นาน / อีกสักครู่
yhtä hyvin kuin|ดีเท่ากับ
yhtä|เท่ากัน (ใช้เปรียบเทียบ)
kuin|กว่า / เท่ากับ (ส่วนเชื่อมการเปรียบเทียบ)
Niin varmaan.|คงงั้นมั้ง / เชื่อเลย (ในบทนี้แฝงความไม่เชื่อ)
varmaan|คงจะ / น่าจะ
opiskelija-asunto;opiskelija-asunnossa|ห้องพักนักศึกษา / ในห้องพักนักศึกษา
muuttaa;muutamme;muuttavat|ย้าย
kuulostaa|ฟังดู
hyvältä|ดี (ใน kuulostaa hyvältä = ฟังดูดี)
minun täytyy|ฉันต้อง
täytyä;täytyy|ต้อง
lähteä|ออกเดินทาง / ไปจาก
terveisiä|คำทักทาย / ฝากความคิดถึง
kertoa;kerron|บอก / เล่า
hei;moi;moikka;moi moi|สวัสดี / บ๊ายบาย (ตามบริบท)
heh heh|ฮ่า ๆ (เสียงหัวเราะ)
Mikko;Mikolle|Mikko (ชื่อบุคคล) / ถึง Mikko
Pedro;Pedron;Pedrolle|Pedro (ชื่อบุคคล) / ของ Pedro / ถึง Pedro
Hanna;Hannan;Hannalle|Hanna (ชื่อบุคคล) / ของ Hanna / ถึง Hanna
Olga;Olgan|Olga (ชื่อบุคคล) / ของ Olga
Alex;Alexin|Alex (ชื่อบุคคล) / ของ Alex
Brasilia;Brasiliassa|บราซิล / ในบราซิล
São Paolossa|ในเซาเปาลู (คงการสะกดตามบทอ่าน)
Espoo;Espoossa|เอสโป / ในเอสโป
Helsinki;Helsingissä;Helsingin|เฮลซิงกิ / ในเฮลซิงกิ / ของเฮลซิงกิ
`);

const genitive = words('Genetiivi · คำจากหน้า 66 และแบบฝึก 16–17', `
kenen|ของใคร
minkä|ของอะไร
kiva;kivan|น่ารัก / ดี
tyttö;tytön|เด็กหญิง
tyttöystävä|แฟนผู้หญิง
kotimaa|ประเทศบ้านเกิด
nimi;nimen|ชื่อ
pitkä;pitkän|ยาว
opiskelija;opiskelijan|นักเรียน / นักศึกษา
sanakirja|พจนานุกรม
äidinkieli|ภาษาแม่
äiti;äidin|แม่
Jaakko;Jaakon|Jaakko (ชื่อบุคคล) / ของ Jaakko
jäätelö|ไอศกรีม
poliisi;poliisin|ตำรวจ
vanha;vanhan|เก่า / สูงวัย
isoäiti;isoäidin|ย่า / ยาย
katu;kadun|ถนน
maa;maan|ประเทศ / พื้นดิน
pääkaupunki|เมืองหลวง
Islanti;Islannin|ไอซ์แลนด์ / ของไอซ์แลนด์
presidentti|ประธานาธิบดี
New York;New Yorkin|นิวยอร์ก / ของนิวยอร์ก
kartta|แผนที่
tauko|ช่วงพัก
iso;ison|ใหญ่
kaupunki;kaupungin|เมือง
helppo;helpon|ง่าย
teksti;tekstin|ข้อความ / บทอ่าน
sanasto|รายการคำศัพท์
Etelä-Afrikka;Etelä-Afrikasta|แอฟริกาใต้ / จากแอฟริกาใต้
kotoisin|มีถิ่นกำเนิดจาก / มาจาก
englanti|ภาษาอังกฤษ
venäjä|ภาษารัสเซีย
portugali|ภาษาโปรตุเกส
somali|ภาษาโซมาลี
alkaa|เริ่ม
Päivi;Päivin|Päivi (ชื่อบุคคล) / ของ Päivi
Koskela|Koskela (นามสกุล)
kirjoitetaan|ถูกเขียน / สะกดว่า
kysyä;kysyy|ถาม
entä|แล้ว…ล่ะ
kolmen|ของสาม (genitive ของ kolme)
ystäväni|เพื่อนของฉัน
kirjasi|หนังสือของคุณ
autonsa|รถของเขา / เธอ / พวกเขา (ตามประธาน)
opettajamme|ครูของเรา
kotimaanne|ประเทศบ้านเกิดของพวกคุณ
kurssinsa|คอร์สของเขา / เธอ / พวกเขา (ตามประธาน)
mun|ของฉัน (ภาษาพูด)
sun|ของคุณ (ภาษาพูด)
sen|ของมัน / ของเขา (ภาษาพูด)
niiden|ของพวกมัน / ของพวกเขา (ภาษาพูด)
toinen|อีกคน / อีกอัน / ที่สอง
nainen|ผู้หญิง
Eurooppa|ยุโรป
käyttää|ใช้
köyhä|ยากจน
juoda|ดื่ม
syödä|กิน
yksiö|ห้องพักแบบสตูดิโอ
haluta;haluan|ต้องการ
tärkeä|สำคัญ
yhtye|วงดนตรี
koe|การสอบ / การทดลอง
jos|ถ้า
sanassa|ในคำ
eri|ต่างกัน
sanoa;sano|พูด / ออกเสียง
molemmat|ทั้งสอง
`);

const sevenHomework = words('ใบงานแปล กริยา และสำนวนการบ้าน', `
otsikko|หัวข้อ / ชื่อเรื่อง
Helsingistä|จากเฮลซิงกิ
päivät|วันต่าง ๆ
sähköposti;sähköpostin;sähköpostia|อีเมล
ehkä|อาจจะ
tietää;tiedä;tiedätkö|รู้; tiedätkö = คุณรู้ไหม
ottaa;otan|เอา / รับ / หยิบ
kirjoitamme|พวกเราเขียน
Chile;Chilen|ชิลี / ของชิลี
pingviini;pingviinit|เพนกวิน
lentää;lennä|บิน (lennä ใช้หลังคำปฏิเสธ)
hiihtää;hiihdämme|เล่นสกี
ymmärtää;ymmärrättekö|เข้าใจ; ymmärrättekö = พวกคุณเข้าใจไหม
sanon|ฉันพูด
lähde|ออกเดินทาง (รูปปฏิเสธของ lähteä)
Espanja;Espanjaan|สเปน / ไปสเปน
lähettää;lähetättekö|ส่ง; lähetättekö = พวกคุณส่งไหม
lue|อ่าน (รูปปฏิเสธของ lukea / คำสั่งให้อ่าน)
soitat|คุณเล่นเครื่องดนตรี / คุณโทร
kitara;kitaraa|กีตาร์
melkein|เกือบ
koko ajan|ตลอดเวลา
koko|ทั้ง / ทั้งหมด
ajan|เวลา (genitive ของ aika)
Italia;Italiaan|อิตาลี / ไปอิตาลี
Sisilia;Sisiliassa|ซิซิลี / ในซิซิลี
viikkoa|สัปดาห์ (หลังจำนวน)
Petteri;Petterin|Petteri (ชื่อบุคคล) / ของ Petteri
chileläinen|ชาวชิลี
syön|ฉันกิน
pallo;palloa|ลูกบอล; ลูก / สกู๊ป (ไอศกรีม)
jäätelöä|ไอศกรีม (รูป partitive)
Laura;Lauralle|Laura (ชื่อบุคคล) / ถึง Laura
vaan|แต่เป็น… (แก้ข้อมูลหลังประโยคปฏิเสธ)
ala|เริ่ม (รูปปฏิเสธของ alkaa)
ostaa;ostan|ซื้อ
oppia;oppii|เรียนรู้
tanssia;tanssi|เต้นรำ
matkustaa;matkusta|เดินทาง
leipoa;leivo|อบขนม
pitkään|เป็นเวลานาน
`);

const partitive = words('Partitiivi · รูปคำในหน้า 95–96 และการบ้าน', `
minua;mua|ฉัน (กรรม partitive; mua เป็นภาษาพูด)
sinua;sua|คุณ (กรรม partitive; sua เป็นภาษาพูด)
häntä|เขา / เธอ (กรรม partitive)
sitä|มัน; เขา / เธอในภาษาพูด (รูป partitive)
meitä|พวกเรา (กรรม partitive)
teitä|พวกคุณ (กรรม partitive)
heitä|พวกเขา (กรรม partitive)
niitä|พวกมัน; พวกเขาในภาษาพูด (รูป partitive)
ketä|ใคร (กรรม partitive)
mä|ฉัน (ภาษาพูด)
talo;taloa|บ้าน / อาคาร
bussi;bussia|รถบัส
maa;maata|ประเทศ / พื้นดิน
museo;museota|พิพิธภัณฑ์
puhelin;puhelinta|โทรศัพท์
kaunis;kaunista|สวย
kirje;kirjettä|จดหมาย
vene;venettä|เรือ
osoite;osoitetta|ที่อยู่
huone;huonetta|ห้อง
jäätelö;jäätelöä|ไอศกรีม
mies;miestä|ผู้ชาย / สามี
tietokone;tietokonetta|คอมพิวเตอร์
maito;maitoa|นม
sokeri;sokeria|น้ำตาล
tyttö;tyttöä|เด็กหญิง
kilo;kiloa|กิโลกรัม
auto;autoa|รถยนต์
kissa;kissaa|แมว
ihminen;ihmistä|คน
vesi;vettä|น้ำ
katu;katua;kadulla|ถนน / บนถนน
kurssi;kurssia|คอร์ส
puu;puuta|ต้นไม้
opiskelija;opiskelijaa|นักเรียน / นักศึกษา
aste;astetta|องศา
puisto;puistoa|สวนสาธารณะ
yö;yötä|คืน
avain;avainta|กุญแจ
kysymys;kysymystä|คำถาม
kahvi;kahvia|กาแฟ
perhe;perhettä|ครอบครัว
teksti;tekstiä|ข้อความ / บทอ่าน
televisio;televisiota|โทรทัศน์
kaupunki;kaupunkia|เมือง
hotelli;hotellia|โรงแรม
japani;japania|ภาษาญี่ปุ่น
elokuva;elokuvaa|ภาพยนตร์
James Bond -elokuva;James Bond -elokuvaa|ภาพยนตร์ James Bond
piano;pianoa|เปียโน
poika;poikaa|เด็กชาย
kirja;kirjaa|หนังสือ
tee;teetä|ชา
radio;radiota|วิทยุ
lentokone;lentokonetta|เครื่องบิน
työpaikka;työpaikkaa|งาน / ตำแหน่งงาน
saksa;saksaa|ภาษาเยอรมัน
englanti;englantia|ภาษาอังกฤษ
kitara;kitaraa|กีตาร์
italia;italiaa|ภาษาอิตาลี
`);
const eightExtra = words('แบบฝึกสรรพนาม อากาศ และการสนทนา', `
auttaa;autan;autatko|ช่วย; autatko = คุณช่วยไหม
etsiä;etsii;etsin;etsivät|หา
katsoa;katsomme;katsotte|ดู
puhua;puhuu;puhut;puhumme;puhuvat|พูด
rakastaa;rakastan;rakastatko|รัก
soittaa|เล่นเครื่องดนตรี / โทร
ymmärtää;ymmärrän;ymmärrä;ymmärrätkö|เข้าใจ
tanssia;tanssitte|เต้นรำ
hauska|สนุก / น่าขบขัน
tässä|ที่นี่ / นี่คือ
äiti|แม่
isä|พ่อ
tyttöystävä|แฟนผู้หญิง
kotoisin|มีถิ่นกำเนิดจาก / มาจาก
turisti;turistit|นักท่องเที่ยว
syntymäpäivä|วันเกิด
alkaa|เริ่ม
kesäkuukausi|เดือนในฤดูร้อน
kevätkuukausi|เดือนในฤดูใบไม้ผลิ
laittaa;laitan|ทำ / จัด / ใส่ (ตามบริบท)
laittaa ruokaa|ทำอาหาร
leipoa;leivotko;leivo|อบขนม
kirjoitatko|คุณเขียนไหม
syntyä;syntynyt|เกิด / เกิดแล้ว
Olen syntynyt|ฉันเกิด…
missä kuukaudessa|ในเดือนอะไร
ajaa;ajatko;aja|ขับรถ / เดินทางโดยพาหนะ
luetko|คุณอ่านไหม
asua;asut;asun|อาศัยอยู่
millä|ด้วยอะไร / บนอะไร
minusta|ในความเห็นของฉัน / จากฉัน
Turku|ตุรกุ (เมืองในฟินแลนด์)
Puistokatu;Puistokadulla|ถนน Puistokatu / บนถนน Puistokatu
Vaasa;Vaasasta|วาซา / จากวาซา
Emmi|Emmi (ชื่อบุคคล)
Ichiro|Ichiro (ชื่อบุคคล)
Julia|Julia (ชื่อบุคคล)
Väinö;Väinöä|Väinö (ชื่อบุคคล / รูป partitive)
Kim|Kim (ชื่อบุคคล)
Julian|Julian (ชื่อบุคคล)
Hannaa|Hanna (ชื่อบุคคลในรูป partitive)
Päivi Koskela;Päivi Koskelalla|Päivi Koskela (ชื่อบุคคล); รูป -lla ใช้ในประโยคบอกการมี
Pedrolla|Pedro มี… (รูปผู้มีในโครงสร้าง Pedrolla on)
minulla|ฉันมี… (รูปผู้มีในโครงสร้าง minulla on)
kaksitoista|สิบสอง
kaksikymmentäkahdeksan|ยี่สิบแปด
kolmekymmentä|สามสิบ
neljäkymmentä|สี่สิบ
kaksisataa|สองร้อย
`);

// Keys are the stable lesson IDs, not the display numbers after the Moodle audit.
export const vocabularyOctober: Record<string, Word[]> = {
  '5': unique(quizlet(['weather', 'seasons', 'adjectives', 'colours']), weatherWords, seasons, adjectives, lessonFiveExtra, everyday, everydayVerbs, common, instructions),
  '6': unique(quizlet(['weather', 'seasons', 'adjectives']),
    verbPhrases.map(([fi, , th]) => ({ fi, th, category: 'วลีกริยาจากเอกสาร' })),
    timeMarkers.map(([fi, th]) => ({ fi, th, category: 'เวลาจากเอกสาร' })),
    weatherWords, seasons, adjectives, lessonSixExtra, cities, everyday, everydayVerbs, common, instructions),
  '7': unique(lessonSevenVocabulary.map(([fi, , th]) => ({ fi, th, category: 'Quizlet · Pedro soittaa Mikolle' })),
    pedroReading, genitive, sevenHomework, everyday, everydayVerbs, seasons, weatherWords, adjectives, common, instructions),
  '8': unique(partitive, eightExtra, pedroReading, everyday, everydayVerbs, seasons, weatherWords, adjectives, common, instructions),
};
