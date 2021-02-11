import * as React from 'react';
import { Field, ErrorMessage } from 'formik';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core'

const RadioType = (props) => {
  const { questionNo, question, choice, mandatory } = props;
  const fieldname = "answers.question_" + questionNo
  // console.log('RadioType props ==> ' + JSON.stringify(props))
  return (
    <div>
      <h3 className="question-title">{questionNo}. {question}</h3>
      <div>
        <RadioGroup>
          {choice.map((item, index) => {
            return (
              <div key={index} className="radio">
                <label>
                  <Field as={Radio} name={fieldname} value={item.display}/>
                  {item.display}
                </label>
              </div>
            )
          })}
          <ErrorMessage name={fieldname} />
        </RadioGroup>
      </div>
    </div>
  );
}

export default RadioType;
