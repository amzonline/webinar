import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import QuestionWrapper from './QuestionWrapper';
import { Button } from '@material-ui/core'
import { Auth } from 'aws-amplify';

const Survey = (props) => {

  const { subject, event_id, description, questions } = props;

  // console.log("questions = " + JSON.stringify(questions));
  
  // todo: get email for survey via useEffect. However, it would be better to bring from redux putting userInfo into redux when log in.
  useEffect(() => {
    async function getEmail() {
      const userInfo = await Auth.currentUserInfo();
      initialValues.email = userInfo.attributes.email;
    }
    getEmail();
  }, [])

  // setting initailValues for formik
  const initialValues = {
    event_id: event_id,
    email: '', // email is initially '' but after running useEffect it will be set.
    answers: {}
  }

  for (let i = 0; i < questions.length; i++) {
    let key = "question_" + (i + 1);
    initialValues.answers[key] = '';
  }

  const validationSchema = {
    // todo : validate answer is set in case that the question is mandatory.
  }

  console.log("initialValues for Formik = " + JSON.stringify(initialValues))
  const onSubmit = (values, actions) => {
    console.log('onSubmit values = ' + JSON.stringify(values))
    console.log('onSubmit actions = ' + JSON.stringify(actions))
    console.log('TODO: form submit 처리 개발해야 함...')
  }
  return (
    <div className="Survey">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <header>
            <h3>{subject}</h3>
            <p>{description}</p>
          </header>
          <ul className="list-unstyled">
            {questions.map(question => {
              return <div key={question.questionNo}><QuestionWrapper question={question} /></div>
            })}
          </ul>
          <div className="form-group">
            <Button type="submit">
              Submit
                </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Survey
/* export default withFormik({
  mapPropsToValues: () => {},
  handleSubmit: ( values, { props }) => {
    props.onSubmit(props.event_id, values)
  }
})(Survey); */
