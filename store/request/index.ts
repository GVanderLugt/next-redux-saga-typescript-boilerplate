import _ from 'lodash';
import { PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';

export interface RequestState {
  [index: string]: {
    status: 'loading' | 'success' | 'error';
    message?: string;
  };
}

const initialState: RequestState = {};

export type RequestActionPayload = PayloadAction<string | number>;

const actions = {
  start: (requestId: string | number) => {
    return { type: `request/${requestId}/start`, payload: requestId };
  },
  success: (requestId: string | number) => {
    return { type: `request/${requestId}/success`, payload: requestId };
  },
  error: (requestId: string | number) => {
    return { type: `request/${requestId}/error`, payload: requestId };
  },
  clear: (requestId: string | number) => {
    return { type: `request/${requestId}/clear`, payload: requestId };
  },
};

const requestReducer = produce(
  (state = initialState, action: RequestActionPayload) => {
    if (/request\/.*\/start/.test(action.type)) {
      _.set(state, `${action.payload}.status`, 'loading');
    } else if (/request\/.*\/success/.test(action.type)) {
      _.set(state, `${action.payload}.status`, 'success');
    } else if (/request\/.*\/error/.test(action.type)) {
      _.set(state, `${action.payload}.status`, 'error');
    } else if (/request\/.*\/clear/.test(action.type)) {
      delete state[action.payload];
    }

    return state;
  }
);

export const { start, success, error, clear } = actions;
export default requestReducer;
