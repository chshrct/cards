enum RegistrationActionsTypes {
  incCounter = 'TEST/INCREASE_COUNTER',
}

type RegistrationStateType = {
  count: number;
};

type IncCounter = ReturnType<typeof incCounterRegistration>;

export type RegistrationRootActionType = IncCounter;

const initialState = {
  count: 0,
};

export const registrationReducer = (
  state: RegistrationStateType = initialState,
  { type, payload }: RegistrationRootActionType,
): RegistrationStateType => {
  switch (type) {
    case RegistrationActionsTypes.incCounter:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

// action
export const incCounterRegistration = (payload: { count: number }) =>
  ({
    type: RegistrationActionsTypes.incCounter,
    payload,
  } as const);
