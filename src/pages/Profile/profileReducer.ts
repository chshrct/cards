enum ProfileActionsTypes {
  incCounter = 'TEST/INCREASE_COUNTER',
}

type ProfileStateType = {
  count: number;
};

type IncCounter = ReturnType<typeof incCounterProfile>;

export type ProfileRootActionType = IncCounter;

const initialState = {
  count: 0,
};

export const profileReducer = (
  state: ProfileStateType = initialState,
  { type, payload }: ProfileRootActionType,
): ProfileStateType => {
  switch (type) {
    case ProfileActionsTypes.incCounter:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

// action
export const incCounterProfile = (payload: { count: number }) =>
  ({
    type: ProfileActionsTypes.incCounter,
    payload,
  } as const);
