import actions from '../constants/actions';

export const startLoader = (params) => {
  return {
    type: actions.LOADER_START,
    payload: params,
  };
};

export const stopLoader = (params) => {
  return {
    type: actions.LOADER_END,
    payload: params,
  };
};
