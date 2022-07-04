import React , { useState , useEffect} from 'react';
import { Stack , TextField , InputAdornment , Typography , Chip , Grid , Divider , IconButton , Button} from '@mui/material';
import {Link ,useNavigate} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const RightContent = ({data , fulldata}) => {

    let navigate = useNavigate();

    const [tagSplit , setTagSplit] = useState([]);
    const [disBtn , setDisBtn] = useState(true);
    const [disBtnNext , setDisBtnNext] = useState(true);
    const [NextData, setNextData] = useState('');
    const [PrvData, setPrvData] = useState('');

    const prevPost = () => {

         navigate(`/blog-content/${PrvData}`)

    }
    const nextPost = () => {

         navigate(`/blog-content/${NextData}`)
     }

    useEffect(() => {

        //console.log(data.blogId)
        window.scrollTo({top:10 }) 
        setDisBtn(true);
        setDisBtnNext(true);

        var findsindex = fulldata.findIndex(function(items) {
            return items.blogId == data.blogId
          });
        if(findsindex === 0){
            setDisBtn(false)
        }else{
            setPrvData(fulldata[findsindex-1].blogId)
        }
        
        if(findsindex === (fulldata.length-1)){
            setDisBtnNext(false)
        }else{
            setNextData(fulldata[findsindex+1].blogId)
        }


        if(data.blogTag.indexOf(",") > -1){
            var splits = data.blogTag.split(",");
            setTagSplit([splits])
        }else{
            setTagSplit([splits])
           
        }
     },[data , NextData , PrvData])

   

  return (
            <Stack spacing={1} sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:2.5 , color:"#000"}}>
                <img src={data.blogImg} alt='blog-content-detail' />
                <Typography variant='p'>22 APRIL, 2018</Typography>
                <Typography variant='h5'>{data.blogTitle}</Typography>
                <Typography variant='p'>
                {data.blogDes}
                </Typography>
                <Typography component="u" sx={{pt:2 , pb:2}}>
                    Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim veniam quis nostrud.
                </Typography>
                <Typography component="div">
                    <blockquote>
                     Lorem ipsum dolor sit amet, consecte adipisicing elit, sed do eiusmod tempor incididunt labo dolor magna aliqua. Ut enim ad minim veniam quis nostrud.
                    </blockquote>
                </Typography>
                <Grid container sx={{pt:1,pb:1}}>
                    <Grid item xs={6}>

                        {
                            tagSplit.map((tags , index) => {

                                return <Link to={"/tags"} style={{ textDecoration: 'none' , color:"#000" , fontSize:18}} key={index}>{tags}</Link> 

                            })
                        }
                        
                        
                       
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                    <Typography variant='p' sx={{fontSize:18}}> <span style={{paddingTop:"10px"}}>Share</span> : </Typography>
                    <IconButton aria-label="facebook">
                        <FacebookIcon sx={{color:"#3b5998"}} />
                    </IconButton>
                    <IconButton aria-label="twiter">
                        <TwitterIcon sx={{color:"#55acee"}} />
                    </IconButton>
                    <IconButton aria-label="twiter">
                        <InstagramIcon sx={{color:"#c32aa3"}} />
                    </IconButton>
                    </Grid>
                </Grid>
                <Divider  />
                
                <Grid container sx={{pt:1 , pb:1}}>
                    <Grid item xs={6}>
                        <Button onClick={prevPost} style={ disBtn ? {display:"flex"} : {display:"none"}}>Prev Post </Button>
                     </Grid>
                    <Grid item xs={6} textAlign="right">

                        {
                            disBtnNext ? <Button onClick={nextPost}>Next Post</Button> : null
                        }

                        
                        
                        
                       
                        
                    </Grid>
                </Grid>
                <Divider  />
            </Stack>
  )
}

export default RightContent