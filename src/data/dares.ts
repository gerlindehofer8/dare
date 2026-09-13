import type { Category, Dare } from '../types'

type Seed = { text: string; category: Category; duration?: number; special?: boolean }
const make = (level: Dare['spiceLevel'], rows: Seed[]): Dare[] => rows.map((row, index) => ({
  id: `builtin-${level}-${index + 1}`, text: row.text, category: row.category, spiceLevel: level,
  target: 'Beliebig', duration: row.duration, isTimer: Boolean(row.duration), isSpecial: Boolean(row.special), spiceValue: level * 3 + (row.special ? 3 : 0)
}))

const one: Seed[] = [
  { text: 'Schenke deinem Partner ein ehrliches Kompliment.', category: 'Cute' }, { text: 'Halte 20 Sekunden Händchen.', category: 'Timer', duration: 20 },
  { text: 'Umarme deinen Partner für 10 Sekunden.', category: 'Timer', duration: 10 }, { text: 'Schaut euch 15 Sekunden ruhig in die Augen.', category: 'Timer', duration: 15 },
  { text: 'Gib deinem Partner einen sanften Kuss.', category: 'Kiss' }, { text: 'Nenne eine Eigenschaft, die du an deinem Partner liebst.', category: 'Communication' },
  { text: 'Erzähle von eurem schönsten gemeinsamen Moment.', category: 'Romantic' }, { text: 'Schicke deinem Partner einen Kuss mit den Händen.', category: 'Cute' },
  { text: 'Lege für 30 Sekunden deinen Kopf an die Schulter deines Partners.', category: 'Timer', duration: 30 }, { text: 'Sage: „Ich bin gern mit dir hier.“', category: 'Romantic' },
  { text: 'Lass deinen Partner eine kleine Sache wählen, die ihr gemeinsam macht.', category: 'Challenge' }, { text: 'Tanze 20 Sekunden langsam mit deinem Partner.', category: 'Timer', duration: 20 },
  { text: 'Nenne drei Dinge, für die du heute dankbar bist.', category: 'Communication' }, { text: 'Gib deinem Partner einen liebevollen Spitznamen.', category: 'Cute' },
  { text: 'Lächle deinen Partner 10 Sekunden lang an, ohne wegzusehen.', category: 'Timer', duration: 10 }, { text: 'Erzähle, was dich heute zum Lächeln gebracht hat.', category: 'Funny' },
  { text: 'Streiche deinem Partner sanft über den Arm.', category: 'Touch' }, { text: 'Macht zusammen ein Herz mit euren Händen.', category: 'Cute' },
  { text: 'Sag deinem Partner, worauf du dich mit ihm am meisten freust.', category: 'Romantic' }, { text: 'Gib deinem Partner einen Stirnkuss.', category: 'Kiss' },
  { text: 'Ahme eine liebevolle Filmszene für 15 Sekunden nach.', category: 'Funny', duration: 15 }, { text: 'Lass deinen Partner ein Lied auswählen, das eure Stimmung beschreibt.', category: 'Surprise', special: true },
  { text: 'Sage deinem Partner leise etwas Nettes ins Ohr.', category: 'Flirty' }, { text: 'Beschreibe euren idealen gemeinsamen Sonntag.', category: 'Communication' },
  { text: 'Sitze 30 Sekunden ganz nah bei deinem Partner.', category: 'Timer', duration: 30 }, { text: 'Gib deinem Partner ein High-Five und halte die Hände kurz fest.', category: 'Cute' },
  { text: 'Wähle eine Farbe, die zu deinem Partner passt, und erkläre warum.', category: 'Funny' }, { text: 'Bedanke dich für etwas Kleines, das dein Partner oft tut.', category: 'Communication' },
  { text: 'Lass deinen Partner für 20 Sekunden deine Hand halten.', category: 'Timer', duration: 20 }, { text: 'Erfinde einen Mini-Toast auf euch zwei.', category: 'Romantic' }
]
const two: Seed[] = [
  { text: 'Gib deinem Partner einen langen, liebevollen Kuss.', category: 'Kiss' }, { text: 'Flüstere deinem Partner ein Kompliment ins Ohr.', category: 'Flirty' },
  { text: 'Umarme deinen Partner 30 Sekunden lang bewusst fest.', category: 'Timer', duration: 30 }, { text: 'Massiere 45 Sekunden sanft die Schultern deines Partners.', category: 'Massage', duration: 45 },
  { text: 'Sag deinem Partner einen romantischen Satz wie aus einem Film.', category: 'Romantic' }, { text: 'Tanze eine Minute langsam mit deinem Partner.', category: 'Timer', duration: 60 },
  { text: 'Küsse deinen Partner auf die Wange und bleib einen Moment nah.', category: 'Kiss' }, { text: 'Sage, was deinen Partner für dich besonders attraktiv macht.', category: 'Flirty' },
  { text: 'Lass deinen Partner für 30 Sekunden entscheiden, wie ihr sitzt oder liegt.', category: 'Challenge', duration: 30 }, { text: 'Spiele eure erste Begegnung in einer kurzen, charmanten Szene nach.', category: 'Funny' },
  { text: 'Streiche 30 Sekunden lang sanft über den Rücken deines Partners.', category: 'Touch', duration: 30 }, { text: 'Erzähle deinem Partner von einem Date, das du mit ihm planen würdest.', category: 'Romantic' },
  { text: 'Schließe die Augen und rate, wo dein Partner deine Hand berührt.', category: 'Touch' }, { text: 'Sage drei kleine Dinge, die du am Aussehen deines Partners magst.', category: 'Flirty' },
  { text: 'Gib deinem Partner eine kurze Handmassage.', category: 'Massage', duration: 45 }, { text: 'Haltet euch an der Taille und schaut euch 20 Sekunden an.', category: 'Timer', duration: 20 },
  { text: 'Macht ein Foto nur für euch, auf dem ihr besonders glücklich ausseht.', category: 'Surprise', special: true }, { text: 'Beschreibe deinen Partner mit drei romantischen Adjektiven.', category: 'Communication' },
  { text: 'Küsse deinen Partner sanft auf die Hand.', category: 'Kiss' }, { text: 'Lass deinen Partner eine Frage stellen, die du ehrlich beantwortest.', category: 'Communication' },
  { text: 'Lehne dich eine Minute lang an deinen Partner.', category: 'Timer', duration: 60 }, { text: 'Macht gemeinsam 20 Sekunden lang eine alberne Pose.', category: 'Funny', duration: 20 },
  { text: 'Sage deinem Partner, welcher Moment heute dich ihm näher fühlen ließ.', category: 'Romantic' }, { text: 'Gib deinem Partner für 30 Sekunden deine ungeteilte Aufmerksamkeit.', category: 'Timer', duration: 30 },
  { text: 'Zeige deinem Partner mit einer Geste, wie gern du ihn hast.', category: 'Cute' }, { text: 'Flüstere deinem Partner einen Wunsch für euer nächstes Date zu.', category: 'Flirty' },
  { text: 'Streiche deinem Partner kurz durchs Haar, wenn es angenehm ist.', category: 'Touch' }, { text: 'Macht einen langsamen Tanzschritt, auch ohne Musik.', category: 'Romantic' },
  { text: 'Spielt eine Runde „Wer kennt wen besser?“ mit einer Frage.', category: 'Challenge' }, { text: 'Gib deinem Partner einen Kuss, der mindestens fünf Sekunden dauert.', category: 'Kiss', duration: 5 }
]
const three: Seed[] = [
  { text: 'Gib deinem Partner einen leidenschaftlichen, aber angenehmen Kuss.', category: 'Kiss' }, { text: 'Massiere eine Minute lang Nacken oder Schultern deines Partners.', category: 'Massage', duration: 60 },
  { text: 'Flüstere deinem Partner etwas Verführerisches, aber Respektvolles ins Ohr.', category: 'Spicy' }, { text: 'Tanze 45 Sekunden lang eng und langsam mit deinem Partner.', category: 'Flirty', duration: 45 },
  { text: 'Lass deinen Partner eine romantische Berührung auswählen, die sich gut anfühlt.', category: 'Touch' }, { text: 'Sage deinem Partner, was dich an eurer Verbindung aufregend findet.', category: 'Communication' },
  { text: 'Küsse deinen Partner langsam an einer Stelle, die für euch angenehm ist.', category: 'Kiss' }, { text: 'Schaut euch 30 Sekunden an und haltet dabei Händchen.', category: 'Timer', duration: 30 },
  { text: 'Verteile drei langsame, liebevolle Küsse.', category: 'Kiss' }, { text: 'Gib deinem Partner eine einminütige Rückenmassage über der Kleidung.', category: 'Massage', duration: 60 },
  { text: 'Lass deinen Partner entscheiden, wie nah ihr euch für eine Minute sein möchtet.', category: 'Challenge', duration: 60 }, { text: 'Erzähle von einem Moment, in dem du deinen Partner besonders begehrenswert fandest.', category: 'Flirty' },
  { text: 'Führe deinen Partner für 30 Sekunden mit geschlossenen Augen zu einem gemütlichen Platz.', category: 'Surprise', duration: 30, special: true }, { text: 'Leg deine Hände respektvoll an die Taille deines Partners und atme gemeinsam durch.', category: 'Touch' },
  { text: 'Lies deinem Partner einen selbst erfundenen, flirtenden Zweizeiler vor.', category: 'Funny' }, { text: 'Sage deinem Partner, welche Zärtlichkeit du gerade am liebsten hättest.', category: 'Communication' },
  { text: 'Gebt euch einen Kuss und haltet danach 20 Sekunden Blickkontakt.', category: 'Kiss', duration: 20 }, { text: 'Streiche deinem Partner langsam über Arm oder Rücken, wenn es willkommen ist.', category: 'Touch' },
  { text: 'Macht 30 Sekunden lang einen langsamen Tanz ohne zu sprechen.', category: 'Timer', duration: 30 }, { text: 'Lass deinen Partner eine sanfte Berührung an dir wählen.', category: 'Challenge' },
  { text: 'Flüstert euch abwechselnd je einen Wunsch für euren Abend zu.', category: 'Spicy' }, { text: 'Sage deinem Partner, welcher Kuss von ihm dir besonders im Gedächtnis ist.', category: 'Communication' },
  { text: 'Nimm deinen Partner für eine Minute in den Arm und halte ihn nah.', category: 'Timer', duration: 60 }, { text: 'Macht eine kleine Verführungs-Pose und lacht gemeinsam darüber.', category: 'Funny' },
  { text: 'Gib deinem Partner einen Kuss auf eine von ihm gewählte, angenehme Stelle.', category: 'Kiss' }, { text: 'Sage „Du bist wunderschön“, so als würdest du es zum ersten Mal sagen.', category: 'Romantic' },
  { text: 'Massiere 30 Sekunden lang die Hände deines Partners und halte Blickkontakt.', category: 'Massage', duration: 30 }, { text: 'Spielt für eine Minute eine stille, romantische Filmszene nach.', category: 'Challenge', duration: 60 },
  { text: 'Überrasche deinen Partner mit einer zärtlichen Geste deiner Wahl.', category: 'Surprise', special: true }, { text: 'Sag deinem Partner, was er tun kann, damit du dich noch wohler fühlst.', category: 'Communication' }
]
const four: Seed[] = [
  { text: 'Führt einen langen Kuss nur so lange fort, wie es für euch beide gut ist.', category: 'Kiss' }, { text: 'Massiere deinen Partner zwei Minuten lang langsam und aufmerksam.', category: 'Massage', duration: 120 },
  { text: 'Flüstere deinem Partner eine mutige, respektvolle Einladung für später zu.', category: 'Spicy' }, { text: 'Tanze eine Minute eng mit deinem Partner und lass ihn führen.', category: 'Flirty', duration: 60 },
  { text: 'Lass deinen Partner eine romantische Herausforderung auswählen, die ihr beide mögt.', category: 'Challenge' }, { text: 'Sage deinem Partner, welche Seite von ihm dich heute besonders anzieht.', category: 'Flirty' },
  { text: 'Küsse deinen Partner langsam und halte danach die Hände an seiner Taille.', category: 'Kiss' }, { text: 'Entscheidet gemeinsam, welche Nähe ihr für die nächste Minute möchtet.', category: 'Communication', duration: 60 },
  { text: 'Gib deinem Partner fünf langsame Küsse an von ihm erlaubten Stellen.', category: 'Kiss' }, { text: 'Schließe die Augen und lass deinen Partner eine sanfte Berührung wählen.', category: 'Touch' },
  { text: 'Beschreibe deinem Partner eine romantische Fantasie, die für euch beide angenehm wäre.', category: 'Spicy' }, { text: 'Nehmt euch 90 Sekunden Zeit für Nähe ohne Worte.', category: 'Timer', duration: 90 },
  { text: 'Lass deinen Partner eine Musik auswählen und bewege dich dazu nur für ihn.', category: 'Surprise', special: true }, { text: 'Sage deinem Partner klar, welche Berührung du gerade besonders magst.', category: 'Communication' },
  { text: 'Küsse deinen Partner und flüstere danach ein mutiges Kompliment.', category: 'Kiss' }, { text: 'Macht ein kleines Rollenspiel: Ihr begegnet euch zum ersten Mal in einer Bar.', category: 'Funny' },
  { text: 'Gib deinem Partner eine langsame Schulter- und Nackenmassage.', category: 'Massage', duration: 90 }, { text: 'Lass deinen Partner 30 Sekunden lang bestimmen, wie ihr euch nah seid.', category: 'Challenge', duration: 30 },
  { text: 'Sagt euch abwechselnd, was euch gerade kribbelig macht.', category: 'Spicy' }, { text: 'Halte deinen Partner fest und küsse ihn, wenn beide es wollen.', category: 'Romantic' },
  { text: 'Erfinde eine geheime Geste, die für euch „mehr davon“ bedeutet.', category: 'Surprise', special: true }, { text: 'Streiche deinem Partner langsam über Rücken oder Beine, über der Kleidung und nur wenn willkommen.', category: 'Touch' },
  { text: 'Macht 45 Sekunden lang Blickkontakt und lächelt dabei nicht weg.', category: 'Timer', duration: 45 }, { text: 'Sag deinem Partner, was du heute an ihm am schwersten ignorieren kannst.', category: 'Flirty' },
  { text: 'Gib deinem Partner einen Kuss, den er mit „mehr“ oder „genug“ steuert.', category: 'Kiss' }, { text: 'Wählt gemeinsam eine zärtliche Sache, die ihr jetzt ausprobieren möchtet.', category: 'Challenge' },
  { text: 'Massiere deinem Partner für eine Minute langsam die Hände und Unterarme.', category: 'Massage', duration: 60 }, { text: 'Flüstere deinem Partner drei Worte, die eure Spannung beschreiben.', category: 'Spicy' },
  { text: 'Sitze eine Minute sehr nah bei deinem Partner und lass die Stimmung sprechen.', category: 'Timer', duration: 60 }, { text: 'Sag deinem Partner, welche Grenze oder welches Tempo dir heute wichtig ist.', category: 'Communication' }
]
const five: Seed[] = [
  { text: 'Nehmt euch zwei Minuten für einen intensiven, einvernehmlichen Kuss.', category: 'Kiss', duration: 120 }, { text: 'Flüstere deinem Partner eine sehr mutige, aber respektvolle Fantasie zu.', category: 'Spicy' },
  { text: 'Lass deinen Partner eine aufregende, nicht explizite Aufgabe für euch beide wählen.', category: 'Challenge' }, { text: 'Massiere deinen Partner zwei Minuten lang so, wie er es anleitet.', category: 'Massage', duration: 120 },
  { text: 'Tanze 90 Sekunden lang langsam und selbstbewusst nur für deinen Partner.', category: 'Flirty', duration: 90 }, { text: 'Sage deinem Partner ganz direkt, was du gerade an ihm begehrenswert findest.', category: 'Spicy' },
  { text: 'Küsst euch langsam und unterbrecht nur, um euch anzusehen.', category: 'Kiss' }, { text: 'Entscheidet gemeinsam über eine mutige, aber angenehme Art von Nähe für die nächste Minute.', category: 'Communication', duration: 60 },
  { text: 'Lass deinen Partner mit einem Wort Tempo und Intensität einer zärtlichen Geste steuern.', category: 'Touch' }, { text: 'Beschreibe einen romantischen Abend, der dich richtig neugierig machen würde.', category: 'Spicy' },
  { text: 'Macht ein kleines, flirtendes Fotoshooting nur für euch – ohne etwas zu veröffentlichen.', category: 'Surprise', special: true }, { text: 'Sagt einander, was ihr euch für später wünscht – ohne Druck und mit einem klaren Nein als Option.', category: 'Communication' },
  { text: 'Gib deinem Partner einen langen Kuss an einer Stelle, die er vorher auswählt.', category: 'Kiss' }, { text: 'Lass deinen Partner eine zärtliche Berührung auswählen und sag sofort, ob sie dir gefällt.', category: 'Challenge' },
  { text: 'Halte Blickkontakt, während du deinem Partner ein besonders persönliches Kompliment machst.', category: 'Flirty' }, { text: 'Nehmt euch eine Minute stille Nähe und achtet darauf, was sich für euch gut anfühlt.', category: 'Timer', duration: 60 },
  { text: 'Führe deinen Partner mit Worten durch eine entspannende, romantische Minute.', category: 'Romantic', duration: 60 }, { text: 'Sage deinem Partner, welche Geste von ihm dich sofort schwach werden lässt.', category: 'Spicy' },
  { text: 'Küsse deinen Partner langsam und frag zwischendurch nach, was er mag.', category: 'Kiss' }, { text: 'Gebt euch gegenseitig eine einminütige Massage nach euren Regeln.', category: 'Massage', duration: 60 },
  { text: 'Erfindet eine geheime Codephrase für „Lass uns den Moment genießen“.', category: 'Surprise', special: true }, { text: 'Lass deinen Partner ein romantisches Lied wählen und bewege dich dazu ganz nah.', category: 'Flirty' },
  { text: 'Teile eine mutige, aber nicht explizite Idee für euer nächstes Date.', category: 'Spicy' }, { text: 'Lass deinen Partner die Intensität einer Umarmung für 45 Sekunden bestimmen.', category: 'Challenge', duration: 45 },
  { text: 'Sage deinem Partner, was du an eurer Chemie am aufregendsten findest.', category: 'Communication' }, { text: 'Überrasche deinen Partner mit einem Kuss, den er jederzeit stoppen darf.', category: 'Kiss' },
  { text: 'Streiche deinem Partner nach seiner Anleitung langsam und zärtlich über Rücken oder Schultern.', category: 'Touch' }, { text: 'Spielt für eine Minute zwei Fremde, die sich auffallend gut verstehen.', category: 'Funny', duration: 60 },
  { text: 'Nimm deinen Partner nah zu dir und sag ihm, was du an diesem Moment liebst.', category: 'Romantic' }, { text: 'Wählt gemeinsam, ob ihr eine weitere aufregende Runde wollt oder eine Pause braucht.', category: 'Communication' }
]

export const builtInDares = [...make(1, one), ...make(2, two), ...make(3, three), ...make(4, four), ...make(5, five)]
export const categories: Category[] = ['Romantic', 'Cute', 'Kiss', 'Touch', 'Flirty', 'Massage', 'Challenge', 'Communication', 'Funny', 'Surprise', 'Timer', 'Spicy']
