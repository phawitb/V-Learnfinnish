import type { StudySection, ReviewQuestion, ExamWord } from "./testTwoTypes";

export const topicSections: StudySection[] = [
  {
    "id": "test2-adjectives",
    "title": {
      "th": "คำบรรยายและคำตรงข้าม",
      "en": "Descriptions and opposites"
    },
    "pages": [
      60
    ],
    "intro": {
      "th": "Millainen? ถามว่ามีลักษณะอย่างไร เรียนเป็นคู่ตรงข้าม แล้วฝึกบรรยายคน สิ่งของ และสภาพอากาศ",
      "en": "Millainen? asks what someone or something is like. Learn opposite pairs and describe people, objects and weather."
    },
    "notes": [
      {
        "th": "ใช้ X on + คำคุณศัพท์: Kirja on uusi. = หนังสือใหม่ / Tehtävä on vaikea. = แบบฝึกหัดยาก",
        "en": "Use X on + adjective: Kirja on uusi. = The book is new. / Tehtävä on vaikea. = The exercise is difficult."
      },
      {
        "th": "pitkä ใช้กับคนหมายถึงสูง แต่กับสิ่งของหมายถึงยาว; lyhyt หมายถึงเตี้ยหรือสั้นตามบริบท",
        "en": "Pitkä means tall for a person and long for an object; lyhyt means short in either context."
      },
      {
        "th": "paljon และ vähän เป็นคำบอกปริมาณ ไม่ใช่คำคุณศัพท์: paljon lunta = หิมะมาก; vähän lunta = หิมะน้อย",
        "en": "Paljon and vähän express quantity rather than qualities: paljon lunta = much snow; vähän lunta = little snow."
      },
      {
        "th": "ฝึกความหมายแยกกัน: kuuma ร้อนกว่า lämmin; kylmä หนาวกว่า viileä ไม่ใช่คำแทนกันทุกสถานการณ์",
        "en": "Distinguish degrees: kuuma is hotter than lämmin; kylmä is colder than viileä. They are not interchangeable."
      }
    ],
    "tables": [
      {
        "title": {
          "th": "ครบทุกคู่ในหน้า 60",
          "en": "Every pair on page 60"
        },
        "columns": [
          {
            "th": "ฟินแลนด์",
            "en": "Finnish"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "ตรงข้าม",
            "en": "Opposite"
          }
        ],
        "rows": [
          [
            "hyvä",
            {
              "th": "ดี",
              "en": "good"
            },
            "huono"
          ],
          [
            "huono",
            {
              "th": "ไม่ดี / แย่",
              "en": "bad"
            },
            "hyvä"
          ],
          [
            "kuuma",
            {
              "th": "ร้อน",
              "en": "hot"
            },
            "kylmä"
          ],
          [
            "kylmä",
            {
              "th": "หนาว / เย็น",
              "en": "cold"
            },
            "kuuma"
          ],
          [
            "vaikea",
            {
              "th": "ยาก",
              "en": "difficult"
            },
            "helppo"
          ],
          [
            "helppo",
            {
              "th": "ง่าย",
              "en": "easy"
            },
            "vaikea"
          ],
          [
            "pieni",
            {
              "th": "เล็ก",
              "en": "small"
            },
            "iso / suuri"
          ],
          [
            "iso",
            {
              "th": "ใหญ่",
              "en": "big"
            },
            "pieni"
          ],
          [
            "suuri",
            {
              "th": "ใหญ่",
              "en": "large"
            },
            "pieni"
          ],
          [
            "uusi",
            {
              "th": "ใหม่",
              "en": "new"
            },
            "vanha"
          ],
          [
            "vanha",
            {
              "th": "เก่า / แก่",
              "en": "old"
            },
            "uusi"
          ],
          [
            "kaunis",
            {
              "th": "สวย",
              "en": "beautiful"
            },
            "ruma"
          ],
          [
            "ruma",
            {
              "th": "น่าเกลียด / ไม่สวย",
              "en": "ugly"
            },
            "kaunis"
          ],
          [
            "lämmin",
            {
              "th": "อุ่น",
              "en": "warm"
            },
            "viileä"
          ],
          [
            "viileä",
            {
              "th": "เย็นสบาย / ค่อนข้างเย็น",
              "en": "cool"
            },
            "lämmin"
          ],
          [
            "valoisa",
            {
              "th": "สว่าง",
              "en": "light / bright"
            },
            "pimeä"
          ],
          [
            "pimeä",
            {
              "th": "มืด",
              "en": "dark"
            },
            "valoisa"
          ],
          [
            "lyhyt",
            {
              "th": "สั้น / เตี้ย",
              "en": "short"
            },
            "pitkä"
          ],
          [
            "pitkä",
            {
              "th": "ยาว / สูง",
              "en": "long / tall"
            },
            "lyhyt"
          ],
          [
            "paljon",
            {
              "th": "มาก",
              "en": "much / many"
            },
            "vähän"
          ],
          [
            "vähän",
            {
              "th": "น้อย",
              "en": "little / few"
            },
            "paljon"
          ]
        ]
      }
    ]
  },
  {
    "id": "test2-weather",
    "title": {
      "th": "สภาพอากาศและอุณหภูมิ",
      "en": "Weather and temperature"
    },
    "pages": [
      61
    ],
    "intro": {
      "th": "ตอบ Millainen sää/ilma tänään on? ด้วยประโยคอากาศที่จำเป็นชุด ไม่ต้องใส่ประธานสมมติว่า it ในภาษาฟินแลนด์",
      "en": "Answer Millainen sää/ilma tänään on? using complete weather expressions. Finnish does not need a dummy subject corresponding to English it."
    },
    "notes": [
      {
        "th": "Kuinka monta astetta ulkona on? = ข้างนอกกี่องศา? On +30 astetta. = 30 องศาเหนือศูนย์; On −15 astetta. = ลบ 15 องศา",
        "en": "Kuinka monta astetta ulkona on? = How many degrees is it outside? On +30 astetta. = Plus 30 degrees; On −15 astetta. = Minus 15 degrees."
      },
      {
        "th": "ตามตัวอย่างในหนังสือ +30 = kuuma/helle, +20 = lämmin, +2 = viileä, −15 = kylmä/pakkasta เป็นตัวอย่างความรู้สึก ไม่ใช่เกณฑ์ตายตัว",
        "en": "Book examples associate +30 with kuuma/helle, +20 with lämmin, +2 with viileä and −15 with kylmä/pakkasta. These are illustrative descriptions, not rigid thresholds."
      },
      {
        "th": "จำ Sataa lunta / Sataa räntää เป็นก้อนคำ ห้ามเติม on ข้างหน้า sataa หรือ tuulee เพราะเป็นกริยาที่ผันแล้ว",
        "en": "Learn Sataa lunta / Sataa räntää as chunks. Do not put on before sataa or tuulee: they are already finite verbs."
      },
      {
        "th": "ประโยคสนทนา: Uh, onpa kamala ilma tänään! = โอ้ วันนี้อากาศแย่จริง! / No niin on! = ใช่เลย! / Ihanaa, että aurinko paistaa! = ดีจังที่แดดออก! / Joo, ja on tosi lämmin! = ใช่ แล้วก็อุ่นมากด้วย!",
        "en": "Conversation: Uh, onpa kamala ilma tänään! = Ugh, what awful weather today! / No niin on! = It certainly is! / Ihanaa, että aurinko paistaa! = Lovely that the sun is shining! / Joo, ja on tosi lämmin! = Yes, and it is really warm!"
      }
    ],
    "tables": [
      {
        "title": {
          "th": "คำและประโยคอากาศ",
          "en": "Weather words and sentences"
        },
        "columns": [
          {
            "th": "ฟินแลนด์",
            "en": "Finnish"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          }
        ],
        "rows": [
          [
            "sää",
            {
              "th": "สภาพอากาศ",
              "en": "weather"
            }
          ],
          [
            "ilma",
            {
              "th": "อากาศ / สภาพอากาศ",
              "en": "air / weather"
            }
          ],
          [
            "tänään",
            {
              "th": "วันนี้",
              "en": "today"
            }
          ],
          [
            "ulkona",
            {
              "th": "ข้างนอก",
              "en": "outside"
            }
          ],
          [
            "aste",
            {
              "th": "องศา",
              "en": "degree"
            }
          ],
          [
            "On kaunis / hyvä ilma.",
            {
              "th": "อากาศดี",
              "en": "The weather is nice."
            }
          ],
          [
            "On huono ilma.",
            {
              "th": "อากาศไม่ดี",
              "en": "The weather is bad."
            }
          ],
          [
            "On kuuma.",
            {
              "th": "อากาศร้อน",
              "en": "It is hot."
            }
          ],
          [
            "On helle.",
            {
              "th": "อากาศร้อนจัด",
              "en": "It is hot summer weather."
            }
          ],
          [
            "On lämmin.",
            {
              "th": "อากาศอุ่น",
              "en": "It is warm."
            }
          ],
          [
            "On viileä.",
            {
              "th": "อากาศเย็น",
              "en": "It is cool."
            }
          ],
          [
            "On kylmä.",
            {
              "th": "อากาศหนาว",
              "en": "It is cold."
            }
          ],
          [
            "On pakkasta.",
            {
              "th": "อุณหภูมิต่ำกว่าศูนย์",
              "en": "It is below freezing."
            }
          ],
          [
            "Aurinko paistaa.",
            {
              "th": "ดวงอาทิตย์ส่องแสง",
              "en": "The sun is shining."
            }
          ],
          [
            "On aurinkoista.",
            {
              "th": "มีแดด",
              "en": "It is sunny."
            }
          ],
          [
            "On pilvistä.",
            {
              "th": "มีเมฆมาก",
              "en": "It is cloudy."
            }
          ],
          [
            "On puolipilvistä.",
            {
              "th": "มีเมฆบางส่วน",
              "en": "It is partly cloudy."
            }
          ],
          [
            "On sumuista.",
            {
              "th": "มีหมอก",
              "en": "It is foggy."
            }
          ],
          [
            "Sataa.",
            {
              "th": "ฝนตก",
              "en": "It is raining."
            }
          ],
          [
            "On sateista.",
            {
              "th": "ฝนชุก / มีฝน",
              "en": "It is rainy."
            }
          ],
          [
            "Sataa räntää.",
            {
              "th": "ฝนปนหิมะตก",
              "en": "It is sleeting."
            }
          ],
          [
            "Sataa lunta.",
            {
              "th": "หิมะตก",
              "en": "It is snowing."
            }
          ],
          [
            "Tuulee.",
            {
              "th": "ลมพัด",
              "en": "It is windy."
            }
          ],
          [
            "On tuulista.",
            {
              "th": "มีลมแรง",
              "en": "It is windy."
            }
          ],
          [
            "On myrsky.",
            {
              "th": "มีพายุ",
              "en": "There is a storm."
            }
          ],
          [
            "On ukkonen.",
            {
              "th": "มีพายุฝนฟ้าคะนอง",
              "en": "There is a thunderstorm."
            }
          ]
        ]
      }
    ]
  },
  {
    "id": "test2-time",
    "title": {
      "th": "ฤดูกาล เดือน และช่วงเวลา",
      "en": "Seasons, months and time expressions"
    },
    "pages": [
      62
    ],
    "intro": {
      "th": "Milloin? = เมื่อไร? ชื่อเวลาเป็นรูปพจนานุกรม แต่คำตอบเมื่อไรต้องใช้รูปลงท้ายที่เหมาะสม เช่น kesä → kesällä",
      "en": "Milloin? = When? A time noun is the dictionary form; answering when requires the appropriate ending, for example kesä → kesällä."
    },
    "notes": [
      {
        "th": "ฤดูกาลและช่วงวันใช้ -lla/-llä; เดือนใช้ -ssa จดจำการเปลี่ยนฐาน talvi → talvella, kevät → keväällä, ilta → illalla",
        "en": "Seasons and times of day use -lla/-llä; months use -ssa. Memorize stem changes talvi → talvella, kevät → keväällä and ilta → illalla."
      },
      {
        "th": "Kesällä on lämmin. = ฤดูร้อนอากาศอุ่น / Luen illalla. = ฉันอ่านตอนเย็น",
        "en": "Kesällä on lämmin. = It is warm in summer. / Luen illalla. = I read in the evening."
      },
      {
        "th": "Milloin sinun syntymäpäivä on? – Minun syntymäpäivä on toukokuussa. = วันเกิดคุณเมื่อไร? – วันเกิดฉันอยู่ในเดือนพฤษภาคม (ถ้อยคำตามหน้าเรียน)",
        "en": "Milloin sinun syntymäpäivä on? – Minun syntymäpäivä on toukokuussa. = When is your birthday? – My birthday is in May (wording used on the page)."
      },
      {
        "th": "vuodenaika = ฤดูกาล, kuukausi = เดือน, vuorokausi = หนึ่งรอบ 24 ชั่วโมง; aamuyö อยู่ก่อนเช้า ไม่ใช่สาย",
        "en": "Vuodenaika = season, kuukausi = month, vuorokausi = a 24-hour day; aamuyö is before morning, not late morning."
      }
    ],
    "tables": [
      {
        "title": {
          "th": "ฤดูกาล",
          "en": "Seasons"
        },
        "columns": [
          {
            "th": "ชื่อ",
            "en": "Name"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "เมื่อไร",
            "en": "When"
          }
        ],
        "rows": [
          [
            "talvi",
            {
              "th": "ฤดูหนาว",
              "en": "winter"
            },
            "talvella"
          ],
          [
            "kevät",
            {
              "th": "ฤดูใบไม้ผลิ",
              "en": "spring"
            },
            "keväällä"
          ],
          [
            "kesä",
            {
              "th": "ฤดูร้อน",
              "en": "summer"
            },
            "kesällä"
          ],
          [
            "syksy",
            {
              "th": "ฤดูใบไม้ร่วง",
              "en": "autumn"
            },
            "syksyllä"
          ]
        ]
      },
      {
        "title": {
          "th": "เดือน",
          "en": "Months"
        },
        "columns": [
          {
            "th": "ชื่อ",
            "en": "Name"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "เมื่อไร",
            "en": "When"
          }
        ],
        "rows": [
          [
            "tammikuu",
            {
              "th": "มกราคม",
              "en": "January"
            },
            "tammikuussa"
          ],
          [
            "helmikuu",
            {
              "th": "กุมภาพันธ์",
              "en": "February"
            },
            "helmikuussa"
          ],
          [
            "maaliskuu",
            {
              "th": "มีนาคม",
              "en": "March"
            },
            "maaliskuussa"
          ],
          [
            "huhtikuu",
            {
              "th": "เมษายน",
              "en": "April"
            },
            "huhtikuussa"
          ],
          [
            "toukokuu",
            {
              "th": "พฤษภาคม",
              "en": "May"
            },
            "toukokuussa"
          ],
          [
            "kesäkuu",
            {
              "th": "มิถุนายน",
              "en": "June"
            },
            "kesäkuussa"
          ],
          [
            "heinäkuu",
            {
              "th": "กรกฎาคม",
              "en": "July"
            },
            "heinäkuussa"
          ],
          [
            "elokuu",
            {
              "th": "สิงหาคม",
              "en": "August"
            },
            "elokuussa"
          ],
          [
            "syyskuu",
            {
              "th": "กันยายน",
              "en": "September"
            },
            "syyskuussa"
          ],
          [
            "lokakuu",
            {
              "th": "ตุลาคม",
              "en": "October"
            },
            "lokakuussa"
          ],
          [
            "marraskuu",
            {
              "th": "พฤศจิกายน",
              "en": "November"
            },
            "marraskuussa"
          ],
          [
            "joulukuu",
            {
              "th": "ธันวาคม",
              "en": "December"
            },
            "joulukuussa"
          ]
        ]
      },
      {
        "title": {
          "th": "ช่วงเวลาในวัน",
          "en": "Times of day"
        },
        "columns": [
          {
            "th": "ชื่อ",
            "en": "Name"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "เมื่อไร",
            "en": "When"
          }
        ],
        "rows": [
          [
            "aamu",
            {
              "th": "เช้า",
              "en": "morning"
            },
            "aamulla"
          ],
          [
            "aamupäivä",
            {
              "th": "ช่วงสาย / ก่อนเที่ยง",
              "en": "forenoon / late morning"
            },
            "aamupäivällä"
          ],
          [
            "päivä",
            {
              "th": "วัน / กลางวัน",
              "en": "day / daytime"
            },
            "päivällä"
          ],
          [
            "iltapäivä",
            {
              "th": "บ่าย",
              "en": "afternoon"
            },
            "iltapäivällä"
          ],
          [
            "ilta",
            {
              "th": "เย็น",
              "en": "evening"
            },
            "illalla"
          ],
          [
            "yö",
            {
              "th": "กลางคืน",
              "en": "night"
            },
            "yöllä"
          ],
          [
            "aamuyö",
            {
              "th": "ช่วงดึกก่อนรุ่งเช้า",
              "en": "early hours before dawn"
            },
            "aamuyöllä"
          ]
        ]
      }
    ]
  },
  {
    "id": "test2-phrases",
    "title": {
      "th": "วลีขอความช่วยเหลือ",
      "en": "Phrases for asking for help"
    },
    "pages": [
      64
    ],
    "intro": {
      "th": "แยกสามความต้องการ: ฟังไม่ทันให้ขอช้าลง; ไม่ได้ยินให้ขอทวน; ไม่รู้ความหมายให้ถาม tarkoittaa จับคู่ประโยคกับสถานการณ์",
      "en": "Distinguish three needs: ask for slower speech if it is too fast, repetition if you missed it, and tarkoittaa when you need the meaning. Match the phrase to the situation."
    },
    "notes": [
      {
        "th": "Voitko + รูปพื้นฐานของกริยา: auttaa, puhua, sanoa คำถามนี้หมายถึง Can you…? ใช้กับคนที่เราพูดด้วย",
        "en": "Voitko + infinitive: auttaa, puhua, sanoa. This means Can you…? and addresses the person you are speaking to."
      },
      {
        "th": "บทฝึก: Anteeksi, voitko auttaa minua? – Mitä sähköposti tarkoittaa? – Kiitos avusta! = ขอโทษ ช่วยหน่อยได้ไหม? – sähköposti หมายถึงอะไร? – ขอบคุณที่ช่วย!",
        "en": "Practice sequence: Anteeksi, voitko auttaa minua? – Mitä sähköposti tarkoittaa? – Kiitos avusta! = Excuse me, can you help me? – What does sähköposti mean? – Thanks for your help!"
      }
    ],
    "tables": [
      {
        "title": {
          "th": "วลีครบและวิธีใช้",
          "en": "Complete phrases and their uses"
        },
        "columns": [
          {
            "th": "วลี",
            "en": "Phrase"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "ใช้เมื่อ",
            "en": "Use"
          }
        ],
        "rows": [
          [
            "Anteeksi, voitko auttaa minua / vähän?",
            {
              "th": "ขอโทษ ช่วยฉัน / ช่วยนิดหน่อยได้ไหม",
              "en": "Excuse me, can you help me / a little?"
            },
            {
              "th": "เริ่มขอความช่วยเหลืออย่างสุภาพ",
              "en": "A polite opening when asking for help."
            }
          ],
          [
            "Voitko puhua hitaammin?",
            {
              "th": "พูดช้าลงได้ไหม",
              "en": "Can you speak more slowly?"
            },
            {
              "th": "ใช้เมื่อเร็วเกินไป; hitaammin = ช้ากว่าเดิม",
              "en": "Use when speech is too fast; hitaammin means more slowly."
            }
          ],
          [
            "Voitko sanoa uudelleen?",
            {
              "th": "พูดอีกครั้งได้ไหม",
              "en": "Can you say it again?"
            },
            {
              "th": "ใช้ขอให้ทวน ไม่ได้ขอให้แปล",
              "en": "Request repetition, not translation."
            }
          ],
          [
            "Miten sanotaan Can you help me suomeksi?",
            {
              "th": "Can you help me พูดเป็นฟินแลนด์ว่าอย่างไร",
              "en": "How do you say Can you help me in Finnish?"
            },
            {
              "th": "Miten sanotaan … suomeksi? ใช้ถามวิธีพูดวลี",
              "en": "Miten sanotaan … suomeksi? asks how to express a phrase."
            }
          ],
          [
            "Mikä on language course suomeksi?",
            {
              "th": "language course ภาษาฟินแลนด์คืออะไร",
              "en": "What is language course in Finnish?"
            },
            {
              "th": "ถามคำศัพท์ที่ตรงกัน: kielikurssi",
              "en": "Ask for a vocabulary equivalent: kielikurssi."
            }
          ],
          [
            "Mitä sähköposti tarkoittaa?",
            {
              "th": "sähköposti หมายถึงอะไร",
              "en": "What does sähköposti mean?"
            },
            {
              "th": "ถามความหมายของคำฟินแลนด์: อีเมล",
              "en": "Ask the meaning of a Finnish word: email."
            }
          ],
          [
            "Anteeksi, en ymmärrä.",
            {
              "th": "ขอโทษ ฉันไม่เข้าใจ",
              "en": "Sorry, I do not understand."
            },
            {
              "th": "ymmärrä เป็นรูปปฏิเสธ ไม่ใช้ ymmärrän หลัง en",
              "en": "Ymmärrä is the negative form; do not use ymmärrän after en."
            }
          ],
          [
            "En tiedä.",
            {
              "th": "ฉันไม่รู้",
              "en": "I do not know."
            },
            {
              "th": "ใช้เมื่อไม่มีข้อมูลหรือคำตอบ",
              "en": "Use when you do not have the information or answer."
            }
          ],
          [
            "Kiitos avusta!",
            {
              "th": "ขอบคุณที่ช่วย!",
              "en": "Thank you for your help!"
            },
            {
              "th": "avusta บอกสิ่งที่ขอบคุณ",
              "en": "Avusta identifies what you are thanking someone for."
            }
          ],
          [
            "Se ei käy.",
            {
              "th": "แบบนั้นไม่ได้ / เวลานั้นไม่สะดวก",
              "en": "That does not work / suit me."
            },
            {
              "th": "ปฏิเสธตัวเลือกหรือเวลาที่เสนอ",
              "en": "Decline an unsuitable option or proposed time."
            }
          ],
          [
            "Sanotko uudelleen?",
            {
              "th": "พูดอีกครั้งได้ไหม",
              "en": "Will you say it again?"
            },
            {
              "th": "อีกวิธีขอให้ทวนข้อความ",
              "en": "Another way to request repetition."
            }
          ]
        ]
      }
    ]
  },
  {
    "id": "test2-verbs",
    "title": {
      "th": "กริยา 20 คำและการผัน",
      "en": "Twenty verbs and conjugation"
    },
    "pages": [
      80
    ],
    "intro": {
      "th": "หน้า 80 ให้ทอยลูกเต๋าเลือกบุรุษ: 1 minä, 2 sinä, 3 hän, 4 me, 5 te, 6 he กริยาทั้งหมดในตารางเป็นชนิดที่ 1 และฝึกการเปลี่ยนพยัญชนะ k-p-t",
      "en": "Page 80 assigns die faces to persons: 1 minä, 2 sinä, 3 hän, 4 me, 5 te, 6 he. All twenty verbs here are type 1 and practise consonant gradation."
    },
    "notes": [
      {
        "th": "minä/sinä/me/te ใช้ฐานเสียงอ่อน + n/t/mme/tte; hän/he ใช้ฐานเสียงแข็ง ตารางให้ครบทั้งหกรูปเพื่อฝึกได้โดยไม่เปิดหนังสือ",
        "en": "Minä/sinä/me/te use the weak stem + n/t/mme/tte; hän/he use the strong stem. The table gives all six forms for independent practice."
      },
      {
        "th": "ตัวอย่าง lukea: minä luen, sinä luet, hän lukee, me luemme, te luette, he lukevat สังเกตว่า k หายไปเฉพาะฐานเสียงอ่อน",
        "en": "Example lukea: minä luen, sinä luet, hän lukee, me luemme, te luette, he lukevat. K disappears only in the weak stem."
      },
      {
        "th": "ปฏิเสธใช้ en/et/ei/emme/ette/eivät + ฐานเสียงอ่อน ไม่เติมคำลงท้ายบุรุษอีก: en ymmärrä, hän ei kirjoita, he eivät lue",
        "en": "Negatives use en/et/ei/emme/ette/eivät + weak stem without a personal ending: en ymmärrä, hän ei kirjoita, he eivät lue."
      },
      {
        "th": "แยกความหมาย: lukea อ่าน, oppia เรียนรู้, ymmärtää เข้าใจ; Minä luen ja opin. = ฉันอ่านและเรียนรู้ / Hän näyttää kuvan. = เขาให้ดูรูป",
        "en": "Distinguish lukea (read), oppia (learn), ymmärtää (understand). Minä luen ja opin. = I read and learn. / Hän näyttää kuvan. = They show a picture."
      }
    ],
    "tables": [
      {
        "title": {
          "th": "ครบ 20 คำ พร้อมทั้งหกบุรุษ",
          "en": "All twenty verbs with six person forms"
        },
        "columns": [
          {
            "th": "รูปพื้นฐาน",
            "en": "Infinitive"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "การเปลี่ยน",
            "en": "Change"
          },
          {
            "th": "minä · sinä · hän",
            "en": "minä · sinä · hän"
          },
          {
            "th": "me · te · he",
            "en": "me · te · he"
          }
        ],
        "rows": [
          [
            "ampua",
            {
              "th": "ยิง",
              "en": "shoot"
            },
            "mp → mm",
            "ammun · ammut · ampuu",
            "ammumme · ammutte · ampuvat"
          ],
          [
            "antaa",
            {
              "th": "ให้",
              "en": "give"
            },
            "nt → nn",
            "annan · annat · antaa",
            "annamme · annatte · antavat"
          ],
          [
            "hiihtää",
            {
              "th": "เล่นสกีทางราบ",
              "en": "cross-country ski"
            },
            "t → d",
            "hiihdän · hiihdät · hiihtää",
            "hiihdämme · hiihdätte · hiihtävät"
          ],
          [
            "hyppiä",
            {
              "th": "กระโดดซ้ำ ๆ",
              "en": "jump / hop repeatedly"
            },
            "pp → p",
            "hypin · hypit · hyppii",
            "hypimme · hypitte · hyppivät"
          ],
          [
            "jakaa",
            {
              "th": "แบ่ง / แจก",
              "en": "divide / distribute"
            },
            "k → ∅",
            "jaan · jaat · jakaa",
            "jaamme · jaatte · jakavat"
          ],
          [
            "kertoa",
            {
              "th": "บอก / เล่า",
              "en": "tell"
            },
            "rt → rr",
            "kerron · kerrot · kertoo",
            "kerromme · kerrotte · kertovat"
          ],
          [
            "kirjoittaa",
            {
              "th": "เขียน",
              "en": "write"
            },
            "tt → t",
            "kirjoitan · kirjoitat · kirjoittaa",
            "kirjoitamme · kirjoitatte · kirjoittavat"
          ],
          [
            "kylpeä",
            {
              "th": "อาบน้ำในอ่าง",
              "en": "bathe"
            },
            "p → v",
            "kylven · kylvet · kylpee",
            "kylvemme · kylvette · kylpevät"
          ],
          [
            "leipoa",
            {
              "th": "อบขนม",
              "en": "bake"
            },
            "p → v",
            "leivon · leivot · leipoo",
            "leivomme · leivotte · leipovat"
          ],
          [
            "lentää",
            {
              "th": "บิน",
              "en": "fly"
            },
            "nt → nn",
            "lennän · lennät · lentää",
            "lennämme · lennätte · lentävät"
          ],
          [
            "lukea",
            {
              "th": "อ่าน",
              "en": "read"
            },
            "k → ∅",
            "luen · luet · lukee",
            "luemme · luette · lukevat"
          ],
          [
            "lähteä",
            {
              "th": "ออกเดินทาง / ออกไป",
              "en": "leave / depart"
            },
            "t → d",
            "lähden · lähdet · lähtee",
            "lähdemme · lähdette · lähtevät"
          ],
          [
            "löytää",
            {
              "th": "หาเจอ",
              "en": "find"
            },
            "t → d",
            "löydän · löydät · löytää",
            "löydämme · löydätte · löytävät"
          ],
          [
            "näyttää",
            {
              "th": "แสดง / ให้ดู",
              "en": "show"
            },
            "tt → t",
            "näytän · näytät · näyttää",
            "näytämme · näytätte · näyttävät"
          ],
          [
            "onkia",
            {
              "th": "ตกปลา (ใช้เบ็ด)",
              "en": "fish with a rod"
            },
            "nk → ng",
            "ongin · ongit · onkii",
            "ongimme · ongitte · onkivat"
          ],
          [
            "oppia",
            {
              "th": "เรียนรู้",
              "en": "learn"
            },
            "pp → p",
            "opin · opit · oppii",
            "opimme · opitte · oppivat"
          ],
          [
            "ottaa",
            {
              "th": "หยิบ / เอา",
              "en": "take"
            },
            "tt → t",
            "otan · otat · ottaa",
            "otamme · otatte · ottavat"
          ],
          [
            "piirtää",
            {
              "th": "วาด",
              "en": "draw"
            },
            "rt → rr",
            "piirrän · piirrät · piirtää",
            "piirrämme · piirrätte · piirtävät"
          ],
          [
            "rakentaa",
            {
              "th": "สร้าง",
              "en": "build"
            },
            "nt → nn",
            "rakennan · rakennat · rakentaa",
            "rakennamme · rakennatte · rakentavat"
          ],
          [
            "ymmärtää",
            {
              "th": "เข้าใจ",
              "en": "understand"
            },
            "rt → rr",
            "ymmärrän · ymmärrät · ymmärtää",
            "ymmärrämme · ymmärrätte · ymmärtävät"
          ]
        ]
      }
    ]
  },
  {
    "id": "test2-clothes",
    "title": {
      "th": "เสื้อผ้าและสิ่งที่สวมอยู่",
      "en": "Clothes and what you are wearing"
    },
    "pages": [
      94
    ],
    "intro": {
      "th": "Mitä sinulla on päällä? = คุณใส่อะไรอยู่? ตอบ Minulla on päällä… แล้วเติมชื่อเสื้อผ้า หน้าเรียนใช้ทั้งคำเอกพจน์และพหูพจน์ จึงต้องจำรูปที่ใช้จริง",
      "en": "Mitä sinulla on päällä? = What are you wearing? Answer Minulla on päällä… followed by clothing. The page uses both singular and plural nouns, so learn the actual forms."
    },
    "notes": [
      {
        "th": "คำลงท้าย -t หลายคำเป็นพหูพจน์ เช่น sukat, kengät, käsineet ส่วน housut, farkut, shortsit, uimahousut, rintaliivit, alushousut, kalsarit ใช้รูปพหูพจน์แม้พูดถึงชุดเดียว",
        "en": "Many -t forms are plural, including sukat, kengät and käsineet. Housut, farkut, shortsit, uimahousut, rintaliivit, alushousut and kalsarit normally use plural forms even for one garment."
      },
      {
        "th": "ตารางแสดงชื่อบนหน้าเรียนในคอลัมน์แรก และเพิ่มเอกพจน์ → พหูพจน์สำหรับทบทวน ไม่ฝืนสร้างเอกพจน์ให้คำที่ปกติเป็นพหูพจน์",
        "en": "The first column preserves the page label. Singular → plural pairs are added for revision where useful; no artificial singular is supplied for normally plural clothing names."
      },
      {
        "th": "Minulla on päällä farkut ja villapusero. = ฉันใส่ยีนส์กับเสื้อไหมพรม / Minulla on päässä pipo. = ฉันสวมหมวกไหมพรม ใช้ päässä กับสิ่งที่สวมบนศีรษะ",
        "en": "Minulla on päällä farkut ja villapusero. = I am wearing jeans and a woollen sweater. / Minulla on päässä pipo. = I am wearing a beanie. Päässä refers to an item worn on the head."
      },
      {
        "th": "ในบทสนทนามี villapaita = เสื้อไหมพรม, raidallinen = ลายทาง, ruudullinen = ลายตาราง และ ruskeat kengät = รองเท้าสีน้ำตาล (ruskea → ruskeat ให้สอดคล้องกับ kengät)",
        "en": "The dialogue also uses villapaita = woollen sweater, raidallinen = striped, ruudullinen = checked and ruskeat kengät = brown shoes (ruskea → ruskeat agrees with plural kengät)."
      }
    ],
    "tables": [
      {
        "title": {
          "th": "เสื้อผ้าทุกคำในภาพ",
          "en": "Every clothing label in the picture"
        },
        "columns": [
          {
            "th": "ชื่อในหน้าเรียน",
            "en": "Page label"
          },
          {
            "th": "ความหมาย",
            "en": "Meaning"
          },
          {
            "th": "เอกพจน์ → พหูพจน์ / รูปที่ใช้",
            "en": "Singular → plural / usual form"
          }
        ],
        "rows": [
          [
            "t-paita",
            {
              "th": "เสื้อยืด",
              "en": "T-shirt"
            },
            "t-paita → t-paidat"
          ],
          [
            "paita",
            {
              "th": "เสื้อ",
              "en": "shirt"
            },
            "paita → paidat"
          ],
          [
            "villapusero",
            {
              "th": "เสื้อกันหนาวไหมพรม",
              "en": "woollen sweater"
            },
            "villapusero → villapuserot"
          ],
          [
            "takki",
            {
              "th": "เสื้อแจ็กเก็ต / เสื้อโค้ต",
              "en": "jacket / coat"
            },
            "takki → takit"
          ],
          [
            "housut",
            {
              "th": "กางเกงขายาว",
              "en": "trousers"
            },
            "housut"
          ],
          [
            "farkut",
            {
              "th": "กางเกงยีนส์",
              "en": "jeans"
            },
            "farkut"
          ],
          [
            "hame",
            {
              "th": "กระโปรง",
              "en": "skirt"
            },
            "hame → hameet"
          ],
          [
            "mekko",
            {
              "th": "ชุดเดรส",
              "en": "dress"
            },
            "mekko → mekot"
          ],
          [
            "puku",
            {
              "th": "ชุดสูท",
              "en": "suit"
            },
            "puku → puvut"
          ],
          [
            "uimapuku",
            {
              "th": "ชุดว่ายน้ำ",
              "en": "swimsuit"
            },
            "uimapuku → uimapuvut"
          ],
          [
            "uimahousut",
            {
              "th": "กางเกงว่ายน้ำ",
              "en": "swimming trunks"
            },
            "uimahousut"
          ],
          [
            "sukat",
            {
              "th": "ถุงเท้า",
              "en": "socks"
            },
            "sukka → sukat"
          ],
          [
            "shortsit",
            {
              "th": "กางเกงขาสั้น",
              "en": "shorts"
            },
            "shortsit"
          ],
          [
            "kengät",
            {
              "th": "รองเท้า",
              "en": "shoes"
            },
            "kenkä → kengät"
          ],
          [
            "saappaat",
            {
              "th": "รองเท้าบูต",
              "en": "boots"
            },
            "saapas → saappaat"
          ],
          [
            "lenkkarit",
            {
              "th": "รองเท้าผ้าใบ / รองเท้าวิ่ง",
              "en": "trainers / sneakers"
            },
            "lenkkari → lenkkarit"
          ],
          [
            "lenkkitossut",
            {
              "th": "รองเท้าวิ่ง (คำพ้อง lenkkarit)",
              "en": "running shoes (synonym of lenkkarit)"
            },
            "lenkkitossu → lenkkitossut"
          ],
          [
            "alusvaatteet",
            {
              "th": "ชุดชั้นใน (รวม)",
              "en": "underwear (collective)"
            },
            "alusvaate → alusvaatteet"
          ],
          [
            "rintaliivit",
            {
              "th": "เสื้อชั้นใน",
              "en": "bra"
            },
            "rintaliivit"
          ],
          [
            "alushousut",
            {
              "th": "กางเกงชั้นใน",
              "en": "underpants"
            },
            "alushousut"
          ],
          [
            "aluspaita",
            {
              "th": "เสื้อชั้นในตัวบน",
              "en": "undershirt"
            },
            "aluspaita → aluspaidat"
          ],
          [
            "kalsarit",
            {
              "th": "กางเกงใน (ภาษาพูด)",
              "en": "underpants (colloquial)"
            },
            "kalsarit"
          ],
          [
            "huivi",
            {
              "th": "ผ้าโพกศีรษะ / ผ้าพันคอ",
              "en": "headscarf / scarf"
            },
            "huivi → huivit"
          ],
          [
            "pipo",
            {
              "th": "หมวกไหมพรม",
              "en": "beanie / knitted cap"
            },
            "pipo → pipot"
          ],
          [
            "käsineet",
            {
              "th": "ถุงมือ",
              "en": "gloves"
            },
            "käsine → käsineet"
          ],
          [
            "solmio",
            {
              "th": "เนกไท",
              "en": "tie"
            },
            "solmio → solmiot"
          ],
          [
            "vyö",
            {
              "th": "เข็มขัด",
              "en": "belt"
            },
            "vyö → vyöt"
          ],
          [
            "kaulaliina",
            {
              "th": "ผ้าพันคอ",
              "en": "neck scarf"
            },
            "kaulaliina → kaulaliinat"
          ],
          [
            "sateenvarjo",
            {
              "th": "ร่ม",
              "en": "umbrella"
            },
            "sateenvarjo → sateenvarjot"
          ]
        ]
      }
    ]
  }
];

