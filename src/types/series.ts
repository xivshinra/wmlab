export type Contributor = {
  name: string;
  initials: string;
  slug: string;
  image?: string;
};

export type Series = {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  isFavorite: boolean;
  url: string;
  image: string;
  contributors: Contributor[];
  startedTotalUsersCount: number;
  completedTotalUsersCount: number;
  progress: number;
  lastUpdate: string;
  cardsTotalCount: number;
  cardsObtainedCount: number;
  modulesTotalCount: number;
  modulesCompletedCount: number;
  ressourcesTotalCount: number;
  ressourcesObtainedCount: number;
  timelineTotalCount: number;
  timelineObtainedCount: number;
};
