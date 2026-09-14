import type { Category, Dare } from '../types'

type Seed = { text: string; category: Category; duration?: number; special?: boolean; target?: Dare['target']}
const make = (level: Dare['spiceLevel'], rows: Seed[]): Dare[] => rows.map((row, index) => ({
  id: `builtin-${level}-${index + 1}`, text: row.text, category: row.category, spiceLevel: level,
  target: row.target ?? 'Beliebig', duration: row.duration, isTimer: Boolean(row.duration), isSpecial: Boolean(row.special), spiceValue: level + (level === 1 ? 1 : 0) + (row.special ? 1 : 0)
}))

const one: Seed[] = [
  // =========================
  // BELIEBIG
  // =========================
  { text: 'Küsst euch 20 Sekunden lang langsam und zärtlich.', category: 'Romantic', duration: 20, target: 'Beliebig'},
  { text: 'Gib deinem Partner einen Kuss', category: 'Romantic', target: 'Beliebig'},
  { text: 'Sage deinem Partner ein Kompliment', category: 'Romantic', target: 'Beliebig'},
  { text: 'Einer legt die Hand auf den Oberschenkel des anderen und lässt sie 15 Sekunden dort.', category: 'Touch', duration: 15, target: 'Beliebig'},
  { text: 'Umarmt euch, als hättet ihr euch seit Monaten nicht mehr gesehen.', category: 'Romantic', target: 'Beliebig'},
  { text: 'Flüstert euch abwechselnd etwas Flirty ins Ohr.', category: 'Flirty', target: 'Beliebig'},
  { text: 'Einer massiert dem anderen 25 Sekunden den Nacken.', category: 'Massage', duration: 25, target: 'Beliebig'},
  { text: 'Einer hält den anderen an den Haaren/oder im Nacken und küsst ihn/sie 10 Sekunden etwas härter.', category: 'Massage', duration: 10, target: 'Beliebig'},
  { text: 'Zieh zwei kleidungsstücke deiner Wahl aus', category: 'Romantic', target: 'Beliebig'},
  { text: 'Küsse deinem Partner', category: 'Romantic', target: 'Beliebig'},
  { text: 'Zieh deinem Partner ein Kleidungsstück aus', category: 'Romantic', target: 'Beliebig'},
  { text: 'Gib deinem Partner eine Rückenmassage', category: 'Romantic', target: 'Beliebig'},
  { text: 'Berührt die Zungen miteinander', category: 'Romantic', target: 'Beliebig'},
  { text: 'Zieh ein kleidungsstücke deiner Wahl aus', category: 'Romantic', target: 'Beliebig'},
  { text: 'Gib deinem Partner ein Kompliment', category: 'Romantic', target: 'Beliebig'},



  // =========================
  // NUR MANN
  // =========================

  { text: 'Küsse deinen Partner 15 Sekunden am Hals', category: 'Romantic', duration: 15, target: 'Mann'},
  { text: 'Gib deinen Partner einen Kuss auf die Stirn', category: 'Romantic', target: 'Mann'},
  { text: 'Streichle die Oberschenkel deines Partners 20 Sekunden von außen nach innen', category: 'Touch', duration: 20, target: 'Mann'},
  { text: 'Greif sanft nach dem Po deines Partners und halte ihn solange du willst', category: 'Touch', target: 'Mann'},
  { text: 'Zieh deinen Partner an den Hüften näher zu dir und halte sie', category: 'Flirty', target: 'Mann'},
  { text: 'Zieh ein Kleidungsstück aus', category: 'Flirty', target: 'Mann'},
  { text: 'Gib deinen Partner einen Kuss auf den Arsch', category: 'Flirty', target: 'Mann'},
  { text: 'Sage deinem Partner, was du an ihr besonders attraktiv findest', category: 'Flirty', target: 'Mann'},
  { text: 'Streichle deinem Partner ihren Bauch', category: 'Touch', target: 'Mann'},
  { text: 'Drücke dich 15 Sekunden mit dem Schritt an deinem Partner ihren Ass', category: 'Spicy', duration: 15, target: 'Mann'},
  { text: 'Beiß sanft deiner Partner in den Nacken', category: 'Spicy', target: 'Mann'},
  { text: 'Streichle ihre Brüste über dem BH/Oberteil', category: 'Spicy', target: 'Mann'},
  { text: 'Lass sie auf deinem Schoß sitzen und küsse sie, während du ihren Po greifst', category: 'Spicy', target: 'Mann'},
  { text: 'Massiere ihre Füße 20 Sekunden', category: 'Massage', duration: 20, target: 'Mann'},
  { text: 'Küsse ihren Bauch runter bis zu ihrer Pussy (angezogen)', category: 'Spicy', target: 'Mann'},
  { text: 'Mach mit deiner hübschen Freundin rum', category: 'Romantic', target: 'Mann'},
  


  // =========================
  // NUR FRAU
  // =========================
  { text: 'Gib deinem Partner einen Kuss auf die Wange', category: 'Romantic', target: 'Frau'},
  { text: 'Sage deinem Partner, was du an ihm besonders attraktiv findest', category: 'Flirty', target: 'Frau'},
  { text: 'Streichle deinem Partner seinen Oberkörper', category: 'Touch', target: 'Frau'},
  { text: 'Setz dich für 20 Sekunden auf seinen Schoß und schaue ihn an', category: 'Flirty', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Hose', category: 'Spicy', target: 'Frau'},
  { text: 'Massiere seine Brust 20 Sekunden', category: 'Flirty', duration: 20, target: 'Frau'},
  { text: 'Reibe dich 15 Sekunden leicht an seinem Oberschenkel.', category: 'Spicy', duration: 15, target: 'Frau'},
  { text: 'Lass deinem Partner dich an die Wand drücken und küsst euch intensiv', category: 'Spicy', target: 'Frau'},
  { text: 'Fasse seinen Schwanz fest an (über der Kleidung) und halte ihn', category: 'Spicy', target: 'Frau'},
  { text: 'Zieh dein Shirt hoch und mach einen sexy Bauchtanz', category: 'Spicy', target: 'Frau'},
  { text: 'Lass dir von deinem Partner einen Klaps auf den Hintern geben', category: 'Flirty', target: 'Frau'},
  { text: 'Setz dich für 2 Runden auf deinem Partner', category: 'Flirty', target: 'Frau'},
]


const two: Seed[] = [
  // =========================
  // BELIEBIG
  // =========================
  { text: 'Küsst euch, während einer dem anderen das Shirt auszieht', category: 'Romantic', target: 'Beliebig'},
  { text: 'Haltet euch 25 Sekunden nackt am Oberkörper und küsst euch zärtlich', category: 'Romantic', duration: 25, target: 'Beliebig'},
  { text: 'Einer streichelt den anderen unter dem Shirt', category: 'Touch', target: 'Beliebig'},
  { text: 'Einer zieht dem anderen die Hose aus', category: 'Flirty', target: 'Beliebig'},
  { text: 'Einer massiert dem anderen 30 Sekunden den Po (über der Unterwäsche)', category: 'Massage', duration: 30, target: 'Beliebig'},
  { text: 'Einer greift dem anderen fest zwischen die Beine (über der Unterwäsche)', category: 'Spicy', target: 'Beliebig'},
  { text: 'Zieht euch bis auf Unterwäsche aus und streichelt euch', category: 'Spicy', target: 'Beliebig'},
  { text: 'Einer flüstert dem anderen schmutzige Fantasien ins Ohr', category: 'Flirty', target: 'Beliebig'},
  { text: 'Küsse deinem Partner mit Zunge', category: 'Flirty', target: 'Beliebig'},
  { text: 'Eure nächste Aktivität in der Öffentlichkeit müsst ihr beide ohne Unterhose und ohne BH machen', category: 'Spicy', target: 'Beliebig' },
  { text: 'Wenm ihr das nächste mal Auto fährt müsst ihr durchgehend dirty reden', category: 'Flirty', target: 'Beliebig' },
  { text: 'Spielt eine Runde eines Spiels eurer Wahl, während einer den anderen streichelt', category: 'Flirty', target: 'Beliebig' },

  { text: 'Spielt 5 Minuten „Fremde in der Bar“: Einer spricht den anderen an, als würdet ihr euch nicht kennen, und verführt ihn/sie', category: 'Surprise', target: 'Beliebig' },
  { text: 'Macht „Boss und Sekretär/in“: Einer ist der strenge Chef und gibt dem anderen Befehle, was er/sie tun soll', category: 'Surprise', target: 'Beliebig' },
  { text: 'Spielt „Streamer und Fan“: Einer streamt (auch wenn nur so getan), der andere ist der obsessive Fan, der alles tun würde', category: 'Surprise', target: 'Beliebig' },
  { text: 'Macht „Prostituierte und Freier“: Einer bezahlt (auch nur so tun) und sagt genau, was er/sie will', category: 'Surprise', target: 'Beliebig' },
  { text: 'Spielt 5 Minuten „Sklave/Sklavin“: Einer darf nur sprechen, wenn er/sie gefragt wird, und muss alles befolgen', category: 'Surprise', target: 'Beliebig' },
  { text: 'Macht „Arzt und Patient“: Einer untersucht den anderen sehr gründlich und „medizinisch“', category: 'Surprise', target: 'Beliebig' },
  { text: 'Spielt „Einbrecher und Bewohner“: Einer ist eingebrochen und „nimmt“, was er will', category: 'Surprise', target: 'Beliebig' },

  // =========================
  // NUR MANN
  // =========================
  { text: 'Küsse ihren Bauch 20 Sekunden, nachdem du ihr Oberteil ausgezogen hast.', category: 'Romantic', duration: 20, target: 'Mann'},
  { text: 'Greif unter ihren BH und halte ihre Boobies', category: 'Touch', target: 'Mann'},
  { text: 'Streichle ihre Brüste 20 Sekunden über dem BH', category: 'Touch', duration: 20, target: 'Mann'},
  { text: 'Zieh ihre Hose etwas runter und streichle ihre Oberschenkel.', category: 'Flirty', target: 'Mann'},
  { text: 'Massiere ihren Rücken 40 Sekunden (Oberteil aus)', category: 'Spicy', duration: 40, target: 'Mann'},
  { text: 'Massiere ihre Beine 25 Sekunden von den Knien aufwärts.', category: 'Massage', duration: 25, target: 'Mann'},
  { text: 'Reibe deinen harten Schwanz 20 Sekunden an ihrem Po (noch angezogen)', category: 'Spicy', target: 'Mann'},
  { text: 'Flüstere deinem Partner ins Ohr, was du später mit ihr machen willst', category: 'Spicy', target: 'Mann'},
  { text: 'Öffne ihren BH und massiere ihre Brüste', category: 'Spicy', target: 'Mann'},
  { text: 'Greif unter ihren Slip und streichle außen', category: 'Spicy', target: 'Mann'},
  { text: 'Zieh dich aus bis auf die Unterhose und lass deinem Partner dich anfassen', category: 'Spicy', target: 'Mann'},
  { text: 'Halte ihre Hände fest und küsse ihren ganzen Oberkörper', category: 'Spicy', target: 'Mann'},
  { text: 'Stöhne deinem partner ihren nahmen und sag noch dazu "gib mir deine geile Pussy" etc.', category: 'Spicy', target: 'Mann'},

  { text: 'Du bist der strenge Lehrer, sie die freche Schülerin. Bestrafe sie, weil sie nicht aufgepasst hat', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist der Boss, sie deine Sekretärin. Lass sie unter dem Schreibtisch ihre „Arbeit“ machen, während du „telefonierst“', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist der Fremde, der sie in einer Gasse (oder im Auto) erwischt. Sag ihr, was du jetzt mit ihr machst', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist der Pornodarsteller, sie dein neuer Co-Star. Sag ihr genau, wie die Szene ablaufen soll', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist ihr Besitzer, sie dein Spielzeug. Behandel sie 5 Minuten lang nur als Objekt zum Benutzen', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist der Handwerker, der „nur schnell was reparieren“ wollte. Es kommt natürlich anders', category: 'Surprise', target: 'Mann' },
  { text: 'Du bist der Dom, sie deine kleine Hure. Gib ihr nur Anweisungen und lass sie alles ausführen', category: 'Surprise', target: 'Mann' },
  


  // =========================
  // NUR FRAU
  // =========================
  { text: 'Küsse deinem Partner seinen nackten Oberkörper 20 Sekunden', category: 'Romantic', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Touch', target: 'Frau'},
  { text: 'Zieh dein Oberteil aus und setz dich bis zur nächsten Runde auf ihn', category: 'Flirty', target: 'Frau'},
  { text: 'Lass ihn deinen BH öffnen', category: 'Flirty', target: 'Frau'},
  { text: 'Reibe dich 20 Sekunden mit dem Slip an seinem Schwanz', category: 'Spicy', duration: 20, target: 'Frau'},
  { text: 'Zieh deinem Partner das Shirt aus und küsse seinen Oberkörper', category: 'Spicy', target: 'Frau'},
  { text: 'Gehe mit der Hand in deinem Partner seine Unterhose und fasse ihn an', category: 'Spicy', target: 'Frau'},
  { text: 'Schließe deine Augen und lege dich auf den Bauch, dein Partner küsst dich auf dem Bauch', category: 'Flirty', target: 'Frau'},
  { text: 'Teile eine Sache die dich eregt', category: 'Flirty', target: 'Frau' },
  { text: 'dein Partner darf bis zur nächsten Runde nicht "nein" sagen', category: 'Flirty', target: 'Frau' },
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Touch', target: 'Frau'},
  { text: 'Du bist die strenge Chefin, er dein Mitarbeiter. Lass ihn vor dir knien und „Entschuldigung“ sagen… auf deine Art', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die Lehrerin, er der Schüler, der nachsitzen muss. Bestimm du, wie die Strafe aussieht', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die teure Escort, er der Kunde. Sag ihm den Preis und was er dafür bekommt', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die dominante Herrin, er dein Sklave. Er darf dich nur berühren, wenn du es erlaubst', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die unschuldige Stiefschwester / Mitbewohnerin, die „aus Versehen“ etwas sieht und es ausnutzt', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die Streamerin, er dein größter Fan, der endlich ein Meet-up bekommen hat. Nutz ihn aus', category: 'Surprise', target: 'Frau' },
  { text: 'Du bist die Ärztin und er braucht eine „gründliche Untersuchung“. Sei sehr professionell… und dann gar nicht', category: 'Surprise', target: 'Frau' },

  
]
  
  



const three: Seed[] = [
  // =========================
  // BELIEBIG
  // =========================
  { text: 'Kuschelt für 40 sekunen intensiv', category: 'Romantic', duration: 40, target: 'Beliebig'},
  { text: 'Einer führt die Hand des anderen an die eigene spicy Zone und lässt sie 20 Sekunden dort betouchen', category: 'Spicy', duration: 20, target: 'Beliebig'},
  { text: 'Einer massiert dem anderen 35 Sekunden den Po und die Oberschenkel', duration: 35, category: 'Massage', target: 'Beliebig'},
  { text: 'Reibt euch nackt aneinander (Pussy/Schwanz)', category: 'Spicy', target: 'Beliebig'},
  { text: 'Zieht euch komplett aus und streichelt euch nackt', category: 'Spicy', target: 'Beliebig'},
  { text: 'Massiert euch gegenseitig die Brüste/Brustwarzen', category: 'Massage', target: 'Beliebig'},
  { text: 'Einer liegt oben und reibt sich am anderen', category: 'Touch', target: 'Beliebig'},
  { text: 'Verbindet dem anderen die Augen und streichelt ihn/sie 30 Sekunden nur mit den Fingerspitzen', category: 'Flirty', duration: 30, target: 'Beliebig' },
  { text: 'Einer muss dem anderen ins Ohr flüstern, was er/sie gleich mit ihm/ihr machen will', category: 'Flirty', target: 'Beliebig' },
  { text: 'Einer gibt dem anderen einen Befehl (z.B. „Dreh dich um“ oder „Mach die Beine breiter“) und der andere muss ihn sofort befolgen', category: 'Spicy', target: 'Beliebig' },
  { text: 'Küsse deinen Partner von Kopf bis Fuß', category: 'Romantic', target: 'Beliebig'},
  { text: 'Schick deinem Partner ein Nacktbild', category: 'Spicy', target: 'Beliebig'},
  { text: 'Ziehe deinem Partner aus', category: 'Spicy', target: 'Beliebig'},
  { text: 'Du bist erfroren, dein Partner darf machen was er will', category: 'Spicy', duration: 60, target: 'Beliebig'},
  { text: 'zieh deinem Partner die Unterwäsche mit dem Mund aus', category: 'Flirty', target: 'Frau' },
  { text: 'Macht ein gemeinsames Foto, wie ihr euch nackt umarmt', category: 'Flirty', target: 'Beliebig' },
  { text: 'Einer macht ein Foto vom anderen in einer sexy Pose (nackt oder halbnackt)', category: 'Flirty', target: 'Beliebig' },

  // =========================
  // NUR MANN
  // =========================
  { text: 'Küsse ihre Innenschenkel langsam', category: 'Romantic', target: 'Mann' },
  { text: 'Streichle ihre Pussy von außen (über dem Slip oder nackt)', category: 'Touch', target: 'Mann' },
  { text: 'Streichle ihre Brüste 20 Sekunden über dem BH', category: 'Touch', duration: 20, target: 'Mann'},
  { text: 'Massiere ihren ganzen Unterkörper (Beine, Po, Hüften)', category: 'Massage', target: 'Mann'},
  { text: 'Knette deinem Partner ihre Brüste', category: 'Massage', duration: 25, target: 'Mann'},
  { text: 'Fingere sie 20 Sekunden langsam mit einem Finger (nicht zu tief/hart)', category: 'Spicy', duration: 20, target: 'Mann'},
  { text: 'Streichle ihren Kitzler 20 Sekunden kreisend und höre auf, bevor es zu intensiv wird', category: 'Spicy', duration: 20, target: 'Mann'},
  { text: 'Zieh deiner Partnerin den Slip aus und streichle ihre Muschi', category: 'Spicy', target: 'Mann'},
  { text: 'Küsse und lecke ihre Brustwarzen, während du sie fingerst', category: 'Spicy', target: 'Mann'},
  { text: 'Lass sie dich nackt anfassen und deinen Schwanz streicheln', category: 'Spicy', target: 'Mann'},
  { text: 'Reibe deinen Schwanz an ihrer nassen Muschi (noch ohne Eindringen)', category: 'Spicy', target: 'Mann'},
  { text: 'Verbinde ihr die Augen und streichle sie 25 Sekunden nur an den Innenschenkeln und der Pussy', category: 'Flirty', duration: 25, target: 'Mann' },
  { text: 'Sag ihr leise ins Ohr: „Du bist so nass für mich“ während du sie anfasst', category: 'Flirty', target: 'Mann' },
  { text: 'Befiehl ihr: „Mach die Beine breiter“ und streichle sie dann', category: 'Spicy', target: 'Mann' },
  { text: 'Leg sie auf den Bauch und massiere ihren Po und die Oberschenkel', category: 'Massage', target: 'Mann' },
  { text: 'Leg dich in einer verführerischen Position auf dem Tisch oder Stuhl', category: 'Flirty', target: 'Mann' },
  { text: 'Gib deinen Partner ein Hickey auf den Arsch', category: 'Flirty', target: 'Mann'},
  { text: 'Lecke die Nippel von deinem Partner', category: 'Flirty', target: 'Mann'},
  { text: 'Mach ein Foto von ihr, während sie die Beine spreizt', category: 'Flirty', target: 'Mann' },
  { text: 'Film kurz, wie du ihre Pussy streichelst', category: 'Spicy', target: 'Mann' },
  { text: 'Sag ihr: „Ich will dich gleich richtig vollspritzen“', category: 'Spicy', target: 'Mann' },
  { text: 'Zieh sie draußen (Auto/Balkon) den Slip runter und lecke sie kurz', category: 'Spicy', target: 'Mann' },
  { text: 'Sag ihr draußen: „Ich könnte dich hier jeden durch ficken', category: 'Spicy', target: 'Mann' },
  { text: 'Du massiert deinem Partner 3 Minuten lang nur die Füße und küsst/leckt sie danach', category: 'Massage', target: 'Mann' },

  // =========================
  // NUR FRAU
  // =========================
  { text: 'Küsse deinem Partner seinen nackten Oberkörper 20 Sekunden', category: 'Romantic', duration: 20, target: 'Frau'},
  { text: 'Zieh dein Oberteil aus und setz dich bis zur nächsten Runde auf ihn', category: 'Flirty', target: 'Frau'},
  { text: 'Lass ihn deinen BH öffnen', category: 'Flirty', target: 'Frau'},
  { text: 'Reibe dich 20 Sekunden mit dem Slip an seinem Schwanz', category: 'Spicy', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Spicy', target: 'Frau'},
  { text: 'Zieh deinem Partner das Shirt aus und küsse seinen Oberkörper', category: 'Spicy', target: 'Frau'},
  { text: 'Gehe mit der Hand in deinem Partner seine Unterhose und fasse ihn an', category: 'Spicy', target: 'Frau'},
  { text: 'Nimm seine Hand und leg sie auf deine nasse Pussy', category: 'Spicy', target: 'Frau'},
  { text: 'Streichle seinen Schwanz 25 Sekunden langsam und fest.', category: 'Touch', duration: 25, target: 'Frau'},
  { text: 'Setz dich nackt auf ihn und reibe dich 20 Sekunden an seinem Schwanz (ohne Eindringen)', category: 'Flirty', duration: 20, target: 'Frau'},
  { text: 'Hol deinem Partner einen runter, du entscheidest wie lange', category: 'Spicy', target: 'Frau'},
  { text: 'Massiere seinen Schwanz und die Eier 30 Sekunden sehr langsam', category: 'Spicy', duration: 30, target: 'Frau'},
  { text: 'Küsse und lecke seine Eier, während du ihn einen runter holst', category: 'Spicy', target: 'Frau'},
  { text: 'Lege dich hin und öffne die Beine weit für ihn', category: 'Flirty', target: 'Frau'},
  { text: 'Nimm seine Hand und leg sie auf deine nasse Pussy', category: 'Spicy', target: 'Frau'},
  { text: 'Sag ihm: „Ich will spüren wie hart du bist“ während du ihn anfasst', category: 'Flirty', target: 'Frau' },
  { text: 'Befiehl ihm: „Fass mich an“ und leg seine Hand genau dorthin, wo du es willst', category: 'Spicy', target: 'Frau' },
  { text: 'Lass dir zwischen den beinen ein Hickey machen', category: 'Romantic', target: 'Frau' },
  { text: 'Twerke mit deinem arsch', category: 'Flirty', target: 'Frau' },
  { text: 'Zeig deinem Partner von hinten deine Pussy und lass dir deinen Ass versohlen', category: 'Flirty', target: 'Frau' },
  { text: 'mach einen typischen stripper tanz und reibe dabei deinen arsch an deinem Partner', category: 'Flirty', target: 'Frau' },
  { text: 'setze dich auf den Schoß von deinem Partner. Er darf deine Brüste so lange massieren bis du wieder dran bist', category: 'Flirty', target: 'Frau' },
  { text: 'Lass dich für 2min fesseln, dein Partner darf alles machen was er will', category: 'Spicy', target: 'Frau' },
  { text: 'Mach ein Foto von seinem harten Schwanz', category: 'Flirty', target: 'Frau' },
  { text: 'Film kurz, wie du ihn einem Runter holst', category: 'Spicy', target: 'Frau' },
  { text: 'Sag ihm: „Spritz mir später ins Gesicht“', category: 'Spicy', target: 'Frau' },
  { text: 'Zieh dir draußen den Slip aus und gib ihm die Hand, damit er fühlen kann dass du nichts drunter hast', category: 'Spicy', target: 'Frau' },
  
  

  
  
]
const four: Seed[] = [
  // =========================
  // BELIEBIG
  // =========================
  { text: 'Macht 69 in ruhigem Tempo', category: 'Romantic', target: 'Beliebig' },
  { text: 'Bringt euch oral nah an den Höhepunkt und stoppt dann abrupt', category: 'Spicy', target: 'Beliebig' },
  { text: 'Einer gibt dem anderen eine sehr langsame, massierende Oral-Behandlung', category: 'Massage', target: 'Beliebig' },
  { text: 'Verbindet dem anderen die Augen und gebt 30 Sekunden Oral', category: 'Flirty', duration: 30, target: 'Beliebig' },
  { text: 'Einer muss während des Oralsexes dem anderen sagen, wie gut es sich anfühlt', category: 'Flirty', target: 'Beliebig' },
  { text: 'Wechselt euch ab: 20 Sekunden Oral, dann Tausch', category: 'Touch', duration: 20, target: 'Beliebig' },
  { text: 'Macht ein Video von eurem 69', category: 'Spicy', target: 'Beliebig' },
  { text: 'Geht kurz raus (Auto) und einer gibt dem anderen Oral', category: 'Spicy', target: 'Beliebig' },
  { text: 'Spielt eine Runde Mario Kart, während einer dem anderen Oral gibt', category: 'Spicy', target: 'Beliebig' },
  { text: 'Spielt 2 Runden Super Mario, während einer komplett in dem anderen steckt und nicht rausziehen darf (reverse Cowgirl)', category: 'Spicy', target: 'Beliebig' },
 

  // =========================
  // NUR MANN
  // =========================
  { text: 'Leck ihre Innenschenkel 25 Sekunden und gehe dann langsam zu ihrer Pussy', category: 'Romantic', duration: 25, target: 'Mann'},
  { text: 'Fingere sie 30 Sekunden und lecke parallel ihren Kitzler', category: 'Touch', duration: 30, target: 'Mann'},
  { text: 'Lass sie 25 Sekunden auf deinem Gesicht sitzen und lecke', category: 'Touch', duration: 25, target: 'Mann'},
  { text: 'Massiere ihren Kitzler Sekunden mit der Zunge', category: 'Massage', target: 'Mann'},
  { text: 'Fingere sie, solange bis deinem Partner spritzt', category: 'Spicy', target: 'Mann'},
  { text: 'Fingere sie von hinten 25 Sekunden und lecke parallel', category: 'Spicy', duration: 25, target: 'Mann'},
  { text: 'Lass sie dir einen Blowie geben, während du ihre Haare festhältst', category: 'Spicy', target: 'Mann'},
  { text: 'Hol dir einen runter, während du sie leckst.  ', category: 'Spicy', target: 'Mann'},
  { text: 'Verbinde ihr die Augen und lecke sie 30 Sekunden, ohne dass sie weiß was als nächstes kommt', category: 'Flirty', duration: 30, target: 'Mann' },
  { text: 'Sag ihr während du sie leckst: „Du schmeckst so gut“ oder etwas Schmutzigeres', category: 'Flirty', target: 'Mann' },
  { text: 'Befiehl ihr: „Halt still“ und lecke/fingere sie dann intensiv', category: 'Spicy', target: 'Mann' },
  { text: 'Leg sie an den Bettrand und lecke sie von dort', category: 'Spicy', target: 'Mann' },
  { text: 'Leck sie, während sie steht und sich am Schrank/an der Wand festhält', category: 'Flirty', target: 'Mann' },
  { text: 'Leg sie an den Bettrand und lecke sie von dort', category: 'Spicy', target: 'Mann' },
  { text: 'Leck sie, während sie steht und sich festhält', category: 'Flirty', target: 'Mann' },
  { text: 'Film, wie du sie leckst (Nahaufnahme erlaubt)', category: 'Spicy', target: 'Mann' },
  { text: 'Mach ein Foto, während sie auf deinem Gesicht sitzt', category: 'Flirty', target: 'Mann' },
  { text: 'Film, wie du dir einen Runter holst', category: 'Spicy', target: 'Mann' },
  { text: 'Fingere sie die ganze Zeit, während sie 1–2 Runden Mario Kart / Minecraft spielt', category: 'Spicy', target: 'Mann' },
  { text: 'Leck sie, während sie ein Spiel spielt und nicht aufhören darf', category: 'Spicy', target: 'Mann' },
  { text: 'Hol dir einen runter, vor ihr', category: 'Spicy', target: 'Mann' },
  { text: 'Bind ihre Hände fest und fingere sie, ohne dass sie sich wehren darf', category: 'Spicy', target: 'Mann' },
  { text: 'Mach Praise mit ihr: Sag ihr die ganze Zeit, wie brav und geil sie ist, während du sie fingerst', category: 'Romantic', target: 'Mann' },
  { text: 'Fingere sie, während sie eine Runde Minecraft / ein Spiel spielt', category: 'Spicy', target: 'Mann' },
  { text: 'Sag ihr während du sie fingerst: „Konzentrier dich aufs Spiel, Mommy“', category: 'Spicy', target: 'Mann' },

  // =========================
  // NUR FRAU
  // =========================
  { text: 'Wichs ihn 30 Sekunden und lecke dabei seine Eier', category: 'Romantic', duration: 30, target: 'Frau'},
  { text: 'Gib ihm 30 Sekunden einen Blowie und schau ihm dabei die ganze Zeit in die Augen', category: 'Flirty', duration: 30, target: 'Frau'},
  { text: 'Saug 15 Sekunden nur an der Eichel und streichele den Schaft', category: 'Flirty', duration: 15, target: 'Frau'},
  { text: 'Gib ihm 40 Sekunden einen tiefen, nassen Blowie und spuck richtig drauf', category: 'Spicy', duration: 40, target: 'Frau'},
  { text: 'Nimm ihn so tief du kannst und halte ihn dort kurz', category: 'Spicy', target: 'Frau'},
  { text: 'Setz dich auf sein Gesicht und lecke seinen Schwanz', category: 'Spicy', target: 'Frau'},
  { text: 'Verbinde ihm die Augen und gib ihm einen Blowie, ohne dass er sehen kann was du machst', category: 'Flirty', target: 'Frau' },
  { text: 'Sag ihm während des Blowjobs: „Mommy will nacher dein Sperma“ oder etwas Schmutzigeres', category: 'Flirty', target: 'Frau' },
  { text: 'Befiehl ihm: „Fass mir in die Haare“ und blow ihn dann', category: 'Spicy', target: 'Frau' },
  { text: 'Knien vor ihm (er sitzt auf dem Stuhl/Bett) und gib ihm einen Blowie', category: 'Spicy', target: 'Frau' },
  { text: 'Leck seine Eier und wichs ihn gleichzeitig, bis er stöhnt', category: 'Massage', target: 'Frau' },
  { text: 'Gib ihm einen Blowie und lass ihn entscheiden, wann du aufhören sollst', category: 'Flirty', target: 'Frau' },
  { text: 'Hol deinem Partner mit deinen Füßen einen runter', category: 'Spicy', target: 'Frau' },
  { text: 'Mach ein Foto von seinem Schwanz in deinem Mund', category: 'Flirty', target: 'Frau' },
  { text: 'Filme deinem Partner, währen er dich fingert', category: 'Spicy', target: 'Frau' },
  { text: 'Mach ein foto wie er dich gerade leckt', category: 'Spicy', target: 'Frau' },
  { text: 'Lass ihn dir in den Mund spritzen und zeig es ihm danach', category: 'Spicy', target: 'Frau' },
  { text: 'Sag ihm draußen: „Ich will dass du mich hier draußen richtig durchfickst“', category: 'Spicy', target: 'Frau' },
  { text: 'Gib ihm einen Blowie, während er 1–2 Runden Mario Kart / Minecraft / Bedwars spielt', category: 'Spicy', target: 'Frau' },
  { text: 'Sag ihm während des Blowjobs: „Versuch zu gewinnen, während ich dich lutsche“', category: 'Spicy', target: 'Frau' },
  { text: 'Wichs und lecke ihn die ganze Zeit, bis die Runde vorbei ist', category: 'Spicy', target: 'Frau' },
  { text: 'Bleibt die ganze Zeit ineinander, während ihr zusammen eine Runde co-op spielt (z.B. It Takes Two oder Minecraft)', category: 'Spicy', target: 'Beliebig' },
  { text: 'Mastubiere dich selbst vor ihm und stöhn dabei', category: 'Spicy', target: 'Beliebig' },
  { text: 'Bind seine Hände und benutz seinen Mund / Schwanz, wie du willst', category: 'Spicy', target: 'Frau' },
  { text: 'Gib ihm draußen (Auto/Balkon) einen kurzen Blowie', category: 'Spicy', target: 'Frau' },
  { text: 'Gib ihm einen Blowie, während er eine Runde Minecraft / ein Spiel spielt', category: 'Spicy', target: 'Frau' },
];

const five: Seed[] = [
  // =========================
  // BELIEBIG
  // =========================
  { text: 'Fickt euch 40 Sekunden in der Missionarsstellung und schaut euch die ganze Zeit in die Augen.', category: 'Romantic', duration: 40, target: 'Beliebig'},
  { text: 'Bleibt 50 Sekunden eng verbunden (Schwanz in der Pussy) und genießt das kuscheln', category: 'Romantic', duration: 50, target: 'Beliebig'},
  { text: 'Eine Stellung, bei der einer dem anderen 35 Sekunden den Körper massiert während des Sex.', duration: 35, category: 'Massage', target: 'Beliebig'},
  { text: 'Macht 40 Sekunden Doggy und redet dabei schmutzig', category: 'Flirty', duration: 40, target: 'Beliebig'},
  { text: 'Probiert eine stehende Stellung', category: 'Flirty', target: 'Beliebig'},
  { text: 'Fickt euch, bis einer kommt, dann wechselt. ', category: 'Spicy', target: 'Beliebig'},
  { text: 'Fickt in der Küche statt im Bett', category: 'Flirty', target: 'Beliebig' },
  { text: 'Geht nach dem ficken ins frei ohne unterwäsche, es soll ruhig tropfen', category: 'Spicy', target: 'Beliebig' },
  { text: 'Findet einen platz in der öffentlich und mastubiert/fickt', category: 'Spicy', target: 'Beliebig' },
  { text: 'Macht ein Foto in der Missionarsstellung', category: 'Flirty', target: 'Beliebig' },
  { text: 'Fickt kurz im Auto oder auf dem Balkon (wenn möglich)', category: 'Spicy', target: 'Beliebig' },
  { text: 'Fickt, während ihr 2 Runden mario Party spielt', category: 'Spicy', target: 'Beliebig' },
  { text: 'Spielt eine Runde eines Spiels eurer Wahl. Jedes Mal wenn jemand stirbt/verliert, gibt es 10 harte Stöße', category: 'Spicy', target: 'Beliebig' },



  // =========================
  // NUR MANN
  // =========================
  { text: 'Nimm sie 45 Sekunden langsam und tief in der Löffelstellung', category: 'Romantic', duration: 45, target: 'Mann'},
  { text: 'Nimm sie 40 Sekunden von hinten und greif dabei fest ihre Hüften/Brüste', category: 'Touch', duration: 40, target: 'Mann'},
  { text: 'Stell sie an die Wand und nimm sie 30 Sekunden stehend', category: 'Flirty', duration: 30, target: 'Mann'},
  { text: 'Nimm sie 30 Sekunden und knete dabei ihren Po', category: 'Spicy', duration: 30, target: 'Mann'},
  { text: 'Nimm sie 50 Sekunden hart und tief in Doggy', category: 'Spicy', duration: 50, target: 'Mann'},
  { text: 'Leg ihre Beine auf die Schultern und stoß fest', category: 'Spicy', target: 'Mann'},
  { text: 'Nimm sie im Amazonen-Sitz (sie sitzt auf dir, Beine angezogen)', category: 'Spicy', target: 'Mann'},
  { text: 'Halt ihre Hände fest über dem Kopf und fick sie', category: 'Spicy', target: 'Mann'},
  { text: 'Creampie in deinem Partner und leck dann ihre Pussy', category: 'Spicy', target: 'Mann'},
  { text: 'Sag ihr: „Schluck alles runter wie eine gute Girl“', category: 'Spicy', target: 'Mann' },
  { text: 'Spritz tief in sie rein (Creampie) und lass sie es rauslaufen sehen', category: 'Spicy', target: 'Mann' },
  { text: 'Sag ihr: „Dein Loch gehört mir und ich füll es jetzt komplett“', category: 'Spicy', target: 'Mann' },
  { text: 'Finger deinem Partner, während sie Parkour spielt', category: 'Spicy', target: 'Mann' },
 

  // =========================
  // NUR FRAU
  // =========================
  { text: 'Reite ihn 45 Sekunden langsam und küsse ihn dabei', category: 'Romantic', duration: 45, target: 'Frau'},
  { text: 'Reite ihn 40 Sekunden und streichele dabei deinen Kitzler', category: 'Flirty', duration: 40, target: 'Frau'},
  { text: 'Reite ihn Reverse Cowgirl', category: 'Spicy', target: 'Frau'},
  { text: 'Lass dich von hinten nehmen und stöhne laut', category: 'Spicy', duration: 45, target: 'Frau'},
  { text: 'Nimm ihn so tief du kannst und halte ihn dort kurz', category: 'Spicy', target: 'Frau'},
  { text: 'Sag ihm während du reitest: „Spür wie nass ich bin“ oder etwas Schmutzigeres', category: 'Flirty', target: 'Frau' },
  { text: 'Befiehl ihm: „Fass meine Brüste an“ oder „Stoß mit“ während du oben bist', category: 'Spicy', target: 'Frau' },
  { text: 'Reite ihn auf dem Stuhl', category: 'Flirty', target: 'Frau' },
  { text: 'Dreh dich um und lass ihn dich von hinten nehmen, während du dich nach vorne beugst', category: 'Spicy', target: 'Frau' },
  { text: 'Bleib oben und bestimme das komplette Tempo', category: 'Spicy', target: 'Frau' },
  { text: 'Deinem Partner soll in deinen Mund spritzen und spiel mit seinem Sperma', category: 'Spicy', target: 'Frau' },
  { text: 'Bleib oben und bestimme das komplette Tempo', category: 'Spicy', target: 'Frau' },
  { text: 'Film dich selbst, während du ihn reitest (Reverse Cowgirl)', category: 'Spicy', target: 'Frau' },
  { text: 'Mach ein Foto, während du auf ihm sitzt und ihn küsst', category: 'Flirty', target: 'Frau' },
  { text: 'Lass ihn filmen, während du Reverse Cowgirl reitest', category: 'Spicy', target: 'Frau' },
  { text: 'Nach dem Creampie: drück das Sperma raus und leck es von seinen Fingern', category: 'Spicy', target: 'Frau' },
  { text: 'Lass ihn dir auf die Titten/ins Gesicht spritzen und leck es ab', category: 'Spicy', target: 'Frau' },
  { text: 'Sag nach dem Creampie: „Danke für deine Füllung Daddy“', category: 'Spicy', target: 'Frau' },
  { text: 'Sag nach dem Creampie: „Danke dass du mich so vollgespritzt hast“', category: 'Spicy', target: 'Frau' },
  { text: 'Reite ihn kurz im Auto oder auf dem Balkon', category: 'Spicy', target: 'Frau' },
  { text: 'Sag ihm draußen: „Benutz mich hier wie deine persönliche Schlampe“', category: 'Spicy', target: 'Frau' },
  { text: 'Sag ihm: „Ich will dass du mich so fickst, dass ich kaum noch laufen kann“', category: 'Spicy', target: 'Frau' },
  {text: 'Bleib auf ihm sitzen und beweg dich nur, wenn er im Spiel stirbt oder etwas Schlechtes passiert', category: 'Spicy', target: 'Frau' },
  { text: 'Gib ihm einen Blowie unter dem Schreibtisch, während er Parkour spielt', category: 'Spicy', target: 'Frau' },
]

// .
export const builtInDares = [...make(1, one), ...make(2, two), ...make(3, three), ...make(4, four), ...make(5, five)]
export const categories: Category[] = ['Romantic', 'Flirty', 'Massage', 'Surprise', 'Spicy']