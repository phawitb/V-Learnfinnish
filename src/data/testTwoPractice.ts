import type { VocabularyItem } from '../types';
import type { ExamWord } from './testTwoTypes';
import { topicWords } from './testTwoTopics';
import { readingWords } from './testTwoReading';

export type PracticeGroup = { id: string; title: string; items: VocabularyItem[] };
type Row = readonly [string, string];
const source = [...topicWords, ...readingWords];
const lookup = new Map(source.map(word => [word.fi, word]));
const select = (...words: string[]): Row[] => words.map(fi => {
  const word = lookup.get(fi);
  if (!word) throw new Error(`Missing Test 2 vocabulary: ${fi}`);
  return [word.fi, word.en];
});
const from = (words: ExamWord[]): Row[] => words.map(word => [word.fi, word.en]);
const category = (name: string) => from(topicWords.filter(word => word.category === name));
const normalized: Record<string, string> = {
  'On kaunis / hyvä ilma.': 'On kaunis ilma.',
  'Anteeksi, voitko auttaa minua / vähän?': 'Anteeksi, voitko auttaa minua?',
  'Miten sanotaan Can you help me suomeksi?': 'Miten sanotaan “Can you help me” suomeksi?',
  'Mikä on language course suomeksi?': 'Mikä on “language course” suomeksi?',
  'pitää + -sta/-stä': 'pitää',
};
// Stable, word-based IDs keep progress attached to the word when a category is reordered.
function group(id: string, title: string, rows: Row[]): PracticeGroup {
  const unique = new Map(rows.map(([raw, en]) => [normalized[raw] ?? raw, en]));
  return {
    id: `test2-${id}`, title: `Test 2 — ${title}`,
    items: Array.from(unique, ([finnish, english]): VocabularyItem => ({
      id: `test2-${id}:${encodeURIComponent(finnish)}`,
      query: finnish, direction: 'fi-en', finnish, english,
      exampleFinnish: finnish, exampleEnglish: english,
      favorite: false, createdAt: '', reviewCount: 0, correctCount: 0,
      incorrectCount: 0, difficulty: 'new', nextReviewAt: '', mastered: false,
    })),
  };
}

const appearance = select('minkänäköinen', 'tukka', 'silmä', 'silmälasit', 'parta', 'viikset', 'kalju', 'pitkä', 'lyhyt', 'hoikka', 'tukeva', 'suora', 'kihara', 'vaalea', 'tumma', 'kaunis', 'nätti', 'hyvännäköinen', 'komea', 'söpö', 'suloinen');
const personality = select('iloinen', 'onnellinen', 'surullinen', 'puhelias', 'hiljainen', 'ystävällinen', 'epäystävällinen', 'nuori', 'vanha', 'vihainen', 'ujo', 'rauhallinen');
const colors = from(readingWords.filter(word => word.page === 90 && !appearance.some(([fi]) => fi === word.fi)));
const family = select('perhe', 'suku', 'sukulainen', 'isovanhemmat', 'isoäiti', 'mummi', 'mummo', 'isoisä', 'ukki', 'vaari', 'vanhemmat', 'äiti', 'isä', 'täti', 'eno', 'setä', 'serkku', 'sisko', 'veli', 'isosisko', 'pikkusisko', 'isoveli', 'tytär', 'poika', 'tyttö', 'lapsi', 'vauva', 'poikavauva', 'vaimo', 'mies', 'tyttöystävä', 'poikaystävä', 'uusperhe', 'lemmikki');
const relationships = select('naimisissa', 'sinkku', 'kihloissa', 'eronnut', 'leski', 'yksinhuoltaja');
const readingVerbs = select('soittaa', 'nukkua', 'etsiä', 'muuttaa', 'rakastaa', 'pitää + -sta/-stä', 'ajaa pyörällä', 'täytyy');
const connectors = select('jo', 'vielä', 'vasta', 'kuulemma', 'ehkä', 'eikä');
const pronouns = select('meillä on', 'minulla ei ole', 'meillä ei ole', 'heidän', 'heillä on', 'kanssa');
const time = select('puoli kahdeksan', 'kolme kertaa viikossa', 'maanantaisin', 'keskiviikkoisin', 'torstaisin', '4-vuotias', 'syyskuussa');
const assigned = new Set([...appearance, ...personality, ...colors, ...family, ...relationships, ...readingVerbs, ...connectors, ...pronouns, ...time, ...from(topicWords)].map(([fi]) => fi));
const everyday = from(readingWords.filter(word => !assigned.has(word.fi)));

