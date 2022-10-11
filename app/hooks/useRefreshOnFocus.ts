import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

export function useRefreshOnFocus(refetch: any) {
  const enabledRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch();
      } else {
        enabledRef.current = true;
      }
    }, [refetch]),
  );
}
