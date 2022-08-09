import React  , {useState , useEffect , useRef} from 'react';
import { Link , useNavigate , useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid , Button , TextField , InputLabel , MenuItem , FormControl 
  , Select  , Autocomplete , Chip , Typography , Alert , AlertTitle
  , Switch ,FormGroup , FormControlLabel
} from '@mui/material';
import EditorBlog from '../Editor/EditorBlog';
import ImageIcon from '@mui/icons-material/Image';
import imgdefault from "../../assets/noimg.jpg";
import endpoint from '../../api/endpoint';

const FrmBlogEdit = () => {

  let {id} = useParams();
  let myRef = useRef();
  let navicate = useNavigate();
  const [values, setValues] = useState([]);
  const [cate, setCate] = useState('');
  const [title , setTitle] = useState('');
  const [tags , setTags] = useState('');
  const [tagsDefault , setTagsDefault] = useState([]);
  const [editor , setEditor] = useState('');
  const [tagInsert , setTagInsert] = useState([]);
  const [listCate , setListCate] = useState([]);
  const [listTag , setListTag] = useState([])
  const [statusCallApi , setStatusCallApi] = useState(false);
  const [imgData , setImgData] = useState('');
  const [imgUrl  , setImgUrl] = useState('');
  const [alertStatus , setAlertStatus] = useState(false);
  const [alertMsg , setAlertMsg] = useState({status:"error" , text:""});
  const [chkSwitch , setchkSwitch] = useState(true)
  var imgc = "";
  useEffect(() => {

    const fetchAll = async () => {

      try {

        const response =  await Promise.all([endpoint.get("/getcategory"), endpoint.get("/tags")]);

        if(response[0].status === 200 && response[1].status === 200){
         
          var arr = [];
          setListCate(response[0].data)
          if(response[1].data.list.length > 0){

            for(var i = 0; i < response[1].data.list.length; i++){

              arr.push({id:response[1].data.list[i].id , value:response[1].data.list[i].tagname})

            }

          }
          setListTag(arr)
          setStatusCallApi(true);
        }
       
 
        
      } catch (error) {
          console.error(error)
      }


    }

    fetchAll();

  },[statusCallApi])

  useEffect(() => {


    const callBlogs = async() => {

        try {

          const response = await endpoint.patch(`/blogs/${id}`);
          if(response.data.code === 1){
              //console.log(response.data.list)
              setCate(response.data.list.cateid)
              setTitle(response.data.list.title)
              setEditor(response.data.list.content)
              setImgUrl("http://localhost:7000/"+response.data.list.imgblog);
              setTagsDefault(response.data.list.tag);
              setImgData(response.data.list.imgblog)
              setchkSwitch(response.data.list.status)
            
          }
          
        } catch (error) {
            console.error(error)
        }

    }

    callBlogs();
    


  },[id])

  useEffect(() => {

    if(tagsDefault.length > 0){

       var arr = [];
       var defaultTag = [];

       for(var i = 0 ; i < listTag.length; i++){

        if(tagsDefault.indexOf(listTag[i].id) > -1){

           
            arr.push(listTag[i]);
            defaultTag.push(listTag[i].id);
            
        }

       }

       setValues(arr)
       setTagInsert(defaultTag)


    }else{
      setValues([]);
    }
  },[tagsDefault , listTag])

  const handleChange = (event) => {
    setCate(event.target.value);
  };
  const tagChange = (e , value) => {

    let nVal = "";
    let nId = [];
    setValues(value);

    for(var i = 0; i < value.length; i++){
      nId.push(value[i].id);
      nVal += value[i].value + ",";
    }

    var lastChar = nVal.slice(0, -1);
    setTagInsert(nId)
    setTags(lastChar);
  }
  const ResizeImage  = async (files, uploadHandler) => {
    console.log(files[0])
    const uploadFile = files[0];
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();
  
    reader.onload = function (e) {
  
        img.src = e.target.result;
       
        //document.getElementsByClassName("sun-editor").appendChild(img)
        
        //canvas.appendChild(img);
        img.onload = function () {
  
            //img.setAttribute("id","img1");
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
  
            const MAX_WIDTH = 600;
            const MAX_HEIGHT = 300;
            let width = img.width;
            let height = img.height;
  
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
  
            canvas.width = width;
            canvas.height = height;
  
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
  
            //console.log(e.target.result)
            //console.log(uploadFile)
  
           canvas.toBlob(function (blob) {
                uploadHandler([new File([blob], uploadFile.name)])
            }, uploadFile.type, 1);
        }
        //document.getElementsByClassName("sun-editor")[0].appendChild(img);
  
        //e.target.append(appendText);
       
        }
  
         let formDatas = new FormData();
         formDatas.append("file", uploadFile); 

            try {
  
              const response = await endpoint.post("/upload" , formDatas , { headers: {'Content-Type': 'multipart/form-data' }});
  
              console.log(response)
  
              var newimg = "http://localhost:7000/uploads/"+response.data.filename;

              console.log(newimg)

              imgc = newimg;
              //setImgBlog(newimg)
              
  
              setTimeout(function(){
                   
                reader.readAsDataURL(uploadFile);
              
              }, 1500);
  
              
            } catch (error) {
                console.error(error);
            }
  }
  const handleChangeEditor = (content) => setEditor(content);

  const handleImageUpload = (targetImgElement, index , state, imageInfo, remainingFilesCount) => {
   
    
    setTimeout(function(){
      //console.log(imgc)

      if(imgc !== ""){

        imageInfo.src = imgc;
        targetImgElement.src = imgc;

      }
      
     //console.log(targetImgElement);
      //console.log(imageInfo);
          
    }, 2000);
 };
 const handleImageUploadBefore = (files, info , uploadHandler) => {
    //console.log(uploadHandler)
        try {
          //console.log(files)
          ResizeImage(files, uploadHandler)
          
  
      } catch (err) {
          uploadHandler(err.toString())
      }
  
  };
  const changeImg =  async (e) => {

    //console.log(e.target.files[0])
    const file = e.target.files[0];
  
    if(file){
  
        const reader = new FileReader();
  
        reader.onloadend = () => { 
  
            setImgUrl(reader.result)
           
            //file["namefolder"]  = "cate";
        }
  
         reader.readAsDataURL(file) 
  
        
            const formData = new FormData()
  
            formData.append('file', file)
            
            const response = await endpoint.post("/upload" , formData , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }});
  
            if(response.status === 200 && response.statusText === "OK"){
  
                var newpath = response.data.destination + response.data.filename;
                if(newpath.indexOf("public/") > -1){
  
                    var sp = newpath.split("public/");
                    //console.log(sp[1])
                    //setImgData(sp[1])
                    setImgData(sp[1]);
                }else{
                    //setImgData(newpath)
                  
                    setImgData(newpath);
                }
            }
       }
  }
  const submitBlog = async(e) => {

    e.preventDefault();
    
    if(cate && title && editor){

        console.log(tagInsert)

          let objs = {id:id,cateid:cate , title:title , content:editor , imgblog:imgData , tag:tagInsert , status:chkSwitch}
          
        //console.log(objs)
          try {
            

                const response = await endpoint.put("/blogs" , JSON.stringify(objs) , {headers:{'Content-Type': 'application/json'}});

                if(response.data.code === 1){

                  window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
                  setAlertMsg({...alertMsg , status:"success",text:"แก้ไขข้อมูลเรียบร้อย"})
                  setAlertStatus(true);
                  setTimeout(function() {setAlertStatus(false)}, 3000);
                  setTimeout(function() {navicate("/backend/blog")}, 3500);

                }

                
            
          } catch (error) {
            console.error(error)
          }

    }else{

      window.scrollTo({top:myRef.current.scroll , behavior: 'smooth'}) 
      setAlertMsg({...alertMsg , text:"กรุณาเลือกสินค้าร่วมรายการ" })
      setAlertStatus(true);
      setTimeout(function() {setAlertStatus(false)}, 3000);

    }
    


}

  return (<> 
                <div ref={myRef}></div>
                <Grid container sx={{m:1}}>
                    <Grid item xs={4}>
                        <Link to={"/backend/blog"} style={{textDecoration: "none"}}><Button variant="contained" color="primary"><ArrowBackIcon/> กลับ</Button></Link>
                    </Grid>
                </Grid>
                {
                    alertStatus ? 
                    <Alert severity={alertMsg.status} sx={{width:"100%"}}>
                    <AlertTitle>แจ้งเตือน</AlertTitle>
                                {alertMsg.text}
                    </Alert>
                    :null
                }
                <form onSubmit={submitBlog} style={{width:"97%"}}>
                <Grid container sx={{background:"#ffffff" , boxShadow: "0 0px 15px 0px rgb(0 0 0 / 15%)" , transformStyle: "preserve-3d" , m:1.5}}>
                <Grid item xs={12} sx={{p:2}}>
                        <FormControl variant="filled" fullWidth>
                                <InputLabel id="cate-select-label">หมวดหมู่</InputLabel>
                                <Select
                                labelId="cate-label"
                                id="cate"
                                value={cate}
                                label="หมวดหมู่สินค้า"
                                onChange={handleChange}
                                
                                >
                                {
                                listCate.length > 0 ?
                                listCate.map((item , index) => {

                                        return (<MenuItem key={index} value={item.id}>{item.catename}</MenuItem>)
                                })
                                : <MenuItem value=''>none</MenuItem>
                                }
                            
                                
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                            <TextField 
                            id="titlenew" 
                            label="หัวข้อข่าว" 
                            variant="filled" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                        <EditorBlog 
                        initialContent={editor}
                        placeholder={"รายละเอียดข่าว"} 
                        onChange={handleChangeEditor}
                        ImageUpload = {handleImageUpload}
                        ImageUploadBefore = {handleImageUploadBefore}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{p:2}}>
                        <Button
                        variant="contained"
                        component="label"
                        size="small"
                        color="primary"
                        sx={{mt:1 , "&:hover": { backgroundColor:"#fff" , color:"#000"}}}
                        >
                                    <ImageIcon/>
                                    <input
                                    type="file"
                                    onChange={changeImg}
                                    hidden
                                    />
                                รูปหน้าปกข่าว
                        </Button>
                        
                    </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                        <img src={ imgUrl !== "" ? imgUrl : imgdefault} alt="รูปหน้าปก" />
                    </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        value={values}
                        onChange={tagChange}
                        options={listTag}
                        getOptionLabel={(option) => option.value}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                          
                            <Chip
                                label={option.value}
                                {...getTagProps({ index })}
                                color="info"
                            />
                            ))
                        }
                        renderInput={(params) => (
                        <TextField {...params} label="แท๊ก" variant="filled" placeholder="เพิ่ม Tags"  />
                        )}
                    />
                   
                    <Typography variant="p">{tags}</Typography>
                    
                    </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch  checked={chkSwitch}  onChange={()=> setchkSwitch(!chkSwitch)}  />} label="สถานะเปิดใช้" />
                    </FormGroup>
                </Grid>
                    <Grid item xs={12} sx={{p:2}}>
                            <Button variant='contained' type="submit" sx={{m:1}}>ยืนยัน</Button>
                            <Button variant='contained' color="error" sx={{m:1}}>ยกเลิก</Button>
                    </Grid>
                </Grid>
                </form>
            </>
        )
}

export default FrmBlogEdit