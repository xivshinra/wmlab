type TimelineItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: "personnage" | "bataille" | "politique" | "culture";
  image: string;
  status: "locked" | "unlocked" | "completed";
};

export const timelineDatas: TimelineItem[] = [
  {
    id: "1",
    title: "Clovis devient roi des Francs",
    description:
      "Clovis Ier unifie les tribus franques et pose les bases du royaume des Francs, marquant une étape clé dans la construction politique du territoire.",
    date: "481",
    tags: ["Royaume"],
    category: "personnage",
    image: "/assets/images/placeholder.jpg",
    status: "completed",
  },
  {
    id: "2",
    title: "Bataille de Poitiers",
    description:
      "Charles Martel repousse les troupes omeyyades lors d’un affrontement majeur souvent considéré comme déterminant pour l’Europe occidentale.",
    date: "732",
    tags: ["Militaire"],
    category: "bataille",
    image: "/assets/images/placeholder.jpg",
    status: "locked",
  },
  {
    id: "3",
    title: "Charlemagne empereur",
    description:
      "Couronné empereur, Charlemagne consolide un vaste empire et favorise un renouveau culturel important.",
    date: "800",
    tags: ["Empire"],
    category: "personnage",
    image: "/assets/images/placeholder.jpg",
    status: "locked",
  },
  {
    id: "4",
    title: "Révolution française",
    description:
      "La Révolution transforme profondément les institutions françaises et marque la fin de la monarchie absolue.",
    date: "1789",
    tags: ["République"],
    category: "politique",
    image: "/assets/images/placeholder.jpg",
    status: "unlocked",
  },
  {
    id: "5",
    title: "Renaissance française",
    description:
      "Période d’intense développement artistique et intellectuel sous l’impulsion de plusieurs souverains.",
    date: "1500~",
    tags: ["Art"],
    category: "culture",
    image: "/assets/images/placeholder.jpg",
    status: "locked",
  },
];
