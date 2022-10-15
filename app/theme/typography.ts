// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
  SpaceGrotesk_700Bold as spaceGroteskBold,
} from "@expo-google-fonts/space-grotesk"

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
export const mapStyle = [
  { featureType: 'all', elementType: 'geometry.fill', stylers: [{ weight: '2.00' }] },
  { featureType: 'all', elementType: 'geometry.stroke', stylers: [{ color: '#9c9c9c' }] },
  { featureType: 'all', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#f2f2f2' }] },
  { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }] },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ffffff' }],
  },
  { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: 45 }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#eeeeee' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#7b7b7b' }] },
  { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.highway', elementType: 'all', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'road.arterial', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ color: '#46bcec' }, { visibility: 'on' }],
  },
  { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#c8d7d4' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#070707' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
];