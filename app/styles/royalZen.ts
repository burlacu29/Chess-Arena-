export const royalZen = {
  name: "Royal Zen",

  background: "#100d0b",
  ambientLight: 1.15,

  board: {
    light: "#f1d5a6",
    dark: "#472315",
    selected: "#ffcc58",
    frame: "#51240e",
    metalness: 0.35,
    roughness: 0.12,
  },

  pieces: {
    white: "#fff0ce",
    black: "#101014",
    whiteMetal: "#d9a34b",
    blackMetal: "#a87935",
    metalness: 0.55,
    roughness: 0.1,
  },

  interface: {
    background: "#110e0c",
    gold: "#e9b95f",
    text: "#fff2db",
    border: "#9a7135",
  },
} as const;
