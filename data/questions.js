/* LEONOVA – all typing tasks.
   Every task: id, world, type ("type" | "sentence" | "verb3"), prompt, answer (ALL allowed answers),
   why (why the answer is right), wrong (typical wrong answers → explanation), hint, rule (→ RULES).
   Written in a compact form and expanded by add() below. No fetch() → works from file://. */
(function () {
  'use strict';
  var Q = window.QUESTIONS = [];
  var PREFIX = { 'adj-adv': 'adv', past: 'past', linking: 'lnk', vocab: 'voc' };
  var count = {};
  function pad(n) { return n < 10 ? '00' + n : n < 100 ? '0' + n : String(n); }
  function add(world, rule, list) {
    list.forEach(function (o) {
      count[world] = (count[world] || 0) + 1;
      Q.push({
        id: PREFIX[world] + '-' + pad(count[world]),
        world: world,
        type: o.t || 'type',
        prompt: o.p,
        answer: o.a,
        why: o.y,
        wrong: o.x || {},
        hint: o.h,
        rule: o.r || rule,
        instr: o.i,
        de: o.de
      });
    });
  }
  // irregular verbs: [V1, [V2...], [V3...], German]
  function verbs(list) {
    list.forEach(function (v) {
      add('past', 'irregular-verbs', [{
        t: 'verb3', p: v[0], a: [v[1], v[2]], de: v[3],
        y: v[0] + ' – ' + v[1].join('/') + ' – ' + v[2].join('/') + ' (' + v[3] + '). V2 for the past simple, V3 after had/have.'
      }]);
    });
  }

  /* =========================== WORLD 1: ADJECTIVES & ADVERBS =========================== */
  var LV = "Adverbs describe actions. Here the verb means 'is' (it describes the subject) → use an adjective.";

  add('adj-adv', 'linking-verbs', [
    { p: 'The soup smells (wonderful / wonderfully).', a: ['wonderful'], y: "'smell' is a linking verb: it describes the soup, not an action. (Die Suppe riecht wunderbar = ist wunderbar.)", x: { wonderfully: LV } },
    { p: 'You look (tired / tiredly). Did you sleep badly?', a: ['tired'], y: "'look' here means 'seem / appear' → linking verb + adjective.", x: { tiredly: LV } },
    { p: 'This cake tastes (delicious / deliciously).', a: ['delicious'], y: "'taste' is a linking verb → adjective. It describes the cake.", x: { deliciously: LV } },
    { p: 'Your idea sounds (great / greatly).', a: ['great'], y: "'sound' is a linking verb → adjective: the idea is great.", x: { greatly: LV } },
    { p: 'She felt (nervous / nervously) before the test.', a: ['nervous'], y: "'feel' is a linking verb → adjective: she was nervous.", x: { nervously: LV } },
    { p: 'The children seemed (happy / happily) with their presents.', a: ['happy'], y: "'seem' is a linking verb → adjective.", x: { happily: LV } },
    { p: 'He became (angry / angrily) when he heard the news.', a: ['angry'], y: "'become' is a linking verb → adjective: he was angry.", x: { angrily: LV } },
    { p: 'The milk smells (bad / badly). Don\'t drink it!', a: ['bad'], y: "'smell' = linking verb → adjective 'bad'. 'badly' would describe an action.", x: { badly: LV } },
    { p: 'I feel (terrible / terribly) today. I think I\'ve got a cold.', a: ['terrible'], y: "'feel' is a linking verb → adjective.", x: { terribly: LV } },
    { p: "My grandma's garden always looks (beautiful / beautifully) in May.", a: ['beautiful'], y: "'look' = 'seem' here → adjective: the garden is beautiful.", x: { beautifully: LV } },
    { p: 'Everybody stayed (calm / calmly) during the fire alarm.', a: ['calm'], y: "'stay' is a linking verb (= remain) → adjective.", x: { calmly: LV } },
    { p: 'The teacher sounded (serious / seriously) when she talked about the test.', a: ['serious'], y: "'sound' is a linking verb → adjective.", x: { seriously: LV } },
    { p: 'She looked (careful / carefully) at the old photo.', a: ['carefully'], y: "Here 'look at' is a real ACTION (she used her eyes) → adverb: how did she look at it? carefully.", x: { careful: "Careful! 'look at' is an action here, not 'seem'. Actions take an adverb → carefully." } },
    { p: 'The chef tasted the sauce (careful / carefully).', a: ['carefully'], y: "Here 'taste' is an action (the chef tries the sauce) → adverb.", x: { careful: "'taste' is an action here (someone tastes something) → adverb 'carefully'." } },
    { p: 'This blanket feels really ____ (soft).', a: ['soft'], y: "'feel' is a linking verb → adjective: the blanket is soft.", x: { softly: LV } },
    { p: 'The dog smelled the food ____ (curious) before it ate it.', a: ['curiously'], y: "Here 'smell' is an action (the dog smells something) → adverb.", x: { curious: "The dog DOES something (smells the food) → adverb 'curiously'." } },
    { p: 'Your plan seems ____ (perfect) to me.', a: ['perfect'], y: "'seem' is a linking verb → adjective.", x: { perfectly: LV } },
    { p: 'He sounded ____ (happy) on the phone yesterday.', a: ['happy'], y: "'sound' is a linking verb → adjective.", x: { happily: LV } },
    { p: 'She looked ____ (sad) after the argument with her sister.', a: ['sad'], y: "'look' = 'seem' → adjective.", x: { sadly: LV } },
    { p: 'The flowers smell ____ (sweet).', a: ['sweet'], y: "'smell' is a linking verb → adjective.", x: { sweetly: LV } }
  ]);

  var ADV = "This word describes HOW something is done (a verb) → you need the adverb.";
  var ADJ = "This word describes a noun (a person or thing) → you need the adjective.";
  var ADVADJ = "Here the word describes an adjective → use an adverb (e.g. terribly boring, extremely tired).";

  add('adj-adv', 'adj-vs-adv', [
    { p: 'She is a (careful / carefully) driver.', a: ['careful'], y: "It describes the noun 'driver' → adjective.", x: { carefully: ADJ } },
    { p: 'She drives very (careful / carefully).', a: ['carefully'], y: "It describes how she drives (verb) → adverb.", x: { careful: ADV } },
    { p: 'Please speak (quiet / quietly) – the baby is sleeping.', a: ['quietly'], y: "How should you speak? → adverb.", x: { quiet: ADV } },
    { p: 'The exam was (easy / easily).', a: ['easy'], y: "'was' (be) + adjective. It describes the exam.", x: { easily: "After 'be' (was) you need an adjective." } },
    { p: 'I passed the exam (easy / easily).', a: ['easily'], y: "How did I pass? → adverb. easy → easily (y → ily).", x: { easy: ADV } },
    { p: 'He answered the question (correct / correctly).', a: ['correctly'], y: "How did he answer? → adverb.", x: { correct: ADV } },
    { p: 'My brother is a (quick / quickly) learner.', a: ['quick'], y: "It describes the noun 'learner' → adjective.", x: { quickly: ADJ } },
    { p: 'Tom ran (quick / quickly) to catch the bus.', a: ['quickly'], y: "How did Tom run? → adverb.", x: { quick: ADV } },
    { p: 'The film was (terrible / terribly) boring.', a: ['terribly'], y: "It describes the adjective 'boring' → adverb.", x: { terrible: ADVADJ } },
    { p: 'It was a (terrible / terribly) film.', a: ['terrible'], y: "It describes the noun 'film' → adjective.", x: { terribly: ADJ } },
    { p: 'She was (extreme / extremely) tired after the trip.', a: ['extremely'], y: "It describes the adjective 'tired' → adverb.", x: { extreme: ADVADJ } },
    { p: 'They waited (patient / patiently) for the results.', a: ['patiently'], y: "How did they wait? → adverb.", x: { patient: ADV } },
    { p: 'My dad is very (patient / patiently) with us.', a: ['patient'], y: "'is' (be) + adjective.", x: { patiently: "After 'be' (is) you need an adjective." } },
    { p: 'The kids played (happy / happily) in the garden.', a: ['happily'], y: "How did they play? → adverb (happy → happily).", x: { happy: ADV } },
    { p: 'She smiled (polite / politely) at the stranger.', a: ['politely'], y: "How did she smile? → adverb.", x: { polite: ADV } },
    { p: "It's a (real / really) good book.", a: ['really'], y: "It describes the adjective 'good' → adverb 'really'.", x: { real: ADVADJ } },
    { p: 'He speaks English (perfect / perfectly).', a: ['perfectly'], y: "How does he speak? → adverb.", x: { perfect: ADV } },
    { p: 'Her English is (perfect / perfectly).', a: ['perfect'], y: "'is' + adjective: it describes her English (a noun).", x: { perfectly: "After 'be' (is) you need an adjective." } },
    { p: 'He did the job (bad / badly).', a: ['badly'], y: "How did he do the job? → adverb.", x: { bad: ADV } },
    { p: 'That was a (bad / badly) mistake.', a: ['bad'], y: "It describes the noun 'mistake' → adjective.", x: { badly: ADJ } },
    { p: 'Lisa sings ____ (beautiful).', a: ['beautifully'], y: "How does Lisa sing? → adverb: beautiful + ly.", x: { beautiful: ADV, beautifuly: "Spelling: beautiful + ly = beautifully (double l)." } },
    { p: 'My little sister was ____ (unusual) quiet at dinner.', a: ['unusually'], y: "It describes the adjective 'quiet' → adverb.", x: { unusual: ADVADJ } },
    { p: 'Be ____ (careful)! The floor is wet.', a: ['careful'], y: "'Be' + adjective.", x: { carefully: "After 'be' you need an adjective." } },
    { p: 'He closed the door ____ (silent).', a: ['silently'], y: "How did he close the door? → adverb.", x: { silent: ADV } },
    { p: 'The bus was ____ (incredible) crowded.', a: ['incredibly'], y: "It describes the adjective 'crowded' → adverb. -ible → -ibly.", x: { incredible: ADVADJ, incrediblely: "-le → -ly: incredible → incredibly." } },
    { p: 'She explained the rules very ____ (clear).', a: ['clearly'], y: "How did she explain? → adverb.", x: { clear: ADV } },
    { p: 'It was a very ____ (clear) explanation.', a: ['clear'], y: "It describes the noun 'explanation' → adjective.", x: { clearly: ADJ } },
    { p: 'They live in a ____ (quiet) street.', a: ['quiet'], y: "It describes the noun 'street' → adjective.", x: { quietly: ADJ, quite: "'quite' (ziemlich) is a different word! quiet = leise/ruhig." } },
    { p: 'My parents were ____ (complete) shocked.', a: ['completely'], y: "It describes the adjective 'shocked' → adverb.", x: { complete: ADVADJ } },
    { p: 'He ____ (sudden) stopped talking.', a: ['suddenly'], y: "It describes the action 'stopped' → adverb.", x: { sudden: ADV } },
    { p: 'The test was ____ (surprising) easy.', a: ['surprisingly'], y: "It describes the adjective 'easy' → adverb.", x: { surprising: ADVADJ } },
    { p: 'She speaks French ____ (fluent).', a: ['fluently'], y: "How does she speak? → adverb.", x: { fluent: ADV } },
    { p: 'Our team played really ____ (bad) yesterday.', a: ['badly'], y: "How did they play? → adverb 'badly'.", x: { bad: ADV } },
    { p: 'The weather was ____ (awful) last weekend.', a: ['awful'], y: "'was' + adjective: it describes the weather.", x: { awfully: "After 'be' (was) you need an adjective." } }
  ]);

  add('adj-adv', 'irregular-adverbs', [
    { p: 'She plays the piano very (good / well).', a: ['well'], y: "'well' is the adverb of 'good'. It describes how she plays.", x: { good: "'good' is an adjective. To describe HOW she plays (a verb) you need 'well'." } },
    { p: 'She is a (good / well) piano player.', a: ['good'], y: "It describes the noun 'player' → adjective 'good'.", x: { well: "'player' is a noun → adjective 'good'." } },
    { p: 'He runs very ____ (fast).', a: ['fast'], y: "'fast' is an adjective AND an adverb – there is no 'fastly'.", x: { fastly: "There is no word 'fastly'. 'fast' is already the adverb." } },
    { p: 'My sister works ____ (hard) for her exams.', a: ['hard'], y: "'hard' (fleißig) is the adverb. 'hardly' means 'kaum'.", x: { hardly: "'hardly' means 'kaum' – then she would NOT work! The adverb is 'hard'." } },
    { p: 'The train arrived ____ (late) again.', a: ['late'], y: "'late' (spät) is also the adverb. 'lately' means 'in letzter Zeit'.", x: { lately: "'lately' means 'in letzter Zeit'. For 'spät' use 'late'." } },
    { p: 'I got up very ____ (early) this morning.', a: ['early'], y: "'early' is both adjective and adverb.", x: { earlily: "There is no 'earlily'. 'early' is already the adverb." } },
    { p: 'He did really ____ (good) in the test.', a: ['well'], y: "How did he do? → adverb 'well'.", x: { good: "'did' is an action → adverb 'well', not the adjective 'good'." } },
    { p: 'Did you sleep ____ (good)?', a: ['well'], y: "How did you sleep? → adverb 'well'.", x: { good: "'sleep' is an action → adverb 'well'." } },
    { p: 'The food at the party was really ____ (good).', a: ['good'], y: "'was' (be) + adjective 'good'.", x: { well: "'was' is a form of 'be' → adjective 'good'." } },
    { p: 'Go ____ (straight) on and then turn left.', a: ['straight'], y: "'straight' is also the adverb – no -ly.", x: { straightly: "There is no 'straightly'. Use 'straight'." } },
    { p: 'He is a ____ (fast) swimmer.', a: ['fast'], y: "Adjective before the noun 'swimmer'.", x: { fastly: "There is no 'fastly' – and here you need the adjective anyway." } },
    { p: 'You speak German really ____ (good)!', a: ['well'], y: "How do you speak? → adverb 'well'.", x: { good: "'speak' is an action → adverb 'well'." } },
    { p: 'They tried ____ (hard), but they lost the match.', a: ['hard'], y: "'try hard' = sich anstrengen. 'hard' is the adverb.", x: { hardly: "'hardly' = kaum. They tried HARD (sich sehr bemüht)." } }
  ]);

  add('adj-adv', 'tricky-adverbs', [
    { p: 'I can (hard / hardly) hear you. Please speak up.', a: ['hardly'], y: "'hardly' = kaum: I can almost not hear you.", x: { hard: "'hard' = schwer/fleißig. Here you mean 'kaum' → hardly." } },
    { p: 'She works very (hard / hardly) for school.', a: ['hard'], y: "'work hard' = fleißig arbeiten.", x: { hardly: "'hardly' = kaum – that's the opposite! → hard." } },
    { p: 'There was (hard / hardly) anybody at the party – only five people came.', a: ['hardly'], y: "'hardly anybody' = kaum jemand.", x: { hard: "You mean 'kaum' → hardly." } },
    { p: 'Have you seen any good films (late / lately)?', a: ['lately'], y: "'lately' = in letzter Zeit (often with present perfect).", x: { late: "'late' = spät. Here you mean 'in letzter Zeit' → lately." } },
    { p: "Sorry I'm (late / lately)! The bus didn't come.", a: ['late'], y: "'be late' = zu spät sein.", x: { lately: "'lately' = in letzter Zeit. Here: zu spät → late." } },
    { p: 'I (near / nearly) missed the bus this morning.', a: ['nearly'], y: "'nearly' = fast, beinahe.", x: { near: "'near' = nahe (Ort). 'beinahe' → nearly." } },
    { p: 'We live (near / nearly) the school.', a: ['near'], y: "'near' = nahe bei (place).", x: { nearly: "'nearly' = beinahe. For a place use 'near'." } },
    { p: 'This hotel was (high / highly) recommended by our teacher.', a: ['highly'], y: "'highly' = sehr/äußerst: highly recommended.", x: { high: "'high' = hoch (Höhe). 'sehr empfohlen' → highly recommended." } },
    { p: 'The plane flew very (high / highly) above the clouds.', a: ['high'], y: "'high' = hoch (height). It is also an adverb.", x: { highly: "'highly' = äußerst. For height use 'high'." } },
    { p: 'It is (high / highly) unlikely that it will snow in July.', a: ['highly'], y: "'highly unlikely' = äußerst unwahrscheinlich.", x: { high: "You mean 'äußerst' → highly." } },
    { p: 'She was so tired that she could ____ (hard) keep her eyes open.', a: ['hardly'], y: "'hardly' = kaum.", x: { hard: "Here the meaning is 'kaum' → hardly." } },
    { p: 'I have been very busy ____ (late).', a: ['lately'], y: "'lately' = in letzter Zeit.", x: { late: "The meaning is 'in letzter Zeit' → lately." } },
    { p: "It's ____ (near) midnight – go to bed!", a: ['nearly'], y: "'nearly' = fast, beinahe.", x: { near: "The meaning is 'fast' → nearly." } },
    { p: 'He ____ (hard) ever calls his grandparents.', a: ['hardly'], y: "'hardly ever' = fast nie.", x: { hard: "'hardly ever' = fast nie." } }
  ]);

  var MF = 'Bilde das Adverb aus dem Adjektiv in Klammern.';
  add('adj-adv', 'adverb-formation', [
    { p: 'The kids laughed ____ (happy).', a: ['happily'], i: MF, y: "-y → -ily: happy → happily.", x: { happyly: "y → i: happy → happily." } },
    { p: 'She solved the puzzle ____ (easy).', a: ['easily'], i: MF, y: "-y → -ily: easy → easily.", x: { easyly: "y → i: easy → easily." } },
    { p: 'I miss you ____ (terrible).', a: ['terribly'], i: MF, y: "-le → -ly: terrible → terribly.", x: { terriblely: "-le → -ly: terrible → terribly." } },
    { p: 'He held the baby ____ (gentle).', a: ['gently'], i: MF, y: "-le → -ly: gentle → gently.", x: { gentlely: "-le → -ly: gentle → gently." } },
    { p: '____ (basic), the idea is good.', a: ['basically'], i: MF, y: "-ic → -ically: basic → basically.", x: { basicly: "-ic → -ically: basic → basically." } },
    { p: 'Prices rose ____ (dramatic) last year.', a: ['dramatically'], i: MF, y: "-ic → -ically: dramatic → dramatically.", x: { dramaticly: "-ic → -ically." } },
    { p: 'Read the instructions ____ (careful).', a: ['carefully'], i: MF, y: "careful + ly = carefully (double l).", x: { carefuly: "careful + ly = carefully (two l's)." } },
    { p: 'I ____ (full) agree with you.', a: ['fully'], i: MF, y: "full → fully (only one extra y, not 'fullly').", x: { fullly: "full → fully." } },
    { p: 'I am ____ (true) sorry.', a: ['truly'], i: MF, y: "true → truly (the e disappears).", x: { truely: "true → truly (no e!)." } },
    { p: 'She shouted ____ (angry).', a: ['angrily'], i: MF, y: "-y → -ily: angry → angrily.", x: { angryly: "y → i: angry → angrily." } },
    { p: 'We were sitting ____ (comfortable) on the sofa.', a: ['comfortably'], i: MF, y: "-le → -ly: comfortable → comfortably.", x: { comfortablely: "-le → -ly." } },
    { p: 'The door opens ____ (automatic).', a: ['automatically'], i: MF, y: "-ic → -ically.", x: { automaticly: "-ic → -ically: automatically." } },
    { p: 'It rained ____ (heavy) all night.', a: ['heavily'], i: MF, y: "-y → -ily: heavy → heavily.", x: { heavyly: "y → i: heavily." } },
    { p: 'She waited ____ (nervous) outside the classroom.', a: ['nervously'], i: MF, y: "nervous + ly.", x: {} },
    { p: 'He asked ____ (polite) for help.', a: ['politely'], i: MF, y: "polite + ly (keep the e).", x: { politly: "polite + ly: keep the e → politely." } },
    { p: '____ (sad), our dog died last year.', a: ['sadly'], i: MF, y: "sad + ly. A sentence adverb (leider).", x: {} },
    { p: 'You can ____ (possible) finish it today.', a: ['possibly'], i: MF, y: "-le → -ly: possible → possibly.", x: { possiblely: "-le → -ly." } },
    { p: 'Just do it ____ (simple)!', a: ['simply'], i: MF, y: "-le → -ly: simple → simply.", x: { simplely: "-le → -ly: simply." } },
    { p: 'The prize was given out ____ (public).', a: ['publicly'], i: MF, y: "Exception! public → publicly (not -ically).", x: { publically: "Exception: public → publicly." } },
    { p: 'She ____ (real) wants to win.', a: ['really'], i: MF, y: "real + ly = really (double l).", x: { realy: "real + ly = really (two l's)." } },
    { p: 'He answered ____ (honest).', a: ['honestly'], i: MF, y: "honest + ly.", x: {} },
    { p: 'My grandpa walks very ____ (slow).', a: ['slowly'], i: MF, y: "slow + ly.", x: { slow: ADV } }
  ]);

  var EXT = "Extreme adjectives (fantastic, freezing, exhausted, starving, tiny, terrible, delicious …) go with 'absolutely', not 'very'.";
  var NORM = "Normal adjectives (cold, nice, hot, tired …) go with 'very'. 'absolutely' is only for extreme adjectives.";
  add('adj-adv', 'intensifiers', [
    { p: 'The film was (very / absolutely) fantastic.', a: ['absolutely'], y: "'fantastic' is an extreme adjective → absolutely.", x: { very: EXT } },
    { p: "It's (very / absolutely) cold today. Take a jacket.", a: ['very'], y: "'cold' is a normal adjective → very. (Extreme: absolutely freezing.)", x: { absolutely: NORM } },
    { p: 'I was (very / absolutely) exhausted after the race.', a: ['absolutely'], y: "'exhausted' = extremely tired → absolutely.", x: { very: EXT } },
    { p: 'Our holiday was (very / absolutely) nice.', a: ['very'], y: "'nice' is a normal adjective → very.", x: { absolutely: NORM } },
    { p: 'I was (very / absolutely) starving after the hike.', a: ['absolutely'], y: "'starving' = extremely hungry → absolutely.", x: { very: EXT } },
    { p: 'The puppy is (very / absolutely) tiny.', a: ['absolutely'], y: "'tiny' = extremely small → absolutely.", x: { very: EXT } },
    { p: 'The tea is (too / enough) hot to drink.', a: ['too'], y: "too + adjective = more than is OK → you can't drink it.", x: { enough: "'enough' would mean 'hot enough' and comes after the adjective." } },
    { p: "She isn't old ____ to drive a car.", a: ['enough'], y: "adjective + enough: old enough.", x: { too: "'too old' is the wrong meaning – and 'too' comes before the adjective." } },
    { p: 'Is your coffee warm ____?', a: ['enough'], y: "adjective + enough (enough comes AFTER the adjective).", x: {} },
    { p: "We don't have ____ chairs for everybody.", a: ['enough'], y: "enough + noun (enough comes BEFORE the noun).", x: { too: "'too' cannot stand before a noun like this. enough + noun." } },
    { p: 'This jacket is ____ small for me. I need a bigger one.', a: ['too'], y: "too = more than is OK – the jacket doesn't fit.", x: { very: "'very small' just describes it. Here it does NOT fit → too small." } },
    { p: 'The box is ____ heavy for me to carry. Can you help?', a: ['too'], y: "too + adjective + for sb + to V1.", x: { very: "The meaning is: I can't carry it → too heavy." } },
    { p: 'Have we got ____ time to buy a snack?', a: ['enough'], y: "enough + noun.", x: {} },
    { t: 'sentence', p: "He isn't enough tall to play in the team.", a: ["He isn't tall enough to play in the team."], y: "enough goes AFTER an adjective: tall enough.", h: "He isn't tall …" },
    { t: 'sentence', p: 'The test was very terrible.', a: ['The test was absolutely terrible.', 'The test was really terrible.', 'The test was totally terrible.'], y: "'terrible' is an extreme adjective → absolutely/really (not very).", h: 'The test was a…' },
    { t: 'sentence', p: "I'm very freezing – can we go inside?", a: ["I'm absolutely freezing – can we go inside?", "I'm absolutely freezing - can we go inside?", "I'm really freezing – can we go inside?", "I'm really freezing - can we go inside?", "I'm absolutely freezing can we go inside?"], y: "'freezing' is extreme → absolutely (or really).", h: "I'm absolutely …" },
    { t: 'sentence', p: 'There is enough not milk for breakfast.', a: ["There isn't enough milk for breakfast.", 'There is not enough milk for breakfast.'], y: "not enough + noun: There isn't enough milk.", h: 'There isn\'t …' }
  ]);

  var SO = 'Schreib den ganzen Satz in der richtigen Reihenfolge.';
  var FIX = 'Finde den Fehler und schreib den ganzen Satz richtig.';
  add('adj-adv', 'adverb-position', [
    { t: 'sentence', i: SO, p: 'always / late / is / Tom / for school', a: ['Tom is always late for school.'], y: "S + be + always: the frequency adverb comes AFTER 'be'." },
    { t: 'sentence', i: SO, p: 'I / my homework / have / finished / already', a: ['I have already finished my homework.', 'I have finished my homework already.'], y: "have + already + V3 (already can also go at the end)." },
    { t: 'sentence', i: SO, p: 'you / yet / have / your room / tidied / ?', a: ['Have you tidied your room yet?'], y: "'yet' goes at the END of questions and negatives." },
    { t: 'sentence', i: SO, p: 'never / she / breakfast / eats', a: ['She never eats breakfast.'], y: "S + never + main verb." },
    { t: 'sentence', i: SO, p: 'usually / we / to school / walk', a: ['We usually walk to school.'], y: "S + usually + main verb." },
    { t: 'sentence', i: SO, p: 'are / often / my parents / tired / in the evening', a: ['My parents are often tired in the evening.', 'In the evening my parents are often tired.', 'In the evening, my parents are often tired.'], y: "S + be + often." },
    { t: 'sentence', i: SO, p: 'sometimes / my brother / the washing-up / does', a: ['My brother sometimes does the washing-up.', 'Sometimes my brother does the washing-up.'], y: "S + sometimes + main verb ('sometimes' can also start the sentence)." },
    { t: 'sentence', i: SO, p: 'played / at the concert / last night / well / she', a: ['She played well at the concert last night.', 'Last night she played well at the concert.'], y: "Manner (well) – Place (at the concert) – Time (last night)." },
    { t: 'sentence', i: SO, p: "he / hasn't / his homework / yet / done", a: ["He hasn't done his homework yet."], y: "'yet' goes at the end of negative sentences." },
    { t: 'sentence', i: SO, p: 'we / just / have / arrived', a: ['We have just arrived.'], y: "have + just + V3." },
    { t: 'sentence', i: SO, p: 'rarely / my grandparents / watch / TV', a: ['My grandparents rarely watch TV.'], y: "S + rarely + main verb." },
    { t: 'sentence', i: SO, p: 'in the park / every morning / quickly / she runs', a: ['She runs quickly in the park every morning.', 'Every morning she runs quickly in the park.'], y: "Manner – Place – Time: quickly – in the park – every morning." },
    { t: 'sentence', i: SO, p: 'can / always / you / on me / count', a: ['You can always count on me.'], y: "Modal verb + always + main verb." },
    { t: 'sentence', i: SO, p: 'still / he / lives / with his parents', a: ['He still lives with his parents.'], y: "S + still + main verb." },
    { t: 'sentence', i: SO, p: 'already / the film / had / started', a: ['The film had already started.'], y: "had + already + V3." },
    { t: 'sentence', i: FIX, p: 'I like very much pizza.', a: ['I like pizza very much.'], y: "Never put an adverb between the verb and its object: like pizza very much." },
    { t: 'sentence', i: FIX, p: 'She speaks very well English.', a: ['She speaks English very well.'], y: "Verb + object + adverb: speaks English very well." },
    { t: 'sentence', i: FIX, p: 'He goes always to bed at ten.', a: ['He always goes to bed at ten.'], y: "Frequency adverb BEFORE the main verb." },
    { t: 'sentence', i: FIX, p: 'They never are late.', a: ['They are never late.'], y: "With 'be' the adverb comes AFTER: are never." },
    { t: 'sentence', i: FIX, p: 'I have finished already my project.', a: ['I have already finished my project.', 'I have finished my project already.'], y: "have + already + V3 – not between the verb and the object." },
    { t: 'sentence', i: FIX, p: 'We went last summer to Italy.', a: ['We went to Italy last summer.', 'Last summer we went to Italy.', 'Last summer, we went to Italy.'], y: "Place before time: to Italy last summer." },
    { t: 'sentence', i: FIX, p: 'My sister hardly ever is at home.', a: ['My sister is hardly ever at home.'], y: "With 'be': is + hardly ever." },
    { t: 'sentence', i: FIX, p: 'Have you yet finished?', a: ['Have you finished yet?'], y: "'yet' goes at the END of the question." }
  ]);

  add('adj-adv', 'comparison', [
    { p: 'My brother is ____ (tall) than me.', a: ['taller'], y: "Short adjective → -er + than.", x: { 'more tall': "Short adjectives (one syllable) take -er: taller." } },
    { p: 'This is the ____ (good) day of my life!', a: ['best'], y: "good – better – best (irregular).", x: { goodest: "Irregular: good – better – best.", better: "'better' compares two things. With 'the … of my life' you need the superlative 'best'.", 'most good': "Irregular: good – better – best." } },
    { p: 'Today is ____ (hot) than yesterday.', a: ['hotter'], y: "hot → hotter (double the t after a short vowel).", x: {} },
    { p: 'Maths is ____ (difficult) than English for me.', a: ['more difficult'], y: "Long adjective → more + adjective.", x: { difficulter: "Long adjectives use 'more': more difficult." } },
    { p: 'She is the ____ (happy) person I know.', a: ['happiest'], y: "happy → happiest (y → i). Two syllables ending in -y take -est.", x: { 'most happy': "Adjectives ending in -y take -est: happiest.", happyest: "y → i: happiest." } },
    { p: 'My cold is ____ (bad) today than yesterday.', a: ['worse'], y: "bad – worse – worst (irregular).", x: { badder: "Irregular: bad – worse – worst.", worser: "'worse' is already the comparative." } },
    { p: 'That was the ____ (bad) film I have ever seen.', a: ['worst'], y: "bad – worse – worst.", x: { baddest: "Irregular: bad – worse – worst.", worse: "With 'the … I have ever seen' you need the superlative: worst." } },
    { p: 'Vienna is ____ (big) than Graz.', a: ['bigger'], y: "big → bigger (double g).", x: { 'more big': "Short adjective → bigger." } },
    { p: 'This is the ____ (interesting) book in the library.', a: ['most interesting'], y: "Long adjective → the most + adjective.", x: { interestingest: "Long adjectives: the most interesting.", 'more interesting': "With 'the … in the library' you need the superlative: most interesting." } },
    { p: 'My sister is two years ____ (old) than me.', a: ['older'], y: "old → older + than.", x: { elder: "'elder' is only used before a noun (my elder sister), not with 'than'." } },
    { p: 'Our new flat is ____ (comfortable) than the old one.', a: ['more comfortable'], y: "Long adjective → more comfortable.", x: { comfortabler: "Long adjectives: more comfortable." } },
    { p: 'Who is the ____ (funny) person in your family?', a: ['funniest'], y: "funny → funniest (y → i).", x: { 'most funny': "Adjectives ending in -y take -est: funniest." } },
    { p: "I'm not as ____ (tall) as my dad.", a: ['tall'], y: "as + adjective + as uses the normal (positive) form.", x: { taller: "as … as uses the normal adjective: as tall as." } },
    { p: 'Is English ____ (easy) than German?', a: ['easier'], y: "easy → easier (y → i).", x: { 'more easy': "easy → easier." } },
    { p: 'This is the ____ (expensive) phone in the shop.', a: ['most expensive'], y: "Long adjective → the most expensive.", x: { expensivest: "Long adjectives: most expensive." } },
    { p: 'Ben is the ____ (young) of the three children.', a: ['youngest'], y: "Superlative: the youngest of three.", x: { younger: "Three children → superlative: youngest." } },
    { p: 'I have ____ (little) free time than my friends.', a: ['less'], y: "little – less – least.", x: { littler: "Irregular: little – less – least.", fewer: "'fewer' is for countable nouns. 'time' is uncountable → less." } },
    { p: 'She has got the ____ (many) followers in our class.', a: ['most'], y: "many – more – most.", x: { more: "With 'the … in our class' you need the superlative: most." } },
    { p: 'Which planet is the ____ (far) from the sun?', a: ['furthest', 'farthest'], y: "far – further/farther – furthest/farthest.", x: { farest: "Irregular: far – further – furthest." } },
    { p: 'The new rollercoaster is ____ (exciting) than the old one.', a: ['more exciting'], y: "Long adjective → more exciting.", x: {} },
    { t: 'sentence', i: FIX, p: 'My brother is more older than me.', a: ['My brother is older than me.', 'My brother is older than I am.'], y: "Use -er OR more – never both." },
    { t: 'sentence', i: FIX, p: 'This test was more easy then the last one.', a: ['This test was easier than the last one.'], y: "easy → easier, and comparisons use 'than' (not 'then')." },
    { t: 'sentence', i: FIX, p: 'She is the most nice girl in our class.', a: ['She is the nicest girl in our class.'], y: "Short adjective → the nicest." }
  ]);

  add('adj-adv', 'adverb-comparison', [
    { p: 'She speaks ____ (quietly) than her sister.', a: ['more quietly'], y: "-ly adverbs use 'more': more quietly.", x: { quietlier: "-ly adverbs: more quietly.", quieter: "'quieter' is the adjective. To describe HOW she speaks: more quietly." } },
    { p: 'He drives ____ (carefully) than his brother.', a: ['more carefully'], y: "-ly adverb → more carefully.", x: { 'more careful': "You need the adverb: more carefully." } },
    { p: 'Of all the runners, Anna ran ____ (fast).', a: ['fastest', 'the fastest'], y: "fast – faster – fastest.", x: { 'most fast': "One-syllable adverb → fastest." } },
    { p: 'My dad cooks ____ (good) than my mum.', a: ['better'], y: "well – better – best (adverb of good).", x: { gooder: "Irregular: well – better – best.", 'more good': "Irregular: better." } },
    { p: 'Can you come a bit ____ (early) tomorrow?', a: ['earlier'], y: "early – earlier – earliest.", x: { 'more early': "early → earlier." } },
    { p: 'Can you speak ____ (loud)? I can\'t hear you.', a: ['louder', 'more loudly'], y: "louder (informal, very common) or more loudly.", x: {} },
    { p: 'Our team played ____ (bad) than last week.', a: ['worse'], y: "badly – worse – worst.", x: { badder: "Irregular: worse.", 'more badly': "Irregular: badly – worse – worst." } }
  ]);

  add('adj-adv', 'word-formation', [
    { p: 'Be careful – this road is very ____ (danger).', a: ['dangerous'], y: "noun + -ous → adjective: danger → dangerous.", x: { danger: "After 'very' you need an adjective → dangerous.", dangerously: "After 'is' you need an adjective, not an adverb." } },
    { p: '____ (luck), nobody was hurt in the accident.', a: ['luckily'], y: "luck → lucky → luckily. Sentence adverb (zum Glück).", x: { lucky: "This word describes the whole sentence → adverb: luckily.", luckly: "luck → lucky → luckily (y → i)." } },
    { p: 'He was very ____ (help) when I moved house.', a: ['helpful'], y: "help + -ful → helpful (hilfsbereit).", x: { helpfull: "-ful has only one l: helpful." } },
    { p: 'Our team was very ____ (success) last season.', a: ['successful'], y: "success + -ful → successful.", x: { successfull: "-ful has only one l." } },
    { p: 'My grandma is a very ____ (patience) person.', a: ['patient'], y: "patience (noun) → patient (adjective).", x: {} },
    { p: 'The sofa is really ____ (comfort).', a: ['comfortable'], y: "comfort + -able → comfortable.", x: {} },
    { p: 'Our new neighbours are very ____ (friend).', a: ['friendly'], y: "friend → friendly (adjective!).", x: { friendship: "'friendship' is a noun. After 'very' you need an adjective → friendly." } },
    { p: 'Thank you for your ____ (kind).', a: ['kindness'], y: "After 'your' you need a noun: kind → kindness.", x: { kind: "After 'your' you need a noun → kindness." } },
    { p: 'It was a ____ (care) mistake – you should check your work.', a: ['careless'], y: "care + -less → careless (= not careful).", x: { careful: "A mistake happens when you are NOT careful → careless." } },
    { p: 'She was very ____ (happy) because she had lost her phone.', a: ['unhappy'], y: "Opposite with un-: unhappy.", x: { happy: "She lost her phone → she was NOT happy → unhappy." } },
    { p: '____ (sad), my grandfather died last year.', a: ['sadly'], y: "Sentence adverb: sadly (leider).", x: { sad: "It describes the whole sentence → adverb: sadly." } },
    { p: 'The ____ (friend) between Mia and Lena started in kindergarten.', a: ['friendship'], y: "After 'the' you need a noun: friend → friendship.", x: { friendly: "After 'The' you need a noun → friendship." } },
    { p: 'My brother is very ____ (create) – he paints and writes songs.', a: ['creative'], y: "create → creative (adjective).", x: {} },
    { p: 'A divorce can be very ____ (stress) for children.', a: ['stressful'], y: "stress + -ful → stressful.", x: { stressed: "'stressed' = how a person feels. The divorce CAUSES stress → stressful." } },
    { p: "It's ____ (possible) to finish this in five minutes – it's far too long!", a: ['impossible'], y: "Opposite with im-: impossible.", x: { unpossible: "possible → IMpossible." } },
    { p: 'My parents were ____ (worry) about me.', a: ['worried'], y: "-ed adjective = how a person feels.", x: { worrying: "'-ing' = what causes the feeling. Your parents FEEL → worried." } },
    { p: 'The film was really ____ (bore).', a: ['boring'], y: "-ing adjective = what causes the feeling: the film is boring.", x: { bored: "'-ed' = how a person feels. The film causes the feeling → boring." } },
    { p: 'I was ____ (bore) during the long lesson.', a: ['bored'], y: "-ed adjective = how a person feels.", x: { boring: "'I was boring' means other people found you boring! You feel → bored." } },
    { p: 'We were really ____ (excite) about the school trip.', a: ['excited'], y: "-ed = how a person feels.", x: { exciting: "People feel → excited." } },
    { p: 'Taking ____ (responsible) for a pet is not easy.', a: ['responsibility'], y: "After 'taking' you need a noun: responsibility.", x: { responsible: "take + noun → responsibility." } },
    { p: 'It was a ____ (peace) evening by the lake.', a: ['peaceful'], y: "peace + -ful → peaceful.", x: {} },
    { p: 'The ____ (emotion) film made me cry.', a: ['emotional'], y: "emotion + -al → emotional.", x: {} },
    { p: 'Their ____ (argue) lasted for hours.', a: ['argument'], y: "argue → argument (no e!).", x: { arguement: "Spelling: argument – no e after u." } },
    { p: 'He is ____ (fame) for his songs.', a: ['famous'], y: "fame → famous.", x: {} },
    { p: 'You are very ____ (rely) – I can always count on you.', a: ['reliable'], y: "rely → reliable (y → i + able).", x: { relyable: "y → i: reliable." } },
    { p: 'He spoke ____ (anger) to the referee.', a: ['angrily'], y: "anger (noun) → angry (adj) → angrily (adverb, describes 'spoke').", x: { angry: ADV } }
  ]);

  add('adj-adv', 'adj-vs-adv', [
    { t: 'sentence', i: FIX, p: 'She speaks English very good.', a: ['She speaks English very well.'], y: "How does she speak? → adverb 'well'." },
    { t: 'sentence', i: FIX, p: 'He drove very careful.', a: ['He drove very carefully.'], y: "How did he drive? → adverb 'carefully'." },
    { t: 'sentence', i: FIX, r: 'linking-verbs', p: 'The cake tastes deliciously.', a: ['The cake tastes delicious.'], y: "'taste' is a linking verb → adjective." },
    { t: 'sentence', i: FIX, r: 'linking-verbs', p: 'You look beautifully in that dress.', a: ['You look beautiful in that dress.'], y: "'look' (= seem) is a linking verb → adjective." },
    { t: 'sentence', i: FIX, r: 'tricky-adverbs', p: 'He works hardly to get good marks.', a: ['He works hard to get good marks.'], y: "'hard' = fleißig; 'hardly' = kaum." },
    { t: 'sentence', i: FIX, r: 'tricky-adverbs', p: 'I have been very busy late.', a: ['I have been very busy lately.'], y: "'lately' = in letzter Zeit." },
    { t: 'sentence', i: FIX, p: 'The children played quiet in their room.', a: ['The children played quietly in their room.'], y: "How did they play? → adverb 'quietly'." },
    { t: 'sentence', i: FIX, r: 'irregular-adverbs', p: 'She is a very well dancer.', a: ['She is a very good dancer.'], y: "'dancer' is a noun → adjective 'good'." },
    { t: 'sentence', i: FIX, r: 'irregular-adverbs', p: 'He runs fastly.', a: ['He runs fast.'], y: "There is no 'fastly' – fast is also the adverb." },
    { t: 'sentence', i: FIX, r: 'linking-verbs', p: 'My mum felt badly about the argument.', a: ['My mum felt bad about the argument.'], y: "'feel' is a linking verb → adjective 'bad'." },
    { t: 'sentence', i: FIX, p: 'It was a real good party.', a: ['It was a really good party.'], y: "It describes the adjective 'good' → adverb 'really'." },
    { t: 'sentence', i: FIX, p: 'She sang terrible yesterday.', a: ['She sang terribly yesterday.'], y: "How did she sing? → adverb 'terribly'." }
  ]);

  /* =========================== WORLD 2: PAST TENSES =========================== */
  var V3ONLY = "That's V3 (past participle). V3 needs 'had' or 'have'. For the past simple use V2.";
  var DIDV1 = "After 'did' / 'didn't' the main verb is always V1 (infinitive) – the past is already in 'did'.";
  var NEG = 'Verneine den Satz (past simple). Schreib den ganzen Satz.';
  var QU = 'Bilde eine Frage im past simple. Schreib die ganze Frage.';
  var FX = 'Finde den Fehler und schreib den ganzen Satz richtig.';

  add('past', 'past-simple', [
    { p: 'She ____ (write) a letter to her grandma yesterday.', a: ['wrote'], y: "Past simple (yesterday): write – WROTE – written.", x: { written: V3ONLY } },
    { p: 'We ____ (go) to the cinema last Saturday.', a: ['went'], y: "Past simple (last Saturday): go – WENT – gone.", x: { gone: V3ONLY } },
    { p: 'My parents ____ (buy) a new car two weeks ago.', a: ['bought'], y: "Past simple (ago): buy – BOUGHT – bought.", x: { brought: "'brought' is the past of 'bring'. buy → bought." } },
    { p: 'I ____ (meet) my best friend in primary school.', a: ['met'], y: "Past simple: meet – MET – met.", x: {} },
    { p: 'Last summer we ____ (travel) to Croatia.', a: ['travelled', 'traveled'], y: "Past simple (last summer). British English: travelled (double l); American: traveled.", x: {} },
    { p: 'The bus ____ (stop) right in front of our school.', a: ['stopped'], y: "Regular verb: short vowel + consonant → double it: stop → stopped.", x: {} },
    { p: 'She ____ (study) for three hours yesterday.', a: ['studied'], y: "Consonant + y → ied: study → studied.", x: {} },
    { p: 'My brother ____ (break) his arm when he was eight.', a: ['broke'], y: "Past simple: break – BROKE – broken.", x: { broken: V3ONLY } },
    { p: 'We ____ (have) a great time at the party.', a: ['had'], y: "Past simple: have – HAD – had.", x: {} },
    { p: 'At first I ____ (think) the test was easy.', a: ['thought'], y: "think – THOUGHT – thought.", x: { taught: "'taught' is the past of 'teach'. think → thought." } },
    { p: 'They ____ (catch) the last train home.', a: ['caught'], y: "catch – CAUGHT – caught.", x: {} },
    { p: 'My grandparents ____ (get) married in 1975.', a: ['got'], y: "Past simple (in 1975): get – GOT – got.", x: { gotten: "'gotten' is American V3. Past simple → got." } },
    { p: 'Mozart ____ (die) in 1791.', a: ['died'], y: "Regular verb ending in -e: just add -d → died.", x: {} },
    { p: 'In 2019 my family ____ (move) to Salzburg.', a: ['moved'], y: "Past simple with a year (in 2019).", x: { 'has moved': "A finished time (in 2019) → past simple, not present perfect." } },
    { p: 'I ____ (lose) my keys this morning.', a: ['lost'], y: "lose – LOST – lost.", x: { loose: "'loose' (locker) is an adjective. lose → lost." } },
    { p: 'Our teacher ____ (teach) us a new song.', a: ['taught'], y: "teach – TAUGHT – taught.", x: { thought: "'thought' is the past of 'think'. teach → taught." } },
    { p: 'She ____ (feel) sick after the long journey.', a: ['felt'], y: "feel – FELT – felt.", x: { fell: "'fell' is the past of 'fall'. feel → felt." } },
    { p: 'Two years ago my uncle ____ (fall) off his bike.', a: ['fell'], y: "fall – FELL – fallen.", x: { felt: "'felt' is the past of 'feel'. fall → fell.", fallen: V3ONLY } },
    { p: 'Yesterday I ____ (see) a fox in our garden.', a: ['saw'], y: "see – SAW – seen.", x: { seen: V3ONLY } },
    { p: 'He ____ (plan) the whole party by himself.', a: ['planned'], y: "Short vowel + consonant → double: plan → planned.", x: {} },
    { p: 'When I was ten, I ____ (win) a drawing competition.', a: ['won'], y: "win – WON – won.", x: {} },
    { p: 'We ____ (leave) the house at seven.', a: ['left'], y: "leave – LEFT – left.", x: {} },
    { p: 'My little sister ____ (cry) all night.', a: ['cried', 'was crying'], y: "Consonant + y → ied: cry → cried.", x: {} },
    { p: 'The concert ____ (begin) at eight o\'clock.', a: ['began'], y: "begin – BEGAN – begun.", x: { begun: V3ONLY } }
  ]);

  add('past', 'past-simple-neg', [
    { p: 'I ____ (not / go) to the party last night.', a: ["didn't go", 'did not go'], y: "Negative: didn't + V1.", x: { "didn't went": DIDV1, "did not went": DIDV1, "wasn't go": "Past simple negative uses didn't + V1." } },
    { p: 'Did you ____ (go) out last weekend?', a: ['go'], y: "Question: Did + subject + V1.", x: { went: "Nach 'did' kommt V1 (go). " + DIDV1 } },
    { p: 'Did you ____ (see) the match yesterday?', a: ['see'], y: "Did + subject + V1.", x: { saw: DIDV1, seen: DIDV1 } },
    { p: 'She ____ (not / like) the film.', a: ["didn't like", 'did not like'], y: "didn't + V1.", x: { "didn't liked": DIDV1 } },
    { p: 'Where did you ____ (buy) that jacket?', a: ['buy'], y: "Wh- + did + subject + V1.", x: { bought: DIDV1 } },
    { p: 'We ____ (not / have) enough time to finish.', a: ["didn't have", 'did not have'], y: "didn't + V1 (have).", x: { "didn't had": DIDV1, "hadn't": "In the past simple, 'have' (besitzen/haben) is negated with didn't: didn't have." } },
    { p: 'Why did she ____ (leave) so early?', a: ['leave'], y: "Why + did + subject + V1.", x: { left: DIDV1 } },
    { p: 'My dad ____ (not / know) the answer.', a: ["didn't know", 'did not know'], y: "didn't + V1.", x: { "didn't knew": DIDV1 } },
    { t: 'sentence', i: NEG, p: 'He finished his homework.', a: ["He didn't finish his homework."], y: "didn't + V1: finished → didn't finish." },
    { t: 'sentence', i: NEG, p: 'They watched TV last night.', a: ["They didn't watch TV last night."], y: "didn't + V1." },
    { t: 'sentence', i: NEG, p: 'My sister broke the window.', a: ["My sister didn't break the window."], y: "didn't + V1: broke → didn't break." },
    { t: 'sentence', i: NEG, p: 'We went to the lake.', a: ["We didn't go to the lake."], y: "didn't + V1: went → didn't go." },
    { t: 'sentence', i: QU, p: 'She went to London.', a: ['Did she go to London?'], y: "Did + subject + V1? went → Did … go?" },
    { t: 'sentence', i: QU, p: 'They bought a new house.', a: ['Did they buy a new house?'], y: "Did + subject + V1?" },
    { t: 'sentence', i: QU, p: 'He arrived at six. (When …?)', a: ['When did he arrive?'], y: "When + did + subject + V1?" },
    { t: 'sentence', i: QU, p: 'She ate a pizza. (What …?)', a: ['What did she eat?'], y: "What + did + subject + V1?" },
    { t: 'sentence', i: QU, r: 'past-questions', p: 'Tom called me. (Who …?)', a: ['Who called you?'], y: "Subject question (asking for the subject): NO 'did' – Who called you?" },
    { t: 'sentence', i: FX, p: 'Did you went to school yesterday?', a: ['Did you go to school yesterday?'], y: DIDV1 },
    { t: 'sentence', i: FX, p: "I didn't saw him at the party.", a: ["I didn't see him at the party."], y: DIDV1 },
    { t: 'sentence', i: FX, p: "She didn't knew the answer.", a: ["She didn't know the answer."], y: DIDV1 }
  ]);

  add('past', 'past-be', [
    { p: 'We ____ (be) very tired after the trip.', a: ['were'], y: "we/you/they → were.", x: { was: "'was' is for I/he/she/it. With 'we' → were." } },
    { p: 'The weather ____ (be) terrible last week.', a: ['was'], y: "it (the weather) → was.", x: { were: "'the weather' = it → was." } },
    { p: '____ (be) your parents at home yesterday?', a: ['were'], y: "Question with be: Were + they …? No 'did'.", x: { was: "'your parents' = they → were.", did: "'be' doesn't use did: Were your parents …?" } },
    { p: 'I ____ (not / be) at school on Monday.', a: ["wasn't", 'was not'], y: "I → was not / wasn't. 'be' doesn't use didn't.", x: { "didn't be": "'be' is never used with did: I wasn't.", "weren't": "With 'I' → wasn't." } },
    { p: 'They ____ (not / be) happy with the result.', a: ["weren't", 'were not'], y: "they → weren't.", x: { "wasn't": "With 'they' → weren't.", "didn't be": "'be' is never used with did." } },
    { t: 'sentence', i: FX, p: 'Did you be at home last night?', a: ['Were you at home last night?'], y: "Questions with 'be' don't use did: Were you …?" }
  ]);

  add('past', 'past-continuous', [
    { p: 'At 8 pm yesterday I ____ (do) my homework.', a: ['was doing'], y: "A specific moment (at 8 pm) → action in progress → past continuous.", x: { did: "'At 8 pm yesterday' = the action was in progress at that moment → was doing.", 'were doing': "With 'I' → was doing." } },
    { p: 'The sun ____ (shine) when we left the house.', a: ['was shining'], y: "Background action in progress → past continuous.", x: { shone: "The sun was already shining (background) → was shining." } },
    { p: 'What were you ____ (do) at 9 o\'clock last night?', a: ['doing'], y: "were + V-ing.", x: { do: "Past continuous: were + V-ing → doing.", did: "Past continuous: were + V-ing." } },
    { p: 'My parents ____ (watch) TV when I came home.', a: ['were watching'], y: "Long action interrupted by a short one (came home).", x: { 'was watching': "'my parents' = they → were watching.", watched: "They were already watching when I came → were watching." } },
    { p: 'I ____ (have) a shower when the phone rang.', a: ['was having'], y: "Long action (shower) interrupted by short action (rang).", x: { had: "The shower was in progress → was having." } },
    { p: 'We ____ (not / listen) when the teacher explained the homework.', a: ["weren't listening", 'were not listening'], y: "were + not + V-ing.", x: { "didn't listen": "The action was in progress at that time → weren't listening." } },
    { p: 'She ____ (talk) on the phone while I was cooking.', a: ['was talking'], y: "Two long actions at the same time (while) → both past continuous.", x: {} },
    { p: 'Why were you ____ (laugh) in class?', a: ['laughing'], y: "were + V-ing.", x: { laugh: "were + V-ing → laughing." } },
    { p: 'At midnight we ____ (still / dance).', a: ['were still dancing'], y: "At midnight = in progress. 'still' goes after were.", x: { 'still were dancing': "'still' goes after the auxiliary: were still dancing." } },
    { p: 'This time last year I ____ (live) in London.', a: ['was living'], y: "'this time last year' → action in progress.", x: {} },
    { p: 'It ____ (snow) when I woke up.', a: ['was snowing'], y: "Background action in progress when something short happened.", x: {} },
    { t: 'sentence', i: FX, p: 'I was knowing the answer.', a: ['I knew the answer.'], y: "'know' is a stative verb – no continuous form." },
    { t: 'sentence', i: FX, p: 'They was playing football in the park.', a: ['They were playing football in the park.'], y: "they → were + V-ing." },
    { t: 'sentence', i: FX, p: 'She was read a book when I called.', a: ['She was reading a book when I called.'], y: "was + V-ing → reading." }
  ]);

  add('past', 'when-while', [
    { p: 'While I ____ (walk) home, I met an old friend.', a: ['was walking'], y: "while + past continuous (long action).", x: { walked: "'while' introduces the long background action → was walking." } },
    { p: 'I was walking home when I ____ (meet) an old friend.', a: ['met'], y: "when + past simple (short action that interrupts).", x: { 'was meeting': "The short action after 'when' → past simple: met." } },
    { p: 'When the phone ____ (ring), I was sleeping.', a: ['rang'], y: "Short action → past simple: ring – rang – rung.", x: { rung: V3ONLY, 'was ringing': "The short action that interrupts → past simple." } },
    { p: 'While we ____ (have) dinner, the lights went out.', a: ['were having'], y: "while + past continuous.", x: { had: "while + long action → were having." } },
    { p: 'The lights went out while we ____ (eat).', a: ['were eating'], y: "while + past continuous.", x: { ate: "while + long action → were eating." } },
    { p: 'He ____ (fall) asleep while he was watching the film.', a: ['fell'], y: "Short action → past simple.", x: { 'was falling': "Falling asleep is the short action → fell." } },
    { p: '____ the teacher came in, everybody stopped talking.', a: ['when'], y: "'came in' is a short action → when.", x: { while: "'while' is for long actions (past continuous). 'came in' is short → when." } },
    { p: 'I was having a bath ____ the doorbell rang.', a: ['when'], y: "when + short action (rang).", x: { while: "'while' + long action. 'rang' is short → when." } },
    { t: 'sentence', i: "Verbinde die Sätze mit 'while'.", p: 'I was reading. My brother was playing computer games.', a: ['While I was reading, my brother was playing computer games.', 'I was reading while my brother was playing computer games.', 'My brother was playing computer games while I was reading.', 'While my brother was playing computer games, I was reading.'], y: "while + past continuous for two long actions at the same time." },
    { t: 'sentence', i: "Verbinde die Sätze mit 'when'.", p: 'She was crossing the street. She saw her teacher.', a: ['She was crossing the street when she saw her teacher.', 'When she was crossing the street, she saw her teacher.'], y: "Long action (past continuous) + when + short action (past simple)." }
  ]);

  add('past', 'past-perfect', [
    { p: 'When we arrived at the cinema, the film ____ (already / start).', a: ['had already started', 'had started already'], y: "The film started BEFORE we arrived → had + already + V3.", x: { 'already started': "It happened before another past action → past perfect: had already started.", 'has already started': "The story is in the past → had, not has." } },
    { p: 'She ____ (never / see) the sea before she went to Italy.', a: ['had never seen'], y: "Before another past action → had + never + V3.", x: { 'never saw': "'before she went' → the earlier past → had never seen.", 'had never saw': "had + V3: seen (not saw)." } },
    { p: 'By the time I got to the station, the train ____ (leave).', a: ['had left'], y: "'by the time' → the train left BEFORE I arrived → had left.", x: { left: "The train left BEFORE I got there → past perfect: had left.", 'had leaved': "leave – left – left." } },
    { p: "I couldn't get in because I ____ (lose) my key.", a: ['had lost'], y: "I lost it before → had lost.", x: { lost: "Losing the key happened earlier → had lost." } },
    { p: 'They were hungry because they ____ (not / eat) all day.', a: ["hadn't eaten", 'had not eaten'], y: "The earlier situation → hadn't + V3.", x: { "didn't eat": "It explains an earlier time → past perfect: hadn't eaten.", "hadn't ate": "had + V3: eaten." } },
    { p: 'When I got home, my brother ____ (already / eat) all the pizza.', a: ['had already eaten'], y: "Earlier action → had already eaten.", x: { 'already ate': "Earlier action → past perfect.", 'had already ate': "had + V3: eaten." } },
    { p: 'Lisa was nervous because she ____ (never / fly) before.', a: ['had never flown'], y: "fly – flew – FLOWN. had + never + V3.", x: { 'had never flew': "had + V3: flown (not flew).", 'had never flied': "fly – flew – flown." } },
    { p: 'I recognised him because I ____ (meet) him before.', a: ['had met'], y: "Earlier action → had met.", x: { met: "'before' → the earlier past → had met." } },
    { p: 'Had you ever ____ (be) to London before last summer?', a: ['been'], y: "had + V3: be – was/were – BEEN.", x: { was: "had + V3 → been.", were: "had + V3 → been." } },
    { p: 'The teacher was angry because we ____ (not / do) our homework.', a: ["hadn't done", 'had not done'], y: "The homework should have been done BEFORE → hadn't done.", x: { "didn't do": "Not doing the homework was earlier → past perfect: hadn't done.", "hadn't did": "had + V3: done." } },
    { p: 'When the police arrived, the thief ____ (run) away.', a: ['had run'], y: "He ran away BEFORE the police arrived → had run.", x: { ran: "He ran away BEFORE the police came → had run.", 'had ran': "run – ran – RUN. had + V3: had run." } },
    { p: 'We ____ (just / sit) down when the phone rang.', a: ['had just sat'], y: "had + just + V3: sit – sat – sat.", x: { 'had just sit': "had + V3: sat.", 'had just sitten': "sit – sat – sat." } },
    { p: 'By the age of ten, Mozart ____ (compose) several pieces.', a: ['had composed'], y: "'By the age of ten' → before that time → past perfect.", x: { composed: "'by …' → past perfect: had composed." } },
    { p: "I didn't know the film because I ____ (not / see) it.", a: ["hadn't seen", 'had not seen'], y: "Earlier situation → hadn't seen.", x: { "didn't see": "Earlier → past perfect: hadn't seen." } },
    { p: 'She told me that she ____ (write) the letter the day before.', a: ['had written'], y: "Earlier action in reported speech → had + V3.", x: { 'had wrote': "had + V3: written." } },
    { t: 'sentence', i: "Verbinde die Sätze mit 'After …' (past perfect).", p: 'First she finished the book. Then she watched the film.', a: ['After she had finished the book, she watched the film.', 'She watched the film after she had finished the book.'], y: "After + past perfect (earlier action), past simple (later action)." },
    { t: 'sentence', i: FX, p: 'When I arrived, the party has already started.', a: ['When I arrived, the party had already started.'], y: "Past story → had (not has) + already + V3." },
    { t: 'sentence', i: FX, p: 'She had wrote the essay before the deadline.', a: ['She had written the essay before the deadline.'], y: "had + V3: write – wrote – written." }
  ]);

  add('past', 'past-perfect-cont', [
    { p: 'She was tired because she ____ (run).', a: ['had been running'], y: "An activity that went on for some time before → had been + V-ing (result: tired).", x: { 'was running': "The running happened BEFORE she was tired → had been running." } },
    { p: 'They ____ (wait) for an hour when the bus finally came.', a: ['had been waiting', 'had waited'], y: "Duration (for an hour) up to a past moment → had been + V-ing.", x: { 'were waiting': "With a duration (for an hour) before another past action → had been waiting." } },
    { p: 'How long had you ____ (live) there before you moved?', a: ['been living'], y: "How long … had + been + V-ing.", x: { lived: "had + been + V-ing: been living." } },
    { p: 'His eyes were red because he ____ (cry).', a: ['had been crying'], y: "Activity before a past moment with a visible result.", x: {} },
    { p: 'We ____ (play) football for ten minutes when it started to rain.', a: ['had been playing', 'had played'], y: "for ten minutes + when … → had been + V-ing.", x: { 'were playing': "With 'for ten minutes' before another past action → had been playing." } },
    { p: 'The ground was wet because it ____ (rain) all night.', a: ['had been raining'], y: "Activity (all night) before a past moment → had been raining.", x: {} },
    { p: 'Her hands were dirty because she ____ (work) in the garden.', a: ['had been working'], y: "Activity before, visible result (dirty hands).", x: {} },
    { p: 'Mia was out of breath because she ____ (dance) for hours.', a: ['had been dancing', 'had danced'], y: "for hours + result → had been dancing.", x: {} },
    { t: 'sentence', i: FX, p: 'He had been work all day.', a: ['He had been working all day.'], y: "had been + V-ing." },
    { t: 'sentence', i: FX, p: 'They had be waiting for ages.', a: ['They had been waiting for ages.'], y: "had BEEN + V-ing." }
  ]);

  var UT = "Benutze 'used to'.";
  add('past', 'used-to', [
    { p: 'When I was little, I ____ (have) a dog called Max.', i: UT, a: ['used to have'], y: "used to + V1 = past state that is over now.", x: { 'use to have': "Positive sentences: usED to.", 'would have': "'would' is only for repeated actions, not states → used to." } },
    { p: 'We ____ (live) in Linz, but now we live in Graz.', i: UT, a: ['used to live'], y: "used to + V1: past situation that is not true any more.", x: { 'use to live': "Positive: used to." } },
    { p: "I ____ (not / like) vegetables when I was a kid.", i: UT, a: ["didn't use to like", 'did not use to like', 'used not to like'], y: "Negative: didn't use to + V1 (no -d after didn't).", x: { "didn't used to like": "After didn't comes V1: didn't USE to (without -d)." } },
    { p: 'Did you ____ (have) long hair when you were younger?', i: UT, a: ['use to have'], y: "Question: Did + S + use to + V1? (no -d)", x: { 'used to have': "After 'did' → use to (without -d)." } },
    { p: 'Every summer my grandpa ____ (take) us fishing.', i: "Benutze 'would'.", a: ['would take'], y: "would + V1 for repeated past actions.", x: { 'would took': "would + V1: take." } },
    { p: 'My mum ____ (be) a teacher, but now she works in an office.', i: UT, a: ['used to be'], y: "Past state → used to be.", x: { 'would be': "'would' is only for repeated actions, not states → used to be." } },
    { p: 'I (used to / would) love chocolate when I was a child.', a: ['used to'], y: "'love' is a state → only 'used to'.", x: { would: "'would' is only for repeated actions. 'love' is a state → used to." } },
    { p: 'My little brother ____ (cry) a lot when he was a baby.', i: UT, a: ['used to cry'], y: "used to + V1 (past habit).", x: {} },
    { p: 'People ____ (write) letters before there were mobile phones.', i: UT, a: ['used to write'], y: "Past habit → used to + V1.", x: {} },
    { t: 'sentence', i: "Schreib den Satz mit 'used to' (verneint).", p: 'In the past / people / not / have / mobile phones', a: ["In the past, people didn't use to have mobile phones.", "People didn't use to have mobile phones in the past."], y: "didn't use to + V1." },
    { t: 'sentence', i: FX, p: 'I use to play tennis when I was younger.', a: ['I used to play tennis when I was younger.'], y: "Positive: used to (with -d)." },
    { t: 'sentence', i: FX, p: 'Did she used to live here?', a: ['Did she use to live here?'], y: "After did → use to (no -d)." }
  ]);

  add('past', 'past-questions', [
    { t: 'sentence', i: 'Bilde die Frage (past continuous).', p: 'What / you / do / at 9 pm yesterday?', a: ['What were you doing at 9 pm yesterday?'], y: "Wh- + was/were + S + V-ing?" },
    { t: 'sentence', i: QU, p: 'She left early. (Why …?)', a: ['Why did she leave early?'], y: "Why + did + S + V1?" },
    { t: 'sentence', i: 'Bilde die Frage (past perfect).', p: 'you / ever / be / to Paris / before 2020?', a: ['Had you ever been to Paris before 2020?'], y: "Had + S + ever + V3?" },
    { t: 'sentence', i: 'Bilde die Frage (past perfect continuous).', p: 'How long / they / wait / when the bus came?', a: ['How long had they been waiting when the bus came?'], y: "How long + had + S + been + V-ing?" },
    { t: 'sentence', i: QU, p: 'They spent their holidays in Spain. (Where …?)', a: ['Where did they spend their holidays?'], y: "Where + did + S + V1? spent → spend." },
    { t: 'sentence', i: QU, p: 'Somebody broke the window. (Who …?)', a: ['Who broke the window?'], y: "Subject question → no 'did': Who broke …?" },
    { t: 'sentence', i: 'Bilde die Frage (past simple).', p: 'What / happen / yesterday?', a: ['What happened yesterday?'], y: "'What' is the subject → no 'did': What happened?" },
    { t: 'sentence', i: QU, p: 'We got to school by bus. (How …? → frag „you“)', a: ['How did you get to school?'], y: "How + did + S + V1? got → get." },
    { t: 'sentence', i: 'Bilde die Frage (past continuous).', p: 'she / sleep / when you called?', a: ['Was she sleeping when you called?'], y: "Was + she + V-ing?" },
    { t: 'sentence', i: QU, p: 'The film started at eight. (What time …?)', a: ['What time did the film start?'], y: "What time + did + S + V1?" }
  ]);

  add('past', 'past-signal', [
    { p: 'Three years ago my sister ____ (start) university.', a: ['started'], y: "'ago' → past simple.", x: { 'has started': "'ago' → past simple, not present perfect.", 'had started': "No earlier action here → simple past." } },
    { p: 'By the time the guests arrived, we ____ (finish) cooking.', a: ['had finished'], y: "'By the time' → past perfect.", x: { finished: "'By the time …' → past perfect: had finished." } },
    { p: 'At this time yesterday I ____ (sit) on a plane.', a: ['was sitting'], y: "'At this time yesterday' → past continuous.", x: { sat: "A moment in progress → was sitting." } },
    { p: 'He ____ (work) there for ten years when he finally retired.', a: ['had been working', 'had worked'], y: "for ten years before another past action → past perfect (continuous).", x: { worked: "Duration before another past action → had been working." } },
    { p: 'Last week I ____ (not / go) to school because I was ill.', a: ["didn't go", 'did not go'], y: "'Last week' → past simple negative: didn't + V1.", x: { "didn't went": DIDV1 } },
    { p: 'While she ____ (read), she fell asleep.', a: ['was reading'], y: "'While' → past continuous.", x: { read: "'while' + long action → was reading." } },
    { p: "I ____ (already / see) the film, so I didn't go with them.", a: ['had already seen'], y: "Earlier than 'didn't go' → past perfect.", x: { 'already saw': "Earlier action → had already seen.", 'have already seen': "Past story → had." } },
    { p: 'We ____ (arrive) at the hotel late in the evening.', a: ['arrived'], y: "Simple finished action → past simple.", x: {} },
    { p: 'She suddenly ____ (realise) that she had forgotten her bag.', a: ['realised', 'realized'], y: "Short action in the story → past simple (BrE: realised).", x: {} },
    { p: 'In 1969 people ____ (walk) on the moon for the first time.', a: ['walked'], y: "A date in the past → past simple.", x: {} }
  ]);

  verbs([
    ['be', ['was/were', 'was / were', 'was', 'were'], ['been'], 'sein'],
    ['become', ['became'], ['become'], 'werden'],
    ['begin', ['began'], ['begun'], 'beginnen'],
    ['bite', ['bit'], ['bitten'], 'beißen'],
    ['blow', ['blew'], ['blown'], 'blasen, wehen'],
    ['break', ['broke'], ['broken'], 'brechen'],
    ['bring', ['brought'], ['brought'], 'bringen'],
    ['build', ['built'], ['built'], 'bauen'],
    ['burn', ['burnt', 'burned'], ['burnt', 'burned'], 'brennen'],
    ['buy', ['bought'], ['bought'], 'kaufen'],
    ['catch', ['caught'], ['caught'], 'fangen'],
    ['choose', ['chose'], ['chosen'], 'wählen'],
    ['come', ['came'], ['come'], 'kommen'],
    ['cost', ['cost'], ['cost'], 'kosten'],
    ['cut', ['cut'], ['cut'], 'schneiden'],
    ['dig', ['dug'], ['dug'], 'graben'],
    ['do', ['did'], ['done'], 'tun, machen'],
    ['draw', ['drew'], ['drawn'], 'zeichnen'],
    ['dream', ['dreamt', 'dreamed'], ['dreamt', 'dreamed'], 'träumen'],
    ['drink', ['drank'], ['drunk'], 'trinken'],
    ['drive', ['drove'], ['driven'], 'fahren'],
    ['eat', ['ate'], ['eaten'], 'essen'],
    ['fall', ['fell'], ['fallen'], 'fallen'],
    ['feed', ['fed'], ['fed'], 'füttern'],
    ['feel', ['felt'], ['felt'], 'fühlen'],
    ['fight', ['fought'], ['fought'], 'kämpfen'],
    ['find', ['found'], ['found'], 'finden'],
    ['fly', ['flew'], ['flown'], 'fliegen'],
    ['forget', ['forgot'], ['forgotten'], 'vergessen'],
    ['forgive', ['forgave'], ['forgiven'], 'vergeben'],
    ['freeze', ['froze'], ['frozen'], 'frieren'],
    ['get', ['got'], ['got', 'gotten'], 'bekommen'],
    ['give', ['gave'], ['given'], 'geben'],
    ['go', ['went'], ['gone'], 'gehen'],
    ['grow', ['grew'], ['grown'], 'wachsen'],
    ['hang', ['hung'], ['hung'], 'hängen'],
    ['have', ['had'], ['had'], 'haben'],
    ['hear', ['heard'], ['heard'], 'hören'],
    ['hide', ['hid'], ['hidden'], 'verstecken'],
    ['hit', ['hit'], ['hit'], 'schlagen, treffen'],
    ['hold', ['held'], ['held'], 'halten'],
    ['hurt', ['hurt'], ['hurt'], 'verletzen'],
    ['keep', ['kept'], ['kept'], 'behalten'],
    ['know', ['knew'], ['known'], 'wissen, kennen'],
    ['lead', ['led'], ['led'], 'führen'],
    ['learn', ['learnt', 'learned'], ['learnt', 'learned'], 'lernen'],
    ['leave', ['left'], ['left'], 'verlassen'],
    ['lend', ['lent'], ['lent'], 'verleihen'],
    ['let', ['let'], ['let'], 'lassen'],
    ['lie', ['lay'], ['lain'], 'liegen'],
    ['lose', ['lost'], ['lost'], 'verlieren'],
    ['make', ['made'], ['made'], 'machen'],
    ['mean', ['meant'], ['meant'], 'bedeuten, meinen'],
    ['meet', ['met'], ['met'], 'treffen'],
    ['pay', ['paid'], ['paid'], 'bezahlen'],
    ['put', ['put'], ['put'], 'stellen, legen'],
    ['read', ['read'], ['read'], 'lesen'],
    ['ride', ['rode'], ['ridden'], 'reiten, fahren'],
    ['ring', ['rang'], ['rung'], 'läuten, anrufen'],
    ['rise', ['rose'], ['risen'], 'steigen'],
    ['run', ['ran'], ['run'], 'laufen'],
    ['say', ['said'], ['said'], 'sagen'],
    ['see', ['saw'], ['seen'], 'sehen'],
    ['sell', ['sold'], ['sold'], 'verkaufen'],
    ['send', ['sent'], ['sent'], 'schicken'],
    ['shake', ['shook'], ['shaken'], 'schütteln'],
    ['shine', ['shone'], ['shone'], 'scheinen'],
    ['shoot', ['shot'], ['shot'], 'schießen'],
    ['shut', ['shut'], ['shut'], 'schließen'],
    ['sing', ['sang'], ['sung'], 'singen'],
    ['sink', ['sank'], ['sunk'], 'sinken'],
    ['sit', ['sat'], ['sat'], 'sitzen'],
    ['sleep', ['slept'], ['slept'], 'schlafen'],
    ['speak', ['spoke'], ['spoken'], 'sprechen'],
    ['spend', ['spent'], ['spent'], 'ausgeben, verbringen'],
    ['stand', ['stood'], ['stood'], 'stehen'],
    ['steal', ['stole'], ['stolen'], 'stehlen'],
    ['swim', ['swam'], ['swum'], 'schwimmen'],
    ['take', ['took'], ['taken'], 'nehmen'],
    ['teach', ['taught'], ['taught'], 'unterrichten'],
    ['tear', ['tore'], ['torn'], 'zerreißen'],
    ['tell', ['told'], ['told'], 'erzählen'],
    ['think', ['thought'], ['thought'], 'denken'],
    ['throw', ['threw'], ['thrown'], 'werfen'],
    ['understand', ['understood'], ['understood'], 'verstehen'],
    ['wake', ['woke'], ['woken'], 'aufwachen, wecken'],
    ['wear', ['wore'], ['worn'], 'tragen (Kleidung)'],
    ['win', ['won'], ['won'], 'gewinnen'],
    ['write', ['wrote'], ['written'], 'schreiben']
  ]);

  /* =========================== WORLD 3: LINKING WORDS, PREPOSITIONS, COLLOCATIONS =========================== */
  var ALTH = "'despite / in spite of' + noun or -ing. Here a whole clause (subject + verb) follows → although.";
  var DESP = "'although' needs subject + verb. Here only a noun / -ing form follows → despite / in spite of.";
  var DOF = "There is no 'despite of'! Say 'despite' or 'in spite of'.";
  var J = 'Verbinde die Sätze. Schreib den ganzen Satz.';
  var F = 'Finde den Fehler und schreib den ganzen Satz richtig.';

  add('linking', 'contrast', [
    { p: '____ it was raining, we went for a walk.', a: ['although', 'though', 'even though'], y: "although + subject + verb (it was raining).", x: { despite: ALTH, 'in spite of': ALTH, however: "'However' starts a new sentence and is followed by a comma." } },
    { p: '____ the rain, we went for a walk.', a: ['despite', 'in spite of'], y: "despite / in spite of + noun (the rain).", x: { although: DESP, though: DESP, 'despite of': DOF } },
    { p: 'She went to school ____ feeling ill.', a: ['despite', 'in spite of'], y: "despite + -ing form.", x: { although: DESP, 'despite of': DOF } },
    { p: 'It was very cold. ____, we went swimming.', a: ['however', 'nevertheless'], y: "However, … connects two sentences (new sentence + comma).", x: { although: "'although' can't stand alone at the start of a sentence with a comma like this. New sentence + contrast → However,", despite: "'despite' needs a noun after it. Here: However," } },
    { p: '____ she is only twelve, she speaks four languages.', a: ['although', 'though', 'even though'], y: "although + subject + verb.", x: { despite: ALTH } },
    { p: 'In spite ____ the bad weather, the match took place.', a: ['of'], y: "in spite OF + noun.", x: {} },
    { p: 'He failed the test ____ studying very hard.', a: ['despite', 'in spite of'], y: "despite + -ing.", x: { although: DESP, 'despite of': DOF } },
    { p: '____ the fact that they are twins, they are very different.', a: ['despite', 'in spite of'], y: "despite the fact that + clause.", x: { although: "'although the fact that' is wrong. Use 'despite the fact that' or just 'although they are twins'." } },
    { p: 'My brother can be really annoying. ____, I love him.', a: ['however', 'nevertheless', 'still'], y: "New sentence with contrast → However,", x: { although: "'Although' needs a clause after it. New sentence + comma → However," } },
    { p: "I like my cousins, ____ I don't see them very often.", a: ['although', 'though', 'but', 'even though'], y: "Contrast between two clauses: although / but.", x: { despite: ALTH, however: "'however' needs a new sentence (or a semicolon). In the middle of a sentence → although / but." } },
    { t: 'sentence', i: "Verbinde mit 'although'.", p: 'It was late. We continued playing.', a: ['Although it was late, we continued playing.', 'We continued playing although it was late.'], y: "although + subject + verb." },
    { t: 'sentence', i: "Verbinde mit 'despite' (+ -ing).", p: 'She was tired. She finished her homework.', a: ['Despite being tired, she finished her homework.', 'She finished her homework despite being tired.', 'Despite the fact that she was tired, she finished her homework.', 'She finished her homework despite the fact that she was tired.', 'In spite of being tired, she finished her homework.', 'She finished her homework in spite of being tired.'], y: "despite + being tired (-ing)." },
    { t: 'sentence', i: "Verbinde mit 'However'.", p: 'It rained all day. We had a good time.', a: ['It rained all day. However, we had a good time.', 'It rained all day; however, we had a good time.'], y: "Sentence. However, sentence." },
    { t: 'sentence', i: F, p: 'Despite of the noise, I fell asleep.', a: ['Despite the noise, I fell asleep.', 'In spite of the noise, I fell asleep.', 'I fell asleep despite the noise.'], y: DOF },
    { t: 'sentence', i: F, p: 'Although the rain, we played outside.', a: ['Despite the rain, we played outside.', 'In spite of the rain, we played outside.', 'Although it was raining, we played outside.', 'Although it rained, we played outside.'], y: "although + clause; despite + noun." }
  ]);

  add('linking', 'cause-result', [
    { p: 'We stayed at home ____ it was raining.', a: ['because', 'as', 'since'], y: "because + subject + verb (reason).", x: { 'because of': "'because of' + noun. Here a clause follows → because.", so: "'so' gives the result, not the reason." } },
    { p: 'We stayed at home ____ the rain.', a: ['because of', 'due to'], y: "because of + noun.", x: { because: "'because' needs subject + verb. With a noun → because of." } },
    { p: 'It was raining, ____ we stayed at home.', a: ['so'], y: "so = result (deshalb).", x: { because: "'because' gives the reason. Here comes the result → so." } },
    { p: 'The match was cancelled ____ of the storm.', a: ['because'], y: "because of + noun.", x: {} },
    { p: 'I was really tired, ____ I went to bed early.', a: ['so'], y: "so + result.", x: { because: "The result follows → so." } },
    { p: 'She was late ____ she had missed the bus.', a: ['because', 'as', 'since'], y: "because + reason (clause).", x: { 'because of': "Clause follows → because.", so: "Reason → because." } },
    { p: "He couldn't sleep ____ the noise.", a: ['because of', 'due to'], y: "because of + noun.", x: { because: "With a noun → because of." } },
    { p: 'Our flight was delayed. ____, we missed our connection.', a: ['therefore', 'as a result', 'consequently'], y: "New sentence + result: Therefore, / As a result,", x: { so: "'So' is informal at the start; in writing use 'Therefore,' or 'As a result,'.", because: "This is the result, not the reason." } },
    { t: 'sentence', i: "Verbinde mit 'so'.", p: 'I was hungry. I made a sandwich.', a: ['I was hungry, so I made a sandwich.'], y: "Reason, so + result." },
    { t: 'sentence', i: "Verbinde mit 'because'.", p: 'I was hungry. I made a sandwich.', a: ['I made a sandwich because I was hungry.', 'Because I was hungry, I made a sandwich.'], y: "Result + because + reason." }
  ]);

  add('linking', 'purpose', [
    { p: 'She studied hard ____ pass the test.', a: ['in order to', 'to', 'so as to'], y: "in order to / to + V1 (purpose).", x: { 'for to': "There is no 'for to'. Purpose: (in order) to + V1.", for: "for + V1 is wrong for purpose. Use to / in order to." } },
    { p: "I left early so ____ I wouldn't miss the bus.", a: ['that'], y: "so that + subject + would/could.", x: {} },
    { p: 'He whispered in order ____ to wake the baby.', a: ['not'], y: "in order NOT to + V1.", x: {} },
    { p: 'We went to the shop ____ buy some milk.', a: ['to', 'in order to'], y: "to + V1 = purpose.", x: { for: "for + V1 is wrong. Purpose → to buy." } },
    { p: "I'm saving money ____ I can buy a new bike.", a: ['so that', 'so'], y: "so that + subject + can.", x: { 'in order to': "'in order to' + V1 – but a subject (I) follows → so that." } },
    { p: "She wrote it down so that she ____ forget it.", a: ["wouldn't", 'would not'], y: "so that + would(n't) in the past.", x: {} },
    { t: 'sentence', i: F, p: 'I went to London for to learn English.', a: ['I went to London to learn English.', 'I went to London in order to learn English.'], y: "Purpose: (in order) to + V1 – no 'for'." },
    { t: 'sentence', i: "Verbinde mit 'in order to'.", p: 'Tom got up early. He wanted to catch the first train.', a: ['Tom got up early in order to catch the first train.'], y: "in order to + V1." },
    { t: 'sentence', i: "Verbinde mit 'so that'.", p: "I'll text you. Then you'll know where we are.", a: ["I'll text you so that you know where we are.", "I'll text you so that you'll know where we are.", "I'll text you so you know where we are."], y: "so that + subject + verb." }
  ]);

  add('linking', 'condition', [
    { p: 'You will fail the test ____ you study.', a: ['unless'], y: "unless = if … not: You will fail if you don't study.", x: { if: "'if you study' – then you would pass! You mean 'if you DON'T study' = unless." } },
    { p: "____ it rains, we'll have a picnic tomorrow.", a: ['unless'], y: "unless = if it doesn't rain.", x: { if: "If it rains you won't have a picnic. You mean 'if it doesn't rain' = unless." } },
    { p: "I won't go to the party ____ you come with me.", a: ['unless'], y: "unless = if you don't come.", x: {} },
    { p: "____ you don't hurry, you'll miss the bus.", a: ['if'], y: "if + don't. ('unless' already means 'if not'.)", x: { unless: "'unless' already means 'if not' – no double negative. → If you don't hurry …" } },
    { t: 'sentence', i: "Schreib den Satz mit 'unless'.", p: "If you don't apologise, she won't talk to you.", a: ["Unless you apologise, she won't talk to you.", "She won't talk to you unless you apologise.", "Unless you apologize, she won't talk to you.", "She won't talk to you unless you apologize."], y: "unless + positive verb (= if … not)." },
    { t: 'sentence', i: F, p: "Unless you don't hurry, we'll be late.", a: ["Unless you hurry, we'll be late.", "If you don't hurry, we'll be late."], y: "unless + positive verb – no double negative." }
  ]);

  add('linking', 'pairs', [
    { p: '____ my brother and my sister are older than me.', a: ['both'], y: "both … and …", x: { either: "either … OR. With 'and' → both." } },
    { p: 'You can ____ call me or send me a message.', a: ['either'], y: "either … or …", x: { neither: "neither … NOR. With 'or' → either." } },
    { p: '____ Tom nor Anna was at the party.', a: ['neither'], y: "neither … nor …", x: { either: "either … OR. With 'nor' → neither." } },
    { p: 'I like neither tea ____ coffee.', a: ['nor'], y: "neither … nor.", x: { or: "neither goes with NOR." } },
    { p: 'She is not only clever ____ also very kind.', a: ['but'], y: "not only … but also …", x: { and: "not only … BUT also." } },
    { p: 'We can either go swimming ____ play tennis.', a: ['or'], y: "either … or.", x: { nor: "either goes with OR." } },
    { p: 'Both my parents ____ (be) teachers.', a: ['are'], y: "both … = plural → are.", x: { is: "'both' = two people → plural: are." } },
    { t: 'sentence', i: F, p: "Neither my mum nor my dad didn't come.", a: ['Neither my mum nor my dad came.'], y: "neither … nor is already negative – no 'didn't'." },
    { t: 'sentence', i: "Verbinde mit 'both … and'.", p: 'Lisa plays the guitar. Lisa plays the piano.', a: ['Lisa plays both the guitar and the piano.', 'Lisa plays both guitar and piano.'], y: "both A and B." }
  ]);

  add('linking', 'sequence-addition', [
    { p: 'I would like to learn new instruments. In ____, I would like to compose a song.', a: ['addition'], y: "In addition, = außerdem.", x: {} },
    { p: "On the one hand, it's fun. On the ____ hand, it's expensive.", a: ['other'], y: "On the one hand … on the other hand …", x: { another: "Fixed phrase: on the OTHER hand." } },
    { p: '____ of all, wash your hands.', a: ['first'], y: "First of all = zuallererst.", x: { firstly: "'Firstly' stands alone. The phrase is 'First of all'." } },
    { p: 'The hotel was cheap. What is ____, it was close to the beach.', a: ['more'], y: "What is more, = außerdem.", x: {} },
    { p: '____, I would like to thank you for your help.', a: ['finally', 'lastly'], y: "Finally, = schließlich (last point).", x: { 'at last': "'at last' = endlich (after a long wait). For the last point → Finally," } }
  ]);

  var ATT = "AT + clock times, night, the weekend (BrE), Christmas/Easter.";
  var ONT = "ON + days and dates (on Monday, on 15 May, on my birthday).";
  var INT = "IN + months, years, seasons, centuries, the morning/afternoon/evening.";
  add('linking', 'prep-time', [
    { p: "The lesson starts ____ 8 o'clock.", a: ['at'], y: ATT, x: { on: ATT, in: ATT } },
    { p: 'My birthday is ____ May.', a: ['in'], y: INT, x: { on: INT, at: INT } },
    { p: 'My birthday is ____ 15 May.', a: ['on'], y: ONT, x: { in: ONT, at: ONT } },
    { p: 'We usually go skiing ____ winter.', a: ['in', 'in the'], y: INT, x: { on: INT, at: INT } },
    { p: 'I never drink coffee ____ night.', a: ['at'], y: "at night (but: in the morning/afternoon/evening).", x: { in: "Fixed: AT night." } },
    { p: 'What are you doing ____ the weekend?', a: ['at'], y: "British English: AT the weekend (American: on the weekend).", x: { on: "'on the weekend' is American. British English: at the weekend." } },
    { p: 'I was born ____ 2011.', a: ['in'], y: INT, x: { on: INT, at: INT } },
    { p: 'See you ____ Monday!', a: ['on'], y: ONT, x: { in: ONT, at: ONT } },
    { p: 'We have English ____ Monday morning.', a: ['on'], y: "in the morning, BUT on + a specific day: on Monday morning.", x: { in: "in the morning – but with a day: ON Monday morning." } },
    { p: 'I always do my homework ____ the afternoon.', a: ['in'], y: INT, x: { on: INT, at: INT } },
    { p: 'The shops are closed ____ Christmas Day.', a: ['on'], y: "A specific day → on Christmas Day (but: at Christmas).", x: { at: "at Christmas = the period. Christmas DAY is a day → on." } },
    { p: 'We always visit our grandparents ____ Christmas.', a: ['at'], y: "at Christmas / at Easter (the holiday period).", x: { on: "on Christmas DAY, but at Christmas.", in: "at Christmas." } },
    { p: 'The castle was built ____ the 16th century.', a: ['in'], y: INT, x: { on: INT, at: INT } },
    { p: 'The film starts ____ half past eight.', a: ['at'], y: ATT, x: { on: ATT, in: ATT } },
    { p: 'My parents got married ____ 12 June 2005.', a: ['on'], y: ONT, x: { in: ONT, at: ONT } },
    { p: "It's very hot here ____ August.", a: ['in'], y: INT, x: { on: INT, at: INT } },
    { p: "Sorry, she's busy ____ the moment.", a: ['at'], y: "at the moment = gerade.", x: { in: "Fixed: AT the moment." } },
    { t: 'sentence', i: F, p: "We'll meet on next Friday.", a: ["We'll meet next Friday."], y: "No preposition before next / last / this / every." },
    { t: 'sentence', i: F, p: 'I go to the gym in Monday.', a: ['I go to the gym on Monday.', 'I go to the gym on Mondays.'], y: ONT }
  ]);

  add('linking', 'prep-place', [
    { p: "She isn't here – she's ____ school.", a: ['at'], y: "at school (a place where you do something).", x: { in: "Fixed: AT school (as a pupil)." } },
    { p: 'The picture is ____ the wall.', a: ['on'], y: "on = on a surface.", x: { at: "On a surface → on the wall." } },
    { p: 'I live ____ Linz.', a: ['in'], y: "in + town/city/country.", x: { at: "Towns and cities → in." } },
    { p: 'We met ____ the train.', a: ['on'], y: "on the train / bus / plane (public transport).", x: { in: "Public transport → ON the train/bus. (in a car)" } },
    { p: 'Wait for me ____ the bus stop.', a: ['at'], y: "at = a point.", x: { on: "A point → at the bus stop." } },
    { p: "There's a spider ____ the bathroom!", a: ['in'], y: "in = inside a room.", x: {} },
    { p: 'My grandma is still ____ bed.', a: ['in'], y: "Fixed: in bed.", x: { on: "Fixed: IN bed." } },
    { p: 'Our classroom is ____ the second floor.', a: ['on'], y: "on the … floor.", x: { in: "Fixed: ON the second floor." } },
    { p: "Turn right and it's ____ your left.", a: ['on'], y: "on the left / on the right.", x: {} },
    { p: 'Are your parents ____ home?', a: ['at'], y: "Fixed: at home.", x: { in: "Fixed: AT home." } },
    { p: 'He was sitting ____ the car.', a: ['in'], y: "in a car (but on a bus).", x: { on: "car → IN the car (but on the bus)." } },
    { p: 'You can read about it ____ page 25.', a: ['on'], y: "on page …", x: {} }
  ]);

  add('linking', 'for-since', [
    { p: 'I have known her ____ five years.', a: ['for'], y: "for + period (how long?).", x: { since: "'since' + starting point. 'five years' is a period → for." } },
    { p: 'I have known her ____ 2019.', a: ['since'], y: "since + starting point (when did it start?).", x: { for: "'for' + period. '2019' is a starting point → since." } },
    { p: 'We have lived here ____ I was born.', a: ['since'], y: "since + starting point (a past event).", x: { for: "A starting point → since." } },
    { p: 'He fell asleep ____ the film.', a: ['during'], y: "during + noun.", x: { while: "'while' + subject + verb. 'the film' is a noun → during." } },
    { p: 'My phone rang ____ I was having dinner.', a: ['while', 'when', 'as'], y: "while + subject + verb.", x: { during: "'during' + noun. Here subject + verb follow → while." } },
    { p: 'We met three years ____.', a: ['ago'], y: "period + ago (past simple).", x: { before: "'three years ago' = vor drei Jahren (from now).", since: "since + starting point. 'vor drei Jahren' → ago." } },
    { p: 'She has been ill ____ last Monday.', a: ['since'], y: "since + starting point.", x: { for: "'last Monday' is a point in time → since." } },
    { p: 'I waited ____ two hours.', a: ['for'], y: "for + period.", x: { since: "A period → for.", during: "during + noun (event). A period of time → for." } },
    { p: 'It rained ____ the night.', a: ['during'], y: "during + noun.", x: { while: "'while' needs a clause. Noun → during." } },
    { p: '____ the summer holidays we went camping.', a: ['during', 'in'], y: "during + noun.", x: { while: "'while' needs a clause. Noun → during." } },
    { p: 'They have been friends ____ a long time.', a: ['for'], y: "for + period.", x: { since: "A period → for." } },
    { p: "I haven't seen him ____ ages.", a: ['for'], y: "for ages = seit Ewigkeiten (period).", x: { since: "A period → for." } },
    { p: "I haven't seen him ____ Christmas.", a: ['since'], y: "since + point in time.", x: { for: "A point in time → since." } },
    { p: 'My parents got divorced ten years ____.', a: ['ago'], y: "period + ago.", x: {} },
    { t: 'sentence', i: F, p: 'I live here since three years.', a: ['I have lived here for three years.', 'I have been living here for three years.'], y: "Present perfect + for + period (German 'seit' → for/since)." }
  ]);

  add('linking', 'by-until', [
    { p: 'Please send me your essay ____ Friday.', a: ['by'], y: "by = deadline (not later than).", x: { until: "'until' is for an action that continues. A deadline → by." } },
    { p: "I waited for her ____ 6 o'clock, but she didn't come.", a: ['until', 'till'], y: "until = the action continued up to that time.", x: { by: "'by' is a deadline. Waiting continued → until." } },
    { p: 'We stayed at the party ____ midnight.', a: ['until', 'till'], y: "until = continuing action.", x: { by: "Staying continued → until." } },
    { p: 'You must be home ____ 10 pm.', a: ['by'], y: "by = not later than.", x: { until: "Deadline (spätestens) → by." } },
    { p: 'The shop is open ____ 8 pm.', a: ['until', 'till'], y: "until = up to that time.", x: { by: "Being open continues → until." } },
    { p: "I'll have finished the project ____ next week.", a: ['by'], y: "by = deadline.", x: { until: "Deadline → by." } },
    { p: 'Can you wait ____ I come back?', a: ['until', 'till'], y: "until + clause.", x: {} },
    { p: 'The tickets must be paid ____ the end of the month.', a: ['by'], y: "by = deadline.", x: { until: "Deadline → by." } }
  ]);

  add('linking', 'adj-prep', [
    { p: 'I am very interested ____ music.', a: ['in'], y: "interested IN.", x: { for: "German 'für' – but English: interested IN.", on: "interested IN." } },
    { p: 'She is really good ____ maths.', a: ['at'], y: "good AT.", x: { in: "good AT a subject.", on: "good AT." } },
    { p: 'My little brother is afraid ____ spiders.', a: ['of'], y: "afraid OF.", x: { from: "German 'vor' – English: afraid OF." } },
    { p: 'My parents are very proud ____ me.', a: ['of'], y: "proud OF.", x: { on: "German 'stolz auf' – English: proud OF." } },
    { p: "I'm not very keen ____ horror films.", a: ['on'], y: "keen ON.", x: {} },
    { p: 'My sister is very different ____ me.', a: ['from', 'to'], y: "different FROM (BrE also: different to).", x: { than: "different FROM (not 'than')." } },
    { p: 'Salzburg is famous ____ Mozart.', a: ['for'], y: "famous FOR.", x: {} },
    { p: 'Who is responsible ____ the dog?', a: ['for'], y: "responsible FOR.", x: {} },
    { p: 'My mum was angry ____ me because I was late.', a: ['with'], y: "angry WITH somebody.", x: { on: "angry WITH somebody.", about: "angry ABOUT something, but WITH a person." } },
    { p: "Don't be worried ____ the test.", a: ['about'], y: "worried ABOUT.", x: {} },
    { p: 'She has been married ____ him for ten years.', a: ['to'], y: "married TO.", x: { with: "married TO (not with)." } },
    { p: 'Your bag is similar ____ mine.', a: ['to'], y: "similar TO.", x: {} },
    { p: "I'm tired ____ doing the same thing every day.", a: ['of'], y: "tired OF = fed up with.", x: {} },
    { p: 'Be nice ____ your little sister!', a: ['to'], y: "nice / kind TO somebody.", x: { with: "nice TO somebody." } },
    { p: 'We are really excited ____ the school trip.', a: ['about'], y: "excited ABOUT.", x: {} },
    { p: "I'm really bad ____ remembering names.", a: ['at'], y: "bad AT.", x: {} },
    { p: 'He is jealous ____ his brother.', a: ['of'], y: "jealous OF.", x: {} },
    { p: 'My cousin is crazy ____ football.', a: ['about'], y: "crazy ABOUT.", x: {} },
    { p: 'The glass is full ____ water.', a: ['of'], y: "full OF.", x: {} },
    { p: 'She was upset ____ the argument with her friend.', a: ['about'], y: "upset ABOUT something.", x: {} },
    { p: 'Are you satisfied ____ your result?', a: ['with'], y: "satisfied WITH.", x: {} },
    { p: 'I am bored ____ this game.', a: ['with', 'of'], y: "bored WITH (also: bored of).", x: {} }
  ]);

  add('linking', 'verb-prep', [
    { p: 'It depends ____ the weather.', a: ['on'], y: "depend ON.", x: { of: "German 'abhängen von' – English: depend ON.", from: "depend ON." } },
    { p: 'You can always rely ____ me.', a: ['on'], y: "rely ON.", x: {} },
    { p: 'I love listening ____ music.', a: ['to'], y: "listen TO.", x: {} },
    { p: 'This book belongs ____ my sister.', a: ['to'], y: "belong TO.", x: {} },
    { p: 'She apologised ____ being late.', a: ['for'], y: "apologise FOR something.", x: {} },
    { p: "We're waiting ____ the bus.", a: ['for'], y: "wait FOR.", x: { on: "wait FOR." } },
    { p: "I'm looking ____ my keys. Have you seen them?", a: ['for'], y: "look FOR = suchen.", x: { after: "'look after' = sich kümmern um. Suchen → look for." } },
    { p: 'Can you look ____ my cat while I am on holiday?', a: ['after'], y: "look AFTER = sich kümmern um.", x: { for: "'look for' = suchen. Sich kümmern → look after." } },
    { p: 'I often think ____ my old friends.', a: ['about', 'of'], y: "think ABOUT / OF.", x: { on: "think ABOUT/OF (German 'denken an')." } },
    { p: 'Do you believe ____ ghosts?', a: ['in'], y: "believe IN.", x: {} },
    { p: 'She succeeded ____ passing the exam.', a: ['in'], y: "succeed IN + -ing.", x: {} },
    { p: 'I completely agree ____ you.', a: ['with'], y: "agree WITH somebody.", x: {} },
    { p: 'My brother always argues ____ my parents.', a: ['with'], y: "argue WITH somebody (ABOUT something).", x: {} },
    { p: "Don't laugh ____ me!", a: ['at'], y: "laugh AT somebody.", x: {} },
    { p: 'Who paid ____ the tickets?', a: ['for'], y: "pay FOR something.", x: {} },
    { p: "Don't worry ____ me – I'll be fine.", a: ['about'], y: "worry ABOUT.", x: {} },
    { p: 'He complained ____ the noise.', a: ['about'], y: "complain ABOUT.", x: {} },
    { p: 'I can\'t concentrate ____ my homework.', a: ['on'], y: "concentrate ON.", x: {} },
    { p: 'More than 50 pupils took part ____ the competition.', a: ['in'], y: "take part IN.", x: {} },
    { p: "I'm looking forward ____ seeing you.", a: ['to'], y: "look forward TO + -ing.", x: {} },
    { p: 'He suffers ____ hay fever.', a: ['from'], y: "suffer FROM.", x: {} },
    { p: 'We arrived ____ the airport at six.', a: ['at'], y: "arrive AT a place (building), arrive IN a town/country.", x: { to: "Never 'arrive to'. arrive AT the airport." } },
    { t: 'sentence', i: F, p: 'We discussed about the problem.', a: ['We discussed the problem.', 'We talked about the problem.'], y: "discuss has NO preposition (but: talk about)." },
    { t: 'sentence', i: F, p: 'She married with a doctor.', a: ['She married a doctor.', 'She got married to a doctor.'], y: "marry somebody (no preposition) / get married TO somebody." }
  ]);

  var MD = "make = create/produce something. do = activities, work, tasks.";
  add('linking', 'collocations-make-do', [
    { p: 'I ____ (make or do) a terrible mistake in the test yesterday.', a: ['made'], y: "make a mistake.", x: { did: "Fixed: MAKE a mistake.", make: "Past: yesterday → made." } },
    { p: 'Have you ____ (make or do) your homework yet?', a: ['done'], y: "do homework → have done.", x: { made: "Fixed: DO homework." } },
    { p: 'Can you ____ (make or do) me a favour?', a: ['do'], y: "do sb a favour.", x: { make: "Fixed: DO somebody a favour." } },
    { p: 'We ____ (make or do) the chores every Saturday.', a: ['do'], y: "do the chores.", x: { make: "Fixed: DO the chores." } },
    { p: 'My brother never ____ (make or do) his bed.', a: ['makes'], y: "make the bed (he → makes).", x: { does: "Fixed: MAKE the bed.", make: "he → makes (-s)." } },
    { p: "Please don't ____ (make or do) so much noise!", a: ['make'], y: "make noise.", x: { do: "Fixed: MAKE noise." } },
    { p: "It's not easy to ____ (make or do) friends at a new school.", a: ['make'], y: "make friends.", x: { do: "Fixed: MAKE friends." } },
    { p: 'I need to ____ (make or do) a phone call.', a: ['make'], y: "make a phone call.", x: { do: "Fixed: MAKE a phone call." } },
    { p: "She ____ (make or do) her best, but she didn't win.", a: ['did'], y: "do your best.", x: { made: "Fixed: DO your best." } },
    { p: 'Who is going to ____ (make or do) the washing-up tonight?', a: ['do'], y: "do the washing-up.", x: { make: "Fixed: DO the washing-up." } },
    { p: 'We have to ____ (make or do) a decision soon.', a: ['make'], y: "make a decision.", x: { do: "Fixed: MAKE a decision." } },
    { p: 'My mum ____ (make or do) the shopping on Fridays.', a: ['does'], y: "do the shopping.", x: { makes: "Fixed: DO the shopping." } },
    { p: 'You should ____ (make or do) more exercise.', a: ['do'], y: "do exercise.", x: { make: "Fixed: DO exercise." } },
    { p: 'He ____ (make or do) a lot of money with his app.', a: ['made'], y: "make money.", x: { did: "Fixed: MAKE money." } },
    { p: "I promise I'll ____ (make or do) an effort.", a: ['make'], y: "make an effort.", x: { do: "Fixed: MAKE an effort." } },
    { p: 'She ____ (make or do) a course in photography last year.', a: ['did'], y: "do a course.", x: { made: "Fixed: DO a course." } },
    { p: 'The storm ____ (make or do) a lot of damage.', a: ['did', 'caused'], y: "do damage.", x: { made: "Fixed: DO damage." } },
    { p: 'Can you ____ (make or do) sure the door is locked?', a: ['make'], y: "make sure.", x: { do: "Fixed: MAKE sure." } },
    { p: "Let's ____ (make or do) a plan for the weekend.", a: ['make'], y: "make a plan.", x: { do: "Fixed: MAKE a plan." } },
    { p: 'I always ____ (make or do) the housework with my dad.', a: ['do'], y: "do the housework.", x: { make: "Fixed: DO the housework." } },
    { p: 'He ____ (make or do) an excuse for being late.', a: ['made'], y: "make an excuse.", x: { did: "Fixed: MAKE an excuse." } },
    { p: 'Stop ____ (make or do) fun of your sister!', a: ['making'], y: "make fun of sb (stop + -ing).", x: { doing: "Fixed: MAKE fun of." } }
  ]);

  add('linking', 'collocations-other', [
    { p: 'Can I ____ a photo of you?', a: ['take'], y: "take a photo.", x: { make: "English: TAKE a photo (not make)." } },
    { p: "Let's ____ a break – I'm tired.", a: ['take', 'have'], y: "take / have a break.", x: { make: "take/have a break (not make)." } },
    { p: 'We ____ a great time at the festival last weekend.', a: ['had'], y: "have a good time → had.", x: { made: "Fixed: HAVE a good time." } },
    { p: 'They ____ married last year.', a: ['got'], y: "get married → got married.", x: { were: "'They were married' = state. The event last year → got married." } },
    { p: 'Can you ____ a secret?', a: ['keep'], y: "keep a secret.", x: { hold: "Fixed: KEEP a secret." } },
    { p: 'Please ____ attention to the instructions.', a: ['pay'], y: "pay attention.", x: { give: "Fixed: PAY attention." } },
    { p: 'Will you ____ part in the competition?', a: ['take'], y: "take part in.", x: {} },
    { p: 'My sister and I ____ an argument yesterday.', a: ['had'], y: "have an argument.", x: { made: "Fixed: HAVE an argument." } },
    { p: "Let's ____ in touch after the holidays!", a: ['keep', 'stay'], y: "keep / stay in touch.", x: {} },
    { p: 'My aunt is going to ____ us a visit next week.', a: ['pay'], y: "pay sb a visit.", x: { make: "Fixed: PAY somebody a visit." } },
    { p: "Hurry up and ____ ready – we're late!", a: ['get'], y: "get ready.", x: { make: "Fixed: GET ready." } },
    { p: "Don't panic. Just ____ calm.", a: ['keep', 'stay'], y: "keep / stay calm.", x: {} },
    { p: 'The wedding will ____ place in June.', a: ['take'], y: "take place = stattfinden.", x: { have: "Fixed: TAKE place." } },
    { p: 'I ____ a shower every morning.', a: ['have', 'take'], y: "have / take a shower.", x: { make: "have/take a shower." } },
    { p: "We got ____ in the forest and couldn't find the way back.", a: ['lost'], y: "get lost = sich verirren.", x: {} },
    { p: 'She always ____ her promises.', a: ['keeps'], y: "keep a promise.", x: { holds: "Fixed: KEEP a promise." } },
    { p: "Who's going to ____ the bill?", a: ['pay'], y: "pay the bill.", x: {} },
    { p: 'You should ____ care of your little brother.', a: ['take'], y: "take care of.", x: {} },
    { p: 'I hope you ____ better soon!', a: ['get', 'feel'], y: "get better = gesund werden.", x: { become: "Fixed: GET better." } },
    { p: 'It ____ me two hours to finish the essay.', a: ['took'], y: "it takes sb + time + to V1.", x: { needed: "Use: It TOOK me two hours." } },
    { p: 'Did you ____ fun at the party?', a: ['have'], y: "have fun.", x: { make: "Fixed: HAVE fun." } },
    { p: 'He ____ me a nice compliment.', a: ['paid', 'gave'], y: "pay sb a compliment.", x: { made: "Fixed: PAY somebody a compliment." } }
  ]);

  /* =========================== WORLD 4: VOCABULARY UNITS 1–3 =========================== */
  // Word list for the cheat sheet: en, de, def
  window.VOCAB = [
    { en: 'household', de: 'der Haushalt', def: 'all the people who live together in one home' },
    { en: 'only child', de: 'das Einzelkind', def: 'a child who has no brothers or sisters' },
    { en: 'sibling', de: 'das Geschwister(teil)', def: 'a brother or a sister' },
    { en: 'age gap', de: 'der Altersunterschied', def: 'the difference in age between two people' },
    { en: 'parental home', de: 'das Elternhaus', def: 'the home of your parents, where you grew up' },
    { en: 'adult', de: 'der/die Erwachsene', def: 'a person who is fully grown' },
    { en: 'single-parent family', de: 'die Alleinerzieherfamilie', def: 'a family in which only one parent looks after the children' },
    { en: 'divorce', de: 'die Scheidung; sich scheiden lassen', def: 'the legal end of a marriage' },
    { en: 'separation', de: 'die Trennung', def: 'when a couple decide to live apart' },
    { en: 'stepfamily', de: 'die Stieffamilie, Patchworkfamilie', def: 'a family where a parent lives with a new partner and children from earlier relationships' },
    { en: 'stepsibling', de: 'das Stiefgeschwister', def: 'the child of your stepfather or stepmother (you have no parent in common)' },
    { en: 'half-sibling', de: 'das Halbgeschwister', def: 'a brother or sister who has only one parent in common with you' },
    { en: 'at the age of', de: 'im Alter von', def: 'when somebody was/is … years old' },
    { en: 'start a family', de: 'eine Familie gründen', def: 'to have your first child' },
    { en: 'do the chores', de: 'die Hausarbeiten erledigen', def: 'to do the regular jobs in a home' },
    { en: 'look after', de: 'sich kümmern um, aufpassen auf', def: 'to take care of somebody or something' },
    { en: 'fair share', de: 'der gerechte Anteil', def: 'the part that is right and fair for one person' },
    { en: 'housework', de: 'die Hausarbeit', def: 'work like cleaning, cooking and washing in a home' },
    { en: 'childminding', de: 'die Kinderbetreuung', def: 'looking after children, for example while their parents are at work' },
    { en: 'washing-up', de: 'der Abwasch', def: 'washing the plates, glasses and cutlery after a meal' },
    { en: 'small repairs', de: 'kleine Reparaturen', def: 'fixing little things that are broken' },
    { en: 'contented', de: 'zufrieden', def: 'happy and satisfied with your life' },
    { en: 'secure', de: 'sicher, geborgen', def: 'feeling safe and protected' },
    { en: 'emotion', de: 'das Gefühl, die Emotion', def: 'a strong feeling such as love, fear or anger' },
    { en: 'let each other down', de: 'einander im Stich lassen / enttäuschen', def: 'to not help or support each other when it is needed' },
    { en: 'tension', de: 'die Spannung', def: 'a feeling of nervousness or bad feeling between people' },
    { en: 'relative', de: 'der/die Verwandte', def: 'a member of your family' },
    { en: 'fall out (with)', de: 'sich zerstreiten (mit)', def: 'to argue with somebody and stop being friends' },
    { en: 'hatred', de: 'der Hass', def: 'a very strong feeling of not liking somebody' },
    { en: 'secret', de: 'das Geheimnis', def: 'something that you do not tell other people' },
    { en: 'judge', de: '(be)urteilen, verurteilen', def: 'to form an opinion about somebody' },
    { en: 'responsibility', de: 'die Verantwortung', def: 'a duty to take care of somebody or something' },
    { en: 'argument', de: 'der Streit; das Argument', def: 'an angry discussion between people who disagree' },
    { en: 'make up', de: 'sich versöhnen', def: 'to become friends again after an argument' },
    { en: 'lifelong', de: 'lebenslang', def: 'lasting for your whole life' },
    { en: 'friendship', de: 'die Freundschaft', def: 'the relationship between friends' },
    { en: 'clique', de: 'die Clique', def: 'a small group of friends that does not let others join easily' },
    { en: 'bond', de: 'die Bindung, das Band', def: 'a strong feeling that connects people' },
    { en: 'have in common', de: 'gemeinsam haben', def: 'to share the same interests or qualities' },
    { en: 'attitude', de: 'die Einstellung, Haltung', def: 'the way you think and feel about something' },
    { en: 'company', de: 'die Gesellschaft; die Firma', def: 'being with another person' },
    { en: 'peer', de: 'der/die Gleichaltrige', def: 'a person of the same age or group as you' },
    { en: 'peer group pressure', de: 'der Gruppenzwang', def: 'the feeling that you must do the same as people of your age' },
    { en: 'get along with', de: 'auskommen mit, sich verstehen mit', def: 'to have a friendly relationship with somebody' },
    { en: 'treat', de: 'behandeln', def: 'to behave towards somebody in a certain way' },
    { en: 'respect', de: 'der Respekt; respektieren', def: 'a feeling that somebody is good and important' },
    { en: 'bullying', de: 'das Mobbing', def: 'hurting or frightening a weaker person again and again' },
    { en: 'well-being', de: 'das Wohlbefinden', def: 'feeling healthy and happy' },
    { en: 'stranger', de: 'der/die Fremde', def: 'a person you do not know' },
    { en: 'bump into', de: 'zufällig treffen', def: 'to meet somebody by chance' },
    { en: 'chance meeting', de: 'die zufällige Begegnung', def: 'a meeting that was not planned' },
    { en: 'compulsory', de: 'verpflichtend, Pflicht-', def: 'something you must do because of a rule or law' },
    { en: 'education', de: 'die Bildung, Ausbildung', def: 'the process of teaching and learning, especially at school' },
    { en: 'primary education', de: 'die Volksschulbildung', def: 'education for children from about 6 to 10 or 11' },
    { en: 'secondary education', de: 'die Sekundarbildung (Mittelschule, AHS …)', def: 'education for children from about 10 or 11 to 18' },
    { en: 'catch up (with)', de: 'aufholen; sich austauschen (was es Neues gibt)', def: 'to talk to somebody about what has happened since you last met' },
    { en: 'hit it off', de: 'sich auf Anhieb verstehen', def: 'to like each other immediately' },
    { en: 'get on well (with)', de: 'sich gut verstehen (mit)', def: 'to have a good relationship with somebody' },
    { en: 'keep / stay in touch', de: 'in Kontakt bleiben', def: 'to continue to write, phone or meet somebody' },
    { en: 'meet up (with)', de: 'sich treffen (mit)', def: 'to meet somebody, usually as planned' },
    { en: 'get to know each other better', de: 'einander besser kennenlernen', def: 'to learn more about each other' }
  ];

  var DE = 'Übersetze ins Englische.';
  var EN = 'Übersetze ins Deutsche.';
  var DEF = 'Welches Wort passt zur Definition?';
  var GAP = 'Tippe das passende Wort / den Ausdruck in der richtigen Form.';

  // ---------- German → English
  add('vocab', 'vocab-family', [
    { p: 'der Haushalt', i: DE, a: ['household', 'a household', 'the household'], y: "household = all the people living in one home.", x: { housework: "'housework' = Hausarbeit. Haushalt → household.", house: "'house' = Haus. Haushalt → household." } },
    { p: 'das Einzelkind', i: DE, a: ['only child', 'an only child'], y: "an only child = a child without siblings.", x: { 'single child': "The English word is 'only child'.", 'one child': "The English word is 'only child'." } },
    { p: 'das Geschwister(teil)', i: DE, a: ['sibling', 'a sibling', 'siblings'], y: "sibling = brother or sister.", x: { sister: "'sibling' means brother OR sister." } },
    { p: 'der Altersunterschied', i: DE, a: ['age gap', 'an age gap', 'age difference'], y: "age gap = Altersunterschied.", x: { 'age different': "age gap / age difference." } },
    { p: 'das Elternhaus', i: DE, a: ['parental home', 'parents\' home', "parents' house"], y: "parental home = where your parents live.", x: { 'parents house': "Possessive: parents' home – or the vocab word: parental home." } },
    { p: 'der/die Erwachsene', i: DE, a: ['adult', 'an adult', 'grown-up', 'a grown-up'], y: "adult = a fully grown person.", x: {} },
    { p: 'die Alleinerzieherfamilie', i: DE, a: ['single-parent family', 'single parent family', 'a single-parent family', 'one-parent family'], y: "single-parent family.", x: {} },
    { p: 'die Scheidung', i: DE, a: ['divorce', 'a divorce', 'the divorce'], y: "divorce (noun) / get divorced (verb).", x: { separation: "'separation' = Trennung. Scheidung → divorce." } },
    { p: 'die Trennung (eines Paares)', i: DE, a: ['separation', 'a separation', 'the separation'], y: "separation = when a couple live apart.", x: { divorce: "'divorce' = Scheidung. Trennung → separation." } },
    { p: 'die Patchworkfamilie / Stieffamilie', i: DE, a: ['stepfamily', 'step-family', 'step family', 'a stepfamily', 'blended family', 'patchwork family'], y: "stepfamily.", x: {} },
    { p: 'das Stiefgeschwister', i: DE, a: ['stepsibling', 'step-sibling', 'step sibling', 'a stepsibling', 'stepsiblings'], y: "stepsibling = no parent in common.", x: { 'half-sibling': "half-sibling = Halbgeschwister (one parent in common)." } },
    { p: 'das Halbgeschwister', i: DE, a: ['half-sibling', 'half sibling', 'a half-sibling', 'half-siblings'], y: "half-sibling = one parent in common.", x: { stepsibling: "stepsibling = Stiefgeschwister (no parent in common)." } },
    { p: 'im Alter von', i: DE, a: ['at the age of'], y: "at the age of + number.", x: { 'in the age of': "English: AT the age of.", 'with the age of': "English: AT the age of." } },
    { p: 'eine Familie gründen', i: DE, a: ['start a family', 'to start a family'], y: "start a family = have your first child.", x: { 'found a family': "English: START a family.", 'make a family': "English: START a family." } },
    { p: 'der/die Verwandte', i: DE, a: ['relative', 'a relative', 'relation', 'a relation'], y: "relative = family member.", x: { related: "'related' is an adjective. The noun is 'relative'." } }
  ]);

  add('vocab', 'vocab-chores', [
    { p: 'die Hausarbeiten erledigen', i: DE, a: ['do the chores', 'to do the chores', 'do the housework', 'do chores'], y: "DO the chores / DO the housework.", x: { 'make the chores': "Collocation: DO the chores." } },
    { p: 'sich kümmern um (z. B. ein Baby)', i: DE, a: ['look after', 'to look after', 'take care of', 'care for'], y: "look after = take care of.", x: { 'look for': "'look for' = suchen. Sich kümmern → look after." } },
    { p: 'der gerechte Anteil', i: DE, a: ['fair share', 'a fair share', 'your fair share'], y: "fair share.", x: {} },
    { p: 'die Hausarbeit', i: DE, a: ['housework', 'the housework'], y: "housework (uncountable – no plural!).", x: { homework: "'homework' = Hausübung. Hausarbeit → housework.", houseworks: "'housework' has no plural." } },
    { p: 'die Kinderbetreuung', i: DE, a: ['childminding', 'childcare', 'child care', 'babysitting'], y: "childminding / childcare.", x: {} },
    { p: 'der Abwasch', i: DE, a: ['washing-up', 'the washing-up', 'washing up', 'the washing up'], y: "the washing-up (BrE).", x: { dishes: "In the vocab list: the washing-up." } },
    { p: 'kleine Reparaturen', i: DE, a: ['small repairs'], y: "small repairs.", x: {} },
    { p: 'die Verantwortung', i: DE, a: ['responsibility', 'responsibilities', 'the responsibility'], y: "responsibility.", x: { responsible: "'responsible' is the adjective. Noun → responsibility." } }
  ]);

  add('vocab', 'vocab-feelings', [
    { p: 'zufrieden', i: DE, a: ['contented', 'content', 'satisfied'], y: "contented = happy and satisfied.", x: {} },
    { p: 'sicher, geborgen (Gefühl)', i: DE, a: ['secure', 'safe'], y: "secure = feeling safe and protected.", x: { sure: "'sure' = sicher im Sinn von 'überzeugt'. Geborgen → secure." } },
    { p: 'das Gefühl, die Emotion', i: DE, a: ['emotion', 'an emotion', 'feeling', 'a feeling'], y: "emotion / feeling.", x: {} },
    { p: 'einander im Stich lassen', i: DE, a: ['let each other down', 'to let each other down', 'let one another down'], y: "let each other down.", x: { 'let down each other': "With a pronoun: let each other DOWN (down at the end)." } },
    { p: 'die Spannung (zwischen Menschen)', i: DE, a: ['tension', 'tensions'], y: "tension.", x: {} },
    { p: 'sich zerstreiten (mit)', i: DE, a: ['fall out', 'fall out with', 'to fall out', 'to fall out with'], y: "fall out (with sb).", x: {} },
    { p: 'der Hass', i: DE, a: ['hatred', 'hate'], y: "hatred (noun).", x: { hated: "'hated' is the past of 'hate'. Noun → hatred." } },
    { p: 'das Geheimnis', i: DE, a: ['secret', 'a secret'], y: "secret.", x: {} },
    { p: '(be)urteilen, verurteilen', i: DE, a: ['judge', 'to judge'], y: "judge.", x: {} },
    { p: 'der Streit', i: DE, a: ['argument', 'an argument', 'fight', 'quarrel', 'a quarrel', 'a fight'], y: "argument = Streit (and also Argument).", x: { arguement: "Spelling: argument (no e after u)." } },
    { p: 'sich versöhnen', i: DE, a: ['make up', 'to make up', 'make it up'], y: "make up (after an argument).", x: {} }
  ]);

  add('vocab', 'vocab-friendship', [
    { p: 'lebenslang', i: DE, a: ['lifelong', 'life-long'], y: "lifelong (e.g. a lifelong friendship).", x: {} },
    { p: 'die Freundschaft', i: DE, a: ['friendship', 'a friendship'], y: "friendship.", x: { friendshipp: "Spelling: friendship." } },
    { p: 'die Clique', i: DE, a: ['clique', 'a clique'], y: "clique.", x: {} },
    { p: 'die Bindung, das Band (zwischen Menschen)', i: DE, a: ['bond', 'a bond'], y: "bond.", x: {} },
    { p: 'gemeinsam haben', i: DE, a: ['have in common', 'to have in common', 'have something in common'], y: "have (a lot) in common.", x: {} },
    { p: 'die Einstellung, Haltung', i: DE, a: ['attitude', 'an attitude'], y: "attitude.", x: { attitute: "Spelling: attitude." } },
    { p: 'die Gesellschaft (z. B. ich genieße deine ___)', i: DE, a: ['company'], y: "company = being with somebody.", x: { society: "'society' = Gesellschaft im Sinne von alle Menschen. Jemandes Gesellschaft → company." } },
    { p: 'der/die Gleichaltrige', i: DE, a: ['peer', 'a peer', 'peers'], y: "peer.", x: {} },
    { p: 'der Gruppenzwang', i: DE, a: ['peer group pressure', 'peer pressure'], y: "peer (group) pressure.", x: {} },
    { p: 'auskommen mit, sich verstehen mit', i: DE, a: ['get along with', 'to get along with', 'get on with', 'get on well with'], y: "get along with sb.", x: {} },
    { p: 'behandeln', i: DE, a: ['treat', 'to treat'], y: "treat sb well/badly.", x: {} },
    { p: 'der Respekt', i: DE, a: ['respect'], y: "respect.", x: {} },
    { p: 'das Mobbing', i: DE, a: ['bullying'], y: "bullying (to bully = mobben).", x: { mobbing: "In English 'Mobbing' is called bullying." } },
    { p: 'das Wohlbefinden', i: DE, a: ['well-being', 'wellbeing', 'well being'], y: "well-being.", x: {} },
    { p: 'sich auf Anhieb verstehen', i: DE, a: ['hit it off', 'to hit it off'], y: "hit it off.", x: {} },
    { p: 'sich gut verstehen (mit)', i: DE, a: ['get on well', 'get on well with', 'to get on well', 'to get on well with', 'get along well', 'get along well with'], y: "get on well (with).", x: {} }
  ]);

  add('vocab', 'vocab-meeting', [
    { p: 'der/die Fremde', i: DE, a: ['stranger', 'a stranger'], y: "stranger = a person you don't know.", x: { foreigner: "'foreigner' = Ausländer. A person you don't know → stranger.", strange: "'strange' = seltsam. Noun → stranger." } },
    { p: 'zufällig treffen', i: DE, a: ['bump into', 'to bump into', 'run into'], y: "bump into sb.", x: {} },
    { p: 'die zufällige Begegnung', i: DE, a: ['chance meeting', 'a chance meeting'], y: "chance meeting.", x: {} },
    { p: 'in Kontakt bleiben', i: DE, a: ['keep in touch', 'stay in touch', 'to keep in touch', 'to stay in touch'], y: "keep / stay in touch.", x: { 'keep in contact': "In the vocab list: keep/stay in touch." } },
    { p: 'sich treffen (mit Freunden)', i: DE, a: ['meet up', 'to meet up', 'meet up with'], y: "meet up (with).", x: {} },
    { p: 'einander besser kennenlernen', i: DE, a: ['get to know each other better', 'to get to know each other better'], y: "get to know each other better.", x: {} },
    { p: 'sich austauschen, was es Neues gibt', i: DE, a: ['catch up', 'to catch up', 'catch up with'], y: "catch up (with sb).", x: {} }
  ]);

  add('vocab', 'vocab-school', [
    { p: 'verpflichtend, Pflicht-', i: DE, a: ['compulsory', 'obligatory', 'mandatory'], y: "compulsory (e.g. compulsory education).", x: {} },
    { p: 'die Bildung', i: DE, a: ['education'], y: "education.", x: {} },
    { p: 'die Volksschulbildung', i: DE, a: ['primary education'], y: "primary education.", x: {} },
    { p: 'die Sekundarbildung (ab 10 Jahren)', i: DE, a: ['secondary education'], y: "secondary education.", x: {} }
  ]);

  // ---------- English → German (several answers accepted)
  add('vocab', 'vocab-family', [
    { p: 'sibling', i: EN, a: ['Geschwister', 'Geschwisterteil', 'Bruder oder Schwester', 'Geschwisterkind'], y: "sibling = Geschwister(teil).", x: {} },
    { p: 'only child', i: EN, a: ['Einzelkind'], y: "only child = Einzelkind.", x: {} },
    { p: 'relative', i: EN, a: ['Verwandter', 'Verwandte', 'der Verwandte', 'die Verwandte', 'Verwandte/r'], y: "relative = Verwandte/r.", x: {} },
    { p: 'divorce', i: EN, a: ['Scheidung', 'die Scheidung', 'sich scheiden lassen', 'scheiden'], y: "divorce = Scheidung.", x: { trennung: "Trennung = separation. divorce = Scheidung." } },
    { p: 'adult', i: EN, a: ['Erwachsener', 'Erwachsene', 'der Erwachsene', 'erwachsen'], y: "adult = Erwachsene/r.", x: {} },
    { p: 'household', i: EN, a: ['Haushalt', 'der Haushalt'], y: "household = Haushalt.", x: {} },
    { p: 'contented', i: EN, a: ['zufrieden'], y: "contented = zufrieden.", x: {} },
    { p: 'hatred', i: EN, a: ['Hass', 'der Hass'], y: "hatred = Hass.", x: {} },
    { p: 'compulsory', i: EN, a: ['verpflichtend', 'Pflicht', 'obligatorisch', 'verpflichtend, Pflicht-', 'pflicht-'], y: "compulsory = verpflichtend.", x: {} },
    { p: 'bullying', i: EN, a: ['Mobbing', 'das Mobbing'], y: "bullying = Mobbing.", x: {} },
    { p: 'stranger', i: EN, a: ['Fremder', 'Fremde', 'der Fremde', 'die Fremde', 'Unbekannter'], y: "stranger = Fremde/r.", x: { ausländer: "Ausländer = foreigner. stranger = Fremde/r." } },
    { p: 'peer group pressure', i: EN, a: ['Gruppenzwang', 'der Gruppenzwang', 'Gruppendruck'], y: "peer group pressure = Gruppenzwang.", x: {} },
    { p: 'well-being', i: EN, a: ['Wohlbefinden', 'das Wohlbefinden', 'Wohlergehen'], y: "well-being = Wohlbefinden.", x: {} },
    { p: 'hit it off', i: EN, a: ['sich auf Anhieb verstehen', 'sich sofort verstehen', 'sich auf Anhieb gut verstehen', 'sich sofort gut verstehen'], y: "hit it off = sich auf Anhieb verstehen.", x: {} },
    { p: 'bump into somebody', i: EN, a: ['zufällig treffen', 'jemanden zufällig treffen', 'jemandem zufällig begegnen', 'zufällig begegnen'], y: "bump into = zufällig treffen.", x: {} }
  ]);

  // ---------- Definition → word
  add('vocab', 'vocab-family', [
    { p: 'a child who has no brothers or sisters', i: DEF, a: ['only child', 'an only child'], y: "only child.", x: { sibling: "A sibling IS a brother or sister." } },
    { p: 'a brother or a sister', i: DEF, a: ['sibling', 'a sibling'], y: "sibling.", x: {} },
    { p: 'the difference in age between two people', i: DEF, a: ['age gap', 'an age gap', 'age difference'], y: "age gap.", x: {} },
    { p: 'a person who is fully grown (18 or older)', i: DEF, a: ['adult', 'an adult', 'grown-up'], y: "adult.", x: {} },
    { p: 'the legal end of a marriage', i: DEF, a: ['divorce', 'a divorce'], y: "divorce.", x: { separation: "separation = living apart. The LEGAL end → divorce." } },
    { p: 'a brother or sister who has only ONE parent in common with you', i: DEF, a: ['half-sibling', 'half sibling', 'a half-sibling'], y: "half-sibling.", x: { stepsibling: "A stepsibling has NO parent in common with you." } },
    { p: 'the child of your stepfather or stepmother (no parent in common)', i: DEF, a: ['stepsibling', 'step-sibling', 'a stepsibling'], y: "stepsibling.", x: { 'half-sibling': "A half-sibling shares ONE parent." } },
    { p: 'a member of your family, e.g. an aunt or a cousin', i: DEF, a: ['relative', 'a relative', 'relation'], y: "relative.", x: {} },
    { p: 'all the people who live together in one home', i: DEF, a: ['household', 'a household'], y: "household.", x: {} },
    { p: 'to have your first child', i: DEF, a: ['start a family', 'to start a family'], y: "start a family.", x: {} },
    { p: 'a family in which only one parent looks after the children', i: DEF, a: ['single-parent family', 'single parent family', 'a single-parent family', 'one-parent family'], y: "single-parent family.", x: {} }
  ]);
  add('vocab', 'vocab-chores', [
    { p: 'washing the plates, glasses and cutlery after a meal', i: DEF, a: ['washing-up', 'the washing-up', 'washing up'], y: "the washing-up.", x: {} },
    { p: 'to take care of somebody, e.g. a little brother', i: DEF, a: ['look after', 'to look after', 'take care of'], y: "look after.", x: { 'look for': "'look for' = suchen." } },
    { p: 'a duty to take care of somebody or something', i: DEF, a: ['responsibility', 'a responsibility'], y: "responsibility.", x: {} },
    { p: 'looking after children while their parents are at work', i: DEF, a: ['childminding', 'childcare', 'babysitting'], y: "childminding.", x: {} }
  ]);
  add('vocab', 'vocab-feelings', [
    { p: 'an angry discussion between people who disagree', i: DEF, a: ['argument', 'an argument', 'quarrel', 'a quarrel'], y: "argument.", x: {} },
    { p: 'to become friends again after an argument', i: DEF, a: ['make up', 'to make up'], y: "make up.", x: { 'fall out': "fall out = sich zerstreiten (the opposite)." } },
    { p: 'to argue with somebody and stop being friends', i: DEF, a: ['fall out', 'to fall out', 'fall out with'], y: "fall out (with).", x: { 'make up': "make up = sich versöhnen (the opposite)." } },
    { p: 'something that you do not tell other people', i: DEF, a: ['secret', 'a secret'], y: "secret.", x: {} },
    { p: 'happy and satisfied with your life', i: DEF, a: ['contented', 'content'], y: "contented.", x: {} },
    { p: 'a very strong feeling of not liking somebody at all', i: DEF, a: ['hatred', 'hate'], y: "hatred.", x: {} },
    { p: 'a nervous, unfriendly feeling between people', i: DEF, a: ['tension', 'tensions'], y: "tension.", x: {} }
  ]);
  add('vocab', 'vocab-friendship', [
    { p: 'a small group of friends who do not let others join easily', i: DEF, a: ['clique', 'a clique'], y: "clique.", x: {} },
    { p: 'to like each other immediately', i: DEF, a: ['hit it off', 'to hit it off'], y: "hit it off.", x: {} },
    { p: 'a person of the same age or social group as you', i: DEF, a: ['peer', 'a peer'], y: "peer.", x: {} },
    { p: 'the feeling that you must behave like other people of your age', i: DEF, a: ['peer group pressure', 'peer pressure'], y: "peer (group) pressure.", x: {} },
    { p: 'hurting or frightening a weaker person again and again', i: DEF, a: ['bullying'], y: "bullying.", x: {} },
    { p: 'feeling healthy, comfortable and happy', i: DEF, a: ['well-being', 'wellbeing'], y: "well-being.", x: {} },
    { p: 'lasting for your whole life', i: DEF, a: ['lifelong', 'life-long'], y: "lifelong.", x: {} },
    { p: 'the way you think and feel about something', i: DEF, a: ['attitude', 'an attitude'], y: "attitude.", x: {} },
    { p: 'a strong feeling that connects two people', i: DEF, a: ['bond', 'a bond'], y: "bond.", x: {} }
  ]);
  add('vocab', 'vocab-meeting', [
    { p: 'a person you do not know', i: DEF, a: ['stranger', 'a stranger'], y: "stranger.", x: {} },
    { p: 'to meet somebody by chance', i: DEF, a: ['bump into', 'to bump into', 'run into'], y: "bump into.", x: {} },
    { p: 'a meeting that was not planned', i: DEF, a: ['chance meeting', 'a chance meeting'], y: "chance meeting.", x: {} },
    { p: 'to continue writing, phoning or meeting somebody', i: DEF, a: ['keep in touch', 'stay in touch', 'to keep in touch', 'to stay in touch'], y: "keep / stay in touch.", x: {} }
  ]);
  add('vocab', 'vocab-school', [
    { p: 'something that you must do because of a law or rule', i: DEF, a: ['compulsory', 'obligatory', 'mandatory'], y: "compulsory.", x: {} },
    { p: 'school for children from about 6 to 10 = ____ education', i: DEF, a: ['primary'], y: "primary education = Volksschule.", x: { secondary: "secondary = from about 10 to 18." } },
    { p: 'school for children from about 10 to 18 = ____ education', i: DEF, a: ['secondary'], y: "secondary education.", x: { primary: "primary = from about 6 to 10." } }
  ]);

  // ---------- Sentences with gaps (correct form!)
  var PV = "Phrasal verbs: change only the verb for the tense – the small word stays.";
  add('vocab', 'phrasal-verbs', [
    { p: 'Yesterday I ____ (bump into) my old teacher at the supermarket.', i: GAP, a: ['bumped into', 'ran into'], y: "Past simple (yesterday): bump → bumped into.", x: { 'bump into': "Yesterday → past simple: bumped into.", 'bumped in': "The phrasal verb is bump INTO." } },
    { p: 'My best friend and I ____ (fall out) last week, but now everything is fine again.', i: GAP, a: ['fell out'], y: "fall – fell – fallen → fell out.", x: { 'falled out': "fall is irregular: fell.", 'felt out': "felt = past of feel. fall → fell." } },
    { p: 'We had a big argument, but we ____ (make up) the next day.', i: GAP, a: ['made up'], y: "make – made → made up.", x: { 'maked up': "make is irregular: made." } },
    { p: 'When I was ten, my grandma ____ (look after) me every afternoon.', i: GAP, a: ['looked after', 'used to look after', 'would look after'], y: "Past habit: looked after / used to look after.", x: { 'looked for': "'look for' = suchen. Sich kümmern → look after." } },
    { p: 'Lena and I met at a party and ____ (hit it off) immediately.', i: GAP, a: ['hit it off'], y: "hit – hit – hit (no change!) → hit it off.", x: { 'hitted it off': "hit is irregular: hit – hit – hit." } },
    { p: 'My brother and I ____ (get on well) – we hardly ever argue.', i: GAP, a: ['get on well', 'get along well'], y: "Present simple (general fact): we get on well.", x: { 'gets on well': "'we' → get (no -s)." } },
    { p: 'Do you ____ (get along with) your stepsister?', i: GAP, a: ['get along with', 'get on with', 'get on well with'], y: "Do + you + V1: get along with.", x: { 'got along with': "After 'do' comes V1." } },
    { p: "Let's ____ (keep in touch) when you move to Vienna!", i: GAP, a: ['keep in touch', 'stay in touch'], y: "Let's + V1.", x: {} },
    { p: 'After the summer holidays we ____ (meet up) to talk about our trips.', i: GAP, a: ['met up'], y: "meet – met – met → met up.", x: { 'meeted up': "meet is irregular: met." } },
    { p: "I haven't seen Anna for ages – we need to ____ (catch up)!", i: GAP, a: ['catch up'], y: "need to + V1: catch up.", x: { 'catch on': "catch UP = sich austauschen." } },
    { p: 'Good friends never ____ (let each other down).', i: GAP, a: ['let each other down', 'let one another down'], y: "Present simple, plural subject: let each other down.", x: { 'let down each other': "The pronoun goes in the middle: let each other down." } },
    { p: 'I am sure you will ____ (get to know each other better) during the trip.', i: GAP, a: ['get to know each other better'], y: "will + V1.", x: {} },
    { p: 'They ____ (fall out) because of a silly secret, but they made up soon after.', i: GAP, a: ['fell out'], y: "Past simple: fell out.", x: { 'fallen out': "fallen = V3. Past simple → fell out." } }
  ]);

  add('vocab', 'vocab-family', [
    { p: "I don't have any brothers or sisters. I'm an ____.", i: GAP, a: ['only child'], y: "an only child.", x: { 'single child': "The word is 'only child'." } },
    { p: 'My sister is 16 and I am 10, so there is an ____ of six years between us.', i: GAP, a: ['age gap', 'age difference'], y: "age gap.", x: {} },
    { p: 'She left her ____ home at the age of nineteen and moved to Vienna.', i: GAP, a: ['parental'], y: "parental home = Elternhaus.", x: { parents: "Use the adjective: parental home." } },
    { p: 'After their ____, my parents sold the house. (Scheidung)', i: GAP, a: ['divorce'], y: "divorce (noun).", x: { divorced: "After 'their' you need a noun → divorce." } },
    { p: 'My parents got ____ when I was six.', i: GAP, a: ['divorced', 'separated'], y: "get divorced = sich scheiden lassen.", x: { divorce: "get + -ed: got divorced." } },
    { p: 'Tom is my ____: we have the same dad, but different mums.', i: GAP, a: ['half-brother', 'half brother', 'half-sibling', 'half sibling'], y: "One parent in common → half-brother / half-sibling.", x: { stepbrother: "A stepbrother has NO parent in common with you." } },
    { p: 'My mum married again, so now I live in a ____ with two stepsisters.', i: GAP, a: ['stepfamily', 'step-family', 'step family', 'patchwork family', 'blended family'], y: "stepfamily.", x: {} },
    { p: 'My grandpa started working ____ the age of fourteen.', i: GAP, a: ['at'], y: "AT the age of.", x: { in: "Fixed phrase: AT the age of.", with: "Fixed phrase: AT the age of." } },
    { p: 'Many people want to ____ a family before they are thirty.', i: GAP, a: ['start'], y: "start a family.", x: { found: "Collocation: START a family.", make: "Collocation: START a family." } },
    { p: 'In our ____ there are five people and two cats.', i: GAP, a: ['household', 'family'], y: "household = all people living in one home.", x: { housework: "housework = Hausarbeit." } },
    { p: 'At Christmas all our ____ come to visit – aunts, uncles, cousins …', i: GAP, a: ['relatives', 'relations'], y: "relatives (plural).", x: { relative: "Plural (all … come) → relatives.", parents: "parents = Eltern. Aunts, uncles, cousins → relatives." } },
    { p: 'My cousin is eighteen, so he is an ____ now.', i: GAP, a: ['adult'], y: "an adult = 18 or older.", x: {} },
    { p: 'In a ____ family, only one parent looks after the children.', i: GAP, a: ['single-parent', 'single parent', 'one-parent'], y: "single-parent family.", x: {} }
  ]);

  add('vocab', 'vocab-chores', [
    { p: 'In our family, everybody has to ____ the chores.', i: GAP, a: ['do'], y: "DO the chores.", x: { make: "Collocation: DO the chores." } },
    { p: 'It is not fair! I always do the ____ after dinner, and my brother never washes a single plate.', i: GAP, a: ['washing-up', 'washing up'], y: "the washing-up.", x: {} },
    { p: 'Everybody should do their fair ____ of the housework.', i: GAP, a: ['share'], y: "fair share.", x: {} },
    { p: "My dad does small ____, like fixing the bike or changing light bulbs.", i: GAP, a: ['repairs'], y: "small repairs.", x: {} },
    { p: 'Cleaning, cooking and washing are all ____. (Hausarbeit)', i: GAP, a: ['housework'], y: "housework (uncountable).", x: { homework: "homework = Hausübung.", houseworks: "No plural: housework." } },
    { p: 'Looking after a pet is a big ____.', i: GAP, a: ['responsibility'], y: "responsibility (noun).", x: { responsible: "After 'a big' you need a noun → responsibility." } },
    { p: 'My aunt does ____ for three families – she looks after their kids in the afternoon.', i: GAP, a: ['childminding', 'childcare', 'babysitting'], y: "childminding.", x: {} }
  ]);

  add('vocab', 'vocab-feelings', [
    { p: 'I have a very happy life. I feel ____ and loved. (zufrieden)', i: GAP, a: ['contented', 'content'], y: "contented = zufrieden.", x: {} },
    { p: 'Children need to feel ____ at home. (geborgen)', i: GAP, a: ['secure', 'safe'], y: "secure = sicher, geborgen.", x: {} },
    { p: 'There was a lot of ____ at home before my parents separated.', i: GAP, a: ['tension', 'tensions'], y: "tension = Spannung.", x: {} },
    { p: "Promise you won't tell anyone – it's a ____.", i: GAP, a: ['secret'], y: "a secret.", x: {} },
    { p: "Don't ____ people by their clothes.", i: GAP, a: ['judge'], y: "judge = beurteilen.", x: {} },
    { p: 'My sister and I had a terrible ____ about the bathroom this morning.', i: GAP, a: ['argument', 'fight', 'row'], y: "have an argument = streiten.", x: { arguement: "Spelling: argument." } },
    { p: 'It is OK to show your ____ – crying is nothing to be ashamed of.', i: GAP, a: ['emotions', 'feelings'], y: "emotions (plural).", x: { emotion: "'your …' here = all your feelings → emotions." } },
    { p: 'Love can sometimes turn into ____. (Hass)', i: GAP, a: ['hatred', 'hate'], y: "hatred.", x: {} }
  ]);

  add('vocab', 'vocab-friendship', [
    { p: 'Anna and I have been friends since kindergarten. It is a real ____ friendship.', i: GAP, a: ['lifelong', 'life-long'], y: "lifelong friendship.", x: {} },
    { p: 'We both love horses and hate maths – we have a lot in ____.', i: GAP, a: ['common'], y: "have a lot in common.", x: {} },
    { p: 'In our class there is a ____ of four girls who never talk to anybody else.', i: GAP, a: ['clique'], y: "clique.", x: { click: "Spelling: clique." } },
    { p: 'There is a strong ____ between my grandma and me.', i: GAP, a: ['bond'], y: "bond.", x: {} },
    { p: 'He has a very positive ____ towards school.', i: GAP, a: ['attitude'], y: "attitude.", x: {} },
    { p: 'I really enjoy my grandpa\'s ____ – he tells the best stories.', i: GAP, a: ['company'], y: "enjoy sb's company.", x: { society: "Somebody's company = Gesellschaft." } },
    { p: 'Many teenagers smoke because of ____ group pressure.', i: GAP, a: ['peer'], y: "peer group pressure.", x: {} },
    { p: 'Treat others with ____ – the way you want to be treated.', i: GAP, a: ['respect'], y: "with respect.", x: {} },
    { p: 'Our school has a strict policy against ____. Nobody should be hurt or laughed at.', i: GAP, a: ['bullying'], y: "bullying = Mobbing.", x: { mobbing: "English: bullying." } },
    { p: 'Sport and enough sleep are important for your ____. (Wohlbefinden)', i: GAP, a: ['well-being', 'wellbeing'], y: "well-being.", x: {} },
    { p: 'A good friend ____ you with respect and never laughs at you.', i: GAP, a: ['treats'], y: "treat (he/she → treats).", x: { treat: "'A good friend' = he/she → treats." } },
    { p: 'At school, we spend most of our time with our ____ – people of our own age.', i: GAP, a: ['peers'], y: "peers.", x: { peer: "Plural: peers." } }
  ]);

  add('vocab', 'vocab-meeting', [
    { p: "Never get into a car with a ____ – somebody you don't know.", i: GAP, a: ['stranger'], y: "stranger.", x: { foreigner: "'foreigner' = Ausländer." } },
    { p: 'We met by accident at the station. It was a ____ meeting.', i: GAP, a: ['chance'], y: "a chance meeting = zufällige Begegnung.", x: {} },
    { p: "We've kept in ____ since primary school.", i: GAP, a: ['touch'], y: "keep in touch.", x: { contact: "The vocab phrase is 'keep in touch' (in contact is also English, but the phrase here is touch)." } },
    { p: "Let's meet ____ for coffee on Saturday.", i: GAP, a: ['up'], y: "meet up.", x: {} },
    { p: 'The trip was great – we got to ____ each other much better.', i: GAP, a: ['know'], y: "get to know each other.", x: {} }
  ]);

  add('vocab', 'vocab-school', [
    { p: 'In Austria, school is ____ for nine years – you must go.', i: GAP, a: ['compulsory', 'obligatory', 'mandatory'], y: "compulsory.", x: {} },
    { p: 'A good ____ helps you to find a good job. (Bildung)', i: GAP, a: ['education'], y: "education.", x: {} },
    { p: 'Children in Austria start ____ education at the age of six.', i: GAP, a: ['primary'], y: "primary education = Volksschule.", x: { secondary: "Secondary starts at about ten." } },
    { p: 'After primary school, pupils go on to ____ education.', i: GAP, a: ['secondary'], y: "secondary education.", x: {} }
  ]);

  /* Make/do prompts and other checks happen in app.js. */
})();
