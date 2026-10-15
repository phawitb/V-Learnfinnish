import {september24} from './septemberContent';
import {vocabulary,extraVocabulary,dice} from './octoberFifteenContent';
type Word={fi:string;th:string;category?:string};
const words=(category:string,text:string):Word[]=>text.trim().split('\n').filter(Boolean).map(line=>{const [fi,th]=line.split('|');return {fi,th,category};});
const unique=(items:Word[])=>[...new Map(items.map(item=>[item.fi.trim(),{...item,fi:item.fi.trim()}])).values()];
const basics=words('คำพื้นฐานและคำถาม',`minä|ฉัน
sinä|คุณ
hän|เขา/เธอ
me|พวกเรา
te|พวกคุณ/คุณ (สุภาพ)
he|พวกเขา
se|มัน/สิ่งนั้น
ne|พวกมัน/สิ่งเหล่านั้น
tämä|นี่/สิ่งนี้
minun|ของฉัน
sinun|ของคุณ
hänen|ของเขา/เธอ
meidän|ของพวกเรา
teidän|ของพวกคุณ
heidän|ของพวกเขา
kuka|ใคร
mikä|อะไร
mitä|อะไร (รูป partitive)
missä|ที่ไหน
mistä|จากไหน
mihin|ไปที่ไหน
minne|ไปที่ไหน
milloin|เมื่อไร
miksi|ทำไม
miten|อย่างไร
millainen|ลักษณะอย่างไร
minkämaalainen|คนชาติไหน
kuinka paljon|มากเท่าไร/ราคาเท่าไร
paljonko|มากเท่าไร/ราคาเท่าไร
ja|และ
mutta|แต่
vaan|แต่เป็น… (แก้สิ่งที่ปฏิเสธก่อนหน้า)
koska|เพราะว่า
vai|หรือ (ให้เลือก)
tai|หรือ
myös|ด้วย/เช่นกัน
kyllä|ใช่
joo|ใช่ (ภาษาพูด)
ei|ไม่ (บุคคลที่สามเอกพจน์)
en|ฉันไม่
et|คุณไม่
emme|พวกเราไม่
ette|พวกคุณไม่
eivät|พวกเขาไม่
paljon|มาก
vähän|น้อย/เล็กน้อย
nyt|ตอนนี้
sitten|จากนั้น
ensin|ก่อน/อันดับแรก
entä|แล้ว…ล่ะ
vielä|ยัง/อีก
vain|เพียง/เท่านั้น
yksi|หนึ่ง
kaksi|สอง
kolme|สาม
neljä|สี่
viisi|ห้า
kuusi|หก
seitsemän|เจ็ด
kahdeksan|แปด
yhdeksän|เก้า
kymmenen|สิบ`);
const time=words('เวลา',`tänään|วันนี้
huomenna|พรุ่งนี้
ilta|ตอนเย็น
illalla|ในตอนเย็น
viikonloppu|วันหยุดสุดสัปดาห์
viikonloppuna|ในวันหยุดสุดสัปดาห์
lauantai|วันเสาร์
lauantaina|ในวันเสาร์
maanantai|วันจันทร์
maanantaina|ในวันจันทร์
torstai|วันพฤหัสบดี
torstaina|ในวันพฤหัสบดี
kesä|ฤดูร้อน
kesällä|ในฤดูร้อน
talvi|ฤดูหนาว
talvella|ในฤดูหนาว
päivä|วัน
yö|คืน
vuosi|ปี
vuotta|ปี (ใช้หลังจำนวน/บอกอายุ)
kello|นาฬิกา/เวลา
viikko|สัปดาห์
tunti|ชั่วโมง
kuukausi|เดือน
kuukautta|เดือน (รูปหลังจำนวน)`);
const study=words('คำสั่งและการเรียน',`harjoitus|แบบฝึกหัด
lisäharjoitus|แบบฝึกเพิ่มเติม
sivu|หน้า
kappale|บท
teksti|ข้อความ/บทอ่าน
sana|คำ
verbi|กริยา
infinitiivi|กริยารูปพื้นฐาน
persoonapronomini|บุรุษสรรพนาม
kysymys|คำถาม
vastaus|คำตอบ
lause|ประโยค
avain|กุญแจ/เฉลย
ratkaisu|วิธีแก้/เฉลย
kirjoittaa|เขียน
kirjoita|จงเขียน
lukea|อ่าน
lue|จงอ่าน
kuunnella|ฟัง
kuuntele|จงฟัง
sanoa|พูด/กล่าว
sano|จงพูด
etsiä|หา
etsi|จงหา
valita|เลือก
valitse|จงเลือก
yhdistää|เชื่อม/จับคู่
yhdistä|จงจับคู่
korjata|แก้ไข
korjaa|จงแก้ไข
kysyä|ถาม
kysy|จงถาม
pari|คู่
parilta|จากคู่เรียน
parin kanssa|กับคู่เรียน
ryhmä|กลุ่ม
opiskelija|นักเรียน/นักศึกษา
opettaja|ครู
kurssi|คอร์สเรียน
positiivinen|บอกเล่า/บวก
negatiivinen|ปฏิเสธ/ลบ
ko/kö-kysymys|คำถามแบบใช่หรือไม่
k-p-t-vaihtelu|การสลับระดับพยัญชนะ k-p-t
vokaaliharmonia|ความกลมกลืนของสระ`);
const sep17Verbs=words('กริยา',`olla|เป็น/อยู่/คือ
asua|อาศัยอยู่
ajaa|ขับ/เดินทางโดยรถ
istua|นั่ง
katsoa|ดู
rakastaa|รัก
matkustaa|เดินทาง
puhua|พูด
tutustua|ทำความรู้จัก
ostaa|ซื้อ
laulaa|ร้องเพลง
nauraa|หัวเราะ
maksaa|จ่าย/มีราคา
säästää|ออม/ประหยัด
itkeä|ร้องไห้
uskoa|เชื่อ
tanssia|เต้นรำ
muistaa|จำ
loppua|จบ/หมด
mennä|ไป
tulla|มา
nähdä|เห็น/พบ`);
const sep17Nouns=words('บทอ่านและแบบฝึก',`koti|บ้าน
kotona|ที่บ้าน
kotiin|กลับบ้าน/ไปบ้าน
kioski|คีออสก์/ร้านขายของเล็ก ๆ
kioskille|ไปที่คีออสก์
kioskilta|จากคีออสก์
jäätelö|ไอศกรีม
suklaajäätelö|ไอศกรีมช็อกโกแลต
vaniljajäätelö|ไอศกรีมวานิลลา
euro|ยูโร
raha|เงิน
puisto|สวนสาธารณะ
puistossa|ในสวน
puistoon|ไปสวน
kieli|ภาษา/ลิ้น
äidinkieli|ภาษาแม่
auto|รถยนต์
autolla|โดยรถยนต์
bussi|รถบัส
bussilla|โดยรถบัส
bussipysäkki|ป้ายรถบัส
metro|รถไฟใต้ดิน
metrolla|โดยรถไฟใต้ดิน
taksi|แท็กซี่
sohva|โซฟา
sohvalla|บนโซฟา
televisio|โทรทัศน์
sauna|ซาวน่า
ystävä|เพื่อน
kaupunki|เมือง
aurinko|ดวงอาทิตย์
auringossa|กลางแดด
karaoke|คาราโอเกะ
ruoka|อาหาร
pankkikortti|บัตรธนาคาร
pankkikortilla|ด้วยบัตรธนาคาร
mies|ผู้ชาย/สามี
nainen|ผู้หญิง
vanha|เก่า/อายุมาก
numero|ตัวเลข
puhelinnumero|หมายเลขโทรศัพท์
disko|ดิสโก้
tango|แทงโก้
alku|จุดเริ่มต้น
loppu|จุดสิ้นสุด
kirjainsokkelo|ตารางค้นหาคำ
vaakaan|แนวนอน
pystyyn|แนวตั้ง
helppo|ง่าย
helpompi|ง่ายกว่า
virhe|ข้อผิดพลาด
seitsemäntoista|สิบเจ็ด
viisikymmentäyksi|ห้าสิบเอ็ด
kaksikymmentäneljä|ยี่สิบสี่
yhdeksänsataaseitsemänkymmentäkahdeksan|เก้าร้อยเจ็ดสิบแปด
nolla|ศูนย์`);
const geography=words('สัญชาติ ภาษา และสถานที่',`Suomi|ประเทศฟินแลนด์
suomi|ภาษาฟินแลนด์
suomalainen|ชาวฟินแลนด์
Ruotsi|ประเทศสวีเดน
ruotsi|ภาษาสวีเดน
ruotsalainen|ชาวสวีเดน
Brasilia|ประเทศบราซิล
brasilialainen|ชาวบราซิล
Venäjä|ประเทศรัสเซีย
venäjä|ภาษารัสเซีย
venäläinen|ชาวรัสเซีย
Espanja|ประเทศสเปน
espanja|ภาษาสเปน
espanjalainen|ชาวสเปน
Portugali|ประเทศโปรตุเกส
portugali|ภาษาโปรตุเกส
englanti|ภาษาอังกฤษ
saksa|ภาษาเยอรมัน
Kiina|ประเทศจีน
kiinalainen|ชาวจีน
Etelä-Afrikka|ประเทศแอฟริกาใต้
Johannesburg|โจฮันเนสเบิร์ก
Helsinki|เฮลซิงกิ
Pohjois-Helsinki|เฮลซิงกิตอนเหนือ
Puistola|ย่าน Puistola
Espoo|เมือง Espoo
Oulu|เมือง Oulu
Vaasa|เมือง Vaasa
Tampere|เมือง Tampere
New York|นิวยอร์ก
Etelä-Suomi|ฟินแลนด์ตอนใต้
Pohjois-Suomi|ฟินแลนด์ตอนเหนือ
kotoisin|มีถิ่นกำเนิดจาก
olla kotoisin|มาจาก/มีถิ่นกำเนิดจาก`);
const phrases17=words('สำนวน',`Anteeksi!|ขอโทษครับ/ค่ะ
Ai jaa!|อ๋อ อย่างนั้นหรือ
Ai niin, totta!|อ๋อ ใช่ จริงด้วย
Moi moi!|บ๊ายบาย
Moikka!|สวัสดี/บ๊ายบาย
Nähdään!|แล้วพบกัน
Nähdään huomenna!|เจอกันพรุ่งนี้
Mitä kieltä sinä puhut?|คุณพูดภาษาอะไร
Minkämaalainen sinä olet?|คุณเป็นคนชาติไหน
Mistä sinä olet kotoisin?|คุณมาจากไหน
Missä sinä asut?|คุณอาศัยอยู่ที่ไหน
Mitä Te sanotte?|คุณพูดว่าอะไร (สุภาพ)`);
const nouns24=september24.classwork.concat(september24.assignments).filter(ex=>['noun5','noun6','food2'].includes(ex.id)).flatMap(ex=>ex.rows.flatMap(([q,a,th])=>[{fi:q.split(' + ')[0],th:ex.id==='food2'?th:({Turkki:'ตุรกี',viikko:'สัปดาห์',Lappi:'แลปแลนด์',kaappi:'ตู้',tyttö:'เด็กผู้หญิง',planeetta:'ดาวเคราะห์',ruoka:'อาหาร',selkä:'หลัง',kylpy:'การอาบน้ำ',apu:'ความช่วยเหลือ',maito:'นม',pöytä:'โต๊ะ',kaupunki:'เมือง',aurinko:'ดวงอาทิตย์',Islanti:'ไอซ์แลนด์',ranta:'ชายฝั่ง',Itävalta:'ออสเตรีย',kulta:'ทอง',yläkerta:'ชั้นบน',virta:'กระแสน้ำ',penkki:'ม้านั่ง',tauko:'ช่วงพัก',kortti:'บัตร',kerta:'ครั้ง',kenkä:'รองเท้า',Amerikka:'อเมริกา',lamppu:'โคมไฟ',silta:'สะพาน',Irlanti:'ไอร์แลนด์',paita:'เสื้อ',tasku:'กระเป๋าเสื้อ/กางเกง',arpa:'สลาก',multa:'ดิน',alakerta:'ชั้นล่าง',lintu:'นก',halpa:'ราคาถูก',märkä:'เปียก',posti:'ไปรษณีย์',lotto:'ลอตเตอรี่'} as Record<string,string>)[q.split(' + ')[0]],category:ex.id==='food2'?'อาหาร':'คำนามและคุณศัพท์ k-p-t'},{fi:a,th:ex.id==='food2'?`(ฉันชอบ) ${th}`:th,category:'รูปผันจากแบบฝึก'}]));
const verbs24=september24.classwork.concat(september24.assignments).filter(ex=>['verb21','verb22'].includes(ex.id)).flatMap(ex=>ex.rows.map(([fi,,th])=>({fi,th:th.split(' — ')[0],category:'กริยา k-p-t'})));
const cafe=words('คาเฟ่และการซื้อของ',`kahvi|กาแฟ
kuitti|ใบเสร็จ
kortti|บัตร
käteinen|เงินสด
kortilla|ด้วยบัตร
käteisellä|ด้วยเงินสด
sama|เดียวกัน
samasta|รวมในบิลเดียวกัน (สำนวนในเอกสาร)
erikseen|แยกกัน
muu|อย่างอื่น
muuta|อย่างอื่น (รูป partitive)
saada|ได้รับ/ได้
haluta|ต้องการ
haluaisin|ฉันอยาก… (สุภาพ)
ottaisin|ฉันขอรับ… (สุภาพ)
voida|สามารถ
voisin ottaa|ฉันขอรับ…ได้ไหม
minä otan|ฉันเอา/ฉันรับ…
tarvita|ต้องการ/จำเป็นต้อง
Tarvitsetko kuittia?|ต้องการใบเสร็จไหม
Tarviitko kuittia?|ต้องการใบเสร็จไหม (ภาษาพูด)
Mitä saisi olla?|รับอะไรดีครับ/คะ
Tuleeko muuta?|รับอย่างอื่นเพิ่มไหม
Tuleeks muuta?|รับอย่างอื่นเพิ่มไหม (ภาษาพูด)
Mitä kahvi maksaa?|กาแฟราคาเท่าไร
Maksatko kortilla vai käteisellä?|จ่ายด้วยบัตรหรือเงินสด
tilata|สั่ง
jotain|บางอย่าง
syötävä|สิ่งที่กินได้/ของกิน
jotain syötävää|อะไรกินสักอย่าง
juustopiirakka|พายชีส
juustokakku|ชีสเค้ก
pulla|ขนมปังหวาน
keksi|คุกกี้
kermavaahto|วิปครีม
kaakao|โกโก้
pöytä|โต๊ะ
pöytään|ไปที่โต๊ะ
tuoda|นำมา
odottaa|รอ
hetki|ครู่หนึ่ง
pakata|บรรจุ/ห่อ
sinulle|ให้คุณ
mukaan|นำไปด้วย/กลับบ้าน
Odotatko hetken?|รอสักครู่ได้ไหม
pakkaan sinulle mukaan|ฉันจะห่อให้คุณนำกลับ
kaakaon tuon pöytään|ฉันจะนำโกโก้ไปให้ที่โต๊ะ`);
const additional24=words('แบบฝึกเพิ่มเติม',`kirja|หนังสือ
nimi|ชื่อ
kirjoitetaan|ถูกเขียน/เขียนว่า (รูป passive)
Italia|ประเทศอิตาลี
italia|ภาษาอิตาลี
Ranska|ประเทศฝรั่งเศส
ranska|ภาษาฝรั่งเศส
kiitos|ขอบคุณ
hyvä|ดี
Mitä kuuluu?|สบายดีไหม/เป็นอย่างไรบ้าง
Kiitos hyvää!|สบายดี ขอบคุณ
rakastaa|รัก
ostaa|ซื้อ
olla|เป็น/อยู่/คือ
asua|อาศัยอยู่
mennä|ไป
istua|นั่ง
maksaa|จ่าย/มีราคา
puhua|พูด
loppua|จบ/หมด
noppaa|ลูกเต๋า (รูป partitive)
noppa|ลูกเต๋า
heittää|โยน/ทอย
heitä noppaa|จงทอยลูกเต๋า
taivuttaa|ผันคำ
taivuta|จงผันคำ
malli|ตัวอย่าง
pitää + -sta/-stä|ชอบสิ่งใดสิ่งหนึ่ง
Mistä sinä pidät?|คุณชอบอะไร
Minä pidän…|ฉันชอบ…
minä nukun|ฉันนอน
minä pidän|ฉันชอบ / ฉันถือหรือรักษาไว้ (ตามบริบท)
partitiivi|รูป partitive
persoona|บุคคลในไวยากรณ์`);
const family=words('ครอบครัวและความสัมพันธ์',`perhe|ครอบครัว
perheet|ครอบครัวหลายครอบครัว
suku|เครือญาติ/วงศ์ตระกูล
sukulainen|ญาติ
sukupuu|แผนผังครอบครัว
vanhempi|พ่อหรือแม่/ผู้ปกครอง
vanhemmat|พ่อแม่
isovanhemmat|ปู่ย่าตายาย
isoäiti|ย่า/ยาย
mummi|ย่า/ยาย (คำเรียกคุ้นเคย)
mummo|ย่า/ยาย
mummu|ย่า/ยาย (คำเรียกคุ้นเคย)
mamma|ย่า/ยาย (ชื่อเรียกในบางครอบครัว)
mumma|ย่า/ยาย (คำเรียกถิ่น)
isoisä|ปู่/ตา
ukki|ปู่/ตา (คำเรียกคุ้นเคย)
vaari|ปู่/ตา
pappa|ปู่/ตา (คำเรียกคุ้นเคย)
paapa|ปู่/ตา (คำเรียกถิ่น)
iskä|พ่อ (คำเรียกคุ้นเคย)
isi|พ่อ (คำเรียกคุ้นเคย)
lapsi|เด็ก/ลูก
lapset|เด็ก ๆ/ลูก ๆ
lasta|เด็ก/ลูก (รูป partitive เอกพจน์ เช่น kaksi lasta)
lapsia|เด็ก/ลูก (รูป partitive พหูพจน์)
sisko|พี่สาว/น้องสาว
isosisko|พี่สาว
pikkusisko|น้องสาว
veli|พี่ชาย/น้องชาย
isoveli|พี่ชาย
pikkuveli|น้องชาย
veljeä|พี่ชาย/น้องชาย (partitive เช่น ei ole veljeä)
poikavauva|ทารกชาย
pariskunta|คู่รัก/คู่สามีภรรยา
avopari|คู่ที่อยู่ด้วยกันโดยไม่ได้สมรส
avioliitto|การสมรส
avoliitto|การอยู่ร่วมกันโดยไม่สมรส
ydinperhe|ครอบครัวเดี่ยว
uusperhe|ครอบครัวผสม
sateenkaariperhe|ครอบครัวสายรุ้ง/ครอบครัว LGBTQ+
aikuinen|ผู้ใหญ่
jäsen|สมาชิก
yhteinen|ร่วมกัน/ที่มีร่วมกัน
yhdessä|ด้วยกัน
yksin|ตามลำพัง
naimisissa|แต่งงานแล้ว
mennä naimisiin|แต่งงาน
kihloissa|หมั้นแล้ว
eronnut|หย่าแล้ว
leski|ม่ายเพราะคู่สมรสเสียชีวิต
sinkku|คนโสด
yksinhuoltaja|ผู้ปกครองเลี้ยงเดี่ยว
kanssa|กับ
vielä|ยัง/อีก
ei vielä|ยังไม่
enää|อีกต่อไป
ei enää|ไม่…อีกต่อไป
eikä|และไม่
heillä on|พวกเขามี
hänellä on|เขา/เธอมี
minulla on|ฉันมี
minulla ei ole|ฉันไม่มี
äidillä on|แม่มี
vuotias|มีอายุ…ปี
2-vuotias|อายุสองปี
yhteensä|รวมทั้งหมด
keskusta|ใจกลางเมือง
keskustassa|ในใจกลางเมือง
päiväkoti|ศูนย์เด็กเล็ก
päiväkodissa|ที่ศูนย์เด็กเล็ก
pienessä asunnossa|ในห้องพักเล็ก ๆ
nimi|ชื่อ
nimet|ชื่อหลายชื่อ
vanha|เก่า/อายุมาก`);
const adjectives=words('คุณศัพท์และคำตรงข้าม',`musta|สีดำ
kaunis|สวย
kaunista|สวย (partitive)
kylmä|เย็น/หนาว
kylmää|เย็น/หนาว (partitive)
iso|ใหญ่
isoa|ใหญ่ (partitive)
suuri|ใหญ่
pieni|เล็ก
hyvä|ดี
hyvää|ดี (partitive)
huono|ไม่ดี/แย่
uusi|ใหม่
vanha|เก่า/อายุมาก
pitkä|ยาว/สูง
lyhyt|สั้น
ruma|ขี้เหร่
kuuma|ร้อน
lämmin|อุ่น
viileä|เย็นสบาย
vaikea|ยาก
helppo|ง่าย
pimeä|มืด
valoisa|สว่าง
nopea|เร็ว
oranssi|สีส้ม
aurinkoinen|มีแดด
kiva|ดี/น่ารื่นรมย์
aika|ค่อนข้าง (ขยายคุณศัพท์)/เวลา
vastakohta|คำตรงข้าม
adjektiivi|คำคุณศัพท์`);
const oct15Verbs=words('กริยาและวลีใช้บ่อย',`etsiä|หา
ostaa|ซื้อ
ottaa|เอา/หยิบ/รับ
rakastaa|รัก
olla|เป็น/อยู่/คือ
asua|อาศัยอยู่
haluta|ต้องการ
mennä|ไป
keskustella|สนทนา
keskustele|จงสนทนา
ymmärtää|เข้าใจ
ymmärrätkö|คุณเข้าใจไหม
kuunnella|ฟัง
kuuntele|จงฟัง
Saisinko…?|ขอ…ได้ไหม (สุภาพ)
Otan…|ฉันเอา/รับ…
Minä rakastan perhettäni.|ฉันรักครอบครัวของฉัน
Minulla on paljon työtä tänään.|วันนี้ฉันมีงานมาก
millainen sinun perhe on|ครอบครัวของคุณเป็นอย่างไร
etsiä + partitiivi|หา + กรรมรูป partitive
rakastaa + partitiivi|รัก + กรรมรูป partitive
-ni|คำลงท้ายแสดงความเป็นเจ้าของของฉัน
minun mustaa kissaa|แมวสีดำของฉัน (partitive แบบใช้ minun)
mustaa kissaani|แมวสีดำของฉัน (partitive + คำลงท้าย -ni)
perhettäni|ครอบครัวของฉัน (partitive + -ni)
meidän|ของพวกเรา
heidän|ของพวกเขา`);
const oct15Nouns=words('สิ่งของ สถานที่ และแบบฝึก',`kissa|แมว
kukka|ดอกไม้
kukkia|ดอกไม้ (partitive พหูพจน์)
kukkaa|ดอกไม้ (partitive เอกพจน์หลังจำนวน)
kola|โคล่า
kuppi|ถ้วย
tee|ชา
teetä|ชา (partitive)
banaani|กล้วย
kuppi teetä|ชาหนึ่งถ้วย
työ|งาน
työtä|งาน (partitive)
meri|ทะเล
kirkko|โบสถ์
metro|รถไฟใต้ดิน
televisio|โทรทัศน์
puisto|สวนสาธารณะ
tuuli|ลม
kauppa|ร้านค้า
kesäyö|คืนฤดูร้อน
sää|สภาพอากาศ
auto|รถยนต์
asunto|ห้องพัก/ที่อยู่อาศัย
ystävä|เพื่อน
Eurooppa|ทวีปยุโรป
Aasia|ทวีปเอเชีย
Australia|ประเทศออสเตรเลีย
Brasilia|ประเทศบราซิล
Suomi|ประเทศฟินแลนด์
suomi|ภาษาฟินแลนด์
Helsinki|เฮลซิงกิ
Espoo|เมือง Espoo
Turku|เมือง Turku
Turussa|ในเมือง Turku
kotoisin|มีถิ่นกำเนิดจาก
opiskelijat|นักเรียน/นักศึกษา (พหูพจน์)
opiskelijaa|นักเรียน/นักศึกษา (partitive เอกพจน์)
suomen kurssi|คอร์สภาษาฟินแลนด์
kaksi tuntia|สองชั่วโมง
partitiivi|รูป partitive
t-monikko|รูปพหูพจน์ลงท้าย -t
yksikkö|เอกพจน์
monikko|พหูพจน์
genetiivi|รูปแสดงความเป็นเจ้าของ
selitys|คำอธิบาย
kuva|ภาพ
nimet kuvaan|เติมชื่อในภาพ
lue teksti|อ่านบทอ่าน
kirjoita nimet|เขียนชื่อ
perheessä|ในครอบครัว
neljä jäsentä|สมาชิกสี่คน
kaksi lasta|ลูกสองคน
seitsemän kuukautta|เจ็ดเดือน`);
const diceWords:Word[]=dice.rows.flatMap(([q,a,th])=>{const fi=q.split(' · ')[1];const meaning=th.replace(/ จำนวน \d+$/,'');return [{fi,th:meaning,category:'คำศัพท์ใบงานลูกเต๋า'},{fi:a.replace(/^\d+ /,''),th:`${meaning} (รูป partitive)`,category:'รูป partitive จากใบงาน'}];});
const familySource:Word[]=[...vocabulary,...extraVocabulary].flatMap(([fi,th])=>fi.split(/ = |, /).map(word=>({fi:word,th,category:'ครอบครัวและสถานะ'})));
/** Lemmas, important inflections and reusable phrases from every available assigned source.
 * Proper names of fictional people are omitted; place names and family words are retained.
 * The missing Turku source and original listening audio cannot contribute additional terms.
 */
export const vocabularyDates:Record<string,{fi:string;th:string;category?:string}[]>={
 sep17:unique([...basics,...time,...study,...sep17Verbs,...sep17Nouns,...geography,...phrases17]),
 sep24:unique([...basics,...time,...study,...sep17Nouns.filter(w=>['jäätelö','puisto','puistossa','puistoon','raha','kieli','euro','koti','kotiin','bussi','bussilla'].includes(w.fi)),...nouns24,...verbs24,...cafe,...additional24,...geography.filter(w=>['Suomi','suomi','Helsinki','kotoisin','olla kotoisin'].includes(w.fi))]),
 oct15:unique([...basics,...time,...study,...familySource,...family,...adjectives,...oct15Verbs,...oct15Nouns,...diceWords]),
};
