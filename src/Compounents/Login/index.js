import {TextField} from "@mui/material";
import {useRef} from "react";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {fetchLogin} from "../../redux/actions";
import swal from "sweetalert"
import {history} from "../../index";
import {Link} from "react-router-dom"

export default function Login(){
    let emailRef = useRef()
    let passwordRef= useRef()
    const dispatch = useDispatch()

    const submitLogin=()=>{
        console.log("EMAIL VALUE =", emailRef.current.value)
        console.log("PASWWORD VALUE =", passwordRef.current.value)
        dispatch(fetchLogin({email :emailRef.current.value , password : passwordRef.current.value }))
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
            <div className="mb-2 pageTitle" >Login Page : </div>

            <div className="d-flex justify-content-around mt-4">
                <TextField inputRef={emailRef} label="Email" type={"email"} variant="outlined" />
                <TextField inputRef={passwordRef} label="Password" type={"password"} variant="outlined" />
                <Button variant="contained" onClick={submitLogin}>Submit</Button>

            </div>
            <div style={{textAlign : "center"}}>  <Link to={'/signup'}>  Don't have an account ? go to signup page</Link> </div>
        </>

    )
}
