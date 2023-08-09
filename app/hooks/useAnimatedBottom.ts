import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"

const DEFAULT_HEIGHT = 300
export function useAnimatedBottom(show: boolean, height: number = DEFAULT_HEIGHT) {
  const animatedValue = useRef(new Animated.Value(0))

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  })

  useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start()
    }
  }, [show])

  return bottom
}
