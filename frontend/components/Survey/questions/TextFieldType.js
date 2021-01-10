import * as React from "react";
import { Field } from 'formik';
import { TextField } from '@material-ui/core'

const TextFieldType = (props) => {
  const { questionNo, question, maxInput, mandatory } = props;
  const fieldname = "question_" + questionNo
  return (
    <div>
      <h3 className="question-title">{question}</h3>
      <div className="form-group">
        <Field as={TextField} className="form-control" name={fieldname}/>
      </div>
    </div>
  );
}

export default TextFieldType;