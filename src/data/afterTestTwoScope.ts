export const afterTestTwoSource = 'https://moodle.abo.fi/course/section.php?id=626699';
export const afterTestTwoSections: { title: string; url: string }[] = [
 { title:'Torstaina 5. marraskuuta · Moodle', url:'https://moodle.abo.fi/course/section.php?id=626699' },
 { title:'Tiistaina 10. marraskuuta · Moodle', url:'https://moodle.abo.fi/course/section.php?id=626700' },
 { title:'Torstaina 12. marraskuuta · Moodle', url:'https://moodle.abo.fi/course/section.php?id=626701' },
 { title:'Tiistaina 17. marraskuuta · Moodle', url:'https://moodle.abo.fi/course/section.php?id=626702' },
 { title:'Torstaina 19. marraskuuta · Moodle', url:'https://moodle.abo.fi/course/section.php?id=626703' },
];
export const afterTestTwoScope: { title: string; pages: number[]; tab: string }[] = [
 {title:'ระบบชนิดกริยา 5 ชนิด (Verbityypit 1–5)', pages:[123,124], tab:'Grammar'},
 {title:'ปฏิเสธกริยาทุกชนิด (Negatiivinen lause)', pages:[124], tab:'Grammar'},
 {title:'tehdä และ nähdä (กริยาพิเศษ)', pages:[124,139], tab:'Grammar'},
 {title:'Verbi + verbi: voida, osata, haluta, tykätä', pages:[140], tab:'Grammar'},
 {title:'บอกเวลา: Mitä kello on?', pages:[120], tab:'Grammar'},
 {title:'นัดหมายและภาษาพูด (Tapaamisen sopiminen)', pages:[122], tab:'Grammar'},
 {title:'ชีวิตประจำวัน: Meidän tavallinen päivä', pages:[115,116], tab:'Grammar'},
 {title:'แบบฝึกฟัง 5 ชุดจากหนังสือ', pages:[129,131,135,138,144], tab:'Listening'},
 {title:'คำศัพท์ห้องต่างๆ ในบ้าน (Kappale 6: Talossa)', pages:[151], tab:'Vocab'},
];
export const afterTestTwoPages = [...new Set([
 ...afterTestTwoScope.flatMap(item=>item.tab==='Listening'?item.pages: item.tab==='Vocab'?item.pages: item.pages),
 118,119,121,143,296,297,298,
])].sort((a,b)=>a-b);
