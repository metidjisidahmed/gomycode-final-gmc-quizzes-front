import { combineReducers } from 'redux'


import categoriesReducer from "./categoriesReducer"
import quizzesCategoryReducer from "./quizzesCategoryReducer";
import userDataReducer from "./userData"
// import gendersReducer from "./gendersReducer"

let reducers= combineReducers({

    categories : categoriesReducer,
    quizzesCategory : quizzesCategoryReducer,
    userData : userDataReducer
    // gender : gendersReducer

});

export default reducers