export const topicQuestions: ReviewQuestion[] = [
  {
    "id": "topic-q01",
    "topic": "Adjectives",
    "prompt": {
      "th": "เติมคำตรงข้าม: vaikea ↔ ___",
      "en": "Complete the opposite: vaikea ↔ ___"
    },
    "answer": "helppo",
    "explanation": {
      "th": "vaikea แปลว่ายาก; helppo แปลง่าย ส่วน hyvä หมายถึงดี ไม่ใช่ง่าย",
      "en": "Vaikea means difficult; helppo means easy. Hyvä means good, not easy."
    }
  },
  {
    "id": "topic-q02",
    "topic": "Adjectives",
    "prompt": {
      "th": "บอกว่าห้องสว่าง: Huone on ___. (valoisa / pimeä)",
      "en": "Say the room is bright: Huone on ___. (valoisa / pimeä)"
    },
    "answer": "valoisa",
    "explanation": {
      "th": "valoisa = สว่าง ส่วน pimeä = มืด ใช้ on ตามด้วยคำบรรยาย",
      "en": "Valoisa means bright; pimeä means dark. On is followed by the describing adjective."
    }
  },
  {
    "id": "topic-q03",
    "topic": "Adjectives",
    "prompt": {
      "th": "คำใดใช้ทั้งความหมายยาวและสูง: pitkä หรือ pieni?",
      "en": "Which means both long and tall: pitkä or pieni?"
    },
    "answer": "pitkä",
    "explanation": {
      "th": "pitkä บอกความยาวของสิ่งของหรือความสูงของคน; pieni แปลว่าเล็ก",
      "en": "Pitkä describes an object’s length or a person’s height; pieni means small."
    }
  },
  {
    "id": "topic-q04",
    "topic": "Weather",
    "prompt": {
      "th": "แปลเป็นฟินแลนด์: หิมะตก",
      "en": "Translate into Finnish: It is snowing."
    },
    "answer": "Sataa lunta.",
    "explanation": {
      "th": "sataa เป็นกริยาที่ผันแล้ว และ lunta เป็นรูปที่ใช้กับหิมะในประโยคนี้ ไม่เติม on",
      "en": "Sataa is already a finite verb, and lunta is the snow form used in this expression. Do not add on."
    }
  },
  {
    "id": "topic-q05",
    "topic": "Weather",
    "prompt": {
      "th": "อุณหภูมิ −15 องศา: On helle หรือ On pakkasta?",
      "en": "At −15 degrees: On helle or On pakkasta?"
    },
    "answer": "On pakkasta.",
    "explanation": {
      "th": "pakkasta บอกอุณหภูมิต่ำกว่าศูนย์ ส่วน helle เป็นอากาศร้อนจัด",
      "en": "Pakkasta describes below-zero conditions; helle refers to hot summer weather."
    }
  },
  {
    "id": "topic-q06",
    "topic": "Weather",
    "prompt": {
      "th": "แก้ประโยค: On tuulee.",
      "en": "Correct the sentence: On tuulee."
    },
    "answer": "Tuulee. / On tuulista.",
    "explanation": {
      "th": "ใช้กริยา Tuulee เดี่ยว ๆ หรือใช้ on + tuulista ห้ามผสมสองโครงสร้าง",
      "en": "Use the verb Tuulee on its own, or on + tuulista. Do not combine the two constructions."
    }
  },
  {
    "id": "topic-q07",
    "topic": "Weather",
    "prompt": {
      "th": "ฝนปนหิมะตกใช้ Sataa ___",
      "en": "For sleet, complete Sataa ___"
    },
    "answer": "räntää",
    "explanation": {
      "th": "räntää คือฝนปนหิมะ; lunta คือหิมะ จึงต่างกันตามสภาพที่สังเกต",
      "en": "Räntää means sleet; lunta means snow. Choose according to the precipitation."
    }
  },
  {
    "id": "topic-q08",
    "topic": "Time",
    "prompt": {
      "th": "เติม: ฤดูใบไม้ผลิ = ___ (ใช้ตอบ Milloin?)",
      "en": "Fill in: in spring = ___ (answering Milloin?)"
    },
    "answer": "keväällä",
    "explanation": {
      "th": "kevät เปลี่ยนฐานเป็น kevää- แล้วเติม -llä ไม่ใช่ kevätllä",
      "en": "Kevät changes to the stem kevää- before -llä; kevätllä is not correct."
    }
  },
  {
    "id": "topic-q09",
    "topic": "Time",
    "prompt": {
      "th": "วันเกิดอยู่เดือนสิงหาคม: Syntymäpäivä on ___.",
      "en": "The birthday is in August: Syntymäpäivä on ___."
    },
    "answer": "elokuussa",
    "explanation": {
      "th": "elokuu คือสิงหาคม เดือนใช้ -ssa จึงได้ elokuussa ไม่ใช้ -lla",
      "en": "Elokuu is August. Months take -ssa, giving elokuussa rather than an -lla form."
    }
  },
  {
    "id": "topic-q10",
    "topic": "Time",
    "prompt": {
      "th": "แปล: ตอนเย็น",
      "en": "Translate: in the evening"
    },
    "answer": "illalla",
    "explanation": {
      "th": "ilta เปลี่ยน lt เป็น ll ก่อนลงท้าย -lla จึงเป็น illalla",
      "en": "Ilta changes lt to ll in this form: illalla."
    }
  },
  {
    "id": "topic-q12",
    "topic": "Time",
    "prompt": {
      "th": "aamupäivä กับ aamuyö คำใดหมายถึงช่วงก่อนรุ่งเช้า?",
      "en": "Which means the hours before dawn: aamupäivä or aamuyö?"
    },
    "answer": "aamuyö",
    "explanation": {
      "th": "aamuyö คือส่วนท้ายของกลางคืนก่อนเช้า ส่วน aamupäivä คือช่วงเช้าก่อนเที่ยง",
      "en": "Aamuyö is the late part of the night before morning; aamupäivä is the morning before noon."
    }
  },
  {
    "id": "topic-q13",
    "topic": "Phrases",
    "prompt": {
      "th": "คนพูดเร็วเกินไป ควรขออย่างไร?",
      "en": "Someone speaks too quickly. What should you ask?"
    },
    "answer": "Voitko puhua hitaammin?",
    "explanation": {
      "th": "hitaammin ขอความเร็วที่ช้าลง ต่างจาก uudelleen ซึ่งขอให้พูดซ้ำ",
      "en": "Hitaammin asks for slower speech; uudelleen asks for repetition."
    }
  },
  {
    "id": "topic-q14",
    "topic": "Phrases",
    "prompt": {
      "th": "อยากรู้ความหมายของ lomake เติม: Mitä lomake ___?",
      "en": "Ask the meaning of lomake: Mitä lomake ___?"
    },
    "answer": "tarkoittaa",
    "explanation": {
      "th": "Mitä X tarkoittaa? ถามความหมายของ X; lomake หมายถึงแบบฟอร์ม",
      "en": "Mitä X tarkoittaa? asks what X means. Lomake means form."
    }
  },
  {
    "id": "topic-q15",
    "topic": "Phrases",
    "prompt": {
      "th": "แก้ประโยค: En ymmärrän.",
      "en": "Correct: En ymmärrän."
    },
    "answer": "En ymmärrä.",
    "explanation": {
      "th": "en แสดงบุรุษที่หนึ่งแล้ว กริยาหลักใช้ฐานปฏิเสธ ymmärrä ไม่เติม -n",
      "en": "En carries the first-person marking; the main verb uses ymmärrä without -n."
    }
  },
  {
    "id": "topic-q16",
    "topic": "Phrases",
    "prompt": {
      "th": "ได้รับความช่วยเหลือแล้ว พูดขอบคุณอย่างไร?",
      "en": "You have received help. How do you thank the person?"
    },
    "answer": "Kiitos avusta!",
    "explanation": {
      "th": "avusta ระบุว่าขอบคุณสำหรับความช่วยเหลือ เป็นวลีปิดการขอความช่วยเหลือ",
      "en": "Avusta specifies thanks for the help and naturally closes a help exchange."
    }
  },
  {
    "id": "topic-q17",
    "topic": "Verbs",
    "prompt": {
      "th": "ผัน: me + kirjoittaa",
      "en": "Conjugate: me + kirjoittaa"
    },
    "answer": "me kirjoitamme",
    "explanation": {
      "th": "ฐานเสียงอ่อนเขียนเป็น kirjoita- (tt → t) แล้วเติม -mme สำหรับ me",
      "en": "Use the weak stem kirjoita- (tt → t), then add -mme for me."
    }
  },
  {
    "id": "topic-q18",
    "topic": "Verbs",
    "prompt": {
      "th": "ผัน: hän + lukea",
      "en": "Conjugate: hän + lukea"
    },
    "answer": "hän lukee",
    "explanation": {
      "th": "hän ใช้ฐานเสียงแข็ง luke- จึงเก็บ k และยืด e เป็น ee",
      "en": "Hän uses the strong stem luke-, retaining k and lengthening e to ee."
    }
  },
  {
    "id": "topic-q19",
    "topic": "Verbs",
    "prompt": {
      "th": "ผัน: sinä + löytää",
      "en": "Conjugate: sinä + löytää"
    },
    "answer": "sinä löydät",
    "explanation": {
      "th": "sinä ใช้ฐานเสียงอ่อน löydä- โดย t → d แล้วเติม -t",
      "en": "Sinä uses weak löydä- with t → d, then adds -t."
    }
  },
  {
    "id": "topic-q20",
    "topic": "Verbs",
    "prompt": {
      "th": "ผัน: te + onkia",
      "en": "Conjugate: te + onkia"
    },
    "answer": "te ongitte",
    "explanation": {
      "th": "nk → ng ทำให้ฐานเป็น ongi- เติม -tte สำหรับ te ไม่ใช่ onkitte",
      "en": "Nk → ng gives ongi-. Add -tte for te; onkitte is incorrect."
    }
  },
  {
    "id": "topic-q21",
    "topic": "Verbs",
    "prompt": {
      "th": "ผัน: he + hyppiä",
      "en": "Conjugate: he + hyppiä"
    },
    "answer": "he hyppivät",
    "explanation": {
      "th": "he ใช้ฐานเสียงแข็ง hyppi- เก็บ pp แล้วเติม -vät ตามสระหน้า",
      "en": "He uses strong hyppi-, retaining pp, and takes -vät to match front vowels."
    }
  },
  {
    "id": "topic-q22",
    "topic": "Verbs",
    "prompt": {
      "th": "ทำเป็นปฏิเสธ: Minä otan.",
      "en": "Make negative: Minä otan."
    },
    "answer": "Minä en ota.",
    "explanation": {
      "th": "ottaa → ota- (tt → t) ใช้ en + ota โดยไม่มี -n ในกริยาหลัก",
      "en": "Ottaa has weak stem ota- (tt → t). Use en + ota without -n on the main verb."
    }
  },
  {
    "id": "topic-q23",
    "topic": "Clothes",
    "prompt": {
      "th": "คำใดคือกระโปรงและคำใดคือชุดเดรส: hame / mekko?",
      "en": "Which is skirt and which is dress: hame / mekko?"
    },
    "answer": "hame = skirt; mekko = dress",
    "explanation": {
      "th": "hame เป็นเสื้อผ้าส่วนล่าง ส่วน mekko เป็นชุดเดรสชิ้นเดียว ต้องแยกสองคำนี้",
      "en": "Hame is a skirt; mekko is a one-piece dress. They are different garments."
    }
  },
  {
    "id": "topic-q24",
    "topic": "Clothes",
    "prompt": {
      "th": "เติมรูปพหูพจน์: sukka → ___; kenkä → ___",
      "en": "Fill in the plurals: sukka → ___; kenkä → ___"
    },
    "answer": "sukat; kengät",
    "explanation": {
      "th": "เติม -t พร้อมเปลี่ยนพยัญชนะ: kk → k ใน sukka, nk → ng ใน kenkä",
      "en": "Add -t with consonant changes: kk → k in sukka, nk → ng in kenkä."
    }
  },
  {
    "id": "topic-q25",
    "topic": "Clothes",
    "prompt": {
      "th": "ใส่หมวกไหมพรม: Minulla on ___ pipo.",
      "en": "Wearing a beanie: Minulla on ___ pipo."
    },
    "answer": "päässä",
    "explanation": {
      "th": "päässä ระบุว่าสวมบนศีรษะ ส่วน päällä ใช้ถามหรือบอกเสื้อผ้าที่สวมทั่วไป",
      "en": "Päässä specifies an item on the head. Päällä is used more generally for clothes being worn."
    }
  },
  {
    "id": "topic-q26",
    "topic": "Clothes",
    "prompt": {
      "th": "farkut เป็นรูปเอกพจน์หรือพหูพจน์ แม้หมายถึงยีนส์ตัวเดียว?",
      "en": "Is farkut singular or plural, even for one pair of jeans?"
    },
    "answer": "monikko (plural)",
    "explanation": {
      "th": "ชื่อเสื้อผ้าบางอย่างใช้พหูพจน์เป็นปกติ: farkut, housut, shortsit จำรูปคำทั้งคำ",
      "en": "Some garment names normally use plural forms: farkut, housut, shortsit. Learn each as a whole word."
    }
  }
];

