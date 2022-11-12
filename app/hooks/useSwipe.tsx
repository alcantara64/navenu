import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, onSwipeUp?: any, onSwipeDown?: any, rangeOffset = 4) {

    let firstTouch = 0;
    let firstVerticalTouch = 0;
    
    // set user touch start position
    const onTouchStart = (e: any)  =>{
        firstTouch = e.nativeEvent.pageX
        firstVerticalTouch = e.nativeEvent.pageY
    }


    const  onTouchEnd = (e: any) =>{

        const positionX = e.nativeEvent.pageX
        const positionY = e.nativeEvent.pageY
        const range = windowWidth / rangeOffset

        if(positionX - firstTouch > range){
            onSwipeRight && onSwipeRight()
        }
         if(firstTouch - positionX > range){
            onSwipeLeft && onSwipeLeft()
        }
        if(firstVerticalTouch - positionY > range ){
            onSwipeDown && onSwipeDown()
        }
        if(positionY - firstVerticalTouch > range ){
            onSwipeUp && onSwipeUp()
        }

        
    }

    return {onTouchStart, onTouchEnd};
}