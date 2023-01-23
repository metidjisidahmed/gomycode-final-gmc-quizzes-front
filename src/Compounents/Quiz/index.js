import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchGetQuizzesCategory, fetchSendAnswer} from "../../redux/actions";
import swal from "sweetalert"
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {history} from "../../index";
export default function Quiz(){
    const dispatch=useDispatch()
    let { quizIndex , categoryId } = useParams();
    const goNextQuiz =()=>{
        history.push(`/categories/${categoryId}/quiz/${Number(quizIndex)+1}`)
    }
    const goPreviousQuiz=()=>{
        history.push(`/categories/${categoryId}/quiz/${Number(quizIndex)-1}`)


    }
    const quizzesCategory = useSelector(store=>store.quizzesCategory)
    const currentQuizData=useSelector(store=>store.quizzesCategory.data[quizIndex-1])
    // const [ currentQuizData , setCurrentQuizData]= useState(quizzesCategory.data[quizIndex-1])
    useEffect(()=>{
        // GET THE CATEGORY QUIZZES WHEN : there is no quizzes OR when we have a quizzes of different category
        if(quizzesCategory.data.length ==0 || quizzesCategory.data[0].categoryID != categoryId ){
            dispatch(fetchGetQuizzesCategory(categoryId))
                // .then(()=>{
                //     console.log("CURRENT QUIZ DATA =",quizzesCategory)
                //     setCurrentQuizData(quizzesCategory.data[quizIndex-1])
                // })
        }
    },[])
    const sendAnswer=(isCorrect)=>{

        dispatch(fetchSendAnswer({quizID : currentQuizData._id , isCorrect : isCorrect }))
            .then(()=>{
                if(isCorrect){
                    swal({
                        title: "BRAVO!",
                        text: "good Answer",
                        icon: "success",
                        button: "Ok",
                    });
                }else{
                    swal({
                        title: "LOSER!",
                        text: "wrong answer",
                        icon: "error",
                        button: "Ok",
                    });
                }

            })
            .catch(error=>{
                swal({
                    title: "ERROR",
                    text: error.response.data.err || error.message,
                    icon: "danger",
                    button: "Ok",
                });
            })
    }
    if(currentQuizData == null){
        return (
            <div> UNFOUND QUIZZ !</div>
        )
    }else{
        return(
            <>
                <div className="d-flex align-items-center ps-4 pe-4">
                    <div>
                        <Button disabled={Number(quizIndex) === 1} onClick={goPreviousQuiz} variant="contained" startIcon={<KeyboardDoubleArrowLeftIcon />}>
                            Previous
                        </Button>
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-center mb-4">
                            <Avatar
                                className="quizImage"
                                alt="Remy Sharp"
                                style={{objectFit : "fill"}}
                                src={currentQuizData.imageUrl}
                                sx={{ width: 400, height: 400 }}
                            />
                        </div>


                        <div className="d-flex justify-content-evenly mb-4">
                            <Button  onClick={()=>{ sendAnswer(currentQuizData.choices[0].isCorrect) }} className="choice" variant="outlined">{currentQuizData.choices[0].name}</Button>
                            <Button onClick={()=>{ sendAnswer(currentQuizData.choices[1].isCorrect) }}  className="choice"  variant="outlined">{currentQuizData.choices[1].name}</Button>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <Button onClick={()=>{ sendAnswer(currentQuizData.choices[2].isCorrect) }} className="choice"  variant="outlined">{currentQuizData.choices[2].name}</Button>
                            <Button onClick={()=>{ sendAnswer(currentQuizData.choices[3].isCorrect) }}  className="choice"   variant="outlined">{currentQuizData.choices[3].name}</Button>
                        </div>


                    </div>
                    <div>
                        <Button disabled={Number(quizIndex)==quizzesCategory.data?.length} onClick={goNextQuiz} variant="contained" endIcon={<KeyboardDoubleArrowRightIcon />}>
                            Next
                        </Button>
                    </div>
                </div>


            </>
        )
    }



}
