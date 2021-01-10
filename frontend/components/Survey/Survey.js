import { Formik, withFormik } from 'formik';
import * as React from 'react';
import QuestionWrapper from './QuestionWrapper';
import { Button } from '@material-ui/core'

const Survey = (props) => {
  const { subject, description, questions } = props;
  
  // setting initailValues for formik
  const initialValues = {
    event_id: props.event_id
  }
  for(let i = 0; i < questions.length; i++) {
    initialValues["question_" + (i+1)] = ''
  }

  console.log("initialValues for Formik = "+ JSON.stringify(initialValues))
  const onSubmit = (values, actions) => {
    console.log('onSubmit values = ' + JSON.stringify(values))
    console.log('onSubmit actions = ' + JSON.stringify(actions))
  } 
  const handleSubmit = () => {console.log('TODO: form submit 처리 개발해야 함...')}
  return (
      <div className="Survey">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        { ({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <header>
                <h3>{subject}</h3>
                <p>{description}</p>
              </header>
              <ul className="list-unstyled">
                {questions.map(question => {
                  return <li key={question.questionNo}><QuestionWrapper question={question}/></li>
                })}
              </ul>
              <div className="form-group">
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
        </Formik>
      </div>
  );
}

// export default Survey
export default withFormik({
  mapPropsToValues: () => {},
  handleSubmit: ( values, { props }) => {
    props.onSubmit(props.event_id, values)
  }
})(Survey);
