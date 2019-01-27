import actions from '../constants/actions';
import { LoaderId } from '../constants/ids';

export type StartLoaderAction = {
  type: typeof actions.LOADER_START,
  payload: {
    loaderId: LoaderId,
  },
}

export type StopLoaderAction = {
  type: typeof actions.LOADER_STOP,
  payload: {
    loaderId: LoaderId,
  },
}


export const startLoader = ({ loaderId }: { loaderId: LoaderId }): StartLoaderAction => {
  return {
    type: actions.LOADER_START,
    payload: {
      loaderId,
    },
  };
};

export const stopLoader = ({ loaderId }: { loaderId: LoaderId }): StopLoaderAction => {
  return {
    type: actions.LOADER_STOP,
    payload: {
      loaderId,
    },
  };
};
