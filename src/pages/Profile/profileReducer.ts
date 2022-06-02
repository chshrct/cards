enum PROFILE_ACTIONS {
  INC_COUNTER = 'TEST/INCREASE_COUNTER',
}

type ProfileStateType = {
  count: number;
};

export type ProfileRootActionType = ReturnType<typeof incCounterProfile>;

const initialState = {
  count: 0,
};

export const profileReducer = (
  state: ProfileStateType = initialState,
  { type, payload }: ProfileRootActionType,
): ProfileStateType => {
  switch (type) {
    case PROFILE_ACTIONS.INC_COUNTER:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

// action
export const incCounterProfile = (payload: { count: number }) =>
  ({
    type: PROFILE_ACTIONS.INC_COUNTER,
    payload,
  } as const);
