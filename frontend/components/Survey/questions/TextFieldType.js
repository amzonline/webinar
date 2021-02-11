import * as React from "react";
import { Field, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core'

const TextFieldType = (props) => {
  const { questionNo, question, maxInput, mandatory } = props;
  const fieldname = "answers.question_" + questionNo
  return (
    <div>
      <h3 className="question-title">{questionNo}. {question}</h3>
      <div className="form-group">
        <Field as={TextField} className="form-control" name={fieldname}/>
        <ErrorMessage name={fieldname} />
      </div>
    </div>
  );
}

export default TextFieldType;