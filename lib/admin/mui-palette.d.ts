import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    sidebar: Palette["primary"];
  }

  interface PaletteOptions {
    sidebar?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    sidebar: true;
  }
}
