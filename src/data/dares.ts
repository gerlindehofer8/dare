import type { Category, Dare } from '../types'

type Seed = { text: string; category: Category; duration?: number; special?: boolean; target?: Dare['target']}
const make = (level: Dare['spiceLevel'], rows: Seed[]): Dare[] => rows.map((row, index) => ({
  id: `builtin-${level}-${index + 1}`, text: row.text, category: row.category, spiceLevel: level,
  target: row.target ?? 'Beliebig', duration: row.duration, isTimer: Boolean(row.duration), isSpecial: Boolean(row.special), spiceValue: level * 3 + (row.special ? 3 : 0)
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

  // =========================
  // NUR MANN
  // =========================

  { text: 'Küsse deinen Partner 15 Sekunden am Hals', category: 'Romantic', duration: 15, target: 'Mann'},
  { text: 'Gib deinen Partner einen Kuss auf die Stirn', category: 'Romantic', target: 'Mann'},
  { text: 'Streichle die Oberschenkel deines Partners 20 Sekunden von außen nach innen', category: 'Touch', duration: 20, target: 'Mann'},
  { text: 'Greif sanft nach dem Po deines Partners und halte ihn solange du willst', category: 'Touch', target: 'Mann'},
  { text: 'Zieh deinen Partner an den Hüften näher zu dir und halte sie', category: 'Flirty', target: 'Mann'},
  { text: 'Sage deinem Partner, was du an ihr besonders attraktiv findest', category: 'Flirty', target: 'Mann'},
  { text: 'Streichle deinem Partner ihren Bauch', category: 'Touch', target: 'Mann'},
  { text: 'Drücke dich 15 Sekunden mit dem Schritt an deinem Partner ihren Ass', category: 'Spicy', duration: 15, target: 'Mann'},
  { text: 'Beiß sanft deiner Partner in den Nacken', category: 'Spicy', target: 'Mann'},
  { text: 'Streichle ihre Brüste über dem BH/Oberteil', category: 'Spicy', target: 'Mann'},
  { text: 'Lass sie auf deinem Schoß sitzen und küsse sie, während du ihren Po greifst', category: 'Spicy', target: 'Mann'},
  { text: 'Massiere ihre Füße 20 Sekunden', category: 'Massage', duration: 20, target: 'Mann'},
  { text: 'Küsse ihren Bauch runter bis zu ihrer Pussy', category: 'Spicy', target: 'Mann'},



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
  { text: 'Fasse seinen Schwanz fest an (über der Kleidung) und halte ihn', category: 'Spicy', target: 'Frau'},
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

  // =========================
  // NUR FRAU
  // =========================
  { text: 'Küsse deinem Partner seinen nackten Oberkörper 20 Sekunden', category: 'Romantic', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Touch', target: 'Frau'},
  { text: 'Zieh dein Oberteil aus und setz dich bis zur nächsten Runde auf ihn', category: 'Flirty', target: 'Frau'},
  { text: 'Lass ihn deinen BH öffnen', category: 'Flirty', target: 'Frau'},
  { text: 'Reibe dich 20 Sekunden mit dem Slip an seinem Schwanz', category: 'Spicy', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Spicy', target: 'Frau'},
  { text: 'Zieh deinem Partner das Shirt aus und küsse seinen Oberkörper', category: 'Spicy', target: 'Frau'},
  { text: 'Gehe mit der Hand in deinem Partner seine Unterhose und fasse ihn an', category: 'Spicy', target: 'Frau'},
  { text: 'Nimm seine Hand und leg sie auf deine nasse Pussy', category: 'Spicy', target: 'Frau'},
]
  
  



const three: Seed[] = [
   // =========================
  // BELIEBIG
  // =========================
  { text: 'Kuschelt für 40 sekunen intensiv', category: 'Romantic', target: 'Beliebig'},
  { text: 'Einer führt die Hand des anderen an die eigene spicy Zone und lässt sie 20 Sekunden dort betouchen', category: 'Spicy', duration: 20, target: 'Beliebig'},
  { text: 'Einer massiert dem anderen 35 Sekunden den Po und die Oberschenkel', duration: 35, category: 'Massage', target: 'Beliebig'},
  { text: 'Reibt euch nackt aneinander (Pussy/Schwanz)', category: 'Spicy', target: 'Beliebig'},
  { text: 'Zieht euch komplett aus und streichelt euch nackt', category: 'Spicy', target: 'Beliebig'},
  { text: 'Massiert euch gegenseitig die Brüste/Brustwarzen', category: 'Massage', target: 'Beliebig'},
  { text: 'Einer liegt oben und reibt sich am anderen', category: 'Touch', target: 'Beliebig'},

  // =========================
  // NUR MANN
  // =========================
  { text: 'Küsse ihre Innenschenkel 20 Sekunden', category: 'Romantic', duration: 20, target: 'Mann'},
  { text: 'Streichle deinem Partner ihre Pussy 25 Sekunden von außen (über dem Slip oder nackt)', category: 'Touch', duration: 25, target: 'Mann'},
  { text: 'Streichle ihre Brüste 20 Sekunden über dem BH', category: 'Touch', duration: 20, target: 'Mann'},
  { text: 'Massiere ihren ganzen Unterkörper (Beine, Po, Hüften)', category: 'Massage', target: 'Mann'},
  { text: 'Knette deinem Partner ihre Brüste', category: 'Massage', duration: 25, target: 'Mann'},
  { text: 'Fingere sie 20 Sekunden langsam mit einem Finger (nicht zu tief/hart)', category: 'Spicy', duration: 20, target: 'Mann'},
  { text: 'Streichle ihren Kitzler 20 Sekunden kreisend und höre auf, bevor es zu intensiv wird', category: 'Spicy', duration: 20, target: 'Mann'},
  { text: 'Zieh deiner Partnerin den Slip aus und streichle ihre Muschi', category: 'Spicy', target: 'Mann'},
  { text: 'Küsse und lecke ihre Brustwarzen, während du sie fingerst', category: 'Spicy', target: 'Mann'},
  { text: 'Lass sie dich nackt anfassen und deinen Schwanz streicheln', category: 'Spicy', target: 'Mann'},
  { text: 'Reibe deinen Schwanz an ihrer nassen Muschi (noch ohne Eindringen)', category: 'Spicy', target: 'Mann'},

  // =========================
  // NUR FRAU
  // =========================
  { text: 'Küsse deinem Partner seinen nackten Oberkörper 20 Sekunden', category: 'Romantic', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Touch', target: 'Frau'},
  { text: 'Zieh dein Oberteil aus und setz dich bis zur nächsten Runde auf ihn', category: 'Flirty', target: 'Frau'},
  { text: 'Lass ihn deinen BH öffnen', category: 'Flirty', target: 'Frau'},
  { text: 'Reibe dich 20 Sekunden mit dem Slip an seinem Schwanz', category: 'Spicy', duration: 20, target: 'Frau'},
  { text: 'Streichle seinen Schwanz über der Unterhose', category: 'Spicy', target: 'Frau'},
  { text: 'Zieh deinem Partner das Shirt aus und küsse seinen Oberkörper', category: 'Spicy', target: 'Frau'},
  { text: 'Gehe mit der Hand in deinem Partner seine Unterhose und fasse ihn an', category: 'Spicy', target: 'Frau'},
  { text: 'Nimm seine Hand und leg sie auf deine nasse Pussy', category: 'Spicy', target: 'Frau'},
]
const four: Seed[] = []
const five: Seed[] = []

// .
export const builtInDares = [...make(1, one), ...make(2, two), ...make(3, three), ...make(4, four), ...make(5, five)]
export const categories: Category[] = ['Romantic', 'Flirty', 'Massage', 'Surprise', 'Spicy']