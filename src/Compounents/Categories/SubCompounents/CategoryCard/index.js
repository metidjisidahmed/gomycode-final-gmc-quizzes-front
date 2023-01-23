import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {history} from "../../../../index";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetQuizzesCategory} from "../../../../redux/actions";

export default function CategoryCard({data}) {
    const userData = useSelector(store=> store.userData)
    console.log("DATA=", data)
    const dispatch = useDispatch()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={()=>{
                if(userData.data.token != null){
                    dispatch(fetchGetQuizzesCategory(data._id))
                        .then(()=>{
                            console.log("I'm going to quizzes page !!!!")
                            history.push(`/categories/${data._id}/quiz/1`)
                        })
                }else{
                    history.push('/login')
                }

            }}>
                <CardMedia
                    style={{objectFit : "fill" , height : "400px" , width : "400px"}}
                    component="img"
                    image={data.imageUrl}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{textAlign : "center"}}>
                        {data.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
