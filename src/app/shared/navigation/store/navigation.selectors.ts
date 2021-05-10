import { createSelector } from '@ngrx/store';
import { getNavigationState } from './navigation.reducer';

export const navigationStateSelector = createSelector(
    getNavigationState,
    (state)=>{
        return {
            route_is_loading:state.route_is_loading
        };
    }
)