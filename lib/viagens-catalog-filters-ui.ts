import { ViagemCategory, ViagemScope } from "@/lib/types/viagens";

export type ViagemScopeFilterId = ViagemScope | null;

export type ViagemScopeFilterOption = {
  id: ViagemScopeFilterId;
  label: string;
};

export const viagemScopeFilterOptions: readonly ViagemScopeFilterOption[] = [
  { id: null, label: "Todos" },
  { id: ViagemScope.Nacional, label: "Nacional" },
  { id: ViagemScope.Internacional, label: "Internacional" },
] as const;

export type ViagensCatalogFilterState = {
  dateSlotId: string | null;
  scopeId: ViagemScopeFilterId;
  categoryId: ViagemCategory;
};

export const defaultViagensCatalogFilters: ViagensCatalogFilterState = {
  dateSlotId: null,
  scopeId: null,
  categoryId: ViagemCategory.Todos,
};

export function isDefaultViagensCatalogFilters(state: ViagensCatalogFilterState): boolean {
  return (
    state.dateSlotId === null &&
    state.scopeId === null &&
    state.categoryId === ViagemCategory.Todos
  );
}

export function countActiveViagensCatalogFilters(state: ViagensCatalogFilterState): number {
  let count = 0;
  if (state.dateSlotId !== null) count += 1;
  if (state.scopeId !== null) count += 1;
  if (state.categoryId !== ViagemCategory.Todos) count += 1;
  return count;
}
