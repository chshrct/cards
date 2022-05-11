import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { incCounter } from "../../redux/testReducer";
import SuperButton from "../../shared/FormControls/SuperButton/SuperButton";
import SuperCheckbox from "../../shared/FormControls/SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../shared/FormControls/SuperEditableSpan/SuperEditableSpan";
import SuperInputText from "../../shared/FormControls/SuperInputText/SuperInputText";
import SuperRadio from "../../shared/FormControls/SuperRadio/SuperRadio";
import SuperRange from "../../shared/FormControls/SuperRange/SuperRange";
import SuperSelect from "../../shared/FormControls/SuperSelect/SuperSelect";

const TestBench = () => {
  const count = useSelector<RootState>((state) => state.test.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>TestBench</h2>
      <div>
        <SuperButton>Button</SuperButton>
      </div>
      <hr />
      <div>
        <SuperCheckbox>Checkbox</SuperCheckbox>
      </div>
      <hr />
      <div>
        <SuperEditableSpan value={"Editable span"} />
      </div>
      <hr />
      <div>
        <SuperInputText placeholder="enter some text" />
      </div>
      <hr />
      <div>
        <SuperRadio name="radio" options={["first", "second", "third"]} />
      </div>
      <hr />
      <div>
        <SuperRange />
      </div>
      <hr />
      <div>
        <SuperSelect options={["first", "second", "third"]} />
      </div>
      <hr />
      <div>
        <h4>Check redux</h4>
        <div>
          <h3>count</h3>
          <div>{`${count}`}</div>
          <button onClick={() => dispatch(incCounter({ count: 3 }))}>
            inc
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestBench;
