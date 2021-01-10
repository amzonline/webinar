import * as React from 'react';
import { Field } from 'formik';
import { Checkbox } from "@material-ui/core"

const CheckboxeType = (props) => {
  const { questionNo, question, choice, mandatory } = props;
  const fieldname = "question_" + questionNo
  return (
    <div>
      <h3 className="question-title">{question}</h3>
      <div>
      {choice.map((item, index) => {
        return (
          <div className="checkbox" key={index}>
            <label>
              <Field as={Checkbox} name={`${fieldname}[${index}]`}/>
              {item.display}
            </label>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default CheckboxeType;
