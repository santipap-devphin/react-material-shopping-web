import  React  ,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import InstagramIcon from '@mui/icons-material/Instagram';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import months from '../../data/dates.json';

const CardMainBlog = ({data , cate, tags}) => {

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

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const findTag = (tagid) => {

        let tagslist  = [];

        for( const [key ,val] of Object.entries(tags)){

            if(tagid.indexOf(val.id) > -1){

                //console.log(val.tagname)
                tagslist.push(val.tagname);
               
            }
           

        }

        return tagslist;


    }

    const findCate = cate.find((item) => item.id === data.cateid);

    

    //console.log(data)

  return (<Card sx={{boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)", transformStyle: "preserve-3d"}}>
            <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    ad
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={data.title}
            subheader={convertDate(data.createdate)}
            />
            <Link to={`/blog-content/${data.id}`}>
            <CardMedia
            component="img"
            height="194"
            image={`http://localhost:7000/${data.imgblog}`}
            alt="Paella dish"
            />
            </Link>
            <CardContent>
            <Link to={`/blog-content/${data.id}`} style={{textDecoration: "none" , color:"#000"}}><Typography variant='h6'> {data.title}</Typography></Link>
            {/*<Typography variant="body2" color="text.secondary">
                <div dangerouslySetInnerHTML={{__html: data.content}} />
            </Typography>*/}
            <Link to={`/blog/${findCate.catename}`} style={{textDecoration: "none" , color:"#000"}}>
                <Typography component="div" sx={{mt:1}}>
                     หมวดหมู่  <Chip label={findCate.catename} color="default" className='cursorpointer' />
                </Typography>
            </Link>
            <Typography component="div" sx={{mt:1}}>
                แท๊ก  {
                            findTag(data.tag).length > 0 ?
                            findTag(data.tag).map((news , index) => {

                                return <Link to={`/tag/${news}`} key={index} style={{textDecoration: "none" , color:"#000"}}><Chip label={news} color="info" sx={{mr:1}} className='cursorpointer'/></Link>

                            })
                            :null
                      }
            </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton aria-label="facebook">
                <FacebookIcon sx={{color:"#3b5998"}} />
            </IconButton>
            <IconButton aria-label="twiter">
                <TwitterIcon sx={{color:"#55acee"}} />
            </IconButton>
            <IconButton aria-label="twiter">
                <InstagramIcon sx={{color:"#c32aa3"}} />
            </IconButton>
            <Typography variant='p' sx={{fontSize:24 , ml:1}}> Share</Typography>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <div dangerouslySetInnerHTML={{__html: data.content}}/>
            </CardContent>
            </Collapse>
        </Card>)
}

export default CardMainBlog