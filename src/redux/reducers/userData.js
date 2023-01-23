import * as ActionTypes from '../actions/actionTypes'
const initialState = {
    data : JSON.parse(localStorage.getItem("user-token")) ?  JSON.parse(localStorage.getItem("user-token")) : { account : null , token : null},
    loading : false ,
    error : null

}

export default function categoriesReducer (state = initialState, action) {
    switch(action.type){
        case ActionTypes.SIGNUP_LOADING:
        case ActionTypes.LOGIN_LOADING:
            return {
                ...state ,
                loading: true,
                data : [],
                error: null
            }
        // case ActionTypes.SIGNUP_LOADING:
        //     return {
        //         ...state,
        //         loading: true,
        //         data : [],
        //         error: null
        //     }
        case  ActionTypes.SIGNUP_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false ,
                error: null,
                data: action.payload
            }
        case ActionTypes.LOGIN_ERROR:
        case ActionTypes.SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                data : [],
                error: action.payload
            }
        case ActionTypes.DISCONNECT:
            return {
                ...state,
                loading: false,
                error : null,
                data : { account : null , token : null}

            }
        default: return state
    }
}


