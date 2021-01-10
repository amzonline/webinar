import SurveyActionTypes from './survey.types';

const INITIAL_SURVEY_STATE = {
    eventId: '',
    questions: {},
    answers: {}
};

const surveyReducer = (state = INITIAL_SURVEY_STATE, action) => {
    switch (action.type) {
        case SurveyActionTypes.SET_EVENT_ID:
            return {
                ...state,
                eventId: action.payload
            }
        case SurveyActionTypes.SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };
        case SurveyActionTypes.SET_ANSWERS:
            return {
                ...state,
                answers: action.payload
            };
        default:
            return state;
    }
};

export default surveyReducer;