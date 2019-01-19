import actions from '../constants/actions';
import { loaderIds } from '../constants/ids';

export const initialLoadersState = Object.keys(loaderIds).reduce((state, loaderId) => {
  return {
    ...state,
    [loaderId]: false,
  };
}, {});

export default (state = initialLoadersState, action) => {
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

    case actions.LOADER_END: {
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
