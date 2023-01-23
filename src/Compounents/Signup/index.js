import {TextField} from "@mui/material";
import {useRef} from "react";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {fetchLogin, fetchSignup} from "../../redux/actions";
import swal from "sweetalert"
import {history} from "../../index";
import {Link} from "react-router-dom";

export default function Signup(){
    let emailRef = useRef()
    let passwordRef= useRef()
    let userNameRef= useRef()
    const dispatch = useDispatch()

    const submitSignup=()=>{
        console.log("EMAIL VALUE =", emailRef.current.value)
        console.log("PASWWORD VALUE =", passwordRef.current.value)
        dispatch(fetchSignup({email :emailRef.current.value , password : passwordRef.current.value  , userName : userNameRef.current.value}))
            .then(()=>{
                history.push('/categories')
            })
            .catch((err)=>{
                swal({
                    title: "ERROR!",
                    text: err,
                    icon: "error",
                    button: "Ok",
                });
            })
    }
    return(
        <>
            <div className="mb-2 pageTitle" >Signup Page : </div>
            <div className="d-flex justify-content-around mt-4">
                <TextField inputRef={userNameRef} label="User name" type={"text"} variant="outlined" />
                <TextField inputRef={emailRef} label="Email" type={"email"} variant="outlined" />
                <TextField inputRef={passwordRef} label="Password" type={"password"} variant="outlined" />
                <Button variant="contained" onClick={submitSignup}>Submit</Button>
            </div>
            <div style={{textAlign : "center"}}>  <Link to={'/login'}>  Already have an account ? go to login page</Link> </div>

        </>


    )
}
