import {september24} from './septemberContent';
import {vocabulary,extraVocabulary} from './octoberFifteenContent';
type Word={fi:string;th:string;category?:string};
const words=(category:string,text:string):Word[]=>text.trim().split('\n').filter(Boolean).map(line=>{const [fi,th]=line.split('|');return {fi,th,category};});
const unique=(items:Word[])=>[...new Map(items.map(item=>[item.fi.trim(),{...item,fi:item.fi.trim()}])).values()];

// September 17: the assigned page-29 reading vocabulary and verb exercise banks.
// Grammar instructions, incidental place names and repeated inflections are not vocabulary targets.
const reading17=words('บทอ่าน หน้า 29',`kioski|คีออสก์/ร้านขายของเล็ก ๆ
jäätelö|ไอศกรีม
raha|เงิน
puisto|สวนสาธารณะ
kieli|ภาษา/ลิ้น
äidinkieli|ภาษาแม่
auto|รถยนต์
bussi|รถบัส
bussipysäkki|ป้ายรถบัส
metro|รถไฟใต้ดิน
koti|บ้าน
olla kotoisin|มาจาก/มีถิ่นกำเนิดจาก
minkämaalainen|คนชาติไหน
brasilialainen|ชาวบราซิล
venäläinen|ชาวรัสเซีย
englanti|ภาษาอังกฤษ
espanja|ภาษาสเปน
portugali|ภาษาโปรตุเกส
Ai jaa!|อ๋อ อย่างนั้นหรือ
Ai niin, totta!|อ๋อ ใช่ จริงด้วย
Moi moi!|บ๊ายบาย
Moikka!|สวัสดี/บ๊ายบาย
Nähdään!|แล้วพบกัน`);
const verbs17=words('กริยาในแบบฝึกที่มอบหมาย',`ajaa|ขับ/เดินทางโดยรถ
asua|อาศัยอยู่
etsiä|หา
istua|นั่ง
itkeä|ร้องไห้
katsoa|ดู
kysyä|ถาม
laulaa|ร้องเพลง
loppua|จบ/หมด
maksaa|จ่าย/มีราคา
matkustaa|เดินทาง
muistaa|จำ
nauraa|หัวเราะ
olla|เป็น/อยู่/คือ
ostaa|ซื้อ
puhua|พูด
rakastaa|รัก
sanoa|พูด/กล่าว
säästää|ออม/ประหยัด
tanssia|เต้นรำ
tutustua|ทำความรู้จัก
uskoa|เชื่อ`);

// September 24: headwords explicitly supplied in exercises 5/6, 2 and 21/22.
const nouns24=september24.classwork.concat(september24.assignments).filter(ex=>['noun5','noun6','food2'].includes(ex.id)).flatMap(ex=>ex.rows.map(([q,,th])=>({fi:q.split(' + ')[0],th:ex.id==='food2'?th:({Turkki:'ตุรกี',viikko:'สัปดาห์',Lappi:'แลปแลนด์',kaappi:'ตู้',tyttö:'เด็กผู้หญิง',planeetta:'ดาวเคราะห์',ruoka:'อาหาร',selkä:'หลัง',kylpy:'การอาบน้ำ',apu:'ความช่วยเหลือ',maito:'นม',pöytä:'โต๊ะ',kaupunki:'เมือง',aurinko:'ดวงอาทิตย์',Islanti:'ไอซ์แลนด์',ranta:'ชายฝั่ง',Itävalta:'ออสเตรีย',kulta:'ทอง',yläkerta:'ชั้นบน',virta:'กระแสน้ำ',penkki:'ม้านั่ง',tauko:'ช่วงพัก',kortti:'บัตร',kerta:'ครั้ง',kenkä:'รองเท้า',Amerikka:'อเมริกา',lamppu:'โคมไฟ',silta:'สะพาน',Irlanti:'ไอร์แลนด์',paita:'เสื้อ',tasku:'กระเป๋าเสื้อ/กางเกง',arpa:'สลาก',multa:'ดิน',alakerta:'ชั้นล่าง',lintu:'นก',halpa:'ราคาถูก',märkä:'เปียก',posti:'ไปรษณีย์',lotto:'ลอตเตอรี่'} as Record<string,string>)[q.split(' + ')[0]],category:ex.id==='food2'?'อาหาร':'คำนามและคุณศัพท์ k-p-t'})));
const verbs24=september24.classwork.concat(september24.assignments).filter(ex=>['verb21','verb22'].includes(ex.id)).flatMap(ex=>ex.rows.map(([fi,,th])=>({fi,th:th.split(' — ')[0],category:'กริยา k-p-t'})));
const cafe=words('คาเฟ่และการซื้อของ',`kahvi|กาแฟ
kuitti|ใบเสร็จ
kortilla|ด้วยบัตร
käteisellä|ด้วยเงินสด
erikseen|แยกกัน
Mitä saisi olla?|รับอะไรดีครับ/คะ
Tuleeko muuta?|รับอย่างอื่นเพิ่มไหม
Mitä kahvi maksaa?|กาแฟราคาเท่าไร
Maksatko kortilla vai käteisellä?|จ่ายด้วยบัตรหรือเงินสด
Tarvitsetko kuittia?|ต้องการใบเสร็จไหม
haluaisin|ฉันอยาก… (สุภาพ)
ottaisin|ฉันขอรับ… (สุภาพ)
voisin ottaa|ฉันขอรับ…ได้ไหม
minä otan|ฉันเอา/ฉันรับ…
tilata|สั่ง
saada|ได้รับ/ได้
jotain syötävää|อะไรกินสักอย่าง
juustopiirakka|พายชีส
pulla|ขนมปังหวาน
keksi|คุกกี้
kermavaahto|วิปครีม
kaakao|โกโก้
Odotatko hetken?|รอสักครู่ได้ไหม
pakkaan sinulle mukaan|ฉันจะห่อให้คุณนำกลับ
kaakaon tuon pöytään|ฉันจะนำโกโก้ไปให้ที่โต๊ะ`);

// October 15: teacher explicitly assigns only the first word on each Suku card.
// Page 91 also assigns the status/work vocabulary; Perheet adds family-type concepts.
const familySource:Word[]=[...vocabulary,...extraVocabulary].map(([fi,th])=>({
 fi:fi.split(/ = |, /)[0],th,category:'ครอบครัวและสถานะ',
}));
const familyReading=words('บทอ่าน Perheet',`pariskunta|คู่รัก/คู่สามีภรรยา
avopari|คู่ที่อยู่ด้วยกันโดยไม่ได้สมรส
avioliitto|การสมรส
avoliitto|การอยู่ร่วมกันโดยไม่สมรส
ydinperhe|ครอบครัวเดี่ยว
sateenkaariperhe|ครอบครัวสายรุ้ง/ครอบครัว LGBTQ+
mennä naimisiin|แต่งงาน`);

/** Lesson-specific learning targets, not an inventory of all words encountered. */
export const vocabularyDates:Record<string,Word[]>={
 sep17:unique([...reading17,...verbs17]),
 sep24:unique([...nouns24,...verbs24,...cafe]),
 oct15:unique([...familySource,...familyReading]),
};
