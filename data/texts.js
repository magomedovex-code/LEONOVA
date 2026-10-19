/* Language in Use texts (each ___ is one gap, in order) and writing tasks. */
window.TEXTS = [
  {
    id: 'txt-01', title: 'A New Stepbrother', topic: 'Family',
    body: "When I was eleven, my mum ___ (marry) a man called Tom. At first I was ___ (real) worried because Tom had a son, Leo, who was two years older than me. I ___ (never / live) with another boy before, and I didn't want to share my room. The first weeks were ___ (absolute) terrible. We argued ___ everything – the TV, the bathroom, even the last piece of pizza!\n\nThen, one evening while we ___ (wait) for our parents, Leo showed me his guitar. ___ (surprising), he played ___ (incredible) well. We started making music together, and soon we got ___ really well. Now Leo is ___ (good) friend I have.",
    gaps: [
      { a: ['married'], rule: 'past-simple', why: "Past simple: a finished action at a definite time (when I was eleven).", wrong: { 'has married': "A finished time in the past → past simple: married." } },
      { a: ['really'], rule: 'adj-vs-adv', why: "It describes the adjective 'worried' → adverb.", wrong: { real: "Before an adjective you need an adverb → really." } },
      { a: ['had never lived'], rule: 'past-perfect', why: "Before another past situation → past perfect: had never lived.", wrong: { 'never lived': "Earlier than the story → had never lived." } },
      { a: ['absolutely'], rule: 'intensifiers', why: "'terrible' is an extreme adjective → absolutely (adverb).", wrong: { absolute: "Before an adjective → adverb: absolutely.", very: "Extreme adjective → absolutely." } },
      { a: ['about', 'over'], rule: 'verb-prep', why: "argue ABOUT something." },
      { a: ['were waiting'], rule: 'when-while', why: "while + past continuous (long background action).", wrong: { waited: "while + long action → were waiting." } },
      { a: ['surprisingly'], rule: 'word-formation', why: "Sentence adverb: Surprisingly, …", wrong: { surprising: "It describes the whole sentence → adverb: surprisingly." } },
      { a: ['incredibly'], rule: 'adj-vs-adv', why: "Describes the adverb 'well' → adverb: incredibly (-le → -ly).", wrong: { incredible: "Before 'well' you need an adverb → incredibly." } },
      { a: ['on', 'along'], rule: 'vocab-friendship', why: "get on (really) well / get along well." },
      { a: ['the best'], rule: 'comparison', why: "good – better – the best (superlative).", wrong: { best: "Superlative needs 'the': the best.", 'the better': "Superlative: the best." } }
    ]
  },
  {
    id: 'txt-02', title: "Grandma's Farm", topic: 'Family',
    body: "When I was little, I ___ (use to / spend) every summer at my grandma's farm ___ the country. Every morning she would ___ (bake) fresh bread, and the whole house smelled ___ (wonderful). My grandma was a very ___ (patience) woman. She taught me how to feed the chickens and how to ___ (make or do) a cake.\n\nOne day, while I ___ (play) in the garden, I fell and hurt my knee. Grandma didn't panic. She ___ (calm) put a plaster on it and gave me a big piece of cake. ___ (sad), she died two years ago, but I still think ___ her every time I smell fresh bread.",
    gaps: [
      { a: ['used to spend'], rule: 'used-to', why: "Past habit that is over: used to + V1.", wrong: { 'use to spend': "Positive sentence: used to (with -d)." } },
      { a: ['in'], rule: 'prep-place', why: "Fixed phrase: in the country (auf dem Land)." },
      { a: ['bake'], rule: 'used-to', why: "would + V1 for repeated past actions.", wrong: { baked: "would + V1: bake." } },
      { a: ['wonderful'], rule: 'linking-verbs', why: "'smell' is a linking verb → adjective.", wrong: { wonderfully: "After 'smell' (linking verb) you need an adjective." } },
      { a: ['patient'], rule: 'word-formation', why: "Before the noun 'woman' → adjective: patient." },
      { a: ['make', 'bake'], rule: 'collocations-make-do', why: "make a cake (create something).", wrong: { do: "You create a cake → make." } },
      { a: ['was playing'], rule: 'when-while', why: "while + past continuous.", wrong: { played: "while + long action → was playing." } },
      { a: ['calmly'], rule: 'adj-vs-adv', why: "How did she put it on? → adverb: calmly.", wrong: { calm: "It describes the action 'put' → adverb: calmly." } },
      { a: ['sadly'], rule: 'word-formation', why: "Sentence adverb: Sadly, … (leider).", wrong: { sad: "Sentence adverb → sadly." } },
      { a: ['of', 'about'], rule: 'verb-prep', why: "think OF / ABOUT somebody." }
    ]
  },
  {
    id: 'txt-03', title: 'Best Friends Forever?', topic: 'Friendship',
    body: "Mia and I ___ (meet) on our first day at secondary school. We hit it off immediately because we had so much in ___. Last year, however, we ___ (fall) out. Mia had told one of my secrets to the whole class, and I felt ___ (terrible). For two weeks we ___ (not / speak) to each other.\n\nThen one day I ___ (bump) into her at the bus stop. She looked really ___ (sad), and she apologised ___ what she had done. We talked for hours, and ___ (final) we made up. Our friendship is ___ (strong) now than it was before.",
    gaps: [
      { a: ['met'], rule: 'past-simple', why: "meet – met – met. Past simple (a finished event).", wrong: { meeted: "meet is irregular: met." } },
      { a: ['common'], rule: 'vocab-friendship', why: "have (so much) in common." },
      { a: ['fell'], rule: 'phrasal-verbs', why: "fall out → past simple: fell out.", wrong: { felt: "felt = past of feel. fall → fell.", fallen: "fallen = V3. Past simple → fell." } },
      { a: ['terrible', 'awful'], rule: 'linking-verbs', why: "'feel' is a linking verb → adjective.", wrong: { terribly: "After 'feel' (linking verb) → adjective." } },
      { a: ["didn't speak", 'did not speak', "didn't talk", "hadn't spoken"], rule: 'past-simple-neg', why: "didn't + V1.", wrong: { "didn't spoke": "After didn't → V1: speak." } },
      { a: ['bumped'], rule: 'phrasal-verbs', why: "bump into → past simple: bumped into." },
      { a: ['sad'], rule: 'linking-verbs', why: "'look' (= seem) → adjective.", wrong: { sadly: "After 'look' (seem) → adjective." } },
      { a: ['for'], rule: 'verb-prep', why: "apologise FOR something." },
      { a: ['finally'], rule: 'adverb-formation', why: "Adverb: final → finally." },
      { a: ['stronger'], rule: 'comparison', why: "Comparative + than: strong → stronger.", wrong: { 'more strong': "Short adjective → stronger." } }
    ]
  },
  {
    id: 'txt-04', title: "Dad's School Days", topic: 'School',
    body: "In Austria, school is compulsory ___ nine years. My dad often tells me about his own school days in the 1990s. Back then, pupils ___ (not / have) mobile phones, and lessons started ___ 7:45. His teachers were very ___ (strict), and nobody dared to talk ___ (loud) in class.\n\nOne day, while his teacher ___ (write) on the board, my dad threw a paper plane across the room. ___ (lucky) for him, the teacher didn't see it. But by the end of the lesson, his best friend ___ (already / tell) everybody about it! My dad says he learned a lot at school, ___ he didn't always enjoy it.",
    gaps: [
      { a: ['for'], rule: 'for-since', why: "for + period (nine years).", wrong: { since: "A period → for." } },
      { a: ["didn't have", 'did not have'], rule: 'past-simple-neg', why: "didn't + V1 (have).", wrong: { "didn't had": "After didn't → V1: have.", "hadn't": "'have' (besitzen) → didn't have." } },
      { a: ['at'], rule: 'prep-time', why: "at + clock time." },
      { a: ['strict'], rule: 'adj-vs-adv', why: "'were' (be) + adjective.", wrong: { strictly: "After 'be' → adjective." } },
      { a: ['loudly', 'loud'], rule: 'adj-vs-adv', why: "How did they talk? → adverb: loudly.", wrong: {} },
      { a: ['was writing'], rule: 'when-while', why: "while + past continuous.", wrong: { wrote: "while + long action → was writing." } },
      { a: ['luckily'], rule: 'word-formation', why: "Sentence adverb: Luckily, …", wrong: { lucky: "Sentence adverb → luckily." } },
      { a: ['had already told'], rule: 'past-perfect', why: "'by the end of the lesson' → past perfect.", wrong: { 'already told': "'by the end …' → had already told." } },
      { a: ['although', 'though', 'but', 'even though'], rule: 'contrast', why: "Contrast + clause → although / but.", wrong: { despite: "'despite' + noun/-ing. A clause follows → although." } }
    ]
  },
  {
    id: 'txt-05', title: 'When Parents Split Up', topic: 'Family',
    body: "My parents got ___ (divorce) when I was eight. ___ (natural), I was very upset, and there was a lot of ___ (tense) at home. I ___ (not / understand) why they couldn't stay together. My mum and I moved to a small flat, ___ I saw my dad every weekend.\n\n___ (Despite / Although) the difficult situation, my parents never stopped ___ (care) about me. They always treated each other ___ (polite) when I was around. Today I am fifteen, and I get ___ well with both of them. I have learned that a family can be ___ (happy) even when the parents live apart.",
    gaps: [
      { a: ['divorced'], rule: 'vocab-family', why: "get divorced = sich scheiden lassen.", wrong: { divorce: "get + -ed form: got divorced." } },
      { a: ['naturally'], rule: 'word-formation', why: "Sentence adverb: Naturally, …", wrong: { natural: "Sentence adverb → naturally." } },
      { a: ['tension'], rule: 'vocab-feelings', why: "After 'a lot of' → noun: tense → tension." },
      { a: ["didn't understand", 'did not understand', "couldn't understand"], rule: 'past-simple-neg', why: "didn't + V1.", wrong: { "didn't understood": "After didn't → V1." } },
      { a: ['and', 'but'], rule: 'contrast', why: "Two clauses connected with and/but." },
      { a: ['despite'], rule: 'contrast', why: "despite + noun (the difficult situation).", wrong: { although: "'although' needs subject + verb. Noun → despite." } },
      { a: ['caring'], rule: 'verb-prep', why: "stop + -ing; care ABOUT.", wrong: { 'to care': "'stopped to care' = stopped in order to care. Here: stop + -ing." } },
      { a: ['politely'], rule: 'adj-vs-adv', why: "How did they treat each other? → adverb.", wrong: { polite: "Describes the verb 'treated' → adverb: politely." } },
      { a: ['on', 'along'], rule: 'vocab-friendship', why: "get on well / get along well with sb." },
      { a: ['happy'], rule: 'linking-verbs', why: "'be' + adjective.", wrong: { happily: "After 'be' → adjective." } }
    ]
  },
  {
    id: 'txt-06', title: 'A Chance Meeting', topic: 'Friendship',
    body: "Last Saturday I was walking through the city centre ___ I suddenly heard someone call my name. It was Jonas, my best friend from primary school! We ___ (not / see) each other for almost four years because his family ___ (move) to Germany.\n\nWe went to a café to catch ___. Jonas told me that he ___ (live) in Munich for three years and that he loved it there. He speaks German ___ (fluent) now, of course, but his English is ___ (good) than mine! We laughed a lot and talked ___ hours. Before we said goodbye, we promised to keep ___ touch this time.",
    gaps: [
      { a: ['when'], rule: 'when-while', why: "Long action (was walking) + when + short action (heard).", wrong: { while: "'while' + long action. 'heard' is short → when." } },
      { a: ["hadn't seen", 'had not seen'], rule: 'past-perfect', why: "Before that Saturday → past perfect: hadn't seen.", wrong: { "didn't see": "Up to that moment in the past → hadn't seen." } },
      { a: ['had moved', 'moved'], rule: 'past-perfect', why: "The move happened before → had moved." },
      { a: ['up'], rule: 'phrasal-verbs', why: "catch up = sich austauschen, was es Neues gibt." },
      { a: ['had been living', 'had lived'], rule: 'past-perfect-cont', why: "for three years before the meeting → had been living.", wrong: { lived: "Duration up to a past moment → had been living." } },
      { a: ['fluently'], rule: 'adj-vs-adv', why: "How does he speak? → adverb.", wrong: { fluent: "Describes 'speaks' → adverb: fluently." } },
      { a: ['better'], rule: 'comparison', why: "good – better – best (+ than).", wrong: { gooder: "Irregular: better." } },
      { a: ['for'], rule: 'for-since', why: "for + period (hours)." },
      { a: ['in'], rule: 'vocab-meeting', why: "keep IN touch." }
    ]
  },
  {
    id: 'txt-07', title: 'Chores at Home', topic: 'Family',
    body: "In our household there are five people, so there is always a lot of ___ (Hausarbeit). Last month my mum said, 'Everybody has to do their ___ share!' So we made a plan. Now my older brother ___ (do) the washing-up every evening, and I take the dog ___ a walk. My little sister is ___ (too / enough) young to cook, but she helps to tidy up.\n\nAt first my brother complained ___ the plan, but now he says it is fair. Yesterday Mum came home ___ (late) than usual, and the whole flat was ___ (perfect) clean. She was so ___ (surprise) that she took a photo!",
    gaps: [
      { a: ['housework'], rule: 'vocab-chores', why: "housework (uncountable).", wrong: { homework: "homework = Hausübung.", houseworks: "No plural." } },
      { a: ['fair'], rule: 'vocab-chores', why: "do your fair share." },
      { a: ['does'], rule: 'collocations-make-do', why: "Present simple, he → does (do the washing-up).", wrong: { do: "he/she/it → does.", makes: "do the washing-up." } },
      { a: ['for'], rule: 'collocations-other', why: "take the dog FOR a walk." },
      { a: ['too'], rule: 'intensifiers', why: "too + adjective = more than OK → she can't cook.", wrong: { enough: "'young enough' would mean she CAN cook. → too young." } },
      { a: ['about'], rule: 'verb-prep', why: "complain ABOUT." },
      { a: ['later'], rule: 'adverb-comparison', why: "late – later + than.", wrong: { 'more late': "late → later." } },
      { a: ['perfectly'], rule: 'adj-vs-adv', why: "Describes the adjective 'clean' → adverb.", wrong: { perfect: "Before an adjective → adverb: perfectly." } },
      { a: ['surprised'], rule: 'word-formation', why: "-ed = how a person feels.", wrong: { surprising: "Mum FEELS it → surprised." } }
    ]
  },
  {
    id: 'txt-08', title: 'Peer Pressure', topic: 'School',
    body: "When I started at my new school, I really wanted to be part of the 'cool' ___ (Clique). The girls in this group ___ (always / wear) expensive clothes, and they ___ (laugh) at anyone who was different. One day they asked me to skip a lesson with them. I didn't want to, but I was afraid ___ being left out, so I went with them.\n\n___ we were sitting in the park, our teacher walked by and saw us! I felt ___ (awful). That evening I told my parents everything. They weren't angry; they listened to me ___ (patient). They explained that ___ (truth) friends accept you for who you are.",
    gaps: [
      { a: ['clique'], rule: 'vocab-friendship', why: "clique = a small closed group of friends.", wrong: { click: "Spelling: clique." } },
      { a: ['always wore', 'would always wear', 'used to always wear'], rule: 'adverb-position', why: "S + always + V2 (past simple).", wrong: { 'wore always': "Frequency adverb BEFORE the main verb: always wore.", 'always weared': "wear – wore – worn." } },
      { a: ['laughed', 'used to laugh', 'would laugh'], rule: 'past-simple', why: "Past simple: laughed." },
      { a: ['of'], rule: 'adj-prep', why: "afraid OF + -ing." },
      { a: ['while', 'as', 'when'], rule: 'when-while', why: "while + past continuous (long action).", wrong: { during: "'during' + noun. Here a clause follows → while." } },
      { a: ['awful', 'terrible'], rule: 'linking-verbs', why: "'feel' is a linking verb → adjective.", wrong: { awfully: "After 'feel' → adjective." } },
      { a: ['patiently'], rule: 'adj-vs-adv', why: "How did they listen? → adverb.", wrong: { patient: "Describes 'listened' → adverb." } },
      { a: ['true', 'real'], rule: 'word-formation', why: "Before the noun 'friends' → adjective: truth → true." }
    ]
  },
  {
    id: 'txt-09', title: 'My Big Brother', topic: 'Family',
    body: "My brother Max is six years older than me, so there is quite a big age ___ between us. When I was small, Max often looked ___ me when our parents were at work. He taught me how to ride a bike and how to swim ___ (proper). Of course, we sometimes ___ (have) arguments – usually about the TV!\n\nLast year Max moved out of our ___ (parent) home to study in Graz. At first the house felt ___ (strange) quiet without him. Now we video-chat every Sunday, and we get ___ better than ever. Max is ___ (funny) person I know, and I am really proud ___ him.",
    gaps: [
      { a: ['gap', 'difference'], rule: 'vocab-family', why: "age gap = Altersunterschied." },
      { a: ['after'], rule: 'phrasal-verbs', why: "look after = sich kümmern um.", wrong: { for: "look for = suchen. → look after." } },
      { a: ['properly'], rule: 'adverb-formation', why: "How did he teach me to swim? → adverb.", wrong: { proper: "Describes 'swim' → adverb: properly." } },
      { a: ['had', 'used to have', 'would have'], rule: 'past-simple', why: "Past (when I was small) → had." },
      { a: ['parental'], rule: 'vocab-family', why: "parental home = Elternhaus.", wrong: { parents: "Adjective before 'home' → parental." } },
      { a: ['strangely'], rule: 'adj-vs-adv', why: "Describes the adjective 'quiet' → adverb.", wrong: { strange: "Before an adjective → adverb: strangely." } },
      { a: ['on', 'along'], rule: 'vocab-friendship', why: "get on / get along (well) with sb." },
      { a: ['the funniest'], rule: 'comparison', why: "the + superlative: funny → the funniest.", wrong: { funniest: "Superlative needs 'the'.", 'the most funny': "funny → the funniest." } },
      { a: ['of'], rule: 'adj-prep', why: "proud OF." }
    ]
  },
  {
    id: 'txt-10', title: 'The School Trip', topic: 'School',
    body: "Last spring our class ___ (go) on a school trip to London. For most of us, it was the first trip abroad without our parents. We ___ (look) forward to it for months. On the first day it was ___ (absolute) freezing, ___ we walked around the city all day. In the evening we were ___ (exhaust) but happy.\n\nOn the second day, something funny ___ (happen). While we ___ (visit) the British Museum, my friend Paul got ___ (lose)! We searched everywhere and found him an hour later in the gift shop, where he was buying a teddy bear for his little sister. ___ (lucky), our teacher wasn't angry. It was the ___ (good) trip ever.",
    gaps: [
      { a: ['went'], rule: 'past-simple', why: "go – went – gone. Past simple (last spring).", wrong: { gone: "gone = V3. Past simple → went." } },
      { a: ['had been looking', 'had looked'], rule: 'past-perfect-cont', why: "for months before the trip → had been looking forward.", wrong: { 'were looking': "Duration (for months) before a past event → had been looking." } },
      { a: ['absolutely'], rule: 'intensifiers', why: "'freezing' is extreme → absolutely.", wrong: { very: "Extreme adjective → absolutely." } },
      { a: ['but', 'yet'], rule: 'contrast', why: "Contrast between two clauses → but.", wrong: { so: "'so' = result. Freezing BUT we walked → contrast." } },
      { a: ['exhausted'], rule: 'word-formation', why: "-ed = how people feel.", wrong: { exhausting: "People feel → exhausted." } },
      { a: ['happened'], rule: 'past-simple', why: "Past simple of a regular verb.", wrong: { 'was happened': "happen has no passive: happened." } },
      { a: ['were visiting'], rule: 'when-while', why: "while + past continuous.", wrong: { visited: "while + long action → were visiting." } },
      { a: ['lost'], rule: 'collocations-other', why: "get lost = sich verirren.", wrong: { losed: "lose – lost – lost." } },
      { a: ['luckily'], rule: 'word-formation', why: "Sentence adverb: Luckily, …", wrong: { lucky: "Sentence adverb → luckily." } },
      { a: ['best'], rule: 'comparison', why: "the + superlative: good → best.", wrong: { better: "'the … ever' → superlative: best." } }
    ]
  }
];

