"use client";

import { TripPageSectionFields } from "@/components/admin/trips/trip-form/trip-page-section-fields";
import {
  createEmptyTripPageSection,
  type TripPageSection,
} from "@/lib/types/trip-page-section";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState, type ReactNode } from "react";

type TripPageSectionsEditorProps = {
  sections: TripPageSection[];
  fieldErrors: Record<string, string>;
  sectionImageFiles: Record<string, File | undefined>;
  sectionImagePreviewUrls: Record<string, string>;
  sectionImageErrors: Record<string, string | undefined>;
  /** Quando true, recolhe todas as seções ao entrar no bloco de conteúdo. */
  collapseSectionsTrigger?: boolean;
  /** Na edição: não abre seção automaticamente; todas começam fechadas. */
  defaultAllCollapsed?: boolean;
  onChange: (sections: TripPageSection[]) => void;
  onSectionImageFileChange: (sectionId: string, file: File | null) => void;
  onSectionImageFileClear: (sectionId: string) => void;
};

export function TripPageSectionsEditor({
  sections,
  fieldErrors,
  sectionImageFiles,
  sectionImagePreviewUrls,
  sectionImageErrors,
  collapseSectionsTrigger = false,
  defaultAllCollapsed = false,
  onChange,
  onSectionImageFileChange,
  onSectionImageFileClear,
}: TripPageSectionsEditorProps): ReactNode {
  const [expandedSectionId, setExpandedSectionId] = useState<string | false>(false);
  const prevCollapseSectionsTrigger = useRef(false);

  useEffect(() => {
    if (sections.length === 0) {
      const firstSection = createEmptyTripPageSection();
      onChange([firstSection]);
      if (!defaultAllCollapsed) {
        queueMicrotask(() => setExpandedSectionId(firstSection.id));
      }
      return;
    }

    const firstSectionId = sections[0]?.id;
    if (!firstSectionId) return;

    if (sections.length === 1 && !defaultAllCollapsed) {
      queueMicrotask(() => setExpandedSectionId(firstSectionId));
      return;
    }

    if (expandedSectionId && !sections.some((section) => section.id === expandedSectionId)) {
      queueMicrotask(() => setExpandedSectionId(false));
    }
  }, [sections, onChange, expandedSectionId, defaultAllCollapsed]);

  // Recolhe todas só ao entrar no bloco "Conteúdo" — não ao adicionar seção.
  useEffect(() => {
    const justEnteredContentStep =
      collapseSectionsTrigger && !prevCollapseSectionsTrigger.current;
    prevCollapseSectionsTrigger.current = collapseSectionsTrigger;

    if (!justEnteredContentStep) return;
    if (defaultAllCollapsed || sections.length > 1) {
      queueMicrotask(() => setExpandedSectionId(false));
    }
  }, [collapseSectionsTrigger, sections.length, defaultAllCollapsed]);

  const isOnlySection = sections.length === 1 && !defaultAllCollapsed;

  const updateSection = (index: number, patch: Partial<TripPageSection>) => {
    onChange(
      sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    );
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    const [item] = next.splice(index, 1);
    if (!item) return;
    next.splice(target, 0, item);
    onChange(next);
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) return;

    const removed = sections[index];
    const nextSections = sections.filter((_, sectionIndex) => sectionIndex !== index);
    onChange(nextSections);
    setExpandedSectionId(nextSections.length === 1 ? (nextSections[0]?.id ?? false) : false);
    if (removed) {
      onSectionImageFileClear(removed.id);
    }
  };

  const addSection = () => {
    const nextSection = createEmptyTripPageSection();
    onChange([...sections, nextSection]);
    setExpandedSectionId(nextSection.id);
  };

  return (
    <Stack spacing={2} useFlexGap>
      {sections.map((section, index) => {
        const hasFieldError = Object.keys(fieldErrors).some((key) =>
          key.startsWith(`pageSections.${index}.`),
        );

        return (
          <Accordion
            key={section.id}
            disableGutters
            elevation={0}
            expanded={isOnlySection ? index === 0 : expandedSectionId === section.id}
            onChange={(_, expanded) => {
              if (isOnlySection) return;
              setExpandedSectionId(expanded ? section.id : false);
            }}
            sx={{
              margin: 0,
              border: "1px solid",
              borderColor: hasFieldError ? "error.main" : "divider",
              borderRadius: "4px !important",
              overflow: "hidden",
              bgcolor: "background.paper",
              "&:before": { display: "none" },
              "&.Mui-expanded": { margin: 0 },
              "& .MuiAccordionSummary-root": {
                borderBottom: "none",
              },
              "& .MuiAccordionSummary-root.Mui-expanded": {
                borderBottom: "none",
              },
              "& .MuiAccordionDetails-root": {
                borderTop: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ flexShrink: 0 }} />}
              sx={{
                px: { xs: 1.5, md: 2 },
                borderBottom: "none",
                "&.Mui-expanded": {
                  borderBottom: "none",
                },
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                  my: 1,
                  minWidth: 0,
                  overflow: "hidden",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.75, sm: 1 },
                  flex: 1,
                  minWidth: 0,
                  pr: { xs: 0, sm: 0.5 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexShrink: 0,
                    gap: 0.25,
                  }}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                >
                  <IconButton
                    component="span"
                    size="small"
                    aria-label="Mover seção para cima"
                    disabled={index === 0}
                    onClick={() => moveSection(index, -1)}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    component="span"
                    size="small"
                    aria-label="Mover seção para baixo"
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, 1)}
                  >
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontWeight: 700,
                    color: "text.primary",
                    lineHeight: 1.35,
                  }}
                >
                  Seção {index + 1}
                </Typography>

                <Box
                  sx={{ display: "flex", flexShrink: 0 }}
                  onClick={(event) => event.stopPropagation()}
                  onFocus={(event) => event.stopPropagation()}
                >
                  <IconButton
                    component="span"
                    size="small"
                    color="error"
                    aria-label="Remover seção"
                    disabled={isOnlySection}
                    onClick={() => removeSection(index)}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails
              sx={{ px: { xs: 2, md: 2.5 }, pt: 0, pb: 2.5, borderTop: "none" }}
            >
              <TripPageSectionFields
                section={section}
                index={index}
                fieldErrors={fieldErrors}
                sectionImageFiles={sectionImageFiles}
                sectionImagePreviewUrls={sectionImagePreviewUrls}
                sectionImageErrors={sectionImageErrors}
                imageVariant="compact"
                onChange={(patch) => updateSection(index, patch)}
                onSectionImageFileChange={(file) =>
                  onSectionImageFileChange(section.id, file)
                }
                onSectionImageFileClear={() => onSectionImageFileClear(section.id)}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Button
        type="button"
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={addSection}
        sx={{ alignSelf: "flex-start" }}
      >
        Adicionar seção
      </Button>

      {fieldErrors.pageSections ? (
        <Typography variant="body2" color="error">
          {fieldErrors.pageSections}
        </Typography>
      ) : null}
    </Stack>
  );
}
