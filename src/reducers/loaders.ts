import actions from '../constants/actions';
import { loaderIds, LoaderId } from '../constants/ids';

type InitialLoadersState = {
  [key in LoaderId]: boolean
}

export const initialLoadersState: InitialLoadersState = Object.keys(loaderIds).reduce((state, loaderId) => {
  return {
    ...state,
    [loaderId]: false,
  };
}, {} as InitialLoadersState);

export default (state = initialLoadersState, action: AppAction) => {
  switch (action.type) {
    case actions.LOADER_START: {
      const { loaderId } = action.payload;

      if (state[loaderId]) {
        return state;
      }

      return {
        ...state,
        [loaderId]: true,
      };
    }

    case actions.LOADER_STOP: {
      const { loaderId } = action.payload;

      if (!state[loaderId]) {
        return state;
      }

      return {
        ...state,
        [loaderId]: false,
      };
    }

    default: {
      return state;
    }
  }
}