window.WRITING = [
  {
    id: 'w-formal', title: 'Formal email: Music workshop in London', kind: 'Formelle E-Mail', formal: true,
    minWords: 150, maxWords: 200,
    task: "<b>Situation:</b> You want to take part in a one-week music workshop for teenagers in London. Write an email to the Program Coordinator (<b>sam@wither.com</b>).<ul>" +
      "<li>say why you are writing and introduce yourself</li><li>give reasons why you want to take part</li>" +
      "<li>say what you would like to do there (e.g. try out new instruments, compose songs)</li>" +
      "<li>ask if there is support for participants who feel nervous or homesick</li></ul>",
    tips: ['Dear Sir or Madam, … Yours faithfully,', 'I am writing to inquire about …', 'I would be grateful if you could …', 'Could you please let me know whether …', 'I look forward to hearing from you.'],
    checks: [
      { label: 'Betreff (Subject line)', example: 'Subject: Music workshop in London', patterns: ['subject\\s*:'] },
      { label: 'Formelle Anrede (Greeting)', example: 'Dear Sir or Madam,', patterns: ['dear (sir or madam|sir|madam|mr\\.? |mrs\\.? |ms\\.? |sam|program(me)? coordinator)'] },
      { label: 'Zweck nennen (Purpose)', example: 'I am writing to inquire about …', patterns: ['i am writing (to|in order to|because|with regard|regarding|in connection|about)'] },
      { label: 'Sich vorstellen', example: 'I am a 15-year-old student from Austria.', patterns: ['i am (a|an) .{0,40}(student|pupil|girl|boy)', '\\d+[- ]year[- ]old', 'years old'] },
      { label: 'Gründe (Reasons)', example: 'Firstly, music has always been my passion.', patterns: ['the reason', 'reasons', 'because', 'firstly', 'first of all', 'that is why', 'passion'] },
      { label: 'Aktivitäten: Instrumente / Komponieren', example: 'try out new instruments, compose my own songs', patterns: ['instrument', 'compos', 'songwriting', 'write (my own )?songs'] },
      { label: 'Frage nach Hilfe bei Nervosität / Heimweh', example: 'in case participants feel nervous or homesick', patterns: ['nervous', 'homesick', 'homesickness', 'anxious'] },
      { label: 'Höfliche Bitte (Request)', example: 'I would be grateful if you could …', patterns: ['i would be (very )?grateful if', 'could you (please )?(tell|let|inform|send|explain)', 'i would (really )?appreciate', 'would it be possible'] },
      { label: 'Formelle Linking words', example: 'Furthermore, In addition, However, Finally', patterns: ['furthermore', 'moreover', 'in addition', 'however', 'finally', 'what is more'] },
      { label: 'Schlusssatz (Closing)', example: 'I look forward to hearing from you.', patterns: ['i (look|am looking) forward to hearing from you'] },
      { label: 'Grußformel (Sign-off)', example: 'Yours faithfully, / Yours sincerely,', patterns: ['yours (faithfully|sincerely)', 'kind regards', 'best regards'] }
    ],
    model: "Subject: Inquiry about the one-week music workshop in London\n\nDear Sir or Madam,\n\nI am writing to inquire about the one-week music workshop for teenagers in London which I saw advertised on your website. I am a fifteen-year-old student from Austria, and I have been playing the guitar for six years.\n\nThere are several reasons why I would like to take part. Firstly, music has always been my greatest passion, and I would love to improve my skills with professional musicians. Furthermore, I would like to meet young people from other countries who share my interests.\n\nDuring the workshop, I would particularly like to try out new instruments, such as the drums or the cello. In addition, I am very interested in composing my own songs, so I would be grateful if you could tell me whether there will be songwriting sessions.\n\nFinally, as this will be my first time abroad without my family, I am a little worried that I might feel nervous or homesick. Could you please let me know whether there is someone the participants can talk to if they need support?\n\nI look forward to hearing from you.\n\nYours faithfully,\nLena Huber"
  },
  {
    id: 'w-informal', title: 'Informal email to a friend', kind: 'Informelle E-Mail', formal: false,
    minWords: 120, maxWords: 180,
    task: "<b>Situation:</b> Your English friend Alex has written: <i>“How was your summer? Did you do anything exciting?”</i> Write back.<ul>" +
      "<li>thank Alex for the email</li><li>tell Alex about a chance meeting with an old friend this summer (past tenses!)</li>" +
      "<li>describe what you did together and how you felt</li><li>ask Alex about his/her plans</li></ul>",
    tips: ['Hi Alex, / Hey Alex,', 'Thanks for your email! / It was great to hear from you.', 'Guess what? … / Anyway, …', 'Write back soon! / Can\'t wait to hear from you.', 'Love, / Best wishes, / Take care,'],
    checks: [
      { label: 'Informelle Anrede', example: 'Hi Alex,', patterns: ['^\\s*(hi|hey|hello|dear)\\b'] },
      { label: 'Einstieg / Danke', example: 'Thanks for your email!', patterns: ['thanks? (you )?for your', 'how are you', 'it was (great|nice|lovely|good) to hear', 'hope you'] },
      { label: 'Past tenses (Erzählung)', example: 'I was walking … when I bumped into …', patterns: ['\\b(was|were) \\w+ing\\b', '\\b(went|met|had|saw|did|was|were)\\b'] },
      { label: 'Ausdruck aus den Units', example: 'bump into, chance meeting, catch up, hit it off', patterns: ['bump(ed)? into', 'chance meeting', '(catch|caught) up', 'hit it off', '(meet|met) up', '(keep|kept|stay|stayed) in touch', 'in common', 'get(ting)? to know'] },
      { label: 'Gefühle beschreiben', example: 'I was so surprised / excited', patterns: ['\\b(surprised|excited|happy|glad|amazed|thrilled|delighted|shocked)\\b'] },
      { label: 'Frage an den Freund / die Freundin', example: 'What are your plans for …?', patterns: ['\\?'] },
      { label: 'Informelle Wendung', example: 'Guess what? / Anyway, / By the way,', patterns: ['guess what', 'anyway', 'by the way', 'you know', 'believe it or not'] },
      { label: 'Kurzformen (informell erwünscht)', example: "I'm, didn't, can't", patterns: ["n't\\b", "\\b(i|you|we|they|it|that|he|she|there|what)'(m|re|ve|ll|d|s)\\b"] },
      { label: 'Schluss', example: 'Write back soon!', patterns: ['write (back )?soon', 'hope to hear from you', "can't wait to (hear|see)", 'let me know', 'speak soon', 'see you soon'] },
      { label: 'Grußformel', example: 'Love, / Best wishes, / Take care,', patterns: ['\\b(love|best wishes|cheers|take care|bye|see you|all the best|hugs)\\b'] }
    ],
    model: "Hi Alex,\n\nThanks for your email! It was great to hear from you. My summer was amazing – guess what happened?\n\nIn August I was walking through the city centre when I suddenly bumped into Jonas, my best friend from primary school! We hadn't seen each other for four years because his family had moved to Germany. It was such a lucky chance meeting! We went to a café to catch up and talked for hours. We still have so much in common – we both love football and old films.\n\nThe next day we met up again and went swimming at the lake. I was really happy because it felt like nothing had changed. Before he left, we promised to keep in touch, and now we text every day.\n\nAnyway, what about you? What are your plans for the autumn holidays? Are you still coming to Austria?\n\nWrite back soon!\n\nLove,\nLena"
  },
  {
    id: 'w-friend', title: 'Talk about a friend', kind: 'Monolog / Text', formal: false,
    minWords: 150, maxWords: 220,
    task: "<b>Task:</b> Write a text about a good friend (real or invented). Use as many expressions from Units 1–3 as possible.<ul>" +
      "<li>who is your friend and how/when did you meet?</li><li>what do you have in common – and how are you different?</li>" +
      "<li>describe a time you had an argument and how you made up</li><li>why is this friendship important to you?</li></ul>",
    tips: ['We hit it off immediately.', 'We have a lot in common.', 'We get on really well / get along with each other.', 'We fell out but made up …', 'She would never let me down.', 'We have kept in touch since …'],
    checks: [
      { label: 'hit it off', patterns: ['\\b(hit|hits|hitting) it off'] },
      { label: 'have … in common', patterns: ['in common'] },
      { label: 'get on (well) / get along with', patterns: ['\\b(get|gets|got|getting) (on|along)\\b'] },
      { label: 'fall out (with)', patterns: ['\\b(fall|falls|fell|fallen|falling) out'] },
      { label: 'make up', patterns: ['\\b(make|makes|made|making) up\\b'] },
      { label: 'let sb down', patterns: ['\\b(let|lets|letting) (me|him|her|us|them|you|each other|one another|\\w+) down'] },
      { label: 'keep / stay in touch', patterns: ['\\b(keep|keeps|kept|keeping|stay|stays|stayed|staying) in touch'] },
      { label: 'meet up / bump into', patterns: ['\\b(meet|meets|met|meeting) up', '\\b(bump|bumps|bumped|bumping) into'] },
      { label: 'get to know (each other)', patterns: ['\\b(get|got|getting|gets) to know'] },
      { label: 'catch up', patterns: ['\\b(catch|catches|caught|catching) up'] },
      { label: 'lifelong friendship / bond', patterns: ['lifelong', '\\bbond'] },
      { label: 'trust / rely on / count on', patterns: ['\\btrust', 'rely on', 'count on', 'depend on'] },
      { label: 'company', patterns: ['\\bcompany\\b'] },
      { label: 'respect / treat', patterns: ['\\brespect', '\\btreat'] },
      { label: 'peer (group) pressure / clique', patterns: ['peer', 'clique'] },
      { label: 'Past tenses (when we met …)', patterns: ['\\b(met|was|were|had)\\b'] }
    ],
    model: "I would like to tell you about my best friend, Sophie. We met at the age of ten on our first day at secondary school, and we hit it off immediately. We were sitting next to each other in maths, and we couldn't stop laughing at the same jokes. A few weeks later we went on a school trip together and got to know each other better.\n\nWe have a lot in common: we both love horses, we hate getting up early and we are crazy about the same music. Of course, we are also different. Sophie is very calm, while I can be quite impatient. Still, we get on really well and I always enjoy her company.\n\nLast year we fell out because I had told one of her secrets to another girl in our clique. Sophie was really hurt, and we didn't talk for a week. Then I bumped into her at the bus stop and apologised. We talked for hours and finally made up. Since then, our bond has been even stronger.\n\nSophie is important to me because I can always rely on her. She treats me with respect, she never judges me and she would never let me down. Even when she moved to another town, we kept in touch and met up every month to catch up. I really believe this will be a lifelong friendship."
  }
];
