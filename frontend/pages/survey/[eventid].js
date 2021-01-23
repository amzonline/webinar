import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import Amplify, { Auth } from "aws-amplify";
import awsExports from "../../core/aws-exports";

import { connect } from 'react-redux';
import { setEventId, setSurveyQuestions } from '../../core/redux/survey.action';

import Survey from '../../components/Survey/Survey';
import './SurveyPage.css';

Amplify.configure(awsExports);

const SurveyPage = (survey) => {
  console.log('survey data = ' + JSON.stringify(survey))
  const router = useRouter()
  useEffect(() => {
    checkSession()
    setEventId(survey.data.event_id)
    setSurveyQuestions(survey.data)
  });

  function moveToLogin() {
    router.push("/webinar-login")
  }

  async function checkSession() {
    try {
      const session = await Auth.currentSession()
      if (!session.isValid()) {
        moveToLogin()
      }
    } catch (error) {
      console.log(error.message)
      moveToLogin()
    }
  }

  return (
      <div className="container">
        <div className="row SurveyPage">
          <div className="col-md-8 col-md-offset-2 survey">
            <Survey {...survey.data}/>
          </div>
        </div>
      </div>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  // TODO - lambda 호출해서 survey 관련 JSON 을 조회해 올 것... lambda endpoint 정보 관리는 어디서??
  // console.log(`eventid:${eventid}`)
  // test 를 위해서 일단 Lambda 로 조회해오는 부분을 막고 hardcoding 으로 quesion 정보를 넘겨주도록 한다.
  /*
  console.log('process.env.SURVEY_ENDPOINT_PREFIX=' + process.env.SURVEY_ENDPOINT_PREFIX)
  const res = await fetch(process.env.SURVEY_ENDPOINT_PREFIX + context.params.eventid)
  const survey = await res.json()
  */
  const survey = {
    "message": "Successfully retrieved.",
    "data": {
      "subject": "2020 seoul summit Survey",
      "event_id": "2020_seoul_summit",
      "data_table": "SurveyData",
      "description": "Seoul summit 세션을 경청해주셔서 감사합니다. 보다 나은 행사와 세션 준비를 위해 아래 설문에 응해주시기 부탁드립니다.",
      "questions": [
        {
          "questionNo": 1,
          "question": "온라인 행사에 만족하십니까?",
          "type": "radio",
          "choice": [
            {
              "display": "그렇다"
            },
            {
              "display": "아니다"
            }
          ],
          "mandatory": true
        },
        {
          "questionNo": 2,
          "question": "이번 세션에서 어떤 부분을 만족하십니까?",
          "noOfMinChoice": 1,
          "noOfMaxChoice": 2,
          "type": "checkbox",
          "choice": [
            {
              "display": "강사"
            },
            {
              "display": "컨텐츠"
            },
            {
              "textfield": "",
              "display": "기타"
            }
          ],
          "mandatory": true
        },
        {
          "questionNo": 3,
          "question": "본 세션의 만족도 점수를 선택해주세요.",
          "type": "radio",
          "choice": [
            {
              "display": "1"
            },
            {
              "display": "2"
            },
            {
              "display": "3"
            },
            {
              "display": "4"
            },
            {
              "display": "5"
            }
          ],
          "mandatory": true
        },
        {
          "questionNo": 4,
          "question": "이번 세션에 개선점이 있다면 간략히 기술부탁드립니다",
          "type": "textfield",
          "maxInput": 50,
          "mandatory": false
        },
        {
          "questionNo": 5,
          "question": "추가 comments 가 있으시면 자유롭게 기술부탁드립니다.",
          "type": "textarea",
          "maxInput": 500,
          "mandatory": false
        }
      ]
    }
  };
  //  const survey = 
  console.log('survey data... = ' + JSON.stringify(survey))

  // Pass data to the page via props
  return { props: survey }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setEventId: eventId => dispatch(setEventId(eventId)),
  setSurveyQuestions: questions => dispatch(setSurveyQuestions(questions))
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyPage);