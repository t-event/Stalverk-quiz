// Leksjoner for nyansatte. Hver stasjon har noen korte kort.
// check = id til et spørsmål i questions.js (sone-indeks) som brukes som «Sjekk deg selv».

const INTRO = {
  id: 'intro',
  name: 'Stålverket på 5 minutter',
  icon: '🌱',
  cards: [
    {
      title: 'Hva lager vi?',
      body: `<p>Stålverket i Mo i Rana smelter <b>stålskrap</b> og lager nytt stål av det. Hele 100 % av jernet vi putter i ovnen er skrap, og det gjør Celsa til Norges største gjenvinningsbedrift.</p>
<p>Produktet fra stålverket er <b>emner</b>, lange firkantede stålstenger. Emnene går videre til valseverket, som valser dem ut til armeringsstål.</p>`,
      check: 'skrap-0'
    },
    {
      title: 'Veien gjennom verket',
      body: `<ol class="steps">
<li><b>🧲 Skraplageret:</b> skrapet sorteres og lastes i kasser etter en oppskrift (resept).</li>
<li><b>🛤️ Conveyoren:</b> et transportbånd rister skrapet inn i ovnen og forvarmer det med varm avgass.</li>
<li><b>🔥 Stålovnen:</b> skrapet smeltes med strøm fra tre store elektroder.</li>
<li><b>🫗 Tapping:</b> det flytende stålet helles over i en <b>øse</b>, en stor «bøtte» foret med varmebestandig stein.</li>
<li><b>🧪 Øseovnen:</b> kjemien finjusteres etter det kunden krever, og temperaturen gjøres riktig.</li>
<li><b>🧱 Strengen:</b> stålet støpes ut og størkner til emner.</li>
</ol>
<p>Rundt dette jobber <b>dørken</b> (flytter øsene), <b>ildfast</b> (steinen som tåler varmen) og <b>resirkulering</b> (alt som blir til overs).</p>`,
      check: 'skrap-24'
    },
    {
      title: 'Tre ord du hører hele tiden',
      body: `<p><b>Charge:</b> én porsjon stål, det vil si én ovnsfylling. Én skrapkasse er omtrent 92 tonn og blir til én charge.</p>
<p><b>Slagg:</b> et lag av smeltet stein (oksider) som flyter oppå stålet, akkurat som olje på vann. Slaggen beskytter, isolerer og fanger opp stoffer vi ikke vil ha i stålet.</p>
<p><b>Kvalitet (TP):</b> hver stålkvalitet har et TP-nummer, f.eks. TP26, med egne krav til kjemi og temperatur.</p>`,
      check: 'stalovn-17'
    },
    {
      title: 'Hvorfor er kjemien så viktig?',
      body: `<p>Kunden bestiller stål med bestemte krav, f.eks. hvor mye karbon og mangan det skal være. Vi justerer innholdet ved å tilsette <b>legeringer</b>.</p>
<p>Noen stoffer kommer inn med skrapet og kan <b>ikke</b> fjernes igjen. De heter <b>sporelementer</b> og er blant annet kobber, nikkel, krom, molybden og tinn. Derfor er sorteringen i skraplageret så viktig.</p>
<p>Blir det for mye av dem, må chargen blandes med en annen («tynnes ut»).</p>`,
      check: 'skrap-20'
    },
    {
      title: 'Sikkerhet først',
      body: `<ul>
<li><b>Vann og flytende stål er livsfarlig.</b> Vannet blir til damp med en gang og kan gi eksplosjon. Derfor tørkes øsene, og det er derfor overslag i vannkjølte deler er så farlig.</li>
<li><b>Kok i øsa:</b> gass kan få stålet til å «koke» og sprute. Hold avstand når øser med stål flyttes.</li>
<li><b>Kalkstøv</b> blir varmt når det kommer i kontakt med fuktighet og kan skade øynene. Skyll med en gang.</li>
<li><b>Kalsiumkarbid</b> lager eksplosiv gass (acetylen) sammen med vann og skal oppbevares tørt.</li>
</ul>`,
      check: 'tapping-10'
    }
  ]
};

const LESSONS = {
  kjemi: [
    {
      title: 'Atomer og grunnstoffer',
      body: `<p>Alt er bygget av <b>atomer</b>. Et atom har en kjerne med <b>protoner</b> (positive) og nøytroner, og rundt kjernen svirrer <b>elektroner</b> (negative).</p>
<p>Det er <b>antall protoner</b> som bestemmer hvilket grunnstoff atomet er: jern, karbon, oksygen og så videre. Grunnstoffene er ordnet i periodesystemet.</p>
<p>Når flere atomer henger sammen, kalles det et <b>molekyl</b>, f.eks. vann (H₂O) eller CO₂.</p>`,
      check: 'kjemi-0'
    },
    {
      title: 'Hvordan atomer henger sammen',
      body: `<ul>
<li><b>Kovalent binding:</b> atomene <i>deler</i> elektroner. Vanlig i gasser som CO₂.</li>
<li><b>Ionebinding:</b> ett atom <i>gir</i> et elektron til et annet, og så tiltrekker de hverandre, som i bordsalt (NaCl).</li>
<li><b>Metallbinding:</b> metallatomene deler alle elektronene sine i en felles «sky». Det er derfor metaller leder strøm.</li>
</ul>`,
      check: 'kjemi-4'
    },
    {
      title: 'Reaksjoner som gir eller tar varme',
      body: `<p><b>Eksoterm</b> reaksjon = gir fra seg varme. Eksempel: oksygen som brenner karbon i stålovnen. Det gir ekstra energi.</p>
<p><b>Endoterm</b> reaksjon = krever varme. Eksempel: å smelte skrap eller kalk.</p>
<p>Huskeregel: <i>«ekso» = ut (varme ut), «endo» = inn (varme inn).</i></p>`,
      check: 'kjemi-6'
    },
    {
      title: 'Fart på reaksjonene',
      body: `<p>For at stoffer skal reagere, må atomene treffe hverandre. Det går fortere når:</p>
<ul><li>det er <b>varmere</b> (atomene beveger seg fortere)</li>
<li>det er <b>større overflate</b> (pulver reagerer fortere enn en klump)</li>
<li>det er <b>omrøring</b> (derfor spyler vi øsa)</li></ul>`,
      check: 'kjemi-12'
    },
    {
      title: 'Sur og basisk slagg',
      body: `<p>Slaggen kan være <b>basisk</b> eller <b>sur</b>, avhengig av hva den inneholder:</p>
<ul><li><b>Kalk (CaO)</b> gjør slaggen basisk.</li><li><b>Kvarts (SiO₂)</b> gjør den sur.</li></ul>
<p>Vi måler det med <b>B2 = CaO / SiO₂</b>. Høy B2 betyr basisk og stivere slagg. Mer om dette på stålovnen.</p>`,
      check: 'kjemi-14'
    }
  ],

  lab: [
    {
      title: 'Hvorfor tar vi prøver?',
      body: `<p>Vi må vite hva som er i stålet og slaggen for å kunne justere riktig:</p>
<ul><li><b>Slaggprøve</b> på stålovnen: hvordan er slaggen, og hvor mye oksygen er det?</li>
<li><b>Stålprøver</b> på øseovnen: vi legerer etter disse.</li>
<li><b>Sluttprøve</b> under utstøpning: det er denne analysen <b>kunden</b> får.</li></ul>`,
      check: 'lab-2'
    },
    {
      title: 'Stålprøver: OES',
      body: `<p>Stålprøver analyseres med <b>OES</b> (gnistspektroskopi). Prøven gnistes, og hvert grunnstoff sender ut lys med sitt eget «fingeravtrykk». Maskinen leser lyset og regner ut hvor mye det er av hvert stoff.</p>
<p>Prøven må være <b>flat og litt ru</b>. Gnistingen skjer i et kammer fylt med <b>argon</b>.</p>`,
      check: 'lab-1'
    },
    {
      title: 'Slaggprøver: XRF',
      body: `<p>Slagg analyseres med <b>XRF</b>, som bruker røntgenstråling. Slaggbitene (ofte fra temperaturstaven) knuses til pulver og presses til en <b>slaggmynt</b>.</p>
<p>XRF er dårlig på de aller letteste grunnstoffene, f.eks. magnesium og aluminium.</p>`,
      check: 'lab-0'
    },
    {
      title: 'Når du kjører en prøve på nytt',
      body: `<p>Overflaten freses eller slipes på nytt, så resultatet blir litt annerledes. Det er helt normalt, og begge resultatene er like gyldige.</p>`,
      check: 'lab-7'
    }
  ],

  elektroder: [
    {
      title: 'Elektrodene',
      body: `<p>Strømmen kommer inn i ovnen gjennom store <b>grafittelektroder</b>. Stålovnen har tre.</p>
<p>En elektrode er <b>tre biter</b> som skrues sammen med gjengede <b>nipler</b>. Grafitt er sprøtt, og nippelområdet er svakest. Derfor skal klembakken aldri klemme der.</p>`,
      check: 'elektroder-3'
    },
    {
      title: 'Lysbuen',
      body: `<p>Mellom elektroden og skrapet dannes en <b>lysbue</b>, en slags kontinuerlig lyn. Den er 10 000–30 000 °C og er det som smelter skrapet.</p>
<p>Slaggen skal dekke lysbuen. Da går varmen ned i stålet og ikke ut i veggene.</p>`,
      check: 'elektroder-9'
    },
    {
      title: 'Hvorfor elektrodene blir kortere',
      body: `<ul><li><b>Sideoksidasjon</b> (ca. halvparten): den glødende elektroden brenner i lufta. Spraykjøling med vann hjelper.</li>
<li><b>Tippfordamping</b> (ca. ¼): tuppen blir så varm at karbonet fordamper.</li>
<li><b>Tippbrudd</b> (ca. ¼): biter knekker av.</li></ul>`,
      check: 'elektroder-6'
    },
    {
      title: 'Overslag: når strømmen tar feil vei',
      body: `<p>Et <b>overslag</b> er når strømmen går en annen vei enn ned i stålet, f.eks. gjennom støv, vann eller sprut og over i hvelvet eller panelene.</p>
<p>Det er farlig fordi det kan brenne hull på <b>vannkjølte</b> deler og gi vannlekkasje. Derfor støvsuges hvelvet under stans.</p>`,
      check: 'elektroder-13'
    }
  ],

  metallurgi: [
    {
      title: 'Stål er jern med litt karbon',
      body: `<p>Atomene i stål ligger i et fast mønster som kalles et <b>gitter</b>. Det er to viktige former:</p>
<ul><li><b>Austenitt:</b> finnes når stålet er veldig varmt. Har god plass til karbon og er <b>ikke magnetisk</b>.</li>
<li><b>Ferritt:</b> finnes når stålet har kjølt seg ned. Har lite plass til karbon og er <b>magnetisk</b>.</li></ul>
<p>(Fagnavnene er FCC for austenitt og BCC for ferritt.)</p>`,
      check: 'metallurgi-0'
    },
    {
      title: 'Bråkjøling gir hardt stål',
      body: `<p>Kjøles varmt stål veldig raskt, f.eks. i en bøtte vann, rekker ikke atomene å flytte seg. Da får vi <b>martensitt</b>: veldig hardt stål med mye indre spenning. I mikroskopet ser det ut som nåler.</p>`,
      check: 'metallurgi-3'
    },
    {
      title: 'Korn og feil i krystallene',
      body: `<p>Stål består av mange små krystaller som kalles <b>korn</b>. Grensen mellom dem heter <b>korngrense</b>.</p>
<p><b>Små korn er bra</b>, fordi de gir sterkere og seigere stål. Noen legeringer brukes nettopp for å holde kornene små.</p>
<p>Krystallene har alltid små «feil», f.eks. hull eller fremmede atomer. Karbon er så lite at det legger seg <i>mellom</i> jernatomene.</p>`,
      check: 'metallurgi-9'
    }
  ],

  skrap: [
    {
      title: 'Krav til skrapet vi kjøper',
      body: `<ul><li>Maks <b>500 kg</b> per bit.</li>
<li>Tanker og beholdere skal være <b>åpne i begge ender</b>, ellers kan de eksplodere.</li>
<li>Det skal ikke være jord, betong, plast, gummi, olje eller lignende i skrapet.</li>
<li>Det skal ikke være synlig kobber, tinn, bly eller rustfritt stål.</li></ul>`,
      check: 'skrap-1'
    },
    {
      title: 'Skrapklassene',
      body: `<p>Skrapet sorteres i <b>8 klasser</b>, og hver klasse har sine faste hauger (dunger). De to siste sifrene i dungenummeret forteller hvilken type det er:</p>
<ul class="tight"><li><b>-09 HMS:</b> store biter, brukes mest</li><li><b>-11 A3:</b> grovt og tungt</li><li><b>-13 Saksklipp/LR:</b> rene, mellomstore biter</li><li><b>-14 Shredder:</b> små biter, fyller ut</li><li><b>-16 Spon:</b> fint, ruster lett</li><li><b>409 Korg:</b> passer ikke på conveyoren</li><li><b>115 Skoller:</b> rester fra egen produksjon</li><li><b>-17 Råjern:</b> mye karbon</li></ul>`,
      check: 'skrap-5'
    },
    {
      title: 'Sporelementer: det vi ikke får ut igjen',
      body: `<p>Kobber, nikkel, krom, molybden og tinn følger med skrapet og blir værende i stålet. Derfor velger vi skrap med omhu:</p>
<ul><li><b>Spon</b> inneholder ofte <b>molybden</b>.</li><li><b>Råjern</b> kan inneholde <b>svovel</b>.</li><li><b>LR</b> («Low Residual») er ekstra rent skrap til strenge kvaliteter.</li></ul>`,
      check: 'skrap-10'
    },
    {
      title: 'Mottak og testing',
      body: `<ul><li>Alt skrap kjøres gjennom en <b>portal som måler radioaktivitet</b> før det veies.</li>
<li>Fukt og skitt trekkes fra prisen.</li>
<li>Harsco <b>screener</b> skrap med magnet for å finne det som ikke er stål.</li>
<li>Skrapklasserne bruker en håndholdt analysator for å sjekke sporelementer.</li></ul>`,
      check: 'skrap-18'
    },
    {
      title: 'Resepter og korg',
      body: `<p>Hver kvalitet har en <b>resept</b> som sier hvilke skraptyper som skal i kassa. Den tar hensyn til både <b>kjemi</b> (sporelementer) og <b>energi</b> (store, tunge biter blandes med lettsmeltet skrap).</p>
<p>Skrap som floker seg, som ikke er magnetisk, eller som er for stort, går i <b>korg</b> og settes rett i ovnen.</p>`,
      check: 'skrap-7'
    }
  ],

  conveyor: [
    {
      title: 'Hvordan conveyoren fungerer',
      body: `<p>Skrapet lastes på et langt bånd som rister det inn i stålovnen. På veien går det gjennom en <b>forvarmingsdel</b>, der varm avgass fra ovnen (ca. 800 °C) varmer skrapet og tørker bort vann og is.</p>
<p>Det gir ca. <b>10 % lavere strømforbruk</b> og mindre støv, fordi ovnslokket (hvelvet) kan bli liggende på.</p>`,
      check: 'conveyor-1'
    },
    {
      title: 'God lasting',
      body: `<p>Én kasse er én charge, ca. <b>92 tonn</b>. Skrapet skal ligge <b>tett, men ikke for høyt</b>. En god blanding av store og små biter gjør at båndet kan gå roligere, og da får skrapet bedre tid til å varmes opp.</p>`,
      check: 'conveyor-7'
    },
    {
      title: 'Når vi bruker korg i stedet',
      body: `<ul><li>Første charge etter en lang stans, for å lage en «sump» av flytende stål.</li>
<li>Skrap som er for stort (over 0,5 × 0,5 × 1,5 m eller 500 kg), umagnetisk eller floker seg.</li></ul>`,
      check: 'conveyor-4'
    }
  ],

  stalovn: [
    {
      title: 'Stålovnens jobb',
      body: `<p>Stålovnen smelter skrapet med strøm fra <b>tre elektroder</b>. Samtidig lager vi en <b>slagg</b> som:</p>
<ul><li>beskytter ovnen mot lysbuen</li><li>holder på varmen</li><li>fanger opp <b>fosfor</b>, som vi ikke vil ha i stålet</li></ul>`,
      check: 'stalovn-0'
    },
    {
      title: 'Hva vi tilsetter',
      body: `<ul><li><b>Brent kalk</b> lager slaggen og fanger fosfor.</li>
<li><b>Dolomitt</b> gir magnesium (MgO), som beskytter ovnssteinen.</li>
<li><b>Karbon + oksygen</b> lager gass som får slaggen til å skumme. <b>Skumslaggen</b> dekker lysbuen.</li></ul>
<p>⚠️ Brent kalk blir varm når den møter fukt. Får du kalkstøv i øynene, skyll med en gang.</p>`,
      check: 'stalovn-5'
    },
    {
      title: 'Oksygen brenner, også jern',
      body: `<p>Oksygen som blåses inn, brenner karbon, silisium og mangan og gir ekstra varme. Men er det lite av dem igjen, brenner oksygenet <b>jern</b>. Da får slaggen mye jernoksid (FeO), og vi mister stål.</p>
<p>Kobber og nikkel brenner nesten ikke. Det er derfor de blir værende i stålet.</p>`,
      check: 'stalovn-8'
    },
    {
      title: 'Riktig slagg',
      body: `<p>Slaggen styres med tilsatser og måles med <b>B2</b> (kalk delt på kvarts). Målet er ca. <b>1,8</b>. Høyere B2 gir stivere slagg.</p>
<p>Slaggen skal være skummende og luftig, så den dekker lysbuen godt.</p>`,
      check: 'stalovn-13'
    },
    {
      title: 'Fosfor ut, slagg av',
      body: `<p>Fosforet går fra stålet opp i slaggen og blir bundet av kalken. Så <b>slagger vi av</b>, det vil si at ovnen tippes og slaggen helles ut.</p>
<p>Det må skje <b>før</b> temperaturen økes. Ellers kan fosforet gå tilbake i stålet, en «fosforbom».</p>
<p>Vi vil heller ikke ha med slagg fra stålovnen over i øsa.</p>`,
      check: 'stalovn-19'
    }
  ],

  tapping: [
    {
      title: 'Riktig temperatur',
      body: `<p>Stålet i øsa kjøles ned ca. <b>1,3 °C per minutt</b>. Venter øsa før øseovnen, må stålet tappes varmere.</p>
<p>Er stålet for kaldt, kan det størkne i øsa (skoller). Er det for varmt, sliter det på steinen.</p>`,
      check: 'tapping-0'
    },
    {
      title: 'Tilsatser under tapping',
      body: `<ul><li><b>FeSi</b> og <b>SiMn</b> begynner å fjerne oksygen fra stålet (<b>tetting</b>).</li>
<li><b>Kalk</b> lager slagg som senere kan ta opp svovel.</li>
<li><b>Karbon</b> legerer stålet på noen kvaliteter.</li></ul>`,
      check: 'tapping-4'
    },
    {
      title: 'Kok i øsa',
      body: `<p>Karbon og oksygen kan lage gass (CO) i stålet, og da «koker» øsa. Fukt kan også gi kok. Det kan gi smell, sprut og brann.</p>
<p>⚠️ Hold avstand når øser med stål flyttes. <b>Drepersiloen</b> kan raskt tilsette FeSi for å dempe kokingen.</p>`,
      check: 'tapping-8'
    }
  ],

  oseovn: [
    {
      title: 'Øseovnens jobb',
      body: `<p>Øseovnen <b>finjusterer kjemien</b> etter kundens krav og sørger for at stålet har <b>riktig temperatur</b> når det sendes til strengen. Den har også elektroder, men mindre enn stålovnen.</p>`,
      check: 'oseovn-0'
    },
    {
      title: 'Bulk eller tråd',
      body: `<p>De fleste tilsatsene kommer fra siloer som biter eller pulver (<b>bulk</b>). Bulk legger seg ofte oppå slaggen til øsa spyles.</p>
<p><b>Tråd</b> mates rett ned i stålet. Det gir rask og nøyaktig tilsats.</p>`,
      check: 'oseovn-1'
    },
    {
      title: 'Slaggbyggerne',
      body: `<ul><li><b>Kalk</b> fanger svovel, men gjør slaggen stivere.</li>
<li><b>Alumet</b> og <b>flusspat</b> gjør slaggen tynnere igjen.</li>
<li><b>Kalsiumkarbid</b> brukes på høykarbon. ⚠️ Med vann lager den eksplosiv gass og skal holdes tørr.</li></ul>`,
      check: 'oseovn-8'
    },
    {
      title: 'Legeringene',
      body: `<p>Legeringene heter <b>Fe + stoffet</b>: FeSi (silisium), FeMn (mangan), SiMn, FeV (vanadium), FeNb (niob), FeTi (titan), FeB (bor) og FeCr (krom).</p>
<p>OBS: FeMn og FeCr inneholder også karbon.</p>
<p>Har vi brukt <b>aluminium</b>, må vi tilsette <b>CaSi-tråd</b>. Ellers kan aluminiumsrester tette igjen hullene på strengen (groing).</p>`,
      check: 'oseovn-5'
    }
  ],

  elementer: [
    {
      title: 'Karbon: sjefen',
      body: `<p>Mer karbon gir <b>hardere og sterkere</b> stål, men også sprøere. Over ca. <b>0,3 % karbon</b> blir stålet vanskeligere å sveise.</p>`,
      check: 'elementer-0'
    },
    {
      title: 'Hjelperne',
      body: `<ul><li><b>Mangan, silisium og aluminium</b> fjerner oksygen (tetter stålet). Mangan gir også styrke.</li>
<li><b>Vanadium og niob</b> lager bittesmå partikler som gjør stålet sterkere og holder kornene små.</li>
<li><b>Titan og bor</b> virker i små mengder, men brenner lett. Stålet må være godt tettet før de tilsettes.</li></ul>`,
      check: 'elementer-7'
    },
    {
      title: 'Bråkmakerne',
      body: `<ul><li><b>Fosfor:</b> stålet blir sprøtt når det er kaldt.</li>
<li><b>Svovel:</b> stålet sprekker under varmvalsing.</li>
<li><b>Nitrogen:</b> gir sprøhet, særlig i sveis. Kommer fra lufta.</li>
<li><b>Kobber og tinn:</b> gir sprekker i overflaten ved valsing.</li>
<li><b>Bly:</b> ⚠️ helseskadelig støv. Bruk støvmaske.</li></ul>`,
      check: 'elementer-8'
    },
    {
      title: 'Egenskaper du hører om',
      body: `<ul class="tight"><li><b>Styrke:</b> hvor mye kraft stålet tåler</li><li><b>Hardhet:</b> motstand mot å bli bulket</li><li><b>Duktilitet:</b> kan bøyes uten å sprekke</li><li><b>Seighet:</b> styrke og duktilitet sammen</li><li><b>Sprøhet:</b> sprekker lett, og det er dårlig</li></ul>
<p><b>Små korn</b> gir bedre stål.</p>`,
      check: 'elementer-15'
    }
  ],

  slaggtemp: [
    {
      title: 'Spyling',
      body: `<p>Gass (vanligvis <b>argon</b>) blåses inn gjennom en stein i bunnen av øsa. Det rører om, slik at kjemi og temperatur blir lik i hele øsa, og slaggen og stålet får reagere.</p>`,
      check: 'slaggtemp-0'
    },
    {
      title: 'Tetting: få ut oksygenet',
      body: `<p>Oksygen som er løst i stålet, «spiser» legeringene og lager gassbobler (porer) når stålet størkner. Derfor <b>tetter</b> vi stålet med <b>silisium, mangan eller aluminium</b>. De binder oksygenet.</p>`,
      check: 'slaggtemp-5'
    },
    {
      title: 'Slaggen på øseovnen',
      body: `<p>Fargen på slaggen sier mye:</p>
<ul class="tight"><li>⚪ <b>Hvit:</b> mye kalk, lite oksygen. Bra!</li><li>⚫ <b>Svart:</b> mye jernoksid (FeO)</li><li>🟢 <b>Grønn:</b> mye mangan</li></ul>
<p>Kalk i slaggen fjerner <b>svovel</b> (avsvovling). Før levering stives slaggen av, så den ikke følger med stålet videre.</p>`,
      check: 'slaggtemp-9'
    },
    {
      title: 'Riktig temperatur til strengen',
      body: `<p>Stålet skal leveres ca. <b>40–50 °C over</b> temperaturen der det begynner å størkne (<b>likvidus</b>). Mer karbon gir lavere likvidus.</p>
<p>Det er tregt å varme opp på øseovnen. Er stålet for varmt, kan vi senke med <b>kjøleblooms</b> (biter av emner).</p>`,
      check: 'slaggtemp-14'
    },
    {
      title: 'Kundekrav',
      body: `<p><b>CE2</b> er ett tall som oppsummerer hvor hardt og sveisbart stålet blir. Karbon og mangan teller mest. Høyere CE2 gir hardere, men mindre sveisbart stål.</p>
<p>Vi vil også ha nok mangan i forhold til silisium (<b>Mn/Si over 3</b>). Det gjør utstøpningen enklere.</p>`,
      check: 'slaggtemp-21'
    }
  ],

  dorken: [
    {
      title: 'Øsas runde',
      body: `<p>Dørkoperatørene flytter øsene med <b>kran 30</b> og øsevogner:</p>
<p>stålovn (tapping) → øseovn → strengen (tårnet) → tilbake for tømming og klargjøring → ny tapping.</p>`,
      check: 'dorken-16'
    },
    {
      title: 'Bunnen av øsa',
      body: `<ul><li><b>Spylestein:</b> her blåses gassen inn.</li>
<li><b>Tappemekanismen:</b> to glideplater, en innerterning og en tipp. Platene skyves for å åpne og stenge strålen.</li></ul>
<p>Delene slites og byttes jevnlig. Platene byttes etter noen få charger, innerterningen etter ca. 20.</p>`,
      check: 'dorken-10'
    },
    {
      title: 'Når noe ikke går som planlagt',
      body: `<ul><li><b>Miksing:</b> en charge med feil kjemi blandes med en ny charge.</li>
<li><b>Overtømming:</b> virker ikke spylingen, helles stålet over i en annen øse.</li>
<li><b>Øselokk:</b> holder varmen hvis øsa må vente.</li></ul>`,
      check: 'dorken-3'
    },
    {
      title: 'Øsebrennerne',
      body: `<p>Tomme øser holdes varme under brennere. Det hindrer at steinen sprekker av temperatursjokk, at stål fryser fast, og at fukt gir eksplosjon ved tapping.</p>
<p>Brennerne fyres med CO-gass (billig, fra industriparken) eller olje.</p>`,
      check: 'dorken-12'
    }
  ],

  strengen: [
    {
      title: 'Fra flytende stål til emner',
      body: `<ol class="steps"><li><b>Fordeleren:</b> et basseng som stålet fra øsa renner ned i. Det er en buffer, så støpingen ikke stopper når øsa byttes.</li>
<li><b>Kokillene:</b> vannkjølte former der stålet får et fast skall.</li>
<li><b>Kjølesonen:</b> resten av stålet størkner innover.</li>
<li><b>Brennerne:</b> kutter emnene i riktig lengde.</li>
<li><b>Venderista:</b> emnene snus så de ikke bøyer seg mens de kjøles.</li></ol>`,
      check: 'strengen-1'
    },
    {
      title: 'Beskytte stålet mot lufta',
      body: `<p>Lufta inneholder oksygen som lager slagg i stålet. Derfor:</p>
<ul><li><b>Dekkmiddel</b> (vermikulitt) strøs over fordeleren.</li>
<li><b>Støperør</b> fører stålet fra øsa ned i fordeleren.</li>
<li><b>Olje</b> smører kokillene, og kokillene <b>vibrerer</b> (oscillerer) så stålet ikke setter seg fast.</li></ul>`,
      check: 'strengen-2'
    },
    {
      title: 'Størkning',
      body: `<p>Emnet størkner <b>utenfra og inn</b>. Først blir stålet austenitt (ikke magnetisk). Når det kjøles videre, blir det ferritt og <b>perlitt</b> (striper av ferritt og en hard karbonrik fase).</p>
<p>Legeringsstoffene samler seg litt i midten av emnet. <b>EMS</b> (magnetisk omrøring) jevner dette ut.</p>`,
      check: 'strengen-11'
    },
    {
      title: 'Feil på emner',
      body: `<ul class="tight"><li><b>Pipe:</b> hull i midten, når det ikke er nok stål til å fylle opp</li>
<li><b>Porer:</b> gassbobler, fordi stålet ikke var godt nok tettet</li>
<li><b>Diagonalfeil:</b> skjevt emne på grunn av ujevn kjøling</li>
<li><b>Slagg i overflaten:</b> gir skrapemne</li>
<li><b>Groing:</b> hullet tettes igjen, oftest på grunn av aluminium</li></ul>`,
      check: 'strengen-16'
    }
  ],

  ildfast: [
    {
      title: 'Stein som tåler varmen',
      body: `<p><b>Ildfast</b> er stein og masse som tåler flytende stål. Uten den ville stålet smeltet seg gjennom stålkappen.</p>
<ul><li><b>Stålovnen</b> mures med stein av nesten ren <b>magnesitt (MgO)</b>.</li>
<li><b>Øsene</b> mures med stein av MgO og kalk.</li></ul>`,
      check: 'ildfast-0'
    },
    {
      title: 'Masser og smådeler',
      body: `<ul><li><b>Sprøytemasse</b> sprøytes på veggen for å reparere ovnen underveis.</li>
<li><b>Oljegrus</b> legges i slaggdøra, så slaggen løsner lett.</li>
<li><b>Tappehullssand</b> hindrer at stål størkner i tappehullet.</li>
<li><b>Dørstokken</b> lages av gamle elektrodebiter.</li></ul>`,
      check: 'ildfast-6'
    },
    {
      title: 'Hvordan steinen slites',
      body: `<ul><li><b>Erosjon:</b> stål og slagg i bevegelse sliter jevnt. Det er det vanligste.</li>
<li><b>Lysbuesår:</b> lysbuen er dårlig dekket og brenner hull.</li>
<li><b>Kjemisk:</b> oksygen eller slagg «spiser» steinen.</li></ul>
<p>Mest slitasje er det i felt 1 og 2 i ovnen, nærmest elektrodene.</p>`,
      check: 'ildfast-14'
    }
  ],

  resirk: [
    {
      title: 'Det meste brukes igjen',
      body: `<p>Det vi får til overs, gjenvinnes så langt det går. Vi samarbeider med <b>Harsco</b>, <b>Anleggsservice</b> og <b>MIT</b>, og alt veies over bilvekta.</p>
<p><b>Skoller</b> (størknede stålrester) bearbeides og havner tilbake i skraplageret.</p>`,
      check: 'resirk-0'
    },
    {
      title: 'Svart og hvit slagg',
      body: `<ul><li><b>Svartslagg</b> kommer fra stålovnen og selges videre av Harsco.</li>
<li><b>Hvitslagg</b> kommer fra øseovnen. Den fine delen selges, og den grove deponeres.</li></ul>`,
      check: 'resirk-1'
    },
    {
      title: 'Stein, støv og glødeskall',
      body: `<ul><li>Gammel <b>øsestein</b> kjøres inn i stålovnen igjen i storsekker.</li>
<li>Gammel <b>ovnsstein</b> blir til resirkulert magnesitt og oljegrus.</li>
<li><b>Rødstøv</b> fra renseanlegget og <b>glødeskall</b> (flak fra emnene) selges.</li></ul>`,
      check: 'resirk-10'
    }
  ]
};

