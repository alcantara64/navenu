// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  fit: '#00BC07',
  stay: '#007CFF',
  shop: '#FF2894',
  drink: '#C849D9',
  eat: '#FF6800',
  do: '#FFB607',
  textColor: '#221D23',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '#FF963C'
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}

export const Colors = {
  fit: '#00BC07',
  stay: '#007CFF',
  shop: '#FF2894',
  drink: '#C849D9',
  eat: '#FF6800',
  do: '#FFB607',
  orange: '#f57c00',
  blue: '#039be5',
  black: '#222222',
  white: '#ffffff',
  mediumGray: '#6e6869',
  red: '#fc5c65',
  ltblue: '#B8D8D8',
  torquoise: '#749E9F',
  bluegrey: '#4F6367',
  gray: '#4F6367',
  offwhite: '#EEF5DB',
  offred: '#FE5F55',
  ash: '#333333',
  grey: '#F2F2F2',
};

export const categoryColorType = {
  STAY: '#007CFF',
  EAT: '#FF6800',
  SHOP: '#FF2894',
  DRINK: '#C849D9',
  DO: '#FFB607',
  FIT: '#00BC07',
}