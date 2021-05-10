import { createAction, props } from "@ngrx/store";
import { NAVIGATION_ACTIONS } from "../constants/navigation.constants";

export const RouteIsLoading = createAction(
    NAVIGATION_ACTIONS.ROUTE_IS_LOADING,
    (is_loading:boolean) => ({is_loading})
);