"use client";

import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";
import { useState, type ReactNode } from "react";

type TripActionsMenuProps = {
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  viewPageHref?: string | null;
  iconButtonSx?: SxProps<Theme>;
};

export function TripActionsMenu({
  onEdit,
  onDuplicate,
  onDelete,
  viewPageHref,
  iconButtonSx,
}: TripActionsMenuProps): ReactNode {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const close = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="Ações da viagem"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={iconButtonSx}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={close}>
        <MenuItem
          onClick={() => {
            close();
            onEdit();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        {viewPageHref ? (
          <MenuItem
            component="a"
            href={viewPageHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <ListItemIcon>
              <OpenInNewOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ver página da viagem</ListItemText>
          </MenuItem>
        ) : null}
        <MenuItem
          onClick={() => {
            close();
            onDuplicate();
          }}
        >
          <ListItemIcon>
            <ContentCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicar</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            close();
            onDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <DeleteOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remover</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
