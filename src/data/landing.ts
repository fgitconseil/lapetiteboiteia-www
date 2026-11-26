// Landing copy, verbatim from docs/site-accueil-copy-v2.md, § 2 (validated
// 2026-11-26). It replaces the arbitration brief of 2026-11-24.
// Keep every string as written there. See CLAUDE.md.

/** Assistants that are connected and tested. The Enterprise offer and FAQ 5 read them here. */
export const assistants: readonly string[] = ["Claude", "Vibe de Mistral"];

/** Booking link shared by every « Voir la démo » call to action. A plain link: no embed, no script. */
export const demoUrl = "https://calendly.com/conversation-la-petite-boite-ia/30-mins";

/** "A, B or C" in French: comma separated, the conjunction before the last item. */
export function enumerate(items: readonly string[], conjunction: string): string {
  if (items.length <= 1) {
    return items[0] ?? "";
  }
  return `${items.slice(0, -1).join(", ")} ${conjunction} ${items[items.length - 1]}`;
}

export const meta = {
  title: "La Petite Boîte IA · Vos équipes apprennent. Vos responsables tranchent.",
  description:
    "Quand une information contredit une règle en vigueur, elle part au responsable du sujet. Il décide, et les assistants IA de vos équipes donnent la même réponse.",
} as const;

/* ---------- 2. Comment ça se passe ---------- */

export const scenesPrologue =
  "Mars 2025. Six intérimaires arrivent le même lundi avec un seul tuteur. Deux travaillent trois jours sans leur grille de compétences. La responsable RH écrit une règle : deux arrivants par tuteur, pas plus.";

export interface Scene {
  readonly title: string;
  readonly body: string;
}

export const scenes: readonly [Scene, Scene, Scene] = [
  {
    title: "L'étincelle",
    body: "Dix-huit mois plus tard, en réunion d'équipe, quelqu'un dit qu'on peut monter à trois. Emma, tutrice, le dit à son assistant : « Un tuteur peut suivre trois nouveaux arrivants. » Elle est de bonne foi. Le wiki, lui, dit toujours deux.",
  },
  {
    title: "Le blocage",
    body: "La Petite Boîte IA voit que la phrase d'Emma contredit une règle en vigueur. Elle ne l'enregistre pas comme règle : elle l'envoie à Claire, la responsable RH. Le lendemain, Julien pose la question à son assistant. Réponse : deux, avec la mention « En vigueur · changement en attente ».",
  },
  {
    title: "L'alignement",
    body: "Claire ouvre le changement en attente. Elle voit la phrase d'Emma, qui l'a dite, et pourquoi la règle existe. Elle clique sur « Décider » et garde deux. Lundi suivant, Emma, Julien et le chef d'atelier interrogent chacun leur assistant : deux, avec la source.",
  },
];

/**
 * Text shown inside the decorative scene visuals (aria-hidden: the scene text
 * carries the meaning). Interface labels as in § 3 of the copy; the rest
 * validated with the layout plan on 2026-11-26.
 */
export const sceneVisuals = {
  emma: "Emma",
  emmaSays: "Un tuteur peut suivre trois nouveaux arrivants.",
  wiki: "Wiki",
  wikiRule: "2 au plus",
  julien: "Julien",
  claire: "Claire",
  answer: "2",
  inForcePending: "En vigueur · changement en attente",
  pendingChange: "Changement en attente",
  decide: "Décider",
  source: "Source : règle RH, mars 2025",
  askers: ["Emma", "Julien", "Chef d'atelier"],
} as const;

export const scenesClosing =
  "Si Emma avait eu raison, Claire aurait pu passer à trois, ou à trois pour la seule équipe d'Emma. Le terrain a souvent raison. Pas toujours.";

/* ---------- 3. Qui ajoute quoi ---------- */

export interface Contribution {
  readonly icon: "chat" | "doc" | "lock";
  readonly title: string;
  readonly body: string;
}

export const contributions: readonly Contribution[] = [
  {
    icon: "doc",
    title: "Le responsable dépose, la règle change",
    body: "Claire dépose la nouvelle version du document d'intégration : la formation sécurité passe de 3 à 4 heures. C'est son sujet, la règle est en vigueur aussitôt. L'ancienne sort des réponses et reste dans l'historique.",
  },
  {
    icon: "chat",
    title: "L'équipe apprend, l'équipe en profite",
    body: "Emma dit à son assistant que les équipements de protection se commandent au magasin le mercredi. Ça ne contredit rien : son équipe a l'information dans la minute, avec son nom.",
  },
  {
    icon: "lock",
    title: "La contradiction attend le responsable",
    body: "Quand une information contredit une règle en vigueur, elle attend la décision du responsable du sujet. D'ici là, les assistants donnent la règle en vigueur.",
  },
];

export const contributionsClosing =
  "Aucune règle en vigueur ne change sans que son responsable l'ait décidé.";

/* ---------- 4. La différence au quotidien ---------- */

export interface Comparison {
  readonly situation: string;
  readonly today: string;
  readonly lpbia: string;
}

export const comparisons: readonly Comparison[] = [
  {
    situation: "Une règle change en réunion",
    today: "Elle part dans un mail, le document attend. Chaque assistant lit ce qu'il trouve.",
    lpbia: "Le changement part au responsable. Les assistants donnent la règle en vigueur en attendant.",
  },
  {
    situation: "Un collaborateur corrige une réponse",
    today: "La correction reste dans sa conversation.",
    lpbia: "Elle sert à son équipe, avec son nom.",
  },
  {
    situation: "Deux versions s'opposent",
    today: "L'assistant en choisit une, sans le dire.",
    lpbia: "Le responsable du sujet décide.",
  },
  {
    situation: "Une règle est remplacée",
    today: "Les deux versions circulent.",
    lpbia: "L'ancienne sort des réponses et reste dans l'historique.",
  },
  {
    situation: "L'information manque",
    today: "L'assistant peut inventer.",
    lpbia: "L'assistant peut le dire, et la question remonte au responsable.",
  },
];

