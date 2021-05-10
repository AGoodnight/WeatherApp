import { createAction, props } from "@ngrx/store";
import { NAVIGATION_ACTIONS } from "../constants/navigation.constants";

export const RouteIsLoading = createAction(
    NAVIGATION_ACTIONS.route_is_loading,
    (is_loading:boolean) => ({is_loading})
);