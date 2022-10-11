import {useEffect} from 'react';
import {AppState} from 'react-native';

export function useAppState(onChange: any) {
  useEffect(() => {
    AppState.addEventListener('change', onChange);
    return () => {
      // AppState.remove('change', onChange);
    };
  }, [onChange]);
}
