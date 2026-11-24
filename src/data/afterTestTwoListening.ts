import type { ListeningItem } from './afterTestTwoTypes';

export const listeningItems: ListeningItem[] = [
 {
  id:'ex7',
  exercise:'Harjoitus 7',
  pages:[129],
  task:'ฟังเสียงแล้ววาด/กากบาทให้ตรงกับเวลาที่ได้ยินบนหน้าปัดนาฬิกา',
  focus:'ฝึกฟังการบอกเวลาแบบ vaille / yli / puoli / tasan ให้ทันจากเสียงพูด ไม่ใช่ตัวอักษร',
  audio:[{
    label:'ไฟล์เสียง Harjoitus 7',
    src:'/afterTest2/audio/ex7-harjoitus7-kellonajat.mp3',
    transcript:'a. Kello on kahdeksan.\nb. Kello on kymmenen yli yhdeksän.\nc. Kello on puoli viisi.\nd. Kello on viisitoista vaille kolme.\ne. Kello on kymmenen yli kaksitoista.',
    transcriptTh:'a. นาฬิกาบอกแปดโมง (8.00)\nb. เก้าโมงสิบนาที (9.10)\nc. สี่โมงครึ่ง (4.30)\nd. อีกสิบห้านาทีจะบ่ายสามโมง (2.45)\ne. เที่ยงสิบนาที (12.10)',
  }],
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
    {
      label:'บทสนทนา 1 (Milloin tavataan 1)',
      src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-1.mp3',
      transcript:'– Hei Mika, lähetkö syömään? Mulla on kamala nälkä!\n– Ai nyt jo? Kello on vasta ykstoista!\n– No joo, mä söin aamupalaa tänään jo kuudelta.\n– Ai jaa. Tota, mä en ehdi nyt vielä. Voiks sä odottaa vielä puol tuntia?\n– Okei. No, nähään sit puol kaheltatoista!\n– Jees.',
      transcriptTh:'– ไง Mika ไปกินข้าวกันไหม? หิวมากเลย!\n– อ้าว ตอนนี้เลยเหรอ? เพิ่งสิบเอ็ดโมงเองนะ!\n– ใช่ เพราะเช้านี้กินข้าวเช้าตั้งแต่หกโมงแล้วนี่\n– อ๋อ เอ่อ ตอนนี้ยังไปไม่ได้นะ รอสักครึ่งชั่วโมงได้ไหม?\n– โอเค งั้นเจอกันตอนสิบเอ็ดโมงครึ่งนะ!\n– ได้เลย',
    },
    {
      label:'บทสนทนา 2 (Milloin tavataan 2)',
      src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-2.mp3',
      transcript:'– Moi Maija, mitä kuuluu?\n– No moi, ihan hyvää, kiitti.\n– Kuule, Markolla on ylihuomenna synttärit ja meillä on pienet juhlat.\n– Kiva, mihin aikaan?\n– Ne on viideltä.\n– Hmmm… Mä oon töissä ja mun työpäivä loppuu vasta puol kuudelta, mut mä voi tulla sen jälkeen. Mä luulen et mä ehdin kuudeks sinne.\n– Joo, se on ihan okei.\n– Okei, mä tuun sit suoraan töistä.\n– Kiva, nähään sit lauantaina, tervetuloa!\n– Joo, nähään ja kiitos kutsusta!',
      transcriptTh:'– หวัดดี Maija เป็นไงบ้าง?\n– หวัดดี สบายดีนะ ขอบใจ\n– นี่ มะรืนนี้เป็นวันเกิด Marko เรามีจัดงานเล็กๆ กัน\n– ดีจัง กี่โมงล่ะ?\n– ห้าโมงเย็น\n– อืม... ฉันทำงานอยู่ เลิกงานประมาณห้าโมงครึ่ง แต่ไปต่อได้เลยหลังเลิกงาน คิดว่าน่าจะไปถึงประมาณหกโมง\n– ได้ ไม่เป็นไรเลย\n– โอเค งั้นไปจากที่ทำงานเลยนะ\n– ดีเลย เจอกันวันเสาร์นะ ยินดีต้อนรับ!\n– ได้ แล้วเจอกัน ขอบคุณที่ชวนนะ!',
    },
    {
      label:'บทสนทนา 3 (Milloin tavataan 3)',
      src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-3.mp3',
      transcript:'– Isi, mennäänks tänään uimaan?\n– No tota, tänään mä en ehdi.\n– Höh, äidillekään ei sovi.\n– No, entä Kalle?\n– Ei, Kalle ei ehdi. Sillä on futistreenit.\n– No voi ei, mennäänkö sit huomenna tai torstaina?\n– Huomenna ei käy. Mä meen mummin kanssa kirjastoon.\n– Ahaa, no käyks torstaina? Monelta sun koulu loppuu?\n– Kahelta.\n– Okei, mulla on torstaina aamuvuoro. Mä oon kolmelta kotona, joten mennään sit heti.\n– Joo, kivaa!',
      transcriptTh:'– พ่อ ไปว่ายน้ำกันวันนี้ไหม?\n– เอ่อ วันนี้พ่อไปไม่ได้นะ\n– เฮ้อ แม่ก็ไปไม่ได้เหมือนกัน\n– แล้ว Kalle ล่ะ?\n– ไม่ได้ Kalle ก็ไปไม่ได้ เขามีซ้อมฟุตบอล\n– โอ้ไม่นะ งั้นไปพรุ่งนี้หรือวันพฤหัสดีไหม?\n– พรุ่งนี้ไม่ได้ พ่อจะไปห้องสมุดกับคุณยาย\n– อ้อ งั้นวันพฤหัสได้ไหม? โรงเรียนลูกเลิกกี่โมง?\n– บ่ายสองโมง\n– โอเค วันพฤหัสพ่อทำงานกะเช้า จะถึงบ้านบ่ายสามโมง งั้นไปกันทันทีเลย\n– เย้ ดีใจจัง!',
    },
    {
      label:'บทสนทนา 4 (Milloin tavataan 4)',
      src:'/afterTest2/audio/ex36-harjoitus36-keskustelu-4.mp3',
      transcript:'– Moi Paula, mitä kuuluu?\n– Ihan hyvää, kiitos. Ihanaa, kun aurinko paistaa ja on lämmin.\n– Niinpä. Hei, mennäänks kahville? Ehdiks sä?\n– Ai nyt heti?\n– Niin!\n– Öö tota, mulla on nyt kiire kotiin, mut käyks sulle viikonloppuna?\n– No ei oikein… Mä en oo viikonloppuna kotona. Mä lähen mökille.\n– Äh, no onpas tää nyt vaikeeta. Entä ens viikolla? Heti maanantaina vaikka?\n– Joo, maanantai sopii! Mihin aikaan? Joskus iltapäivällä – vaikka neljältä?\n– Joo, se sopii hyvin.\n– Kiva. Nähään!\n– Joo, moikka!',
      transcriptTh:'– หวัดดี Paula เป็นไงบ้าง?\n– สบายดีจ้ะ ขอบคุณ แดดออกอากาศอุ่นๆ แบบนี้ดีจัง\n– ใช่เลย นี่ ไปดื่มกาแฟกันไหม? ว่างไหม?\n– อ้าว ตอนนี้เลยเหรอ?\n– ใช่!\n– เอ่อ ตอนนี้รีบกลับบ้าน แต่สุดสัปดาห์นี้ว่างไหม?\n– ไม่ค่อยสะดวกเลย... สุดสัปดาห์นี้ไม่อยู่บ้าน จะไปกระท่อม\n– อ้าว ยากจังเลยนะเนี่ย แล้วสัปดาห์หน้าล่ะ? วันจันทร์เลยดีไหม?\n– ได้ วันจันทร์สะดวก! กี่โมงดีล่ะ? ช่วงบ่ายก็ได้ สักสี่โมงไหม?\n– ได้ สะดวกเลย\n– ดีจัง แล้วเจอกันนะ!\n– ได้ บายนะ!',
    },
  ],
 },
];
