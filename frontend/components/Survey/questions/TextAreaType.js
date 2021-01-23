import * as React from "react";
import { Field, ErrorMessage } from 'formik';
import { TextareaAutosize } from '@material-ui/core'

const TextAreaType = (props) => {
  const { questionNo, question, maxInput, mandatory } = props;
  const fieldname = "question_" + questionNo
  return (
    <div>
      <h3 className="question-title">{questionNo}. {question}</h3>
      <div className="form-group">
        <Field as={TextareaAutosize} className="form-control" name={fieldname}/>
        <ErrorMessage name={fieldname} />
      </div>
    </div>
  );
}

export default TextAreaType;
