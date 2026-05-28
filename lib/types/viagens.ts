export enum ViagemRegion {
  Caribe = "caribe",
  Brasil = "brasil",
  Pacifico = "pacifico",
}

export enum ViagemScope {
  Nacional = "nacional",
  Internacional = "internacional",
}

export enum ViagemCategory {
  Todos = "todos",
  ProximasDatas = "proximas-datas",
  OpenWaterPlus = "open-water-plus",
  AdvancedPlus = "advanced-plus",
  Liveaboard = "liveaboard",
  Resort = "resort",
  Expedicao = "expedicao",
  Fotografia = "fotografia",
  VidaMarinha = "vida-marinha",
}

export type ViagemCategoryMeta = {
  id: ViagemCategory;
  label: string;
};

export type ViagemDateSlot = {
  id: string;
  monthLabel: string;
  destinationLabel: string;
  /** Viagem vinculada ao slot; `null` quando não há saída (ex.: "—"). */
  tripId: string | null;
};

export type Viagem = {
  id: string;
  slug: string;
  /** Ex.: Fernando de Noronha – PE */
  title: string;
  scope: ViagemScope;
  /** Ex.: Nacional · Internacional */
  scopeLabel: string;
  description: string;
  region: ViagemRegion;
  regionLabel: string;
  /** ISO 8601 — usado em filtros (ex.: próximas datas). */
  startDate: string;
  categories: readonly ViagemCategory[];
  imageSrc: string;
  imageAlt: string;
  dateSlotIds: readonly string[];
};

export type ViagensCatalogResponse = {
  trips: Viagem[];
  dateSlots: ViagemDateSlot[];
  categories: ViagemCategoryMeta[];
};
