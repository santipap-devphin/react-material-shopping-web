import React , { useState , useEffect} from 'react';
import { Stack, Typography , Chip , Grid , Divider , IconButton , Button} from '@mui/material';
import {Link ,useNavigate} from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import months from '../../data/dates.json';

const RightContent = ({data , fulldata , setLoadSuccess}) => {

    let navigate = useNavigate();

    //console.log(data)

    const [tagSplit , setTagSplit] = useState([]);
    const [disBtn , setDisBtn] = useState(true);
    const [disBtnNext , setDisBtnNext] = useState(true);
    const [NextData, setNextData] = useState('');
    const [PrvData, setPrvData] = useState('');

    const convertDate = (data) => {
        var lastdate;
        //console.log(months)
        if(data.indexOf("_") > -1){
    
          var spdate = data.split("_");
          var dates = spdate[0];
          var mon = dates[4]+dates[5];
          var years = dates[0]+dates[1]+dates[2]+dates[3];
          var last = dates[6]+dates[7] +" " + months[parseInt(mon)-1].namemonth+" "+ years;
    
          lastdate = last;
        }
    
        return lastdate;
    
    
      }

    const prevPost = () => {

         setLoadSuccess(false);
         navigate(`/blog-content/${PrvData}`)

    }
    const nextPost = () => {

        setLoadSuccess(false);
         navigate(`/blog-content/${NextData}`)
     }

    useEffect(() => {

        window.scrollTo({top:30 }) 
        setDisBtn(true);
        setDisBtnNext(true);

        var findsindex = fulldata.findIndex((items) => items.id === data.id);

        if(findsindex === 0){
            setDisBtn(false)
        }else{
            setPrvData(fulldata[findsindex-1].id)
        }
        
        if(findsindex === (fulldata.length-1)){
            setDisBtnNext(false)
        }else{
            setNextData(fulldata[findsindex+1].id)
        }


        if(data.taglist.indexOf(",") > -1){
            var splits = data.taglist.split(",");
            setTagSplit(splits)
        }else{
            setTagSplit(data.taglist)
           
        }
     },[data , NextData , PrvData])

  return (
            <Stack spacing={1} sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d" , p:2.5 , color:"#000"}}>
                {/*<img src={data.blogImg} alt='blog-content-detail' />*/}
                
                <Typography variant='h5'>{data.title}</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <div id="editorblog" dangerouslySetInnerHTML={{__html:data.content}}></div>
                    </Grid>
                </Grid>
                <Stack direction="row">
                    <Typography sx={{fontSize:18 ,pr:1}}>หมวดหมู่</Typography>
                    <Chip label={data.catename} color="default" />
                </Stack>
                {console.log(typeof tagSplit)}
                <Grid container sx={{pt:1,pb:1}}>
                    <Grid item xs={6}>

                        <Stack direction="row">
                            <Typography sx={{fontSize:18 ,pr:1}}>แท๊ก </Typography>
                            {
                                typeof tagSplit !== "string" ?
                                tagSplit.map((tags , index) => {

                                    return <Link to={"/tags"} style={{ textDecoration: 'none' , color:"#000" , fontSize:18 , margin:2}} key={index}><Chip label={tags} color="info" /></Link> 

                                })
                                :<Link to={"/tags"} style={{ textDecoration: 'none' , color:"#000" , fontSize:18 , margin:2}}><Chip label={tagSplit} color="info" /></Link> 
                            }
                        </Stack>
                        
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
                <Stack>
                    <Typography variant='p'>วันที่ โพสต์ {convertDate(data.createdate)}</Typography>
                </Stack>
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