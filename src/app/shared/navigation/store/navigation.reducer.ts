import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { RouteIsLoading } from './navigation.actions';


export interface NavigationState{
    route_is_loading:boolean,
}

export const initialState:NavigationState = {
    route_is_loading:false
}

export const NavigationReducer = createReducer(initialState,
    on(RouteIsLoading,
        (state,payload)=>({
            ...state,
            route_is_loading:payload.is_loading
        })
    ),
)

export const getNavigationState = createFeatureSelector<NavigationState>('navigation')