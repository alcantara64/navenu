import * as React from "react"
import { StyleProp, ViewStyle, PixelRatio } from "react-native"
import { observer } from "mobx-react-lite"
import { Images } from "../theme/images"
import { View, Text, Image } from 'react-native-ui-lib';
import { Marker, Callout } from 'react-native-maps';
  

export interface ISuckMapMarkerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  venue: any
  onMarkerPressed: (item:any) => void
}

/**
 * Describe your component here
 */
export const ISuckMapMarker = observer(function ISuckMapMarker(props: ISuckMapMarkerProps) {
  const { venue, onMarkerPressed } = props

  const handleMakerPress = () => {
    onMarkerPressed(venue);
  }

  const size = 100;
  switch (venue.type) {
    case 'location':
      switch (venue.category) {
        case 'DO':
          var icon = Images.DO;
          break;
        case 'EAT':
          var icon = Images.EAT;
          break;
        case 'DRINK':
          var icon = Images.DRINK;
          break;
        case 'STAY':
          var icon = Images.STAY;
          break;
        case 'FIT':
          var icon = Images.FIT;
          break;
        case 'SHOP':
          var icon = Images.SHOP;
          break;
      }
      return (
        <Marker
         onPress={handleMakerPress}
          key={venue.id}
          coordinate={{
            latitude: parseFloat(venue.lat),
            longitude: parseFloat(venue.lng),
          }}
          image={icon}>
          <Callout>
            <View>
              <Image source={{ url: venue.image }} />
              <Text>{venue.name}</Text>
            </View>
          </Callout>
        </Marker>
      );
      case 'drop':
        switch (venue.parent_category) {
          case 'DO':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                var icon = Images.DO5;
                break;
              case 25:
                var icon = Images.DO25;
                break;
              case 50:
                var icon = Images.DO50;
                break;
              case 75:
                var icon = Images.DO75;
                break;
              case 100:
                var icon = Images.DO100;
                break;
            }
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                //   style={{ width: 255, height: 255 }}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}>
                <Image
                  source={icon}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{
                    width: PixelRatio.getPixelSizeForLayoutSize(size),
                    height: PixelRatio.getPixelSizeForLayoutSize(size),
                  }}
                />
                <Callout>
                  <View>
                    <Image
                      source={{ url: venue.image }}
                      style={{
                        width: PixelRatio.getPixelSizeForLayoutSize(size),
                        height: PixelRatio.getPixelSizeForLayoutSize(size),
                      }}
                    />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          case 'EAT':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                var icon = Images.EAT5;
                break;
              case 25:
                var icon = Images.EAT25;
                break;
              case 50:
                var icon = Images.EAT50;
                break;
              case 75:
                var icon = Images.EAT75;
                break;
              case 100:
                var icon = Images.EAT100;
                break;
            }
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}
                image={icon}>
                <Callout>
                  <View>
                    <Image source={{ url: venue.image }} />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          case 'DRINK':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                 icon = Images.DRINK5;
                break;
              case 25:
                 icon = Images.DRINK25;
                break;
              case 50:
                 icon = Images.DRINK50;
                break;
              case 75:
                 icon = Images.DRINK75;
                break;
              case 100:
                 icon = Images.DRINK100;
                break;
            }
  
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}
                image={icon}>
                <Callout>
                  <View>
                    <Image source={{ url: venue.image }} />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          case 'STAY':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                var icon = Images.STAY5;
                break;
              case 25:
                var icon = Images.STAY25;
                break;
              case 50:
                var icon = Images.STAY50;
                break;
              case 75:
                var icon = Images.STAY75;
                break;
              case 100:
                var icon = Images.STAY100;
                break;
            }
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}
                image={icon}>
                <Callout>
                  <View>
                    <Image source={{ url: venue.image }} />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          case 'FIT':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                var icon = Images.FIT5;
                break;
              case 25:
                var icon = Images.FIT25;
                break;
              case 50:
                var icon = Images.FIT50;
                break;
              case 75:
                var icon = Images.FIT75;
                break;
              case 100:
                var icon = Images.FIT100;
                break;
            }
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}
                image={icon}>
                <Callout>
                  <View>
                    <Image source={{ url: venue.image }} />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          case 'SHOP':
            switch (Number(venue.percentage_elapsed)) {
              case 5:
                 icon = Images.SHOP5;
                break;
              case 25:
                 icon = Images.SHOP25;
                break;
              case 50:
                 icon = Images.SHOP50;
                break;
              case 75:
                icon = Images.SHOP75;
                break;
              case 100:
                icon = Images.SHOP100;
                break;
            }
            return (
              <Marker
              onPress={handleMakerPress}
                key={venue.id}
                coordinate={{
                  latitude: parseFloat(venue.lat),
                  longitude: parseFloat(venue.lng),
                }}
                image={icon}>
                <Callout>
                  <View>
                    <Image source={{ url: venue.image }} />
                    <Text>{venue.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
        }
        break;
  
      case 'article':
        return null;

    }
    return null;
  
});


