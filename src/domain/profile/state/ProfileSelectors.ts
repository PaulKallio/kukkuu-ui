import { StoreState } from '../../app/types/AppTypes';

export const profileSelector = (state: StoreState) => state.profile;
export const profileChildrenSelector = (state: StoreState) =>
  state.profile.children;
