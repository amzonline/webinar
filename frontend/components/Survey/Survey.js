import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import QuestionWrapper from './QuestionWrapper';
import { Button } from '@material-ui/core'
import { Auth } from 'aws-amplify';
// import dotenv from  'dotenv'
// import "../../env.js"

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
    // todo : check email address was set.
  }

  console.log("initialValues for Formik = " + JSON.stringify(initialValues))
  // TODO : 여기 처리해야 함.
  const onSubmit = async (values, actions) => {
    console.log('onSubmit values = ' + JSON.stringify(values))
    // console.log('TODO: form submit 처리 개발해야 함...')
    // console.log('process.env.NODE_ENV in Survey.js =' + process.env.NODE_ENV)
    // To use env variable in the client module, set variable name starts with "NEXT_PUBLIC_" in Next.js
    console.log('process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX in Survey.js =' + process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX)
    try {
      // Is it good to call directly api gateway from client?
      const res = await fetch(process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX + 'answer', {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "http://localhost:3000"
        },
        body: JSON.stringify(values)
      });
      const result = await res.json()
      console(JSON.stringify(result))
    } catch (error) {
      console.log('error occurred. ' + JSON.stringify(error))
    }
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
