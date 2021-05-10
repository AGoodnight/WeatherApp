import { ActionReducer, MetaReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { WeatherReducer, WeatherState } from './features/weather/store/weather.reducer';
import { NavigationState, NavigationReducer } from './shared/navigation/store/navigation.reducer';


export interface State {
  weather:WeatherState,
  navigation:NavigationState
}

export const reducers: ActionReducerMap<State> = {
  weather:WeatherReducer,
  navigation:NavigationReducer
}

// Local Storage Configuration
// We can be more selective about what we retain in local storage.
function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      'weather'
    ]
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
