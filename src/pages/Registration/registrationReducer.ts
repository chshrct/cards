enum RegistrationActionsTypes {
  incCounter = "TEST/INCREASE_COUNTER",
}

type RegistrationStateType = {
  count: number;
};

type IncCounter = ReturnType<typeof incCounter>;

export type RegistrationRootActionType = IncCounter;

const initialState = {
  count: 0,
};

const registrationReducer = (
  state: RegistrationStateType = initialState,
  { type, payload }: RegistrationRootActionType
) => {
  switch (type) {
    case RegistrationActionsTypes.incCounter:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

//action
export const incCounter = (payload: { count: number }) =>
  ({
    type: RegistrationActionsTypes.incCounter,
    payload,
  } as const);

export default registrationReducer;