/* ---------- 5. Pour qui ---------- */

export interface Terrain {
  readonly name: string;
  readonly scene: string;
}

export const terrains: readonly Terrain[] = [
  {
    name: "RH",
    scene: "Une mesure décidée en CSE. Deux salariés posent la même question à leur assistant le même jour. Avec La Petite Boîte IA, ils obtiennent la même réponse.",
  },
  {
    name: "Conformité",
    scene: "Un seuil de double signature abaissé en comité. Tant que la procédure n'est pas réécrite, l'assistant donne encore l'ancien seuil, sauf si le changement est passé par son responsable.",
  },
  {
    name: "Méthodes et opérations",
    scene: "Un mode opératoire corrigé par un chef d'atelier. Sa correction sert à l'équipe, et la contradiction avec la fiche de poste part au responsable.",
  },
];

/* ---------- 6. Prix ---------- */

export interface Offer {
  readonly name: string;
  readonly label: string;
  /** The bold part of the price line. Amounts use no-break spaces. */
  readonly price: string;
  /** The rest of the price line, shown below it. */
  readonly priceDetail: string;
  readonly where: string;
  readonly setup: string;
  readonly extra: string | null;
  readonly cta: string;
  readonly featured: boolean;
}

/** Display order: Enterprise first (left, and first on phones), then Starter. */
export const offers: readonly Offer[] = [
  {
    name: "Enterprise",
    label: "Dans les outils de vos équipes",
    price: "dès 12 000 € HT par an",
    priceDetail: "jusqu'à 200 comptes",
    where: `Directement dans ${enumerate(assistants, "et")}, les assistants qu'elles utilisent déjà`,
    setup: "Avec votre DSI",
    extra: "Engagement de service. Hébergement dédié sur devis.",
    cta: "En parler",
    featured: true,
  },
  {
    name: "Starter",
    label: "Pour démarrer",
    price: "6 000 € HT par an",
    priceDetail: "soit 500 € par mois, jusqu'à 200 comptes",
    where: "Dans l'espace de discussion La Petite Boîte IA, sur Mistral",
    setup: "Sans projet DSI : une liste de collaborateurs, un code à 6 chiffres par e-mail, pas de mot de passe",
    extra: null,
    cta: "Voir la démo en 30 minutes",
    featured: false,
  },
];

/** Row labels of the pricing table in § 2, used as <dt> in each offer. */
export const offerLabels = {
  where: "Où vos équipes posent leurs questions",
  setup: "Mise en route",
  extra: "En plus",
} as const;

export const pricingTokens =
  "Le prix ne bouge pas avec l'usage : aucune facturation au message, aucun token revendu. En Starter, le modèle tourne sur la clé de votre entreprise, au prix de l'éditeur. En Enterprise, vos équipes utilisent les assistants que vous payez déjà.";

export const pricingReassurance = "Le chargement de vos premiers documents est inclus.";

/* ---------- 8. Questions fréquentes ---------- */

export interface Question {
  readonly question: string;
  readonly answer: string;
}

export const questions: readonly Question[] = [
  {
    question: "Est-ce un « company brain » de plus ?",
    answer:
      "Non. Un company brain retient tout, y compris ce qui n'est plus vrai, ou laisse l'IA choisir entre deux versions. Ici, quand deux versions s'opposent, c'est votre responsable qui décide.",
  },
  {
    question: "Mon responsable va-t-il passer ses journées à valider ?",
    answer:
      "Non. Il ne voit que les contradictions de son sujet. Ce qu'un collaborateur ajoute sans rien contredire sert directement à son équipe.",
  },
  {
    question: "Vous écoutez nos salariés ?",
    answer:
      "Non. Seul ce qu'un collaborateur demande à son assistant de retenir pour l'équipe entre, avec son nom. Rien n'entre à son insu.",
  },
  {
    question: "Faut-il un projet documentaire ?",
    answer:
      "Non. On part de vos documents existants. Ensuite, vos équipes complètent en parlant à leur assistant.",
  },
  {
    question: "Avec quels assistants ?",
    answer: `${enumerate(assistants, "et")} aujourd'hui, directement, avec l'offre Enterprise. L'offre Starter passe par l'espace de discussion La Petite Boîte IA, sans projet DSI. D'autres assistants viendront plus tard.`,
  },
  {
    question: "Où sont mes données ?",
    answer:
      "Chaque entreprise a son espace séparé, et vos connaissances restent les vôtres. Dès son lancement chez vous, votre espace sera hébergé en France, chez Scaleway.",
  },
  {
    question: "Combien coûtent les tokens ?",
    answer:
      "Rien chez nous. En Starter, le modèle tourne sur la clé de votre entreprise : vous payez l'éditeur, au prix de l'éditeur. En Enterprise, vos équipes utilisent les assistants que vous payez déjà.",
  },
];

/** The product signature, in the footer of the app shell (legal pages, 404). */
export const signature = "La Petite Boîte IA · Vos équipes apprennent. Vos responsables tranchent.";

/** Legal documents, same paths and labels as the app's LIENS_LEGAUX. */
export const legalLinks: readonly { readonly href: string; readonly label: string }[] = [
  { href: "/legal/cgu", label: "Conditions d'utilisation" },
  { href: "/legal/cgv", label: "Conditions de vente" },
  { href: "/legal/mentions-legales", label: "Mentions légales" },
];
