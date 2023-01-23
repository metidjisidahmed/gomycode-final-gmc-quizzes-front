import * as ActionTypes from "./actionTypes"
import axios from "axios";


export const getCategoriesLoading=()=>{
    return{
        type: ActionTypes.GET_CATEGORIES_LOADING
    }
}

export const getCategoriesError=(err)=>{
    return{
        type : ActionTypes.GET_CATEGORIES_ERROR,
        payload: err
    }
}

export const getCategoriesSuccess=(content)=>{
    return{
        type: ActionTypes.GET_CATEGORIES_SUCCESS,
        payload: content
    }
}




export const fetchGetCategories=()=>(dispatch)=>{
    // STEP 1 : Trigger the Loading state
    dispatch(getCategoriesLoading());
    axios.get("http://localhost:5000/public/categories/all")
        .then(response =>{
            // STEP 2.1 Once we get the jokes , we store them in the jokes reducer
            console.log("response =", response)
            dispatch(getCategoriesSuccess(response.data.data))
        })
        .catch(error =>{
            // STEP 2.2 If there is an error : we show an error compounent
            console.log("error =", error)
            dispatch(getCategoriesError(error.response.data.err || error.message))
        });
}


// GET QUIZZ CATEGORY
export const getQuizzesCategoryLoading=()=>{
    return{
        type: ActionTypes.GET_QUIZZES_CATEGORY_LOADING
    }
}

export const getQuizzesCategoryError=(err)=>{
    return{
        type : ActionTypes.GET_QUIZZES_CATEGORY_ERROR,
        payload: err
    }
}

export const getQuizzesCategorySuccess=(content)=>{
    return{
        type: ActionTypes.GET_QUIZZES_CATEGORY_SUCCESS,
        payload: content
    }
}




export const fetchGetQuizzesCategory=(categoryId)=>(dispatch)=>{
    return new Promise((resolve , reject)=>{
        // STEP 1 : Trigger the Loading state
        dispatch(getQuizzesCategoryLoading());
        axios.get(`http://localhost:5000/public/categories/${categoryId}/quizzes`)
            .then(response =>{
                // STEP 2.1 Once we get the jokes , we store them in the jokes reducer
                console.log("response =", response)
                dispatch(getQuizzesCategorySuccess(response.data.data))
                resolve()
            })
            .catch(error =>{
                // STEP 2.2 If there is an error : we show an error compounent
                console.log("error =", error)
                dispatch(getQuizzesCategoryError(error.response.data.err || error.message))
                reject(error)
            });
    })

}


export const loginLoading=()=>{
    return{
        type: ActionTypes.LOGIN_LOADING
    }
}

export const loginError=(err)=>{
    return{
        type : ActionTypes.LOGIN_ERROR,
        payload: err
    }
}

export const loginSuccess=(content)=>{
    localStorage.setItem('user-token', JSON.stringify(content))
    return{
        type: ActionTypes.LOGIN_SUCCESS,
        payload: content
    }
}




export const fetchLogin=(data)=>(dispatch)=>{
    let email = data.email
    let password = data.password
    return new Promise((resolve , reject)=>{
        // STEP 1 : Trigger the Loading state
        dispatch(loginLoading());
        axios.post(`http://localhost:5000/public/login/user`, {
            email : email , password : password
        })
            .then(response =>{
                // STEP 2.1 Once we get the jokes , we store them in the jokes reducer
                console.log("response =", response)
                dispatch(loginSuccess(response.data.data))
                resolve()
            })
            .catch(error =>{
                // STEP 2.2 If there is an error : we show an error compounent
                console.log("error =", error)
                dispatch(loginError(error.message))
                reject( error.response.data.err || error.message)
            });
    })

}



export const signupLoading=()=>{
    return{
        type: ActionTypes.SIGNUP_LOADING
    }
}

export const signupError=(err)=>{
    return{
        type : ActionTypes.SIGNUP_ERROR,
        payload: err
    }
}

export const signupSuccess=(content)=>{
    localStorage.setItem('user-token', JSON.stringify(content))
    return{
        type: ActionTypes.SIGNUP_SUCCESS,
        payload: content
    }
}

export const fetchSignup=(data)=>(dispatch)=>{
    let email = data.email
    let password = data.password
    let userName = data.userName
    return new Promise((resolve , reject)=>{
        // STEP 1 : Trigger the Loading state
        dispatch(signupLoading());
        axios.post(`http://localhost:5000/public/signup/user`, {
            mail : email , password : password , userName : userName
        })
            .then(response =>{
                // STEP 2.1 Once we get the jokes , we store them in the jokes reducer
                console.log("response =", response)
                dispatch(signupSuccess(response.data.data))
                resolve()
            })
            .catch(error =>{
                // STEP 2.2 If there is an error : we show an error compounent
                console.log("error =", error)
                dispatch(signupError(error.message))
                reject( error.response.data.err || error.message)
            });
    })

}



export const disconnect=()=>{
    localStorage.removeItem('user-token')
    return{
        type: ActionTypes.DISCONNECT
    }
}





export const fetchSendAnswer=(data)=>(dispatch)=>{
    const headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user-token')).token}`
    };
    console.log( "TOKEN = ",JSON.parse(localStorage.getItem('user-token')))

    // let email = data.email
    // let password = data.password
    return new Promise((resolve , reject)=>{
        // STEP 1 : Trigger the Loading state
        // dispatch(loginLoading());
        axios.post(`http://localhost:5000/users/quiz/submit-answer`, {
            quizID : data.quizID , isCorrect: data.isCorrect
        } , {headers : headers})
            .then(response =>{
                // STEP 2.1 Once we get the jokes , we store them in the jokes reducer
                console.log("response =", response)
                resolve()
            })
            .catch(error =>{
                // STEP 2.2 If there is an error : we show an error compounent
                console.log("error =", error)
                reject( error.response.data.err || error.message)
            });
    })

}
