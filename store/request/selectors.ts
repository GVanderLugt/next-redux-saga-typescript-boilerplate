import { AppState } from 'store';
import { createSelector } from 'reselect';

export const getRequest = (state: AppState, requestId: string | number) =>
  state.request[requestId];

export const getStatus = (state: AppState, requestId: string | number) =>
  getRequest(state, requestId)?.status;

export const getLoading = createSelector(
  [getStatus],
  (status) => status === 'loading'
);
