import { Colors, Typography } from "react-native-ui-lib"
import { spacing, typography } from "../theme"

type DesignSystemColors = Record<string, string>
type AppearanceMode = "light" | "dark"
const colors: DesignSystemColors = {
  primary: "#333333",
  secondary: "#469c57",
  accent: "#fed330",
}

const themes: Record<AppearanceMode, any> = {
  light: {
    textColor: colors.blackish,
    bgColor: colors.whitish,
    bg2Color: colors.whitish2,
  },
  dark: {
    textColor: colors.whitish,
    bgColor: colors.blackish,
    bg2Color: colors.blackish2,
  },
}

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = (): void => {
  Colors.loadColors(colors)
  Colors.loadSchemes(themes)

  Typography.loadTypographies({
    largeDarkHeader: {
      fontFamily: typography.primary.normal,
      fontSize: 26,
      textTransform: "uppercase",
      color: "#000000",
    },
    header: {
      fontFamily: typography.primary.normal,
      fontSize: 22,
      textTransform: "uppercase",
      color: "#333333",
    },
    belowHeaderText: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: 12,
      color: "#1E1E1E",
      textTransform: "lowercase",
    },
    sectionHeader: {
      fontFamily: typography.primary.normal,
      fontSize: 18,
      textTransform: "uppercase",
      color: "#333333",
    },
    bigTextDark: {
      fontFamily: "Inter-Regular",
      fontWeight: "400",
      fontSize: 32,
      color: "#333333",
      textTransform: "uppercase",
    },
    cardSubtitleText: {
      fontFamily: typography.primary.normal,
      fontSize: spacing.md,
      color: "#FFFFFF",
    },
    cardTitle: {
      fontFamily: typography.primary.normal,
      fontSize: spacing.lg,
      color: "#FFFFFF",
      textTransform: "uppercase",
    },
    cardUserName: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: spacing.xs,
      color: "#1E1E1E",
      textTransform: "uppercase",
    },
    link: {
      fontFamily: "Inter",
      fontWeight: "400",
      fontSize: spacing.md,
      color: Colors.blue1,
      textDecorationLine: "underline",
      textTransform: "lowercase",
    },
    recEngineTile: {
      fontStyle: "normal",
      fontWeight: 400,
      color: "white",
      fontFamily: "Loved by the King",
    },
  })
}
