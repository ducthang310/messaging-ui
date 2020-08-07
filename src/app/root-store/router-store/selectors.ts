import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterData, RouterStateUrl } from './state';

// ------------------------------------------------------------------------------------------------------------
// Router
export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');

const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(getRouterState);

export const getRouteData = createSelector(
  selectRouteData,
  (data: RouterData) => data
);

export const getQueryParams = createSelector(
  selectQueryParams,
  (data) => data
);

export const getRouteParams = createSelector(
  selectRouteParams,
  (data) => data
);

