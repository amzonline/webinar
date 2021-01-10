import * as React from 'react';
import { Field } from 'formik';
import { Radio } from '@material-ui/core'

const RadioType = (props) => {
  const { questionNo, question, choice, mandatory } = props;
  const fieldname = "question_" + questionNo
  console.log('RadioType props ==> ' + JSON.stringify(props))
  return (
    <div>
      <h3 className="question-title">{question}</h3>
      <div>
      {choice.map((item, index) => {
        return (
            <div key={index} className="radio">
              <label>
                <Field as={Radio} name={fieldname} value={index}/>
                {item.display}
              </label>
            </div>
        )
      })}
      </div>
    </div>
  );
}

export default RadioType;
