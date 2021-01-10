import SurveyActionTypes from './survey.types';

export const setEventId = eventId => ({
    type: SurveyActionTypes.SET_EVENT_ID,
    payload: eventId
})

export const setSurveyQuestions = questions => ({
    type: SurveyActionTypes.SET_QUESTIONS,
    payload: questions
})

export const setSurveyAnswers = answers => ({
    type: SurveyActionTypes.SET_ANSWERS,
    payload: answers
})