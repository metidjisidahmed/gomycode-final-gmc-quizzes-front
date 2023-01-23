import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import CategoryCard from "./SubCompounents/CategoryCard";
import './styles.css'
import {fetchGetCategories} from "../../redux/actions";
import {Backdrop, CircularProgress} from "@mui/material";
export default function Categories(){
    let categories = useSelector(store=>store.categories)
    let dispatch = useDispatch()
    useEffect(()=>{
        // setTimeout(()=>{
            console.log("categories SELECTOR =", categories)
            dispatch(fetchGetCategories())
        // },3000)

    },[])

    if(categories.loading===true){
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={categories.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }else{
        console.log("I HAVE THE DATA =", categories.data)
        return(
            <>
                <div className="mb-2 pageTitle" >Select a category : </div>
                <div className="d-flex justify-content-center px-4 flex-wrap" style={{ gap: "4rem"}}>
                    {categories.data.map(category=>{
                        return(
                            <CategoryCard data={category}/>
                        )
                    })}
                </div>

            </>
        )
    }


}
