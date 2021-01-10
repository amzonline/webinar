import * as React from 'react';
import QuestionWrapper from './QuestionWrapper';
import { withFormik } from 'formik';

const Survey = (props) => {

  const { subject, description, questions } = props;
  const handleSubmit = () => {console.log('TODO: form submit 처리 개발해야 함...')}
  return (
      <div className="Survey">
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
            <input type="submit" className="btn btn-primary"/>
          </div>
        </form>
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
