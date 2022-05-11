enum TestActionsTypes {
  incCounter = "TEST/INCREASE_COUNTER",
}

type TestStateType = {
  count: number;
};

type IncCounter = ReturnType<typeof incCounter>;

type TestRootAction = IncCounter;

const initialState = {
  count: 0,
};

export default (
  state: TestStateType = initialState,
  { type, payload }: TestRootAction
) => {
  switch (type) {
    case TestActionsTypes.incCounter:
      return { ...state, count: state.count + payload.count };

    default:
      return state;
  }
};

//action
export const incCounter = (payload: { count: number }) =>
  ({
    type: TestActionsTypes.incCounter,
    payload,
  } as const);
