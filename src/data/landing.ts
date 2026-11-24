// Landing copy, verbatim from the arbitration positioning brief of 2026-11-24
// (it replaces the copy first taken from the app's gabarits/landing.html).
// Keep every string as written there. See CLAUDE.md.

/** Assistants that are connected and tested. Card 3, FAQ 5 and the hub label read them here. */
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
    "Ce que vos équipes choisissent de partager avec leurs assistants IA devient une règle d'entreprise à jour, tranchée par vos responsables, pas par la machine.",
} as const;

export interface Pillar {
  readonly icon: "chat" | "doc" | "lock";
  readonly title: string;
  readonly body: string;
}

export const pillars: readonly Pillar[] = [
  {
    icon: "lock",
    title: "La contradiction est bloquée",
    body: "Quand une information contredit une règle en vigueur, elle n'entre pas. En attendant, tout le monde continue de recevoir la règle validée.",
  },
  {
    icon: "chat",
    title: "Le bon responsable tranche",
    body: "Le désaccord part à la personne qui porte déjà le sujet : RH, conformité, chef d'atelier. Pas de revue de toute la base : elle ne voit que les désaccords.",
  },
  {
    icon: "doc",
    title: "Tous vos assistants s'alignent",
    body: `La règle tranchée est servie aux assistants déjà déployés, ${enumerate(assistants, "et")} aujourd'hui, avec sa source. Une règle remplacée sort des réponses, jamais de l'historique.`,
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
    term: "Bloque et soumet au responsable",
    input: "« Un tuteur peut accompagner 3 nouveaux arrivants. »",
    detail: "un tuteur",
    output: "Contradiction signalée : la règle validée (2 arrivants) reste la réponse sûre. La nouvelle affirmation attend le responsable.",
  },
  {
    term: "Sert la règle tranchée",
    input: "« Combien de temps dure la formation sécurité ? »",
    detail: "un responsable, dans Claude",
    output: "Formation sécurité : 4 h depuis le 1er octobre, validée par le responsable. La version à 3 h reste dans l'historique.",
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
    situation: "Une correction contredit une règle",
    assistant: "Retenue telle quelle : le dernier qui a parlé a raison",
    lpbia: "Bloquée, le responsable du sujet tranche",
  },
  {
    situation: "Qui relit",
    assistant: "Tout le monde, ou personne",
    lpbia: "Seulement les désaccords, par le bon responsable",
  },
  {
    situation: "Une règle est remplacée",
    assistant: "Les deux versions se mélangent",
    lpbia: "L'ancienne sort des réponses, reste dans l'historique",
  },
  {
    situation: "D'où vient la réponse",
    assistant: "Pas toujours dit",
    lpbia: "Source et auteur, à chaque fois",
  },
  {
    situation: "L'information manque",
    assistant: "L'IA invente",
    lpbia: "Elle le dit, et la question remonte",
  },
];

export interface Question {
  readonly question: string;
  readonly answer: string;
}

// FAQ 6 (data in Europe): Hetzner, Helsinki, as the legal notice states.
export const questions: readonly Question[] = [
  {
    question: "Est-ce un « company brain » de plus ?",
    answer:
      "Non. Un company brain retient tout, y compris ce qui n'est plus vrai, ou laisse l'IA réconcilier seule. Ici, quand deux versions s'opposent, c'est votre responsable qui tranche.",
  },
  {
    question: "Mon responsable va-t-il passer ses journées à valider ?",
    answer:
      "Non. Seuls les désaccords lui remontent, et seulement ceux de son sujet. Tout ce qui ne contredit rien entre seul.",
  },
  {
    question: "Vous écoutez nos salariés ?",
    answer:
      "Non. Seul ce qu'un collaborateur demande à son assistant de retenir pour l'équipe entre dans la mémoire, avec son nom. Rien n'entre à son insu.",
  },
  {
    question: "Faut-il un projet documentaire ?",
    answer:
      "Non. On part de vos documents existants, et la mémoire s'améliore ensuite avec le terrain.",
  },
  {
    question: "Avec quels assistants ?",
    answer: `${enumerate(assistants, "et")} aujourd'hui, directement dans les outils de vos équipes. Une offre Starter inclut aussi un espace de discussion, sans la DSI.`,
  },
  {
    question: "Où sont mes données ?",
    answer:
      "En Europe. Chaque entreprise a son espace séparé, et vos connaissances restent votre propriété.",
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

