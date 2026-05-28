export const TRIP_FORM_STEPS = [
  {
    id: "basics",
    label: "Identificação",
    description: "Imagem principal, título e categoria.",
  },
  {
    id: "destination",
    label: "Destino",
    description: "Tipos de experiência, slug e status.",
  },
  {
    id: "schedule",
    label: "Datas",
    description: "Período da viagem.",
  },
  {
    id: "sections",
    label: "Conteúdo da página",
    description: "",
  },
  {
    id: "summary",
    label: "Resumo",
    description: "Revise os dados antes de salvar.",
  },
] as const;

export const EDIT_TRIP_FORM_STEPS = TRIP_FORM_STEPS.filter(
  (step) => step.id !== "summary" && step.id !== "sections",
);

export type TripFormStepId = (typeof TRIP_FORM_STEPS)[number]["id"];
