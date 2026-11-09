// Landing copy, verbatim from the app repository's gabarits/landing.html.
// Keep every string as in the source. See CLAUDE.md.

/** Assistants that are connected and tested. Card 1, FAQ 2 and the hub label read them here. */
export const assistants: readonly string[] = ["Claude", "Le Chat de Mistral"];

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
  title: "La Petite Boîte IA · Une mémoire qui ne ment pas",
  description:
    "La mémoire gouvernée de vos IA. Ce qu'un collaborateur apprend à son assistant sert à toute l'équipe, et aucune règle validée ne change sans un responsable.",
} as const;

export interface Pillar {
  readonly icon: "chat" | "doc" | "lock";
  readonly title: string;
  readonly body: string;
}

export const pillars: readonly Pillar[] = [
  {
    icon: "chat",
    title: "Une mémoire collective, quel que soit l'assistant",
    body: `Ce qu'une personne apprend à son IA sert à ses collègues, qu'ils utilisent ${enumerate(assistants, "ou")}. Aucun nouvel outil à adopter.`,
  },
  {
    icon: "doc",
    title: "Rien n'est écrasé",
    body: "Quand une information contredit une règle validée, elle attend la décision du responsable métier. L'ancienne version reste dans l'historique.",
  },
  {
    icon: "lock",
    title: "Les savoirs d'une équipe restent dans l'équipe",
    body: "Les RH gardent leurs règles, la Production les siennes.",
  },
];

export interface HubExample {
  readonly term: string;
  readonly input: string;
  readonly detail: string | null;
  readonly output: string;
}

export const hubExamples: readonly HubExample[] = [
  {
    term: "Partage",
    input: "« Pour une arrivée le lundi, les EPI se commandent au plus tard le mercredi. Retiens-le pour l'équipe. »",
    detail: "un tuteur, dans Le Chat",
    output: "Commande des EPI : au plus tard le mercredi. Partagé avec toute l'équipe, dès qu'un tuteur l'a appris à son assistant.",
  },
  {
    term: "Compare",
    input: "« Combien de temps dure la formation sécurité ? »",
    detail: "un responsable, dans Claude",
    output: "Formation sécurité : 4 h depuis le 1er octobre, validée par le responsable. La version à 3 h reste dans l'historique.",
  },
  {
    term: "Soumet au responsable",
    input: "« Un tuteur peut accompagner 3 nouveaux arrivants. »",
    detail: "un tuteur",
    output: "Contradiction signalée : la règle validée (2 arrivants) reste la réponse sûre. La nouvelle affirmation attend le responsable.",
  },
  {
    term: "Dit ce qu'elle ne sait pas",
    input: "« Quel est le montant de la prime de cooptation ? »",
    detail: null,
    output: "Aucune réponse sûre. La question rejoint les connaissances à capitaliser.",
  },
];

export interface Comparison {
  readonly situation: string;
  readonly assistant: string;
  readonly lpbia: string;
}

export const comparisons: readonly Comparison[] = [
  {
    situation: "Ce qu'un collaborateur apprend",
    assistant: "Reste dans sa conversation",
    lpbia: "Sert à toute l'équipe, quel que soit son assistant",
  },
  {
    situation: "Deux versions d'une même règle",
    assistant: "Renvoie les passages les plus proches, toutes versions mêlées",
    lpbia: "Sert la règle en vigueur ; la nouvelle version attend la décision du responsable",
  },
  {
    situation: "Une information contredit une règle",
    assistant: "Rien ne la distingue d'une information fiable",
    lpbia: "Signalée, soumise au responsable, jamais écrasée",
  },
  {
    situation: "Fraîcheur des règles",
    assistant: "Pas de statut ni de date de validité",
    lpbia: "Chaque règle porte son statut et sa date",
  },
  {
    situation: "Origine de l'information",
    assistant: "Cite le document",
    lpbia: "Cite la phrase d'origine, le document et l'historique des versions",
  },
  {
    situation: "Dépendance à un éditeur",
    assistant: "La mémoire reste dans l'outil de l'éditeur",
    lpbia: "Une mémoire unique, servie à plusieurs assistants",
  },
];

export interface Question {
  readonly question: string;
  readonly answer: string;
}

// FAQ 4 (hosting in Europe): Hetzner, Helsinki, as the legal notice states.
export const questions: readonly Question[] = [
  {
    question: "Est-ce un « Corporate Brain » ?",
    answer:
      "Oui, avec une différence. Un Corporate Brain classique retient tout, y compris ce qui n'est plus vrai. La Petite Boîte IA distingue ce qui est validé, ce qui attend une décision et ce qui ne vaut plus. Et elle se met en place sans projet documentaire : vos pages existantes s'importent, et vos équipes l'enrichissent en parlant à leur assistant.",
  },
  {
    question: "Et si mes équipes n'utilisent pas le même assistant ?",
    answer: `La mémoire ne dépend pas de l'assistant. Aujourd'hui, ${enumerate(assistants, "et")} y sont connectés. Ce qu'un collaborateur apprend dans l'un est disponible dans l'autre.`,
  },
  {
    question: "Que se passe-t-il quand la mémoire ne sait pas ?",
    answer:
      "Elle le signale à l'assistant, qui peut vous dire que l'information n'existe pas au lieu d'en inventer une. La question rejoint les connaissances manquantes, pour que le responsable sache quoi capitaliser ensuite.",
  },
  {
    question: "Comment sont gérés les accès et la confidentialité ?",
    answer:
      "Les savoirs d'une équipe restent dans l'équipe : les autres équipes n'y accèdent pas. La plateforme est hébergée en Europe.",
  },
  {
    question: "Et si le savoir n'est écrit nulle part ?",
    answer:
      "Le savoir qui vit dans la tête d'un expert ne s'importe pas : il se capte. Notre Mission Savoir Critique le recueille en deux ateliers d'1h30 pour remplir la mémoire dès le départ.",
  },
  {
    question: "Combien de temps prend la mise en place ?",
    answer:
      "Pour la bêta, nous l'organisons avec vous : import de vos pages existantes, ouverture des accès, prise en main du cockpit par le responsable. Le calendrier se fixe ensemble, selon votre périmètre.",
  },
  {
    question: "Qu'est-ce qui arrive ensuite ?",
    answer:
      "Notre feuille de route prévoit la connexion à votre annuaire d'entreprise, l'export complet de votre mémoire et un tableau de bord de sa santé. Les partenaires de la bêta participent à leur priorisation.",
  },
];

/** Legal documents, same paths and labels as the app's LIENS_LEGAUX. */
/** The product signature, in the footer of the app shell (SIGNATURE in the app's web/textes.py). */
export const signature = "La Petite Boîte IA · Une mémoire qui ne ment pas";

export const legalLinks: readonly { readonly href: string; readonly label: string }[] = [
  { href: "/legal/cgu", label: "Conditions d'utilisation" },
  { href: "/legal/cgv", label: "Conditions de vente" },
  { href: "/legal/mentions-legales", label: "Mentions légales" },
];