const GLOSSARY = [
  ['Avslagging', 'Å tippe ovnen eller øsa så slaggen renner ut.'],
  ['B2 / B3', 'Tall som viser hvor basisk (og stiv) slaggen er. B2 = CaO / SiO₂.'],
  ['CE2', 'Karbonekvivalent: ett tall som viser hvor hardt og sveisbart stålet blir.'],
  ['Charge', 'Én porsjon stål, én ovnsfylling. Én skrapkasse (~92 tonn) blir én charge.'],
  ['Conveyor', 'Transportbåndet som rister skrapet inn i stålovnen og forvarmer det.'],
  ['Dekkmiddel', 'Isolerende stoff (vermikulitt) som strøs over stålet i fordeleren.'],
  ['Dunge', 'Haug med én bestemt skraptype i skraplageret.'],
  ['Dørken', 'Området og operatørene som flytter og klargjør øsene.'],
  ['Elektrode', 'Grafittstang som leder strøm inn i ovnen og lager lysbuen.'],
  ['Emne (billet)', 'Lang, firkantet stålstang som støpes på strengen.'],
  ['EMS', 'Elektromagnetisk omrøring i kokillen.'],
  ['Ferrolegering', 'Legering av jern og et annet stoff, f.eks. FeSi og FeMn, som brukes til å justere kjemien.'],
  ['Fordeler', 'Basseng mellom øsa og kokillene på strengen.'],
  ['Gjennombrudd', 'Når flytende stål bryter gjennom skallet på emnet eller gjennom ildfasten.'],
  ['Groing', 'Når hullene som stålet renner gjennom, tettes igjen (ofte av aluminiumsoksid).'],
  ['Harsco', 'Firmaet som håndterer slagg og skoller og screener skrap.'],
  ['Hvelv', 'Taket eller lokket på ovnen.'],
  ['Ildfast', 'Stein og masse som tåler flytende stål.'],
  ['Kokille', 'Vannkjølt form der stålet får sitt første faste skall.'],
  ['Korg', 'Stor kurv som skrap lastes i når det ikke kan gå på conveyoren.'],
  ['Likvidus', 'Temperaturen der stålet begynner å størkne.'],
  ['Lysbue', 'Den ekstremt varme «lynstrålen» mellom elektroden og stålet.'],
  ['Miksing', 'Å blande to charger for å få kjemien innenfor kravene.'],
  ['Skoller', 'Størknede stålrester som gjenvinnes.'],
  ['Slagg', 'Smeltede oksider som flyter oppå stålet, som olje på vann.'],
  ['Sporelementer', 'Stoffer som kobber, nikkel og tinn som kommer med skrapet og ikke kan fjernes.'],
  ['Spyling', 'Gass som blåses inn i bunnen av øsa for å røre om.'],
  ['Strengen', 'Støpemaskinen (CCM) der stålet støpes til emner.'],
  ['Tapping', 'Å helle stålet fra stålovnen over i øsa.'],
  ['Tetting', 'Å fjerne oksygen fra stålet med silisium, mangan eller aluminium.'],
  ['TP-kvalitet', 'Stålkvalitet med eget nummer (f.eks. TP26) og egne krav.'],
  ['Øse', 'Stor stålbøtte foret med ildfast stein som frakter flytende stål.'],
  ['Øseovn', 'Ovnen der kjemi og temperatur finjusteres i øsa.']
];
