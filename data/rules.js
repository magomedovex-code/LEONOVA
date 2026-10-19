/* Spickzettel – one entry per rule. Every question has a "rule" field pointing here. */
window.RULES = {
  /* ================= WORLD 1: ADJECTIVES & ADVERBS ================= */
  'adj-vs-adv': {
    world: 'adj-adv', title: 'Adjective or adverb?',
    form: 'ADJECTIVE + noun  ·  verb + ADVERB',
    use: 'An adjective describes a noun (what is it like?). An adverb describes a verb, an adjective or another adverb (how? how much?).',
    de: 'Adjektiv beschreibt ein Nomen, Adverb beschreibt ein Verb – „wie macht man etwas?“',
    signal: 'Ask: Who/what is described? A thing/person → adjective. An action → adverb.',
    ex: ['She is a careful driver. (adjective → driver)', 'She drives carefully. (adverb → drives)', 'It was extremely cold. (adverb → cold)']
  },
  'adverb-formation': {
    world: 'adj-adv', title: 'Forming adverbs',
    form: 'adj + -ly · -y → -ily · -le → -ly · -ic → -ically',
    use: 'Most adverbs of manner = adjective + -ly.',
    de: 'Adverb = Adjektiv + -ly (mit Rechtschreibregeln)',
    signal: 'quick → quickly · happy → happily · terrible → terribly · basic → basically · full → fully · true → truly',
    ex: ['easy → easily', 'gentle → gently', 'dramatic → dramatically', 'careful → carefully (double l!)'],
    tip: 'public → publicly (exception). friendly, lovely, lonely, silly, ugly are ADJECTIVES → use "in a friendly way".'
  },
  'irregular-adverbs': {
    world: 'adj-adv', title: 'Irregular adverbs',
    form: 'good → well · fast → fast · hard → hard · late → late · early → early · straight → straight',
    use: 'Some adverbs do not take -ly. "good" is an adjective, "well" is the adverb.',
    de: 'good (gut, Adjektiv) – well (gut, Adverb). Kein "fastly", kein "hardly" für „fleißig“!',
    signal: 'He plays well. She works hard. They arrived late. He runs fast.',
    ex: ['She is a good singer. → She sings well.', 'He is a fast runner. → He runs fast.', 'I feel well. (= healthy, not ill)'],
    tip: '"well" can also be an adjective meaning healthy: "I am not well today."'
  },
  'tricky-adverbs': {
    world: 'adj-adv', title: 'hard/hardly · late/lately · near/nearly · high/highly',
    form: 'hard = fleißig/hart · hardly = kaum · late = spät · lately = in letzter Zeit · near = nahe · nearly = fast · high = hoch · highly = sehr/äußerst',
    use: 'These pairs have DIFFERENT meanings – the -ly form is not just the adverb!',
    de: 'Achtung: hardly heißt kaum, lately heißt in letzter Zeit, nearly heißt beinahe.',
    signal: 'hardly ever, hardly any · lately (+ present perfect) · nearly missed · highly recommended / highly unlikely',
    ex: ['She works hard. ≠ She hardly works.', 'I got up late. ≠ I have been tired lately.', 'The ball flew high. · It is highly unlikely.']
  },
  'linking-verbs': {
    world: 'adj-adv', title: 'Linking verbs + adjective',
    form: 'be / look / feel / smell / taste / sound / seem / appear / become / get / stay / remain + ADJECTIVE',
    use: 'Linking verbs describe the subject (what it is like), not an action – so they take an ADJECTIVE.',
    de: 'Nach Sinnes-/Zustandsverben steht das Adjektiv: Das Essen schmeckt gut = tastes good.',
    signal: 'look, feel, smell, taste, sound, seem, become',
    ex: ['The soup smells wonderful.', 'You look tired.', 'That sounds great!', 'She became angry.'],
    tip: 'If the verb is a real action, use an adverb: She looked carefully at the photo. (looked = an action)'
  },
  'intensifiers': {
    world: 'adj-adv', title: 'very · absolutely · too · enough',
    form: 'very + normal adj · absolutely + extreme adj · too + adj (+ to V1) · adj + enough · enough + noun',
    use: 'very/really with normal adjectives (very cold); absolutely/totally with extreme adjectives (absolutely freezing). too = more than OK (negative). enough = sufficient – AFTER adjectives, BEFORE nouns.',
    de: 'too = zu (negativ) · enough steht NACH dem Adjektiv: old enough',
    signal: 'extreme adjectives: freezing, boiling, starving, exhausted, furious, enormous, tiny, terrified, delicious, brilliant, awful, fantastic',
    ex: ['It is very cold. / It is absolutely freezing.', 'The tea is too hot to drink.', 'She is old enough to drive.', 'We have enough time.'],
    tip: 'NOT "very freezing", NOT "absolutely cold", NOT "enough old".'
  },
  'adverb-position': {
    world: 'adj-adv', title: 'Position of adverbs',
    form: 'S + always + V · S + be + always · S + have + already + V3 · … yet. (end) · Manner – Place – Time',
    use: 'Frequency adverbs (always, usually, often, sometimes, never) go BEFORE the main verb but AFTER "be". already goes between have and V3. yet goes at the END (questions & negatives). At the end of a sentence: how – where – when.',
    de: 'Häufigkeitsadverb vor dem Vollverb, aber nach "be". Am Satzende: Art – Ort – Zeit.',
    signal: 'always, usually, often, sometimes, rarely, never, already, yet, still, just',
    ex: ['I always walk to school.', 'She is never late.', 'We have already finished.', 'Have you finished yet?', 'He played well at the concert last night.'],
    tip: 'Never put an adverb between the verb and its object: NOT "I like very much music" → "I like music very much".'
  },
  'comparison': {
    world: 'adj-adv', title: 'Comparison of adjectives',
    form: 'short: -er / the -est · long (2+ syll.): more / the most · good-better-best · bad-worse-worst · far-further-furthest · many/much-more-most · little-less-least',
    use: 'Comparative + than to compare two things; the + superlative for the top of a group. as + adj + as = equal.',
    de: 'Steigerung: kurz -er/-est, lang more/most. Vergleich mit "than", nicht "then"!',
    signal: 'than · the … in/of · as … as · not as … as',
    ex: ['big → bigger → the biggest (double consonant)', 'happy → happier → the happiest (y → i)', 'interesting → more interesting → the most interesting', 'She is as tall as her brother.'],
    tip: 'Two-syllable adjectives ending in -y take -er/-est: easy → easier, funny → funniest.'
  },
  'adverb-comparison': {
    world: 'adj-adv', title: 'Comparison of adverbs',
    form: '-ly adverbs: more / most carefully · fast-faster-fastest · hard-harder-hardest · well-better-best · badly-worse-worst · early-earlier-earliest',
    use: 'Adverbs ending in -ly use more/most. One-syllable adverbs and early take -er/-est.',
    de: 'Adverbien mit -ly: more/most.',
    signal: 'than · the … of all',
    ex: ['She speaks more quietly than her sister.', 'He runs faster than me.', 'Who sang best?']
  },
  'word-formation': {
    world: 'adj-adv', title: 'Word formation',
    form: 'noun + -ous/-ful/-less/-y/-al/-ic → adjective · adjective + -ly → adverb · un-/im-/in-/dis- → opposite',
    use: 'Change the word in brackets so that it fits the gap (noun, adjective or adverb).',
    de: 'Wortbildung: Welche Wortart brauche ich? Nomen, Adjektiv oder Adverb?',
    signal: 'danger → dangerous · luck → lucky → luckily · care → careful/careless · success → successful · friend → friendly/friendship · comfort → comfortable · patience → patient',
    ex: ['It is a dangerous road. (danger)', 'Luckily, nobody was hurt. (luck)', 'He was very unhappy. (happy)'],
    tip: 'Before a noun → adjective. Describing a verb or the whole sentence → adverb.'
  },

  /* ================= WORLD 2: PAST TENSES ================= */
  'past-simple': {
    world: 'past', title: 'Past simple',
    form: 'S + V2 (regular: V1 + -ed)',
    use: 'Finished actions at a definite time in the past; a series of actions one after another.',
    de: 'Abgeschlossene Handlung in der Vergangenheit (gestern, letzte Woche …).',
    signal: 'yesterday, last week/year, … ago, in 2019, when I was a child, then, after that',
    ex: ['I visited my grandma last Sunday.', 'She wrote a letter yesterday.', 'We got up, had breakfast and left.'],
    tip: 'Spelling: stop → stopped, study → studied, plan → planned, travel → travelled (BrE).'
  },
  'past-simple-neg': {
    world: 'past', title: 'Past simple: negatives & questions',
    form: 'S + didn\'t + V1 · Did + S + V1? · Wh- + did + S + V1?',
    use: 'After did / didn\'t the main verb is ALWAYS V1 (infinitive) – the past is already in "did".',
    de: 'Nach did/didn\'t immer Grundform (V1)!',
    signal: 'Did … ? · didn\'t · Where/When/Why did …?',
    ex: ['I didn\'t go to the party.', 'Did you see the film?', 'Where did they meet?'],
    tip: 'Subject questions have no "did": Who called you? What happened? · be: wasn\'t / weren\'t, Was she …?'
  },
  'past-be': {
    world: 'past', title: 'Past of "be": was / were',
    form: 'I/he/she/it was · you/we/they were · wasn\'t/weren\'t · Was/Were + S …?',
    use: '"be" does not use did in questions and negatives.',
    de: 'was (ich/er/sie/es) – were (du/wir/ihr/sie)',
    signal: '',
    ex: ['We were tired.', 'Was he at home?', 'They weren\'t happy.']
  },
  'past-continuous': {
    world: 'past', title: 'Past continuous',
    form: 'S + was/were + V-ing',
    use: 'An action in progress at a certain time in the past; a background action that is interrupted by a shorter one (past simple); two actions at the same time (while).',
    de: 'Handlung, die gerade im Verlauf war (gerade dabei).',
    signal: 'while, as, at 8 o\'clock yesterday, at that moment, all evening',
    ex: ['At 8 pm I was doing my homework.', 'I was having a shower when the phone rang.', 'While Mum was cooking, Dad was reading.'],
    tip: 'Stative verbs (know, like, want, believe, own, need) are not used in the continuous.'
  },
  'when-while': {
    world: 'past', title: 'when vs while',
    form: 'while + past continuous (long action) · when + past simple (short action)',
    use: 'while introduces the longer background action; when introduces the short action that interrupts it.',
    de: 'while = während (lange Handlung) · when = als (kurze Handlung)',
    signal: 'while / when / as',
    ex: ['While I was walking home, I met Tom.', 'I was walking home when I met Tom.', 'When the teacher came in, everybody stopped talking.']
  },
  'past-perfect': {
    world: 'past', title: 'Past perfect',
    form: 'S + had + V3',
    use: 'The earlier of two past actions ("past before the past").',
    de: 'Vorvergangenheit: was VORHER passiert war.',
    signal: 'before, after, by the time, already, just, never … before, when (= after)',
    ex: ['When we arrived, the film had already started.', 'She had never seen the sea before.', 'After he had finished his homework, he went out.'],
    tip: 'had + V3 for all persons: I had gone, they had gone.'
  },
  'past-perfect-cont': {
    world: 'past', title: 'Past perfect continuous',
    form: 'S + had been + V-ing',
    use: 'An action that had been going on for some time before another past action/moment – often with a visible result.',
    de: 'Wie lange etwas schon angedauert hatte, bevor etwas anderes passierte.',
    signal: 'for, since, all day, how long … ?',
    ex: ['She was tired because she had been running.', 'They had been waiting for an hour when the bus finally came.', 'How long had you been living there?']
  },
  'used-to': {
    world: 'past', title: 'used to / would',
    form: 'S + used to + V1 · S + didn\'t use to + V1 · Did + S + use to + V1? · S + would + V1',
    use: 'Past habits and states that are not true any more. would only for repeated ACTIONS (not states!).',
    de: 'früher (aber jetzt nicht mehr) – would nur für wiederholte Handlungen, nicht für Zustände.',
    signal: 'when I was a child, in the past, as a kid, every summer',
    ex: ['I used to live in Graz.', 'We would play outside every afternoon.', 'I didn\'t use to like fish.', 'Did you use to have long hair?'],
    tip: 'States (have, be, like, live, know) → only used to: "I used to have a dog" (NOT "I would have a dog").'
  },
  'irregular-verbs': {
    world: 'past', title: 'Irregular verbs',
    form: 'V1 – V2 – V3 (go – went – gone)',
    use: 'V2 for the past simple, V3 for the past perfect (had + V3) and present perfect (have + V3).',
    de: 'Unregelmäßige Verben auswendig lernen – keine -ed-Endung!',
    signal: '',
    ex: ['write – wrote – written', 'bring – brought – brought', 'think – thought – thought', 'catch – caught – caught'],
    tip: 'BrE allows learnt, dreamt, burnt, spelt, smelt as well as -ed. got (BrE) / gotten (AmE).'
  },
  'past-questions': {
    world: 'past', title: 'Forming questions',
    form: 'Did + S + V1? · Was/Were + S + V-ing? · Had + S + V3? · Had + S + been + V-ing?',
    use: 'The auxiliary (did, was/were, had) goes before the subject.',
    de: 'Fragen: Hilfsverb vor das Subjekt.',
    signal: 'Who, What, Where, When, Why, How long …',
    ex: ['What were you doing at 9?', 'Had you ever been there before?', 'Why did she leave early?']
  },
  'past-signal': {
    world: 'past', title: 'Signal words – which past tense?',
    form: 'ago/yesterday/last → past simple · while/at that moment → past continuous · already/by the time/before → past perfect · for/since + earlier → past perfect continuous',
    use: 'Signal words help you choose the tense.',
    de: 'Signalwörter zeigen die Zeitform.',
    signal: 'ago, last, yesterday · while, as · by the time, before, after, already · for, since, all day',
    ex: ['Two years ago we moved.', 'By the time I got there, she had left.', 'He had been working there for ten years when he retired.']
  },

  /* ================= WORLD 3: LINKING WORDS, PREPOSITIONS, COLLOCATIONS ================= */
  'contrast': {
    world: 'linking', title: 'although · despite · however',
    form: 'although/though/even though + S + V · despite/in spite of + noun / V-ing / the fact that · S + V. However, S + V.',
    use: 'All three show contrast (Gegensatz). The difference is the grammar that follows.',
    de: 'obwohl (+ Satz) · trotz (+ Nomen/-ing) · jedoch (neuer Satz, mit Komma)',
    signal: 'although it rained · despite the rain · despite feeling ill · However, …',
    ex: ['Although it was raining, we went out.', 'Despite the rain, we went out.', 'In spite of being tired, she finished her essay.', 'It was raining. However, we went out.'],
    tip: 'NOT "despite of"! NOT "although of"! "in spite of" has three words.'
  },
  'cause-result': {
    world: 'linking', title: 'because · because of · so · therefore',
    form: 'because + S + V · because of + noun · S + V, so + S + V · Therefore, …',
    use: 'because gives the reason, so gives the result.',
    de: 'weil (+ Satz) · wegen (+ Nomen) · also/deshalb',
    signal: 'because I was ill · because of the rain · so we stayed at home',
    ex: ['We stayed in because it was raining.', 'We stayed in because of the rain.', 'It was raining, so we stayed in.', 'Due to the strike, the trains were late.']
  },
  'purpose': {
    world: 'linking', title: 'to · in order to · so that',
    form: 'in order to / to + V1 · so that + S + can/could/would + V1 · in order not to + V1',
    use: 'Purpose (Zweck): why someone does something.',
    de: 'um … zu · damit',
    signal: 'in order to learn · so that I could learn',
    ex: ['She studied hard in order to pass the test.', 'I left early so that I wouldn\'t miss the bus.', 'He whispered in order not to wake the baby.'],
    tip: 'NOT "for to" and NOT "for + V1" for purpose.'
  },
  'condition': {
    world: 'linking', title: 'if · unless',
    form: 'unless = if … not · unless + positive verb',
    use: 'unless means "except if".',
    de: 'unless = wenn … nicht / außer wenn',
    signal: '',
    ex: ['You will fail unless you study. (= if you don\'t study)', 'Unless it rains, we\'ll have a picnic.'],
    tip: 'No double negative: NOT "unless you don\'t study".'
  },
  'pairs': {
    world: 'linking', title: 'both … and · either … or · neither … nor · not only … but also',
    form: 'both A and B (plural verb) · either A or B · neither A nor B (positive verb!) · not only A but also B',
    use: 'Paired linking words connect two things.',
    de: 'sowohl … als auch · entweder … oder · weder … noch',
    signal: '',
    ex: ['Both my brother and my sister are older than me.', 'You can either call or text me.', 'Neither Tom nor Anna was at the party.'],
    tip: 'neither … nor already is negative: NOT "Neither Tom nor Anna wasn\'t …"'
  },
  'sequence-addition': {
    world: 'linking', title: 'Adding & ordering ideas',
    form: 'in addition, moreover, furthermore, what is more, as well as · first(ly), then, after that, finally · on the one hand … on the other hand',
    use: 'Used in essays and formal letters to structure ideas.',
    de: 'außerdem · zuerst … schließlich · einerseits … andererseits',
    signal: '',
    ex: ['In addition, I would like to ask about the accommodation.', 'On the one hand, siblings can be annoying. On the other hand, they are great company.']
  },
  'prep-time': {
    world: 'linking', title: 'at / on / in (time)',
    form: 'AT + clock time, night, the weekend (BrE), Christmas, the moment · ON + days, dates, Monday morning, my birthday · IN + months, years, seasons, centuries, the morning/afternoon/evening',
    use: 'at = exact point, on = day, in = longer period.',
    de: 'at 7 o\'clock · on Monday · in July',
    signal: 'No preposition before: last, next, this, every, yesterday, tomorrow',
    ex: ['at 6 o\'clock, at night, at the weekend', 'on Friday, on 3 May, on Christmas Day', 'in June, in 2010, in the summer, in the evening'],
    tip: 'in the morning BUT on Monday morning.'
  },
  'prep-place': {
    world: 'linking', title: 'at / on / in (place)',
    form: 'AT + point (at the bus stop, at school, at home, at the door) · ON + surface/line (on the wall, on the bus, on the left, on page 5) · IN + inside/area (in the room, in Vienna, in bed, in a car)',
    use: 'at = a point, on = a surface, in = inside a space.',
    de: 'at school · on the bus · in the car',
    signal: '',
    ex: ['She is at school.', 'The picture is on the wall.', 'I live in Linz.', 'We met on the train.']
  },
  'for-since': {
    world: 'linking', title: 'for · since · during · ago',
    form: 'FOR + period (for two years) · SINCE + starting point (since 2020, since Monday) · DURING + noun (during the holidays) · period + AGO',
    use: 'for = how long; since = from when; during = at some time within a period / the whole of it; ago = back from now.',
    de: 'for = seit/für (Zeitraum) · since = seit (Zeitpunkt) · during = während (+ Nomen)',
    signal: 'during + noun, while + clause',
    ex: ['I have known her for five years.', 'I have known her since 2019.', 'He fell asleep during the film.', 'We met three years ago.'],
    tip: 'during + NOUN, while + S + V: during the lesson / while we were having the lesson.'
  },
  'by-until': {
    world: 'linking', title: 'by vs until',
    form: 'BY = not later than (deadline) · UNTIL/TILL = up to that time (continuing action)',
    use: 'by + deadline; until + an action that continues up to a time.',
    de: 'by = bis spätestens · until = bis (andauernd)',
    signal: '',
    ex: ['Please hand in your essay by Friday.', 'I waited until 6 o\'clock.', 'We stayed until the end.']
  },
  'adj-prep': {
    world: 'linking', title: 'Adjective + preposition',
    form: 'interested IN · good/bad AT · afraid/scared/proud/tired/fond OF · keen ON · different FROM · famous/responsible FOR · angry/annoyed WITH sb (ABOUT sth) · worried/excited/upset ABOUT · married/similar TO · bored WITH · nice/kind TO',
    use: 'Learn adjectives together with their preposition.',
    de: 'Adjektiv + feste Präposition auswendig lernen.',
    signal: '',
    ex: ['I am interested in music.', 'She is good at maths.', 'He is afraid of spiders.', 'They are proud of their son.']
  },
  'verb-prep': {
    world: 'linking', title: 'Verb + preposition',
    form: 'depend ON · rely ON · listen TO · belong TO · apologise FOR · wait FOR · look FOR · look AFTER · think ABOUT/OF · dream OF/ABOUT · believe IN · succeed IN · agree WITH sb · argue WITH sb ABOUT sth · laugh AT · pay FOR · worry ABOUT · care ABOUT · complain ABOUT · insist ON · concentrate ON',
    use: 'Many verbs need a fixed preposition before an object.',
    de: 'Verb + feste Präposition',
    signal: '',
    ex: ['It depends on the weather.', 'Listen to me!', 'I agree with you.', 'She apologised for being late.'],
    tip: 'NO preposition after: discuss, enter, marry, call, phone, reach, answer, explain sth to sb.'
  },
  'collocations-make-do': {
    world: 'linking', title: 'make vs do',
    form: 'MAKE: a mistake, a decision, a cake, friends, money, noise, a phone call, an effort, progress, a plan, an excuse, sure, the bed, a promise, a suggestion · DO: homework, the housework, the chores, the washing-up, the shopping, a job, your best, exercise, a favour, a course, damage, business, research',
    use: 'make = create/produce something; do = activities, work, tasks.',
    de: 'make = herstellen/erschaffen · do = Tätigkeit/Arbeit',
    signal: '',
    ex: ['I made a mistake.', 'Can you do me a favour?', 'We do the chores on Saturday.', 'She made a lot of friends.']
  },
  'collocations-other': {
    world: 'linking', title: 'take · have · get · keep · pay',
    form: 'TAKE: a photo, a break, an exam/test, a seat, care of, part in, place, time, a risk · HAVE: a party, fun, a good time, a shower, breakfast, an argument, a look · GET: married, divorced, a job, lost, ready, better, home · KEEP: a secret, a promise, in touch, calm, a diary · PAY: attention, a visit, a compliment, the bill',
    use: 'Fixed verb + noun combinations (collocations).',
    de: 'Feste Wortverbindungen',
    signal: '',
    ex: ['Can I take a photo?', 'We had a great time.', 'They got married last year.', 'Please pay attention!', 'Can you keep a secret?']
  },

  /* ================= WORLD 4: VOCABULARY ================= */
  'vocab-family': {
    world: 'vocab', title: 'Family words',
    form: 'household · only child · sibling · age gap · parental home · adult · single-parent family · divorce · separation · stepfamily · stepsibling · half-sibling · relative · start a family · at the age of',
    use: 'Words to talk about different types of families.',
    de: 'Haushalt · Einzelkind · Geschwister · Altersunterschied · Elternhaus · Erwachsene/r · Alleinerzieherfamilie · Scheidung · Trennung · Patchworkfamilie · Stiefgeschwister · Halbgeschwister · Verwandte/r · eine Familie gründen · im Alter von',
    signal: '',
    ex: ['I am an only child, so I have no siblings.', 'There is an age gap of six years between my brother and me.', 'She left her parental home at the age of 19.'],
    tip: 'get divorced (sich scheiden lassen) · a stepsibling has no parent in common with you, a half-sibling shares one parent.'
  },
  'vocab-chores': {
    world: 'vocab', title: 'Housework & responsibilities',
    form: 'do the chores · housework (uncountable) · washing-up · small repairs · childminding · look after · fair share · responsibility',
    use: 'Words for jobs at home.',
    de: 'Hausarbeiten erledigen · Hausarbeit · Abwasch · kleine Reparaturen · Kinderbetreuung · sich kümmern um · gerechter Anteil · Verantwortung',
    signal: '',
    ex: ['Everybody should do their fair share of the housework.', 'I do the washing-up after dinner.', 'My grandma looks after my little sister.'],
    tip: 'housework has no plural: NOT "houseworks". do the washing-up (BrE).'
  },
  'vocab-feelings': {
    world: 'vocab', title: 'Feelings & family relationships',
    form: 'contented · secure · emotion · tension · hatred · secret · judge · argument · let each other down · fall out · make up',
    use: 'Words for feelings and conflicts.',
    de: 'zufrieden · geborgen/sicher · Gefühl · Spannung · Hass · Geheimnis · (be)urteilen · Streit · einander im Stich lassen · sich zerstreiten · sich versöhnen',
    signal: '',
    ex: ['There was a lot of tension at home.', 'My sister and I fell out but we made up the next day.', 'Good friends don\'t let each other down.'],
    tip: 'fall out WITH sb (fell out – fallen out) · make up – made up – made up'
  },
  'vocab-friendship': {
    world: 'vocab', title: 'Friendship',
    form: 'lifelong friendship · clique · bond · have in common · attitude · company · peer · peer group pressure · get along with · get on well (with) · hit it off · treat · respect · bullying · well-being',
    use: 'Words to talk about friends and groups.',
    de: 'lebenslange Freundschaft · Clique · Bindung · gemeinsam haben · Einstellung · Gesellschaft · Gleichaltrige/r · Gruppenzwang · auskommen mit · sich gut verstehen · sich auf Anhieb verstehen · behandeln · Respekt · Mobbing · Wohlbefinden',
    signal: '',
    ex: ['We hit it off immediately.', 'We have a lot in common.', 'I really enjoy her company.', 'Peer group pressure can be hard to resist.']
  },
  'vocab-meeting': {
    world: 'vocab', title: 'Meeting people & staying in contact',
    form: 'stranger · bump into · chance meeting · catch up · keep/stay in touch · meet up · get to know each other better',
    use: 'Words for meeting people.',
    de: 'Fremde/r · zufällig treffen · zufällige Begegnung · sich auf den neuesten Stand bringen · in Kontakt bleiben · sich treffen · einander besser kennenlernen',
    signal: '',
    ex: ['I bumped into my old teacher at the supermarket.', 'Let\'s meet up for coffee and catch up.', 'We have stayed in touch since primary school.']
  },
  'vocab-school': {
    world: 'vocab', title: 'School & education',
    form: 'compulsory · education · primary education · secondary education',
    use: 'Words for the school system.',
    de: 'verpflichtend · Bildung · Volksschulbildung · Sekundarbildung (Mittelschule/AHS)',
    signal: '',
    ex: ['Education is compulsory for nine years in Austria.', 'Primary education starts at the age of six.']
  },
  'phrasal-verbs': {
    world: 'vocab', title: 'Phrasal verbs from Units 1–3',
    form: 'look after · fall out (with) · make up · let sb down · get along (with) · get on (well with) · hit it off · bump into · catch up (with) · keep/stay in touch · meet up (with)',
    use: 'Change the VERB for the tense; the particle stays: bumped into, fell out, made up, let down, got along, hit it off, caught up, kept in touch, met up.',
    de: 'Bei Phrasal Verbs ändert sich nur das Verb: bump into → bumped into',
    signal: '',
    ex: ['Yesterday I bumped into an old friend.', 'We fell out last year but made up at Christmas.', 'I was looking after my brother when you called.'],
    tip: 'Irregular: fall – fell – fallen · make – made · let – let · get – got · hit – hit · catch – caught · keep – kept · meet – met'
  }
};
