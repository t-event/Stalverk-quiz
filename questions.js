// Spørsmålsbank for Stålverket – Smelteprøven.
// Typer:
//   standard (flervalg): { q, a: [riktig, feil, feil, ...], e, p }  – riktig svar står alltid først, stokkes ved visning
//   tf (sant/usant):      { t: 'tf', q, ans: true|false, e, p }
//   num (regnestykke):    { t: 'num', q, ans, tol, unit, e, p }
//   order (rekkefølge):   { t: 'order', q, items: [i riktig rekkefølge], e, p }
// h: 1 = vanskelig spørsmål, vises bare på nivået «Erfaren».
// p = sidetall i kompendiet.

const ZONES = [
  {
    id: 'kjemi',
    name: 'Kjemi-grunnkurset',
    icon: '⚗️',
    pages: 's. 7–16',
    facts: [
      'Antall <b>protoner</b> bestemmer grunnstoffet.',
      'Tre sterke bindinger: <b>kovalent</b> (deler elektroner), <b>ionebinding</b> (gir/tar elektroner, f.eks. NaCl) og <b>metallbinding</b> (elektronsky rundt positive ioner).',
      '<b>Eksoterm</b> = gir fra seg varme. <b>Endoterm</b> = krever varme (f.eks. smelting).',
      '<b>Le Chatelier:</b> økt temperatur skyver en endoterm reaksjon mot høyre. Økt trykk skyver mot siden med færrest mol gass.',
      'Pulver reagerer fortere enn en klump fordi overflaten er større.',
      'CaO gjør slaggen <b>basisk</b>, SiO₂ gjør den <b>sur</b>. B2 = %CaO / %SiO₂.'
    ],
    qs: [
      { q: 'Hva er det som bestemmer hvilket grunnstoff et atom er?', a: ['Antall protoner', 'Antall nøytroner', 'Antall elektroner i ytterste skall', 'Hvor tungt atomet er'], e: 'Antall protoner i kjernen bestemmer grunnstoffet. Det er dette periodesystemet til Mendeleev er ordnet etter.', p: 8 },
      { q: 'Hvilken binding får vi når atomer deler elektroner og danner elektronpar?', a: ['Kovalent binding', 'Ionebinding', 'Metallbinding', 'Magnetisk binding'], e: 'I en kovalent binding (elektronparbinding) deler atomene på elektroner. Den er vanlig mellom atomer i gasser, f.eks. F₂ og CO₂.', p: 9 },
      { h: 1, q: 'Hva avgjør hvilken type binding et grunnstoff lager med andre atomer?', a: ['Elektronegativiteten', 'Temperaturen', 'Antall nøytroner', 'Trykket'], e: 'Elektronegativiteten sier hvor hardt kjernen holder på elektronene sine. Grunnstoffer med lav elektronegativitet gir lett fra seg elektroner.', p: 9 },
      { h: 1, q: 'Oktettregelen sier at atomer helst vil ha hvor mange elektroner i ytterste skall?', a: ['8', '2', '6', '18'], e: 'Atomer vil helst ha åtte elektroner i ytterste skall. Unntaket er det innerste skallet, som bare har plass til to.', p: 9 },
      { q: 'Vanlig bordsalt (NaCl) holdes sammen av …', a: ['ionebindinger', 'kovalente bindinger', 'metallbindinger', 'hydrogenbindinger'], e: 'Klor har høyere elektronegativitet og tar elektronet fra natrium. Na⁺ og Cl⁻ tiltrekker hverandre.', p: 10 },
      { h: 1, q: 'Hvordan beskrives en metallbinding?', a: ['Positive metallioner i en sky av elektroner', 'To atomer som deler ett elektronpar', 'Et positivt og et negativt ion som tiltrekker hverandre', 'Molekyler som henger sammen med magnetisme'], e: 'Metallatomene gir elektroner til «fellesskapet». De positive ionene holdes sammen av den negative elektronskyen.', p: 11 },
      { q: 'En reaksjon som produserer varme kalles …', a: ['eksoterm', 'endoterm', 'katalytisk', 'isolert'], e: 'Eksoterme reaksjoner gir fra seg varme, f.eks. forbrenning. Endoterme reaksjoner krever varme.', p: 11 },
      { t: 'tf', q: 'Smelting og fordampning er eksempler på endoterme reaksjoner.', ans: true, e: 'Både smelting og fordampning krever tilført energi.', p: 12 },
      { h: 1, q: 'Omtrent hvor mange enheter (atomer/molekyler) er 1 mol?', a: ['6,022 · 10²³', '6,022 · 10¹²', '1 000 000', '12'], e: '1 mol er 602 214 076 000 000 000 000 000 enheter. Tallet er definert ut fra 12 gram karbon.', p: 12 },
      { h: 1, q: 'Boudouard-reaksjonen: C + CO₂ ⇌ 2 CO (krever varme). Hva skjer når temperaturen øker?', a: ['Likevekten går mot høyre, og vi får mer CO', 'Likevekten går mot venstre, og vi får mer CO₂', 'Ingenting, en likevekt påvirkes ikke av temperatur', 'All CO forsvinner'], e: 'Reaksjonen er endoterm, så økt temperatur skyver den mot høyre (mer CO). Ved ca. 800 °C er CO og CO₂ i likevekt.', p: 13 },
      { h: 1, q: 'Hvilken vei går Boudouard-reaksjonen (C + CO₂ ⇌ 2 CO) når trykket økes?', a: ['Mot venstre, siden med færrest mol gass', 'Mot høyre, siden med flest mol gass', 'Den stopper helt', 'Den påvirkes ikke'], e: 'Økt trykk skyver likevekten mot siden med færrest mol gass. Her er det 1 mol CO₂ mot 2 mol CO, så vi får mer CO₂ og C.', p: 13 },
      { h: 1, q: 'Hva gjør en katalysator med en likevektsreaksjon?', a: ['Hjelper reaksjonen å nå likevekt fortere uten å endre likevekten', 'Flytter likevekten mot høyre', 'Brukes opp i reaksjonen', 'Stopper reaksjonen'], e: 'En katalysator deltar uten å bli forbrukt. Den endrer ikke likevekten, men gjør at den nås raskere.', p: 13 },
      { q: 'Hvorfor reagerer et stoff i pulverform fortere enn en klump av samme stoff?', a: ['Pulveret har mye større overflate', 'Pulveret er varmere', 'Pulveret har flere protoner', 'Klumpen er mer basisk'], e: 'Atomer må treffe hverandre for å reagere. I en klump er det bare det ytterste laget som kan reagere.', p: 14 },
      { h: 1, q: 'Et lukket system kan …', a: ['utveksle varme, men ikke masse, med omgivelsene', 'utveksle både varme og masse', 'verken utveksle varme eller masse', 'bare utveksle masse'], e: 'Lukket = kun varme. Åpent = varme og masse. Isolert = ingenting.', p: 7 },
      { q: 'Hvilket stoff gjør slaggen basisk?', a: ['Brent kalk (CaO)', 'SiO₂', 'P₂O₅', 'Al₂O₃'], e: 'Brent kalk gjør slaggen basisk, mens SiO₂ gjør den sur.', p: 15 },
      { q: 'Hvordan regnes basisiteten B2 ut?', a: ['%CaO / %SiO₂', '%CaO / (%SiO₂ + %Al₂O₃)', '%SiO₂ / %CaO', '%MgO / %CaO'], e: 'B2 = %CaO / %SiO₂. B3 tar også med Al₂O₃ i nevneren.', p: 15 },
      { h: 1, q: 'I teorien gir mange lange oksidkjeder en slagg som er …', a: ['tyktflytende', 'tyntflytende', 'magnetisk', 'gjennomsiktig'], e: 'Lange oksidkjeder gir tyktflytende slagg, korte kjeder gir tyntflytende. CaO bryter opp kjedene.', p: 15 },
      { h: 1, t: 'tf', q: 'I praksis opplever vi at kalktilsats gjør slaggen tykkere, selv om CaO i teorien bryter opp oksidkjeder.', ans: true, e: 'Dette har med temperaturen og smeltepunktet til slaggen å gjøre.', p: 15 }
    ]
  },
  {
    id: 'lab',
    name: 'Laben',
    icon: '🔬',
    pages: 's. 17–21',
    facts: [
      '<b>Stålprøver</b> analyseres med <b>OES</b> (gnistspektroskopi). <b>Slaggprøver</b> analyseres med <b>XRF</b> (røntgen).',
      'OES: prøven gnistes, lyset deles opp i et diffraksjonsgitter, og intensiteten gir mengden av hvert element.',
      'Gnistekammeret fylles med <b>argon</b>. Prøveflaten skal være flat og litt ru.',
      'XRF klarer ikke de <b>lette elementene</b> godt: Li, Be, Na, Mg, Al, Si og P.',
      'Slaggmynt: slagg fra temperaturstaven knuses, blandes med bindemiddel og presses.'
    ],
    qs: [
      { q: 'Hvilken analysemetode brukes på slaggprøvene?', a: ['XRF (røntgenfluorescens)', 'OES (gnistspektroskopi)', 'Lysmikroskop', 'Magnettest'], e: 'Slaggprøvene analyseres i XRF-laben. Stålprøvene analyseres med OES.', p: 17 },
      { q: 'Hvilken analysemetode brukes på stålprøver fra tapping, øseovn og utstøpning?', a: ['OES (optisk emisjonsspektroskopi)', 'XRF', 'Håndholdt skrapanalysator', 'Titrering'], e: 'Strenglaben og øseovnslaben bruker gnistspektroskopi (OES). Metoden er rask og presis.', p: 17 },
      { q: 'Hvilken prøve er det som sendes videre til kunden?', a: ['Sluttprøven fra utstøpningen', 'Slaggprøven fra stålovnen', 'Første prøve på øseovnen', 'Smelteprøven fra stålovnen'], e: 'Sluttprøvene tas under utstøpning og er analysen kunden får.', p: 17 },
      { h: 1, q: 'Hva fanger spektrometeret opp i en OES-analyse?', a: ['Lys (bølgelengder) som sendes ut fra prøven etter gnisten', 'Røntgenstråling som reflekteres', 'Lyden av gnisten', 'Vekten av prøven før og etter'], e: 'Lyset deles opp i et diffraksjonsgitter. Hvert element har sitt eget emisjonsspekter, og intensiteten viser mengden.', p: 18 },
      { q: 'Hvilken gass fylles kammeret med når gnistene tas?', a: ['Argon', 'Nitrogen', 'Oksygen', 'CO₂'], e: 'Kammeret fylles med argon. Prøven må dekke hullet over elektroden helt, så det ikke slipper inn luft.', p: 19 },
      { q: 'Hvordan skal prøveflaten være før OES-analyse?', a: ['Flat og litt ru', 'Speilblank og polert', 'Bølgete', 'Dekket av olje'], e: 'Flat, så det ikke kommer inn luft, og litt ru, så lyset kan spre seg. Et slitt slipebånd gir en for polert flate.', p: 19 },
      { h: 1, q: 'Hvordan prepareres prøven på strenglaben?', a: ['Pusses med sandpapir/slipebånd', 'Freses', 'Knuses til pulver', 'Varmes opp'], e: 'På øseovnslaben freses prøven, mens den pusses med slipebånd på strenglaben.', p: 19 },
      { t: 'tf', q: 'Kjører du samme prøve på nytt, får du nøyaktig samme resultat som første gang.', ans: false, e: 'Overflaten freses på nytt og er ikke den samme. Begge resultatene er likevel gyldige, siden variasjonen ligger innenfor labens standardavvik.', p: 19 },
      { h: 1, q: 'Hva skjer med atomene i en XRF-analyse?', a: ['Elektroner flytter seg og sender ut karakteristisk stråling når de faller tilbake', 'Atomene smelter og sender ut lys', 'Kjernen deler seg', 'Atomene blir magnetiske'], e: 'Røntgenstråling gjør at elektroner «hopper». Når de faller tilbake, sender de ut stråling som er unik for hvert grunnstoff.', p: 19 },
      { h: 1, q: 'Hvilket av disse elementene er vanskelig å analysere med XRF?', a: ['Magnesium (Mg)', 'Jern (Fe)', 'Kobber (Cu)', 'Nikkel (Ni)'], e: 'Lette elementer (Li, Be, Na, Mg, Al, Si, P) er vanskelige. Strålingen deres er så svak at den ikke alltid når fram til detektoren.', p: 20 },
      { h: 1, q: 'Hvorfor er lette elementer vanskelige å måle med XRF?', a: ['Strålingen deres har så lav energi at den ikke alltid når detektoren og blandes med bakgrunnsstøy', 'De er radioaktive', 'De fordamper i prøvepressen', 'De er magnetiske'], e: 'Få protoner og elektroner gir elektroner med lavt energinivå. Den frigitte energien trenger ikke gjennom luften og forsvinner i støyen.', p: 20 },
      { h: 1, q: 'Hvordan lages en slaggmynt til XRF?', a: ['Slagg knuses til pulver, blandes med bindemiddel og presses i en hydraulisk presse', 'Slaggen smeltes og støpes i en form', 'Slaggen freses flat', 'Slaggen løses i vann'], e: 'Mynten må være solid uten hulrom for at resultatet skal bli troverdig.', p: 21 },
      { q: 'Hvor kommer slaggbitene til analyse vanligvis fra?', a: ['Rester på temperaturstaven etter en temperaturprøve', 'Slaggropa under stålovnen', 'Hvitslaggbingen', 'Kappkibba'], e: 'Slaggrestene som sitter igjen på temperaturstaven knuses i en mølle.', p: 21 }
    ]
  },
  {
    id: 'elektroder',
    name: 'Elektroder & lysbue',
    icon: '⚡',
    pages: 's. 22–24',
    facts: [
      'Elektrodene er nesten ren <b>grafitt</b>, fordamper ved ca. 3000 °C og er sprø.',
      'En elektrode = <b>tre biter</b> som skrues sammen med koniske, gjengede <b>nipler</b>. Klembakken må aldri klemme i nippelområdet.',
      'Slitasje: <b>sideoksidasjon ~½</b> (reduseres med spraykjøling), <b>tippfordamping ~¼</b> og <b>tippbrudd ~¼</b>.',
      'Lysbuen er 10 000–30 000 °C i midten. Vekselstrøm gjør at den slukker og tennes flere titalls ganger i sekundet.',
      '<b>Overslag</b> = strømmen går andre veier enn ned i badet, f.eks. gjennom støv, vann eller sprut. Det kan gi vannlekkasje.'
    ],
    qs: [
      { q: 'Hva er elektrodene på stål- og øseovnen laget av?', a: ['Grafitt (karbon)', 'Kobber', 'Wolfram', 'Magnesitt'], e: 'Elektrodene er omtrent ren grafitt. Den er veldig sprø og knekker lett ved sammenstøt.', p: 22 },
      { h: 1, q: 'Ved omtrent hvilken temperatur fordamper grafittelektrodene?', a: ['3000 °C', '1500 °C', '800 °C', '10 000 °C'], e: 'Grafitten fordamper ved rundt 3000 °C. Det er derfor tippen slites der lysbuen er.', p: 22 },
      { q: 'Hvordan er en elektrode bygget opp?', a: ['Tre biter som skrues sammen med koniske, gjengede nipler', 'Én lang, massiv stang', 'Seks biter som sveises sammen', 'To biter som limes'], e: 'Niplene er koniske i begge ender og smelter ut i gjengene når elektroden er i bruk.', p: 22 },
      { q: 'Hvilket område på elektroden må klembakken unngå?', a: ['Nippelområdet (skjøtene mellom bitene)', 'Midt på en elektrodebit', 'Ingen områder, den kan klemme hvor som helst'], e: 'Skjøtene med nipler er svakest og mest utsatt for brudd.', p: 22 },
      { h: 1, q: 'Hvem bygger elektrodene på elektrodebyggeplassen?', a: ['Produksjonsservice', 'Harsco', 'Mekanisk avdeling', 'Skrapklasserne'], e: 'Produksjonsservice bygger elektrodene. Den utskiftede elektroden bygges på med en ny nippel og en ny bit i toppen.', p: 22 },
      { h: 1, q: 'Hvordan beregnes elektrodeforbruket på stålovnen?', a: ['Med varetelling etter hver månedsslutt', 'Ved å veie hver elektrode etter hver charge', 'Ved å måle lysbuen', 'Fra strømforbruket'], e: 'Lagerbeholdning + varemottak − det som er igjen. Forbruket i kg/t omfatter både slitasje og brudd.', p: 23 },
      { q: 'Hvilken slitasje står for omtrent halvparten av elektrodeforbruket?', a: ['Sideoksidasjon', 'Tippfordamping', 'Tippbrudd', 'Nippelbrudd ved bygging'], e: 'Sideoksidasjon: oksygen reagerer med den glødende elektroden. Den kan reduseres med spraykjøling med vann.', p: 23 },
      { h: 1, q: 'Hvordan kan sideoksidasjonen av elektrodene reduseres?', a: ['Med elektrodekjøling (spraykjøling med vann)', 'Med mer oksygen', 'Med kortere elektroder', 'Med høyere strøm'], e: 'Spraykjøling holder elektroden kaldere, så mindre karbon brenner bort.', p: 23 },
      { h: 1, q: 'Omtrent hvor stor del av forbruket står tippfordamping og tippbrudd for, hver for seg?', a: ['Ca. 1/4 hver', 'Ca. 1/2 hver', 'Ca. 1/10 hver', 'Nesten ingenting'], e: 'Sideoksidasjon ~½, tippfordamping ~¼ og tippbrudd ~¼.', p: 23 },
      { q: 'Hvor varm er lysbuen i midten?', a: ['10 000–30 000 °C', '1600–1800 °C', '3000–4000 °C', '800–1200 °C'], e: 'Det er energien i lysbuen som smelter skrapet.', p: 23 },
      { h: 1, q: 'Hvorfor slukker og tennes lysbuen flere titalls ganger i sekundet?', a: ['Vi bruker vekselstrøm, så anode og katode bytter plass', 'Elektrodene kjøles med vann', 'Slaggen dekker den', 'Skrapet beveger seg'], e: 'Med vekselstrøm bytter elektroden og stålet på å være anode og katode. Lysbuen slukker mellom hvert skifte.', p: 23 },
      { q: 'Hva er et overslag?', a: ['Strømmen fra elektrodene går andre veier enn ned i stålbadet', 'Slaggen koker over', 'Elektroden knekker', 'Stål spruter ut av slaggdøra'], e: 'Strømmen kan gå gjennom støv, urent vann, metallstøv eller sprut og ut i stein, mantel, hvelv eller overdel.', p: 24 },
      { h: 1, q: 'Hvorfor støvsuges hvelvet under vedlikeholdsstanser?', a: ['For å redusere faren for overslag i støvet', 'For å spare elektroder', 'For å øke strålevarmen', 'For å få bedre slaggprøver'], e: 'Metallstøv leder strøm og kan gi overslag.', p: 24 },
      { q: 'Hva er den alvorligste følgen av et overslag i vannkjølte elementer (paneler, hvelv, conveyor)?', a: ['Vannlekkasje som kan kreve akutt stans', 'Litt mer elektrodeslitasje', 'Lavere P i stålet', 'Mørkere slagg'], e: 'Den ekstreme varmen kan brenne hull på vannkjølte elementer. Vann i et stålbad er livsfarlig.', p: 24 },
      { h: 1, t: 'tf', q: 'Vi har sett flere overslag etter at vi skrudde opp vannkjølingen på elektrodene.', ans: true, e: 'Mer vannkjøling reduserer elektrodeforbruket, men har gitt flere overslag.', p: 24 }
    ]
  },
  {
    id: 'metallurgi',
    name: 'Metallurgi & krystaller',
    icon: '💎',
    pages: 's. 25–28',
    facts: [
      '<b>Austenitt = FCC</b> (atomer midt på hver flate). Har mest plass til karbon. Ikke magnetisk.',
      '<b>Ferritt = BCC</b> (ett atom midt i kuben). Magnetisk.',
      '<b>Martensitt</b> dannes ved bråkjøling. Har BCT-struktur og nålestruktur, er metastabil og veldig hard på grunn av indre spenninger.',
      'Defekter: substitusjonelt atom, <b>interstitielt atom</b> (f.eks. C i jern), vakans (hull), presipitater, porer, kantdislokasjon og korngrense.',
      'Legeringselementer og sporelementer samler seg lettest på korngrensene.'
    ],
    qs: [
      { q: 'Hvilken gitterstruktur har austenitt?', a: ['FCC (flatesentrert kubisk)', 'BCC (romsentrert kubisk)', 'Heksagonal', 'BCT'], e: 'Austenitt er FCC: Fe-atomer i hvert hjørne og midt på hver flate.', p: 25 },
      { q: 'Hvilken gitterstruktur har ferritt?', a: ['BCC (romsentrert kubisk)', 'FCC (flatesentrert kubisk)', 'Heksagonal', 'Amorf'], e: 'Ferritt er BCC: Fe-atomer i hvert hjørne og ett i midten av kuben.', p: 25 },
      { q: 'Hvilken struktur kan løse mest karbon?', a: ['FCC (austenitt)', 'BCC (ferritt)', 'Begge løser like mye', 'Ingen av dem løser karbon'], e: 'FCC har større åpninger mellom jernatomene, så det er plass til flere karbonatomer.', p: 25 },
      { q: 'Hvordan dannes martensitt?', a: ['Ved bråkjøling, f.eks. når en varm prøve senkes i vann', 'Ved langsom avkjøling i luft', 'Ved å tilsette mye kalk', 'Ved å varme stål til 3000 °C'], e: 'Avkjølingen er så rask at jern- og karbonatomene ikke rekker å flytte seg.', p: 26 },
      { h: 1, q: 'Hvilken gitterstruktur har martensitt?', a: ['BCT (romsentrert tetragonal)', 'FCC', 'BCC', 'Heksagonal'], e: 'BCT dannes ut fra to FCC-celler ved siden av hverandre når austenitt bråkjøles.', p: 26 },
      { h: 1, q: 'Hvordan kjenner du igjen martensitt i mikroskopet?', a: ['På den karakteristiske nålestrukturen', 'På sebrastriper', 'På store, runde korn', 'Den er helt svart'], e: 'Nålestrukturen er typisk. Sebrastriper (lameller) er perlitt.', p: 26 },
      { q: 'Hvorfor er martensitt hardere enn stål med samme kjemi som er kjølt sakte?', a: ['Strukturen er påtvunget og full av indre spenninger', 'Den inneholder mer karbon', 'Den har større korn', 'Den er magnetisk'], e: 'Den «påtvungne» strukturen gir mye indre spenninger og gjør stålet hardere.', p: 26 },
      { h: 1, t: 'tf', q: 'Martensitt er en metastabil fase. Over lang tid vil strukturen bli mer og mer lik BCC.', ans: true, e: 'Atomene får tid til å flytte seg til posisjoner med mindre spenning.', p: 26 },
      { h: 1, q: 'Karbonatomer som ligger i mellomrommene i et jerngitter er et eksempel på …', a: ['interstitielle atomer', 'substitusjonelle atomer', 'vakanser', 'kantdislokasjoner'], e: 'Et interstitielt atom er lite nok til å få plass mellom atomene i gitteret.', p: 28 },
      { q: 'Hva er en vakans?', a: ['Et hull i gitteret der det mangler et atom', 'Et atom av et annet grunnstoff', 'En gassboble', 'En rad med atomer som stopper midt i krystallen'], e: 'Atomene rundt hullet trekker seg litt sammen og gir strekk i gitteret.', p: 28 },
      { h: 1, q: 'Et atom av et annet grunnstoff som tar plassen til et jernatom i gitteret kalles …', a: ['substitusjonelt atom', 'interstitielt atom', 'presipitat', 'vakans'], e: 'Mindre atomer gir strekk i gitteret, større atomer gir sammenpressing.', p: 27 },
      { h: 1, q: 'Hva er en kantdislokasjon?', a: ['En rad med atomer som ikke går gjennom hele krystallen', 'Et hull i gitteret', 'En samling urenheter', 'Grensen mellom to korn'], e: 'Raden stopper underveis og gir både strekk og sammenpressing i gitteret.', p: 28 },
      { h: 1, q: 'Hvorfor legger legerings- og sporelementer seg lettest på korngrensene?', a: ['Atomene der er bundet mer uregelmessig enn midt i kornet', 'Korngrensene er varmere', 'Korngrensene er magnetiske', 'Det er mer oksygen der'], e: 'Atomene har ulik orientering fra korn til korn. Overgangen blir uregelmessig, og der samler segregeringer seg lettere.', p: 28 }
    ]
  },
  {
    id: 'skrap',
    name: 'Skraplageret',
    icon: '🧲',
    pages: 's. 29–38',
    facts: [
      '<b>100 %</b> av jern- og ståltilførselen i ovnen er skrap. Maks stykkvekt er <b>500 kg</b>.',
      '<b>8 skrapklasser.</b> De to siste sifrene i dungenummeret gir skraptypen: <b>09</b> HMS · <b>11</b> A3 · <b>13</b> Saksklipp/LR · <b>14</b> Shredder · <b>16</b> Spon · <b>409</b> Korg · <b>115</b> Skoller · <b>17</b> Råjern/støpejern.',
      '<b>Spon</b> er ofte kilde til <b>Mo</b>. <b>Råjern</b> kan være kilde til <b>S</b>. LR = <b>Low Residual</b> (lite sporelementer).',
      'Sporelementer kan <b>ikke</b> fjernes i stålverket. Er nivået for høyt, må chargen mikses («tynnes ut»).',
      'Alt skrap kjøres gjennom <b>radioaktivitetsportalen</b> før bilvekta. Harsco screener med magnet.',
      'Manganstål (>11 % Mn) er austenittisk (FCC) ned til romtemperatur og derfor <b>umagnetisk</b>. Det går til korg.'
    ],
    qs: [
      { q: 'Hvor stor andel av jern- og ståltilførselen i stålovnen er stålskrap?', a: ['100 %', '50 %', '75 %', '90 %'], e: '7 Steel er Norges største gjenvinningsbedrift. Alt jern og stål vi tilfører ovnen er skrap.', p: 29 },
      { q: 'Hva er maks stykkvekt på skrap vi tar imot?', a: ['500 kg', '50 kg', '1 tonn', '5 tonn'], e: 'Leveringsbetingelsene sier at stykkvekten ikke skal være over 500 kg.', p: 29 },
      { q: 'Hvordan skal beholdere og tanker i skrapet være?', a: ['Åpne i begge ender', 'Tette og tomme', 'Fylt med vann', 'Lukket med lokk'], e: 'Tette beholdere kan eksplodere i ovnen. De skal være åpne i begge ender.', p: 29 },
      { q: 'Hvor mange skrapklasser har skraplageret?', a: ['8', '3', '12', '20'], e: 'Åtte skrapklasser, og noen av dem har flere kvaliteter for finsortering.', p: 30 },
      { h: 1, q: 'Hva forteller de to siste sifrene i et dungenummer?', a: ['Skraptypen', 'Hvilken leverandør skrapet kommer fra', 'Hvor mange tonn det er i dungen', 'Hvilket år skrapet kom'], e: 'Det første sifferet sier bare hvor dungen ligger (med noen unntak). De to siste sifrene gir skraptypen.', p: 30 },
      { q: 'Hvilken skraptype ligger i dunger som slutter på -09 (109, 209, 309)?', a: ['HMS', 'A3', 'Spon', 'Shredder'], e: 'HMS: store skrapbiter. Det er skraptypen vi bruker mest og oftest.', p: 31 },
      { q: 'Hvilken skraptype ligger i dunger som slutter på -16 (216, 416)?', a: ['Spon', 'Shredder', 'Saksklipp', 'Skoller'], e: 'Spon er finbearbeidet skrap. Det ruster lett og er ofte kilde til molybden.', p: 31 },
      { q: 'Hva ligger i dunge 409?', a: ['Korgskrap', 'Spon', 'Råjern prime', 'Kjøpt LR'], e: '409 er korg: ukurant skrap som ikke kan kjøres i conveyoren, og umagnetisk skrap. Merk at 409 er et unntak fra regelen om at -09 betyr HMS.', p: 31 },
      { q: 'Hva ligger i dunge 115?', a: ['Skoller', 'Spon', 'A3', 'Korg'], e: '115 = skoller: stålrester fra egen produksjon som Harsco har bearbeidet.', p: 31 },
      { q: 'Hva står LR for i LR-skrap?', a: ['Low Residual: lite sporelementer', 'Large Rocks: store biter', 'Light Rust: lite rust', 'Long Rods: lange stenger'], e: 'LR-skrap har lite sporelementer og brukes i resepten til kvaliteter med strenge analysekrav.', p: 31 },
      { q: 'Hvilken skraptype er ofte kilde til molybden (Mo)?', a: ['Spon', 'HMS', 'Skoller', 'Råjern'], e: 'Spon brukes aldri i resepten til kvaliteter med krevende krav til sporelementer og/eller CE2.', p: 32 },
      { q: 'Hvilken skraptype kan være kilde til svovel (S)?', a: ['Råjern', 'Skoller', 'Shredder', 'LR, kjøpt'], e: 'Råjern har nesten null sporelementer, men kan inneholde svovel. Kutt det ut hvis kvaliteten har lave S-krav.', p: 33 },
      { q: 'Hvilken skraptype brukes til å fylle opp conveyoren mellom store skrapbiter (HMS, A3)?', a: ['Shredder', 'Skoller', 'Korg', 'Råjern'], e: 'Shredder er grovbearbeidet, lettsmeltet og som oftest fin i kjemi.', p: 32 },
      { h: 1, q: 'Hva er det dyreste skrapet vi kjøper inn?', a: ['Pig iron prime (spesialråjern)', 'Kjøpt LR', 'HMS', 'Spon'], e: 'Pig iron prime kommer som utstøpte skiver. Kjøpt LR er det nest dyreste.', p: 33 },
      { h: 1, q: 'A3-skrap fra hav- og oljeindustrien på Sørvestlandet kan ofte inneholde mye …', a: ['Cr og Ni', 'P og S', 'Al og Si', 'B og Ti'], e: 'A3 er grovt og tungsmeltet HMS-skrap. Det tas analyse av det ved mottak.', p: 31 },
      { h: 1, q: 'Hvor mye karbon har støpejern per definisjon?', a: ['Over 2 %', 'Over 0,3 %', 'Over 0,8 %', 'Over 11 %'], e: 'Støpejern har mer enn 2 % C. Alt under regnes som stål.', p: 33 },
      { h: 1, q: 'Hvorfor er manganstål (over 11 % Mn) umagnetisk?', a: ['Mn holder austenitt (FCC) stabil helt ned til romtemperatur', 'Mn fjerner alt jern', 'Det er dekket av rust', 'Det er radioaktivt'], e: 'FCC er ikke magnetisk. Magnetkrana får det ikke opp, så det må kjøres i korg.', p: 38 },
      { h: 1, q: 'Hvor stort skal armeringsnett klippes før det lastes i korg?', a: ['Ca. 1 × 1 m', 'Ca. 10 × 10 cm', 'Ca. 3 × 3 m', 'Det skal ikke klippes'], e: 'Det står i SAI-3343 (Oppklipping av armeringsnett for lasting av korg).', p: 38 },
      { q: 'Hva må skje med alt skrap før det kjøres over bilvekta?', a: ['Det kjøres gjennom portalen for radioaktiv stråling', 'Det spyles med vann', 'Det kjøres gjennom screening', 'Det analyseres med OES'], e: 'Gjelder skrap fra båt, bil og egen produksjon. Gir portalen utslag, letes lasten gjennom med en håndholdt måler.', p: 34 },
      { q: 'Hva gjør Harsco under screening av skrap?', a: ['Sorterer ut umagnetisk materiale med magnet', 'Smelter skrapet', 'Maler skrapet', 'Tar OES-prøver'], e: 'Vekten før og etter brukes til å anslå finstoff og umagnetisk andel i hele båtlasten.', p: 35 },
      { q: 'Analysen viser for mye kobber (Cu) og tinn (Sn) i chargen. Hva gjør vi?', a: ['Mikser chargen med andre charger («tynner ut»)', 'Blåser mer oksygen', 'Tilsetter mer kalk', 'Slagger av to ganger'], e: 'Kobber og tinn får vi ikke fjernet i prosessen. Eneste løsning er å tynne ut.', p: 35 },
      { h: 1, q: 'Når gjøres en nullstilling av en skrapdunge?', a: ['Så fort enten SAP-lageret eller det fysiske lageret går tomt', 'En gang i året', 'Etter hver charge', 'Når en båt kommer'], e: 'SAP viser mindre enn det fysiske lageret, fordi fukt og finstoff er trukket fra. Nullstillingen gjør dem like.', p: 36 },
      { h: 1, q: 'Kvaliteten har strenge krav til sporelementer. Hva gjør vi med resepten?', a: ['Kutter ut spon og tilsetter LR-skrap', 'Tilsetter mer spon', 'Bruker bare A3', 'Tilsetter mer råjern'], e: 'Spon er ofte kilde til Mo og andre sporelementer, mens LR har lite av dem.', p: 37 },
      { h: 1, q: 'Hvorfor blandes tungsmeltet skrap som skoller og A3 med spon og shredder?', a: ['For å utnytte energien bedre og forbedre forvarmingen', 'For å senke prisen', 'Fordi spon har lite sporelementer', 'For å gjøre skrapet magnetisk'], e: 'Stor stykkstørrelse krever mye energi. Lettsmeltet skrap gir bedre energieffekt og forvarming i conveyoren.', p: 37 },
      { t: 'order', q: 'Sett stasjonene i den rekkefølgen stålet går gjennom verket:', items: ['Skraplageret', 'Conveyoren', 'Stålovnen', 'Tapping', 'Øseovnen', 'Strengen'], e: 'Skrap → conveyor (forvarming) → stålovn (smelting) → tapping i øse → øseovn (finlegering) → strengen (utstøpning til emner).', p: 4 }
    ]
  },
  {
    id: 'conveyor',
    name: 'Conveyoren',
    icon: '🛤️',
    pages: 's. 39–40',
    facts: [
      'Conveyoren lar hvelvet bli liggende på, og det gir <b>mindre støv og røyk</b> enn korgkjøring.',
      'Forvarmingen gir ca. <b>10 % lavere strømforbruk</b> enn korg.',
      'Avgassen er ca. <b>800 °C</b>, men kan gå opp mot 1200 °C.',
      '<b>Static seal</b> hindrer falskluft fra øst.',
      '1 kasse = 1 charge ≈ <b>92 tonn</b>. Tett lasting gir lavere conveyorhastighet og bedre forvarming.',
      'Korg brukes etter lang stans (for å danne stålsump), til skrap over 0,5 × 0,5 × 1,5 m eller 500 kg, til umagnetisk skrap og til skrap som floker seg.'
    ],
    qs: [
      { t: 'tf', q: 'Kjøring med conveyor gir mindre støv og røyk enn korgkjøring, fordi hvelvet kan bli liggende på.', ans: true, e: 'Utslippene ledes tilbake gjennom forvarmingsdelen og ut i renseanlegget i stedet for ut i hallen.', p: 39 },
      { q: 'Omtrent hvor mye mindre strøm bruker stålovnen med conveyor enn med korg?', a: ['Ca. 10 %', 'Ca. 1 %', 'Ca. 50 %', 'Ingenting'], e: 'Forvarmingen gjør at skrapet trenger mindre energi for å smelte.', p: 39 },
      { h: 1, q: 'Hva er normal temperatur på avgassen fra stålovnen?', a: ['Rundt 800 °C (opp mot 1200 °C)', 'Rundt 200 °C', 'Rundt 1600 °C', 'Rundt 3000 °C'], e: 'Avgassen ledes gjennom forvarmingsdelen og varmer skrapet før den går til renseanlegget.', p: 39 },
      { h: 1, q: 'Hva er oppgaven til static seal?', a: ['Redusere falskluftinntak fra øst', 'Tette mellom ovn og øse', 'Kjøle hoodene', 'Veie skrapet'], e: 'Falskluft fra øst gir mer diffuse utslipp og kaldere luft i forvarmingen. Da blir forvarmingen dårligere og strømforbruket høyere.', p: 39 },
      { q: 'Hvorfor lastes første charge med korg etter en lang stans?', a: ['For å danne en stålsump som hjelper til med å smelte skrapet fra conveyoren', 'Fordi conveyoren er for kald', 'For å teste korgkrana', 'For å spare elektroder'], e: 'Stålsumpen hjelper til med å smelte skrapet som kommer inn med conveyoren.', p: 40 },
      { q: 'Hva er størrelsesgrensen for skrap som skal kjøres på conveyoren?', a: ['Maks 0,5 × 0,5 × 1,5 m og maks 500 kg', 'Maks 0,1 × 0,1 × 0,1 m og maks 10 kg', 'Maks 2 × 2 × 4 m og maks 5 tonn', 'Det finnes ingen grense'], e: 'Skrap som er større eller tyngre, legges til korgkjøring. Det samme gjelder umagnetisk skrap og skrap som floker seg.', p: 40 },
      { q: 'Hvor mye skrap er det omtrent i én skrapkasse (= én charge)?', a: ['Ca. 92 tonn', 'Ca. 9 tonn', 'Ca. 300 tonn', 'Ca. 30 tonn'], e: 'Kassene lastes etter resept for en bestemt kvalitet og tømmes én og én etter tur.', p: 40 },
      { q: 'Hva blir resultatet når skrapet lastes tett på conveyoren?', a: ['Lavere conveyorhastighet, lengre forvarming og mindre fukt inn i ovnen', 'Høyere conveyorhastighet', 'Mer is og snø i ovnen', 'Mer elektrodeslitasje'], e: 'Hastigheten styres av tonn inn og kWh. Tett lasting gjør at skrapet ligger lenger i forvarmingen.', p: 40 },
      { q: 'Hvorfor går lastingen tregere med «lett skrap» (tynne plater, hulrom)?', a: ['Magneten får dårligere kontakt, så hvert løft gir lite vekt', 'Det er radioaktivt', 'Det smelter på conveyoren', 'Det er for tungt'], e: 'Man bruker mye tid på å laste lite vekt, og lastingen havner på etterskudd.', p: 40 },
      { q: 'Hva kan skje hvis skrapet lastes for høyt på conveyoren?', a: ['Skrapbiter kan sette seg fast', 'Skrapet blir umagnetisk', 'Conveyoren går fortere', 'Ingenting'], e: 'Skrap som er lastet for høyt, kan sette seg fast flere steder på veien inn til ovnen, blant annet i forvarmingsdelen. Lastehøyden må derfor ikke bli for høy, selv om skrapet skal ligge tett.', p: 40 },
      { h: 1, q: 'Hvordan er hoodene i forvarmingsdelen bygget?', a: ['Vannkjølte og sprøytet med ildfastmasse', 'Av ren grafitt', 'Av tre', 'Uisolert stål'], e: 'Hoodene tåler avgass på rundt 800–1200 °C.', p: 39 }
    ]
  },
  {
    id: 'stalovn',
    name: 'Stålovnen',
    icon: '🔥',
    pages: 's. 41–48',
    facts: [
      'Tre karbonelektroder smelter skrapet. Slaggen <b>beskytter mot strøm</b>, <b>isolerer</b> og <b>samler fosfor</b>.',
      'Tilsatser: kalk, dolomitt (MgO skåner ildfasten), karbon (antrasitt og gummigranulat) for skumslagg, resirkulert magnesitt og oksygen.',
      '<b>Ellingham:</b> oksidet som ligger lavest er mest stabilt. Cu₂O og NiO er ustabile, så Cu og Ni blir i stålet.',
      'Lav FeO % = lite løst O = bedre inngang på legeringer. Lavkarbon gir høyere FeO.',
      'Mål: <b>B2 ≈ 1,8</b> og <b>B3 ≈ 1,25</b>. Høyere B gir stivere slagg.',
      '<b>Avfosforering:</b> P + O/FeO → P₂O₅, som bindes av CaO. Slagg av før temperaturen økes, ellers får du fosforbom!'
    ],
    qs: [
      { q: 'Hvor mange elektroder har stålovnen?', a: ['Tre', 'Én', 'To', 'Seks'], e: 'Strømmen tilføres med tre karbonelektroder.', p: 41 },
      { q: 'Hvilke oppgaver har slaggen i stålovnen?', a: ['Beskytter ovnen mot strøm, isolerer varmen og samler opp fosfor', 'Gjør stålet magnetisk', 'Tilsetter mangan', 'Kjøler elektrodene'], e: 'Fosforet fjernes til slutt ved avslagging.', p: 41 },
      { h: 1, q: 'Hvordan lages brent kalk?', a: ['Kalkstein (CaCO₃) brennes ved 1200–1300 °C, slik at CO₂ forsvinner', 'Dolomitt blandes med vann', 'CaO knuses til pulver', 'Kalk smeltes i stålovnen'], e: 'CaCO₃ + varme → CaO + CO₂. Det vi tilsetter er ca. 95 % CaO.', p: 42 },
      { q: 'Hvorfor er brent kalk farlig å få i øynene?', a: ['Den reagerer med fukt til lesket kalk og utvikler sterk varme', 'Den er radioaktiv', 'Den inneholder bly', 'Den er magnetisk'], e: 'CaO + H₂O → Ca(OH)₂ + varme. Skyll bort kalkstøv med en gang.', p: 42 },
      { q: 'Hvorfor tilsetter vi dolomitt i tillegg til kalk?', a: ['Den gir MgO, som reduserer slitasjen på ildfasten', 'Den gir mer fosfor', 'Den gjør slaggen sur', 'Den øker elektrodeforbruket'], e: 'Brent dolomitt har minst 30 % MgO og 55 % CaO. MgO er hovedmaterialet i ovnssteinen.', p: 42 },
      { q: 'Hva er hovedoppgaven til karbonet som tilsettes i stålovnen?', a: ['Reagere med oksygen til CO-gass som gir skummende slagg', 'Legere stålet i karbon', 'Gjøre slaggen sur', 'Kjøle stålbadet'], e: 'Skumslaggen beskytter lysbuen mellom elektrodene og stålbadet.', p: 42 },
      { h: 1, q: 'Hvilke karbontilsatser brukes i stålovnen?', a: ['Antrasitt og gummigranulat', 'Kun grafitt fra elektroder', 'Koks og trekull', 'Kalsiumkarbid'], e: 'Karbonet tilsettes både over tak og gjennom KT-lansene.', p: 42 },
      { h: 1, q: 'Hvordan leses et Ellingham-diagram, slik vi bruker det?', a: ['Oksidet som ligger lavest ved en gitt temperatur er mest stabilt og dannes først', 'Oksidet som ligger høyest dannes først', 'Alle oksider dannes samtidig', 'Det viser smeltepunkt'], e: 'Ca ligger lavest og reagerer først med oksygen. Cu₂O og NiO ligger øverst og er veldig ustabile.', p: 43 },
      { q: 'Hva skjer når vi blåser oksygen i en smelte med lite C, Si og Mn?', a: ['Mye av oksygenet brenner jern. FeO stiger og utbyttet synker', 'Oksygenet forsvinner ut i lufta', 'Stålet blir automatisk tettet', 'Fosforet går tilbake i stålet'], e: 'Elementene må treffe hverandre for å reagere. Med lite annet å brenne, er det jernet som oksideres.', p: 43 },
      { h: 1, q: 'Hvorfor er Cu og Ni så vanskelige å få ut av stålet?', a: ['Oksidene deres er ustabile, så metallene blir værende i stålet', 'De fordamper for fort', 'De binder seg til kalken', 'De er lette elementer'], e: 'Cu₂O → 2 Cu + O. Andre metaller tar oksygenet, og Cu og Ni havner i stålet. Det ender ofte med miksing.', p: 43 },
      { h: 1, q: 'Hva forteller lav FeO % i stålovnsslaggen oss?', a: ['Det er relativt lite løst oksygen i stålet, og legeringene får bedre inngang', 'Det er mye fosfor i stålet', 'Slaggen er sur', 'Elektrodene er slitt'], e: 'Lite oksygen betyr at legeringstilsatsene går i stålet og ikke i slaggen.', p: 44 },
      { h: 1, q: 'Hvorfor får lavkarbonkvaliteter høyere FeO % i slaggen?', a: ['Vi blåser mer oksygen på stålovnen', 'Vi tilsetter mindre kalk', 'Vi bruker mer spon', 'Vi tapper kaldere'], e: 'Mer oksygen for å få ned karbonet gir også mer FeO.', p: 44 },
      { h: 1, q: 'Hva er normale målverdier for B2 og B3 på stålovnen?', a: ['B2 ≈ 1,8 og B3 ≈ 1,25', 'B2 ≈ 0,5 og B3 ≈ 0,2', 'B2 ≈ 5 og B3 ≈ 4', 'B2 ≈ 1,25 og B3 ≈ 1,8'], e: 'B2 = CaO/SiO₂ og B3 = CaO/(SiO₂ + Al₂O₃).', p: 45 },
      { q: 'Hva skjer med slaggen når B2 eller B3 øker?', a: ['Den blir stivere', 'Den blir mer flytende', 'Den blir sur', 'Ingenting'], e: 'Jo høyere basisitet, desto stivere slagg.', p: 45 },
      { h: 1, t: 'num', q: 'En slaggprøve fra TP26 har 23,8 % CaO og 13,7 % SiO₂. Hva er B2? (to desimaler)', ans: 1.74, tol: 0.02, unit: '', e: 'B2 = 23,8 / 13,7 ≈ 1,74. Det er litt under målet på 1,8.', p: 44 },
      { h: 1, t: 'num', q: 'Samme prøve: 23,8 % CaO, 13,7 % SiO₂ og 5,7 % Al₂O₃. Hva er B3? (to desimaler)', ans: 1.23, tol: 0.02, unit: '', e: 'B3 = 23,8 / (13,7 + 5,7) = 23,8 / 19,4 ≈ 1,23. Nær målet på 1,25.', p: 45 },
      { h: 1, q: 'Rent CaO har et smeltepunkt over 2600 °C. Hvorfor smelter det likevel i ovnen?', a: ['Det blandes med andre stoffer, som SiO₂, og da synker smeltepunktet', 'Lysbuen er alltid 2600 °C i hele ovnen', 'Det reagerer med fosfor', 'Det smelter ikke'], e: 'Et blandet stoff har nesten alltid lavere smeltepunkt enn det rene stoffet.', p: 45 },
      { t: 'tf', q: 'Slagg og stål blander seg godt, omtrent som saft og vann.', ans: false, e: 'De oppfører seg som olje og vann. Slaggen legger seg på toppen hvis det ikke er kraftig omrøring.', p: 45 },
      { h: 1, q: 'I avfosforeringen havner fosforet til slutt bundet som …', a: ['kalsiumfosfat (bundet av CaO i slaggen)', 'FeS i stålet', 'P₂ gass', 'fosfor i elektrodene'], e: '2P + 5O → P₂O₅, som bindes av 3 CaO. Da er det vanskeligere for reaksjonen å gå tilbake.', p: 46 },
      { q: 'Hvorfor skal det slagges av FØR temperaturen økes før tapping?', a: ['Ellers kan fosforet reagere tilbake til stålet (fosforbom)', 'For å spare kalk', 'Fordi slaggen er magnetisk', 'For å øke FeO'], e: 'Ufullstendig avslagging betyr at det er for mye fosfor igjen i ovnen.', p: 47 },
      { h: 1, q: 'Kjører man stålovnen med både kalk og dolomitt, havner man i …', a: ['slaggstrategi 2', 'slaggstrategi 1', 'slaggstrategi 3', 'ingen strategi'], e: 'Bare brent kalk gir strategi 1, mens tilsats av dolomitt gir strategi 2. Strategi 2 er minst følsom for endringer i FeO.', p: 48 },
      { q: 'Hvorfor vil vi ikke ha med stålovnsslagg over til øseovnen?', a: ['Fosfor kan reagere tilbake, og oksygenet i slaggen spiser legeringene', 'Den er for kald', 'Den er for basisk', 'Den gjør stålet magnetisk'], e: 'Operatørene på øseovnen må da bruke lang tid og mye legering for å treffe kjemien.', p: 48 },
      { h: 1, t: 'order', q: 'Sett avfosforeringen i riktig rekkefølge:', items: ['P i stålet reagerer med O/FeO', 'P₂O₅ dannes og går opp i slaggen', 'CaO binder fosforet i slaggen', 'Avslagging fjerner fosforet fra ovnen'], e: 'Reaksjonene 12 og 13 skjer først, så binder CaO fosforet (reaksjon 14), og til slutt slagges det av.', p: 46 }
    ]
  },
  {
    id: 'tapping',
    name: 'Tapping',
    icon: '🫗',
    pages: 's. 48–49',
    facts: [
      'Temperaturfall i øsa: ca. <b>1,3 °C per minutt</b>.',
      'Det legges til ekstra temperatur for ny eller kald øse og for første eller siste charge i sekvensen.',
      'For kaldt stål gir skoller og dårlig spyling. For varmt stål sliter på ildfasten.',
      'Ved tapping: <b>FeSi + SiMn</b> starter tettingen, <b>kalk</b> bygger slagg for svovel, og Al-pyramider brukes på kvaliteter med lav Si-grense.',
      'Høykarbon bruker <b>lavnitrogen-kull</b> i stedet for antrasitt.',
      '<b>Koking:</b> C + O → CO-gass. Kan gi smell, sprut og brann. Drepersilo med FeSi demper.'
    ],
    qs: [
      { q: 'Hva er huskeregelen for temperaturfall i en øse som står i ro?', a: ['Ca. 1,3 °C per minutt', 'Ca. 13 °C per minutt', 'Ca. 0,1 °C per minutt', 'Ca. 5 °C per minutt'], e: 'Øseovnen kan ikke alltid ta imot øsa med en gang, så dette må regnes med.', p: 48 },
      { h: 1, t: 'num', q: 'Øsa må vente 20 minutter før øseovnen kan ta imot. Omtrent hvor mange grader faller temperaturen?', ans: 26, tol: 1, unit: '°C', e: '20 min × 1,3 °C/min = 26 °C.', p: 48 },
      { q: 'Når regnes det med ekstra temperatur ved tapping?', a: ['Ny eller kald øse, og første eller siste charge i sekvensen', 'Bare på fredager', 'Når det er lite kalk', 'Når elektrodene er nye'], e: 'Detaljene står i PRI-3628 (Levert temperatur til øseovnen).', p: 48 },
      { q: 'Hvorfor må stålet ikke tappes for varmt?', a: ['Det sliter mye fortere på ildfasten', 'Det gir mer fosfor', 'Legeringene smelter ikke', 'Øsa blir magnetisk'], e: 'Det må være varmt nok til å unngå skoller, men ikke så varmt at ildfasten slites unødig.', p: 48 },
      { q: 'Hvorfor tilsettes FeSi og SiMn ved tapping?', a: ['For å starte tettingen av stålet', 'For å øke fosforet', 'For å kjøle øsa', 'For å lage svartslagg'], e: 'Si og Mn reagerer med oksygenet i stålet, og tettingen starter allerede under tapping.', p: 49 },
      { q: 'Hvorfor tilsettes kalk (og noe dolomitt) ved tapping?', a: ['For å bygge en slagg som kan ta opp svovel på øseovnen', 'For å legere stålet i kalsium', 'For å øke karbonet', 'For å fjerne kobber'], e: 'Kalk gir et godt utgangspunkt for avsvovling på øseovnen.', p: 49 },
      { h: 1, q: 'Hva brukes i stedet for vanlig antrasitt ved tapping av høykarbonkvaliteter?', a: ['Lavnitrogen-kull', 'Kalsiumkarbid', 'Grafittelektroder', 'Ingenting'], e: 'Høykarbonkvalitetene har lav maksgrense på nitrogen.', p: 49 },
      { h: 1, q: 'På hvilke kvaliteter tilsettes aluminiumspyramider ved tapping?', a: ['Særlig kvaliteter med lav maksgrense på silisium', 'Alle kvaliteter', 'Kvaliteter med høyt fosfor', 'Kvaliteter med høyt kobber'], e: 'Al tetter stålet uten å gi mer Si.', p: 49 },
      { q: 'Hvilken gass får stålet til å «koke» i øsa?', a: ['CO-gass fra karbon som reagerer med oksygen', 'Argon', 'Nitrogen', 'Helium'], e: 'Koking kan komme av mye karbon, fukt eller vann, eller stålovnsslagg med høyt O-innhold.', p: 49 },
      { h: 1, q: 'Hva er drepersiloen?', a: ['En silo for raskt å tilsette f.eks. FeSi i øsa når den koker', 'En silo med kalk til stålovnen', 'Siloen til resirkulert magnesitt', 'En silo med sand til tappehullet'], e: 'Tilsatsen reagerer med oksygenet før karbonet gjør det, og gassdannelsen går ned.', p: 107 },
      { t: 'tf', q: 'Bevegelse i et stålbad (vogner, kraner) kan sette i gang en kokereaksjon.', ans: true, e: 'Derfor skal man alltid være forsiktig der øser med stål er i bevegelse.', p: 49 }
    ]
  },
  {
    id: 'oseovn',
    name: 'Øseovnen: tilsatser',
    icon: '🧪',
    pages: 's. 50–54',
    facts: [
      'Øseovnen <b>finlegerer</b> etter kundekrav og leverer riktig temperatur til strengen.',
      '<b>Trådmating</b> går rett ned i stålet og gir nøyaktig dosering.',
      'Grovkalk 30–60 mm (stålovn). Finkalk 5–25 mm (tapping og øseovn).',
      '<b>CaSi</b> (30 % Ca / 60 % Si) binder Al₂O₃ og hindrer groing. Brukes alltid når vi har brukt Al.',
      '<b>Alumet</b> og <b>flusspat (CaF₂)</b> tynner ut slaggen. CaF₂ er mest effektiv, men løser MgO fra øsesteinen.',
      '<b>CaC₂ + vann → acetylen (eksplosiv)!</b> Skal oppbevares tørt.',
      'FeSi 74–78 % Si · FeMn ~75 % Mn (opptil 7 % C) · SiMn 16–17 % Si / 65–69 % Mn · Mn-metall ~7 % N · FeCr ~60 % Cr (opptil 8 % C!) · FeV ~80 % · FeNb ~65 % · FeTi ~70 % · FeB ~18 %.'
    ],
    qs: [
      { q: 'Hva er hovedhensikten med øseovnen?', a: ['Finlegere chargen etter kundekrav og levere riktig temperatur til strengen', 'Smelte skrap', 'Fjerne fosfor', 'Støpe emner'], e: 'Feil temperatur kan gi groing, for tidlig størkning eller gjennombrudd på strengen.', p: 50 },
      { q: 'Hva er fordelen med trådmating i forhold til bulk?', a: ['Tråden går rett ned i stålet og reagerer raskt og nøyaktig', 'Den er billigere', 'Den lager mer slagg', 'Den kjøler øsa'], e: 'Bulk blir ofte liggende på toppen av slaggen til det spyles.', p: 50 },
      { q: 'Hvorfor tilsettes karbon på øseovnen, i motsetning til på stålovnen?', a: ['For å legere stålet', 'For å lage skumslagg', 'For å fjerne fosfor', 'For å kjøle'], e: 'På stålovnen gir karbon (med O) skumslagg. På øseovnen legerer det stålet.', p: 50 },
      { h: 1, q: 'Hva er stykkstørrelsen på finkalk?', a: ['5–25 mm', '30–60 mm', '100–200 mm', 'Pulver under 1 mm'], e: 'Grovkalk er 30–60 mm og går til stålovnen. Finkalk går til tapping og øseovnen.', p: 51 },
      { h: 1, q: 'Hva inneholder CaSi-tråden omtrent?', a: ['30 % Ca og 60 % Si', '60 % Ca og 30 % Si', '50 % Ca og 50 % Si', '10 % Ca og 90 % Si'], e: 'Kalsium holder aluminiumsslaggene flytende, og silisium hjelper til med tettingen.', p: 51 },
      { q: 'Hvorfor tilsettes CaSi-tråd når vi har brukt aluminium?', a: ['Ca binder opp Al₂O₃ og holder det flytende, så vi unngår groing i strengen', 'For å øke Al-innholdet', 'For å fjerne nitrogen', 'For å gjøre slaggen sur'], e: 'Uten Ca blir Al₂O₃ fast og setter seg i terningene.', p: 51 },
      { q: 'Hva gjør alumet med slaggen?', a: ['Tynner den ut ved å senke smeltepunktet', 'Gjør den stivere', 'Gjør den svart', 'Fjerner kalken'], e: 'En blanding av bare CaO og MgO ville ikke begynt å smelte før over 2300 °C.', p: 52 },
      { h: 1, q: 'Hva er ulempen med flusspat (CaF₂)?', a: ['Den øker løseligheten av MgO, så øsesteinen kan løses opp', 'Den gir mer fosfor', 'Den er radioaktiv', 'Den virker dårligere enn alumet'], e: 'CaF₂ er mye mer effektiv enn alumet. Følg med på CaO-innholdet når du bruker den.', p: 52 },
      { q: 'Hvorfor må kalsiumkarbid (CaC₂) oppbevares tørt?', a: ['Med vann dannes acetylen, som er eksplosiv', 'Den blir magnetisk', 'Den mister fargen', 'Den blir til kalkstein'], e: 'I 2023 ble det installert en egen sender på 9-metersdekket, med overvåking av acetylen.', p: 52 },
      { h: 1, q: 'På hvilke kvaliteter brukes kalsiumkarbid?', a: ['Høykarbonkvaliteter', 'Alle lavkarbonkvaliteter', 'Bare TP07', 'Ingen'], e: 'CaC₂ deoksiderer slaggen og forsterker avsvovlingen. Gassen den lager gir også skummende slagg.', p: 52 },
      { h: 1, q: 'Hva er forskjellen på aluminiumsgranulat og alumet?', a: ['Granulat er ikke-oksidert Al som deoksiderer slaggen, mens alumet tynner slaggen', 'De er det samme', 'Granulat er kalk', 'Alumet er rent Al'], e: 'Granulatet tilsettes med bøtte gjennom hvelvdøra, mest på TP28, TP88 og høykarbon.', p: 52 },
      { h: 1, q: 'Hvor mye Si inneholder ferrosilisium (FeSi) vanligvis?', a: ['74–78 %', '16–17 %', '30 %', '95 %'], e: 'Resten er 20–25 % Fe. FeSi tetter stålet med silisium.', p: 53 },
      { h: 1, q: 'Hva må du huske på når du tilsetter ferromangan (FeMn)?', a: ['Den gir også inngang av karbon (opptil 7 % C)', 'Den gir mye fosfor', 'Den fjerner svovel', 'Den tilsettes bare på stålovnen'], e: 'FeMn har ca. 75 % Mn og tilsettes bare på øseovnen.', p: 53 },
      { h: 1, q: 'Stålet er ikke tettet ennå. Hva går silisiumet i silikomangan (SiMn) da med til?', a: ['Tetting av stålet', 'Inngang på Si i analysen', 'Slaggfarging', 'Ingenting'], e: 'Det er lite Si i forhold til Mn. Bare hvis stålet allerede er tettet, gir Si-en utslag på analysen.', p: 53 },
      { h: 1, q: 'Hvorfor tilsettes manganmetall på øseovnen?', a: ['For å øke nitrogennivået (inneholder ca. 7 % N)', 'For å fjerne nitrogen', 'For å senke Mn', 'For å fjerne svovel'], e: 'Det er sjelden et krav og brukes bare på noen få kvaliteter.', p: 53 },
      { h: 1, q: 'Hva må du passe ekstra på med FeCr?', a: ['Den kan inneholde opptil 8 % karbon', 'Den inneholder bly', 'Den er radioaktiv', 'Den gir mye fosfor'], e: 'FeCr har ca. 60 % Cr. Karboninngangen må tas med i beregningen.', p: 54 },
      { h: 1, q: 'Hvordan tilsettes FeTi per 2023?', a: ['Som sekker direkte i øseovnen', 'Fra silo', 'Som tråd', 'På stålovnen'], e: 'FeTi (~70 % Ti) reagerer raskt med oksygen og trenger godt tettet stål for å få inngang.', p: 54 },
      { h: 1, q: 'Hva er Ti-innholdet i FeTi?', a: ['Ca. 70 %', 'Ca. 18 %', 'Ca. 30 %', 'Ca. 95 %'], e: 'Til sammenligning: FeV ~80 %, FeNb ~65 % og FeB ~18 %.', p: 54 }
    ]
  },
  {
    id: 'elementer',
    name: 'Elementene i stålet',
    icon: '🧬',
    pages: 's. 54–57',
    facts: [
      '<b>C:</b> mer hardhet og styrke, men sprøere. Sveisbarheten avtar over 0,3 % C.',
      '<b>Mn:</b> best på herdbarhet. Lager MnS i stedet for FeS (motvirker rødskjørhet).',
      '<b>Al:</b> tetter stålet og binder N til AlN. <b>V</b> og <b>Nb:</b> partikkelherding. Nb begrenser kornvekst best.',
      '<b>Ti</b> og <b>B:</b> reagerer ekstremt lett med O og krever godt tettet stål. B over 0,005 % er negativt.',
      '<b>P:</b> kaldsprøhet. <b>S:</b> FeS-film på korngrensene gjør stålet sprøtt ved varmvalsing.',
      '<b>Cu</b> og <b>Sn:</b> «surface hot-shortness». <b>Pb:</b> helseskadelig støv, bruk støvmaske.',
      'Små korn er positivt, kornvekst er negativt. Seighet = styrke + duktilitet.'
    ],
    qs: [
      { q: 'Over hvilket karboninnhold begynner sveisbarheten å avta?', a: ['0,3 % C', '0,03 % C', '2 % C', '6,7 % C'], e: 'Fra 0,5–1 % C og oppover regnes stålet som ikke-sveisbart.', p: 55 },
      { h: 1, q: 'Hvordan motvirker mangan rødskjørhet?', a: ['S binder seg til Mn og danner MnS i stedet for FeS', 'Mn fjerner alt oksygen', 'Mn gjør stålet umagnetisk', 'Mn senker temperaturen'], e: 'FeS gir en sprø film på korngrensene. MnS er ufarlig, og gir til og med ønskede effekter.', p: 55 },
      { h: 1, q: 'Hvilket element er best på å gi god herdbarhet?', a: ['Mangan (Mn)', 'Fosfor (P)', 'Bly (Pb)', 'Tinn (Sn)'], e: 'Mn øker også styrken og seigheten og kan brukes til å tette stålet.', p: 55 },
      { h: 1, q: 'Hva gjør aluminium med nitrogen i stålet?', a: ['Binder det til AlN-partikler', 'Øker det', 'Gjør det til gass', 'Ingenting'], e: 'AlN virker kornforfinende, og det er positivt.', p: 55 },
      { h: 1, q: 'Hvordan styrker vanadium (V) stålet?', a: ['Gjennom partikkelherding med karbider og nitrider (V(C,N)) på korngrensene', 'Ved å fjerne karbon', 'Ved å gjøre det rustfritt', 'Ved å senke smeltepunktet'], e: 'V brukes ofte sammen med Nb eller Al, fordi V alene ikke er så god på å hindre kornvekst.', p: 55 },
      { h: 1, q: 'Hvorfor er niob (Nb) bedre enn vanadium til å redusere kornvekst?', a: ['Nb danner karbider og nitrider ved høyere temperaturer', 'Nb er billigere', 'Nb gir mer partikkelherding', 'Nb fjerner svovel'], e: 'Til gjengjeld gir V mer partikkelherding enn Nb.', p: 55 },
      { h: 1, q: 'Hva skjer når borinnholdet går over 0,005 %?', a: ['Det får negativ effekt på hardhet og styrke, særlig ved sveising', 'Stålet blir rustfritt', 'Det blir mer sveisbart', 'Ingenting'], e: 'B øker hardheten ved lavt karbonnivå, men bare i små mengder.', p: 55 },
      { q: 'Hvorfor må stålet være godt tettet før vi tilsetter titan eller bor?', a: ['De reagerer ekstremt lett med oksygen', 'De er magnetiske', 'De fordamper', 'De binder seg til kalk'], e: 'Uten god tetting går Ti og B i slaggen og ikke i stålet.', p: 55 },
      { q: 'Store mengder fosfor (P) gir …', a: ['kaldsprøhet', 'rødskjørhet', 'rustfritt stål', 'bedre sveisbarhet'], e: 'Derfor er avfosforeringen på stålovnen så viktig.', p: 56 },
      { q: 'Hvordan gjør svovel stålet sprøtt under varmvalsing?', a: ['FeS legger seg som en film på korngrensene', 'S fordamper og lager porer', 'S gjør stålet magnetisk', 'S binder seg til karbon'], e: 'FeS-partikler er også harde ved romtemperatur og kan gi sprekker ved kaldbearbeiding.', p: 56 },
      { h: 1, q: 'Hvorfor er det viktig at slaggen dekker lysbuen, med tanke på nitrogen?', a: ['Varmen fra lysbuen spalter N₂ fra lufta til N-atomer som går i stålet', 'Lysbuen lager nitrogen', 'Nitrogen kjøler lysbuen', 'Slaggen inneholder nitrogen'], e: 'Miksing og overtømming til en ny øse gir også vanligvis høyere nitrogen.', p: 56 },
      { q: 'Hvilke to elementer er mest kjent for å gi «surface hot-shortness»?', a: ['Kobber (Cu) og tinn (Sn)', 'Karbon og mangan', 'Aluminium og silisium', 'Vanadium og niob'], e: 'Det gir oppsprekking og fliser i overflaten på det valsede produktet.', p: 56 },
      { h: 1, t: 'tf', q: 'Nikkel brukes som legeringstilsats i flere av våre kvaliteter.', ans: false, e: 'Nikkel brukes ikke som tilsats i noen av våre kvaliteter. Det kommer inn med skrapet.', p: 56 },
      { q: 'Hvorfor kreves sertifisert støvmaske ved høye Pb-nivåer i chargen?', a: ['Gass og støv med bly er svært helseskadelig', 'Bly lukter vondt', 'Bly er radioaktivt', 'Bly gir kalkstøv'], e: 'Bly senker også duktiliteten ved varmvalsing, men brukes i automatstål på grunn av den smørende effekten.', p: 57 },
      { t: 'tf', q: 'Store korn er positivt for styrken og duktiliteten til stålet.', ans: false, e: 'Det er motsatt: små korn er positivt. Partikler som hindrer kornvekst er derfor gunstige.', p: 54 },
      { q: 'Hva er seighet?', a: ['Stålets evne til å ikke gå til brudd ved deformering: høy styrke og høy duktilitet', 'Det samme som hardhet', 'Hvor rustfritt stålet er', 'Hvor tungt stålet er'], e: 'Stål kan være hardt uten å være seigt, og da knuses det i stedet for å deformeres.', p: 54 },
      { h: 1, q: 'Hva gjør krom (Cr) med stålet?', a: ['Brukes i rustfritt stål, men for mye kan gi sprøhet og sprekker rundt sveiser', 'Gjør det kaldsprøtt', 'Fjerner svovel', 'Gjør det umagnetisk'], e: 'Krom tilsettes normalt bare kvaliteter som skal være rustfrie. Hos oss kommer det mest inn med skrapet.', p: 56 }
    ]
  },
  {
    id: 'slaggtemp',
    name: 'Øseslagg, temperatur & CE2',
    icon: '🌡️',
    pages: 's. 57–64',
    facts: [
      'Spyling (normalt med <b>argon</b>) homogeniserer kjemi og temperatur. Nitrogen brukes når kunden har minimumskrav til N.',
      'Etter Al: minst <b>20 min</b> før øsa sendes, og bruk CaSi-tråd. Spyl <b>roligere</b> etter CaSi.',
      '<b>Tettet stål</b>: løst O er fjernet med Si, Mn eller Al. Dobbelttettet = Si + Al.',
      'Slaggfarge: hvit = CaO, MgO, SiO₂, Al₂O₃, CaF₂ · svart = FeO · grønn = MnO · mørkegrønn = Cr₂O₃.',
      'Avsvovling: CaO + [S] → (CaS) + [O]. Krever tyntflytende slagg med mye kalk, spyling, varme og tettet stål.',
      'Levert temperatur: <b>40–50 °C over likvidus</b>. TP26 = 1504 °C, TP77 = 1462 °C.',
      '<b>CE2 = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15.</b> Mn/Si helst over 3. B/N under 1 på høykarbon.'
    ],
    qs: [
      { q: 'Hvorfor spyler vi øsa?', a: ['For å homogenisere kjemi og temperatur og få stålet til å reagere med tilsatser og slagg', 'For å kjøle stålet raskt', 'For å fjerne kobber', 'For å farge slaggen'], e: 'Spyling sprer også varmen fra elektrodene jevnt i badet.', p: 57 },
      { q: 'Hvilken gass spyles det vanligvis med?', a: ['Argon', 'Oksygen', 'CO', 'Luft'], e: 'Nitrogen brukes på kvaliteter der kunden har minimumskrav på N.', p: 57 },
      { h: 1, q: 'Øsa har stått lenge, og spylingen er svak. Hva må du passe på når du øker trykket?', a: ['En «propp» kan løsne, og spylingen kan plutselig bli veldig kraftig', 'Øsa kan fryse', 'Det dannes acetylen', 'Ingenting'], e: 'Stålet kan ha begynt å størkne i bunnen over spylesteinen.', p: 57 },
      { h: 1, q: 'Etter at vi har tilsatt aluminium på øseovnen, hvor lenge må vi minst vente før øsa sendes til strengen?', a: ['20 minutter (og CaSi-tråd må brukes)', '2 minutter', '1 time', 'Vi trenger ikke vente'], e: 'Al₂O₃ som ikke rekker å flyte opp i slaggen gir groing ved utstøpning.', p: 58 },
      { h: 1, q: 'Hvordan skal du spyle etter tilsats av CaSi-tråd?', a: ['Roligere enn vanlig', 'Hardere enn vanlig', 'Ikke i det hele tatt', 'Med oksygen'], e: 'For hard spyling eksponerer stålet for luft, og Ca oksideres til CaO i slaggen.', p: 58 },
      { q: 'Hva er et tettet stål?', a: ['Et stål der løst oksygen er fjernet eller bundet kjemisk', 'Et stål uten nitrogen', 'Et stål med lokk på øsa', 'Et stål med høyt karbon'], e: 'Tetting hindrer CO-porer under størkning. Si, Mn og Al har større affinitet til O enn karbon har.', p: 58 },
      { q: 'Hva betyr «dobbelttettet» stål?', a: ['Både Si og Al brukes til deoksidering', 'Stålet er tettet to ganger med FeSi', 'Stålet har to øselokk', 'Stålet er støpt to ganger'], e: 'Al binder også nitrogen og kan senke N-innholdet.', p: 58 },
      { h: 1, q: 'Når lager vi hvitslagg?', a: ['På kvaliteter der vi tilsetter elementer som reagerer raskt med O, som Ti og B', 'Alltid på stålovnen', 'Når vi vil ha mye FeO', 'Bare på TP07'], e: 'Hvitslagg krever tettet stål, deoksidert slagg og overskudd av kalk. Avsvovlingen går da også lettere.', p: 58 },
      { h: 1, q: 'Slaggen på øseovnen er svart. Hva betyr det?', a: ['Mye FeO', 'Mye MnO', 'Mye kalk', 'Mye Cr₂O₃'], e: 'Hvit = kalk og co., svart = FeO, grønn = MnO, mørkegrønn = Cr₂O₃.', p: 59 },
      { q: 'Hvilket oksid gjør slaggen grønn?', a: ['MnO', 'FeO', 'CaO', 'Al₂O₃'], e: 'Cr₂O₃ gir mørkegrønn slagg.', p: 59 },
      { q: 'Hva skjer med svovelet i stålet under avsvovling?', a: ['Det binder seg til kalsium og går i slaggen som CaS', 'Det fordamper som SO₂', 'Det binder seg til jern', 'Det blir til fosfor'], e: 'CaO + [S] → (CaS) + [O]. Ca kan også komme fra CaC₂.', p: 59 },
      { h: 1, q: 'Hva hjelper IKKE på avsvovlingen?', a: ['Stiv slagg og lite spyling', 'Mye CaO i slaggen', 'Høy temperatur', 'Godt tettet stål'], e: 'Avsvovling krever tyntflytende slagg, bevegelse i badet, varme og lavt oksygen.', p: 60 },
      { h: 1, q: 'Hvorfor tilsetter vi alumet eller flusspat under avsvovling?', a: ['Mye kalk gjør slaggen stiv, så den må tynnes ut igjen', 'For å fjerne kalken', 'For å farge slaggen grønn', 'For å øke svovelet'], e: 'Avsvovling trenger både mye CaO og en tynn slagg med stor reaksjonsflate.', p: 59 },
      { h: 1, q: 'Hvorfor stives slaggen av før øsa leveres til strengen?', a: ['Det blir mindre slagg i fordeleren, og en inaktiv slagg bremser at O trenger ned i stålet', 'For at stålet skal bli kaldere', 'For å fjerne fosfor', 'For å øke nitrogenet'], e: 'En stiv slagg sliter også mindre på ildfasten og gjør oppbrenningen på dørken enklere.', p: 60 },
      { q: 'Hvor mye over likvidustemperaturen skal stålet som regel leveres fra øseovnen?', a: ['40–50 °C', '5 °C', '200 °C', 'Akkurat på likvidus'], e: 'Noen spesialtilfeller krever enda varmere stål (PRD-716).', p: 60 },
      { h: 1, q: 'TP26 (~0,2 % C) har likvidus 1504 °C, og TP77 (~0,8 % C) har 1462 °C. Hva lærer vi av dette?', a: ['Høyere karbon gir lavere likvidustemperatur', 'Høyere karbon gir høyere likvidustemperatur', 'Karbon påvirker ikke likvidus', 'TP77 må leveres varmere'], e: 'Se fasediagrammet Fe-Fe₃C: likvidus synker når karboninnholdet øker.', p: 61 },
      { h: 1, t: 'num', q: 'TP26 har likvidus 1504 °C. Du skal levere 45 °C over likvidus. Hvilken temperatur sikter du på?', ans: 1549, tol: 1, unit: '°C', e: '1504 + 45 = 1549 °C.', p: 61 },
      { q: 'Hva er «kjøleblooms»?', a: ['Avkapp av emner med sveiset løkke som senkes i øsa for raskt temperaturfall', 'Kalk som kjøler slaggen', 'Vannkjølte elektroder', 'Kalde øser'], e: 'Sjelden nødvendig, men nyttig hvis temperaturen er over 1600 °C og må ned raskt.', p: 61 },
      { t: 'tf', q: 'Det er like lett å kjøre opp temperaturen på øseovnen som på stålovnen.', ans: false, e: 'Elektrodene på øseovnen er mindre og har mindre effekt. Stålovnen får i tillegg varme fra eksoterme reaksjoner.', p: 61 },
      { h: 1, q: 'Hvilken formel er CE2?', a: ['C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15', 'C + Mn + Si', 'CaO / SiO₂', 'Cu + 10·Sn'], e: 'C og Mn betyr mest, og det er derfor de er lettest å justere med.', p: 62 },
      { h: 1, t: 'num', q: 'Regn ut CE2: C = 0,20 · Mn = 0,90 · Cr = 0,10 · Mo = 0,02 · V = 0,03 · Ni = 0,10 · Cu = 0,20', ans: 0.40, tol: 0.01, unit: '', e: '0,20 + 0,90/6 + (0,10+0,02+0,03)/5 + (0,10+0,20)/15 = 0,20 + 0,15 + 0,03 + 0,02 = 0,40.', p: 62 },
      { q: 'Hva skjer når CE2 øker?', a: ['Stålet blir hardere og sterkere, men mindre sveisbart', 'Stålet blir mykere', 'Stålet blir mer sveisbart', 'Ingenting'], e: 'Høyere CE2 gir økt sprøhet, og da blir sveisbarheten dårligere.', p: 62 },
      { h: 1, q: 'Hvilken RE3-variant er knyttet til «surface hot shortness»?', a: ['Cu + 10·Sn', 'Ni + Cu', 'Cr + Ni + Cu + Mo + Sn', 'Cu + Ni + Cr'], e: 'Kobber og tinn er de verste og bør holdes lave.', p: 63 },
      { h: 1, q: 'Hvorfor er det viktig å holde Mn/S-forholdet høyt?', a: ['Mn binder S og hindrer at FeS gir oppsprekking', 'For å få mer slagg', 'For å senke CE2', 'For å fjerne nitrogen'], e: 'MnS gir ønskede effekter i ferdig stål, mens FeS gir sprekker.', p: 64 },
      { h: 1, q: 'Hva vil vi som regel ha Mn/Si-forholdet over?', a: ['3', '0,5', '10', '1,25'], e: 'Et høyt Mn/Si-forhold gir mindre slagg i kokillene, og det hjelper utstøpningen.', p: 64 },
      { h: 1, q: 'Hvorfor skal B/N-forholdet være under 1 på noen høykarbonkvaliteter?', a: ['Ellers binder B seg til N (BN), og effekten av bor alene blir redusert', 'For å få mer nitrogen i stålet', 'For å senke likvidus', 'For å unngå fosforbom'], e: 'B binder seg lettere til N enn Al gjør. Da forsvinner hardhetseffekten av bor.', p: 64 }
    ]
  },
  {
    id: 'dorken',
    name: 'Dørken',
    icon: '🏗️',
    pages: 's. 65–70',
    facts: [
      '<b>Kran 30</b> frakter øsene: tapping → øseovn → strengen → tømming → klargjøring.',
      '<b>Klokka</b> på siden av øsa kobles til autospylingen på vogna.',
      '<b>Miksing:</b> blande med en ny charge for å få to like. <b>Overtømming:</b> ingen spyling, så stålet tømmes over i en ny øse.',
      'Tappemekanisme: <b>tipp</b>, <b>skyveplate</b>, <b>bunnplate</b> og <b>innerterning</b>.',
      'Platebytte etter 4–6 charger (160 min reparerte, 240 min nye). Skyveplaten skal alltid være ny. Innerterningen byttes etter ca. 20 charger.',
      'Øsebrennere hindrer temperatursjokk, skoller og fukt. CO-gass koster ca. ⅓ av olje. Brenner 5 er den eneste kombibrenneren.'
    ],
    qs: [
      { q: 'Hvilken kran bruker dørkoperatørene til øsetransport?', a: ['Kran 30', 'Kran 67', 'Kran 1', 'Magnetkrana i skraplageret'], e: 'Kran 30 brukes også til miksing, overtømming, avslagging og øselokk.', p: 65 },
      { h: 1, q: 'Hva er «klokka» på siden av øsa?', a: ['Koblingen til spylesteinen som treffer autospylingen på vogna', 'En klokke som viser behandlingstid', 'En temperaturmåler', 'Et alarmsystem'], e: 'Øsa settes på vogna slik at klokka treffer koblingen. Da kan man spyle uten å koble til slange.', p: 65 },
      { q: 'Hva er miksing?', a: ['En charge med for høye verdier blandes med en ny charge, slik at vi får to «like» charger', 'Omrøring med argon', 'Blanding av kalk og dolomitt', 'Skrap fra to dunger i samme kasse'], e: 'Det gjøres når analysen er så høy at det ikke gir mening å reklassifisere.', p: 66 },
      { q: 'Når gjøres en overtømming?', a: ['Når vi ikke får spyling i det hele tatt på øsa', 'Når stålet er for varmt', 'Etter hver charge', 'Når slaggen er hvit'], e: 'Stålet tømmes over i en øse med fungerende spyling, og den gamle øsa sjekkes og vedlikeholdes.', p: 66 },
      { h: 1, q: 'Når kan dørken slagge av en øse med stålovnsslagg?', a: ['Bare hvis de får beskjed med en gang, før slaggen stivner', 'Når som helst', 'Bare på øseovnen', 'Aldri'], e: 'De tipper øsa litt med tippkjettingen på kran 30.', p: 66 },
      { q: 'Hvorfor legger man øselokk på øser med stål som står og venter?', a: ['Det bevarer varmen og bremser dannelsen av slagglokk', 'For å hindre at noen faller oppi', 'For å øke nitrogenet', 'For å spyle bedre'], e: 'Et slagglokk hindrer kontakt mellom elektrodene og stålbadet på øseovnen.', p: 66 },
      { h: 1, q: 'Hvilke ildfastkomponenter er det i tappemekanismen?', a: ['Tipp, skyveplate, bunnplate og innerterning', 'Spylestein og sikkerhetsstein', 'Elektroderingstein og hvelv', 'Bare én glideplate'], e: 'Innerterningen sitter i tappeblokka. Glideplatene sitter mellom innerterningen og tippen.', p: 68 },
      { h: 1, q: 'Hvor ofte byttes glideplatene?', a: ['Etter hver 4.–6. charge (160 min reparerte, 240 min nye)', 'Hver charge', 'En gang i måneden', 'Etter ca. 20 charger'], e: 'Byttet styres hovedsakelig av hvor mange minutter platene har vært i bruk i tårnet.', p: 69 },
      { h: 1, q: 'Hvilken plate skal ALLTID være ny?', a: ['Skyveplaten', 'Bunnplaten', 'Begge kan være reparert', 'Ingen av dem'], e: 'Brukte skyveplater repareres og brukes på nytt som bunnplate. Bunnplaten kastes etter bruk.', p: 69 },
      { h: 1, q: 'Etter omtrent hvor mange charger skal innerterningen byttes?', a: ['Ca. 20', 'Ca. 2', 'Ca. 100', 'Ca. 5'], e: 'Platene byttes samtidig, siden de uansett må tas ut.', p: 70 },
      { q: 'Hva gjør operatøren etter at tappemekanismen er brent ren?', a: ['Kaster sekker med sand i øsa for å dekke tappehullet', 'Heller vann i øsa', 'Tilsetter kalk', 'Sender øsa rett til tapping'], e: 'Sanden (schiebersand) hindrer at stål fryser fast i tappehullet.', p: 69 },
      { h: 1, q: 'Spylingen svikter, men spylesteinen er OK. Hva kan årsaken være?', a: ['Rør- eller slangebrudd', 'For mye kalk', 'Slitte elektroder', 'Feil skrapresept'], e: 'Dørken sjekker først spylesteinen og bytter den ved behov.', p: 68 },
      { q: 'Hvorfor settes tomme øser under øsebrennere?', a: ['For å hindre temperatursjokk og skoller og fjerne fukt som kan gi eksplosjon', 'For å kjøle dem', 'For å tørke slaggen', 'For å fjerne rust'], e: 'Vann og fukt i øsa kan gi hurtig damputvikling ved tapping.', p: 70 },
      { h: 1, q: 'Hvorfor brukes CO-gass i øsetørkerne, selv om effekten er dårligere enn med olje?', a: ['Den koster ca. ⅓ av olje og er mer bærekraftig', 'Den er varmere', 'Den lager mindre støv i hallen', 'Den kommer fra stålovnen'], e: 'CO-gassen leveres av MIP og er blant annet et biprodukt fra Ferroglobe.', p: 70 },
      { h: 1, q: 'Hvilken øsebrenner er den eneste kombibrenneren (CO-gass eller olje)?', a: ['Brenner 5', 'Brenner 1', 'Brenner 6', 'Den liggende brenneren'], e: 'Brenner 1 bruker bare CO, brenner 6 og den liggende bare olje.', p: 70 },
      { q: 'Hvordan skal en nymurt øse varmes opp først?', a: ['Stående, slik at ildfasten tørker og herder før øsa tippes', 'Liggende med en gang', 'Med stål direkte', 'I stålovnen'], e: 'Helst i brenner 1 eller 5, som har program. Liggende tørker er siste steg før produksjon.', p: 70 },
      { t: 'order', q: 'Sett runden til øsa i riktig rekkefølge:', items: ['Tapping på stålovnen', 'Øseovnen', 'Utstøpning i tårnet', 'Tømme slaggrester i gropa', 'Brenne tappemekanismen ren', 'Kaste sand i tappehullet'], e: 'Rødt løp med full øse, så gult løp med tom øse som klargjøres til ny tapping.', p: 69 }
    ]
  },
  {
    id: 'strengen',
    name: 'Strengen',
    icon: '🧱',
    pages: 's. 71–85',
    facts: [
      '<b>CCM</b> = Continuous Casting Machine. Den støper <b>emner</b> (billets).',
      'Fordeleren er en <b>buffer</b> ved chargebytte, jevner ut strømmen og lar slagg flyte opp. Dekkmiddel: vermikulitt eller risaske.',
      'Argon i støperøret (øse → fordeler), aldri i kokillene, fordi det gir bobler og porer. Beskyttet støping: N₂ gjennom lur (~+3 ppm N).',
      'Vi bruker <b>oljesmøring</b>. Oscillering hindrer at stålet setter seg fast.',
      '<b>EMS</b> = elektromagnetisk omrøring. Gir jevnere legering og mindre senterporøsitet.',
      'Feil: <b>pipe</b> (for lite stål til å fylle senteret) · <b>porer</b> (dårlig tettet, CO) · <b>diagonalfeil</b> (ujevn kjøling) · <b>cold drop</b> · <b>groing</b> (vanligst Al₂O₃, hjelp med CaSi).',
      'Austenitt (FCC) er umagnetisk. Ferritt er magnetisk. Perlitt = striper av ferritt (0,022 % C) og sementitt (6,7 % C).'
    ],
    qs: [
      { q: 'Hva står CCM for?', a: ['Continuous Casting Machine', 'Central Carbon Mixer', 'Copper Control Module', 'Cold Casting Mould'], e: 'Kontinuerlig støping er raskere og trenger ikke ny form for hver enhet.', p: 71 },
      { q: 'Hva er hovedoppgaven til fordeleren?', a: ['Være buffer ved chargebytte, så utstøpningen ikke stopper', 'Smelte skrap', 'Kutte emner', 'Fjerne svovel'], e: 'Den jevner også ut matingen til kokillene og lar slagg flyte opp.', p: 71 },
      { q: 'Hva brukes som dekkmiddel på fordeleren?', a: ['Vermikulitt (alternativt risaske)', 'Brent kalk', 'Sand', 'Grafittpulver'], e: 'Dekkmiddelet hindrer varmetap og reaksjon med oksygen i lufta.', p: 93 },
      { h: 1, q: 'Hvorfor brukes argon bare mellom øse og fordeler, og aldri i kokillene?', a: ['Argon løser seg ikke i stål og gir bobler, og dermed porer (pin/blow holes)', 'Argon er for dyrt', 'Argon er giftig', 'Argon lager slagg'], e: 'I verste fall støpes det ut «stratos».', p: 72 },
      { h: 1, q: 'Hva er beskyttet støping?', a: ['Nitrogengass kjøres gjennom en lur for å holde lufta unna strålen i kokillene', 'Utstøping under vann', 'Støping med lokk på fordeleren', 'Støping med argon i kokillen'], e: 'Det brukes på kvaliteter med B eller Ti. Nitrogeninnholdet øker med ca. 3 ppm.', p: 72 },
      { h: 1, q: 'Hvilket av disse øker risikoen for slaggdannelse og skader på emnene?', a: ['Lav støpetemperatur', 'Høyt Mn/Si-forhold', 'Riktig støpehastighet', 'Godt tettet stål'], e: 'Risikoen øker også med lavt karbon, lavt Mn eller lavt Mn/Si, feil Al-innhold og lav støpehastighet.', p: 74 },
      { q: 'Hvilken kokillesmøring bruker vi?', a: ['Oljesmøring', 'Pulversmøring', 'Vannsmøring', 'Ingen smøring'], e: 'Pulversmøring brukes oftere på spesialkvaliteter og rustfritt stål.', p: 75 },
      { q: 'Hvorfor oscilleres kokillene?', a: ['For å hindre at stålet setter seg fast', 'For å blande inn legeringer', 'For å kjøle vannet', 'For å fjerne slagg'], e: 'Feil oscillering gir feil på emnene og høyere risiko for gjennombrudd.', p: 75 },
      { q: 'Hva skjer på venderista?', a: ['Emnene roteres, så de ikke bøyer seg mens de kjøles ned', 'Emnene kuttes', 'Emnene males', 'Emnene smeltes om'], e: 'Overflatetemperaturen er rundt 1000 °C når emnene kommer dit.', p: 75 },
      { h: 1, q: 'Hvorfor går noen emner inn i en termoboks (hotcharging)?', a: ['For å holde dem varme (700–800 °C) og spare energi i emneovnen', 'For å kjøle dem raskt', 'For å analysere dem', 'For å lagre skrapemner'], e: 'Varmere emner trenger mindre oppvarming i valseverkets emneovn.', p: 76 },
      { h: 1, q: 'Hva gjør EMS?', a: ['Rører om stålet i kokillen med magnetfelt, så legeringen blir jevnere og senterporøsiteten mindre', 'Måler temperaturen', 'Kutter emner', 'Fjerner nitrogen'], e: 'Det er i prinsippet ingen negative følger, bortsett fra mer vedlikehold.', p: 76 },
      { t: 'tf', q: 'Austenitt er magnetisk.', ans: false, e: 'Austenitt (FCC) er ikke magnetisk. Ferritt (BCC) er magnetisk.', p: 78 },
      { h: 1, q: 'Hva er perlitt?', a: ['En lamellær struktur («sebrastriper») av ferritt og sementitt', 'En nålestruktur fra bråkjøling', 'En type slagg', 'Ren austenitt'], e: 'Ferritten har ca. 0,022 % C og sementitten ca. 6,7 % C.', p: 79 },
      { h: 1, q: 'Hvor begynner ferrittkorn å dannes når austenitt kjøles ned?', a: ['På korngrensene til austenitten', 'Midt i kornene', 'Bare i overflaten', 'I slaggen'], e: 'Korngrensene er stedet der det krever minst energi.', p: 79 },
      { h: 1, q: 'Hvordan er legeringselementene fordelt i tverrsnittet av et emne (seigring)?', a: ['Høyt ytterst, lavere innover og høyt igjen i midten', 'Helt jevnt', 'Høyest ytterst og synkende helt inn', 'Lavest i midten'], e: 'Elementene løser seg dårligere i fast fase og presses innover. I midten har de ingen steder å gå.', p: 81 },
      { q: 'Hva er den vanligste årsaken til pipe?', a: ['Det er ikke nok flytende stål til å fylle senteret når stålet krymper', 'For mye oksygen', 'For mye kalk', 'Tett dyse'], e: 'Det skjer ofte ved avslutning av støpingen. En sjelden årsak er at senteret fortsatt er flytende når emnet kuttes.', p: 82 },
      { q: 'Hva er den vanligste årsaken til porer (pin-holes og blow-holes)?', a: ['Dårlig deoksidert stål: O reagerer med C og danner CO-bobler', 'For høy støpehastighet', 'Slitte kokiller', 'For lite argon i kokillen'], e: 'Et godt tettet stål er den beste måten å unngå porer på.', p: 82 },
      { h: 1, q: 'Hva fører oftest til diagonalfeil og dimensjonsfeil?', a: ['Ujevn kjøling, f.eks. en tett dyse', 'For mye svovel', 'For lite kalk', 'For varm øse'], e: 'Er diagonalfeilen for stor, må emnet skrapes.', p: 83 },
      { h: 1, q: 'Et emne har en overflatefeil. Når skal det alltid skrapes?', a: ['Når det er slagg i feilen, eller gropa er dypere enn 4 mm', 'Når det er litt rust på overflaten', 'Når gropa er grunnere enn 1 mm', 'Aldri, det kan alltid valses'], e: 'Det er for stor risiko for feil på valseproduktet og havari i valseverket.', p: 84 },
      { q: 'Hva er en «cold drop»?', a: ['En klump av olje, stål og slagg fra kokilleveggen som faller ned og skader emnet', 'En kald charge', 'Et dråpeformet emne', 'En kald øse'], e: 'Når klumpen trekkes ned, lager den et langt spor, eller den eksploderer når oljen blir for varm.', p: 84 },
      { q: 'Hva er oftest årsaken til groing i utløpet eller fordeleren?', a: ['For mye aluminium (fast Al₂O₃)', 'For mye kobber', 'For mye argon', 'For lite kalk på stålovnen'], e: 'CaSi motvirker groing, fordi Ca binder seg til Al₂O₃ og gjør det flytende.', p: 85 },
      { h: 1, q: 'Hvor ofte skiftes sliteforingen i fordeleren?', a: ['Mellom hver sekvens (maks 30 timer)', 'Hver charge', 'Etter flere måneder', 'Aldri'], e: 'Bakforingen holder i flere måneder.', p: 92 },
      { t: 'order', q: 'Sett delene på strengen i riktig rekkefølge:', items: ['Fordeler', 'Kokille', 'Kjølesone og drivrettere', 'Brennere (kutting)', 'Venderista'], e: 'Fordeler → kokille (skallet størkner) → kjølesone/drivrettere → brennere → venderista.', p: 74 },
      { h: 1, t: 'order', q: 'Sett avkjølingen av et stål med lite karbon (som TP26) i riktig rekkefølge:', items: ['Flytende stål (L)', 'Austenitt (γ)', 'Ferritt dannes på korngrensene', 'Resten av austenitten blir perlitt'], e: 'Under den horisontale linjen i fasediagrammet blir resten av austenitten til perlitt.', p: 79 }
    ]
  },
  {
    id: 'ildfast',
    name: 'Ildfast',
    icon: '🧯',
    pages: 's. 86–95',
    facts: [
      'Ovnsstein: <b>96–98 % MgO</b>. Øsestein: <b>~40 % MgO / 58 % CaO</b>, murt i <b>spiral</b>.',
      'Potta mures til maks <b>130 tonn</b> (det kran 67 kan løfte).',
      'Bakfyllemasse = siste sikring mot mantelen · Oljegrus = slippmasse i slaggdøra · Lappemasse = tørr · Sprøytemasse = våt.',
      'Dørstokken lages av gamle elektrodebiter. Tappehullsteinen består av 6 deler og holder hele ovnens levetid.',
      'Slitasje: <b>erosjon</b> (vanligst) · <b>lysbuesår</b> · <b>oksidasjon</b> (karbonbindemiddel + O → CO) · <b>oppløsning</b> (slagg ikke mettet med MgO).',
      'Mest slitasje i <b>1- og 2-feltet</b>, nærmest elektrodene og lengst fra det kalde skrapet.'
    ],
    qs: [
      { q: 'Hva består ovnspottesteinen hovedsakelig av?', a: ['96–98 % MgO', '40 % MgO og 58 % CaO', 'Grafitt', 'Al₂O₃'], e: 'Resten er 1–1,5 % CaO og litt andre oksider.', p: 86 },
      { h: 1, q: 'Hva består øsesteinen av?', a: ['Ca. 40 % MgO og 58 % CaO', '96–98 % MgO', 'Ren CaO', 'Høyalumina'], e: 'Fordi øsesteinen har mye CaO, slites den mindre av CaF₂ enn ren MgO-stein.', p: 89 },
      { h: 1, q: 'Hvor tung kan stålovnspotta mures før den må flyttes?', a: ['130 tonn (maks for kran 67)', '30 tonn', '500 tonn', '92 tonn'], e: 'Potta mures ferdig etter at overdelen er satt på i stålovnskabinen.', p: 87 },
      { h: 1, q: 'Hva er bakfyllemassen?', a: ['Varmeisolerende masse mellom steinen og mantelen, den siste sikringen', 'Masse i slaggdøra', 'Sand i tappehullet', 'Masse i fordeleren'], e: 'Den ligger mellom ovnssteinen og mantelen.', p: 87 },
      { q: 'Hva brukes oljegrus til?', a: ['Slippmasse oppå dørstokken og rundt slaggdøra, så slaggen løsner lettere', 'Smøring av kokiller', 'Dekkmiddel i fordeleren', 'Brensel i øsetørkerne'], e: 'Oljegrusen lages av NIG av resirkulert ovnspottestein fra oss.', p: 87 },
      { h: 1, q: 'Hva er forskjellen på lappemasse og sprøytemasse?', a: ['Lappemasse er tørrmasse (varm eller kald), sprøytemasse er våtmasse', 'Begge er tørre', 'Lappemasse sprøytes, sprøytemasse lappes', 'Det er det samme'], e: 'Sprøytemassen brukes som løpende vedlikehold, og mer og mer mot slutten av pottens levetid.', p: 88 },
      { q: 'Hva lages dørstokken av?', a: ['Resirkulerte elektrodebiter (grafitt)', 'Ovnsstein', 'Stål', 'Oljegrus'], e: 'Elektrodebrudd som er lange nok, kappes til riktig lengde.', p: 88 },
      { q: 'Hva er tappehullssanden til?', a: ['Hindre at stål kommer ned i tappehullet og størkner der', 'Lage slagg', 'Avsvovle', 'Kjøle elektrodene'], e: 'Sanden hjelper også mot gjennombrudd.', p: 88 },
      { h: 1, q: 'Hvor mange deler består tappehullsteinen av?', a: ['Seks', 'To', 'Én', 'Tolv'], e: 'Den holder normalt hele ovnens levetid.', p: 89 },
      { h: 1, q: 'Hvordan mures øsesteinen langs veggen?', a: ['I spiral, med tykkere stein mot toppen', 'Rett opp i lag', 'Tilfeldig', 'Den støpes'], e: 'Det er slaggen som sliter mest, og den ligger øverst. Derfor er steinen tykkere der.', p: 89 },
      { h: 1, q: 'Hva er oppgaven til elektroderingsteinen i innerhvelvet på øseovnen?', a: ['Hindre overslag og redusere faren for vannlekkasje', 'Holde elektrodene fast', 'Avsvovle', 'Måle temperaturen'], e: 'Steinen blir sprø over tid, og en brukt stein knuses lett med spett.', p: 90 },
      { h: 1, q: 'Hva kjennetegner en spylestein?', a: ['Den er porøs (eller har slisser), så gassen kan spyles gjennom', 'Den er helt tett', 'Den er laget av grafitt', 'Den sitter i hvelvet'], e: 'Argon eller nitrogen kobles til på utsiden av øsa.', p: 91 },
      { h: 1, q: 'Hva er terningene i strengen laget av?', a: ['Høyalumina (Al₂O₃) med silikonring', 'MgO', 'Grafitt', 'Stål'], e: 'Terningene finnes med ulike diametre, og som blindterning uten hull.', p: 93 },
      { q: 'Hvilke felt i stålovnen slites mest?', a: ['1- og 2-feltet', 'Bare 3-feltet', 'Bunnen', 'Hvelvet'], e: 'De ligger nærmest elektrodene og lengst unna det kalde skrapet fra conveyoren.', p: 94 },
      { q: 'Hvilken slitasje er den vanligste på ildfaststeinen?', a: ['Erosjon', 'Lysbuesår', 'Oppløsning', 'Oksidasjon'], e: 'Stål og slagg i bevegelse sliter jevnt bort partikler og bindemiddel.', p: 94 },
      { q: 'Hva fører til lysbuesår?', a: ['Lysbuen er dårlig dekket av slagg, så stikkflammer treffer steinen', 'For mye kalk', 'Kaldt skrap', 'For lite oksygen'], e: 'Den varme gassen smelter dype sår i steinen.', p: 94 },
      { h: 1, q: 'Hva skjer ved oksidasjonsslitasje?', a: ['Karbonbindemiddelet reagerer med O eller FeO til CO, og partiklene faller ut', 'Steinen ruster', 'MgO fordamper', 'Steinen blir magnetisk'], e: 'C (ildfast) + O ⇌ CO (g).', p: 94 },
      { h: 1, q: 'Når får vi oppløsningsslitasje?', a: ['Når slaggen ikke er mettet med MgO og «spiser» MgO fra steinen', 'Når slaggen har for mye MgO', 'Når ovnen er kald', 'Når elektrodene er nye'], e: 'Derfor tilsetter vi dolomitt (MgO) i stålovnen.', p: 95 }
    ]
  },
  {
    id: 'resirk',
    name: 'Resirkulering',
    icon: '♻️',
    pages: 's. 96–105',
    facts: [
      'Samarbeidspartnere: <b>Harsco</b>, <b>Anleggsservice</b> og <b>MIT</b>. Alt veies over bilvekta.',
      '<b>Svartslagg</b> (fra stålovnen) selges av Harsco. <b>Hvitslagg</b> (fra øseovnen): den fine selges, den grove deponeres av Miljøteknikk.',
      'Øsestein → big bags → <b>conveyoren</b>. Ovnsstein → NIGD → <b>resirkulert magnesitt</b> og oljegrus. Innerhvelv → sprøytemasse.',
      'Store fordelerskoller knuses og lanses hos Harsco.',
      'Ballastbillets legges om til <b>TP07</b> og må være sveisbare. Kappkibba er ~50 % glødeskall.',
      '<b>Rødstøv</b> fra renseanlegget og <b>glødeskall</b> selges til eksterne kunder.'
    ],
    qs: [
      { q: 'Hvem samarbeider stålverket med om resirkulering av biprodukter?', a: ['Harsco, Anleggsservice og MIT', 'Bare Harsco', 'Ferroglobe og MIP', 'Valseverket'], e: 'Bilvekta ved skraplageret brukes av hele industriparken for å registrere materialflyten.', p: 96 },
      { q: 'Hva er svartslagg?', a: ['Slaggen som tømmes ut av stålovnen ved avslagging', 'Slaggen fra øseovnen', 'Rødstøv', 'Glødeskall'], e: 'Harsco prosesserer den og selger den videre. Noe brukes til å reie opp slaggropa.', p: 97 },
      { h: 1, q: 'Hva skjer med hvitslaggen etter at Harsco har prosessert den?', a: ['Den fine selges, og den grove deponeres av Miljøteknikk', 'Alt går tilbake i stålovnen', 'Alt deponeres', 'Den brukes som dekkmiddel'], e: 'Stålbitene som sorteres ut, veies og legges i skraplageret.', p: 97 },
      { q: 'Hvor havner steinrestene fra riving av øser?', a: ['I big bags som kjøres i stålovnen via conveyoren', 'På deponi', 'Hos NIGD som oljegrus', 'I fordeleren'], e: 'Tilsatsen heter «RESIRK BIGBAG» (resirkulert magnesitt).', p: 98 },
      { h: 1, q: 'Hva får vi tilbake fra NIGD etter riving av ovnspotta?', a: ['Resirkulert magnesitt (SILO RESIRK) og oljegrus', 'Nye elektroder', 'Brent kalk', 'Stålskrap'], e: 'Restene fra innerhvelvet blir til sprøytemasse.', p: 99 },
      { h: 1, q: 'Hvordan bearbeider Harsco store fordelerskoller?', a: ['Med kule (knusing) og lansing', 'De smeltes i stålovnen med en gang', 'De selges som ballast', 'De deponeres'], e: 'Små fordelerskoller trenger som regel ikke bearbeiding før de legges i skraplageret.', p: 96 },
      { h: 1, q: 'Hvor havner stålrester fra rensking av øser?', a: ['I kibbe 400, eller de hentes av Harsco', 'I kappkibba', 'I hvitslaggbingen', 'I renseanlegget'], e: 'Harsco veier dem før og etter prosessering og leverer stålet til skraplageret.', p: 98 },
      { h: 1, q: 'Hva kreves av emner som selges som ballastbillets?', a: ['De må være sveisbare, så ikke høykarbon', 'De må være rustfrie', 'De må være magnetfrie', 'Ingen krav'], e: 'De legges om til TP07 i SAP og plukkes fra «det verste» av sperrede emner.', p: 100 },
      { q: 'Omtrent hvor mye av vekten i kappkibba er glødeskall?', a: ['Ca. 50 %', 'Ca. 5 %', 'Ca. 90 %', 'Ingenting'], e: 'Kappkibba samler start- og endekutt og glødeskall under brennerne.', p: 100 },
      { h: 1, q: 'Hva skjer med glødeskallet som glødeskallskruen siler ut av vannet?', a: ['Det selges som produkt til en ekstern kunde', 'Det deponeres', 'Det brukes som dekkmiddel', 'Det går i stålovnen'], e: 'Det fraktes på bånd til dørken, hentes og veies.', p: 101 },
      { q: 'Hva skjer med rødstøvet fra renseanlegget?', a: ['Det veies og selges til en ekstern kunde', 'Det deponeres sammen med vanlig støv', 'Det tilsettes i stålovnen', 'Det brukes som sand'], e: 'Vanlig støv fra verket støvsuges av Miljøteknikk og deponeres.', p: 105 },
      { t: 'tf', q: 'Skoller fra tømming av øser og stålovn havner til slutt i skraplageret vårt.', ans: true, e: 'Harsco henter, veier og prosesserer dem, og så går de tilbake til skraplageret.', p: 96 }
    ]
  }
];