export const testTwoPracticeGroups: PracticeGroup[] = [
  group('appearance', 'Appearance, hair & eyes', [...appearance,
    ['silmät', 'eyes'], ['siniset silmät', 'blue eyes'], ['vihreät silmät', 'green eyes'], ['ruskeat silmät', 'brown eyes'], ['tummat silmät', 'dark eyes'],
    ['musta kihara tukka', 'black curly hair'], ['pitkä vaalea suora tukka', 'long straight fair hair'],
    ['Hän on pitkä ja hoikka.', 'He / she is tall and slim.'], ['Hänellä on kihara tukka.', 'He / she has curly hair.'],
  ]),
  group('personality', 'Personality & feelings', [...personality, ['mukava', 'nice / pleasant'], ['kiva', 'nice / lovely']]),
  group('adjectives', 'Adjectives & opposites', category('Adjectives and quantity')),
  group('colors', 'Colors', colors),
  group('family', 'Family & relatives', [...family, ['pikkuveli', 'younger brother'], ['lapset', 'children'], ['serkut', 'cousins'], ['kaksi siskoa', 'two sisters'], ['kolme lasta', 'three children']]),
  group('relationships', 'Relationships & status', [...relationships,
    ['Olen naimisissa.', 'I am married.'], ['Olen sinkku.', 'I am single.'], ['Olen kihloissa.', 'I am engaged.'], ['Olen eronnut.', 'I am divorced.'],
    ['Olen leski.', 'I am widowed.'], ['Olen yksinhuoltaja.', 'I am a single parent.'],
  ]),
  group('clothes', 'Clothes & accessories', [...category('Clothes'), ...category('Clothes description'),
    ['vaatteet', 'clothes'], ['päällä', 'on the body / being worn'], ['päässä', 'on the head'], ['Mitä sinulla on päällä?', 'What are you wearing?'],
  ]),
  group('weather', 'Weather & temperature', [...category('Weather'),
    ['aurinko', 'sun'], ['lumi', 'snow'], ['räntä', 'sleet'], ['sataa kaatamalla', 'to pour with rain'],
    ['On hyvä ilma.', 'The weather is good.'], ['Millainen sää tänään on?', 'What is the weather like today?'],
    ['Kuinka monta astetta ulkona on?', 'How many degrees is it outside?'], ['kamala', 'awful / terrible'], ['ihana', 'wonderful / lovely'],
  ]),
  group('seasons', 'Seasons', [...category('Seasons'),
    ['talvella', 'in winter'], ['keväällä', 'in spring'], ['kesällä', 'in summer'], ['syksyllä', 'in autumn'],
    ['vuodenaika', 'season'], ['Kesällä on lämmin.', 'It is warm in summer.'], ['Talvella sataa lunta.', 'It snows in winter.'],
  ]),
  group('months', 'Months', category('Months')),
  group('month-forms', 'In each month', category('Months').map(([fi, en]) => [`${fi}ssa`, `in ${en}`])),
  group('daytime', 'Times of day', [...category('Times of day'),
    ['aamulla', 'in the morning'], ['aamupäivällä', 'in the late morning'], ['päivällä', 'in the daytime'], ['iltapäivällä', 'in the afternoon'],
    ['illalla', 'in the evening'], ['yöllä', 'at night'], ['aamuyöllä', 'in the early hours before dawn'], ['vuorokausi', 'a 24-hour day'],
  ]),
  group('time', 'Weekdays & time expressions', [...time,
    ['maanantai', 'Monday'], ['tiistai', 'Tuesday'], ['keskiviikko', 'Wednesday'], ['torstai', 'Thursday'], ['perjantai', 'Friday'], ['lauantai', 'Saturday'], ['sunnuntai', 'Sunday'],
    ['maanantaina', 'on Monday'], ['tiistaina', 'on Tuesday'], ['keskiviikkona', 'on Wednesday'], ['torstaina', 'on Thursday'], ['perjantaina', 'on Friday'], ['lauantaina', 'on Saturday'], ['sunnuntaina', 'on Sunday'],
    ['kuukausi', 'month'], ['viikko', 'week'], ['viikonpäivä', 'weekday'], ['vuosi', 'year'], ['syntymäpäivä', 'birthday'], ['kesäyö', 'summer night'],
    ['tänään', 'today'], ['huomenna', 'tomorrow'], ['nyt', 'now'], ['kohta', 'soon'], ['sitten', 'then / afterwards'], ['kello', 'clock / time'],
  ]),
  group('verbs', '20 exam verbs', category('Verbs')),
  group('reading-verbs', 'Everyday verbs', [...readingVerbs,
    ['olla', 'to be'], ['asua', 'to live / reside'], ['puhua', 'to speak'], ['sanoa', 'to say'], ['ajaa', 'to drive'], ['tykätä', 'to like (also common in speech)'],
    ['auttaa', 'to help'], ['katsoa', 'to watch'], ['tietää', 'to know'], ['voida', 'can / to be able to'], ['haluta', 'to want'], ['saada', 'to get / be allowed'],
    ['alkaa', 'to begin'], ['tarkistaa', 'to check'], ['tarkoittaa', 'to mean'], ['ilmoittautua', 'to register'], ['nauttia', 'to enjoy'],
  ]),
  group('everyday', 'Home, work & study', [...everyday,
    ['koti', 'home'], ['työ', 'work'], ['opettaja', 'teacher'], ['nimi', 'name'], ['Suomi', 'Finland'], ['suomi', 'Finnish language'],
    ['Brasilia', 'Brazil'], ['Etelä-Afrikka', 'South Africa'], ['Helsingissä', 'in Helsinki'], ['Espoossa', 'in Espoo'], ['Itä-Helsinki', 'East Helsinki'],
  ]),
  group('phrases', 'Help & conversation', [...category('Help phrases'),
    ['Voitko auttaa vähän?', 'Can you help a little?'], ['Mitä kuuluu?', 'How are you?'], ['Ihan hyvää.', 'Quite well.'], ['Mitä muuta kuuluu?', 'What else is new?'],
    ['Hieno juttu!', 'Great!'], ['Kuulostaa hyvältä!', 'Sounds good!'], ['Terveisiä Hannalle!', 'Give my regards to Hanna!'],
    ['En vielä.', 'Not yet (I).'], ['Ei vielä.', 'Not yet.'], ['Ai niin, totta.', 'Oh yes, that is true.'], ['Aijaa!', 'Oh, really!'], ['Niin varmaan.', 'Probably so.'], ['Moi!', 'Hi!'], ['Moikka!', 'Bye!'],
  ]),
  group('registration', 'Course registration', [
    ['aikuisopisto', 'adult education institute'], ['toimisto', 'office'], ['kurssisihteeri', 'course secretary'], ['taso', 'level'], ['seuraava', 'next'], ['toinen', 'another / second'],
    ['olla tilaa', 'to have space available'], ['hetkinen', 'one moment'], ['henkilötiedot', 'personal details'], ['lomake', 'form'], ['postitoimipaikka', 'postal town'],
    ['kaupunki', 'city'], ['valmis', 'ready / finished'], ['ilmoittautuminen', 'registration'], ['tehty', 'done'], ['lasku', 'bill / invoice'],
    ['sähköposti', 'email'], ['sähköpostitse', 'by email'], ['ensi', 'next (e.g. next week)'], ['kielikurssi', 'language course'], ['hitaammin', 'more slowly'], ['uudelleen', 'again'], ['suomeksi', 'in Finnish'], ['apu', 'help'],
  ]),
  group('connectors', 'Reading connectors', [...connectors,
    ['ja', 'and'], ['mutta', 'but'], ['koska', 'because'], ['että', 'that'], ['myös', 'also'], ['täällä', 'here'], ['siellä', 'there'],
    ['tosi', 'really / very'], ['niin', 'so / like that'], ['varmaan', 'probably'], ['sama', 'same'], ['yhtä hyvin kuin minä', 'as well as me'],
    ['hyvin', 'well'], ['muuta', 'something else'], ['jossa', 'in which / where'], ['siis', 'so / that is'], ['no', 'well (conversation filler)'], ['tänäänkin', 'today too'],
  ]),
  group('questions', 'Question words', [
    ['Kuka?', 'Who?'], ['Ketä?', 'Whom? (partitive)'], ['Mikä?', 'What? (nominative)'], ['Mitä?', 'What? (partitive)'], ['Millainen?', 'What kind?'],
    ['Minkänäköinen?', 'What does someone look like?'], ['Minkävärinen?', 'What colour?'], ['Milloin?', 'When?'], ['Missä?', 'Where?'], ['Miten?', 'How?'],
    ['Kuinka monta?', 'How many?'], ['Kenen?', 'Whose?'], ['Kenellä?', 'Who has?'], ['Mistä sinä pidät?', 'What do you like?'],
  ]),
  group('pronouns', 'Pronouns & possession', [...pronouns,
    ['minä', 'I'], ['sinä', 'you (singular)'], ['hän', 'he / she'], ['me', 'we'], ['te', 'you (plural)'], ['he', 'they'],
    ['minun', 'my'], ['sinun', 'your (singular)'], ['hänen', 'his / her'], ['meidän', 'our'], ['teidän', 'your (plural)'],
    ['minua', 'me (partitive)'], ['sinua', 'you (singular partitive)'], ['häntä', 'him / her (partitive)'], ['meitä', 'us (partitive)'], ['teitä', 'you (plural partitive)'], ['heitä', 'them (partitive)'],
    ['minulla on', 'I have'], ['sinulla on', 'you have (singular)'], ['hänellä on', 'he / she has'], ['teillä on', 'you have (plural)'],
    ['Minulla on nälkä.', 'I am hungry.'], ['Minulla on jano.', 'I am thirsty.'], ['Minulla on kiire.', 'I am in a hurry.'], ['Minulla on kuuma.', 'I feel hot.'], ['Minulla on kylmä.', 'I feel cold.'],
  ]),
  group('grammar-vocab', 'Grammar vocabulary & quantities', [
    ['kirja', 'book'], ['bussi', 'bus'], ['maa', 'country / land'], ['museo', 'museum'], ['puhelin', 'telephone'], ['kirje', 'letter'], ['vene', 'boat'], ['osoite', 'address'],
    ['tietokone', 'computer'], ['televisio', 'television'], ['kitara', 'guitar'], ['kissa', 'cat'], ['jäätelö', 'ice cream'], ['vaniljajäätelö', 'vanilla ice cream'], ['mansikkajäätelö', 'strawberry ice cream'],
    ['maito', 'milk'], ['sokeri', 'sugar'], ['kilo', 'kilogram'], ['testi', 'test'], ['englanti', 'English language'], ['saksa', 'German language'], ['italia', 'Italian language'],
    ['nolla', 'zero'], ['yksi', 'one'], ['kaksi', 'two'], ['kolme', 'three'], ['neljä', 'four'], ['viisi', 'five'], ['kuusi', 'six'], ['seitsemän', 'seven'], ['kahdeksan', 'eight'], ['yhdeksän', 'nine'], ['kymmenen', 'ten'],
    ['monta', 'many'], ['pari', 'a couple'], ['puoli', 'half'],
  ]),
];
