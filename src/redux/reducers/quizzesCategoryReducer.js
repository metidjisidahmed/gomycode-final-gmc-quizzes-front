import * as ActionTypes from '../actions/actionTypes'
const initialState = {
    data : [],
    loading : false,
    error : null
}

export default function quizzesCategoryReducer (state = initialState, action) {
    switch(action.type){
        case ActionTypes.GET_QUIZZES_CATEGORY_LOADING:
            return {
                ...state ,
                loading: true,
                data : [],
                error: null
            }
        case ActionTypes.GET_QUIZZES_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false ,
                error: null,
                data: action.payload
            }
        case ActionTypes.GET_QUIZZES_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                data : [],
                error: action.payload
            }
        default: return state
    }
}