export const topicWords: ExamWord[] = [
  {
    "fi": "hyvä",
    "th": "ดี",
    "en": "good",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "huono",
    "th": "ไม่ดี / แย่",
    "en": "bad",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "kuuma",
    "th": "ร้อน",
    "en": "hot",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "kylmä",
    "th": "หนาว / เย็น",
    "en": "cold",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "vaikea",
    "th": "ยาก",
    "en": "difficult",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "helppo",
    "th": "ง่าย",
    "en": "easy",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "pieni",
    "th": "เล็ก",
    "en": "small",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "iso",
    "th": "ใหญ่",
    "en": "big",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "suuri",
    "th": "ใหญ่",
    "en": "large",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "uusi",
    "th": "ใหม่",
    "en": "new",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "vanha",
    "th": "เก่า / แก่",
    "en": "old",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "kaunis",
    "th": "สวย",
    "en": "beautiful",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "ruma",
    "th": "น่าเกลียด / ไม่สวย",
    "en": "ugly",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "lämmin",
    "th": "อุ่น",
    "en": "warm",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "viileä",
    "th": "เย็นสบาย / ค่อนข้างเย็น",
    "en": "cool",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "valoisa",
    "th": "สว่าง",
    "en": "light / bright",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "pimeä",
    "th": "มืด",
    "en": "dark",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "lyhyt",
    "th": "สั้น / เตี้ย",
    "en": "short",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "pitkä",
    "th": "ยาว / สูง",
    "en": "long / tall",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "paljon",
    "th": "มาก",
    "en": "much / many",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "vähän",
    "th": "น้อย",
    "en": "little / few",
    "category": "Adjectives and quantity",
    "page": 60
  },
  {
    "fi": "sää",
    "th": "สภาพอากาศ",
    "en": "weather",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "ilma",
    "th": "อากาศ / สภาพอากาศ",
    "en": "air / weather",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "tänään",
    "th": "วันนี้",
    "en": "today",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "ulkona",
    "th": "ข้างนอก",
    "en": "outside",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "aste",
    "th": "องศา",
    "en": "degree",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On kaunis / hyvä ilma.",
    "th": "อากาศดี",
    "en": "The weather is nice.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On huono ilma.",
    "th": "อากาศไม่ดี",
    "en": "The weather is bad.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On kuuma.",
    "th": "อากาศร้อน",
    "en": "It is hot.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On helle.",
    "th": "อากาศร้อนจัด",
    "en": "It is hot summer weather.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On lämmin.",
    "th": "อากาศอุ่น",
    "en": "It is warm.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On viileä.",
    "th": "อากาศเย็น",
    "en": "It is cool.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On kylmä.",
    "th": "อากาศหนาว",
    "en": "It is cold.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On pakkasta.",
    "th": "อุณหภูมิต่ำกว่าศูนย์",
    "en": "It is below freezing.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "Aurinko paistaa.",
    "th": "ดวงอาทิตย์ส่องแสง",
    "en": "The sun is shining.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On aurinkoista.",
    "th": "มีแดด",
    "en": "It is sunny.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On pilvistä.",
    "th": "มีเมฆมาก",
    "en": "It is cloudy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On puolipilvistä.",
    "th": "มีเมฆบางส่วน",
    "en": "It is partly cloudy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On sumuista.",
    "th": "มีหมอก",
    "en": "It is foggy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "Sataa.",
    "th": "ฝนตก",
    "en": "It is raining.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On sateista.",
    "th": "ฝนชุก / มีฝน",
    "en": "It is rainy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "Sataa räntää.",
    "th": "ฝนปนหิมะตก",
    "en": "It is sleeting.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "Sataa lunta.",
    "th": "หิมะตก",
    "en": "It is snowing.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "Tuulee.",
    "th": "ลมพัด",
    "en": "It is windy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On tuulista.",
    "th": "มีลมแรง",
    "en": "It is windy.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On myrsky.",
    "th": "มีพายุ",
    "en": "There is a storm.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "On ukkonen.",
    "th": "มีพายุฝนฟ้าคะนอง",
    "en": "There is a thunderstorm.",
    "category": "Weather",
    "page": 61
  },
  {
    "fi": "talvi",
    "th": "ฤดูหนาว",
    "en": "winter",
    "category": "Seasons",
    "page": 62
  },
  {
    "fi": "kevät",
    "th": "ฤดูใบไม้ผลิ",
    "en": "spring",
    "category": "Seasons",
    "page": 62
  },
  {
    "fi": "kesä",
    "th": "ฤดูร้อน",
    "en": "summer",
    "category": "Seasons",
    "page": 62
  },
  {
    "fi": "syksy",
    "th": "ฤดูใบไม้ร่วง",
    "en": "autumn",
    "category": "Seasons",
    "page": 62
  },
  {
    "fi": "tammikuu",
    "th": "มกราคม",
    "en": "January",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "helmikuu",
    "th": "กุมภาพันธ์",
    "en": "February",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "maaliskuu",
    "th": "มีนาคม",
    "en": "March",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "huhtikuu",
    "th": "เมษายน",
    "en": "April",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "toukokuu",
    "th": "พฤษภาคม",
    "en": "May",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "kesäkuu",
    "th": "มิถุนายน",
    "en": "June",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "heinäkuu",
    "th": "กรกฎาคม",
    "en": "July",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "elokuu",
    "th": "สิงหาคม",
    "en": "August",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "syyskuu",
    "th": "กันยายน",
    "en": "September",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "lokakuu",
    "th": "ตุลาคม",
    "en": "October",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "marraskuu",
    "th": "พฤศจิกายน",
    "en": "November",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "joulukuu",
    "th": "ธันวาคม",
    "en": "December",
    "category": "Months",
    "page": 62
  },
  {
    "fi": "aamu",
    "th": "เช้า",
    "en": "morning",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "aamupäivä",
    "th": "ช่วงสาย / ก่อนเที่ยง",
    "en": "forenoon / late morning",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "päivä",
    "th": "วัน / กลางวัน",
    "en": "day / daytime",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "iltapäivä",
    "th": "บ่าย",
    "en": "afternoon",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "ilta",
    "th": "เย็น",
    "en": "evening",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "yö",
    "th": "กลางคืน",
    "en": "night",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "aamuyö",
    "th": "ช่วงดึกก่อนรุ่งเช้า",
    "en": "early hours before dawn",
    "category": "Times of day",
    "page": 62
  },
  {
    "fi": "Anteeksi, voitko auttaa minua / vähän?",
    "th": "ขอโทษ ช่วยฉัน / ช่วยนิดหน่อยได้ไหม",
    "en": "Excuse me, can you help me / a little?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Voitko puhua hitaammin?",
    "th": "พูดช้าลงได้ไหม",
    "en": "Can you speak more slowly?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Voitko sanoa uudelleen?",
    "th": "พูดอีกครั้งได้ไหม",
    "en": "Can you say it again?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Miten sanotaan Can you help me suomeksi?",
    "th": "Can you help me พูดเป็นฟินแลนด์ว่าอย่างไร",
    "en": "How do you say Can you help me in Finnish?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Mikä on language course suomeksi?",
    "th": "language course ภาษาฟินแลนด์คืออะไร",
    "en": "What is language course in Finnish?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Mitä sähköposti tarkoittaa?",
    "th": "sähköposti หมายถึงอะไร",
    "en": "What does sähköposti mean?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Anteeksi, en ymmärrä.",
    "th": "ขอโทษ ฉันไม่เข้าใจ",
    "en": "Sorry, I do not understand.",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "En tiedä.",
    "th": "ฉันไม่รู้",
    "en": "I do not know.",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Kiitos avusta!",
    "th": "ขอบคุณที่ช่วย!",
    "en": "Thank you for your help!",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Se ei käy.",
    "th": "แบบนั้นไม่ได้ / เวลานั้นไม่สะดวก",
    "en": "That does not work / suit me.",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "Sanotko uudelleen?",
    "th": "พูดอีกครั้งได้ไหม",
    "en": "Will you say it again?",
    "category": "Help phrases",
    "page": 64
  },
  {
    "fi": "ampua",
    "th": "ยิง",
    "en": "shoot",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "antaa",
    "th": "ให้",
    "en": "give",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "hiihtää",
    "th": "เล่นสกีทางราบ",
    "en": "cross-country ski",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "hyppiä",
    "th": "กระโดดซ้ำ ๆ",
    "en": "jump / hop repeatedly",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "jakaa",
    "th": "แบ่ง / แจก",
    "en": "divide / distribute",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "kertoa",
    "th": "บอก / เล่า",
    "en": "tell",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "kirjoittaa",
    "th": "เขียน",
    "en": "write",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "kylpeä",
    "th": "อาบน้ำในอ่าง",
    "en": "bathe",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "leipoa",
    "th": "อบขนม",
    "en": "bake",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "lentää",
    "th": "บิน",
    "en": "fly",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "lukea",
    "th": "อ่าน",
    "en": "read",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "lähteä",
    "th": "ออกเดินทาง / ออกไป",
    "en": "leave / depart",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "löytää",
    "th": "หาเจอ",
    "en": "find",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "näyttää",
    "th": "แสดง / ให้ดู",
    "en": "show",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "onkia",
    "th": "ตกปลา (ใช้เบ็ด)",
    "en": "fish with a rod",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "oppia",
    "th": "เรียนรู้",
    "en": "learn",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "ottaa",
    "th": "หยิบ / เอา",
    "en": "take",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "piirtää",
    "th": "วาด",
    "en": "draw",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "rakentaa",
    "th": "สร้าง",
    "en": "build",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "ymmärtää",
    "th": "เข้าใจ",
    "en": "understand",
    "category": "Verbs",
    "page": 80
  },
  {
    "fi": "t-paita",
    "th": "เสื้อยืด",
    "en": "T-shirt",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "paita",
    "th": "เสื้อ",
    "en": "shirt",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "villapusero",
    "th": "เสื้อกันหนาวไหมพรม",
    "en": "woollen sweater",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "takki",
    "th": "เสื้อแจ็กเก็ต / เสื้อโค้ต",
    "en": "jacket / coat",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "housut",
    "th": "กางเกงขายาว",
    "en": "trousers",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "farkut",
    "th": "กางเกงยีนส์",
    "en": "jeans",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "hame",
    "th": "กระโปรง",
    "en": "skirt",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "mekko",
    "th": "ชุดเดรส",
    "en": "dress",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "puku",
    "th": "ชุดสูท",
    "en": "suit",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "uimapuku",
    "th": "ชุดว่ายน้ำ",
    "en": "swimsuit",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "uimahousut",
    "th": "กางเกงว่ายน้ำ",
    "en": "swimming trunks",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "sukat",
    "th": "ถุงเท้า",
    "en": "socks",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "shortsit",
    "th": "กางเกงขาสั้น",
    "en": "shorts",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "kengät",
    "th": "รองเท้า",
    "en": "shoes",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "saappaat",
    "th": "รองเท้าบูต",
    "en": "boots",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "lenkkarit",
    "th": "รองเท้าผ้าใบ / รองเท้าวิ่ง",
    "en": "trainers / sneakers",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "lenkkitossut",
    "th": "รองเท้าวิ่ง (คำพ้อง lenkkarit)",
    "en": "running shoes (synonym of lenkkarit)",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "alusvaatteet",
    "th": "ชุดชั้นใน (รวม)",
    "en": "underwear (collective)",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "rintaliivit",
    "th": "เสื้อชั้นใน",
    "en": "bra",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "alushousut",
    "th": "กางเกงชั้นใน",
    "en": "underpants",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "aluspaita",
    "th": "เสื้อชั้นในตัวบน",
    "en": "undershirt",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "kalsarit",
    "th": "กางเกงใน (ภาษาพูด)",
    "en": "underpants (colloquial)",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "huivi",
    "th": "ผ้าโพกศีรษะ / ผ้าพันคอ",
    "en": "headscarf / scarf",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "pipo",
    "th": "หมวกไหมพรม",
    "en": "beanie / knitted cap",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "käsineet",
    "th": "ถุงมือ",
    "en": "gloves",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "solmio",
    "th": "เนกไท",
    "en": "tie",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "vyö",
    "th": "เข็มขัด",
    "en": "belt",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "kaulaliina",
    "th": "ผ้าพันคอ",
    "en": "neck scarf",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "sateenvarjo",
    "th": "ร่ม",
    "en": "umbrella",
    "category": "Clothes",
    "page": 94
  },
  {
    "fi": "villapaita",
    "th": "เสื้อไหมพรม",
    "en": "woollen sweater",
    "category": "Clothes description",
    "page": 94
  },
  {
    "fi": "raidallinen",
    "th": "ลายทาง",
    "en": "striped",
    "category": "Clothes description",
    "page": 94
  },
  {
    "fi": "ruudullinen",
    "th": "ลายตาราง",
    "en": "checked",
    "category": "Clothes description",
    "page": 94
  },
  {
    "fi": "ruskea",
    "th": "สีน้ำตาล",
    "en": "brown",
    "category": "Clothes description",
    "page": 94
  }
];
