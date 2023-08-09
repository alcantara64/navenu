import { Dimensions } from "react-native"
import { getPreciseDistance } from "geolib"

const { width, height } = Dimensions.get("window")

const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const horizontalScale = (size) => (width / guidelineBaseWidth) * size
const verticalScale = (size) => (height / guidelineBaseHeight) * size
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor

const calculatePreciseDistance = ({
  firstCoordinateLatitude,
  firstCoordinateLongitude,
  secondCoordinateLatitude,
  secondCoordinateLongitude,
}) => {
  const pdis = getPreciseDistance(
    { latitude: firstCoordinateLatitude, longitude: firstCoordinateLongitude },
    { latitude: secondCoordinateLatitude, longitude: secondCoordinateLongitude },
  )
  return (pdis / 1000).toFixed(0)
}
export { horizontalScale, verticalScale, moderateScale, calculatePreciseDistance }
