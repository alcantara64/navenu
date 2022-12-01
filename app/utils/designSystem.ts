import { Colors, Typography } from "react-native-ui-lib";
import { spacing, typography } from "../theme";

type DesignSystemColors = Record<string, string>;
type AppearanceMode = 'light' | 'dark';
const colors: DesignSystemColors = {
    primary: '#333333',
    secondary: '#469c57', 
    accent: '#fed330', 
  
  };
  
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
  };
  
  // for more information - https://wix.github.io/react-native-ui-lib/foundation/style
  export const configureDesignSystem = (): void => {
 
  
  
      Colors.loadColors(colors);
      Colors.loadSchemes(themes);
  
  
    Typography.loadTypographies({
      largeDarkHeader:{
        fontFamily: typography.primary.normal,
        fontSize: 26,
        textTransform: 'uppercase',
        color: '#000000',
        lineSpacing: 1.92,
      },
      header: {
        fontFamily: typography.primary.normal,
        fontSize: 22,
        textTransform: 'uppercase',
        color: '#333333',
        lineSpacing: 1.92,
      },
      belowHeaderText : {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 12,
        color: '#1E1E1E',
        textTransform: 'lowercase'
      },
      sectionHeader: {
        fontFamily: typography.primary.normal,
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#333333',
        lineSpacing: 1.92,
      },
      bigTextDark :{
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
        fontSize: 32,
        color: '#333333',
        textTransform: 'uppercase',
      },
      cardSubtitleText:{
        fontFamily: typography.primary.normal,
        fontSize: spacing.medium,
        lineSpacing: 1.92,
        color: '#FFFFFF',
      },
      cardTitle:{
        fontFamily: typography.primary.normal,
        fontSize: spacing.large,
        lineSpacing: 1.92,
        color: '#FFFFFF',
        textTransform: 'uppercase',
      },
      cardUserName:{
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: spacing.extraSmall,
        color: '#1E1E1E',
        textTransform:'uppercase',
      }


    });
  };