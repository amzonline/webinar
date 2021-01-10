import React from 'react';
import TextFieldType from './questions/TextFieldType';
import TextAreaType from './questions/TextAreaType';
import CheckboxType from './questions/CheckboxType';
import RadioType from './questions/RadioType';

export const QuestionTypes = {
  RADIO: "radio",
  CHECKBOX: "checkbox",
  TEXTFIELD: "textfield",
  TEXTAREA: "textarea"
};

const questionMap = {
  [QuestionTypes.TEXTFIELD]: (question) => {
    return <TextFieldType {...question} />
  },
  [QuestionTypes.TEXTAREA]: (question) => {
    return <TextAreaType {...question} />
  },
  [QuestionTypes.CHECKBOX]: (question) => {
    return <CheckboxType {...question} />
  },
  [QuestionTypes.RADIO]: (question) => {
    return <RadioType {...question} />
  }
};

const QuestionWrapper = (props) => {
  const { question } = props  // const { question } is to get only question object in the props.
  // console.log('QuestionWrapper question = ' + JSON.stringify(question))
  // console.log('QuestionWrapper question.type = ' + question.type)
  const QuestionComponent = questionMap[question.type](question);
  const classNames = 'question clearfix';

  return (
    <div className={classNames}>
      {QuestionComponent}
    </div>
  )
}

export default QuestionWrapper;
