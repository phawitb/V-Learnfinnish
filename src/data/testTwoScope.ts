import type { Bilingual } from './testTwoTypes';
export const testTwoSource = 'https://moodle.abo.fi/course/section.php?id=626698';
export const testTwoScope: { title: Bilingual; pages: number[]; tab: string }[] = [
 {title:{th:'คำศัพท์จากบทอ่าน',en:'Words from the texts'},pages:[57,87,88,89,90,91,102],tab:'Reading'},
 {title:{th:'คำคุณศัพท์',en:'Adjectives'},pages:[60],tab:'Topics'},
 {title:{th:'สภาพอากาศ',en:'Weather'},pages:[61],tab:'Topics'},
 {title:{th:'ฤดูกาล เดือน ช่วงเวลาของวัน',en:'Seasons, months and times of day'},pages:[62],tab:'Topics'},
 {title:{th:'วลีและสำนวน',en:'Phrases'},pages:[64],tab:'Topics'},
 {title:{th:'คำกริยา',en:'Verbs'},pages:[80],tab:'Topics'},
 {title:{th:'เสื้อผ้า',en:'Clothes'},pages:[94],tab:'Topics'},
 {title:{th:'กฎ k–p–t',en:'The k–p–t rule'},pages:[36],tab:'Grammar'},
 {title:{th:'การผันกริยาและ k–p–t',en:'Verb conjugation and k–p–t'},pages:[67],tab:'Grammar'},
 {title:{th:'Genitive แสดงความเป็นเจ้าของ',en:'Genitive'},pages:[66],tab:'Grammar'},
 {title:{th:'พหูพจน์รูป -t',en:'Plural form'},pages:[67],tab:'Grammar'},
 {title:{th:'Partitive',en:'Partitive'},pages:[95,96],tab:'Grammar'},
 {title:{th:'Minulla on — การบอกว่ามี',en:'Minulla on — possession'},pages:[97],tab:'Grammar'},
 {title:{th:'Genitive + kanssa — กับ',en:'Genitive + kanssa — with'},pages:[98],tab:'Grammar'},
 {title:{th:'Pitää + -sta/-stä — ชอบ',en:'Pitää + -sta/-stä — liking'},pages:[98],tab:'Grammar'},
];
export const testTwoPages = [...new Set(testTwoScope.flatMap(item=>item.pages))].sort((a,b)=>a-b);
