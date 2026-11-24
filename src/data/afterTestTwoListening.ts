import type { ListeningItem } from './afterTestTwoTypes';

export const listeningItems: ListeningItem[] = [
 {
  id:'ex7',
  exercise:'Harjoitus 7',
  pages:[129],
  task:'ฟังเสียงแล้ววาด/กากบาทให้ตรงกับเวลาที่ได้ยินบนหน้าปัดนาฬิกา',
  focus:'ฝึกฟังการบอกเวลาแบบ vaille / yli / puoli / tasan ให้ทันจากเสียงพูด ไม่ใช่ตัวอักษร',
  audio:[{ label:'ไฟล์เสียง Harjoitus 7', src:'/afterTest2/audio/ex7-harjoitus7-kellonajat.mp3' }],
 },
 {
  id:'ex11',
  exercise:'Harjoitus 12',
  pages:[131],
  task:'ฟังแล้วจับคู่กิจกรรม/เหตุการณ์ที่ได้ยินเข้ากับเวลาที่ถูกต้อง',
  focus:'ฝึกฟังคำกิจวัตรประจำวันคู่กับตัวเลขเวลา (-lta/-ltä) ในประโยคเดียวกัน',
 },
 {
  id:'ex19',
  exercise:'Harjoitus 19 ("Mitä hän ei tee?")',
  pages:[135],
  task:'ฟังแล้วตอบว่าคนในเรื่อง "ไม่ได้ทำ" อะไรบ้าง (ฟังประโยคปฏิเสธ)',
  focus:'ฝึกฟังรูปปฏิเสธของกริยาหลายชนิดในบริบทต่อเนื่อง ต้องจับทั้งกริยาช่วย (en/et/ei…) และกริยาหลัก',
  audio:[{ label:'ไฟล์เสียง Harjoitus 19', src:'/afterTest2/audio/ex19-harjoitus19-mita-han-ei-tee.mp3' }],
 },
 {
  id:'ex24',
  exercise:'Harjoitus 24',
  pages:[138],
  task:'ฟังแล้วเลือกภาพที่ตรงกับเสียง (a–d) แล้วเขียนหมายเลขภาพ',
  focus:'ฝึกฟังคำกิจวัตรประจำวันระดับคำศัพท์-ประโยคสั้น และแยกฉากกิจกรรมจากเสียงบรรยาย',
  audio:[{ label:'ไฟล์เสียง Harjoitus 24', src:'/afterTest2/audio/ex24-harjoitus24-valitse-oikea-kuva.mp3' }],
 },
 {
  id:'ex36',
  exercise:'Harjoitus 36',
  pages:[144],
  task:'ฟังบทสนทนานัดหมาย (มีบทถอดเสียง/transcription แนบใน Moodle ให้ตรวจคำตอบ)',
  focus:'ฝึกฟังวลีนัดหมายและภาษาพูด เช่น sopiiko, käykö, mulle sopii, en ehdi',
  audio:[
    { label:'บทสนทนา 1 (Milloin tavataan 1)', src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-1.mp3' },
    { label:'บทสนทนา 2 (Milloin tavataan 2)', src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-2.mp3' },
    { label:'บทสนทนา 3 (Milloin tavataan 3)', src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-3.mp3' },
    { label:'บทสนทนา 4 (Milloin tavataan 4)', src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-4.mp3' },
  ],
 },
];
