enum ProfileActionsTypes {
  incCounter = "TEST/INCREASE_COUNTER",
}

type ProfileStateType = {
  count: number;
};

type IncCounter = ReturnType<typeof incCounter>;

export type ProfileRootActionType = IncCounter;

const initialState = {
  count: 0,
};

const profileReducer = (
  state: ProfileStateType = initialState,
  { type, payload }: ProfileRootActionType
) => {
  switch (type) {
    case ProfileActionsTypes.incCounter:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

//action
export const incCounter = (payload: { count: number }) =>
  ({
    type: ProfileActionsTypes.incCounter,
    payload,
  } as const);

export default profileReducer;
