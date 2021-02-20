import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import QuestionWrapper from './QuestionWrapper';
import { Button } from '@material-ui/core'
import { Auth } from 'aws-amplify';
import SlideDialog from '../Dialog/SlideDialog'

export default function Survey(props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { subject, event_id, description, questions } = props;

  const closeDialog = () => {
    setDialogOpen(false)
  };

  const closeWindow = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
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
  const onSubmit = async (values, actions) => {
    console.log('onSubmit values = ' + JSON.stringify(values))
    // To use env variable in the client module, set variable name starts with "NEXT_PUBLIC_" in Next.js
    console.log('process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX in Survey.js =' + process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX)
      // Call API Gateway
      fetch(process.env.NEXT_PUBLIC_SURVEY_USER_ENDPOINT_PREFIX + 'answer', {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": process.env.NEXT_PUBLIC_CORS_ORIGIN
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(() => openDialog())
      .catch(err => console.error(err));
  }

  const openDialog = () => {
    setDialogOpen(true)
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
      <SlideDialog open={dialogOpen} onCloseWindow={closeWindow} onCloseDialog={closeDialog} title="Thank you for your survey"
          contents='Your Survey was successfully saved. If you want to close survey window click "CLOSE" button.
                    Or if you want to update survey click "CANCEL" button.' />
    </div>
  );
}